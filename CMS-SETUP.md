# EcoPower CMS local setup

## Local development

1. Copy `.env.example` to `.env` and set a long `SESSION_SECRET`.
2. Run `npm.cmd install`.
3. Run `npm.cmd run admin:create` and enter the administrator email and password when prompted.
4. Run `npm.cmd start` and open `http://localhost:3000/admin`.

Local content uses SQLite at `DATABASE_URL=file:./data/ecopower.sqlite`. Uploaded images are kept in `uploads/private` until publication, then copied to `uploads/published`.

## Current verified workflow

The local backend supports authenticated sessions, all eight page entries, English/Kiswahili draft records, Save Draft, Preview, Publish, Restore, image uploads, public published image delivery, Messages, Website Settings, contact submissions and partnership submissions.

Run `npm.cmd run test:smoke` for an isolated end-to-end test. The test creates and removes its own database and upload directory.

## Production configuration

Use separate Neon databases/branches and separate Blob stores for Preview and Production. Enter values directly in the matching Vercel environment; never commit them or paste them into chat.

Vercel Project Settings must contain these values. Vercel supplies `VERCEL_ENV` automatically; do not manually set it.

- `NODE_ENV=production`
- `PUBLIC_ORIGIN=https://your-public-domain`
- `SESSION_SECRET=<long random secret>`
- `DATABASE_URL=<production PostgreSQL connection string>`
- Preview: `ECOPOWER_PREVIEW_PRIVATE_READ_WRITE_TOKEN=<preview private Blob token>`
- Preview: `ECOPOWER_PREVIEW_PUBLIC_READ_WRITE_TOKEN=<preview public Blob token>`
- Production: `ECOPOWER_PRODUCTION_PRIVATE_READ_WRITE_TOKEN=<production private Blob token>`
- Production: `ECOPOWER_PRODUCTION_PUBLIC_READ_WRITE_TOKEN=<production public Blob token>`
- Optional: `ECOPOWER_<ENV>_PRIVATE_STORE_ID` and `ECOPOWER_<ENV>_PUBLIC_STORE_ID` to enforce store-ID matching
- `PG_POOL_MAX=5`

Create one private Vercel Blob store for unpublished media and one public store for published assets per environment. Draft uploads are stored only in the private store. Publishing reads the private pathname, copies it to a new immutable public pathname, verifies the public URL, and only then stores that URL in the published page record. Preview credentials are selected only when `VERCEL_ENV=preview`; Production requires `ECOPOWER_PRODUCTION_*` credentials and refuses to start if Preview credentials are present. Production image upload code uses memory storage and sends the file to Blob; it does not write uploaded files to a Vercel filesystem directory.

Before the first production login, run `npm.cmd run db:migrate` once with the Production `DATABASE_URL` and `SESSION_SECRET` supplied only in the local process environment, then run `npm.cmd run admin:create` to create or rotate the owner account. Both commands are interactive/one-shot and do not print the password. Do not use `vercel env pull` on a shared machine unless the resulting file is protected and removed afterward.

The PostgreSQL adapter and PostgreSQL-backed session store are implemented in `server-postgres.js` and selected by `api/index.js` when Vercel runs with `NODE_ENV=production`. Migrations are protected by a PostgreSQL advisory lock, the session table is created by migration, and the runtime session store does not create tables. The local SQLite application remains unchanged and intentionally rejects a PostgreSQL URL.
