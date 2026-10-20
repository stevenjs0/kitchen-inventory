import { InventoryRepository } from "@/features/inventory/domain/ports";
import {
  InventoryItem,
  CreateInventoryItemDTO,
  UpdateInventoryItemDTO,
} from "@/features/inventory/domain/entities";
import {
  InsufficientStockError,
  ItemNotFoundError,
} from "@/features/inventory/domain/errors";

export class InventoryService {
  constructor(
    private repository: InventoryRepository,
    private currentUserName?: string,
    private currentUserId?: string,
  ) {}

  async createItem(
    data: CreateInventoryItemDTO
  ): Promise<{ success: boolean; data?: InventoryItem; error?: string }> {
    if (!data.name || data.name.trim().length === 0) {
      return { success: false, error: "El nombre es requerido" };
    }

    if (data.stock_quantity < 0) {
      return { success: false, error: "El stock no puede ser negativo" };
    }

    try {
      const item = await this.repository.create(data, {
        createdBy: this.currentUserName,
        updatedBy: this.currentUserName,
        userId: this.currentUserId,
      });
      return { success: true, data: item };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al crear item",
      };
    }
  }

  async createManyItems(
    items: CreateInventoryItemDTO[]
  ): Promise<{ success: boolean; data?: InventoryItem[]; error?: string }> {
    if (items.length === 0) {
      return { success: true, data: [] };
    }

    const invalid = items.find(
      (item) =>
        !item.name ||
        item.name.trim().length === 0 ||
        item.stock_quantity < 0 ||
        item.min_stock < 0
    );
    if (invalid) {
      return {
        success: false,
        error: `Datos inválidos para "${invalid.name || 'sin nombre'}"`,
      };
    }

    try {
      const created = await this.repository.createMany(items, {
        createdBy: this.currentUserName,
        updatedBy: this.currentUserName,
        userId: this.currentUserId,
      });
      return { success: true, data: created };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al crear items",
      };
    }
  }

  async updateItem(
    id: string,
    data: UpdateInventoryItemDTO
  ): Promise<{ success: boolean; data?: InventoryItem; error?: string }> {
    try {
      const existing = await this.repository.findById(id);

      if (!existing) {
        return { success: false, error: "Item no encontrado" };
      }

      const item = await this.repository.update(id, data, {
        updatedBy: this.currentUserName,
        userId: this.currentUserId,
      });
      return { success: true, data: item };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al actualizar item",
      };
    }
  }

  async deleteItem(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.repository.delete(id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al eliminar item",
      };
    }
  }

  async updateStock(
    id: string,
    delta: number
  ): Promise<{ success: boolean; data?: InventoryItem; error?: string }> {
    try {
      const updatedItem = await this.repository.updateStock(id, delta, {
        updatedBy: this.currentUserName,
        userId: this.currentUserId,
      });
      return { success: true, data: updatedItem };
    } catch (error) {
      if (error instanceof InsufficientStockError) {
        return { success: false, error: error.message, data: error.current };
      }
      if (error instanceof ItemNotFoundError) {
        return { success: false, error: error.message };
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al actualizar stock",
      };
    }
  }

  async searchItems(query: string): Promise<InventoryItem[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    return await this.repository.search(query);
  }

  async getMissingItems(): Promise<InventoryItem[]> {
    return await this.repository.findMissing();
  }

  async getItemsByCategory(categoryId: string): Promise<InventoryItem[]> {
    return await this.repository.findByCategory(categoryId);
  }

  async getItemsByLocation(locationId: string): Promise<InventoryItem[]> {
    return await this.repository.findByLocation(locationId);
  }

  async getAllItems(): Promise<InventoryItem[]> {
    return await this.repository.findAll();
  }

  async getItemById(id: string): Promise<InventoryItem | null> {
    return await this.repository.findById(id);
  }
}


