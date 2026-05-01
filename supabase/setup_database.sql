-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 2. TABLAS
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#6B7280',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL UNIQUE, -- Añadido UNIQUE para permitir UPSERT por nombre
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
  created_at TIMESTAMPTZ DEFAULT NOW()
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
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('spanish', coalesce(notes, '')), 'C')
  ) STORED
);

-- 3. RLS (Row Level Security) - Habilitar y crear políticas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Políticas para categorías (permite todo para app personal)
CREATE POLICY "Permitir todo en categories" ON categories
  FOR ALL USING (true) WITH CHECK (true);

-- Políticas para ubicaciones
CREATE POLICY "Permitir todo en locations" ON locations
  FOR ALL USING (true) WITH CHECK (true);

-- Políticas para inventory_items
CREATE POLICY "Permitir todo en inventory_items" ON inventory_items
  FOR ALL USING (true) WITH CHECK (true);

-- 4. DATOS INICIALES (Categorías y Ubicaciones)
-- Dejamos que Postgres genere los IDs automáticamente
INSERT INTO categories (name, description, color) VALUES
  ('Aceite', 'Aceites, margarinas y grasas', '#FCD34D'),
  ('Cereal', 'Cereales de desayuno', '#F97316'),
  ('Comida', 'Alimentos generales', '#10B981'),
  ('Sazon', 'Sales, pimientas y condimentos', '#EF4444'),
  ('Enlatados', 'Conservas y enlatados', '#3B82F6'),
  ('Higiene', 'Productos de limpieza', '#06B6D4'),
  ('Granos', 'Granos secos, legumbres', '#84CC16'),
  ('Lavabo', 'Accesorios de lavabo', '#22D3EE')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  color = EXCLUDED.color;

INSERT INTO locations (name, section, side, position, level) VALUES
  ('Alacena Arriba Izquierda, Primer Nivel', 'Alacena', 'Izquierda', 'Arriba', 'Primer Nivel'),
  ('Alacena Abajo Derecha, Primer Nivel', 'Alacena', 'Derecha', 'Abajo', 'Primer Nivel'),
  ('Condimentero Izquierdo, Tercer nivel', 'Condimentero', 'Izquierdo', NULL, 'Tercer nivel'),
  ('Condimentero Derecho, Primer nivel', 'Condimentero', 'Derecho', NULL, 'Primer nivel')
ON CONFLICT (name) DO UPDATE SET
  section = EXCLUDED.section,
  side = EXCLUDED.side,
  position = EXCLUDED.position,
  level = EXCLUDED.level;
