import { SupabaseClient } from "@supabase/supabase-js";
import {
  Room,
  CreateRoomDTO,
  UpdateRoomDTO,
} from "@/features/rooms/domain/entities";
import {
  RoomRepository,
  MutationContext,
} from "@/features/rooms/domain/ports";

interface RoomDB {
  id: string;
  name: string;
  description?: string | null;
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
  created_by?: string | null;
  updated_by?: string | null;
}

export class SupabaseRoomRepository implements RoomRepository {
  constructor(private db: SupabaseClient) {}

  private toEntity(data: RoomDB): Room {
    return {
      id: data.id,
      name: data.name,
      description: data.description ?? undefined,
      icon: data.icon,
      color: data.color,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
      created_by: data.created_by ?? undefined,
      updated_by: data.updated_by ?? undefined,
    };
  }

  async findById(id: string): Promise<Room | null> {
    const { data, error } = await this.db
      .from("rooms")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return this.toEntity(data);
  }

  async findAll(): Promise<Room[]> {
    const { data } = await this.db
      .from("rooms")
      .select("*")
      .order("name", { ascending: true });

    return data ? data.map((item) => this.toEntity(item)) : [];
  }

  async create(data: CreateRoomDTO, ctx?: MutationContext): Promise<Room> {
    const { data: result, error } = await this.db
      .from("rooms")
      .insert({
        ...data,
        created_by: ctx?.createdBy ?? ctx?.updatedBy ?? null,
        updated_by: ctx?.updatedBy ?? ctx?.createdBy ?? null,
      })
      .select("*")
      .single();

    if (error) throw error;
    return this.toEntity(result);
  }

  async update(id: string, data: UpdateRoomDTO, ctx?: MutationContext): Promise<Room> {
    const { data: result, error } = await this.db
      .from("rooms")
      .update({
        ...data,
        updated_at: new Date().toISOString(),
        updated_by: ctx?.updatedBy ?? null,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return this.toEntity(result);
  }

  async delete(id: string): Promise<void> {
    await this.db.from("rooms").delete().eq("id", id);
  }

  async findByName(name: string): Promise<Room | null> {
    const { data } = await this.db
      .from("rooms")
      .select("*")
      .eq("name", name)
      .single();

    if (!data) return null;
    return this.toEntity(data);
  }
}
