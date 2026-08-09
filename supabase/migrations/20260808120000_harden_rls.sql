-- =====================================================
-- RLS HARDENING
-- Garantiza un estado de RLS seguro e idempotente en todas
-- las tablas, sin importar qué políticas existan hoy.
-- Cualquier acceso sin sesión (anon/service_role) queda bloqueado.
-- =====================================================

-- 1. HABILITAR RLS (idempotente)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- 2. FORZAR RLS: el rol que posee la tabla tampoco puede saltárselo
ALTER TABLE rooms FORCE ROW LEVEL SECURITY;
ALTER TABLE categories FORCE ROW LEVEL SECURITY;
ALTER TABLE locations FORCE ROW LEVEL SECURITY;
ALTER TABLE inventory_items FORCE ROW LEVEL SECURITY;

-- 3. ELIMINAR políticas antiguas (tanto las "Permitir todo" USING(true)
--    como las "Authenticated users can manage *" que permiten TODO con
--    cualquier usuario autenticado).
DROP POLICY IF EXISTS "Permitir todo en rooms" ON rooms;
DROP POLICY IF EXISTS "Permitir todo en categories" ON categories;
DROP POLICY IF EXISTS "Permitir todo en locations" ON locations;
DROP POLICY IF EXISTS "Permitir todo en inventory_items" ON inventory_items;

DROP POLICY IF EXISTS "Authenticated users can manage rooms" ON rooms;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage locations" ON locations;
DROP POLICY IF EXISTS "Authenticated users can manage inventory_items" ON inventory_items;

-- 4. CREAR POLÍTICAS granular: solo usuarios autenticados (auth.uid()).
--    Lectura para cualquier usuario del hogar autenticado; escritura y
--    borrado también solo para autenticados.

-- rooms
CREATE POLICY "rooms_select_auth" ON rooms
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "rooms_insert_auth" ON rooms
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "rooms_update_auth" ON rooms
  FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "rooms_delete_auth" ON rooms
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- categories
CREATE POLICY "categories_select_auth" ON categories
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "categories_insert_auth" ON categories
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "categories_update_auth" ON categories
  FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "categories_delete_auth" ON categories
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- locations
CREATE POLICY "locations_select_auth" ON locations
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "locations_insert_auth" ON locations
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "locations_update_auth" ON locations
  FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "locations_delete_auth" ON locations
  FOR DELETE USING (auth.uid() IS NOT NULL);

-- inventory_items
CREATE POLICY "inventory_items_select_auth" ON inventory_items
  FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "inventory_items_insert_auth" ON inventory_items
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "inventory_items_update_auth" ON inventory_items
  FOR UPDATE USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "inventory_items_delete_auth" ON inventory_items
  FOR DELETE USING (auth.uid() IS NOT NULL);