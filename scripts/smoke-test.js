const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const databaseFile = path.join(ROOT, 'data', 'ecopower-smoke.sqlite');
const uploadDirectory = path.join(ROOT, 'uploads', 'ecopower-smoke');
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'file:./data/ecopower-smoke.sqlite';
process.env.UPLOAD_DIR = './uploads/ecopower-smoke';
process.env.SESSION_SECRET = 'smoke-test-session-secret-that-is-long-enough';

const bcrypt = require('bcryptjs');
const { app, db } = require('../server');

function assertOk(condition, message) {
  assert.equal(Boolean(condition), true, message);
}

async function main() {
  const password = 'SmokeTestPassword!2026';
  const email = 'smoke-test@ecopower.local';
  const userId = 'smoke-test-user';
  db.prepare('INSERT OR REPLACE INTO admin_users (id, email, password_hash, role, active) VALUES (?, ?, ?, ?, 1)').run(userId, email, await bcrypt.hash(password, 10), 'owner');

  const server = await new Promise((resolve) => {
    const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
  });
  const origin = `http://127.0.0.1:${server.address().port}`;
  let cookie = '';

  async function request(url, options = {}) {
    const headers = new Headers(options.headers || {});
    if (cookie) headers.set('cookie', cookie);
    const response = await fetch(`${origin}${url}`, { ...options, headers });
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) cookie = setCookie.split(';', 1)[0];
    const text = await response.text();
    let body = null;
    try { body = text ? JSON.parse(text) : null; } catch { body = text; }
    return { response, body };
  }

  async function requestBinary(url) {
    const headers = new Headers();
    if (cookie) headers.set('cookie', cookie);
    const response = await fetch(`${origin}${url}`, { headers });
    return { response, bytes: Buffer.from(await response.arrayBuffer()) };
  }

  function digest(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }

  async function uploadSourceImage(imageName) {
    const filePath = path.join(ROOT, 'EcoPower_all_extracted_images', imageName);
    const sourceBytes = fs.readFileSync(filePath);
    const mime = /\.png$/i.test(imageName) ? 'image/png' : /\.webp$/i.test(imageName) ? 'image/webp' : 'image/jpeg';
    const form = new FormData();
    form.append('file', new Blob([sourceBytes], { type: mime }), imageName);
    const result = await request('/api/media', { method: 'POST', body: form });
    assert.equal(result.response.status, 201, `image upload should create a media record for ${imageName}`);
    return { id: result.body.media.id, bytes: sourceBytes };
  }

  try {
    let result = await request('/api/public/home');
    assert.equal(result.response.status, 200, 'public Home endpoint should be reachable');
    assert.equal(Object.keys(result.body.published).length, 0, 'Home should have no published record in the isolated test database');

    result = await request('/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) });
    assert.equal(result.response.status, 200, 'administrator login should create a session');
    assertOk(cookie, 'login should return a session cookie');

    result = await request('/api/pages/home');
    assert.equal(result.response.status, 200, 'authenticated Home editor endpoint should work');

    const imageNames = fs.readdirSync(path.join(ROOT, 'EcoPower_all_extracted_images')).filter((name) => /\.(jpe?g|png|webp)$/i.test(name)).sort();
    assertOk(imageNames.length >= 3, 'at least three real source images should exist for image publishing tests');
    const heroImage = await uploadSourceImage(imageNames[0]);
    const galleryImage = await uploadSourceImage(imageNames[1]);
    const productImage = await uploadSourceImage(imageNames[2]);
    const mediaId = heroImage.id;

    result = await request(`/api/media/${mediaId}/file`);
    assert.equal(result.response.status, 200, 'private uploaded image should be readable to the authenticated administrator');
    let privateImage = await requestBinary(`/api/media/${mediaId}/file`);
    assert.equal(digest(privateImage.bytes), digest(heroImage.bytes), 'private media response should contain the uploaded hero image bytes');

    const draft = {
      hero: { image: `media:${mediaId}`, en: { title: 'Smoke-test headline' } },
      images: { factoryGallery: [{ image: `media:${galleryImage.id}` }] },
      products: { items: [{ image: `media:${productImage.id}` }] }
    };
    result = await request('/api/pages/home/draft', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ language: 'en', content: draft }) });
    assert.equal(result.response.status, 200, 'Save Draft should persist the Home record');

    result = await request('/api/pages/home');
    assert.equal(result.body.draft.en.content.hero.image, `media:${mediaId}`, 'draft should retain the media marker until publishing');
    result = await request('/api/public/home');
    assert.equal(Object.keys(result.body.published).length, 0, 'draft changes must not appear publicly before publishing');

    result = await request('/api/pages/home/publish', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(result.response.status, 200, 'Publish should create a published record');
    result = await request('/api/public/home');
    const publishedImage = result.body.published.en.content.hero.image;
    assertOk(publishedImage.startsWith('/uploads/published/'), 'published content should contain a durable public image URL');
    const publishedFile = await requestBinary(publishedImage);
    assert.equal(publishedFile.response.status, 200, 'published image should be available from the public website');
    assert.match(publishedFile.response.headers.get('content-type') || '', /^image\//, 'published hero URL should return an image content type');
    assert.equal(digest(publishedFile.bytes), digest(heroImage.bytes), 'published hero URL should return the exact uploaded image bytes');

    result = await request('/api/public/home');
    const galleryUrl = result.body.published.en.content.images.factoryGallery[0].image;
    const productUrl = result.body.published.en.content.products.items[0].image;
    assertOk(galleryUrl.startsWith('/uploads/published/'), 'published gallery content should contain a durable public image URL');
    assertOk(productUrl.startsWith('/uploads/published/'), 'published product content should contain a durable public image URL');
    const publishedGallery = await requestBinary(galleryUrl);
    const publishedProduct = await requestBinary(productUrl);
    assert.equal(publishedGallery.response.status, 200, 'published gallery image should be available from the public website');
    assert.equal(publishedProduct.response.status, 200, 'published product image should be available from the public website');
    assert.equal(digest(publishedGallery.bytes), digest(galleryImage.bytes), 'published gallery URL should return the exact uploaded image bytes');
    assert.equal(digest(publishedProduct.bytes), digest(productImage.bytes), 'published product URL should return the exact uploaded image bytes');

    const stablePublishedHero = result.body.published.en.content.hero.image;
    await request('/api/pages/home/draft', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ language: 'en', content: { hero: { image: 'media:missing-media-id' } } }) });
    result = await request('/api/pages/home/publish', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(result.response.status, 500, 'Publish must fail when a draft references a missing image');
    result = await request('/api/public/home');
    assert.equal(result.body.published.en.content.hero.image, stablePublishedHero, 'failed image publication must leave the previous public image unchanged');

    const revisedDraft = { hero: { image: `media:${mediaId}`, en: { title: 'Second smoke-test headline' } } };
    await request('/api/pages/home/draft', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ language: 'en', content: revisedDraft }) });
    result = await request('/api/pages/home/publish', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(result.response.status, 200, 'a second publish should create revision history');
    assertOk(result.body.revisions.length > 0, 'revision history should contain the previous published version');
    const revisionId = result.body.revisions[0].id;

    result = await request(`/api/pages/home/restore/${revisionId}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(result.response.status, 200, 'Restore should copy a published revision into the draft');
    assert.equal(result.body.draft.en.content.hero.en.title, 'Smoke-test headline', 'restored draft should contain the prior published text');

    const productPageDraft = { elements: [{ kind: 'text', selector: 'main h1, main h2, main h3, main p, main strong, main span, main a, main button, footer h3, footer p, footer span, footer a', index: 0, tag: 'h1', value: 'Smoke-test Products heading' }, { kind: 'image', selector: 'main img, footer img', index: 0, tag: 'img', value: `media:${mediaId}`, alt: 'Smoke-test product image' }] };
    result = await request('/api/pages/products/draft', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ language: 'en', content: productPageDraft }) });
    assert.equal(result.response.status, 200, 'a non-Home page editor should save a draft');
    result = await request('/api/pages/products/publish', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    assert.equal(result.response.status, 200, 'a non-Home page editor should publish a draft');
    result = await request('/api/public/products');
    assert.equal(result.body.published.en.content.elements[0].value, 'Smoke-test Products heading', 'published non-Home content should be publicly readable');
    assertOk(result.body.published.en.content.elements[1].value.startsWith('/uploads/published/'), 'non-Home published images should be materialized');

    for (const slug of ['about', 'team', 'impact', 'partners', 'faq', 'contact']) {
      const pageDraft = { elements: [{ kind: 'text', selector: 'main h1, main h2, main h3, main p, main strong, main span, main a, main button, footer h3, footer p, footer span, footer a', index: 0, tag: 'h1', group: 'smoke', groupLabel: 'Smoke section', value: `Smoke-test ${slug} heading` }, { kind: 'image', selector: 'main img, footer img', index: 0, tag: 'img', group: 'smoke', groupLabel: 'Smoke section', value: `media:${mediaId}`, alt: `Smoke-test ${slug} image`, position: 'center' }] };
      result = await request(`/api/pages/${slug}/draft`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ language: 'en', content: pageDraft }) });
      assert.equal(result.response.status, 200, `${slug} should save a draft`);
      result = await request(`/api/pages/${slug}/publish`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
      assert.equal(result.response.status, 200, `${slug} should publish a draft`);
      result = await request(`/api/public/${slug}`);
      assert.equal(result.body.published.en.content.elements[0].value, `Smoke-test ${slug} heading`, `${slug} should expose published content`);
      assertOk(result.body.published.en.content.elements[1].value.startsWith('/uploads/published/'), `${slug} should expose a published image URL`);
    }

    result = await request('/api/messages', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ type: 'contact', name: 'Smoke Customer', phone: '0784 017 225', message: 'Smoke-test enquiry' }) });
    assert.equal(result.response.status, 201, 'public contact form should store a message');
    result = await request('/api/messages');
    assertOk(result.body.messages.some((message) => message.message === 'Smoke-test enquiry'), 'stored contact message should appear in the admin inbox');
    const messageId = result.body.messages.find((message) => message.message === 'Smoke-test enquiry').id;
    result = await request(`/api/messages/${messageId}`, { method: 'PATCH', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ status: 'handled' }) });
    assert.equal(result.response.status, 200, 'admin should be able to mark a message handled');

    result = await request('/api/settings', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ settings: { phone: '0784 017 225', email: 'smoke@ecopower.local' } }) });
    assert.equal(result.response.status, 200, 'admin should be able to save website settings');
    result = await request('/api/settings');
    assert.equal(result.body.settings.email, 'smoke@ecopower.local', 'website settings should persist in the database');

    console.log('SMOKE TEST PASSED: authentication, Home and non-Home draft/publish/restore, image delivery, messages and settings.');
  } finally {
    await new Promise((resolve) => server.close(resolve));
    db.close();
    for (const suffix of ['', '-shm', '-wal']) fs.rmSync(`${databaseFile}${suffix}`, { force: true });
    fs.rmSync(uploadDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error('SMOKE TEST FAILED:', error.stack || error.message);
  process.exitCode = 1;
});
