'use client';

import { useState, useMemo } from 'react';
import { InventoryItem } from '@/features/inventory/domain/entities';
import { Category } from '@/features/categories/domain/entities';
import { InventoryList } from './inventory-list';
import { SearchBar } from './search-bar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';

interface InventoryContainerProps {
  initialItems: InventoryItem[];
  categories: Category[];
}

export function InventoryContainer({
  initialItems,
  categories,
}: InventoryContainerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [stockStatus, setStockStatus] = useState<string[]>([]);

  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.full_path
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        (item.category_id && selectedCategories.includes(item.category_id));

      // Stock status filter
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

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [initialItems, searchQuery, selectedCategories, stockStatus]);

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
    setStockStatus([]);
    setSearchQuery('');
  };

  const activeFiltersCount = selectedCategories.length + stockStatus.length;

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-background/95 backdrop-blur z-10 py-4 -mx-4 px-4 border-b md:border-none space-y-4">
        <div className="flex gap-2">
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
                  Estado de Stock
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={stockStatus.includes('normal')}
                  onCheckedChange={() => toggleStockStatus('normal')}
                  className="rounded-lg"
                >
                  ✅ Normal
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={stockStatus.includes('low')}
                  onCheckedChange={() => toggleStockStatus('low')}
                  className="rounded-lg"
                >
                  ⚠️ Bajo Stock
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={stockStatus.includes('out')}
                  onCheckedChange={() => toggleStockStatus('out')}
                  className="rounded-lg"
                >
                  ❌ Agotado
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
                      {cat.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuGroup>

              {activeFiltersCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={clearFilters}
                    className="justify-center text-destructive focus:text-destructive rounded-lg font-medium"
                  >
                    Limpiar Filtros
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            {stockStatus.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="gap-1 rounded-full pl-2 pr-1 py-0.5 bg-primary/10 text-primary border-none"
              >
                {s === 'normal'
                  ? 'Normal'
                  : s === 'low'
                    ? 'Bajo Stock'
                    : 'Agotado'}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-foreground"
                  onClick={() => toggleStockStatus(s)}
                />
              </Badge>
            ))}
            {selectedCategories.map((id) => {
              const cat = categories.find((c) => c.id === id);
              return (
                <Badge
                  key={id}
                  variant="secondary"
                  className="gap-1 rounded-full pl-2 pr-1 py-0.5 bg-primary/10 text-primary border-none"
                >
                  {cat?.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-foreground"
                    onClick={() => toggleCategory(id)}
                  />
                </Badge>
              );
            })}
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
