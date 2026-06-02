-- =====================================================
-- SEED DATA FOR INVENTARIO HOGAR
-- This file is used by `supabase db seed`
-- =====================================================

-- =====================================================
-- 1. ROOMS
-- =====================================================
INSERT INTO rooms (name, description, icon, color) VALUES
  ('Cocina', 'Suministros y utensilios de cocina', 'ChefHat', '#F97316'),
  ('Bano', 'Productos de bano y aseo personal', 'Bath', '#3B82F6'),
  ('Lavanderia', 'Productos de lavanderia y limpieza general', 'WashingMachine', '#10B981'),
  ('Garage', 'Herramientas y suministros del garage', 'Wrench', '#6B7280'),
  ('Bodega', 'Almacenamiento general', 'Warehouse', '#8B5CF6')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 2. CATEGORIES
-- =====================================================
INSERT INTO categories (name, description, color, room_id) VALUES
  ('Aceite', 'Aceites, margarinas y grasas', '#FCD34D', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Cereal', 'Cereales de desayuno', '#F97316', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Comida', 'Alimentos generales', '#10B981', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Sazon', 'Sales, pimientas y condimentos', '#EF4444', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Enlatados', 'Conservas y enlatados', '#3B82F6', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Higiene', 'Productos de limpieza', '#06B6D4', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Granos', 'Granos secos, legumbres', '#84CC16', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Lavabo', 'Accesorios de lavabo', '#22D3EE', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Electricos', 'Electrodomesticos y aparatos', '#6366F1', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Plasticos', 'Recipientes y utensilios de plastico', '#A855F7', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Picar', 'Tablas y utensilios para picar', '#EC4899', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Metalico', 'Utensilios y recipientes de metal', '#64748B', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Ollas', 'Ollas y sartenes', '#F97316', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Microondas', 'Accesorios para microondas', '#14B8A6', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Madera', 'Utensilios de madera', '#92400E', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Vidrio', 'Recipientes de vidrio', '#38BDF8', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Polvos', 'Polvos e ingredientes secos', '#FBBF24', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Reposteria', 'Ingredientes para reposteria', '#FB7185', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Hierbas', 'Hierbas y especias', '#22C55E', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Salsas', 'Salsas y aderezos', '#DC2626', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Esencias', 'Esencias y extractos', '#7C3AED', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Perro', 'Comida para mascotas', '#0EA5E9', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Pasta', 'Pastas y fideos', '#F59E0B', (SELECT id FROM rooms WHERE name = 'Cocina'))
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 3. LOCATIONS
-- =====================================================

-- Seccion Alacena
INSERT INTO locations (name, section, side, position, level, room_id) VALUES
  ('Alacena Arriba Izquierda, Primer Nivel', 'Alacena', 'Izquierda', 'Arriba', 'Primer Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Arriba Derecha, Primer Nivel', 'Alacena', 'Derecha', 'Arriba', 'Primer Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Arriba Derecha, Segundo Nivel', 'Alacena', 'Derecha', 'Arriba', 'Segundo Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Arriba Izquierda, Segundo Nivel', 'Alacena', 'Izquierda', 'Arriba', 'Segundo Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Arriba Derecha, Tercer Nivel', 'Alacena', 'Derecha', 'Arriba', 'Tercer Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Arriba Izquierda, Tercer Nivel', 'Alacena', 'Izquierda', 'Arriba', 'Tercer Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Abajo Derecha, Primer Nivel', 'Alacena', 'Derecha', 'Abajo', 'Primer Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Abajo Derecha, Segundo Nivel', 'Alacena', 'Derecha', 'Abajo', 'Segundo Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Abajo Izquierda, Primer Nivel', 'Alacena', 'Izquierda', 'Abajo', 'Primer Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Alacena Abajo Izquierda, Segundo Nivel', 'Alacena', 'Izquierda', 'Abajo', 'Segundo Nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
('Alacena Abajo Derecha, Tercer Nivel', 'Alacena', 'Derecha', 'Abajo', 'Tercer Nivel', (SELECT id FROM rooms WHERE name = 'Cocina'))
ON CONFLICT (name) DO NOTHING;

-- Seccion Condimentero
INSERT INTO locations (name, section, side, position, level, room_id) VALUES
  ('Condimentero Izquierdo, Primer nivel', 'Condimentero', 'Izquierdo', NULL, 'Primer nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Condimentero Derecho, Primer nivel', 'Condimentero', 'Derecho', NULL, 'Primer nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Condimentero Izquierdo, Segundo nivel', 'Condimentero', 'Izquierdo', NULL, 'Segundo nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Condimentero Derecho, Segundo nivel', 'Condimentero', 'Derecho', NULL, 'Segundo nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Condimentero Izquierdo, Tercer nivel', 'Condimentero', 'Izquierdo', NULL, 'Tercer nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
  ('Condimentero Derecho, Tercer nivel', 'Condimentero', 'Derecho', NULL, 'Tercer nivel', (SELECT id FROM rooms WHERE name = 'Cocina')),
('Condimentero Izquierdo, Cuarto nivel', 'Condimentero', 'Izquierdo', NULL, 'Cuarto nivel', (SELECT id FROM rooms WHERE name = 'Cocina'))
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 4. INVENTORY ITEMS
-- =====================================================

-- Alacena - Utensilios
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Accesorios de Lavabo', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Lavabo' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Accesorios de Lavabo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Maquina de Hot Dogs', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Maquina de Hot Dogs' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bandeja de Plastico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Plasticos' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Bandeja de Plastico' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Parrila Portatil', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Parrila Portatil' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Tablas para Picar', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Picar' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Tablas para Picar' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Model de Pastel Grande', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Model de Pastel Grande' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Ollas Grandes', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Ollas' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Ollas Grandes' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Exprimidor Metalico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Exprimidor Metalico' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Plato de Microondas', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Microondas' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Plato de Microondas' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bowls de Metal', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Bowls de Metal' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Respuesto de Exprimidor', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Respuesto de Exprimidor' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Horno Electrico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Horno Electrico' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Mesa de Madera', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Madera' AND l.name = 'Alacena Arriba Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Mesa de Madera' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Molino', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Picar' AND l.name = 'Alacena Arriba Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Molino' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cafetera Roja', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Cafetera Roja' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pairex de Vidrio', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Vidrio' AND l.name = 'Alacena Arriba Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Pairex de Vidrio' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sarten Electrico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sarten Electrico' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bowls de Plastico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Plasticos' AND l.name = 'Alacena Arriba Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Bowls de Plastico' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Ollas Pequenas', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Ollas' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Ollas Pequenas' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cernidero Metalico', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Metalico' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Cernidero Metalico' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Batidora', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Electricos' AND l.name = 'Alacena Arriba Izquierda, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Batidora' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

-- Alacena - Alimentos y productos de limpieza
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Avena', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Cereal' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Avena' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Granola', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Cereal' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Granola' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pancakes', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Pancakes' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Limpiador de Vidrios', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Limpiador de Vidrios' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Chocolate', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Chocolate' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Suavizante', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Suavizante' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cafe Instantaneo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Cafe Instantaneo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Vinagre', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Vinagre' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Legz', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Legz' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Alcohol', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Alcohol' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Frejol Negro', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Frejol Negro' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Estropajos', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Estropajos' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Fideos', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Pasta' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Fideos' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Alcohol Puntas', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Alcohol Puntas' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Morocho', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Morocho' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Desinfectante', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Desinfectante' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bote de Sal', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Alacena Abajo Derecha, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Bote de Sal' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Detergente en Polvo', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Detergente en Polvo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cera de piso', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Higiene' AND l.name = 'Alacena Arriba Izquierda, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Cera de piso' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Harina', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Harina' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Levadura', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Levadura' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Bicarbonato', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Bicarbonato' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Comida de Atom', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Perro' AND l.name = 'Alacena Abajo Izquierda, Primer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Comida de Atom' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Polvo para Hornear', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Polvo para Hornear' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Gelatina', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Gelatina' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Chantilly', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Chantilly' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Quintales', c.id, l.id, 1, 1, 'saco'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Izquierda, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Quintales' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Maicena', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Maicena' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aceite Caneca', c.id, l.id, 1, 1, 'caneca'
FROM categories c, locations l
WHERE c.name = 'Aceite' AND l.name = 'Alacena Abajo Izquierda, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Aceite Caneca' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Yemo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Yemo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Grajeas', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Grajeas' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Galletas', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Galletas' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Mangas Pasteleras', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Reposteria' AND l.name = 'Alacena Abajo Derecha, Segundo Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Mangas Pasteleras' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Azucar Morena', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Comida' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Azucar Morena' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cafe para Pasar', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Comida' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Cafe para Pasar' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Garbanzo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Garbanzo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Hierbas Medicinales', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Hierbas Medicinales' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Laurel', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Laurel' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Jamaica', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Jamaica' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Oregano', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Oregano' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Crema de Almendras', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Comida' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Crema de Almendras' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsas en Salchets', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Alacena Abajo Derecha, Tercer Nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Salsas en Salchets' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

-- Condimentero
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Mejorona', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Mejorona' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sal Rosada', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sal Rosada' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Achiote', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Aceite' AND l.name = 'Condimentero Izquierdo, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Achiote' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador de Carnes', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sazonador de Carnes' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsa de Soya', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Salsa de Soya' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Paprika', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Paprika' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsa China', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Salsa China' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador de Hierbas', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sazonador de Hierbas' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Salsa de Ajo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Salsas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Salsa de Ajo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazon Mexicano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sazon Mexicano' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Oregano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Izquierdo, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Oregano' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sal', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sal' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pimienta para Moler', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Primer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Pimienta para Moler' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Linaza', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Linaza' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Clavo de Olor', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Clavo de Olor' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Canela Molina', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Canela Molina' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Tomillo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Derecho, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Tomillo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Esencia de Menta', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Esencia de Menta' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aji Peruano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Aji Peruano' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Nuez Moscada', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Nuez Moscada' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Jengibre en Polvo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Derecho, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Jengibre en Polvo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Miel', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Miel' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Curcuma', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Curcuma' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Esencia de Coco', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Esencia de Coco' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pimienta Blanca', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Pimienta Blanca' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Esencia de Vainilla', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Esencias' AND l.name = 'Condimentero Izquierdo, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Esencia de Vainilla' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Comimo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Segundo nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Comimo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Maiz Dulce', c.id, l.id, 1, 1, 'lata'
FROM categories c, locations l
WHERE c.name = 'Enlatados' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Maiz Dulce' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Pimienta Negra Molina', c.id, l.id, 1, 1, 'unidad'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Pimienta Negra Molina' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Frejol Con Tocino', c.id, l.id, 1, 1, 'lata'
FROM categories c, locations l
WHERE c.name = 'Enlatados' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Frejol Con Tocino' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aderezo Para Ensalda', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Aderezo Para Ensalda' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Atun', c.id, l.id, 1, 1, 'lata'
FROM categories c, locations l
WHERE c.name = 'Enlatados' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Atun' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sazonador' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Margarina', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Aceite' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Margarina' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Nuez Moscada', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Nuez Moscada' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Criollita', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Criollita' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cebolla en polvo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Cebolla en polvo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Chia', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Chia' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sazonador de Paella', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sazonador de Paella' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sopas en Polvo', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Polvos' AND l.name = 'Condimentero Izquierdo, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sopas en Polvo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Albahaca', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Hierbas' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Albahaca' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Sal para Cerdo', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Sal para Cerdo' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Curry', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Curry' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Canguil', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Canguil' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Aji Peruano', c.id, l.id, 1, 1, 'frasco'
FROM categories c, locations l
WHERE c.name = 'Sazon' AND l.name = 'Condimentero Derecho, Tercer nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Aji Peruano' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Tostado', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Tostado' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Lenteja', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Lenteja' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Quinoa', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Quinoa' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;

INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit)
SELECT 'Cosa sin Nombre', c.id, l.id, 1, 1, 'paquete'
FROM categories c, locations l
WHERE c.name = 'Granos' AND l.name = 'Condimentero Izquierdo, Cuarto nivel'
AND NOT EXISTS (SELECT 1 FROM inventory_items ii WHERE ii.name = 'Cosa sin Nombre' AND ii.location_id = l.id)
ON CONFLICT DO NOTHING;
