---
tags: [database, sql, supabase, migraciones]
parent: [[02 - Arquitectura]]
---

# Base de Datos - Supabase (PostgreSQL)

## 🗄️ Schema General

```sql
-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Habilitar Full Text Search en español
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
```

## 📋 Tablas Principales

### categories

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#6B7280',  -- Color hex para UI (ej: #3B82F6)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas por nombre
CREATE INDEX idx_categories_name ON categories(name);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### locations

```sql
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  section VARCHAR(100) NOT NULL,           -- 'Alacena', 'Condimentero'
  side VARCHAR(50),                        -- 'Izquierda', 'Derecha'
  position VARCHAR(50),                    -- 'Arriba', 'Abajo'
  level VARCHAR(50) NOT NULL,              -- 'Primer Nivel', 'Segundo Nivel'
  
  -- Columna generada para ruta completa (búsqueda rápida)
  full_path TEXT GENERATED ALWAYS AS (
    CONCAT(
      section,
      ' ',
      COALESCE(side, ''),
      ' ',
      COALESCE(position, ''),
      ' ',
      level
    )
  ) STORED,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsqueda jerárquica
CREATE INDEX idx_locations_section ON locations(section);
CREATE INDEX idx_locations_full_path ON locations(full_path);
CREATE INDEX idx_locations_section_side_level ON locations(section, side, level);
```

### inventory_items

```sql
CREATE TABLE inventory_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  
  -- Stock
  stock_quantity INTEGER NOT NULL DEFAULT 1,
  min_stock INTEGER NOT NULL DEFAULT 1,
  unit VARCHAR(50) DEFAULT 'unidad',       -- 'unidad', 'kg', 'L', 'g'
  
  -- Metadata
  notes TEXT,
  barcode VARCHAR(100),                    -- Opcional: código de barras
  image_url TEXT,                          -- Opcional: foto del producto
  
  -- Estado
  is_active BOOLEAN DEFAULT TRUE,
  is_archived BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_stock_update TIMESTAMPTZ,
  
  -- Full-text search vector (actualizado automáticamente)
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('spanish', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('spanish', coalesce(notes, '')), 'C')
  ) STORED
);

-- Índices para performance
CREATE INDEX idx_inventory_category ON inventory_items(category_id);
CREATE INDEX idx_inventory_location ON inventory_items(location_id);
CREATE INDEX idx_inventory_stock ON inventory_items(stock_quantity);
CREATE INDEX idx_inventory_active ON inventory_items(is_active);
CREATE INDEX idx_inventory_search ON inventory_items USING GIN(search_vector);

-- Trigger para updated_at
CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para last_stock_update
CREATE OR REPLACE FUNCTION update_stock_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock_quantity IS DISTINCT FROM OLD.stock_quantity THEN
    NEW.last_stock_update = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER inventory_stock_update_timestamp
  BEFORE UPDATE ON inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION update_stock_timestamp();
```

## 🔗 Diagrama ER

```
┌─────────────────────┐
│     categories      │
├─────────────────────┤
│ PK id (UUID)        │
│    name (VARCHAR)   │
│    description      │
│    color            │
│    created_at       │
│    updated_at       │
└──────────┬──────────┘
           │ 1
           │
           │ N
┌──────────▼──────────┐     ┌─────────────────────┐
│  inventory_items    │     │      locations      │
├─────────────────────┤     ├─────────────────────┤
│ PK id (UUID)        │────▶│ PK id (UUID)        │
│ FK category_id      │     │    name             │
│ FK location_id      │     │    section          │
│    name             │     │    side             │
│    stock_quantity   │     │    position         │
│    min_stock        │     │    level            │
│    unit             │     │    full_path        │
│    notes            │     │    created_at       │
│    is_active        │     └─────────────────────┘
│    created_at       │
│    updated_at       │
│    search_vector    │
└─────────────────────┘
```

## 🔍 Queries Comunes

### Búsqueda de productos

```sql
-- Búsqueda por nombre con ranking
SELECT 
  i.*,
  c.name as category_name,
  l.full_path as location_path,
  ts_rank(i.search_vector, query) as rank
FROM inventory_items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN locations l ON i.location_id = l.id
CROSS JOIN plainto_tsquery('spanish', 'atun') query
WHERE i.search_vector @@ query
  AND i.is_active = TRUE
ORDER BY rank DESC
LIMIT 20;
```

### Stock bajo / faltantes

```sql
-- Productos agotados (stock = 0)
SELECT 
  i.name,
  i.stock_quantity,
  c.name as category_name,
  l.full_path as location_path
FROM inventory_items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN locations l ON i.location_id = l.id
WHERE i.stock_quantity = 0
  AND i.is_active = TRUE
ORDER BY l.section, l.full_path, i.name;

-- Productos con stock bajo (< min_stock)
SELECT 
  i.name,
  i.stock_quantity,
  i.min_stock,
  c.name as category_name,
  l.full_path as location_path
FROM inventory_items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN locations l ON i.location_id = l.id
WHERE i.stock_quantity < i.min_stock
  AND i.is_active = TRUE
ORDER BY (i.min_stock - i.stock_quantity) DESC;
```

### Agrupado por ubicación

```sql
-- Conteo de items por ubicación
SELECT 
  l.section,
  l.side,
  l.level,
  COUNT(i.id) as total_items,
  SUM(CASE WHEN i.stock_quantity = 0 THEN 1 ELSE 0 END) as missing_items
FROM locations l
LEFT JOIN inventory_items i ON l.id = i.location_id AND i.is_active = TRUE
GROUP BY l.section, l.side, l.level
ORDER BY l.section, l.side, l.level;
```

## 📊 Vistas Útiles (Opcional)

```sql
-- Vista para dashboard de faltantes
CREATE VIEW v_missing_items AS
SELECT 
  i.id,
  i.name,
  i.stock_quantity,
  i.min_stock,
  c.name as category_name,
  c.color as category_color,
  l.section,
  l.full_path as location_path,
  i.last_stock_update
FROM inventory_items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN locations l ON i.location_id = l.id
WHERE i.stock_quantity = 0
  AND i.is_active = TRUE;

-- Vista para inventario completo
CREATE VIEW v_inventory_full AS
SELECT 
  i.id,
  i.name,
  i.stock_quantity,
  i.min_stock,
  i.unit,
  CASE 
    WHEN i.stock_quantity = 0 THEN 'agotado'
    WHEN i.stock_quantity < i.min_stock THEN 'bajo'
    ELSE 'normal'
  END as stock_status,
  c.id as category_id,
  c.name as category_name,
  c.color as category_color,
  l.id as location_id,
  l.section,
  l.side,
  l.position,
  l.level,
  l.full_path as location_path,
  i.is_active,
  i.last_stock_update
FROM inventory_items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN locations l ON i.location_id = l.id
WHERE i.is_active = TRUE;
```

## 🔐 Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura (auth required)
CREATE POLICY "Usuarios autenticados pueden leer categorías"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuarios autenticados pueden leer ubicaciones"
  ON locations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuarios autenticados pueden leer inventario"
  ON inventory_items FOR SELECT
  TO authenticated
  USING (true);

-- Políticas de escritura
CREATE POLICY "Usuarios autenticados pueden modificar inventario"
  ON inventory_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden modificar categorías"
  ON categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Usuarios autenticados pueden modificar ubicaciones"
  ON locations FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

---
*[[02 - Arquitectura]] | [[04 - Seeders]]*
