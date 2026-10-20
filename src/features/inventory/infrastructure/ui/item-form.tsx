'use client';

import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import {
  InventoryItem,
  CreateInventoryItemDTO,
} from '@/features/inventory/domain/entities';
import { Category } from '@/features/categories/domain/entities';
import { Location } from '@/features/locations/domain/entities';
import { Room } from '@/features/rooms/domain/entities';
import { BasicInfoSection } from './item-form-sections/basic-info-section';
import { FieldError } from './item-form-sections/form-parts';
import { FormActions } from './item-form-sections/form-actions';
import { LocationSection } from './item-form-sections/location-section';
import { NotesSection } from './item-form-sections/notes-section';
import { RoomStep } from './item-form-sections/room-step';
import { StockSection } from './item-form-sections/stock-section';

interface ItemFormProps {
  item?: InventoryItem;
  categories: Category[];
  locations: Location[];
  rooms: Room[];
  onSubmit: (data: CreateInventoryItemDTO) => Promise<{ success: boolean; error?: string }>;
  onCancel?: () => void;
  successMessage?: string;
}

export function ItemForm({
  item,
  categories,
  locations,
  rooms,
  onSubmit,
  onCancel,
  successMessage,
}: ItemFormProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});

  // Helper to get category name
  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || null;
  };

  // Get initial room from existing item
  const getInitialRoomId = () => {
    if (item?.location_id) {
      const location = locations.find((loc) => loc.id === item.location_id);
      return location?.room_id || '';
    }
    if (item?.category_id) {
      const category = categories.find((cat) => cat.id === item.category_id);
      return category?.room_id || '';
    }
    return '';
  };

  const [selectedRoomId, setSelectedRoomId] = useState(getInitialRoomId);

  // Filter categories and locations by selected room
  const filteredCategories = useMemo(() => {
    if (!selectedRoomId) return categories;
    return categories.filter((cat) => cat.room_id === selectedRoomId);
  }, [categories, selectedRoomId]);

  const filteredLocations = useMemo(() => {
    if (!selectedRoomId) return locations;
    return locations.filter((loc) => loc.room_id === selectedRoomId);
  }, [locations, selectedRoomId]);

  // Extract unique sections from filtered locations
  const sections = useMemo(() => {
    const uniqueSections = new Set(filteredLocations.map((loc) => loc.section));
    return Array.from(uniqueSections).sort();
  }, [filteredLocations]);

  // Initialize state from existing item
  const getInitialSection = () => {
    if (item?.location_id) {
      const location = filteredLocations.find((loc) => loc.id === item.location_id);
      return location?.section || '';
    }
    return '';
  };

  const getInitialLevel = () => {
    if (item?.location_id) {
      const location = filteredLocations.find((loc) => loc.id === item.location_id);
      return location?.level || '';
    }
    return '';
  };

  const getInitialSide = () => {
    if (item?.location_id) {
      const location = filteredLocations.find((loc) => loc.id === item.location_id);
      return location?.side || '';
    }
    return '';
  };

  const getInitialPosition = () => {
    if (item?.location_id) {
      const location = filteredLocations.find((loc) => loc.id === item.location_id);
      return location?.position || '';
    }
    return '';
  };

  const [selectedSection, setSelectedSection] = useState(getInitialSection);
  const [selectedLevel, setSelectedLevel] = useState(getInitialLevel);
  const [selectedSide, setSelectedSide] = useState(getInitialSide);
  const [selectedPosition, setSelectedPosition] = useState(getInitialPosition);

  // Get available levels for selected section
  const availableLevels = useMemo(() => {
    if (!selectedSection) return [];
    const levels = new Set(
      filteredLocations
        .filter((loc) => loc.section === selectedSection)
        .map((loc) => loc.level),
    );
    return Array.from(levels).sort();
  }, [filteredLocations, selectedSection]);

  // Get available sides for selected section and level
  const availableSides = useMemo(() => {
    if (!selectedSection || !selectedLevel) return [];
    const sides = new Set(
      filteredLocations
        .filter(
          (loc) =>
            loc.section === selectedSection && loc.level === selectedLevel,
        )
        .map((loc) => loc.side)
        .filter((side): side is string => Boolean(side)),
    );
    return Array.from(sides).sort();
  }, [filteredLocations, selectedSection, selectedLevel]);

  // Get available positions for selected section, level, and side
  const availablePositions = useMemo(() => {
    if (!selectedSection || !selectedLevel) return [];
    return filteredLocations
      .filter(
        (loc) =>
          loc.section === selectedSection &&
          loc.level === selectedLevel &&
          (selectedSide ? loc.side === selectedSide : !loc.side),
      )
      .map((loc) => loc.position)
      .filter((pos): pos is string => Boolean(pos));
  }, [filteredLocations, selectedSection, selectedLevel, selectedSide]);

  // Find the location_id based on selections
  const selectedLocationId = useMemo(() => {
    if (!selectedSection || !selectedLevel) return '';
    const found = filteredLocations.find(
      (loc) =>
        loc.section === selectedSection &&
        loc.level === selectedLevel &&
        (selectedSide ? loc.side === selectedSide : !loc.side) &&
        (selectedPosition ? loc.position === selectedPosition : !loc.position),
    );
    return found?.id || '';
  }, [filteredLocations, selectedSection, selectedLevel, selectedSide, selectedPosition]);

  const [formData, setFormData] = useState({
    name: item?.name || '',
    category_id: item?.category_id || '',
    stock_quantity: item?.stock_quantity?.toString() || '1',
    min_stock: item?.min_stock?.toString() || '1',
    unit: item?.unit || 'unidad',
    notes: item?.notes || '',
  });

  // Reset location selections when room changes
  const handleRoomChange = (roomId: string) => {
    setSelectedRoomId(roomId);
    setSelectedSection('');
    setSelectedLevel('');
    setSelectedSide('');
    setSelectedPosition('');
    setFormData((prev) => ({ ...prev, category_id: '' }));
    setErrors((prev) => ({ ...prev, location_id: undefined, category_id: undefined }));
  };

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
    setSelectedPosition('');
  };

  // Handle position change
  const handlePositionChange = (position: string) => {
    setSelectedPosition(position);
  };

  const handleNameChange = (value: string) => {
    setFormData((prev) => ({ ...prev, name: value }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleCategoryChange = (value: string | null) => {
    setFormData((prev) => ({ ...prev, category_id: value || '' }));
    if (errors.category_id) setErrors((prev) => ({ ...prev, category_id: undefined }));
  };

  const handleStockQuantityChange = (value: string) => {
    setFormData((prev) => ({ ...prev, stock_quantity: value }));
    if (errors.stock_quantity) setErrors((prev) => ({ ...prev, stock_quantity: undefined }));
  };

  const handleMinStockChange = (value: string) => {
    setFormData((prev) => ({ ...prev, min_stock: value }));
    if (errors.min_stock) setErrors((prev) => ({ ...prev, min_stock: undefined }));
  };

  const handleUnitChange = (value: string | null) => {
    setFormData((prev) => ({ ...prev, unit: value || 'unidad' }));
  };

  const handleNotesChange = (value: string) => {
    setFormData((prev) => ({ ...prev, notes: value }));
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
      const result = await onSubmit({
        ...formData,
        location_id: selectedLocationId,
        stock_quantity: parseInt(formData.stock_quantity, 10),
        min_stock: parseInt(formData.min_stock, 10),
        notes: formData.notes || undefined,
      });
      if (result.success) {
        toast.success(successMessage ?? (item ? 'Item actualizado' : 'Item creado'));
      } else {
        toast.error(result.error ?? 'No se pudo guardar el item');
      }
    } catch (err) {
      console.error('Submit failed:', err);
      toast.error('Error inesperado al guardar');
    } finally {
      setLoading(false);
    }
  };

  const isLocationComplete = Boolean(selectedSection && selectedLevel && selectedLocationId);
  const locationPath = isLocationComplete
    ? filteredLocations.find((loc) => loc.id === selectedLocationId)?.full_path
    : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <RoomStep
        rooms={rooms}
        selectedRoomId={selectedRoomId}
        selectedSection={selectedSection}
        selectedLevel={selectedLevel}
        selectedSide={selectedSide}
        selectedPosition={selectedPosition}
        onRoomChange={handleRoomChange}
        onClearSection={() => handleSectionChange('')}
        onClearLevel={() => handleLevelChange('')}
        onClearSide={() => handleSideChange('')}
      />

      <BasicInfoSection
        name={formData.name}
        categoryId={formData.category_id}
        categoryName={getCategoryName(formData.category_id)}
        categories={filteredCategories}
        roomSelected={Boolean(selectedRoomId)}
        errors={errors}
        onNameChange={handleNameChange}
        onCategoryChange={handleCategoryChange}
      />

      <LocationSection
        roomSelected={Boolean(selectedRoomId)}
        sections={sections}
        selectedSection={selectedSection}
        selectedLevel={selectedLevel}
        selectedSide={selectedSide}
        selectedPosition={selectedPosition}
        availableLevels={availableLevels}
        availableSides={availableSides}
        availablePositions={availablePositions}
        locationComplete={isLocationComplete}
        locationPath={locationPath}
        locationError={errors.location_id}
        onSectionChange={handleSectionChange}
        onLevelChange={handleLevelChange}
        onSideChange={handleSideChange}
        onPositionChange={handlePositionChange}
      />

      <StockSection
        stockQuantity={formData.stock_quantity}
        minStock={formData.min_stock}
        unit={formData.unit}
        errors={errors}
        onStockQuantityChange={handleStockQuantityChange}
        onMinStockChange={handleMinStockChange}
        onUnitChange={handleUnitChange}
      />

      <NotesSection value={formData.notes} onChange={handleNotesChange} />

      <FormActions loading={loading} isEdit={Boolean(item)} onCancel={onCancel} />
    </form>
  );
}
