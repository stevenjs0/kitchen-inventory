import { SupabaseClient } from "@supabase/supabase-js";
import {
  Location,
  CreateLocationDTO,
  UpdateLocationDTO,
} from "@/features/locations/domain/entities";
import { LocationRepository } from "@/features/locations/domain/ports";

interface LocationDB {
  id: string;
  name: string;
  section: string;
  side?: string | null;
  position?: string | null;
  level: string;
  full_path?: string;
  created_at: string;
}

export class SupabaseLocationRepository implements LocationRepository {
  constructor(private db: SupabaseClient) {}

  private toEntity(data: LocationDB): Location {
    return {
      id: data.id,
      name: data.name,
      section: data.section,
      side: data.side ?? undefined,
      position: data.position ?? undefined,
      level: data.level,
      full_path: data.full_path ?? "",
      created_at: new Date(data.created_at),
    };
  }

  async findById(id: string): Promise<Location | null> {
    const { data, error } = await this.db
      .from("locations")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return this.toEntity(data);
  }

  async findAll(): Promise<Location[]> {
    const { data } = await this.db
      .from("locations")
      .select("*")
      .order("section", { ascending: true })
      .order("level", { ascending: true });

    return data ? data.map((item) => this.toEntity(item)) : [];
  }

  async create(data: CreateLocationDTO): Promise<Location> {
    const { data: result, error } = await this.db
      .from("locations")
      .insert(data)
      .select("*")
      .single();

    if (error) throw error;
    return this.toEntity(result);
  }

  async update(id: string, data: UpdateLocationDTO): Promise<Location> {
    const { data: result, error } = await this.db
      .from("locations")
      .update(data)
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return this.toEntity(result);
  }

  async delete(id: string): Promise<void> {
    await this.db.from("locations").delete().eq("id", id);
  }

  async findBySection(section: string): Promise<Location[]> {
    const { data } = await this.db
      .from("locations")
      .select("*")
      .eq("section", section)
      .order("level", { ascending: true });

    return data ? data.map((item) => this.toEntity(item)) : [];
  }
}
