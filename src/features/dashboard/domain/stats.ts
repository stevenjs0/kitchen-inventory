import { InventoryItem } from '@/features/inventory/domain/entities';
import { Room } from '@/features/rooms/domain/entities';

export interface StockByCategory {
  categoryId: string;
  name: string;
  color: string;
  total: number;
  itemCount: number;
}

export interface StockByRoom {
  roomId: string;
  name: string;
  color: string;
  total: number;
  itemCount: number;
}

export interface StockByLocation {
  locationId: string;
  name: string;
  color: string;
  total: number;
  itemCount: number;
}

export interface StockStatus {
  status: 'normal' | 'low' | 'out';
  count: number;
  label: string;
}

export function aggregateStockByCategory(
  items: InventoryItem[],
): StockByCategory[] {
  const acc = new Map<string, StockByCategory>();
  for (const item of items) {
    if (!item.category) continue;
    const existing = acc.get(item.category.id);
    if (existing) {
      existing.total += item.stock_quantity;
      existing.itemCount += 1;
    } else {
      acc.set(item.category.id, {
        categoryId: item.category.id,
        name: item.category.name,
        color: item.category.color ?? '#6B7280',
        total: item.stock_quantity,
        itemCount: 1,
      });
    }
  }
  return [...acc.values()].sort((a, b) => b.total - a.total);
}

export function aggregateStockByRoom(
  items: InventoryItem[],
  rooms: Room[],
): StockByRoom[] {
  const roomById = new Map(rooms.map((room) => [room.id, room]));
  const acc = new Map<string, StockByRoom>();
  for (const item of items) {
    const roomId = item.location?.room_id ?? item.category?.room_id;
    const room = roomId ? roomById.get(roomId) : undefined;
    if (!room) continue;
    const existing = acc.get(room.id);
    if (existing) {
      existing.total += item.stock_quantity;
      existing.itemCount += 1;
    } else {
      acc.set(room.id, {
        roomId: room.id,
        name: room.name,
        color: room.color ?? '#6B7280',
        total: item.stock_quantity,
        itemCount: 1,
      });
    }
  }
  return [...acc.values()].sort((a, b) => b.total - a.total);
}

export function aggregateStockByLocation(
  items: InventoryItem[],
  rooms: Room[],
): StockByLocation[] {
  const roomById = new Map(rooms.map((room) => [room.id, room]));
  const acc = new Map<string, StockByLocation>();
  for (const item of items) {
    const loc = item.location;
    if (!loc) continue;
    const existing = acc.get(loc.id);
    if (existing) {
      existing.total += item.stock_quantity;
      existing.itemCount += 1;
    } else {
      const room = loc.room_id ? roomById.get(loc.room_id) : undefined;
      acc.set(loc.id, {
        locationId: loc.id,
        name: loc.name,
        color: room?.color ?? '#6B7280',
        total: item.stock_quantity,
        itemCount: 1,
      });
    }
  }
  return [...acc.values()].sort((a, b) => b.total - a.total);
}

export function aggregateStockStatus(items: InventoryItem[]): StockStatus[] {
  let normal = 0;
  let low = 0;
  let out = 0;

  for (const item of items) {
    if (item.stock_quantity <= 0) {
      out += 1;
    } else if (item.stock_quantity < item.min_stock) {
      low += 1;
    } else {
      normal += 1;
    }
  }

  const result: StockStatus[] = [
    { status: 'normal', count: normal, label: 'Normal' },
    { status: 'low', count: low, label: 'Bajo' },
    { status: 'out', count: out, label: 'Agotado' },
  ];
  return result.filter((entry) => entry.count > 0);
}