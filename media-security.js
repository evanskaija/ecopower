'use strict';

const dns = require('node:dns').promises;
const net = require('node:net');
const crypto = require('node:crypto');
const { imageSize } = require('image-size');

// Direct Vercel Blob uploads are not subject to the Vercel Function request
// body limit. Keep the larger image limit for that path, but cap the multipart
// fallback below 4.5 MB so its request envelope remains inside Vercel's limit.
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_SERVER_UPLOAD_SIZE = 4 * 1024 * 1024;
const REMOTE_FETCH_TIMEOUT_MS = 6000;
const MAX_REMOTE_REDIRECTS = 3;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']);
const IMAGE_MIME_TYPES_BY_EXTENSION = new Map([
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['png', 'image/png'],
  ['webp', 'image/webp'],
  ['avif', 'image/avif'],
  ['gif', 'image/gif']
]);
const MEDIA_METADATA_LIMITS = Object.freeze({
  alt_text_en: 250,
  alt_text_sw: 250,
  caption_en: 300,
  caption_sw: 300,
  description_en: 4000,
  description_sw: 4000
});
const IMAGE_EXTENSIONS = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/avif', '.avif'],
  ['image/gif', '.gif']
]);

function normalizeImageMimeType(fileName = '', declaredMime = '') {
  const normalizedDeclared = String(declaredMime || '').split(';', 1)[0].trim().toLowerCase();
  if (ALLOWED_IMAGE_TYPES.has(normalizedDeclared)) return normalizedDeclared;
  if (normalizedDeclared && normalizedDeclared !== 'application/octet-stream') return '';
  const extension = String(fileName || '').toLowerCase().split('.').pop();
  return IMAGE_MIME_TYPES_BY_EXTENSION.get(extension) || '';
}

function normalizeHostname(hostname) {
  return String(hostname || '').replace(/^\[|\]$/g, '').replace(/\.$/, '').toLowerCase();
}

function isPrivateIpv4(address) {
  const parts = address.split('.').map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b, c] = parts;
  return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && c === 0) || (a === 192 && b === 0 && c === 2) ||
    (a === 192 && b === 88 && c === 99) || (a === 192 && b === 168) || (a === 198 && b >= 18 && b <= 19) ||
    (a === 198 && b === 51 && c === 100) || (a === 203 && b === 0 && c === 113) ||
    a >= 224;
}

function isPrivateIpv6(address) {
  const normalized = address.toLowerCase().split('%')[0];
  if (normalized === '::1' || normalized === '::' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe8') || normalized.startsWith('fe9') || normalized.startsWith('fea') || normalized.startsWith('feb') || normalized.startsWith('2001:db8:')) return true;
  const mappedIpv4 = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  return Boolean(mappedIpv4 && isPrivateIpv4(mappedIpv4[1]));
}

function isPrivateAddress(address) {
  const version = net.isIP(address);
  return version === 4 ? isPrivateIpv4(address) : version === 6 ? isPrivateIpv6(address) : true;
}

function assertSafeRemoteUrl(value) {
  let url;
  try { url = new URL(String(value || '').trim()); } catch { throw new Error('Enter a valid HTTPS image URL.'); }
  const hostname = normalizeHostname(url.hostname);
  if (url.protocol !== 'https:') throw new Error('External images must use HTTPS.');
  if (!hostname || url.username || url.password) throw new Error('The image URL must not contain credentials.');
  if (url.port && url.port !== '443') throw new Error('External image URLs may only use the HTTPS port.');
  const extension = url.pathname.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
  if (extension && !new Set(['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif']).has(extension)) throw new Error('The URL does not point to a supported image type.');
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.local') || hostname.endsWith('.internal') || hostname.endsWith('.home.arpa') || hostname === 'metadata.google.internal') throw new Error('Private-network image URLs are not allowed.');
  if (net.isIP(hostname) && isPrivateAddress(hostname)) throw new Error('Private-network image URLs are not allowed.');
  return url;
}

async function assertSafeRemoteDestination(value) {
  const url = assertSafeRemoteUrl(value);
  const hostname = normalizeHostname(url.hostname);
  if (net.isIP(hostname)) return url;
  let addresses;
  try { addresses = await dns.lookup(hostname, { all: true, verbatim: true }); } catch { throw new Error('The external image host could not be resolved.'); }
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) throw new Error('Private-network image URLs are not allowed.');
  return url;
}

function detectedImageMime(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) return null;
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg';
  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
  if (buffer.subarray(4, 8).toString('ascii') === 'ftyp' && /^(?:avif|avis|mif1)$/i.test(buffer.subarray(8, 12).toString('ascii'))) return 'image/avif';
  if (/^GIF8[79]a$/i.test(buffer.subarray(0, 6).toString('ascii'))) return 'image/gif';
  return null;
}

function inspectImageBuffer(buffer, declaredMime = '') {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) throw new Error('The image is empty.');
  if (buffer.length > MAX_IMAGE_SIZE) throw new Error(`Images must be smaller than ${Math.round(MAX_IMAGE_SIZE / 1024 / 1024)} MB.`);
  const actualMime = detectedImageMime(buffer);
  if (!actualMime || !ALLOWED_IMAGE_TYPES.has(actualMime)) throw new Error('The file is not a supported JPEG, PNG, WebP, AVIF or GIF image.');
  const normalizedDeclared = String(declaredMime || '').split(';', 1)[0].trim().toLowerCase();
  if (normalizedDeclared && normalizedDeclared !== 'application/octet-stream' && normalizedDeclared !== actualMime) throw new Error('The declared image type does not match the file contents.');
  let dimensions;
  try { dimensions = imageSize(buffer); } catch { throw new Error('The image dimensions could not be read.'); }
  if (!dimensions.width || !dimensions.height) throw new Error('The image dimensions could not be read.');
  return { mimeType: actualMime, extension: IMAGE_EXTENSIONS.get(actualMime), width: dimensions.width, height: dimensions.height, fileSize: buffer.length };
}

function normalizeMediaMetadata(input = {}) {
  const metadata = {};
  for (const [key, max] of Object.entries(MEDIA_METADATA_LIMITS)) {
    const value = String(input?.[key] ?? '').trim();
    if (value.length > max) throw new Error(`${key.replaceAll('_', ' ')} is too long (maximum ${max} characters).`);
    metadata[key] = value;
  }
  return metadata;
}

async function readResponseBodyLimited(response) {
  const contentLength = Number(response.headers.get('content-length') || 0);
  if (contentLength > MAX_IMAGE_SIZE) throw new Error(`The remote image is larger than ${Math.round(MAX_IMAGE_SIZE / 1024 / 1024)} MB.`);
  if (!response.body) throw new Error('The remote image returned an empty response.');
  const chunks = [];
  let total = 0;
  for await (const chunk of response.body) {
    const buffer = Buffer.from(chunk);
    total += buffer.length;
    if (total > MAX_IMAGE_SIZE) throw new Error(`The remote image is larger than ${Math.round(MAX_IMAGE_SIZE / 1024 / 1024)} MB.`);
    chunks.push(buffer);
  }
  return Buffer.concat(chunks, total);
}

async function fetchRemoteImage(value) {
  let current = await assertSafeRemoteDestination(value);
  for (let redirect = 0; redirect <= MAX_REMOTE_REDIRECTS; redirect += 1) {
    let response;
    try {
      response = await fetch(current, {
        redirect: 'manual',
        signal: AbortSignal.timeout(REMOTE_FETCH_TIMEOUT_MS),
        headers: {
          accept: 'image/jpeg,image/png,image/webp,image/avif,image/gif;q=0.9',
          'user-agent': 'EcoPower-CMS-Image-Importer/1.0 (+https://ecopower.co.tz)'
        }
      });
    } catch (error) {
      if (error?.name === 'TimeoutError' || error?.name === 'AbortError') throw new Error('The external image request timed out.');
      throw new Error('The external image could not be reached.');
    }
    if (response.status >= 300 && response.status < 400) {
      if (redirect === MAX_REMOTE_REDIRECTS) throw new Error('The external image used too many redirects.');
      const location = response.headers.get('location');
      if (!location) throw new Error('The external image returned an invalid redirect.');
      current = await assertSafeRemoteDestination(new URL(location, current).toString());
      continue;
    }
    if (!response.ok) {
      if ([401, 403, 429].includes(response.status)) throw new Error(`The external website blocked automated image downloads (${response.status}). Download the image and use Upload from Computer instead.`);
      throw new Error(`The external image is unavailable (${response.status}).`);
    }
    const declaredMime = String(response.headers.get('content-type') || '').split(';', 1)[0].trim().toLowerCase();
    if (declaredMime && declaredMime !== 'application/octet-stream' && !ALLOWED_IMAGE_TYPES.has(declaredMime)) throw new Error('The URL does not point to a supported image type.');
    const buffer = await readResponseBodyLimited(response);
    const inspected = inspectImageBuffer(buffer, declaredMime);
    return { ...inspected, buffer, sourceUrl: current.toString(), sourceHash: crypto.createHash('sha256').update(current.toString()).digest('hex').slice(0, 16) };
  }
  throw new Error('The external image could not be fetched.');
}

function validateImageReference(value) {
  if (typeof value !== 'string' || !value) return null;
  if (value.startsWith('media:')) return /^media:[^\s]+$/i.test(value) ? null : 'Media reference is invalid.';
  if (/^https?:\/\//i.test(value)) {
    try { assertSafeRemoteUrl(value); } catch (error) { return error.message; }
    return null;
  }
  if (/^data:/i.test(value) && !/^data:image\/(?:jpeg|png|webp|avif|gif);base64,[a-z0-9+/=]+$/i.test(value)) return 'Only supported base64 image data is allowed.';
  if (/^javascript:|^vbscript:|^file:|^ftp:/i.test(value)) return 'Unsafe image URL protocol.';
  return null;
}

module.exports = { ALLOWED_IMAGE_TYPES, IMAGE_EXTENSIONS, MAX_IMAGE_SIZE, MAX_SERVER_UPLOAD_SIZE, MEDIA_METADATA_LIMITS, assertSafeRemoteDestination, assertSafeRemoteUrl, fetchRemoteImage, inspectImageBuffer, normalizeImageMimeType, normalizeMediaMetadata, validateImageReference };
