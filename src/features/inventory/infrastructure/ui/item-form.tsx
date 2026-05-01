'use client';

import { useState } from 'react';
import {
  InventoryItem,
  CreateInventoryItemDTO,
} from '@/features/inventory/domain/entities';
import { Category } from '@/features/categories/domain/entities';
import { Location } from '@/features/locations/domain/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Package,
  Tag,
  MapPin,
  Hash,
  AlertTriangle,
  FileText,
  Loader2,
} from 'lucide-react';

interface ItemFormProps {
  item?: InventoryItem;
  categories: Category[];
  locations: Location[];
  onSubmit: (data: CreateInventoryItemDTO) => Promise<void>;
  onCancel?: () => void;
}

export function ItemForm({
  item,
  categories,
  locations,
  onSubmit,
  onCancel,
}: ItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: item?.name || '',
    category_id: item?.category_id || '',
    location_id: item?.location_id || '',
    stock_quantity: item?.stock_quantity?.toString() || '1',
    min_stock: item?.min_stock?.toString() || '1',
    unit: item?.unit || 'unidad',
    notes: item?.notes || '',
  });

  // Helper para obtener el nombre de la categoría por ID
  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name;
  };

  // Helper para obtener la ruta de la ubicación por ID
  const getLocationPath = (locationId: string) => {
    return locations.find((loc) => loc.id === locationId)?.full_path ?? null;
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        ...formData,
        stock_quantity: parseInt(formData.stock_quantity, 10),
        min_stock: parseInt(formData.min_stock, 10),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground"
          >
            <Package className="h-3 w-3" /> Nombre del Item
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ej: Aceite de Oliva"
            required
            className="h-11 bg-muted/20 border-muted-foreground/20 focus-visible:ring-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground"
            >
              <Tag className="h-3 w-3" /> Categoría
            </Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) =>
                setFormData({ ...formData, category_id: value || '' })
              }
            >
              <SelectTrigger className="h-11 bg-muted/20 border-muted-foreground/20">
                <SelectValue placeholder="Seleccionar categoría">
                  {getCategoryName(formData.category_id)}
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
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="location"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground"
            >
              <MapPin className="h-3 w-3" /> Ubicación
            </Label>
            <Select
              value={formData.location_id}
              onValueChange={(value) =>
                setFormData({ ...formData, location_id: value || '' })
              }
            >
              <SelectTrigger className="h-11 bg-muted/20 border-muted-foreground/20">
                <SelectValue placeholder="Seleccionar ubicación">
                  {getLocationPath(formData.location_id)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.full_path}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="stock"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground"
            >
              <Hash className="h-3 w-3" /> Stock Actual
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={formData.stock_quantity}
              onChange={(e) =>
                setFormData({ ...formData, stock_quantity: e.target.value })
              }
              className="h-11 bg-muted/20 border-muted-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="minStock"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-amber-600 dark:text-amber-500"
            >
              <AlertTriangle className="h-3 w-3" /> Stock Mínimo
            </Label>
            <Input
              id="minStock"
              type="number"
              min="0"
              value={formData.min_stock}
              onChange={(e) =>
                setFormData({ ...formData, min_stock: e.target.value })
              }
              className="h-11 bg-muted/20 border-amber-500/20 focus-visible:ring-amber-500"
            />
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label
              htmlFor="unit"
              className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground"
            >
              Unidad
            </Label>
            <Select
              value={formData.unit}
              onValueChange={(value) =>
                setFormData({ ...formData, unit: value || 'unidad' })
              }
            >
              <SelectTrigger className="h-11 bg-muted/20 border-muted-foreground/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unidad">Unidades</SelectItem>
                <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                <SelectItem value="g">Gramos (g)</SelectItem>
                <SelectItem value="L">Litros (L)</SelectItem>
                <SelectItem value="ml">Mililitros (ml)</SelectItem>
                <SelectItem value="paquete">Paquetes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="notes"
            className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground"
          >
            <FileText className="h-3 w-3" /> Notas Adicionales
          </Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Ej: Fecha de caducidad, marca preferida..."
            rows={4}
            className="bg-muted/20 border-muted-foreground/20 focus-visible:ring-primary resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="flex-1 h-11"
          >
            Cancelar
          </Button>
        )}
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 h-11 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Guardando...
            </>
          ) : item ? (
            'Actualizar Item'
          ) : (
            'Crear Item'
          )}
        </Button>
      </div>
    </form>
  );
}
