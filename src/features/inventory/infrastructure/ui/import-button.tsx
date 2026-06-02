'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileUp, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { importInventoryCsv } from '@/lib/actions/inventory.actions';
import { ImportResult } from '@/features/inventory/domain/ports';

export function ImportButton() {
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setResult(null);

    try {
      const text = await file.text();
      const importResult = await importInventoryCsv(text);
      setResult(importResult);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setResult({
        success: false,
        created: 0,
        updated: 0,
        skipped: 0,
        errors: [err instanceof Error ? err.message : 'Error desconocido'],
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const dismissResult = () => setResult(null);

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileSelect}
        className="hidden"
      />
      <Button
        variant="outline"
        size="sm"
        className="rounded-full shadow-sm"
        onClick={handleClick}
        disabled={isImporting}
      >
        {isImporting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileUp className="mr-2 h-4 w-4" />
        )}
        {isImporting ? 'Importando...' : 'Importar'}
      </Button>

      {result && (
        <div className="absolute right-0 top-12 z-50 w-72 bg-card border rounded-xl shadow-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
              <span className="font-semibold text-sm">
                {result.success ? 'Importación exitosa' : 'Importación con errores'}
              </span>
            </div>
            <button
              onClick={dismissResult}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-green-500/10 rounded-lg p-2">
              <p className="text-lg font-bold text-green-600">{result.created}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Creados</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-2">
              <p className="text-lg font-bold text-blue-600">{result.updated}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Actualizados</p>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-2">
              <p className="text-lg font-bold text-amber-600">{result.skipped}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Omitidos</p>
            </div>
          </div>

          {result.errors.length > 0 && (
            <div className="max-h-24 overflow-auto text-xs text-muted-foreground space-y-0.5">
              {result.errors.slice(0, 5).map((err, i) => (
                <p key={i} className="truncate">• {err}</p>
              ))}
              {result.errors.length > 5 && (
                <p className="text-muted-foreground italic">
                  ...y {result.errors.length - 5} más
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
