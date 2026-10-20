import Papa from 'papaparse';
import { ImportResult } from '@/features/inventory/domain/ports';
import { CreateInventoryItemDTO } from '@/features/inventory/domain/entities';
import { InventoryService } from '@/features/inventory/application/services/inventory.service';
import { RoomsService } from '@/features/rooms/application/services/rooms.service';
import { CategoriesService } from '@/features/categories/application/services/categories.service';
import { LocationsService } from '@/features/locations/application/services/locations.service';

const MAX_ROWS = 500;
const INSERT_BATCH_SIZE = 100;

interface CsvRow {
  nombre: string;
  categoria: string;
  ambiente: string;
  ubicacion_seccion: string;
  ubicacion_nivel: string;
  ubicacion_lado?: string;
  ubicacion_posicion?: string;
  stock_actual: string;
  stock_minimo: string;
  unidad: string;
  notas?: string;
}

interface PendingUpdate {
  id: string;
  name: string;
  data: UpdateInventoryItemData;
}

interface UpdateInventoryItemData {
  category_id: string;
  stock_quantity: number;
  min_stock: number;
  unit: string;
  notes?: string;
}

function safeParseInt(value: string | undefined, fallback: number): number {
  const parsed = parseInt(value ?? '', 10);
  return Number.isNaN(parsed) || parsed < 0 ? fallback : parsed;
}

export class CsvImportService {
  constructor(
    private roomsService: RoomsService,
    private categoriesService: CategoriesService,
    private locationsService: LocationsService,
    private inventoryService: InventoryService,
  ) {}

  async importItems(rawCsv: string): Promise<ImportResult> {
    const result: ImportResult = {
      success: true,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: [],
    };

    rawCsv = rawCsv.replace(/^\uFEFF/, '');

    const parsed = Papa.parse<CsvRow>(rawCsv, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length > 0) {
      result.errors.push(
        ...parsed.errors.map(
          (e) => `CSV parse error at row ${e.row ?? 'unknown'}: ${e.message}`,
        ),
      );
    }

    const rows = parsed.data;
    if (rows.length > MAX_ROWS) {
      result.errors.push('CSV exceeds 500 row limit');
      result.success = false;
      return result;
    }
    if (rows.length === 0) {
      result.errors.push('No data rows found in CSV');
      result.success = false;
      return result;
    }

    const allRooms = await this.roomsService.getAllRooms();
    const allCategories = await this.categoriesService.getAllCategories();
    const allLocations = await this.locationsService.getAllLocations();
    const allItems = await this.inventoryService.getAllItems();

    const newItems: CreateInventoryItemDTO[] = [];
    const pendingUpdates: PendingUpdate[] = [];

    for (const row of rows) {
      try {
        const name = row.nombre?.trim();
        if (!name) {
          result.skipped++;
          result.errors.push(`Row skipped: missing item name`);
          continue;
        }

        const roomName = row.ambiente?.trim();
        const categoryName = row.categoria?.trim();
        const section = row.ubicacion_seccion?.trim();
        const level = row.ubicacion_nivel?.trim();
        const side = row.ubicacion_lado?.trim() || undefined;
        const position = row.ubicacion_posicion?.trim() || undefined;

        let roomId: string | undefined;
        if (roomName) {
          const existingRoom = allRooms.find(
            (r) => r.name.toLowerCase() === roomName.toLowerCase(),
          );
          if (existingRoom) {
            roomId = existingRoom.id;
          } else {
            const createResult = await this.roomsService.createRoom({
              name: roomName,
              icon: 'Home',
              color: '#6B7280',
            });
            if (createResult.success && createResult.data) {
              roomId = createResult.data.id;
              allRooms.push(createResult.data);
            } else {
              result.errors.push(`"${name}": could not create room "${roomName}"`);
              result.skipped++;
              continue;
            }
          }
        }

        let categoryId: string | undefined;
        if (categoryName) {
          const existingCategory = allCategories.find(
            (c) =>
              c.name.toLowerCase() === categoryName.toLowerCase() &&
              (!roomId || c.room_id === roomId),
          );
          if (existingCategory) {
            categoryId = existingCategory.id;
          } else {
            const createResult = await this.categoriesService.createCategory({
              name: categoryName,
              room_id: roomId || allRooms[0]?.id || '',
            });
            if (createResult.success && createResult.data) {
              categoryId = createResult.data.id;
              allCategories.push(createResult.data);
            } else {
              result.errors.push(`"${name}": could not create category "${categoryName}"`);
              result.skipped++;
              continue;
            }
          }
        }

        let locationId: string | undefined;
        if (section && level) {
          const existingLocation = allLocations.find(
            (l) =>
              l.section === section &&
              l.level === level &&
              (side ? l.side === side : !l.side) &&
              (position ? l.position === position : !l.position) &&
              (!roomId || l.room_id === roomId),
          );
          if (existingLocation) {
            locationId = existingLocation.id;
          } else {
            const createResult = await this.locationsService.createLocation({
              name: [section, level, side, position].filter(Boolean).join(' - '),
              section,
              level,
              side,
              position,
              room_id: roomId || allRooms[0]?.id || '',
            });
            if (createResult.success && createResult.data) {
              locationId = createResult.data.id;
              allLocations.push(createResult.data);
            } else {
              result.errors.push(`"${name}": could not create location "${section} - ${level}"`);
              result.skipped++;
              continue;
            }
          }
        }

        if (!categoryId || !locationId) {
          result.errors.push(`"${name}": missing category or location`);
          result.skipped++;
          continue;
        }

        const existingItem = allItems.find(
          (item) =>
            item.name.toLowerCase() === name.toLowerCase() &&
            item.location_id === locationId,
        );

        const stockQuantity = safeParseInt(row.stock_actual, 1);
        const minStock = safeParseInt(row.stock_minimo, 1);
        const unit = row.unidad?.trim() || 'unidad';
        const notes = row.notas?.trim() || undefined;

        if (existingItem) {
          pendingUpdates.push({
            id: existingItem.id,
            name,
            data: {
              category_id: categoryId,
              stock_quantity: stockQuantity,
              min_stock: minStock,
              unit,
              notes,
            },
          });
        } else {
          newItems.push({
            name,
            category_id: categoryId,
            location_id: locationId,
            stock_quantity: stockQuantity,
            min_stock: minStock,
            unit,
            notes,
          });
        }
      } catch (err) {
        result.errors.push(`Unexpected error processing row: ${err}`);
        result.skipped++;
      }
    }

    for (let i = 0; i < newItems.length; i += INSERT_BATCH_SIZE) {
      const batch = newItems.slice(i, i + INSERT_BATCH_SIZE);
      const createResult = await this.inventoryService.createManyItems(batch);
      if (createResult.success) {
        result.created += batch.length;
      } else {
        for (const item of batch) {
          result.errors.push(`"${item.name}": create failed`);
          result.skipped++;
        }
      }
    }

    for (const { id, name, data } of pendingUpdates) {
      const updateResult = await this.inventoryService.updateItem(id, data);
      if (updateResult.success) {
        result.updated++;
      } else {
        result.errors.push(`"${name}": update failed`);
        result.skipped++;
      }
    }

    if (result.created + result.updated === 0) {
      result.success = false;
    }

    return result;
  }
}