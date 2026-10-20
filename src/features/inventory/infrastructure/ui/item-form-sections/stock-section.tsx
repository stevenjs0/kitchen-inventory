'use client';

import { UNIT_OPTIONS } from '@/features/inventory/domain/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertTriangle, Hash } from 'lucide-react';
import { FieldError, FieldErrorText, RequiredMarker } from './form-parts';

interface StockSectionProps {
  stockQuantity: string;
  minStock: string;
  unit: string;
  errors: FieldError;
  onStockQuantityChange: (value: string) => void;
  onMinStockChange: (value: string) => void;
  onUnitChange: (value: string | null) => void;
}

export function StockSection({
  stockQuantity,
  minStock,
  unit,
  errors,
  onStockQuantityChange,
  onMinStockChange,
  onUnitChange,
}: StockSectionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Hash className="h-3 w-3" />
        Inventario
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Stock Actual */}
        <div className="space-y-2">
          <Label
            htmlFor="stock"
            className="text-sm font-medium flex items-center gap-1.5 text-foreground"
          >
            Stock Actual
            <RequiredMarker />
          </Label>
          <Input
            id="stock"
            type="number"
            min="0"
            value={stockQuantity}
            onChange={(e) => onStockQuantityChange(e.target.value)}
            className={`h-12 ${errors.stock_quantity ? 'border-destructive' : 'border-border'} bg-background`}
          />
          <FieldErrorText errors={errors} field="stock_quantity" />
        </div>

        {/* Stock Mínimo */}
        <div className="space-y-2">
          <Label
            htmlFor="minStock"
            className="text-sm font-medium flex items-center gap-1.5 text-amber-600 dark:text-amber-500"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Stock Mínimo
            <RequiredMarker />
          </Label>
          <Input
            id="minStock"
            type="number"
            min="0"
            value={minStock}
            onChange={(e) => onMinStockChange(e.target.value)}
            className={`h-12 ${errors.min_stock ? 'border-destructive' : 'border-amber-500/30'} bg-background focus-visible:ring-amber-500`}
          />
          <FieldErrorText errors={errors} field="min_stock" />
        </div>

        {/* Unidad */}
        <div className="space-y-2">
          <Label
            htmlFor="unit"
            className="text-sm font-medium flex items-center gap-1.5 text-foreground"
          >
            Unidad
            <RequiredMarker />
          </Label>
          <Select value={unit} onValueChange={(value) => onUnitChange(value)}>
            <SelectTrigger className="h-12 bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {UNIT_OPTIONS.map((u) => (
                <SelectItem key={u.value} value={u.value}>
                  {u.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
