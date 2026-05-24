import { InventoryRepository } from "@/features/inventory/domain/ports";
import {
  InventoryItem,
  CreateInventoryItemDTO,
  UpdateInventoryItemDTO,
} from "@/features/inventory/domain/entities";
import { SupabaseInventoryRepository } from "@/features/inventory/infrastructure/repositories/supabase-inventory.repository";
import { createClient } from "@/lib/supabase/server";

export class InventoryService {
  constructor(
    private repository: InventoryRepository,
    private currentUserName?: string,
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
      });
      return { success: true, data: item };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error al crear item",
      };
    }
  }

  async updateItem(
    id: string,
    data: UpdateInventoryItemDTO
  ): Promise<{ success: boolean; data?: InventoryItem; error?: string }> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      return { success: false, error: "Item no encontrado" };
    }

    try {
      const item = await this.repository.update(id, data, {
        updatedBy: this.currentUserName,
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
    const item = await this.repository.findById(id);

    if (!item) {
      return { success: false, error: "Item no encontrado" };
    }

    const newStock = item.stock_quantity + delta;

    if (newStock < 0) {
      return { success: false, error: "El stock no puede ser negativo" };
    }

    try {
      const updatedItem = await this.repository.updateStock(id, newStock, {
        updatedBy: this.currentUserName,
      });
      return { success: true, data: updatedItem };
    } catch (error) {
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

export async function getInventoryService(): Promise<InventoryService> {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  const userName = user?.user_metadata?.full_name || user?.email || undefined;
  const repository = new SupabaseInventoryRepository(client);
  return new InventoryService(repository, userName);
}
