'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

interface NotesSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function NotesSection({ value, onChange }: NotesSectionProps) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="notes"
        className="text-sm font-medium flex items-center gap-1.5 text-foreground"
      >
        <FileText className="h-4 w-4 text-muted-foreground" />
        Notas Adicionales
        <span className="text-xs text-muted-foreground font-normal">(opcional)</span>
      </Label>
      <Textarea
        id="notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ej: Fecha de caducidad, marca preferida, proveedor..."
        rows={3}
        className="bg-background border-border resize-none"
      />
    </div>
  );
}
