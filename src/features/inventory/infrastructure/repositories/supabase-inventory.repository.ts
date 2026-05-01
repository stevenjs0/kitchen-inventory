import { SupabaseClient } from '@supabase/supabase-js';
import {
  InventoryItem,
  CreateInventoryItemDTO,
  UpdateInventoryItemDTO,
  InventoryFilters,
} from '@/features/inventory/domain/entities';
import { InventoryRepository } from '@/features/inventory/domain/ports';
interface CategoryDB {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
}

interface LocationDB {
  id: string;
  name: string;
  section: string;
  side?: string | null;
  position?: string | null;
  level: string;
  full_path?: string | null;
}

interface InventoryItemDB {
  id: string;
  name: string;
  category_id: string;
  location_id: string;
  stock_quantity: number;
  min_stock: number;
  unit: string;
  notes?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_stock_update?: string | null;
  categories?: CategoryDB | null;
  locations?: LocationDB | null;
}

interface SearchInventoryResult {
  id: string;
}

export class SupabaseInventoryRepository implements InventoryRepository {
  constructor(private db: SupabaseClient) {}

  private formatLocationPath(location: LocationDB): string {
    const computedPath = [
      location.section,
      location.side,
      location.position,
      location.level,
    ]
      .filter((segment): segment is string => Boolean(segment))
      .join(' / ');

    return location.full_path ?? (computedPath || location.name);
  }

  private toEntity(data: InventoryItemDB): InventoryItem {
    return {
      id: data.id,
      name: data.name,
      category_id: data.category_id,
      location_id: data.location_id,
      stock_quantity: data.stock_quantity,
      min_stock: data.min_stock,
      unit: data.unit,
      notes: data.notes ?? undefined,
      is_active: data.is_active,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      last_stock_update: data.last_stock_update
        ? new Date(data.last_stock_update)
        : undefined,
      category: data.categories
        ? {
            id: data.categories.id,
            name: data.categories.name,
            description: data.categories.description ?? undefined,
            color: data.categories.color ?? undefined,
          }
        : undefined,
      location: data.locations
        ? {
            id: data.locations.id,
            name: data.locations.name,
            section: data.locations.section,
            side: data.locations.side ?? undefined,
            position: data.locations.position ?? undefined,
            level: data.locations.level,
            full_path: this.formatLocationPath(data.locations),
          }
        : undefined,
    };
  }

  async findById(id: string): Promise<InventoryItem | null> {
    const { data, error } = await this.db
      .from('inventory_items')
      .select('*, categories(*), locations(*)')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !data) return null;
    return this.toEntity(data as InventoryItemDB);
  }

  async findAll(filters?: InventoryFilters): Promise<InventoryItem[]> {
    let query = this.db
      .from('inventory_items')
      .select('*, categories(*), locations(*)')
      .eq('is_active', true);

    if (filters?.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    if (filters?.location_id) {
      query = query.eq('location_id', filters.location_id);
    }

    if (filters?.stock_status === 'empty') {
      query = query.eq('stock_quantity', 0);
    }

    if (filters?.search) {
      const { data: searchResults } = await this.db.rpc('search_inventory', {
        search_query: filters.search,
      });
      const ids =
        (searchResults as SearchInventoryResult[] | null)?.map((r) => r.id) ??
        [];
      if (ids.length === 0) return [];
      query = query.in('id', ids);
    }

    const { data } = await query.order('created_at', { ascending: false });
    const items = data
      ? (data as InventoryItemDB[]).map((item) => this.toEntity(item))
      : [];

    if (filters?.stock_status === 'low') {
      return items.filter(
        (item) =>
          item.stock_quantity > 0 && item.stock_quantity < item.min_stock,
      );
    }

    return items;
  }

  async create(data: CreateInventoryItemDTO): Promise<InventoryItem> {
    const { data: result, error } = await this.db
      .from('inventory_items')
      .insert({
        ...data,
        unit: data.unit || 'unidad',
      })
      .select('*, categories(*), locations(*)')
      .single();

    if (error) throw error;
    return this.toEntity(result as InventoryItemDB);
  }

  async update(
    id: string,
    data: UpdateInventoryItemDTO,
  ): Promise<InventoryItem> {
    const { data: result, error } = await this.db
      .from('inventory_items')
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*, categories(*), locations(*)')
      .single();

    if (error) throw error;
    return this.toEntity(result as InventoryItemDB);
  }

  async delete(id: string): Promise<void> {
    await this.db
      .from('inventory_items')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);
  }

  async updateStock(id: string, quantity: number): Promise<InventoryItem> {
    const { data: result, error } = await this.db
      .from('inventory_items')
      .update({
        stock_quantity: quantity,
        last_stock_update: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*, categories(*), locations(*)')
      .single();

    if (error) throw error;
    return this.toEntity(result as InventoryItemDB);
  }

  async findMissing(): Promise<InventoryItem[]> {
    const { data } = await this.db
      .from('inventory_items')
      .select('*, categories(*), locations(*)')
      .eq('stock_quantity', 0)
      .eq('is_active', true)
      .order('locations.section', { ascending: true });

    return data
      ? (data as InventoryItemDB[]).map((item) => this.toEntity(item))
      : [];
  }

  async search(query: string): Promise<InventoryItem[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const { data } = await this.db.rpc('search_inventory', {
      search_query: query,
    });

    if (!data) return [];

    const ids = (data as SearchInventoryResult[]).map((r) => r.id);
    if (ids.length === 0) return [];

    const { data: items } = await this.db
      .from('inventory_items')
      .select('*, categories(*), locations(*)')
      .in('id', ids)
      .eq('is_active', true);

    return items
      ? (items as InventoryItemDB[]).map((item) => this.toEntity(item))
      : [];
  }

  async findByCategory(categoryId: string): Promise<InventoryItem[]> {
    const { data } = await this.db
      .from('inventory_items')
      .select('*, categories(*), locations(*)')
      .eq('category_id', categoryId)
      .eq('is_active', true);

    return data
      ? (data as InventoryItemDB[]).map((item) => this.toEntity(item))
      : [];
  }

  async findByLocation(locationId: string): Promise<InventoryItem[]> {
    const { data } = await this.db
      .from('inventory_items')
      .select('*, categories(*), locations(*)')
      .eq('location_id', locationId)
      .eq('is_active', true);

    return data
      ? (data as InventoryItemDB[]).map((item) => this.toEntity(item))
      : [];
  }
}
