import { LocationRepository } from "@/features/locations/domain/ports";
import {
  Location,
  CreateLocationDTO,
  UpdateLocationDTO,
} from "@/features/locations/domain/entities";
import { SupabaseLocationRepository } from "@/features/locations/infrastructure/repositories/supabase-locations.repository";
import { createClient } from "@/lib/supabase/server";

export class LocationsService {
  constructor(
    private repository: LocationRepository,
    private currentUserName?: string,
  ) {}

  async createLocation(
    data: CreateLocationDTO
  ): Promise<{ success: boolean; data?: Location; error?: string }> {
    if (!data.name || data.name.trim().length === 0) {
      return { success: false, error: "El nombre es requerido" };
    }

    if (!data.section || data.section.trim().length === 0) {
      return { success: false, error: "La sección es requerida" };
    }

    try {
      const location = await this.repository.create(data, {
        createdBy: this.currentUserName,
        updatedBy: this.currentUserName,
      });
      return { success: true, data: location };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Error al crear ubicación",
      };
    }
  }

  async updateLocation(
    id: string,
    data: UpdateLocationDTO
  ): Promise<{ success: boolean; data?: Location; error?: string }> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      return { success: false, error: "Ubicación no encontrada" };
    }

    try {
      const location = await this.repository.update(id, data, {
        updatedBy: this.currentUserName,
      });
      return { success: true, data: location };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Error al actualizar ubicación",
      };
    }
  }

  async deleteLocation(
    id: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.repository.delete(id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Error al eliminar ubicación",
      };
    }
  }

  async getAllLocations(): Promise<Location[]> {
    return await this.repository.findAll();
  }

  async getLocationById(id: string): Promise<Location | null> {
    return await this.repository.findById(id);
  }

  async getLocationsBySection(section: string): Promise<Location[]> {
    return await this.repository.findBySection(section);
  }
}

export async function getLocationsService(): Promise<LocationsService> {
  const client = await createClient();
  const { data: { user } } = await client.auth.getUser();
  const userName = user?.user_metadata?.full_name || user?.email || undefined;
  const repository = new SupabaseLocationRepository(client);
  return new LocationsService(repository, userName);
}
