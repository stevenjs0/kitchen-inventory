-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. TABLES

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#6B7280',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL UNIQUE,
  section VARCHAR(100) NOT NULL,
  side VARCHAR(50),
  position VARCHAR(50),
  level VARCHAR(50) NOT NULL,
  full_path TEXT GENERATED ALWAYS AS (
    section || ' ' ||
    COALESCE(side, '') || ' ' ||
    COALESCE(position, '') || ' ' ||
    level
  ) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  stock_quantity INTEGER NOT NULL DEFAULT 1,
  min_stock INTEGER NOT NULL DEFAULT 1,
  unit VARCHAR(50) DEFAULT 'unidad',
  notes TEXT,
  barcode VARCHAR(100),
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_stock_update TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT,
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('spanish', coalesce(notes, '')), 'C')
  ) STORED
);

-- 3. RLS (Row Level Security)

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir todo en categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permitir todo en locations" ON locations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permitir todo en inventory_items" ON inventory_items
  FOR ALL USING (true) WITH CHECK (true);
