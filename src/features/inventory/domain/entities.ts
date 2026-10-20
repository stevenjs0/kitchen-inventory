export interface InventoryItem {
  id: string;
  name: string;
  category_id: string;
  location_id: string;
  stock_quantity: number;
  min_stock: number;
  unit: string;
  notes?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  last_stock_update?: Date;
  created_by?: string;
  updated_by?: string;
  category?: Category;
  location?: Location;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  room_id?: string;
}

export interface Location {
  id: string;
  name: string;
  section: string;
  side?: string;
  position?: string;
  level: string;
  full_path: string;
  room_id?: string;
}

export interface CreateInventoryItemDTO {
  name: string;
  category_id: string;
  location_id: string;
  stock_quantity: number;
  min_stock: number;
  unit?: string;
  notes?: string;
}

export interface UpdateInventoryItemDTO {
  name?: string;
  category_id?: string;
  location_id?: string;
  stock_quantity?: number;
  min_stock?: number;
  unit?: string;
  notes?: string;
}

/**
 * Estados canónicos de stock para filtros, badges y dashboard.
 * Elegimos `'out'` (no `'empty'`) por ser el valor ya usado por los filtros de
 * URL, el dashboard y los badges; `'empty'` queda eliminado de la app.
 */
export type StockStatus = 'normal' | 'low' | 'out';

export interface InventoryFilters {
  category_id?: string;
  location_id?: string;
  room_id?: string;
  stock_status?: StockStatus;
  search?: string;
}
