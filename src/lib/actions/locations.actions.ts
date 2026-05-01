"use server";

import { revalidatePath } from "next/cache";
import { getLocationsService } from "@/features/locations/application/services/locations.service";

export async function createLocation(data: {
  name: string;
  section: string;
  side?: string;
  position?: string;
  level: string;
}) {
  const service = await getLocationsService();
  const result = await service.createLocation(data);

  if (result.success) {
    revalidatePath("/locations");
    revalidatePath("/inventory");
  }

  return result;
}

export async function getLocationsTree() {
  const service = await getLocationsService();
  return await service.getAllLocations();
}

export async function deleteLocation(id: string) {
  const service = await getLocationsService();
  const result = await service.deleteLocation(id);

  if (result.success) {
    revalidatePath("/locations");
    revalidatePath("/inventory");
  }

  return result;
}
