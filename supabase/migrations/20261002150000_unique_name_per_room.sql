-- Los servicios validan la unicidad del nombre dentro del ambiente
-- ("Ya existe una categoría con ese nombre en este ambiente"), pero la base
-- tenía UNIQUE global sobre name: dos ambientes con el mismo nombre pasaban la
-- validación y fallaban después con un error crudo de PostgreSQL.
-- La restricción pasa a ser por (room_id, name).
ALTER TABLE locations
  DROP CONSTRAINT IF EXISTS locations_name_key;

ALTER TABLE locations
  ADD CONSTRAINT locations_room_id_name_key UNIQUE (room_id, name);

ALTER TABLE categories
  DROP CONSTRAINT IF EXISTS categories_name_key;

ALTER TABLE categories
  ADD CONSTRAINT categories_room_id_name_key UNIQUE (room_id, name);
