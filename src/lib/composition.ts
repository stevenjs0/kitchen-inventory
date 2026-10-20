import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import { InventoryService } from "@/features/inventory/application/services/inventory.service";
import { CategoriesService } from "@/features/categories/application/services/categories.service";
import { LocationsService } from "@/features/locations/application/services/locations.service";
import { RoomsService } from "@/features/rooms/application/services/rooms.service";
import { SupabaseInventoryRepository } from "@/features/inventory/infrastructure/repositories/supabase-inventory.repository";
import { SupabaseCategoryRepository } from "@/features/categories/infrastructure/repositories/supabase-categories.repository";
import { SupabaseLocationRepository } from "@/features/locations/infrastructure/repositories/supabase-locations.repository";
import { SupabaseRoomRepository } from "@/features/rooms/infrastructure/repositories/supabase-rooms.repository";

/**
 * Identidad del usuario actual para auditoría:
 * - `displayName` → `created_by` / `updated_by` (lo que muestra la UI)
 * - `userId` (uid) → `created_by_uid` / `updated_by_uid`
 */
async function getAuditUser() {
  const user = await requireUser();
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email ||
    undefined;
  return { userId: user.id, displayName };
}

export async function getInventoryService() {
  const client = await createClient();
  const { userId, displayName } = await getAuditUser();
  const repository = new SupabaseInventoryRepository(client);
  return new InventoryService(repository, displayName, userId);
}

export async function getCategoriesService() {
  const client = await createClient();
  const { userId, displayName } = await getAuditUser();
  const repository = new SupabaseCategoryRepository(client);
  return new CategoriesService(repository, displayName, userId);
}

export async function getLocationsService() {
  const client = await createClient();
  const { userId, displayName } = await getAuditUser();
  const repository = new SupabaseLocationRepository(client);
  return new LocationsService(repository, displayName, userId);
}

export async function getRoomsService() {
  const client = await createClient();
  const { userId, displayName } = await getAuditUser();
  const repository = new SupabaseRoomRepository(client);
  return new RoomsService(repository, displayName, userId);
}
