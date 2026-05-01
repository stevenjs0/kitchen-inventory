'use client';

import { Button } from '@/components/ui/button';
import { FileDown, Loader2 } from 'lucide-react';
import { InventoryItem } from '@/features/inventory/domain/entities';
import { useState } from 'react';
import { generateInventoryExport } from '@/lib/actions/inventory.actions';

interface ExportButtonProps {
  items: InventoryItem[];
  fileName?: string;
}

export function ExportButton({
  items,
  fileName = 'inventario',
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const markdown = await generateInventoryExport(items, fileName);

      // Create blob and download
      const blob = new Blob([markdown], {
        type: 'text/markdown; charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}-${new Date().toISOString().split('T')[0]}.md`;
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
