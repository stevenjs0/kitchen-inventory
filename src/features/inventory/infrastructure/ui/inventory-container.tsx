'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
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
  Plus,
} from 'lucide-react';
import { getTextColorForBackground } from '@/lib/utils';
import { ROOM_ICON_MAP } from '@/features/rooms/infrastructure/ui/constants';
import { useFiltersFromUrl } from './use-filters-from-url';
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
  const {
    filters,
    setQuery,
    setRoom,
    toggleCategory,
    toggleStockStatus,
    clearFilters,
    activeFiltersCount,
  } = useFiltersFromUrl();

  const filteredItems = useMemo(() => {
    const q = filters.q.toLowerCase();
    return initialItems.filter((item) => {
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.category?.name.toLowerCase().includes(q) ||
        (item.location?.full_path ?? '').toLowerCase().includes(q);

      const matchesCategory =
        filters.categories.length === 0 ||
        (item.category_id !== null &&
          filters.categories.includes(item.category_id));

      const matchesRoom =
        !filters.room ||
        item.category?.room_id === filters.room ||
        item.location?.room_id === filters.room;

      let matchesStock = filters.stock.length === 0;
      if (!matchesStock) {
        if (
          filters.stock.includes('normal') &&
          item.stock_quantity >= item.min_stock &&
          item.stock_quantity > 0
        )
          matchesStock = true;
        if (
          filters.stock.includes('low') &&
          item.stock_quantity < item.min_stock &&
          item.stock_quantity > 0
        )
          matchesStock = true;
        if (filters.stock.includes('out') && item.stock_quantity === 0)
          matchesStock = true;
      }

      return matchesSearch && matchesCategory && matchesRoom && matchesStock;
    });
  }, [
    initialItems,
    filters.q,
    filters.categories,
    filters.room,
    filters.stock,
  ]);

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-10 py-4 -mx-4 px-4 border-b md:border-none space-y-4">
        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <SearchBar
              onResultSelect={(item) => setQuery(item.name)}
              externalQuery={filters.q}
              onQueryChange={setQuery}
            />
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
                      checked={filters.room === room.id}
                      onCheckedChange={() => setRoom(room.id)}
                      className="rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        {(() => {
                          const Icon = ROOM_ICON_MAP[room.icon] || MapPin;
                          return (
                            <Icon
                              className="h-3.5 w-3.5"
                              style={{ color: room.color }}
                            />
                          );
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
                  checked={filters.stock.includes('normal')}
                  onCheckedChange={() => toggleStockStatus('normal')}
                  className="rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Normal</span>
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.stock.includes('low')}
                  onCheckedChange={() => toggleStockStatus('low')}
                  className="rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <span>Bajo Stock</span>
                  </div>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.stock.includes('out')}
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
                      checked={filters.categories.includes(cat.id)}
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

          <ExportButton
            items={filteredItems}
            rooms={rooms}
            fileName="inventario"
          />
          <ImportButton />
          <NewItemLink />
        </div>

        {rooms.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setRoom('')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                !filters.room
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
                onClick={() => setRoom(room.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 inline-flex items-center gap-1.5 ${
                  filters.room === room.id
                    ? 'text-white shadow-sm'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={
                  filters.room === room.id
                    ? { backgroundColor: room.color }
                    : undefined
                }
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
              {filters.room &&
                (() => {
                  const room = rooms.find((r) => r.id === filters.room);
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
                          setRoom('');
                        }}
                        className="ml-0.5 h-5 w-5 p-0 hover:bg-black/20 dark:hover:bg-white/20"
                        aria-label="Remover filtro ambiente"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })()}
              {filters.stock.map((s) => {
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
              {filters.categories.map((id) => {
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

/**
 * Client-only link to /inventory/new that carries the current URL
 * (including active filters) as a `from` query param so the user
 * returns to the same filtered view after creating an item.
 */
function NewItemLink() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.toString();
  const from = currentSearch ? `?${currentSearch}` : '';
  const href = from
    ? `/inventory/new?from=${encodeURIComponent(`${pathname}${from}`)}`
    : '/inventory/new';

  return (
    <Link href={href} aria-label="Crear nuevo item">
      <Button
        size="sm"
        className="h-11 rounded-full shadow-sm hover:shadow-md transition-shadow"
      >
        <Plus className="mr-2 h-4 w-4" /> Nuevo
      </Button>
    </Link>
  );
}
