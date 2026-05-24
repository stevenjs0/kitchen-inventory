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
}

export interface Location {
  id: string;
  name: string;
  section: string;
  side?: string;
  position?: string;
  level: string;
  full_path: string;
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

export interface InventoryFilters {
  category_id?: string;
  location_id?: string;
  stock_status?: "normal" | "low" | "empty";
  search?: string;
}
