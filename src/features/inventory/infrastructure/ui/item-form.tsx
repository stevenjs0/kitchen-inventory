'use client';

import { useState, useMemo } from 'react';
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
  LayoutGrid,
  Layers,
  CircleDot,
  CheckCircle2,
} from 'lucide-react';

interface FieldError {
  name?: string;
  category_id?: string;
  location_id?: string;
  stock_quantity?: string;
  min_stock?: string;
}

interface ItemFormProps {
  item?: InventoryItem;
  categories: Category[];
  locations: Location[];
  onSubmit: (data: CreateInventoryItemDTO) => Promise<void>;
  onCancel?: () => void;
}

const RequiredMarker = () => (
  <span className="text-destructive ml-0.5">*</span>
);

export function ItemForm({
  item,
  categories,
  locations,
  onSubmit,
  onCancel,
}: ItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});

  // Helper to get category name
  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || null;
  };

  // Extract unique sections from locations
  const sections = useMemo(() => {
    const uniqueSections = new Set(locations.map((loc) => loc.section));
    return Array.from(uniqueSections).sort();
  }, [locations]);

  // Initialize state from existing item
  const getInitialSection = () => {
    if (item?.location_id) {
      const location = locations.find((loc) => loc.id === item.location_id);
      return location?.section || '';
    }
    return '';
  };

  const getInitialLevel = () => {
    if (item?.location_id) {
      const location = locations.find((loc) => loc.id === item.location_id);
      return location?.level || '';
    }
    return '';
  };

  const getInitialSide = () => {
    if (item?.location_id) {
      const location = locations.find((loc) => loc.id === item.location_id);
      return location?.side || '';
    }
    return '';
  };

  const [selectedSection, setSelectedSection] = useState(getInitialSection);
  const [selectedLevel, setSelectedLevel] = useState(getInitialLevel);
  const [selectedSide, setSelectedSide] = useState(getInitialSide);

  // Get available levels for selected section
  const availableLevels = useMemo(() => {
    if (!selectedSection) return [];
    const levels = new Set(
      locations
        .filter((loc) => loc.section === selectedSection)
        .map((loc) => loc.level),
    );
    return Array.from(levels).sort();
  }, [locations, selectedSection]);

  // Get available sides for selected section and level
  const availableSides = useMemo(() => {
    if (!selectedSection || !selectedLevel) return [];
    const sides = new Set(
      locations
        .filter(
          (loc) =>
            loc.section === selectedSection && loc.level === selectedLevel,
        )
        .map((loc) => loc.side)
        .filter((side): side is string => Boolean(side)),
    );
    return Array.from(sides).sort();
  }, [locations, selectedSection, selectedLevel]);

  // Find the location_id based on selections
  const selectedLocationId = useMemo(() => {
    if (!selectedSection || !selectedLevel) return '';
    const found = locations.find(
      (loc) =>
        loc.section === selectedSection &&
        loc.level === selectedLevel &&
        (selectedSide ? loc.side === selectedSide : !loc.side),
    );
    return found?.id || '';
  }, [locations, selectedSection, selectedLevel, selectedSide]);

  const [formData, setFormData] = useState({
    name: item?.name || '',
    category_id: item?.category_id || '',
    stock_quantity: item?.stock_quantity?.toString() || '1',
    min_stock: item?.min_stock?.toString() || '1',
    unit: item?.unit || 'unidad',
    notes: item?.notes || '',
  });

  // Reset level and side when section changes
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setSelectedLevel('');
    setSelectedSide('');
    setErrors((prev) => ({ ...prev, location_id: undefined }));
  };

  // Reset side when level changes
  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
    setSelectedSide('');
  };

  // Handle side change
  const handleSideChange = (side: string) => {
    setSelectedSide(side);
  };

  // Validate form before submit
  const validateForm = (): boolean => {
    const newErrors: FieldError = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Selecciona una categoría';
    }

    if (!selectedLocationId) {
      newErrors.location_id = 'Completa la ubicación (sección, nivel y lado)';
    }

    const stockQty = parseInt(formData.stock_quantity, 10);
    if (isNaN(stockQty) || stockQty < 0) {
      newErrors.stock_quantity = 'Stock inválido';
    }

    const minStock = parseInt(formData.min_stock, 10);
    if (isNaN(minStock) || minStock < 0) {
      newErrors.min_stock = 'Stock mínimo inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSubmit({
        ...formData,
        location_id: selectedLocationId,
        stock_quantity: parseInt(formData.stock_quantity, 10),
        min_stock: parseInt(formData.min_stock, 10),
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFieldError = (field: keyof FieldError) => {
    if (!errors[field]) return null;
    return (
      <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
        <AlertTriangle className="h-3 w-3" />
        {errors[field]}
      </p>
    );
  };

  const isLocationComplete = selectedSection && selectedLevel && selectedLocationId;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Section 1: Basic Info */}
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
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="Ej: Aceite de Oliva Extra Virgén"
            className={`h-12 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : 'border-border'} bg-background`}
          />
          {renderFieldError('name')}
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
            value={formData.category_id}
            onValueChange={(value) => {
              setFormData({ ...formData, category_id: value || '' });
              if (errors.category_id) setErrors((prev) => ({ ...prev, category_id: undefined }));
            }}
          >
            <SelectTrigger
              className={`h-12 ${errors.category_id ? 'border-destructive focus-visible:ring-destructive' : 'border-border'} bg-background`}
            >
              <SelectValue placeholder="Seleccionar categoría">
                {getCategoryName(formData.category_id) || (
                  <span className="text-muted-foreground">Seleccionar categoría</span>
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
          {renderFieldError('category_id')}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground">
            Ubicación del Item
          </span>
        </div>
      </div>

      {/* Section 2: Location - Card Style */}
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 space-y-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Ubicación</span>
          <RequiredMarker />
          {isLocationComplete && (
            <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />
          )}
        </div>

        {/* Step 1: Section Selection */}
        <div className="space-y-3">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <LayoutGrid className="h-3 w-3" />
            1. Selecciona Sección
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => handleSectionChange(section)}
                className={`
                  flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm
                  ${
                    selectedSection === section
                      ? 'bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]'
                      : 'bg-background border-border hover:border-primary/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer'
                  }
                `}
              >
                {selectedSection === section && <CheckCircle2 className="h-4 w-4" />}
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Level and Side - Only show when section is selected */}
        {selectedSection && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3 w-3" />
              2. Selecciona Nivel y Lado
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Level Select */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-0.5">
                    Nivel
                    <RequiredMarker />
                  </span>
                </div>
                <Select
                  value={selectedLevel}
                  onValueChange={(value) => {
                    if (value) handleLevelChange(value);
                  }}
                >
                  <SelectTrigger className="h-11 bg-background border-border">
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Side Select */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-0.5">
                    Lado
                    <RequiredMarker />
                  </span>
                </div>
                <Select
                  value={selectedSide}
                  onValueChange={(value) => {
                    if (value) handleSideChange(value);
                  }}
                  disabled={!selectedLevel}
                >
                  <SelectTrigger className="h-11 bg-background border-border">
                    <SelectValue placeholder="Seleccionar lado">
                      {selectedSide || (!selectedLevel ? 'Primero nivel' : 'Seleccionar lado')}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableSides.map((side) => (
                      <SelectItem key={side} value={side}>
                        {side}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Location Error */}
        {errors.location_id && (
          <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            {errors.location_id}
          </div>
        )}

        {/* Location Preview */}
        {isLocationComplete && locations.find((l) => l.id === selectedLocationId) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
            <MapPin className="h-3.5 w-3.5" />
            {locations.find((l) => l.id === selectedLocationId)?.full_path}
          </div>
        )}
      </div>

      {/* Section 3: Stock Info */}
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
              value={formData.stock_quantity}
              onChange={(e) => {
                setFormData({ ...formData, stock_quantity: e.target.value });
                if (errors.stock_quantity) setErrors((prev) => ({ ...prev, stock_quantity: undefined }));
              }}
              className={`h-12 ${errors.stock_quantity ? 'border-destructive' : 'border-border'} bg-background`}
            />
            {renderFieldError('stock_quantity')}
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
              value={formData.min_stock}
              onChange={(e) => {
                setFormData({ ...formData, min_stock: e.target.value });
                if (errors.min_stock) setErrors((prev) => ({ ...prev, min_stock: undefined }));
              }}
              className={`h-12 ${errors.min_stock ? 'border-destructive' : 'border-amber-500/30'} bg-background focus-visible:ring-amber-500`}
            />
            {renderFieldError('min_stock')}
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
            <Select
              value={formData.unit}
              onValueChange={(value) =>
                setFormData({ ...formData, unit: value || 'unidad' })
              }
            >
              <SelectTrigger className="h-12 bg-background border-border">
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
      </div>

      {/* Section 4: Notes (Optional) */}
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
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Ej: Fecha de caducidad, marca preferida, proveedor..."
          rows={3}
          className="bg-background border-border resize-none"
        />
      </div>

      {/* Submit Actions */}
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
