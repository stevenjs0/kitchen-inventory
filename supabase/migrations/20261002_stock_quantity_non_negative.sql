-- El stock nunca puede quedar negativo (defensa extra en BD, además de la
-- validación de la capa de servicio).
ALTER TABLE inventory_items
  ADD CONSTRAINT inventory_items_stock_quantity_non_negative
  CHECK (stock_quantity >= 0);
