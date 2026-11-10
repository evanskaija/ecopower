require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { Readable } = require('node:stream');
const express = require('express');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const cmsFields = require('./cms-fields.js');
const { ALLOWED_IMAGE_TYPES, IMAGE_EXTENSIONS, MAX_IMAGE_SIZE, assertSafeRemoteDestination, fetchRemoteImage, inspectImageBuffer, normalizeMediaMetadata, validateImageReference } = require('./media-security.js');

const ROOT = __dirname;
const PUBLIC_ORIGIN = process.env.PUBLIC_ORIGIN || 'http://localhost:3000';
const DATABASE_URL = process.env.DATABASE_URL || '';
const VERCEL_ENV = process.env.VERCEL_ENV || (process.env.NODE_ENV === 'production' ? 'production' : 'development');
const BLOB_ENV_PREFIX = VERCEL_ENV === 'preview' ? 'ECOPOWER_PREVIEW' : VERCEL_ENV === 'production' ? 'ECOPOWER_PRODUCTION' : '';
const privateTokenName = BLOB_ENV_PREFIX ? `${BLOB_ENV_PREFIX}_PRIVATE_READ_WRITE_TOKEN` : 'BLOB_PRIVATE_READ_WRITE_TOKEN';
const publicTokenName = BLOB_ENV_PREFIX ? `${BLOB_ENV_PREFIX}_PUBLIC_READ_WRITE_TOKEN` : 'BLOB_PUBLIC_READ_WRITE_TOKEN';
const privateStoreIdName = BLOB_ENV_PREFIX ? `${BLOB_ENV_PREFIX}_PRIVATE_STORE_ID` : 'BLOB_PRIVATE_STORE_ID';
const publicStoreIdName = BLOB_ENV_PREFIX ? `${BLOB_ENV_PREFIX}_PUBLIC_STORE_ID` : 'BLOB_PUBLIC_STORE_ID';
const PRIVATE_BLOB_TOKEN = process.env[privateTokenName] || (VERCEL_ENV === 'development' ? process.env.BLOB_PRIVATE_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN : '');
const PUBLIC_BLOB_TOKEN = process.env[publicTokenName] || (VERCEL_ENV === 'development' ? process.env.BLOB_PUBLIC_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN : '');
const PRIVATE_BLOB_STORE_ID = process.env[privateStoreIdName] || '';
const PUBLIC_BLOB_STORE_ID = process.env[publicStoreIdName] || '';
const PAGES = [
  ['home', 'Home'], ['products', 'Products and Prices'], ['about', 'About Us'], ['team', 'Our Team'],
  ['impact', 'Our Impact'], ['partners', 'Partner With Us'], ['faq', 'Questions'], ['contact', 'Contact Us']
];

if (!/^postgres(ql)?:\/\//i.test(DATABASE_URL)) throw new Error('DATABASE_URL must be a PostgreSQL connection string for the production entrypoint.');
if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET === 'development-only-change-this-secret') throw new Error('SESSION_SECRET must be configured before starting the PostgreSQL server.');
if (VERCEL_ENV === 'production' && (process.env.ECOPOWER_PREVIEW_PRIVATE_READ_WRITE_TOKEN || process.env.ECOPOWER_PREVIEW_PUBLIC_READ_WRITE_TOKEN)) {
  throw new Error('Preview Blob credentials are present in the Production deployment. Remove them and configure ECOPOWER_PRODUCTION_* Blob credentials instead.');
}

const pool = new Pool({ connectionString: DATABASE_URL, max: Number(process.env.PG_POOL_MAX || 5), ssl: process.env.PGSSL === 'disable' ? false : { rejectUnauthorized: false } });
const app = express();
app.set('trust proxy', 1);

async function initializeDatabase() {
  const client = await pool.connect();
  const migrationLock = 'ecopower:postgres-migrations';
  try {
    await client.query('SELECT pg_advisory_lock(hashtext($1))', [migrationLock]);
    await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP)');
    const migrationFiles = fs.readdirSync(path.join(ROOT, 'migrations'))
      .filter((file) => /^\d+_.*_postgres\.sql$/i.test(file))
      .sort();
    for (const migrationFile of migrationFiles) {
      const alreadyApplied = await client.query('SELECT id FROM schema_migrations WHERE id = $1', [migrationFile]);
      if (alreadyApplied.rowCount) continue;
      const migration = fs.readFileSync(path.join(ROOT, 'migrations', migrationFile), 'utf8');
      await client.query('BEGIN');
      await client.query(migration);
      await client.query('INSERT INTO schema_migrations (id) VALUES ($1)', [migrationFile]);
      await client.query('COMMIT');
    }
    for (const [slug, name] of PAGES) {
      const id = crypto.createHash('sha256').update(`page:${slug}`).digest('hex').slice(0, 24);
      await client.query('INSERT INTO pages (id, slug, name, sort_order) VALUES ($1, $2, $3, $4) ON CONFLICT (slug) DO NOTHING', [id, slug, name, PAGES.findIndex(([candidate]) => candidate === slug) + 1]);
    }
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch {}
    throw error;
  } finally {
    try { await client.query('SELECT pg_advisory_unlock(hashtext($1))', [migrationLock]); } catch {}
    client.release();
  }
}

const ready = initializeDatabase();
app.use(async (_req, _res, next) => { try { await ready; next(); } catch (error) { next(error); } });
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));
// Keep public HTML, CSS, JavaScript and images available. Rate-limit the API
// surface instead of the whole server so a preview or asset-heavy page cannot
// turn the public site into an unstyled 429 response.
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-8', legacyHeaders: false }));
app.use(session({
  name: 'ecopower.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new PgSession({ pool, tableName: 'user_sessions', createTableIfMissing: false }),
  cookie: { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 8 * 60 * 60 * 1000 }
}));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, message: { error: 'Too many login attempts. Try again later.' } });
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_IMAGE_SIZE, files: 1 }, fileFilter: (_req, file, callback) => callback(null, ALLOWED_IMAGE_TYPES.has(file.mimetype)) });

const query = (executor, text, values = []) => executor.query(text, values);
const db = { query: (text, values) => pool.query(text, values), pool };
const nowIso = () => new Date().toISOString();
const safeJson = (value) => JSON.stringify(value ?? {});
const parseJson = (value) => typeof value === 'string' ? (() => { try { return JSON.parse(value); } catch { return {}; } })() : (value || {});
const cleanEmail = (value) => String(value || '').trim().toLowerCase();
const DYNAMIC_BLOCK_TYPES = new Set(['text', 'image', 'imageText', 'cards', 'gallery', 'product', 'payment', 'stove', 'partner', 'testimonial', 'cta']);
const BLOCK_ID = /^[a-z0-9][a-z0-9_-]{1,79}$/i;
const BLOCK_IMAGE_LIMIT = 50;
const BLOCK_CARD_LIMIT = 30;
const BLOCK_TEXT_LIMIT = 4000;
const BLOCK_FORMAT_CHOICES = Object.freeze({
  size: new Set(['small', 'medium', 'large', 'display']),
    font: new Set(['sans', 'serif', 'display']),
  weight: new Set(['regular', 'bold']),
  style: new Set(['normal', 'italic']),
  color: new Set(['ink', 'forest', 'muted', 'accent']),
  align: new Set(['left', 'center', 'right']),
  spacing: new Set(['tight', 'normal', 'loose']),
  heading: new Set(['p', 'h2', 'h3'])
});
function splitBlocks(content) {
  const source = content && typeof content === 'object' && !Array.isArray(content) ? { ...content } : {};
  const blocks = Array.isArray(source.blocks) ? source.blocks : [];
  delete source.blocks;
  return { content: source, blocks };
}
function withBlocks(content, blocks) {
  const source = content && typeof content === 'object' && !Array.isArray(content) ? { ...content } : {};
  return { ...source, blocks: Array.isArray(blocks) ? blocks : [] };
}
function currentBlockRecord(row) { return withBlocks(parseJson(row.content_json), parseJson(row.blocks_json)); }
const TIRDO_PARTNER_IMAGE = 'EcoPower_all_extracted_images/TIRDO_logo_from_EcoPower_PDF.png';
const REMOVED_PAYMENT_DESCRIPTIONS = new Set([
  ['Or pay cash when your order arrives.', 'After paying, send the payment message on WhatsApp to 0784 017 225 so we can confirm your order.'].join(' '),
  ['Au lipa cash oda yako inapofika.', 'Baada ya kulipa, tuma ujumbe wa malipo WhatsApp kwa 0784 017 225 ili tuthibitishe oda yako.'].join(' ')
]);
function normalizeHomeContent(slug, content) {
  if (slug !== 'home' || !content || typeof content !== 'object') return content;
  const ordering = content.ordering;
  const englishCopy = ordering?.en;
  const swahiliCopy = ordering?.sw;
  const cleanedEnglishCopy = englishCopy && REMOVED_PAYMENT_DESCRIPTIONS.has(englishCopy.paymentDescription) ? { ...englishCopy, paymentDescription: '' } : englishCopy;
  const cleanedSwahiliCopy = swahiliCopy && REMOVED_PAYMENT_DESCRIPTIONS.has(swahiliCopy.paymentDescription) ? { ...swahiliCopy, paymentDescription: '' } : swahiliCopy;
  if (cleanedEnglishCopy !== englishCopy || cleanedSwahiliCopy !== swahiliCopy) {
    content.ordering = {
      ...ordering,
      ...(cleanedEnglishCopy ? { en: cleanedEnglishCopy } : {}),
      ...(cleanedSwahiliCopy ? { sw: cleanedSwahiliCopy } : {})
    };
  }
  if (content.images && Array.isArray(content.images.partnerLogos) && !content.images.partnerLogos.some((item) => item?.image === TIRDO_PARTNER_IMAGE)) {
    content.images = {
      ...content.images,
      partnerLogos: [...content.images.partnerLogos, { image: TIRDO_PARTNER_IMAGE, en: { alt: 'TIRDO' }, sw: { alt: 'TIRDO' }, position: 'center' }]
    };
  }
  return content;
}
function blockCopy(block, language) { return block?.[language] || block?.en || block?.sw || {}; }
function validateBlockText(value, label, max = BLOCK_TEXT_LIMIT) {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') return `${label} must be text.`;
  if (value.length > max) return `${label} is too long.`;
  return null;
}
function validateBlockFormat(format, label) {
  if (format === undefined) return null;
  if (!format || typeof format !== 'object' || Array.isArray(format)) return `${label} formatting is invalid.`;
  for (const [key, choices] of Object.entries(BLOCK_FORMAT_CHOICES)) {
    if (format[key] !== undefined && !choices.has(format[key])) return `${label}.${key} is not supported.`;
  }
  return null;
}
function validateBlock(block, index, slug) {
  if (!block || typeof block !== 'object' || Array.isArray(block)) return `Invalid dynamic block ${index + 1} on ${slug}.`;
  if (!DYNAMIC_BLOCK_TYPES.has(block.type)) return `Unsupported dynamic block type on ${slug}.`;
  if (typeof block.id !== 'string' || !BLOCK_ID.test(block.id)) return `Dynamic block ${index + 1} has an invalid ID.`;
  if (block.visible !== undefined && typeof block.visible !== 'boolean') return `Dynamic block ${block.id} visibility must be boolean.`;
  if (block.type === 'imageText' && !['left', 'right'].includes(block.layout || 'left')) return `Dynamic block ${block.id} image alignment is invalid.`;
  if (['image', 'imageText', 'product', 'payment', 'stove', 'partner', 'testimonial'].includes(block.type) && (typeof block.image !== 'string' || !block.image)) return `Dynamic block ${block.id} needs an image.`;
  if (block.image && (!SAFE_IMAGE.test(block.image) || validateImageReference(block.image))) return `Dynamic block ${block.id} has an invalid image reference.`;
  const languages = ['en', 'sw'];
  for (const language of languages) {
    const copy = blockCopy(block, language);
    for (const [key, max] of [['heading', 180], ['subheading', 180], ['kicker', 120], ['title', 180], ['description', BLOCK_TEXT_LIMIT], ['instruction', 500], ['quote', BLOCK_TEXT_LIMIT], ['attribution', 180], ['buttonLabel', 100], ['buttonLink', 1000], ['link', 1000], ['alt', 250], ['caption', 300]]) {
      const error = validateBlockText(copy[key], `Dynamic block ${block.id} ${language}.${key}`, max);
      if (error) return error;
    }
    const formatError = validateBlockFormat(copy.format, `Dynamic block ${block.id} ${language}`);
    if (formatError) return formatError;
    if (copy.buttonLink && !SAFE_HREF.test(copy.buttonLink)) return `Dynamic block ${block.id} has an invalid button link.`;
    if (copy.link && !SAFE_HREF.test(copy.link)) return `Dynamic block ${block.id} has an invalid website link.`;
  }
  if (block.type === 'cards') {
    if (!Array.isArray(block.cards) || block.cards.length > BLOCK_CARD_LIMIT) return `Dynamic block ${block.id} can contain at most ${BLOCK_CARD_LIMIT} cards.`;
    for (const [cardIndex, card] of block.cards.entries()) {
      if (!card || typeof card !== 'object' || typeof card.id !== 'string' || !BLOCK_ID.test(card.id)) return `Dynamic block ${block.id} card ${cardIndex + 1} has an invalid ID.`;
      if (card.image && (!SAFE_IMAGE.test(card.image) || validateImageReference(card.image))) return `Dynamic block ${block.id} card ${card.id} has an invalid image reference.`;
      for (const language of languages) {
        const copy = blockCopy(card, language);
        for (const [key, max] of [['kicker', 120], ['title', 180], ['description', BLOCK_TEXT_LIMIT], ['price', 80], ['buttonLabel', 100], ['buttonLink', 1000], ['alt', 250]]) {
          const error = validateBlockText(copy[key], `Dynamic block ${block.id} card ${card.id} ${language}.${key}`, max);
          if (error) return error;
        }
        if (copy.buttonLink && !SAFE_HREF.test(copy.buttonLink)) return `Dynamic block ${block.id} card ${card.id} has an invalid order link.`;
        const formatError = validateBlockFormat(copy.format, `Dynamic block ${block.id} card ${card.id} ${language}`);
        if (formatError) return formatError;
      }
    }
  }
  if (block.type === 'gallery') {
    if (!Array.isArray(block.images) || block.images.length > BLOCK_IMAGE_LIMIT) return `Dynamic block ${block.id} can contain at most ${BLOCK_IMAGE_LIMIT} gallery images.`;
    for (const [imageIndex, item] of block.images.entries()) {
      if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !BLOCK_ID.test(item.id) || typeof item.image !== 'string' || !item.image) return `Dynamic block ${block.id} gallery image ${imageIndex + 1} is invalid.`;
      if (!SAFE_IMAGE.test(item.image) || validateImageReference(item.image)) return `Dynamic block ${block.id} gallery image ${item.id} has an invalid image reference.`;
      for (const language of languages) {
        const copy = blockCopy(item, language);
        for (const [key, max] of [['caption', 300], ['alt', 250]]) {
          const error = validateBlockText(copy[key], `Dynamic block ${block.id} gallery image ${item.id} ${language}.${key}`, max);
          if (error) return error;
        }
      }
    }
  }
  if (['product', 'stove'].includes(block.type)) {
    if (block.image && (!SAFE_IMAGE.test(block.image) || validateImageReference(block.image))) return `Dynamic product block ${block.id} has an invalid image reference.`;
    if (block.price !== undefined && (typeof block.price !== 'string' || block.price.length > 80)) return `Dynamic product block ${block.id} has an invalid price.`;
    if (block.type === 'product' && block.link && !SAFE_HREF.test(block.link)) return `Dynamic product block ${block.id} has an invalid order link.`;
  }
  if (block.type === 'partner' && block.link && !SAFE_HREF.test(block.link)) return `Dynamic partner block ${block.id} has an invalid website link.`;
  return null;
}
function validateBlocks(slug, blocks) {
  if (blocks === undefined) return null;
  if (!Array.isArray(blocks) || blocks.length > BLOCK_IMAGE_LIMIT) return `A page can contain at most ${BLOCK_IMAGE_LIMIT} dynamic blocks.`;
  const ids = new Set();
  for (const [index, block] of blocks.entries()) {
    if (ids.has(block?.id)) return `Dynamic block IDs must be unique on ${slug}.`;
    ids.add(block?.id);
    const error = validateBlock(block, index, slug);
    if (error) return error;
  }
  return null;
}
const publicUrlFor = (fileName) => `/uploads/published/${encodeURIComponent(fileName)}`;
function blobPathname(value) {
  const raw = String(value || '');
  if (/^https?:\/\//i.test(raw)) return new URL(raw).pathname.replace(/^\/+/, '');
  return raw.replace(/^\/+/, '');
}
function assertBlobStore(url, expectedStoreId, label) {
  if (!expectedStoreId) return;
  let hostname;
  try { hostname = new URL(url).hostname.toLowerCase(); } catch { throw new Error(`${label} Blob returned an invalid URL.`); }
  if (!hostname.startsWith(`${String(expectedStoreId).toLowerCase()}.`)) throw new Error(`${label} Blob store ID does not match the configured ${VERCEL_ENV} store.`);
}
async function deletePrivateBlob(storagePath) {
  if (!storagePath || !PRIVATE_BLOB_TOKEN) return;
  try {
    const { del } = require('@vercel/blob');
    await del(blobPathname(storagePath), { token: PRIVATE_BLOB_TOKEN });
  } catch (error) {
    console.error(JSON.stringify({ action: 'media.cleanup_failed', storagePath: blobPathname(storagePath), error: error.message }));
  }
}
async function storePrivateBlob({ pathname, buffer, contentType }) {
  if (!PRIVATE_BLOB_TOKEN) throw new Error(`${privateTokenName} is required before uploading an image.`);
  const { get, put } = require('@vercel/blob');
  let storagePath = '';
  try {
    const blob = await put(pathname, buffer, { access: 'private', addRandomSuffix: true, token: PRIVATE_BLOB_TOKEN, contentType });
    storagePath = blob.pathname || blob.url;
    if (!storagePath) throw new Error('Private Vercel Blob did not return a storage path.');
    assertBlobStore(blob.url, PRIVATE_BLOB_STORE_ID, 'Private');
    const verification = await get(blobPathname(storagePath), { access: 'private', token: PRIVATE_BLOB_TOKEN, useCache: false });
    if (!verification || verification.statusCode !== 200) throw new Error('The uploaded image could not be verified in the private Vercel Blob store.');
    return storagePath;
  } catch (error) {
    await deletePrivateBlob(storagePath);
    throw error;
  }
}
async function readPrivateBlob(storagePath) {
  if (!PRIVATE_BLOB_TOKEN) throw new Error(`${privateTokenName} is required before reading an uploaded image.`);
  const { get } = require('@vercel/blob');
  const blob = await get(blobPathname(storagePath), { access: 'private', token: PRIVATE_BLOB_TOKEN, useCache: false });
  if (!blob || blob.statusCode !== 200) throw new Error('The private Vercel Blob image could not be read.');
  return { blob, buffer: Buffer.from(await new Response(blob.stream).arrayBuffer()) };
}
function parseClientUploadPath(value) {
  const pathname = String(value || '').replace(/^\/+/, '');
  const match = pathname.match(/^private\/([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})\.(jpg|png|webp|avif|gif)$/i);
  if (!match) throw new Error('The secure upload path is invalid.');
  return { pathname, id: match[1], extension: `.${match[2].toLowerCase()}` };
}
function mediaResponse(asset) {
  return {
    id: asset.id,
    original_name: asset.original_name,
    alt_text_en: asset.alt_text_en || '',
    alt_text_sw: asset.alt_text_sw || '',
    caption_en: asset.caption_en || '',
    caption_sw: asset.caption_sw || '',
    description_en: asset.description_en || '',
    description_sw: asset.description_sw || '',
    mime_type: asset.mime_type,
    file_size: asset.file_size,
    width: asset.width,
    height: asset.height,
    status: asset.status,
    public_url: asset.public_url || null,
    src: `media:${asset.id}`,
    preview_url: `/api/media/${asset.id}/file`
  };
}

async function pageId(executor, slug) { return (await query(executor, 'SELECT id FROM pages WHERE slug = $1', [slug])).rows[0]?.id; }
async function currentContent(executor, slug, status, language) {
  const id = await pageId(executor, slug);
  if (!id) return null;
  const row = (await query(executor, 'SELECT id, version, content_json, blocks_json, updated_at FROM page_content WHERE page_id = $1 AND status = $2 AND language = $3', [id, status, language])).rows[0];
  return row ? { id: row.id, version: row.version, content: normalizeHomeContent(slug, currentBlockRecord(row)), updated_at: row.updated_at } : null;
}
async function allContent(executor, slug, status) {
  const id = await pageId(executor, slug);
  if (!id) return {};
  const result = await query(executor, 'SELECT language, version, content_json, blocks_json, updated_at FROM page_content WHERE page_id = $1 AND status = $2', [id, status]);
  return Object.fromEntries(result.rows.map((row) => [row.language, { version: row.version, content: normalizeHomeContent(slug, currentBlockRecord(row)), updated_at: row.updated_at }]));
}
async function saveContent(executor, slug, status, content, userId, language = 'en') {
  const id = await pageId(executor, slug);
  if (!id) throw new Error('Unknown page.');
  const existing = (await query(executor, 'SELECT version FROM page_content WHERE page_id = $1 AND status = $2 AND language = $3', [id, status, language])).rows[0];
  const version = Number(existing?.version || 0) + 1;
  const split = splitBlocks(content);
  await query(executor, `INSERT INTO page_content (page_id, language, status, content_json, blocks_json, version, created_by, updated_at)
    VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6, $7, CURRENT_TIMESTAMP)
    ON CONFLICT(page_id, language, status) DO UPDATE SET content_json = EXCLUDED.content_json, blocks_json = EXCLUDED.blocks_json, version = EXCLUDED.version, created_by = EXCLUDED.created_by, updated_at = CURRENT_TIMESTAMP`, [id, language, status, safeJson(split.content), safeJson(split.blocks), version, userId]);
  return { version };
}
function collectMediaMarkers(value, found = new Set()) {
  if (typeof value === 'string' && value.startsWith('media:')) found.add(value.slice(6));
  else if (Array.isArray(value)) value.forEach((item) => collectMediaMarkers(item, found));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectMediaMarkers(item, found));
  return [...found];
}
async function publishMedia(mediaId) {
  const asset = (await query(pool, 'SELECT * FROM media_assets WHERE id = $1', [mediaId])).rows[0];
  if (!asset) throw new Error(`Media asset ${mediaId} was not found.`);
  if (asset.public_url) {
    const response = await fetch(asset.public_url, { method: 'HEAD', cache: 'no-store' });
    if (!response.ok) throw new Error(`The published image for media asset ${mediaId} is not reachable (${response.status}).`);
    return asset.public_url;
  }
  if (!PRIVATE_BLOB_TOKEN || !PUBLIC_BLOB_TOKEN) throw new Error(`${privateTokenName} and ${publicTokenName} are required before publishing an uploaded image.`);
  const { get, put } = require('@vercel/blob');
  const privateBlob = await get(blobPathname(asset.storage_path), { access: 'private', token: PRIVATE_BLOB_TOKEN, useCache: false });
  if (!privateBlob || privateBlob.statusCode !== 200) throw new Error('The private Vercel Blob image could not be read.');
  const fileBuffer = Buffer.from(await new Response(privateBlob.stream).arrayBuffer());
  const extension = path.extname(blobPathname(asset.storage_path)) || '.bin';
  const blob = await put(`published/${asset.id}${extension}`, fileBuffer, { access: 'public', addRandomSuffix: true, token: PUBLIC_BLOB_TOKEN, contentType: asset.mime_type, cacheControlMaxAge: 31536000 });
  assertBlobStore(blob.url, PUBLIC_BLOB_STORE_ID, 'Public');
  const verification = await fetch(blob.url, { method: 'HEAD', cache: 'no-store' });
  if (!verification.ok) throw new Error(`The published Vercel Blob image could not be verified (${verification.status}).`);
  await query(pool, 'UPDATE media_assets SET public_url = $1, status = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3', [blob.url, 'published', asset.id]);
  return blob.url;
}
async function materializeMedia(value) {
  if (typeof value === 'string' && value.startsWith('media:')) return publishMedia(value.slice(6));
  if (Array.isArray(value)) return Promise.all(value.map(materializeMedia));
  if (value && typeof value === 'object') return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await materializeMedia(item)])));
  return value;
}
async function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'Authentication required.' });
  try {
    const user = (await query(pool, 'SELECT id, email, role, active FROM admin_users WHERE id = $1', [req.session.user.id])).rows[0];
    if (!user || !user.active) return req.session.destroy(() => res.status(401).json({ error: 'Session is no longer active.' }));
    req.user = user;
    next();
  } catch (error) { next(error); }
}
function requireRole(...roles) { return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ error: 'You do not have permission for this operation.' }); }
function sameOrigin(req, res, next) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
  const origin = req.get('origin');
  const deploymentOrigin = process.env.VERCEL_URL ? `https://${String(process.env.VERCEL_URL).replace(/^https?:\/\//i, '')}` : '';
  const requestOrigin = req.get('host') ? `${req.protocol}://${req.get('host')}` : '';
  if (!origin || origin === PUBLIC_ORIGIN || origin === deploymentOrigin || origin === requestOrigin) return next();
  return res.status(403).json({ error: 'Cross-origin request rejected.' });
}
function audit(req, action, target, metadata = {}) { console.log(JSON.stringify({ at: nowIso(), actor: req.user?.email || 'public', action, target, metadata })); }
const EDITABLE_SELECTORS = new Set(['main h1, main h2, main h3, main p, main strong, main span, main a, main button, footer h3, footer p, footer span, footer a', 'main img, footer img']);
const SAFE_HREF = /^(?:https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+|#[^\s]*|\/[^\s]*|[a-z0-9][a-z0-9_-]*\.html(?:[?#].*)?)$/i;
const SAFE_IMAGE = /^(?:media:[^\s]+|https?:\/\/[^\s]+|data:image\/(?:jpeg|png|webp|avif|gif);base64,[a-z0-9+/=]+|\/[^\s]+|[a-z0-9_ ./-]+\.(?:jpe?g|png|webp|avif|gif)(?:[?#].*)?)$/i;
function validateStructuredImages(value, pathName = 'content') {
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const error = validateStructuredImages(item, `${pathName}.${index}`);
      if (error) return error;
    }
    return null;
  }
  if (!value || typeof value !== 'object') return null;
  for (const [key, item] of Object.entries(value)) {
    if (key === 'image' && typeof item === 'string' && item && (!SAFE_IMAGE.test(item) || validateImageReference(item))) return `Invalid image reference at ${pathName}.${key}.`;
    const error = validateStructuredImages(item, `${pathName}.${key}`);
    if (error) return error;
  }
  return null;
}
function collectExternalImageUrls(value, found = new Set(), key = '') {
  if (typeof value === 'string' && key === 'image' && /^https:\/\//i.test(value)) found.add(value);
  else if (Array.isArray(value)) value.forEach((item) => collectExternalImageUrls(item, found));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([childKey, item]) => collectExternalImageUrls(item, found, childKey));
  return [...found];
}
async function validateContent(slug, content) {
  const serialized = safeJson(content);
  if (serialized.length > 2 * 1024 * 1024) return 'Content payload is too large.';
  const structuredImageError = validateStructuredImages(content);
  if (structuredImageError) return `${structuredImageError} on ${slug}.`;
  const blockError = validateBlocks(slug, content?.blocks);
  if (blockError) return blockError;
  const externalImageUrls = collectExternalImageUrls(content);
  if (Array.isArray(content?.elements)) content.elements.forEach((element) => { if (element?.kind === 'image' && /^https:\/\//i.test(element.value || '')) externalImageUrls.push(element.value); });
  for (const url of new Set(externalImageUrls)) {
    try { await assertSafeRemoteDestination(url); } catch (error) { return `External image URL is not allowed on ${slug}: ${error.message}`; }
  }
  if (!Array.isArray(content?.elements)) return null;
  for (const [index, element] of content.elements.entries()) {
    const field = element?.field_id || `legacy element ${index + 1}`;
    if (!element || !['text', 'image'].includes(element.kind)) return `Invalid editable field ${field} on ${slug}: kind must be text or image.`;
    const registered = element.field_id ? cmsFields.find(slug, element.field_id) : null;
    if (!Number.isInteger(element.index) || (element.index < 0 && !registered)) return `Invalid editable field ${field} on ${slug}: element index is invalid.`;
    if (!EDITABLE_SELECTORS.has(element.selector)) return `Invalid editable field ${field} on ${slug}: selector is not an approved public selector.`;
    if (element.field_id && !registered && !element.field_id.startsWith(`${slug}.legacy.`)) return `Invalid editable field ${field} on ${slug}: field is not registered for this page.`;
    if (registered && registered.kind !== element.kind) return `Invalid editable field ${field} on ${slug}: expected a ${registered.kind} field.`;
    if (typeof element.value !== 'string') return `Invalid editable field ${field} on ${slug}: value must be text.`;
    if (element.kind === 'image' && element.value && (!SAFE_IMAGE.test(element.value) || validateImageReference(element.value))) return `Invalid editable field ${field} on ${slug}: image reference is not allowed.`;
    if (element.href && (typeof element.href !== 'string' || !SAFE_HREF.test(element.href))) return `Invalid editable field ${field} on ${slug}: link must be an approved internal or external URL.`;
    if (element.alt !== undefined && typeof element.alt !== 'string') return `Invalid editable field ${field} on ${slug}: alt text must be text.`;
    if (element.position && !['center', 'top', 'bottom', 'left', 'right'].includes(element.position)) return `Invalid editable field ${field} on ${slug}: image position is invalid.`;
  }
  return null;
}

app.use(sameOrigin);
app.get('/api/auth/me', (req, res) => req.session.user ? res.json({ user: req.session.user }) : res.status(401).json({ error: 'Not authenticated.' }));
app.post('/api/auth/login', loginLimiter, async (req, res, next) => {
  try {
    const email = cleanEmail(req.body.email);
    const password = String(req.body.password || '');
    const user = (await query(pool, 'SELECT id, email, password_hash, role, active FROM admin_users WHERE email = $1', [email])).rows[0];
    if (!user || !user.active || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: 'Invalid email or password.' });
    req.session.regenerate((error) => {
      if (error) return res.status(500).json({ error: 'Could not start a secure session.' });
      req.session.user = { id: user.id, email: user.email, role: user.role };
      res.json({ user: req.session.user });
    });
  } catch (error) { next(error); }
});
app.post('/api/auth/logout', requireAuth, (req, res) => req.session.destroy((error) => error ? res.status(500).json({ error: 'Could not end session.' }) : res.status(204).end()));

app.get('/api/pages', requireAuth, async (_req, res, next) => { try { res.json({ pages: (await query(pool, 'SELECT slug, name, sort_order FROM pages ORDER BY sort_order')).rows }); } catch (error) { next(error); } });
app.get('/api/pages/:slug', requireAuth, async (req, res, next) => {
  try {
    const page = (await query(pool, 'SELECT slug, name, sort_order FROM pages WHERE slug = $1', [req.params.slug])).rows[0];
    if (!page) return res.status(404).json({ error: 'Page not found.' });
    const pageKey = await pageId(pool, req.params.slug);
    const revisions = (await query(pool, 'SELECT id, language, version, created_at, created_by FROM content_revisions WHERE page_id = $1 ORDER BY created_at DESC LIMIT 50', [pageKey])).rows;
    res.json({ page, draft: await allContent(pool, req.params.slug, 'draft'), published: await allContent(pool, req.params.slug, 'published'), revisions });
  } catch (error) { next(error); }
});
app.put('/api/pages/:slug/draft', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res, next) => {
  try {
    if (!req.body || typeof req.body.content !== 'object') return res.status(400).json({ error: 'A content object is required.' });
    const validationError = await validateContent(req.params.slug, req.body.content);
    if (validationError) return res.status(400).json({ error: validationError });
    const language = req.body.language === 'sw' ? 'sw' : 'en';
    const previous = await currentContent(pool, req.params.slug, 'draft', language);
    const previousOrdering = previous?.content?.ordering?.[language] || previous?.content?.ordering?.en || {};
    const nextOrdering = req.body.content?.ordering?.[language] || req.body.content?.ordering?.en || {};
    const changedPaymentFields = ['mpesaNumber', 'crdbNumber'].filter((key) => previousOrdering[key] !== undefined && nextOrdering[key] !== previousOrdering[key]);
    if (changedPaymentFields.length && !['owner', 'admin'].includes(req.user.role)) return res.status(403).json({ error: 'Only an owner or administrator may change payment account numbers.' });
    const result = await saveContent(pool, req.params.slug, 'draft', req.body.content, req.user.id, language);
    audit(req, 'draft.save', req.params.slug, { language, version: result.version });
    if (changedPaymentFields.length) audit(req, 'payment.details.update', req.params.slug, { language, fields: changedPaymentFields });
    res.json({ ok: true, ...result, draft: await allContent(pool, req.params.slug, 'draft') });
  } catch (error) { next(error); }
});
app.post('/api/pages/:slug/publish', requireAuth, requireRole('owner', 'admin'), async (req, res, next) => {
  const client = await pool.connect();
  try {
    const page = (await query(client, 'SELECT id FROM pages WHERE slug = $1', [req.params.slug])).rows[0];
    if (!page) return res.status(404).json({ error: 'Page not found.' });
    const drafts = await allContent(client, req.params.slug, 'draft');
    const languages = Object.keys(drafts);
    if (!languages.length) return res.status(400).json({ error: 'Save a draft before publishing.' });
    const materialized = {};
    for (const language of languages) {
      materialized[language] = await materializeMedia(drafts[language].content);
      const unresolved = collectMediaMarkers(materialized[language]);
      if (unresolved.length) throw new Error(`Publishing stopped: unresolved media reference(s): ${unresolved.join(', ')}`);
    }
    await client.query('BEGIN');
    for (const language of languages) {
      const current = await currentContent(client, req.params.slug, 'published', language);
      if (current) {
        const split = splitBlocks(current.content);
        await query(client, 'INSERT INTO content_revisions (page_id, language, version, content_json, blocks_json, created_by) VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6)', [page.id, language, current.version, safeJson(split.content), safeJson(split.blocks), req.user.id]);
      }
      await saveContent(client, req.params.slug, 'published', materialized[language], req.user.id, language);
    }
    await client.query('COMMIT');
    audit(req, 'publish', req.params.slug, { languages });
    const revisions = (await query(client, 'SELECT id, language, version, created_at, created_by FROM content_revisions WHERE page_id = $1 ORDER BY created_at DESC LIMIT 50', [page.id])).rows;
    res.json({ ok: true, published: await allContent(client, req.params.slug, 'published'), revisions });
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch {}
    next(error);
  } finally { client.release(); }
});
app.post('/api/pages/:slug/restore/:revisionId', requireAuth, requireRole('owner', 'admin'), async (req, res, next) => {
  try {
    const pageKey = await pageId(pool, req.params.slug);
    const revision = (await query(pool, 'SELECT page_id, language, content_json, blocks_json FROM content_revisions WHERE id = $1', [Number(req.params.revisionId)])).rows[0];
    if (!revision || revision.page_id !== pageKey) return res.status(404).json({ error: 'Revision not found.' });
    await saveContent(pool, req.params.slug, 'draft', withBlocks(parseJson(revision.content_json), parseJson(revision.blocks_json)), req.user.id, revision.language);
    audit(req, 'revision.restore', req.params.slug, { revisionId: revision.id });
    res.json({ ok: true, draft: await allContent(pool, req.params.slug, 'draft') });
  } catch (error) { next(error); }
});
app.get('/api/public/:slug', async (req, res, next) => {
  try {
    const page = (await query(pool, 'SELECT slug, name FROM pages WHERE slug = $1', [req.params.slug])).rows[0];
    if (!page) return res.status(404).json({ error: 'Page not found.' });
    res.set('Cache-Control', 'no-store');
    res.json({ page, published: await allContent(pool, req.params.slug, 'published') });
  } catch (error) { next(error); }
});

app.get('/api/media', requireAuth, async (_req, res, next) => { try { const assets = (await query(pool, 'SELECT id, original_name, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, status, public_url, created_at FROM media_assets ORDER BY created_at DESC')).rows.map((asset) => ({ ...asset, src: `media:${asset.id}`, preview_url: `/api/media/${asset.id}/file` })); res.json({ media: assets }); } catch (error) { next(error); } });
app.patch('/api/media/:id', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res, next) => {
  try {
    let metadata;
    try { metadata = normalizeMediaMetadata(req.body || {}); } catch (error) { return res.status(400).json({ error: error.message }); }
    const result = await query(pool, `UPDATE media_assets SET alt_text_en = $1, alt_text_sw = $2, caption_en = $3, caption_sw = $4, description_en = $5, description_sw = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7 RETURNING id, original_name, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, status, public_url`, [metadata.alt_text_en, metadata.alt_text_sw, metadata.caption_en, metadata.caption_sw, metadata.description_en, metadata.description_sw, req.params.id]);
    if (!result.rows[0]) return res.status(404).json({ error: 'Media asset not found.' });
    audit(req, 'media.metadata.update', req.params.id);
    res.json({ media: mediaResponse(result.rows[0]) });
  } catch (error) { next(error); }
});
app.delete('/api/media/:id', requireAuth, requireRole('owner', 'admin'), async (req, res, next) => {
  try {
    const asset = (await query(pool, 'SELECT * FROM media_assets WHERE id = $1', [req.params.id])).rows[0];
    if (!asset) return res.status(404).json({ error: 'Media asset not found.' });
    const references = await query(pool, `SELECT p.slug FROM pages p JOIN page_content c ON c.page_id = p.id
      WHERE c.content_json::text LIKE $1 OR c.blocks_json::text LIKE $1 GROUP BY p.slug`, [`%media:${req.params.id}%`]);
    if (references.rowCount) return res.status(409).json({ error: `This image is still used on ${references.rows.map((row) => row.slug).join(', ')}. Replace it there before removing it.` });
    if (asset.public_url && PUBLIC_BLOB_TOKEN) {
      try { const { del } = require('@vercel/blob'); await del(asset.public_url, { token: PUBLIC_BLOB_TOKEN }); } catch (error) { console.error(JSON.stringify({ action: 'media.public_cleanup_failed', mediaId: req.params.id, error: error.message })); }
    }
    await deletePrivateBlob(asset.storage_path);
    await query(pool, 'DELETE FROM media_assets WHERE id = $1', [req.params.id]);
    audit(req, 'media.delete', req.params.id);
    res.json({ ok: true });
  } catch (error) { next(error); }
});
app.post('/api/media/client-upload', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res, next) => {
  try {
    if (!PRIVATE_BLOB_TOKEN) return res.status(500).json({ error: `${privateTokenName} is required before uploading an image.` });
    if (req.body?.type !== 'blob.generate-client-token') return res.status(400).json({ error: 'Invalid secure upload request.' });
    const payload = req.body?.payload || {};
    const upload = parseClientUploadPath(payload.pathname);
    if (payload.multipart) return res.status(400).json({ error: 'Multipart client uploads are not supported for images.' });
    const { handleUpload } = require('@vercel/blob');
    const result = await handleUpload({
      token: PRIVATE_BLOB_TOKEN,
      request: req,
      body: req.body,
      onBeforeGenerateToken: async (pathname, _clientPayload, multipart) => {
        const requested = parseClientUploadPath(pathname);
        if (requested.id !== upload.id || requested.extension !== upload.extension || multipart) throw new Error('The secure upload request does not match the selected image.');
        return {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: false,
          allowedContentTypes: [...ALLOWED_IMAGE_TYPES],
          maximumSizeInBytes: MAX_IMAGE_SIZE
        };
      }
    });
    res.json({ ...result, id: upload.id, pathname: upload.pathname });
  } catch (error) { next(error); }
});
app.post('/api/media/client-upload/complete', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res, next) => {
  let storagePath = '';
  let keepBlob = false;
  const clientError = (message) => { const error = new Error(message); error.statusCode = 400; throw error; };
  try {
    const upload = parseClientUploadPath(req.body?.pathname);
    storagePath = upload.pathname;
    const existing = (await query(pool, 'SELECT * FROM media_assets WHERE id = $1', [upload.id])).rows[0];
    if (existing) { keepBlob = true; return res.status(200).json({ media: mediaResponse(existing) }); }
    const { blob, buffer } = await readPrivateBlob(storagePath);
    let metadata;
    try { metadata = normalizeMediaMetadata(req.body?.metadata || {}); } catch (error) { clientError(error.message); }
    const declaredMime = String(req.body?.mime_type || blob.blob?.contentType || 'application/octet-stream');
    let inspected;
    try { inspected = inspectImageBuffer(buffer, declaredMime); } catch (error) { clientError(error.message); }
    if (inspected.extension !== upload.extension) clientError('The uploaded image extension does not match its file contents.');
    const originalName = String(req.body?.original_name || `${upload.id}${inspected.extension}`).trim().replace(/[\\/\u0000-\u001f\u007f]/g, '_').slice(0, 180) || `${upload.id}${inspected.extension}`;
    await query(pool, `INSERT INTO media_assets (id, original_name, storage_path, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, [upload.id, originalName, storagePath, inspected.mimeType, inspected.fileSize, inspected.width, inspected.height, metadata.alt_text_en, metadata.alt_text_sw, metadata.caption_en, metadata.caption_sw, metadata.description_en, metadata.description_sw, req.user.id]);
    keepBlob = true;
    audit(req, 'media.upload', upload.id, { filename: originalName, transport: 'client-upload' });
    res.status(201).json({ media: mediaResponse({ id: upload.id, original_name: originalName, ...metadata, mime_type: inspected.mimeType, file_size: inspected.fileSize, width: inspected.width, height: inspected.height, status: 'private', public_url: null }) });
  } catch (error) {
    if (!keepBlob) await deletePrivateBlob(storagePath);
    next(error);
  }
});
app.post('/api/media', requireAuth, requireRole('owner', 'admin', 'editor'), upload.single('file'), async (req, res, next) => {
  let storagePath = '';
  try {
    if (!req.file) return res.status(400).json({ error: 'Upload a supported image file.' });
    if (!PRIVATE_BLOB_TOKEN) return res.status(500).json({ error: `${privateTokenName} is required before uploading an image.` });
    let metadata;
    try { metadata = normalizeMediaMetadata(req.body); } catch (error) { return res.status(400).json({ error: error.message }); }
    let inspected;
    try { inspected = inspectImageBuffer(req.file.buffer, req.file.mimetype); } catch (error) { return res.status(400).json({ error: error.message }); }
    const id = crypto.randomUUID();
    storagePath = await storePrivateBlob({ pathname: `private/${id}${inspected.extension}`, buffer: req.file.buffer, contentType: inspected.mimeType });
    await query(pool, `INSERT INTO media_assets (id, original_name, storage_path, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, [id, req.file.originalname, storagePath, inspected.mimeType, inspected.fileSize, inspected.width, inspected.height, metadata.alt_text_en, metadata.alt_text_sw, metadata.caption_en, metadata.caption_sw, metadata.description_en, metadata.description_sw, req.user.id]);
    audit(req, 'media.upload', id, { filename: req.file.originalname });
    res.status(201).json({ media: { id, original_name: req.file.originalname, ...metadata, mime_type: inspected.mimeType, file_size: inspected.fileSize, width: inspected.width, height: inspected.height, status: 'private', src: `media:${id}`, preview_url: `/api/media/${id}/file` } });
  } catch (error) {
    await deletePrivateBlob(storagePath);
    next(error);
  }
});
app.post('/api/media/import', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res, next) => {
  let storagePath = '';
  try {
    const sourceUrl = String(req.body?.url || '').trim();
    if (!sourceUrl) return res.status(400).json({ error: 'An HTTPS image URL is required.' });
    if (!PRIVATE_BLOB_TOKEN) return res.status(500).json({ error: `${privateTokenName} is required before importing an image.` });
    let metadata;
    try { metadata = normalizeMediaMetadata(req.body); } catch (error) { return res.status(400).json({ error: error.message }); }
    let imported;
    try { imported = await fetchRemoteImage(sourceUrl); } catch (error) { return res.status(400).json({ error: error.message }); }
    const id = crypto.randomUUID();
    storagePath = await storePrivateBlob({ pathname: `private/${id}${IMAGE_EXTENSIONS.get(imported.mimeType)}`, buffer: imported.buffer, contentType: imported.mimeType });
    const originalName = `remote-${imported.sourceHash}${IMAGE_EXTENSIONS.get(imported.mimeType)}`;
    await query(pool, `INSERT INTO media_assets (id, original_name, storage_path, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, [id, originalName, storagePath, imported.mimeType, imported.fileSize, imported.width, imported.height, metadata.alt_text_en, metadata.alt_text_sw, metadata.caption_en, metadata.caption_sw, metadata.description_en, metadata.description_sw, req.user.id]);
    audit(req, 'media.import', id, { source: imported.sourceUrl, mimeType: imported.mimeType, fileSize: imported.fileSize });
    res.status(201).json({ media: { id, original_name: originalName, ...metadata, mime_type: imported.mimeType, file_size: imported.fileSize, width: imported.width, height: imported.height, status: 'private', src: `media:${id}`, preview_url: `/api/media/${id}/file` } });
  } catch (error) {
    await deletePrivateBlob(storagePath);
    next(error);
  }
});
app.get('/api/media/:id/file', requireAuth, async (req, res, next) => {
  try {
    const asset = (await query(pool, 'SELECT storage_path, mime_type, public_url FROM media_assets WHERE id = $1', [req.params.id])).rows[0];
    if (!asset) return res.status(404).end();
    if (asset.public_url) return res.redirect(asset.public_url);
    if (!PRIVATE_BLOB_TOKEN) return res.status(500).end();
    const { get } = require('@vercel/blob');
    const blob = await get(blobPathname(asset.storage_path), { access: 'private', token: PRIVATE_BLOB_TOKEN, useCache: false });
    if (!blob || blob.statusCode !== 200) return res.status(404).end();
    res.type(asset.mime_type).set('Cache-Control', 'private, no-cache');
    return Readable.fromWeb(blob.stream).pipe(res);
  } catch (error) { next(error); }
});

app.post('/api/messages', async (req, res, next) => {
  try {
    const type = req.body.type === 'partnership' ? 'partnership' : 'contact';
    const name = String(req.body.name || '').trim(); const phone = String(req.body.phone || '').trim(); const message = String(req.body.message || '').trim(); const email = String(req.body.email || '').trim();
    if (!name || !phone || !message) return res.status(400).json({ error: 'Name, phone and message are required.' });
    if (name.length > 120 || phone.length > 60 || message.length > 5000 || email.length > 180) return res.status(400).json({ error: 'Message fields are too long.' });
    const result = await query(pool, 'INSERT INTO messages (type, name, phone, email, message) VALUES ($1, $2, $3, $4, $5) RETURNING id', [type, name, phone, email || null, message]);
    res.status(201).json({ ok: true, id: result.rows[0].id });
  } catch (error) { next(error); }
});
app.get('/api/messages', requireAuth, requireRole('owner', 'admin', 'editor'), async (_req, res, next) => { try { res.json({ messages: (await query(pool, 'SELECT * FROM messages ORDER BY created_at DESC')).rows }); } catch (error) { next(error); } });
app.patch('/api/messages/:id', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res, next) => { try { const status = req.body.status === 'handled' ? 'handled' : 'new'; await query(pool, 'UPDATE messages SET status = $1, handled_at = $2, handled_by = $3 WHERE id = $4', [status, status === 'handled' ? nowIso() : null, status === 'handled' ? req.user.id : null, Number(req.params.id)]); res.json({ ok: true }); } catch (error) { next(error); } });
app.get('/api/settings', requireAuth, requireRole('owner', 'admin'), async (_req, res, next) => { try { const rows = (await query(pool, 'SELECT key, value_json FROM site_settings')).rows; res.json({ settings: Object.fromEntries(rows.map((row) => [row.key, parseJson(row.value_json)])) }); } catch (error) { next(error); } });
app.put('/api/settings', requireAuth, requireRole('owner', 'admin'), async (req, res, next) => { try { for (const [key, value] of Object.entries(req.body.settings || {})) await query(pool, 'INSERT INTO site_settings (key, value_json, updated_by, updated_at) VALUES ($1, $2::jsonb, $3, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value_json = EXCLUDED.value_json, updated_by = EXCLUDED.updated_by, updated_at = CURRENT_TIMESTAMP', [key, safeJson(value), req.user.id]); audit(req, 'settings.update', 'site_settings'); res.json({ ok: true }); } catch (error) { next(error); } });

function frontendAssetHeaders(res, filePath) {
  if (/\.(html|js|css)$/i.test(filePath)) res.setHeader('Cache-Control', 'no-cache, must-revalidate');
}

app.get('/admin/', (_req, res) => res.set('Cache-Control', 'no-cache, must-revalidate').sendFile(path.join(ROOT, 'admin', 'index.html')));
app.use('/admin', express.static(path.join(ROOT, 'admin'), { setHeaders: frontendAssetHeaders }));
app.get('/', (_req, res) => res.sendFile(path.join(ROOT, 'index.html')));
app.use(express.static(ROOT, { extensions: ['html'], index: false, setHeaders: frontendAssetHeaders }));
app.use((error, _req, res, _next) => {
  console.error(error);
  const status = error?.code === 'LIMIT_FILE_SIZE' ? 413 : error instanceof multer.MulterError ? 400 : error.statusCode || 500;
  res.status(status).json({ error: error.message || 'Request failed.' });
});

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => console.log(`EcoPower PostgreSQL CMS running at ${PUBLIC_ORIGIN}`));
}

module.exports = { app, pool, ready };
