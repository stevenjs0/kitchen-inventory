import { InventoryItem } from './entities';

export class ItemNotFoundError extends Error {
  constructor(message = 'Item no encontrado') {
    super(message);
    this.name = 'ItemNotFoundError';
  }
}

export class InsufficientStockError extends Error {
  readonly current: InventoryItem;

  constructor(current: InventoryItem) {
    super('El stock no puede ser negativo');
    this.name = 'InsufficientStockError';
    this.current = current;
  }
}
