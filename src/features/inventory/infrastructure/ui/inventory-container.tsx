'use client';

import { useState, useMemo } from 'react';
import { InventoryItem } from '@/features/inventory/domain/entities';
import { Category } from '@/features/categories/domain/entities';
import { Room } from '@/features/rooms/domain/entities';
import { InventoryList } from './inventory-list';
import { SearchBar } from './search-bar';
import { ExportButton } from './export-button';
import { ImportButton } from './import-button';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Filter,
  X,
  Tag,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RotateCcw,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { getTextColorForBackground } from '@/lib/utils';
import { ROOM_ICON_MAP } from '@/features/rooms/infrastructure/ui/constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

interface InventoryContainerProps {
  initialItems: InventoryItem[];
  categories: Category[];
  rooms: Room[];
}

export function InventoryContainer({
  initialItems,
  categories,
  rooms,
}: InventoryContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [stockStatus, setStockStatus] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.full_path
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        (item.category_id && selectedCategories.includes(item.category_id));

      const matchesRoom =
        !selectedRoomId ||
        item.category?.room_id === selectedRoomId ||
        item.location?.room_id === selectedRoomId;

      let matchesStock = stockStatus.length === 0;
      if (!matchesStock) {
        if (
          stockStatus.includes('normal') &&
          item.stock_quantity >= item.min_stock &&
          item.stock_quantity > 0
        )
          matchesStock = true;
        if (
          stockStatus.includes('low') &&
          item.stock_quantity < item.min_stock &&
          item.stock_quantity > 0
        )
          matchesStock = true;
        if (stockStatus.includes('out') && item.stock_quantity === 0)
          matchesStock = true;
      }

      return matchesSearch && matchesCategory && matchesRoom && matchesStock;
    });
  }, [initialItems, searchQuery, selectedCategories, selectedRoomId, stockStatus]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const toggleStockStatus = (status: string) => {
    setStockStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedRoomId('');
    setStockStatus([]);
    setSearchQuery('');
  };

  const activeFiltersCount = selectedCategories.length + stockStatus.length + (selectedRoomId ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-10 py-4 -mx-4 px-4 border-b md:border-none space-y-4">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <SearchBar onResultSelect={(item) => setSearchQuery(item.name)} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              render={(props) => (
                <Button
                  variant="outline"
                  className="h-11 rounded-xl gap-2 border-none bg-muted/50"
                  {...props}
                >
                  <Filter className="h-4 w-4" />
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="h-5 px-1.5 min-w-5 justify-center bg-primary text-primary-foreground"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              )}
            />
          <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Ambiente
            </DropdownMenuLabel>
            <div className="max-h-40 overflow-auto">
              {rooms.map((room) => (
                <DropdownMenuCheckboxItem
                  key={room.id}
                  checked={selectedRoomId === room.id}
                  onCheckedChange={() =>
                    setSelectedRoomId(selectedRoomId === room.id ? '' : room.id)
                  }
                  className="rounded-lg"
                >
            <div className="flex items-center gap-2">
                {(() => {
                  const Icon = ROOM_ICON_MAP[room.icon] || MapPin;
                  return <Icon className="h-3.5 w-3.5" style={{ color: room.color }} />;
                })()}
                    <span style={{ color: room.color }}>{room.name}</span>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
              Estado de Stock
            </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={stockStatus.includes('normal')}
                  onCheckedChange={() => toggleStockStatus('normal')}
                  className="rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Normal</span>
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={stockStatus.includes('low')}
                  onCheckedChange={() => toggleStockStatus('low')}
                  className="rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>Bajo Stock</span>
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={stockStatus.includes('out')}
                  onCheckedChange={() => toggleStockStatus('out')}
                  className="rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Agotado</span>
                  </div>
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  Categorías
                </DropdownMenuLabel>
                <div className="max-h-60 overflow-auto">
                  {categories.map((cat) => (
                    <DropdownMenuCheckboxItem
                      key={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => toggleCategory(cat.id)}
                      className="rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Tag
                          className="h-3.5 w-3.5"
                          style={{ color: cat.color || '#6B7280' }}
                        />
                        <span style={{ color: cat.color || '#6B7280' }}>
                          {cat.name}
                        </span>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        <ExportButton items={filteredItems} rooms={rooms} fileName="inventario" />
        <ImportButton />
      </div>

      {rooms.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedRoomId('')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              !selectedRoomId
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Todos
          </button>
          {rooms.map((room) => (
            <button
              key={room.id}
              type="button"
              onClick={() => setSelectedRoomId(selectedRoomId === room.id ? '' : room.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 inline-flex items-center gap-1.5 ${
                selectedRoomId === room.id
                  ? 'text-white shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              style={selectedRoomId === room.id ? { backgroundColor: room.color } : undefined}
        >
          {(() => {
            const Icon = ROOM_ICON_MAP[room.icon] || MapPin;
            return <Icon className="h-3 w-3" />;
          })()}
          {room.name}
            </button>
          ))}
        </div>
      )}

        {activeFiltersCount > 0 && (
          <div className="flex justify-between items-start gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
        <div className="flex flex-wrap gap-2 items-center flex-1">
          {selectedRoomId && (() => {
            const room = rooms.find((r) => r.id === selectedRoomId);
            const textColor = getTextColorForBackground(room?.color);
            return (
              <Badge
                className={`gap-1.5 rounded-full pl-2.5 pr-1.5 py-1 border-none font-medium text-xs inline-flex items-center ${textColor}`}
      style={{ backgroundColor: room?.color || '#6B7280' }}
        >
          {(() => {
            const Icon = ROOM_ICON_MAP[room?.icon || ''] || MapPin;
            return <Icon className="h-3 w-3" />;
          })()}
                {room?.name}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRoomId('');
                  }}
                  className="ml-0.5 h-5 w-5 p-0 hover:bg-black/20 dark:hover:bg-white/20"
                  aria-label="Remover filtro ambiente"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })()}
          {stockStatus.map((s) => {
                const getIcon = () => {
                  switch (s) {
                    case 'normal':
                      return <CheckCircle2 className="h-3 w-3" />;
                    case 'low':
                      return <AlertCircle className="h-3 w-3" />;
                    case 'out':
                      return <XCircle className="h-3 w-3" />;
                    default:
                      return null;
                  }
                };

                return (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="gap-1 rounded-full pl-2.5 pr-1.5 py-1 bg-primary text-primary-foreground border-none font-medium text-xs inline-flex items-center"
                  >
                    {getIcon()}
                    {s === 'normal'
                      ? 'Normal'
                      : s === 'low'
                        ? 'Bajo Stock'
                        : 'Agotado'}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStockStatus(s);
                      }}
                      className="ml-0.5 h-5 w-5 p-0 hover:bg-black/20 dark:hover:bg-white/20"
                      aria-label={`Remover filtro ${s}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
              {selectedCategories.map((id) => {
                const cat = categories.find((c) => c.id === id);
                const textColor = getTextColorForBackground(cat?.color);
                return (
                  <Badge
                    key={id}
                    className={`gap-1.5 rounded-full pl-2.5 pr-1.5 py-1 border-none font-medium text-xs inline-flex items-center ${textColor}`}
                    style={{ backgroundColor: cat?.color || '#6B7280' }}
                  >
                    <Tag className="h-3 w-3" />
                    {cat?.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCategory(id);
                      }}
                      className="ml-0.5 h-5 w-5 p-0 hover:bg-black/20 dark:hover:bg-white/20"
                      aria-label={`Remover filtro ${cat?.name}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                );
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="shrink-0 h-6 w-6 p-0 text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Limpiar todos los filtros"
              title="Limpiar filtros"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <main className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted flex flex-col items-center gap-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-lg">No hay resultados</p>
              <p className="text-muted-foreground text-sm">
                Intenta ajustar tus filtros o búsqueda
              </p>
            </div>
            <Button variant="link" onClick={clearFilters}>
              Limpiar todo
            </Button>
          </div>
        ) : (
          <InventoryList items={filteredItems} />
        )}
      </main>
    </div>
  );
}
