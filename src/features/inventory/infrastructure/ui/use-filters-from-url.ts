'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export type StockStatus = 'normal' | 'low' | 'out';

export interface InventoryFilters {
  q: string;
  room: string;
  categories: string[];
  stock: StockStatus[];
}

const VALID_STOCK: StockStatus[] = ['normal', 'low', 'out'];

function parseFilters(params: URLSearchParams): InventoryFilters {
  const stockRaw = params.get('stock');
  const stock = stockRaw
    ? (stockRaw
        .split(',')
        .filter((s): s is StockStatus => VALID_STOCK.includes(s as StockStatus)))
    : [];

  const categoriesRaw = params.get('categories');
  const categories = categoriesRaw ? categoriesRaw.split(',').filter(Boolean) : [];

  return {
    q: params.get('q') ?? '',
    room: params.get('room') ?? '',
    categories,
    stock,
  };
}

function buildQueryString(filters: InventoryFilters): string {
  const params = new URLSearchParams();

  if (filters.q) params.set('q', filters.q);
  if (filters.room) params.set('room', filters.room);
  if (filters.categories.length > 0) params.set('categories', filters.categories.join(','));
  if (filters.stock.length > 0) params.set('stock', filters.stock.join(','));

  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

const EMPTY_FILTERS: InventoryFilters = {
  q: '',
  room: '',
  categories: [],
  stock: [],
};

/**
 * Single source of truth for inventory filters.
 *
 * State lives in React (useState) and is initialized from the URL via
 * useSearchParams. The URL is kept in sync via `window.history.replaceState`
 * — NOT via `router.replace` — because in Next 16 App Router, `router.replace`
 * with a new query string invalidates the segment and re-runs the page's
 * Server Component (which re-fetches all inventory items from Supabase),
 * causing perceptible lag on mobile when toggling filters.
 *
 * Trade-offs vs. `router.replace`:
 *  - ✓ Filter toggles are instant (no server round-trip).
 *  - ✓ Typing in the search bar doesn't trigger a network call.
 *  - ✓ The URL is still shareable and survives reloads.
 *  - ✓ Back/forward navigation restores filters (handled via popstate).
 *  - ✗ The Server Component doesn't re-render — but since all filtering
 *    happens client-side on the items already in memory, that is fine.
 */
export function useFiltersFromUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFiltersState] = useState<InventoryFilters>(() =>
    parseFilters(new URLSearchParams(searchParams.toString())),
  );

  // Sync state when the user navigates back/forward.
  useEffect(() => {
    const onPopState = () => {
      setFiltersState(parseFilters(new URLSearchParams(window.location.search)));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Mirror state to the URL without triggering a navigation.
  const syncToUrl = useCallback(
    (next: InventoryFilters) => {
      if (typeof window === 'undefined') return;
      const qs = buildQueryString(next);
      const url = `${pathname}${qs}`;
      const current = window.location.pathname + window.location.search;
      if (current !== url) {
        window.history.replaceState(window.history.state, '', url);
      }
    },
    [pathname],
  );

  const setFilters = useCallback(
    (updater: InventoryFilters | ((prev: InventoryFilters) => InventoryFilters)) => {
      setFiltersState((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        syncToUrl(next);
        return next;
      });
    },
    [syncToUrl],
  );

  const clearFilters = useCallback(() => {
    setFiltersState(EMPTY_FILTERS);
    syncToUrl(EMPTY_FILTERS);
  }, [syncToUrl]);

  const toggleCategory = useCallback(
    (id: string) => {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.includes(id)
          ? prev.categories.filter((c) => c !== id)
          : [...prev.categories, id],
      }));
    },
    [setFilters],
  );

  const toggleStockStatus = useCallback(
    (status: StockStatus) => {
      setFilters((prev) => ({
        ...prev,
        stock: prev.stock.includes(status)
          ? prev.stock.filter((s) => s !== status)
          : [...prev.stock, status],
      }));
    },
    [setFilters],
  );

  const setRoom = useCallback(
    (roomId: string) => {
      setFilters((prev) => ({ ...prev, room: prev.room === roomId ? '' : roomId }));
    },
    [setFilters],
  );

  const setQuery = useCallback(
    (q: string) => {
      setFilters((prev) => ({ ...prev, q }));
    },
    [setFilters],
  );

  const activeFiltersCount =
    filters.categories.length + filters.stock.length + (filters.room ? 1 : 0);

  return {
    filters,
    setFilters,
    setQuery,
    setRoom,
    toggleCategory,
    toggleStockStatus,
    clearFilters,
    activeFiltersCount,
  };
}
