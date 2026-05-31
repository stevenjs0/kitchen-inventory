-- 1. Create rooms table
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50) NOT NULL DEFAULT 'Home',
  color VARCHAR(7) DEFAULT '#6B7280',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- 2. Enable RLS
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir todo en rooms" ON rooms
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Add nullable room_id to categories and locations
ALTER TABLE categories ADD COLUMN room_id UUID REFERENCES rooms(id) ON DELETE CASCADE;
ALTER TABLE locations ADD COLUMN room_id UUID REFERENCES rooms(id) ON DELETE CASCADE;

-- 4. Insert default room "Cocina"
INSERT INTO rooms (name, description, icon, color) VALUES
  ('Cocina', 'Suministros y utensilios de cocina', 'ChefHat', '#F97316');

-- 5. Assign existing data to "Cocina"
UPDATE categories SET room_id = (SELECT id FROM rooms WHERE name = 'Cocina');
UPDATE locations SET room_id = (SELECT id FROM rooms WHERE name = 'Cocina');

-- 6. Make room_id NOT NULL
ALTER TABLE categories ALTER COLUMN room_id SET NOT NULL;
ALTER TABLE locations ALTER COLUMN room_id SET NOT NULL;
