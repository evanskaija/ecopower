CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor')) DEFAULT 'editor',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_content (
  id BIGSERIAL PRIMARY KEY,
  page_id TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  language TEXT NOT NULL CHECK (language IN ('en', 'sw')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
  content_json JSONB NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  created_by TEXT REFERENCES admin_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_id, language, status)
);

CREATE TABLE IF NOT EXISTS content_revisions (
  id BIGSERIAL PRIMARY KEY,
  page_id TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  language TEXT NOT NULL CHECK (language IN ('en', 'sw')),
  version INTEGER NOT NULL,
  content_json JSONB NOT NULL,
  created_by TEXT REFERENCES admin_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  original_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text_en TEXT NOT NULL DEFAULT '',
  alt_text_sw TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('private', 'published')) DEFAULT 'private',
  created_by TEXT REFERENCES admin_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('contact', 'partnership')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('new', 'handled')) DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  handled_at TIMESTAMPTZ,
  handled_by TEXT REFERENCES admin_users(id)
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value_json JSONB NOT NULL,
  updated_by TEXT REFERENCES admin_users(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_page_content_page_status ON page_content(page_id, status);
CREATE INDEX IF NOT EXISTS idx_revisions_page ON content_revisions(page_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_status ON media_assets(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status, created_at DESC);
