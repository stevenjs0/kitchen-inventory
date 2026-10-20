'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormActionsProps {
  loading: boolean;
  isEdit: boolean;
  onCancel?: () => void;
}

export function FormActions({ loading, isEdit, onCancel }: FormActionsProps) {
  return (
    <div className="flex gap-3 pt-2">
      {onCancel && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 h-12"
        >
          Cancelar
        </Button>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="flex-1 h-12 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : isEdit ? (
          'Actualizar Item'
        ) : (
          'Crear Item'
        )}
      </Button>
    </div>
  );
}
