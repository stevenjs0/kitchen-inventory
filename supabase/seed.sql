-- =====================================================
-- SEED DATA FOR INVENTARIO HOGAR
-- This file is used by `supabase db seed`
-- =====================================================

-- =====================================================
-- 1. CATEGORIES
-- =====================================================
INSERT INTO categories (name, description, color) VALUES
  ('Aceite', 'Aceites, margarinas y grasas', '#FCD34D'),
  ('Cereal', 'Cereales de desayuno', '#F97316'),
  ('Comida', 'Alimentos generales', '#10B981'),
  ('Sazon', 'Sales, pimientas y condimentos', '#EF4444'),
  ('Enlatados', 'Conservas y enlatados', '#3B82F6'),
  ('Higiene', 'Productos de limpieza', '#06B6D4'),
  ('Granos', 'Granos secos, legumbres', '#84CC16'),
  ('Lavabo', 'Accesorios de lavabo', '#22D3EE'),
  ('Electricos', 'Electrodomesticos y aparatos', '#6366F1'),
  ('Plasticos', 'Recipientes y utensilios de plastico', '#A855F7'),
  ('Picar', 'Tablas y utensilios para picar', '#EC4899'),
  ('Metalico', 'Utensilios y recipientes de metal', '#64748B'),
  ('Ollas', 'Ollas y sartenes', '#F97316'),
  ('Microondas', 'Accesorios para microondas', '#14B8A6'),
  ('Madera', 'Utensilios de madera', '#92400E'),
  ('Vidrio', 'Recipientes de vidrio', '#38BDF8'),
  ('Polvos', 'Polvos e ingredientes secos', '#FBBF24'),
  ('Reposteria', 'Ingredientes para reposteria', '#FB7185'),
  ('Hierbas', 'Hierbas y especias', '#22C55E'),
  ('Salsas', 'Salsas y aderezos', '#DC2626'),
  ('Esencias', 'Esencias y extractos', '#7C3AED'),
  ('Perro', 'Comida para mascotas', '#0EA5E9'),
  ('Pasta', 'Pastas y fideos', '#F59E0B')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  color = EXCLUDED.color;

-- =====================================================
-- 2. LOCATIONS
-- =====================================================

-- Seccion Alacena
INSERT INTO locations (name, section, side, position, level) VALUES
  ('Alacena Arriba Izquierda, Primer Nivel', 'Alacena', 'Izquierda', 'Arriba', 'Primer Nivel'),
  ('Alacena Arriba Derecha, Primer Nivel', 'Alacena', 'Derecha', 'Arriba', 'Primer Nivel'),
  ('Alacena Arriba Derecha, Segundo Nivel', 'Alacena', 'Derecha', 'Arriba', 'Segundo Nivel'),
  ('Alacena Arriba Izquierda, Segundo Nivel', 'Alacena', 'Izquierda', 'Arriba', 'Segundo Nivel'),
  ('Alacena Arriba Derecha, Tercer Nivel', 'Alacena', 'Derecha', 'Arriba', 'Tercer Nivel'),
  ('Alacena Arriba Izquierda, Tercer Nivel', 'Alacena', 'Izquierda', 'Arriba', 'Tercer Nivel'),
  ('Alacena Abajo Derecha, Primer Nivel', 'Alacena', 'Derecha', 'Abajo', 'Primer Nivel'),
  ('Alacena Abajo Derecha, Segundo Nivel', 'Alacena', 'Derecha', 'Abajo', 'Segundo Nivel'),
  ('Alacena Abajo Izquierda, Primer Nivel', 'Alacena', 'Izquierda', 'Abajo', 'Primer Nivel'),
  ('Alacena Abajo Izquierda, Segundo Nivel', 'Alacena', 'Izquierda', 'Abajo', 'Segundo Nivel'),
  ('Alacena Abajo Derecha, Tercer Nivel', 'Alacena', 'Derecha', 'Abajo', 'Tercer Nivel')
ON CONFLICT (name) DO UPDATE SET
  section = EXCLUDED.section,
  side = EXCLUDED.side,
  position = EXCLUDED.position,
  level = EXCLUDED.level;

-- Seccion Condimentero
INSERT INTO locations (name, section, side, position, level) VALUES
  ('Condimentero Izquierdo, Primer nivel', 'Condimentero', 'Izquierdo', NULL, 'Primer nivel'),
  ('Condimentero Derecho, Primer nivel', 'Condimentero', 'Derecho', NULL, 'Primer nivel'),
  ('Condimentero Izquierdo, Segundo nivel', 'Condimentero', 'Izquierdo', NULL, 'Segundo nivel'),
  ('Condimentero Derecho, Segundo nivel', 'Condimentero', 'Derecho', NULL, 'Segundo nivel'),
  ('Condimentero Izquierdo, Tercer nivel', 'Condimentero', 'Izquierdo', NULL, 'Tercer nivel'),
  ('Condimentero Derecho, Tercer nivel', 'Condimentero', 'Derecho', NULL, 'Tercer nivel'),
  ('Condimentero Izquierdo, Cuarto nivel', 'Condimentero', 'Izquierdo', NULL, 'Cuarto nivel')
ON CONFLICT (name) DO UPDATE SET
  section = EXCLUDED.section,
  side = EXCLUDED.side,
  position = EXCLUDED.position,
  level = EXCLUDED.level;

-- =====================================================
-- 3. INVENTORY ITEMS
-- =====================================================

-- Alacena - Utensilios
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Accesorios de Lavabo', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Lavabo' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Maquina de Hot Dogs', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bandeja de Plastico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Plasticos' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Parrila Portatil', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Tablas para Picar', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Picar' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Model de Pastel Grande', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Ollas Grandes', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Ollas' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Exprimidor Metalico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Plato de Microondas', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Microondas' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bowls de Metal', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Respuesto de Exprimidor', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Horno Electrico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Mesa de Madera', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Madera' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Molino', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Picar' AND l.name = 'Alacena Arriba Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cafetera Roja', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pairex de Vidrio', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Vidrio' AND l.name = 'Alacena Arriba Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sarten Electrico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bowls de Plastico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Plasticos' AND l.name = 'Alacena Arriba Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Ollas Pequenas', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Ollas' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cernidero Metalico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Batidora', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
ON CONFLICT DO NOTHING;

-- Alacena - Alimentos y productos de limpieza
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Avena', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Cereal' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Granola', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Cereal' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pancakes', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Limpiador de Vidrios', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Chocolate', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Suavizante', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cafe Instantaneo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Vinagre', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Legz', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Alcohol', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Frejol Negro', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Estropajos', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Fideos', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Pasta' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Alcohol Puntas', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Morocho', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Desinfectante', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bote de Sal', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Detergente en Polvo', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cera de piso', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Harina', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Levadura', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bicarbonato', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Comida de Atom', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Perro' AND l.name = 'Alacena Abajo Izquierda, Primer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Polvo para Hornear', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Gelatina', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Chantilly', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Quintales', c.id, l.id, 1, 1, 'saco'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Izquierda, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Maicena', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aceite Caneca', c.id, l.id, 1, 1, 'caneca'
FROM categories c, locations l
WHERE c.name = 'Aceite' AND l.name = 'Alacena Abajo Izquierda, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Yemo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Grajeas', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Galletas', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Mangas Pasteleras', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Azucar Morena', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Comida' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cafe para Pasar', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Comida' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Garbanzo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Hierbas Medicinales', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Laurel', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Jamaica', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Oregano', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Crema de Almendras', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Comida' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsas en Salchets', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
ON CONFLICT DO NOTHING;

-- Condimentero
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Mejorona', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sal Rosada', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Achiote', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Aceite' AND l.name = 'Condimentero Izquierdo, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador de Carnes', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsa de Soya', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Paprika', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsa China', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador de Hierbas', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsa de Ajo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazon Mexicano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Oregano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sal', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pimienta para Moler', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Linaza', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Clavo de Olor', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Canela Molina', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Tomillo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Derecho, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Esencia de Menta', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aji Peruano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Nuez Moscada', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Jengibre en Polvo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Derecho, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Miel', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Curcuma', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Esencia de Coco', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pimienta Blanca', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Esencia de Vainilla', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Comimo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Maiz Dulce', c.id, l.id, 1, 1, 'lata'
FROM categories c, locations l
WHERE c.name = 'Enlatados' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pimienta Negra Molina', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Frejol Con Tocino', c.id, l.id, 1, 1, 'lata'
FROM categories c, locations l
WHERE c.name = 'Enlatados' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aderezo Para Ensalda', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Atun', c.id, l.id, 1, 1, 'lata'
FROM categories c, locations l
WHERE c.name = 'Enlatados' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Margarina', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Aceite' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Nuez Moscada', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Criollita', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cebolla en polvo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Chia', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador de Paella', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sopas en Polvo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Albahaca', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sal para Cerdo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Curry', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Canguil', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aji Peruano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Tostado', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Lenteja', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Quinoa', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cosa sin Nombre', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
ON CONFLICT DO NOTHING;
