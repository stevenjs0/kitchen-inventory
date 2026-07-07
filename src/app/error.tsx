'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex flex-col items-center justify-center text-center py-20 gap-6">
        <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Algo salió mal
          </h1>
          <p className="text-muted-foreground max-w-md">
            No pudimos cargar esta página. Por favor intenta de nuevo.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Button onClick={reset} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Reintentar
          </Button>
          <Link href="/inventory">
            <Button className="gap-2">
              <Home className="h-4 w-4" /> Volver al Inventario
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
