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

export interface ExportRepository {
  exportItems(items: InventoryItem[]): string;
  getContentType(): string;
  getFileExtension(): string;
}

export interface ImportRepository {
  importItems(rawCsv: string): Promise<ImportResult>;
}

export interface ImportResult {
  success: boolean;
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
}
