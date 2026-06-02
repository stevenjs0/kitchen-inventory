import { InventoryItem } from '@/features/inventory/domain/entities';
import { ExportRepository } from '@/features/inventory/domain/ports';
import { Room } from '@/features/rooms/domain/entities';

const CSV_HEADERS = [
  'nombre',
  'categoria',
  'ambiente',
  'ubicacion_seccion',
  'ubicacion_nivel',
  'ubicacion_lado',
  'ubicacion_posicion',
  'stock_actual',
  'stock_minimo',
  'unidad',
  'notas',
] as const;

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export class CsvExportRepository implements ExportRepository {
  private rooms: Room[];

  constructor(rooms: Room[] = []) {
    this.rooms = rooms;
  }

  private getRoomName(roomId?: string): string {
    if (!roomId) return '';
    return this.rooms.find((r) => r.id === roomId)?.name || '';
  }

  exportItems(items: InventoryItem[]): string {
    const headerRow = CSV_HEADERS.join(',');
    const dataRows = items.map((item) => {
      const roomId = item.category?.room_id || item.location?.room_id;
      return [
        escapeCsvField(item.name),
        escapeCsvField(item.category?.name || ''),
        escapeCsvField(this.getRoomName(roomId)),
        escapeCsvField(item.location?.section || ''),
        escapeCsvField(item.location?.level || ''),
        escapeCsvField(item.location?.side || ''),
        escapeCsvField(item.location?.position || ''),
        String(item.stock_quantity),
        String(item.min_stock),
        escapeCsvField(item.unit || ''),
        escapeCsvField(item.notes || ''),
      ].join(',');
    });

    return [headerRow, ...dataRows].join('\n');
  }

  getContentType(): string {
    return 'text/csv; charset=utf-8';
  }

  getFileExtension(): string {
    return 'csv';
  }
}
