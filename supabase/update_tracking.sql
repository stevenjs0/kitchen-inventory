-- Track who created and last modified records

ALTER TABLE categories ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS updated_by TEXT;

ALTER TABLE locations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE locations ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE locations ADD COLUMN IF NOT EXISTS updated_by TEXT;

ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE inventory_items ADD COLUMN IF NOT EXISTS updated_by TEXT;
