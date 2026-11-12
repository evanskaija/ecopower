require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { Readable } = require('node:stream');
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const cmsFields = require('./cms-fields.js');
const Database = require('better-sqlite3');
const { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE, MAX_SERVER_UPLOAD_SIZE, assertSafeRemoteDestination, fetchRemoteImage, inspectImageBuffer, normalizeImageMimeType, normalizeMediaMetadata, validateImageReference } = require('./media-security.js');
const { reconcileLanguageRecords } = require('./language-media.js');

const ROOT = __dirname;
const DATA_DIR = path.resolve(ROOT, 'data');
const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(ROOT, 'uploads'));
const PRIVATE_UPLOAD_DIR = path.join(UPLOAD_DIR, 'private');
const PUBLISHED_UPLOAD_DIR = path.join(UPLOAD_DIR, 'published');
const PUBLIC_ORIGIN = process.env.PUBLIC_ORIGIN || 'http://localhost:3000';
const PAGES = [
  ['home', 'Home'], ['products', 'Products and Prices'], ['about', 'About Us'], ['team', 'Our Team'],
  ['impact', 'Our Impact'], ['partners', 'Partner With Us'], ['faq', 'Questions'], ['contact', 'Contact Us']
];

for (const directory of [DATA_DIR, PRIVATE_UPLOAD_DIR, PUBLISHED_UPLOAD_DIR]) fs.mkdirSync(directory, { recursive: true });

if (process.env.NODE_ENV === 'production' && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET === 'development-only-change-this-secret')) {
  throw new Error('SESSION_SECRET must be configured before starting the production server.');
}

function sqliteFilename() {
  const value = process.env.DATABASE_URL || 'file:./data/ecopower.sqlite';
  if (!value.startsWith('file:')) throw new Error('The local backend currently requires DATABASE_URL=file:...; PostgreSQL adapter is the next production phase.');
  return path.resolve(ROOT, value.slice('file:'.length));
}

function createDatabase() {
  const db = new Database(sqliteFilename());
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec('CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)');
  const appliedMigrations = db.prepare('SELECT id FROM schema_migrations').all().map((row) => row.id);
  const migrationFiles = fs.readdirSync(path.join(ROOT, 'migrations')).filter((file) => /^\d+_.*\.sql$/i.test(file) && !/_postgres\.sql$/i.test(file)).sort();
  for (const migrationFile of migrationFiles) {
    if (appliedMigrations.includes(migrationFile)) continue;
    const migration = fs.readFileSync(path.join(ROOT, 'migrations', migrationFile), 'utf8');
    db.transaction(() => {
      db.exec(migration);
      db.prepare('INSERT INTO schema_migrations (id) VALUES (?)').run(migrationFile);
    })();
  }
  const insertPage = db.prepare('INSERT OR IGNORE INTO pages (id, slug, name, sort_order) VALUES (?, ?, ?, ?)');
  const seedPages = db.transaction(() => PAGES.forEach(([slug, name], index) => insertPage.run(crypto.createHash('sha256').update(`page:${slug}`).digest('hex').slice(0, 24), slug, name, index + 1)));
  seedPages();
  return db;
}

const db = createDatabase();
const app = express();

class SQLiteSessionStore extends session.Store {
  constructor() {
    super();
    this.storeDb = new Database(path.join(DATA_DIR, 'sessions.sqlite'));
    this.storeDb.exec('CREATE TABLE IF NOT EXISTS sessions (sid TEXT PRIMARY KEY, sess TEXT NOT NULL, expired INTEGER NOT NULL)');
  }
  get(sid, callback) {
    try {
      const row = this.storeDb.prepare('SELECT sess, expired FROM sessions WHERE sid = ?').get(sid);
      if (!row || row.expired <= Date.now()) {
        if (row) this.storeDb.prepare('DELETE FROM sessions WHERE sid = ?').run(sid);
        return callback(null, null);
      }
      callback(null, JSON.parse(row.sess));
    } catch (error) { callback(error); }
  }
  set(sid, sess, callback) {
    try {
      const expires = sess.cookie?.expires ? new Date(sess.cookie.expires).getTime() : Date.now() + Number(sess.cookie?.maxAge || 86400000);
      this.storeDb.prepare('INSERT INTO sessions (sid, sess, expired) VALUES (?, ?, ?) ON CONFLICT(sid) DO UPDATE SET sess = excluded.sess, expired = excluded.expired').run(sid, JSON.stringify(sess), expires);
      callback?.(null);
    } catch (error) { callback?.(error); }
  }
  destroy(sid, callback) { try { this.storeDb.prepare('DELETE FROM sessions WHERE sid = ?').run(sid); callback?.(null); } catch (error) { callback?.(error); } }
  touch(sid, sess, callback) { this.set(sid, sess, callback); }
}

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
  secret: process.env.SESSION_SECRET || 'development-only-change-this-secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new SQLiteSessionStore(),
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 8 * 60 * 60 * 1000 }
}));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, message: { error: 'Too many login attempts. Try again later.' } });
const upload = multer({
  storage: process.env.NODE_ENV === 'production' ? multer.memoryStorage() : multer.diskStorage({
    destination: (_req, _file, callback) => callback(null, PRIVATE_UPLOAD_DIR),
    filename: (_req, file, callback) => callback(null, `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)
  }),
  limits: { fileSize: process.env.NODE_ENV === 'production' ? MAX_SERVER_UPLOAD_SIZE : MAX_IMAGE_SIZE, files: 1 },
  fileFilter: (_req, file, callback) => callback(null, Boolean(normalizeImageMimeType(file.originalname, file.mimetype)))
});

function pageId(slug) { return db.prepare('SELECT id FROM pages WHERE slug = ?').get(slug)?.id; }
function nowIso() { return new Date().toISOString(); }
function safeJson(value) { return JSON.stringify(value ?? {}); }
function parseJson(value) { try { return JSON.parse(value); } catch { return {}; } }
function publicUrlFor(fileName) { return `/uploads/published/${encodeURIComponent(fileName)}`; }
function cleanEmail(value) { return String(value || '').trim().toLowerCase(); }
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

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'Authentication required.' });
  const user = db.prepare('SELECT id, email, role, active FROM admin_users WHERE id = ?').get(req.session.user.id);
  if (!user || !user.active) return req.session.destroy(() => res.status(401).json({ error: 'Session is no longer active.' }));
  req.user = user;
  next();
}

function requireRole(...roles) {
  return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ error: 'You do not have permission for this operation.' });
}

function sameOrigin(req, res, next) {
  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) return next();
  const origin = req.get('origin');
  if (!origin || origin === PUBLIC_ORIGIN) return next();
  return res.status(403).json({ error: 'Cross-origin request rejected.' });
}

function currentContent(slug, status, language) {
  const id = pageId(slug);
  if (!id) return null;
  const row = db.prepare('SELECT id, version, content_json, blocks_json, updated_at FROM page_content WHERE page_id = ? AND status = ? AND language = ?').get(id, status, language);
  return row ? { id: row.id, version: row.version, content: normalizeHomeContent(slug, currentBlockRecord(row)), updated_at: row.updated_at } : null;
}

function allContent(slug, status, options = {}) {
  const id = pageId(slug);
  if (!id) return {};
  const records = Object.fromEntries(db.prepare('SELECT language, version, content_json, blocks_json, updated_at FROM page_content WHERE page_id = ? AND status = ?').all(id, status).map((row) => [row.language, { version: row.version, content: normalizeHomeContent(slug, currentBlockRecord(row)), updated_at: row.updated_at }]));
  const reconciled = reconcileLanguageRecords(records);
  return options.withConflicts ? reconciled : reconciled.records;
}

function saveContent(slug, status, content, userId, language = 'en') {
  const id = pageId(slug);
  if (!id) throw new Error('Unknown page.');
  const existing = db.prepare('SELECT version FROM page_content WHERE page_id = ? AND status = ? AND language = ?').get(id, status, language);
  const version = (existing?.version || 0) + 1;
  const split = splitBlocks(content);
  db.prepare(`INSERT INTO page_content (page_id, language, status, content_json, blocks_json, version, created_by, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(page_id, language, status) DO UPDATE SET content_json = excluded.content_json, blocks_json = excluded.blocks_json, version = excluded.version, created_by = excluded.created_by, updated_at = CURRENT_TIMESTAMP`).run(id, language, status, safeJson(split.content), safeJson(split.blocks), version, userId);
  return { version };
}

function collectMediaMarkers(value, found = new Set()) {
  if (typeof value === 'string' && value.startsWith('media:')) found.add(value.slice(6));
  else if (Array.isArray(value)) value.forEach((item) => collectMediaMarkers(item, found));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectMediaMarkers(item, found));
  return [...found];
}

async function publishMedia(mediaId) {
  const asset = db.prepare('SELECT * FROM media_assets WHERE id = ?').get(mediaId);
  if (!asset) throw new Error(`Media asset ${mediaId} was not found.`);
  if (asset.public_url) {
    if (asset.public_url.startsWith('/uploads/published/')) {
      const fileName = decodeURIComponent(asset.public_url.slice('/uploads/published/'.length));
      const publishedPath = path.resolve(PUBLISHED_UPLOAD_DIR, fileName);
      const publishedRoot = path.resolve(PUBLISHED_UPLOAD_DIR);
      const relative = path.relative(publishedRoot, publishedPath);
      if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(publishedPath)) {
        throw new Error(`The published image for media asset ${mediaId} is missing.`);
      }
    }
    return asset.public_url;
  }
  const extension = path.extname(asset.storage_path) || '.bin';
  const publishedName = `${asset.id}${extension}`;
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required before publishing an uploaded image in production.');
    const { get, put } = require('@vercel/blob');
    let fileBuffer;
    if (asset.storage_path.startsWith('http')) {
      const privateBlob = await get(asset.storage_path, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN });
      if (!privateBlob || privateBlob.statusCode !== 200) throw new Error('The private Vercel Blob image could not be read.');
      fileBuffer = Buffer.from(await new Response(privateBlob.stream).arrayBuffer());
    } else {
      fileBuffer = fs.readFileSync(path.resolve(asset.storage_path));
    }
    const blob = await put(`published/${publishedName}`, fileBuffer, { access: 'public', addRandomSuffix: true, token: process.env.BLOB_READ_WRITE_TOKEN, contentType: asset.mime_type, cacheControlMaxAge: 31536000 });
    db.prepare('UPDATE media_assets SET public_url = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(blob.url, 'published', asset.id);
    return blob.url;
  }
  const target = path.join(PUBLISHED_UPLOAD_DIR, publishedName);
  fs.copyFileSync(path.resolve(asset.storage_path), target);
  if (!fs.existsSync(target)) throw new Error(`The published image for media asset ${mediaId} could not be written.`);
  const publicUrl = publicUrlFor(publishedName);
  db.prepare('UPDATE media_assets SET public_url = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(publicUrl, 'published', asset.id);
  return publicUrl;
}

async function materializeMedia(value) {
  if (typeof value === 'string' && value.startsWith('media:')) return publishMedia(value.slice(6));
  if (Array.isArray(value)) return Promise.all(value.map(materializeMedia));
  if (value && typeof value === 'object') return Object.fromEntries(await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await materializeMedia(item)])));
  return value;
}

function audit(req, action, target, metadata = {}) {
  console.log(JSON.stringify({ at: nowIso(), actor: req.user?.email || 'public', action, target, metadata }));
}

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
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const email = cleanEmail(req.body.email);
  const password = String(req.body.password || '');
  const user = db.prepare('SELECT id, email, password_hash, role, active FROM admin_users WHERE email = ?').get(email);
  if (!user || !user.active || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: 'Invalid email or password.' });
  req.session.regenerate((error) => {
    if (error) return res.status(500).json({ error: 'Could not start a secure session.' });
    req.session.user = { id: user.id, email: user.email, role: user.role };
    res.json({ user: req.session.user });
  });
});
app.post('/api/auth/logout', requireAuth, (req, res) => req.session.destroy((error) => error ? res.status(500).json({ error: 'Could not end session.' }) : res.status(204).end()));

app.get('/api/pages', requireAuth, (_req, res) => res.json({ pages: db.prepare('SELECT slug, name, sort_order FROM pages ORDER BY sort_order').all() }));
app.get('/api/pages/:slug', requireAuth, (req, res) => {
  const page = db.prepare('SELECT slug, name, sort_order FROM pages WHERE slug = ?').get(req.params.slug);
  if (!page) return res.status(404).json({ error: 'Page not found.' });
  const draft = allContent(req.params.slug, 'draft', { withConflicts: true });
  const published = allContent(req.params.slug, 'published', { withConflicts: true });
  res.json({ page, draft: draft.records, published: published.records, image_conflicts: [...draft.conflicts, ...published.conflicts], revisions: db.prepare('SELECT id, language, version, created_at, created_by FROM content_revisions WHERE page_id = ? ORDER BY created_at DESC LIMIT 50').all(pageId(req.params.slug)) });
});

app.put('/api/pages/:slug/draft', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res) => {
  if (!req.body || typeof req.body.content !== 'object') return res.status(400).json({ error: 'A content object is required.' });
  const serialized = safeJson(req.body.content);
  if (serialized.length > 2 * 1024 * 1024) return res.status(413).json({ error: 'Content payload is too large.' });
  const validationError = await validateContent(req.params.slug, req.body.content);
  if (validationError) return res.status(400).json({ error: validationError });
  const language = req.body.language === 'sw' ? 'sw' : 'en';
  const previous = currentContent(req.params.slug, 'draft', language);
  const previousOrdering = previous?.content?.ordering?.[language] || previous?.content?.ordering?.en || {};
  const nextOrdering = req.body.content?.ordering?.[language] || req.body.content?.ordering?.en || {};
  const changedPaymentFields = ['mpesaNumber', 'crdbNumber'].filter((key) => previousOrdering[key] !== undefined && nextOrdering[key] !== previousOrdering[key]);
  if (changedPaymentFields.length && !['owner', 'admin'].includes(req.user.role)) return res.status(403).json({ error: 'Only an owner or administrator may change payment account numbers.' });
  const result = saveContent(req.params.slug, 'draft', req.body.content, req.user.id, language);
  audit(req, 'draft.save', req.params.slug, { language, version: result.version });
  if (changedPaymentFields.length) audit(req, 'payment.details.update', req.params.slug, { language, fields: changedPaymentFields });
  const draft = allContent(req.params.slug, 'draft', { withConflicts: true });
  res.json({ ok: true, ...result, draft: draft.records, image_conflicts: draft.conflicts });
});

app.post('/api/pages/:slug/publish', requireAuth, requireRole('owner', 'admin'), async (req, res) => {
  const page = db.prepare('SELECT id FROM pages WHERE slug = ?').get(req.params.slug);
  if (!page) return res.status(404).json({ error: 'Page not found.' });
  try {
    const drafts = allContent(req.params.slug, 'draft');
    const languages = Object.keys(drafts);
    if (!languages.length) return res.status(400).json({ error: 'Save a draft before publishing.' });
    const materialized = {};
    for (const language of languages) {
      const draft = drafts[language];
      const content = await materializeMedia(draft.content);
      const unresolved = collectMediaMarkers(content);
      if (unresolved.length) throw new Error(`Publishing stopped: unresolved media reference(s): ${unresolved.join(', ')}`);
      materialized[language] = content;
    }
    const publishTransaction = db.transaction(() => {
      for (const language of languages) {
        const current = currentContent(req.params.slug, 'published', language);
        if (current) {
          const split = splitBlocks(current.content);
          db.prepare('INSERT INTO content_revisions (page_id, language, version, content_json, blocks_json, created_by) VALUES (?, ?, ?, ?, ?, ?)').run(page.id, language, current.version, safeJson(split.content), safeJson(split.blocks), req.user.id);
        }
        saveContent(req.params.slug, 'published', materialized[language], req.user.id, language);
      }
    });
    publishTransaction();
    audit(req, 'publish', req.params.slug, { languages });
    const published = allContent(req.params.slug, 'published', { withConflicts: true });
    res.json({ ok: true, published: published.records, image_conflicts: published.conflicts, revisions: db.prepare('SELECT id, language, version, created_at, created_by FROM content_revisions WHERE page_id = ? ORDER BY created_at DESC LIMIT 50').all(page.id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Publishing failed. The draft remains available.' });
  }
});

app.post('/api/pages/:slug/restore/:revisionId', requireAuth, requireRole('owner', 'admin'), (req, res) => {
  const revision = db.prepare('SELECT page_id, language, content_json, blocks_json FROM content_revisions WHERE id = ?').get(Number(req.params.revisionId));
  if (!revision || revision.page_id !== pageId(req.params.slug)) return res.status(404).json({ error: 'Revision not found.' });
  saveContent(req.params.slug, 'draft', withBlocks(parseJson(revision.content_json), parseJson(revision.blocks_json)), req.user.id, revision.language);
  audit(req, 'revision.restore', req.params.slug, { revisionId: revision.id });
  const draft = allContent(req.params.slug, 'draft', { withConflicts: true });
  res.json({ ok: true, draft: draft.records, image_conflicts: draft.conflicts });
});

app.get('/api/public/:slug', (req, res) => {
  const page = db.prepare('SELECT slug, name FROM pages WHERE slug = ?').get(req.params.slug);
  if (!page) return res.status(404).json({ error: 'Page not found.' });
  res.set('Cache-Control', 'no-store');
  res.json({ page, published: allContent(req.params.slug, 'published') });
});

app.get('/api/media', requireAuth, (_req, res) => {
  const assets = db.prepare('SELECT id, original_name, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, status, public_url, created_at FROM media_assets ORDER BY created_at DESC').all().map((asset) => ({ ...asset, src: `media:${asset.id}`, preview_url: `/api/media/${asset.id}/file` }));
  res.json({ media: assets });
});
app.patch('/api/media/:id', requireAuth, requireRole('owner', 'admin', 'editor'), (req, res) => {
  try {
    const metadata = normalizeMediaMetadata(req.body || {});
    const result = db.prepare(`UPDATE media_assets SET alt_text_en = ?, alt_text_sw = ?, caption_en = ?, caption_sw = ?, description_en = ?, description_sw = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(metadata.alt_text_en, metadata.alt_text_sw, metadata.caption_en, metadata.caption_sw, metadata.description_en, metadata.description_sw, req.params.id);
    if (!result.changes) return res.status(404).json({ error: 'Media asset not found.' });
    const asset = db.prepare('SELECT id, original_name, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, status, public_url FROM media_assets WHERE id = ?').get(req.params.id);
    audit(req, 'media.metadata.update', req.params.id);
    res.json({ media: { ...asset, src: `media:${asset.id}`, preview_url: `/api/media/${asset.id}/file` } });
  } catch (error) { res.status(400).json({ error: error.message }); }
});
app.delete('/api/media/:id', requireAuth, requireRole('owner', 'admin'), async (req, res) => {
  const asset = db.prepare('SELECT * FROM media_assets WHERE id = ?').get(req.params.id);
  if (!asset) return res.status(404).json({ error: 'Media asset not found.' });
  const references = db.prepare(`SELECT p.slug FROM pages p JOIN page_content c ON c.page_id = p.id WHERE c.content_json LIKE ? OR c.blocks_json LIKE ? GROUP BY p.slug`).all(`%media:${req.params.id}%`, `%media:${req.params.id}%`);
  if (references.length) return res.status(409).json({ error: `This image is still used on ${references.map((row) => row.slug).join(', ')}. Replace it there before removing it.` });
  try {
    if (process.env.NODE_ENV === 'production' && process.env.BLOB_READ_WRITE_TOKEN) {
      const { del } = require('@vercel/blob');
      await del(asset.storage_path, { token: process.env.BLOB_READ_WRITE_TOKEN });
      if (asset.public_url) await del(asset.public_url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } else {
      const filePath = path.resolve(ROOT, asset.storage_path);
      const uploadRoot = path.resolve(UPLOAD_DIR);
      if (filePath === uploadRoot || filePath.startsWith(`${uploadRoot}${path.sep}`)) fs.rmSync(filePath, { force: true });
    }
    db.prepare('DELETE FROM media_assets WHERE id = ?').run(req.params.id);
    audit(req, 'media.delete', req.params.id);
    res.json({ ok: true });
  } catch (error) { res.status(500).json({ error: error.message || 'The image could not be removed.' }); }
});

app.post('/api/media', requireAuth, requireRole('owner', 'admin', 'editor'), upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Upload a supported image file.' });
  try {
    let metadata;
    try { metadata = normalizeMediaMetadata(req.body); } catch (error) { return res.status(400).json({ error: error.message }); }
    const buffer = process.env.NODE_ENV === 'production' ? req.file.buffer : fs.readFileSync(req.file.path);
    const inspected = inspectImageBuffer(buffer, req.file.mimetype);
    const id = crypto.randomUUID();
    let storagePath;
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required before uploading an image in production.');
      const { put } = require('@vercel/blob');
      const blob = await put(`private/${id}${inspected.extension}`, buffer, { access: 'private', addRandomSuffix: true, token: process.env.BLOB_READ_WRITE_TOKEN, contentType: inspected.mimeType });
      storagePath = blob.url;
    } else {
      storagePath = path.relative(ROOT, req.file.path);
    }
    db.prepare(`INSERT INTO media_assets (id, original_name, storage_path, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(id, req.file.originalname, storagePath, inspected.mimeType, inspected.fileSize, inspected.width, inspected.height, metadata.alt_text_en, metadata.alt_text_sw, metadata.caption_en, metadata.caption_sw, metadata.description_en, metadata.description_sw, req.user.id);
    audit(req, 'media.upload', id, { filename: req.file.originalname });
    res.status(201).json({ media: { id, original_name: req.file.originalname, ...metadata, mime_type: inspected.mimeType, file_size: inspected.fileSize, width: inspected.width, height: inspected.height, status: 'private', src: `media:${id}`, preview_url: `/api/media/${id}/file` } });
  } catch (error) {
    if (req.file.path) fs.rmSync(req.file.path, { force: true });
    res.status(400).json({ error: `Could not read the uploaded image: ${error.message}` });
  }
});
app.post('/api/media/import', requireAuth, requireRole('owner', 'admin', 'editor'), async (req, res) => {
  const sourceUrl = String(req.body?.url || '').trim();
  if (!sourceUrl) return res.status(400).json({ error: 'An HTTPS image URL is required.' });
  let metadata;
  try { metadata = normalizeMediaMetadata(req.body); } catch (error) { return res.status(400).json({ error: error.message }); }
  let imported;
  try { imported = await fetchRemoteImage(sourceUrl); } catch (error) { return res.status(400).json({ error: error.message }); }
  try {
    const id = crypto.randomUUID();
    let storagePath;
    if (process.env.NODE_ENV === 'production') {
      if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required before importing an image.');
      const { put } = require('@vercel/blob');
      const blob = await put(`private/${id}${IMAGE_EXTENSIONS.get(imported.mimeType)}`, imported.buffer, { access: 'private', addRandomSuffix: true, token: process.env.BLOB_READ_WRITE_TOKEN, contentType: imported.mimeType });
      storagePath = blob.url;
    } else {
      const localPath = path.join(PRIVATE_UPLOAD_DIR, `${id}${IMAGE_EXTENSIONS.get(imported.mimeType)}`);
      await fs.promises.writeFile(localPath, imported.buffer);
      storagePath = path.relative(ROOT, localPath);
    }
    const originalName = `remote-${imported.sourceHash}${IMAGE_EXTENSIONS.get(imported.mimeType)}`;
    db.prepare(`INSERT INTO media_assets (id, original_name, storage_path, mime_type, file_size, width, height, alt_text_en, alt_text_sw, caption_en, caption_sw, description_en, description_sw, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(id, originalName, storagePath, imported.mimeType, imported.fileSize, imported.width, imported.height, metadata.alt_text_en, metadata.alt_text_sw, metadata.caption_en, metadata.caption_sw, metadata.description_en, metadata.description_sw, req.user.id);
    audit(req, 'media.import', id, { source: imported.sourceUrl, mimeType: imported.mimeType, fileSize: imported.fileSize });
    return res.status(201).json({ media: { id, original_name: originalName, ...metadata, mime_type: imported.mimeType, file_size: imported.fileSize, width: imported.width, height: imported.height, status: 'private', src: `media:${id}`, preview_url: `/api/media/${id}/file` } });
  } catch (error) { return res.status(500).json({ error: error.message || 'The image could not be imported.' }); }
});

app.get('/api/media/:id/file', requireAuth, async (req, res) => {
  const asset = db.prepare('SELECT storage_path, mime_type, public_url FROM media_assets WHERE id = ?').get(req.params.id);
  if (!asset) return res.status(404).end();
  if (asset.public_url && process.env.NODE_ENV === 'production') return res.redirect(asset.public_url);
  if (process.env.NODE_ENV === 'production') {
    try {
      if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(500).end();
      const { get } = require('@vercel/blob');
      const blob = await get(asset.storage_path, { access: 'private', token: process.env.BLOB_READ_WRITE_TOKEN });
      if (!blob || blob.statusCode !== 200) return res.status(404).end();
      res.type(asset.mime_type).set('Cache-Control', 'private, no-cache');
      return Readable.fromWeb(blob.stream).pipe(res);
    } catch (error) {
      console.error(error);
      return res.status(404).end();
    }
  }
  const filePath = path.resolve(ROOT, asset.storage_path);
  const relativePath = path.relative(path.resolve(UPLOAD_DIR), filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) return res.status(400).end();
  res.type(asset.mime_type).sendFile(filePath);
});

app.post('/api/messages', (req, res) => {
  const type = req.body.type === 'partnership' ? 'partnership' : 'contact';
  const name = String(req.body.name || '').trim();
  const phone = String(req.body.phone || '').trim();
  const message = String(req.body.message || '').trim();
  const email = String(req.body.email || '').trim();
  if (!name || !phone || !message) return res.status(400).json({ error: 'Name, phone and message are required.' });
  if (name.length > 120 || phone.length > 60 || message.length > 5000 || email.length > 180) return res.status(400).json({ error: 'Message fields are too long.' });
  const result = db.prepare('INSERT INTO messages (type, name, phone, email, message) VALUES (?, ?, ?, ?, ?)').run(type, name, phone, email || null, message);
  res.status(201).json({ ok: true, id: result.lastInsertRowid });
});

app.get('/api/messages', requireAuth, requireRole('owner', 'admin', 'editor'), (_req, res) => res.json({ messages: db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all() }));
app.patch('/api/messages/:id', requireAuth, requireRole('owner', 'admin', 'editor'), (req, res) => { const status = req.body.status === 'handled' ? 'handled' : 'new'; db.prepare('UPDATE messages SET status = ?, handled_at = ?, handled_by = ? WHERE id = ?').run(status, status === 'handled' ? nowIso() : null, status === 'handled' ? req.user.id : null, Number(req.params.id)); res.json({ ok: true }); });

app.get('/api/settings', requireAuth, requireRole('owner', 'admin'), (_req, res) => res.json({ settings: Object.fromEntries(db.prepare('SELECT key, value_json FROM site_settings').all().map((row) => [row.key, parseJson(row.value_json)])) }));
app.put('/api/settings', requireAuth, requireRole('owner', 'admin'), (req, res) => { for (const [key, value] of Object.entries(req.body.settings || {})) db.prepare('INSERT INTO site_settings (key, value_json, updated_by, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json, updated_by = excluded.updated_by, updated_at = CURRENT_TIMESTAMP').run(key, safeJson(value), req.user.id); audit(req, 'settings.update', 'site_settings'); res.json({ ok: true }); });

function frontendAssetHeaders(res, filePath) {
  if (/\.(html|js|css)$/i.test(filePath)) res.setHeader('Cache-Control', 'no-cache, must-revalidate');
}

app.use('/uploads/published', express.static(PUBLISHED_UPLOAD_DIR, { maxAge: '1y', immutable: true }));
app.get('/admin/', (_req, res) => res.set('Cache-Control', 'no-cache, must-revalidate').sendFile(path.join(ROOT, 'admin', 'index.html')));
app.use('/admin', express.static(path.join(ROOT, 'admin'), { setHeaders: frontendAssetHeaders }));
app.get('/', (_req, res) => res.sendFile(path.join(ROOT, 'index.html')));
app.use(express.static(ROOT, { extensions: ['html'], index: false, setHeaders: frontendAssetHeaders }));
app.use((error, _req, res, _next) => { if (error instanceof multer.MulterError || error) return res.status(400).json({ error: error.message || 'Request failed.' }); });

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => console.log(`EcoPower CMS running at ${PUBLIC_ORIGIN}`));
}

module.exports = { app, db, createDatabase };
