-- La columna generada concatenaba los cuatro campos con espacios fijos, así
-- que cuando faltaba el lado o la posición la ruta quedaba con espacios
-- repetidos ("Condimentero Izquierdo  Primer nivel").
-- Se recalcula omitiendo las partes vacías.
ALTER TABLE locations
  DROP COLUMN IF EXISTS full_path;

ALTER TABLE locations
  ADD COLUMN full_path TEXT GENERATED ALWAYS AS (
    BTRIM(
      section
      || COALESCE(' ' || NULLIF(side, ''), '')
      || COALESCE(' ' || NULLIF(position, ''), '')
      || COALESCE(' ' || NULLIF(level, ''), '')
    )
  ) STORED;
