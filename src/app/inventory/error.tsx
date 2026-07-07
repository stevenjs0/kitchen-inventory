'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronLeft, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function InventoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Inventory error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
        <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            No pudimos cargar el inventario
          </h1>
          <p className="text-muted-foreground max-w-md">
            Hubo un problema al obtener los items. Verifica tu conexión e intenta de nuevo.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Reintentar
          </Button>
          <Button onClick={() => router.back()} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Volver
          </Button>
        </div>
      </div>
    </div>
  );
}
