import { createClient } from "@/lib/supabase/server";
import { InventoryService } from "@/features/inventory/application/services/inventory.service";
import { CategoriesService } from "@/features/categories/application/services/categories.service";
import { LocationsService } from "@/features/locations/application/services/locations.service";
import { RoomsService } from "@/features/rooms/application/services/rooms.service";
import { SupabaseInventoryRepository } from "@/features/inventory/infrastructure/repositories/supabase-inventory.repository";
import { SupabaseCategoryRepository } from "@/features/categories/infrastructure/repositories/supabase-categories.repository";
import { SupabaseLocationRepository } from "@/features/locations/infrastructure/repositories/supabase-locations.repository";
import { SupabaseRoomRepository } from "@/features/rooms/infrastructure/repositories/supabase-rooms.repository";

async function getUserName() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  return user?.user_metadata?.full_name || user?.email || undefined;
}

export async function getInventoryService() {
  const client = await createClient();
  const userName = await getUserName();
  const repository = new SupabaseInventoryRepository(client);
  return new InventoryService(repository, userName);
}

export async function getCategoriesService() {
  const client = await createClient();
  const userName = await getUserName();
  const repository = new SupabaseCategoryRepository(client);
  return new CategoriesService(repository, userName);
}

export async function getLocationsService() {
  const client = await createClient();
  const userName = await getUserName();
  const repository = new SupabaseLocationRepository(client);
  return new LocationsService(repository, userName);
}

export async function getRoomsService() {
  const client = await createClient();
  const userName = await getUserName();
  const repository = new SupabaseRoomRepository(client);
  return new RoomsService(repository, userName);
}
