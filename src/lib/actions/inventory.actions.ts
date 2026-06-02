'use server';

import { revalidatePath } from 'next/cache';
import { getInventoryService } from '@/lib/composition';
import { getCategoriesService } from '@/lib/composition';
import { getLocationsService } from '@/lib/composition';
import { getRoomsService } from '@/lib/composition';
import {
  CreateInventoryItemDTO,
  UpdateInventoryItemDTO,
} from '@/features/inventory/domain/entities';
import { CsvImportRepository } from '@/features/inventory/infrastructure/import/csv-import.repository';
import { ImportResult } from '@/features/inventory/domain/ports';

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

export async function importInventoryCsv(csv: string): Promise<ImportResult> {
  const [inventoryService, categoriesService, locationsService, roomsService] =
    await Promise.all([
      getInventoryService(),
      getCategoriesService(),
      getLocationsService(),
      getRoomsService(),
    ]);

  const importer = new CsvImportRepository(
    roomsService,
    categoriesService,
    locationsService,
    inventoryService,
  );

  const result = await importer.importItems(csv);

  if (result.created > 0 || result.updated > 0) {
    revalidatePath('/inventory');
    revalidatePath('/');
  }

  return result;
}
