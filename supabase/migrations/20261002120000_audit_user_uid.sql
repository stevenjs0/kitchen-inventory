-- =====================================================
-- AUDITORÍA POR USUARIO (uid)
-- Agrega created_by_uid / updated_by_uid a las tablas auditadas.
-- created_by / updated_by siguen guardando el display name (TEXT).
-- No modifica políticas RLS.
-- =====================================================

ALTER TABLE inventory_items
  ADD COLUMN IF NOT EXISTS created_by_uid uuid,
  ADD COLUMN IF NOT EXISTS updated_by_uid uuid;

ALTER TABLE categories
  ADD COLUMN IF NOT EXISTS created_by_uid uuid,
  ADD COLUMN IF NOT EXISTS updated_by_uid uuid;

ALTER TABLE locations
  ADD COLUMN IF NOT EXISTS created_by_uid uuid,
  ADD COLUMN IF NOT EXISTS updated_by_uid uuid;

ALTER TABLE rooms
  ADD COLUMN IF NOT EXISTS created_by_uid uuid,
  ADD COLUMN IF NOT EXISTS updated_by_uid uuid;
