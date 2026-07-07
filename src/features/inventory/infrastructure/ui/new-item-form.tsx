'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ItemForm } from './item-form';
import {
  CreateInventoryItemDTO,
  InventoryItem,
} from '@/features/inventory/domain/entities';
import { Category } from '@/features/categories/domain/entities';
import { Location } from '@/features/locations/domain/entities';
import { Room } from '@/features/rooms/domain/entities';

interface NewItemFormProps {
  categories: Category[];
  locations: Location[];
  rooms: Room[];
  createAction: (data: CreateInventoryItemDTO) => Promise<{ success: boolean; data?: InventoryItem; error?: string }>;
}

function safeDecodeFrom(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value);
    if (!decoded.startsWith('/') || decoded.startsWith('//')) return null;
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Client-side wrapper for creating an item.
 * - Calls the server action (which must NOT redirect).
 * - Shows a toast on success/failure.
 * - On success, returns the user to the page they came from, preferring:
 *   1. The `?from=...` query param (set by the page that linked to /new).
 *   2. `router.back()` if there is browser history.
 *   3. `/inventory` as a final fallback.
 */
export function NewItemForm({
  categories,
  locations,
  rooms,
  createAction,
}: NewItemFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromUrl = safeDecodeFrom(searchParams.get('from'));

  const handleAfterSave = () => {
    if (fromUrl) {
      router.push(fromUrl);
    } else if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/inventory');
    }
  };

  const handleSubmit = async (data: CreateInventoryItemDTO) => {
    const result = await createAction(data);
    if (result.success) {
      handleAfterSave();
    }
    return { success: result.success, error: result.error };
  };

  const handleCancel = handleAfterSave;

  return (
    <ItemForm
      categories={categories}
      locations={locations}
      rooms={rooms}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      successMessage="Item creado"
    />
  );
}
