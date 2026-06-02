-- =====================================================
-- AUDIT FIXES MIGRATION
-- RLS, FK RESTRICT, Indexes, Triggers
-- =====================================================

-- 1. FIX RLS: Replace USING (true) with auth.uid() IS NOT NULL
-- Drop old policies
DROP POLICY IF EXISTS "Permitir todo en categories" ON categories;
DROP POLICY IF EXISTS "Permitir todo en locations" ON locations;
DROP POLICY IF EXISTS "Permitir todo en inventory_items" ON inventory_items;
DROP POLICY IF EXISTS "Permitir todo en rooms" ON rooms;

-- Create new policies (authenticated users only)
CREATE POLICY "Authenticated users can manage categories" ON categories
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage locations" ON locations
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage inventory_items" ON inventory_items
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage rooms" ON rooms
  FOR ALL USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

-- 2. FIX FK: Change ON DELETE CASCADE to ON DELETE RESTRICT for room_id
-- Must drop and recreate the constraints
ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_room_id_fkey;
ALTER TABLE categories ADD CONSTRAINT categories_room_id_fkey
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE RESTRICT;

ALTER TABLE locations DROP CONSTRAINT IF EXISTS locations_room_id_fkey;
ALTER TABLE locations ADD CONSTRAINT locations_room_id_fkey
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE RESTRICT;

-- 3. ADD MISSING INDEXES
CREATE INDEX IF NOT EXISTS idx_categories_room_id ON categories(room_id);
CREATE INDEX IF NOT EXISTS idx_locations_room_id ON locations(room_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_category_id ON inventory_items(category_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_location_id ON inventory_items(location_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_is_active ON inventory_items(is_active);
CREATE INDEX IF NOT EXISTS idx_inventory_items_stock_quantity ON inventory_items(stock_quantity);
CREATE INDEX IF NOT EXISTS idx_rooms_name ON rooms(name);

-- 4. ADD updated_at AUTO-UPDATE TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_inventory_items_updated_at
  BEFORE UPDATE ON inventory_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
