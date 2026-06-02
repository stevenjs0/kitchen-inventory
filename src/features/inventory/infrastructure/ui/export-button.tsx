'use client';

import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { InventoryItem } from '@/features/inventory/domain/entities';
import { Room } from '@/features/rooms/domain/entities';
import { CsvExportRepository } from '@/features/inventory/infrastructure/export/csv-export.repository';
import { useState } from 'react';

interface ExportButtonProps {
  items: InventoryItem[];
  rooms: Room[];
  fileName?: string;
}

export function ExportButton({
  items,
  rooms,
  fileName = 'inventario',
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    try {
      const exporter = new CsvExportRepository(rooms);
      const csv = exporter.exportItems(items);

      const BOM = '\uFEFF';
      const blob = new Blob([BOM + csv], {
        type: exporter.getContentType(),
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-${new Date().toISOString().split('T')[0]}.${exporter.getFileExtension()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full shadow-sm"
      onClick={handleExport}
      disabled={isExporting || items.length === 0}
    >
      {isExporting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <FileDown className="mr-2 h-4 w-4" />
      )}
      {isExporting ? 'Exportando...' : 'Exportar'}
    </Button>
  );
}
