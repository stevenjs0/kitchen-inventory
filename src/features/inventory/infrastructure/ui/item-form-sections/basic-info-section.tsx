'use client';

import { Category } from '@/features/categories/domain/entities';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Package, Tag } from 'lucide-react';
import { FieldError, FieldErrorText, RequiredMarker } from './form-parts';

interface BasicInfoSectionProps {
  name: string;
  categoryId: string;
  categoryName: string | null;
  categories: Category[];
  roomSelected: boolean;
  errors: FieldError;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
}

export function BasicInfoSection({
  name,
  categoryId,
  categoryName,
  categories,
  roomSelected,
  errors,
  onNameChange,
  onCategoryChange,
}: BasicInfoSectionProps) {
  const roomPlaceholder = roomSelected
    ? 'Seleccionar categoría'
    : 'Primero selecciona ambiente';

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label
          htmlFor="name"
          className="text-sm font-semibold flex items-center gap-1.5 text-foreground"
        >
          <Package className="h-4 w-4 text-muted-foreground" />
          Nombre del Item
          <RequiredMarker />
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ej: Aceite de Oliva Extra Virgén"
          className={`h-12 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-border'} bg-background`}
        />
        <FieldErrorText errors={errors} field="name" />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="category"
          className="text-sm font-semibold flex items-center gap-1.5 text-foreground"
        >
          <Tag className="h-4 w-4 text-muted-foreground" />
          Categoría
          <RequiredMarker />
        </Label>
        <Select
          value={categoryId}
          onValueChange={(value) => onCategoryChange(value)}
          disabled={!roomSelected}
        >
          <SelectTrigger
            className={`h-12 ${errors.category_id ? 'border-destructive focus-visible:ring-destructive' : 'border-border'} bg-background`}
          >
            <SelectValue placeholder={roomPlaceholder}>
              {categoryName || (
                <span className="text-muted-foreground">{roomPlaceholder}</span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldErrorText errors={errors} field="category_id" />
      </div>
    </div>
  );
}
