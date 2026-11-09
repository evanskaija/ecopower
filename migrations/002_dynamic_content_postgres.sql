ALTER TABLE page_content ADD COLUMN IF NOT EXISTS blocks_json JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE content_revisions ADD COLUMN IF NOT EXISTS blocks_json JSONB NOT NULL DEFAULT '[]'::jsonb;
