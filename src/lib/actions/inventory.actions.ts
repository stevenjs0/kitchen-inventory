'use server';

import { revalidatePath } from 'next/cache';
import { getInventoryService } from '@/features/inventory/application/services/inventory.service';
import {
  CreateInventoryItemDTO,
  UpdateInventoryItemDTO,
  InventoryItem,
} from '@/features/inventory/domain/entities';

export async function createInventoryItem(data: CreateInventoryItemDTO) {
  const service = await getInventoryService();

  const result = await service.createItem(data);

  if (result.success) {
    revalidatePath('/inventory');
    revalidatePath('/');
  }

  return result;
}

export async function updateInventoryItem(
  id: string,
  data: UpdateInventoryItemDTO,
) {
  const service = await getInventoryService();
  const result = await service.updateItem(id, data);

  if (result.success) {
    revalidatePath('/inventory');
    revalidatePath(`/inventory/${id}`);
  }

  return result;
}

export async function deleteInventoryItem(id: string) {
  const service = await getInventoryService();
  const result = await service.deleteItem(id);

  if (result.success) {
    revalidatePath('/inventory');
    revalidatePath('/');
  }

  return result;
}

export async function updateStock(id: string, delta: number) {
  const service = await getInventoryService();
  const result = await service.updateStock(id, delta);

  if (result.success) {
    revalidatePath('/inventory');
    revalidatePath('/');
  }

  return result;
}

export async function searchInventoryItems(query: string) {
  const service = await getInventoryService();
  return await service.searchItems(query);
}

export async function getAllInventoryItems() {
  const service = await getInventoryService();
  return await service.getAllItems();
}

export async function getInventoryItemById(id: string) {
  const service = await getInventoryService();
  return await service.getItemById(id);
}

export async function getMissingInventoryItems() {
  const service = await getInventoryService();
  return await service.getMissingItems();
}

export async function generateInventoryExport(
  items: InventoryItem[],
  fileName: string = 'inventario',
) {
  const date = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Group by location/section
  const grouped: Record<string, InventoryItem[]> = {};
  items.forEach((item) => {
    const section = item.location?.section || 'Sin ubicación';
    if (!grouped[section]) {
      grouped[section] = [];
    }
    grouped[section].push(item);
  });

  let markdown = `# ${fileName} - ${date}\n\n`;

  Object.entries(grouped).forEach(([section, sectionItems]) => {
    markdown += `## ${section}\n`;
    sectionItems.forEach((item) => {
      const stock = `${item.stock_quantity}/${item.min_stock}`;
      markdown += `- [ ] ${item.name} (${item.category?.name || 'Sin categoría'}) - Stock: ${stock}\n`;
    });
    markdown += `\n`;
  });

  return markdown;
}
