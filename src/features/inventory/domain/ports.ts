import {
  InventoryItem,
  CreateInventoryItemDTO,
  UpdateInventoryItemDTO,
  InventoryFilters,
} from "./entities";

export interface MutationContext {
  createdBy?: string;
  updatedBy?: string;
}

export interface InventoryRepository {
  findById(id: string): Promise<InventoryItem | null>;
  findAll(filters?: InventoryFilters): Promise<InventoryItem[]>;
  create(data: CreateInventoryItemDTO, ctx?: MutationContext): Promise<InventoryItem>;
  update(id: string, data: UpdateInventoryItemDTO, ctx?: MutationContext): Promise<InventoryItem>;
  delete(id: string): Promise<void>;
  updateStock(id: string, quantity: number, ctx?: MutationContext): Promise<InventoryItem>;
  findMissing(): Promise<InventoryItem[]>;
  search(query: string): Promise<InventoryItem[]>;
  findByCategory(categoryId: string): Promise<InventoryItem[]>;
  findByLocation(locationId: string): Promise<InventoryItem[]>;
}
