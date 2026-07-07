'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { searchInventoryItems } from '@/lib/actions/inventory.actions';
import { InventoryItem } from '@/features/inventory/domain/entities';
import { formatStockStatus } from '@/shared/utils/formatters';
import { Search, Loader2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onResultSelect?: (item: InventoryItem) => void;
  /**
   * Controlled value for the search input — used to keep the input in sync
   * with the URL-backed filter state.
   */
  externalQuery?: string;
  /**
   * Fired when the user types in the input. The host (InventoryContainer)
   * is responsible for persisting the query to the URL.
   */
  onQueryChange?: (q: string) => void;
}

export function SearchBar({
  onResultSelect,
  externalQuery,
  onQueryChange,
}: SearchBarProps) {
  const isControlled = externalQuery !== undefined;
  const [internalQuery, setInternalQuery] = useState('');
  const query = isControlled ? externalQuery : internalQuery;

  const [results, setResults] = useState<InventoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const setQuery = useCallback(
    (next: string) => {
      if (isControlled) {
        onQueryChange?.(next);
      } else {
        setInternalQuery(next);
      }
    },
    [isControlled, onQueryChange],
  );

  const search = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery || searchQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const items = await searchInventoryItems(searchQuery);
        setResults(items);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const debounce = setTimeout(() => {
      search(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, search]);

  const handleSelect = (item: InventoryItem) => {
    setQuery(item.name);
    setResults([]);
    setIsOpen(false);
    onResultSelect?.(item);
  };

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          type="search"
          inputMode="search"
          enterKeyHint="search"
          autoComplete="off"
          placeholder="Buscar suministros..."
          aria-label="Buscar suministros"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-10 pr-10 h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl transition-all"
        />
        {query && !loading && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            aria-label="Limpiar búsqueda"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        )}
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && (query.length >= 2 || loading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border rounded-xl shadow-2xl max-h-80 overflow-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-xs font-medium uppercase tracking-widest">
                Buscando...
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">No se encontraron resultados</p>
            </div>
          ) : (
            <ul className="p-1">
              {results.map((item) => {
                const stockInfo = formatStockStatus(
                  item.stock_quantity,
                  item.min_stock,
                );

                const badgeVariant:
                  | 'destructive'
                  | 'warning'
                  | 'success'
                  | 'secondary' = stockInfo.color.includes('red')
                  ? 'destructive'
                  : stockInfo.color.includes('amber')
                    ? 'warning'
                    : stockInfo.color.includes('green')
                      ? 'success'
                      : 'secondary';

                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="w-full p-3 text-left hover:bg-accent/50 rounded-lg transition-colors group/item"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate group-hover/item:text-primary transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider truncate">
                            {item.category?.name} • {item.location?.full_path}
                          </div>
                        </div>
                        <Badge
                          variant={badgeVariant}
                          className="text-[9px] px-1.5 py-0 h-4 uppercase tracking-tighter shrink-0"
                        >
                          {item.stock_quantity}
                        </Badge>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
