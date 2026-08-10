import { describe, expect, it } from 'vitest';
import { InventoryItem } from '@/features/inventory/domain/entities';
import { Room } from '@/features/rooms/domain/entities';
import {
  aggregateStockByCategory,
  aggregateStockByLocation,
  aggregateStockByRoom,
  aggregateStockStatus,
} from '@/features/dashboard/domain/stats';

function makeItem(
  overrides: Partial<InventoryItem> & { id: string },
): InventoryItem {
  return {
    name: 'Item',
    category_id: 'cat',
    location_id: 'loc',
    stock_quantity: 1,
    min_stock: 1,
    unit: 'unidad',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    ...overrides,
  };
}

describe('aggregateStockByCategory', () => {
  it('sums stock and counts items per category, sorted by total desc', () => {
    const items = [
      makeItem({
        id: 'a',
        stock_quantity: 2,
        category: { id: 'cat2', name: 'B', color: '#000000' },
      }),
      makeItem({
        id: 'b',
        stock_quantity: 5,
        category: { id: 'cat1', name: 'A', color: '#ffffff' },
      }),
      makeItem({ id: 'c', stock_quantity: 3, category: undefined }),
    ];

    const result = aggregateStockByCategory(items);

    expect(result).toEqual([
      {
        categoryId: 'cat1',
        name: 'A',
        color: '#ffffff',
        total: 5,
        itemCount: 1,
      },
      {
        categoryId: 'cat2',
        name: 'B',
        color: '#000000',
        total: 2,
        itemCount: 1,
      },
    ]);
  });
});

describe('aggregateStockByRoom', () => {
  it('groups by room and falls back to category room', () => {
    const rooms: Room[] = [
      {
        id: 'room1',
        name: 'Cocina',
        icon: 'ChefHat',
        color: '#F97316',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const items = [
      makeItem({
        id: 'a',
        stock_quantity: 4,
        location: {
          id: 'loc1',
          name: 'Alacena',
          section: 'Alacena',
          level: '1',
          full_path: 'Alacena 1',
          room_id: 'room1',
        },
      }),
      makeItem({
        id: 'b',
        stock_quantity: 1,
        category: { id: 'cat1', name: 'Granos', room_id: 'room1' },
      }),
      makeItem({ id: 'c', stock_quantity: 9, location: undefined }),
    ];

    const result = aggregateStockByRoom(items, rooms);

    expect(result).toEqual([
      { roomId: 'room1', name: 'Cocina', color: '#F97316', total: 5, itemCount: 2 },
    ]);
  });
});

describe('aggregateStockByLocation', () => {
  it('groups by location and derives color from its room', () => {
    const rooms: Room[] = [
      {
        id: 'room1',
        name: 'Cocina',
        icon: 'ChefHat',
        color: '#F97316',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const items = [
      makeItem({
        id: 'a',
        stock_quantity: 4,
        location: {
          id: 'loc1',
          name: 'Alacena',
          section: 'Alacena',
          level: '1',
          full_path: 'Alacena 1',
          room_id: 'room1',
        },
      }),
      makeItem({
        id: 'b',
        stock_quantity: 1,
        location: {
          id: 'loc1',
          name: 'Alacena',
          section: 'Alacena',
          level: '1',
          full_path: 'Alacena 1',
          room_id: 'room1',
        },
      }),
      makeItem({ id: 'c', stock_quantity: 9, location: undefined }),
    ];

    const result = aggregateStockByLocation(items, rooms);

    expect(result).toEqual([
      {
        locationId: 'loc1',
        name: 'Alacena',
        color: '#F97316',
        total: 5,
        itemCount: 2,
      },
    ]);
  });

  it('falls back to a default color when the room is unknown', () => {
    const items = [
      makeItem({
        id: 'a',
        stock_quantity: 2,
        location: {
          id: 'loc2',
          name: 'Nevera',
          section: 'Nevera',
          level: '1',
          full_path: 'Nevera 1',
          room_id: 'missing',
        },
      }),
    ];

    const result = aggregateStockByLocation(items, []);

    expect(result).toEqual([
      {
        locationId: 'loc2',
        name: 'Nevera',
        color: '#6B7280',
        total: 2,
        itemCount: 1,
      },
    ]);
  });
});

describe('aggregateStockStatus', () => {
  it('classifies normal, low and out and filters zero counts', () => {
    const items = [
      makeItem({ id: 'a', stock_quantity: 5, min_stock: 1 }),
      makeItem({ id: 'b', stock_quantity: 0, min_stock: 2 }),
      makeItem({ id: 'c', stock_quantity: 1, min_stock: 3 }),
    ];

    const result = aggregateStockStatus(items);

    expect(result).toEqual([
      { status: 'normal', count: 1, label: 'Normal' },
      { status: 'low', count: 1, label: 'Bajo' },
      { status: 'out', count: 1, label: 'Agotado' },
    ]);
  });
});