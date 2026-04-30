---
tags: [database, seeders, datos]
parent: [[03 - Base de Datos]]
---

# Seeders - Datos Iniciales

## 📊 Resumen de Datos

| Tipo | Cantidad |
|------|----------|
| Categorías | 22 |
| Ubicaciones | ~25 |
| Objetos de Inventario | ~130 |

---

## 🏷️ Categorías

```sql
-- Insertar categorías únicas
INSERT INTO categories (id, name, description, color) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Aceite', 'Aceites, margarinas y grasas', '#FCD34D'),
  ('c0000000-0000-0000-0000-000000000002', 'Cereal', 'Cereales de desayuno', '#F97316'),
  ('c0000000-0000-0000-0000-000000000003', 'Comida', 'Alimentos generales', '#10B981'),
  ('c0000000-0000-0000-0000-000000000004', 'Sazon', 'Sales, pimientas y condimentos', '#EF4444'),
  ('c0000000-0000-0000-0000-000000000005', 'Electrico', 'Electrodomésticos', '#6366F1'),
  ('c0000000-0000-0000-0000-000000000006', 'Enlatados', 'Conservas y enlatados', '#3B82F6'),
  ('c0000000-0000-0000-0000-000000000007', 'Esencias', 'Esencias y extractos', '#8B5CF6'),
  ('c0000000-0000-0000-0000-000000000008', 'Hierbas', 'Hierbas y especias', '#22C55E'),
  ('c0000000-0000-0000-0000-000000000009', 'Higiene', 'Productos de limpieza', '#06B6D4'),
  ('c0000000-0000-0000-0000-000000000010', 'Metalico', 'Utensilios metálicos', '#64748B'),
  ('c0000000-0000-0000-0000-000000000011', 'Microondas', 'Recipientes para microondas', '#F472B6'),
  ('c0000000-0000-0000-0000-000000000012', 'Madera', 'Tablas y utensilios de madera', '#92400E'),
  ('c0000000-0000-0000-0000-000000000013', 'Ollas', 'Ollas y sartenes', '#DC2626'),
  ('c0000000-0000-0000-0000-000000000014', 'Pasta', 'Fideos y pastas', '#FBBF24'),
  ('c0000000-0000-0000-0000-000000000015', 'Perro', 'Comida para mascotas', '#A855F7'),
  ('c0000000-0000-0000-0000-000000000016', 'Picar', 'Tablas y utensilios para picar', '#78716C'),
  ('c0000000-0000-0000-0000-000000000017', 'Plasticos', 'Recipientes y utensilios plásticos', '#2DD4BF'),
  ('c0000000-0000-0000-0000-000000000018', 'Polvos', 'Harinas, chocolates y polvos', '#FB923C'),
  ('c0000000-0000-0000-0000-000000000019', 'Reposteria', 'Ingredientes para hornear', '#F472B6'),
  ('c0000000-0000-0000-0000-000000000020', 'Salsas', 'Salsas y aderezos', '#DC2626'),
  ('c0000000-0000-0000-0000-000000000021', 'Vidrio', 'Recipientes de vidrio', '#60A5FA'),
  ('c0000000-0000-0000-0000-000000000022', 'Granos', 'Granos secos, legumbres', '#84CC16'),
  ('c0000000-0000-0000-0000-000000000023', 'Lavabo', 'Accesorios de lavabo', '#22D3EE');
```

---

## 📍 Ubicaciones

### Sección Alacena

```sql
-- Alacena Arriba Izquierda
INSERT INTO locations (id, name, section, side, position, level) VALUES
  ('l0000000-0000-0000-0000-000000000001', 'Alacena Arriba Izquierda, Primer Nivel', 
   'Alacena', 'Izquierda', 'Arriba', 'Primer Nivel'),
  ('l0000000-0000-0000-0000-000000000002', 'Alacena Arriba Izquierda, Segundo Nivel', 
   'Alacena', 'Izquierda', 'Arriba', 'Segundo Nivel'),
  ('l0000000-0000-0000-0000-000000000003', 'Alacena Arriba Izquierda, Tercer Nivel', 
   'Alacena', 'Izquierda', 'Arriba', 'Tercer Nivel'),
  
  -- Alacena Arriba Derecha
  ('l0000000-0000-0000-0000-000000000004', 'Alacena Arriba Derecha, Primer Nivel', 
   'Alacena', 'Derecha', 'Arriba', 'Primer Nivel'),
  ('l0000000-0000-0000-0000-000000000005', 'Alacena Arriba Derecha, Segundo Nivel', 
   'Alacena', 'Derecha', 'Arriba', 'Segundo Nivel'),
  ('l0000000-0000-0000-0000-000000000006', 'Alacena Arriba Derecha, Tercer Nivel', 
   'Alacena', 'Derecha', 'Arriba', 'Tercer Nivel'),
  
  -- Alacena Abajo Izquierda
  ('l0000000-0000-0000-0000-000000000007', 'Alacena Abajo Izquierda, Primer Nivel', 
   'Alacena', 'Izquierda', 'Abajo', 'Primer Nivel'),
  ('l0000000-0000-0000-0000-000000000008', 'Alacena Abajo Izquierda, Segundo Nivel', 
   'Alacena', 'Izquierda', 'Abajo', 'Segundo Nivel'),
  
  -- Alacena Abajo Derecha
  ('l0000000-0000-0000-0000-000000000009', 'Alacena Abajo Derecha, Primer Nivel', 
   'Alacena', 'Derecha', 'Abajo', 'Primer Nivel'),
  ('l0000000-0000-0000-0000-000000000010', 'Alacena Abajo Derecha, Segundo Nivel', 
   'Alacena', 'Derecha', 'Abajo', 'Segundo Nivel'),
  ('l0000000-0000-0000-0000-000000000011', 'Alacena Abajo Derecha, Tercer Nivel', 
   'Alacena', 'Derecha', 'Abajo', 'Tercer Nivel');
```

### Sección Condimentero

```sql
-- Condimentero Izquierdo
INSERT INTO locations (id, name, section, side, position, level) VALUES
  ('l0000000-0000-0000-0000-000000000012', 'Condimentero Izquierdo, Primer nivel', 
   'Condimentero', 'Izquierdo', NULL, 'Primer nivel'),
  ('l0000000-0000-0000-0000-000000000013', 'Condimentero Izquierdo, Segundo nivel', 
   'Condimentero', 'Izquierdo', NULL, 'Segundo nivel'),
  ('l0000000-0000-0000-0000-000000000014', 'Condimentero Izquierdo, Tercer nivel', 
   'Condimentero', 'Izquierdo', NULL, 'Tercer nivel'),
  ('l0000000-0000-0000-0000-000000000015', 'Condimentero Izquierdo, Cuarto nivel', 
   'Condimentero', 'Izquierdo', NULL, 'Cuarto nivel'),
  
  -- Condimentero Derecho
  ('l0000000-0000-0000-0000-000000000016', 'Condimentero Derecho, Primer nivel', 
   'Condimentero', 'Derecho', NULL, 'Primer nivel'),
  ('l0000000-0000-0000-0000-000000000017', 'Condimentero Derecho, Segundo nivel', 
   'Condimentero', 'Derecho', NULL, 'Segundo nivel'),
  ('l0000000-0000-0000-0000-000000000018', 'Condimentero Derecho, Tercer nivel', 
   'Condimentero', 'Derecho', NULL, 'Tercer nivel');
```

---

## 📦 Objetos de Inventario

### Alacena - Utensilios (Primer Nivel)

```sql
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit) VALUES
  -- Alacena Arriba Izquierda, Primer Nivel (l001)
  ('Accesorios de Lavabo', 'c0000000-0000-0000-0000-000000000023', 'l0000000-0000-0000-0000-000000000001', 1, 1, 'unidad'),
  ('Bandeja de Plastico', 'c0000000-0000-0000-0000-000000000017', 'l0000000-0000-0000-0000-000000000001', 2, 1, 'unidad'),
  ('Tablas para Picar', 'c0000000-0000-0000-0000-000000000016', 'l0000000-0000-0000-0000-000000000001', 3, 1, 'unidad'),
  ('Ollas Grandes', 'c0000000-0000-0000-0000-000000000013', 'l0000000-0000-0000-0000-000000000001', 4, 2, 'unidad'),
  ('Exprimidor Metalico', 'c0000000-0000-0000-0000-000000000010', 'l0000000-0000-0000-0000-000000000001', 1, 1, 'unidad'),
  ('Plato de Microondas', 'c0000000-0000-0000-0000-000000000011', 'l0000000-0000-0000-0000-000000000001', 4, 2, 'unidad'),
  ('Respuesto de Exprimidor', 'c0000000-0000-0000-0000-000000000010', 'l0000000-0000-0000-0000-000000000001', 1, 1, 'unidad'),
  ('Mesa de Madera', 'c0000000-0000-0000-0000-000000000012', 'l0000000-0000-0000-0000-000000000001', 1, 1, 'unidad'),
  
  -- Alacena Arriba Derecha, Primer Nivel (l004)
  ('Maquina de Hot Dogs', 'c0000000-0000-0000-0000-000000000005', 'l0000000-0000-0000-0000-000000000004', 1, 1, 'unidad'),
  ('Parrila Portatil', 'c0000000-0000-0000-0000-000000000005', 'l0000000-0000-0000-0000-000000000004', 1, 1, 'unidad'),
  ('Model de Pastel Grande', 'c0000000-0000-0000-0000-000000000010', 'l0000000-0000-0000-0000-000000000004', 1, 1, 'unidad');
```

### Alacena - Utensilios (Segundo Nivel)

```sql
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit) VALUES
  -- Alacena Arriba Izquierda, Segundo Nivel (l002)
  ('Cafetera Roja', 'c0000000-0000-0000-0000-000000000005', 'l0000000-0000-0000-0000-000000000002', 1, 1, 'unidad'),
  ('Sarten Electrico', 'c0000000-0000-0000-0000-000000000005', 'l0000000-0000-0000-0000-000000000002', 1, 1, 'unidad'),
  ('Ollas Pequeñas', 'c0000000-0000-0000-0000-000000000013', 'l0000000-0000-0000-0000-000000000002', 3, 2, 'unidad'),
  ('Cernidero Metalico', 'c0000000-0000-0000-0000-000000000010', 'l0000000-0000-0000-0000-000000000002', 2, 1, 'unidad'),
  ('Batidora', 'c0000000-0000-0000-0000-000000000005', 'l0000000-0000-0000-0000-000000000002', 1, 1, 'unidad'),
  
  -- Alacena Arriba Derecha, Segundo Nivel (l005)
  ('Bowls de Metal', 'c0000000-0000-0000-0000-000000000010', 'l0000000-0000-0000-0000-000000000005', 4, 2, 'unidad'),
  ('Horno Electrico', 'c0000000-0000-0000-0000-000000000005', 'l0000000-0000-0000-0000-000000000005', 1, 1, 'unidad'),
  ('Molino', 'c0000000-0000-0000-0000-000000000016', 'l0000000-0000-0000-0000-000000000005', 1, 1, 'unidad');
```

### Alacena - Utensilios (Tercer Nivel)

```sql
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit) VALUES
  -- Alacena Arriba Izquierda, Tercer Nivel (l003) - Higiene
  ('Limpiador de Vidrios', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 2, 1, 'unidad'),
  ('Suavizante', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 1, 1, 'unidad'),
  ('Vinagre', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 1, 1, 'unidad'),
  ('Alcohol', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 2, 1, 'unidad'),
  ('Estropajos', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 5, 3, 'unidad'),
  ('Alcohol Puntas', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 1, 1, 'unidad'),
  ('Desinfectante', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 2, 1, 'unidad'),
  ('Detergente en Polvo', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 1, 1, 'unidad'),
  ('Cera de piso', 'c0000000-0000-0000-0000-000000000009', 'l0000000-0000-0000-0000-000000000003', 1, 1, 'unidad'),
  
  -- Alacena Arriba Derecha, Tercer Nivel (l006)
  ('Pairex de Vidrio', 'c0000000-0000-0000-0000-000000000021', 'l0000000-0000-0000-0000-000000000006', 3, 2, 'unidad'),
  ('Bowls de Plastico', 'c0000000-0000-0000-0000-000000000017', 'l0000000-0000-0000-0000-000000000006', 5, 3, 'unidad');
```

### Alacena - Alimentos (Abajo Derecha)

```sql
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit) VALUES
  -- Alacena Abajo Derecha, Primer Nivel (l009)
  ('Avena', 'c0000000-0000-0000-0000-000000000002', 'l0000000-0000-0000-0000-000000000009', 1, 1, 'unidad'),
  ('Granola', 'c0000000-0000-0000-0000-000000000002', 'l0000000-0000-0000-0000-000000000009', 1, 1, 'unidad'),
  ('Pancakes', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000009', 1, 1, 'unidad'),
  ('Chocolate', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000009', 2, 1, 'unidad'),
  ('Cafe Instantaneo', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000009', 1, 1, 'unidad'),
  ('Legz', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000009', 1, 1, 'unidad'),
  ('Frejol Negro', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000009', 2, 1, 'unidad'),
  ('Fideos', 'c0000000-0000-0000-0000-000000000014', 'l0000000-0000-0000-0000-000000000009', 3, 2, 'unidad'),
  ('Morocho', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000009', 1, 1, 'unidad'),
  ('Bote de Sal', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000009', 1, 1, 'unidad'),
  
  -- Alacena Abajo Derecha, Segundo Nivel (l010) - Reposteria
  ('Harina', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 2, 1, 'unidad'),
  ('Levadura', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 3, 2, 'unidad'),
  ('Bicarbonato', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 1, 1, 'unidad'),
  ('Polvo para Hornear', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 1, 1, 'unidad'),
  ('Gelatina', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 4, 2, 'unidad'),
  ('Chantilly', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 1, 1, 'unidad'),
  ('Maicena', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 1, 1, 'unidad'),
  ('Yemo', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 1, 1, 'unidad'),
  ('Grajeas', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 1, 1, 'unidad'),
  ('Galletas', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 2, 1, 'unidad'),
  ('Mangas Pasteleras', 'c0000000-0000-0000-0000-000000000019', 'l0000000-0000-0000-0000-000000000010', 2, 1, 'unidad'),
  
  -- Alacena Abajo Derecha, Tercer Nivel (l011)
  ('Azucar Morena', 'c0000000-0000-0000-0000-000000000003', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Café para Pasar', 'c0000000-0000-0000-0000-000000000003', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Garbanzo', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Hierbas Medicinales', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Laurel', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Jamaica', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Oregano', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Crema de Almendras', 'c0000000-0000-0000-0000-000000000003', 'l0000000-0000-0000-0000-000000000011', 1, 1, 'unidad'),
  ('Salsas en Salchets', 'c0000000-0000-0000-0000-000000000020', 'l0000000-0000-0000-0000-000000000011', 3, 2, 'unidad');
```

### Alacena - Alimentos (Abajo Izquierda)

```sql
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit) VALUES
  -- Alacena Abajo Izquierda, Primer Nivel (l007)
  ('Comida de Atom', 'c0000000-0000-0000-0000-000000000015', 'l0000000-0000-0000-0000-000000000007', 1, 1, 'unidad'),
  
  -- Alacena Abajo Izquierda, Segundo Nivel (l008)
  ('Quintales', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000008', 2, 1, 'unidad'),
  ('Aceite Caneca', 'c0000000-0000-0000-0000-000000000001', 'l0000000-0000-0000-0000-000000000008', 1, 1, 'unidad');
```

### Condimentero Izquierdo

```sql
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit) VALUES
  -- Condimentero Izquierdo, Primer nivel (l012)
  ('Mejorona', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000012', 1, 1, 'unidad'),
  ('Achiote', 'c0000000-0000-0000-0000-000000000001', 'l0000000-0000-0000-0000-000000000012', 1, 1, 'unidad'),
  ('Salsa de Soya', 'c0000000-0000-0000-0000-000000000020', 'l0000000-0000-0000-0000-000000000012', 1, 1, 'unidad'),
  ('Salsa China', 'c0000000-0000-0000-0000-000000000020', 'l0000000-0000-0000-0000-000000000012', 1, 1, 'unidad'),
  ('Salsa de Ajo', 'c0000000-0000-0000-0000-000000000020', 'l0000000-0000-0000-0000-000000000012', 1, 1, 'unidad'),
  ('Oregano', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000012', 1, 1, 'unidad'),
  
  -- Condimentero Izquierdo, Segundo nivel (l013)
  ('Linaza', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  ('Clavo de Olor', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  ('Canela Molina', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  ('Esencia de Menta', 'c0000000-0000-0000-0000-000000000007', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  ('Nuez Moscada', 'c0000000-0000-0000-0000-000000000007', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  ('Miel', 'c0000000-0000-0000-0000-000000000007', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  ('Esencia de Coco', 'c0000000-0000-0000-0000-000000000007', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  ('Esencia de Vainilla', 'c0000000-0000-0000-0000-000000000007', 'l0000000-0000-0000-0000-000000000013', 1, 1, 'unidad'),
  
  -- Condimentero Izquierdo, Tercer nivel (l014)
  ('Maiz Dulce', 'c0000000-0000-0000-0000-000000000006', 'l0000000-0000-0000-0000-000000000014', 2, 1, 'unidad'),
  ('Frejol Con Tocino', 'c0000000-0000-0000-0000-000000000006', 'l0000000-0000-0000-0000-000000000014', 1, 1, 'unidad'),
  ('Atun', 'c0000000-0000-0000-0000-000000000006', 'l0000000-0000-0000-0000-000000000014', 0, 2, 'unidad'),
  ('Margarina', 'c0000000-0000-0000-0000-000000000001', 'l0000000-0000-0000-0000-000000000014', 1, 1, 'unidad'),
  ('Criollita', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000014', 1, 1, 'unidad'),
  ('Chia', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000014', 1, 1, 'unidad'),
  ('Sopas en Polvo', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000014', 3, 2, 'unidad'),
  
  -- Condimentero Izquierdo, Cuarto nivel (l015)
  ('Canguil', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000015', 2, 1, 'unidad'),
  ('Tostado', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000015', 1, 1, 'unidad'),
  ('Lenteja', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000015', 2, 1, 'unidad'),
  ('Quinoa', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000015', 1, 1, 'unidad'),
  ('Cosa sin Nombre', 'c0000000-0000-0000-0000-000000000022', 'l0000000-0000-0000-0000-000000000015', 1, 1, 'unidad');
```

### Condimentero Derecho

```sql
INSERT INTO inventory_items (name, category_id, location_id, stock_quantity, min_stock, unit) VALUES
  -- Condimentero Derecho, Primer nivel (l016)
  ('Sal Rosada', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  ('Sazonador de Carnes', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  ('Paprika', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  ('Sazonador de Hierbas', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  ('Sazon Mexicano', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  ('Sal Rosada', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  ('Sal', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  ('Pimienta para Moler', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000016', 1, 1, 'unidad'),
  
  -- Condimentero Derecho, Segundo nivel (l017)
  ('Tomillo', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000017', 1, 1, 'unidad'),
  ('Aji Peruano', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000017', 1, 1, 'unidad'),
  ('Jengibre en Polvo', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000017', 1, 1, 'unidad'),
  ('Curcuma', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000017', 1, 1, 'unidad'),
  ('Pimienta Blanca', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000017', 1, 1, 'unidad'),
  ('Comimo', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000017', 1, 1, 'unidad'),
  
  -- Condimentero Derecho, Tercer nivel (l018)
  ('Pimienta Negra Molina', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Aderezo Para Ensalda', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Sazonador', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Nuez Moscada', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Cebolla en polvo', 'c0000000-0000-0000-0000-000000000018', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Sazonador de Paella', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Albahaca', 'c0000000-0000-0000-0000-000000000008', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Sal para Cerdo', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Curry', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad'),
  ('Aji Peruano', 'c0000000-0000-0000-0000-000000000004', 'l0000000-0000-0000-0000-000000000018', 1, 1, 'unidad');
```

---

## 📄 Script Completo

El script SQL completo se encuentra en:
- `supabase/migrations/001_initial_schema.sql` - Schema de tablas
- `supabase/seeders/001_kitchen_data.sql` - Datos iniciales

---

## 🔍 Búsqueda de Ejemplo

```sql
-- Buscar "Atún" y mostrar su ubicación
SELECT 
  i.name,
  c.name as category,
  l.full_path as location
FROM inventory_items i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN locations l ON i.location_id = l.id
WHERE i.name ILIKE '%atun%';

-- Resultado:
-- name: Atun
-- category: Enlatados
-- location: Condimentero Izquierdo, Tercer nivel
```

---
*[[03 - Base de Datos]] | [[05 - UI Mobile]]*
