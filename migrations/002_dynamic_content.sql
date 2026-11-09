ALTER TABLE page_content ADD COLUMN blocks_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE content_revisions ADD COLUMN blocks_json TEXT NOT NULL DEFAULT '[]';
