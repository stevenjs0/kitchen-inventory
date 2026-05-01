import { SupabaseClient } from "@supabase/supabase-js";
import {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/features/categories/domain/entities";
import { CategoryRepository } from "@/features/categories/domain/ports";

interface CategoryDB {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  created_at: string;
  updated_at: string;
}

export class SupabaseCategoryRepository implements CategoryRepository {
  constructor(private db: SupabaseClient) {}

  private toEntity(data: CategoryDB): Category {
    return {
      id: data.id,
      name: data.name,
      description: data.description ?? undefined,
      color: data.color ?? undefined,
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    };
  }

  async findById(id: string): Promise<Category | null> {
    const { data, error } = await this.db
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return null;
    return this.toEntity(data);
  }

  async findAll(): Promise<Category[]> {
    const { data } = await this.db
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    return data ? data.map((item) => this.toEntity(item)) : [];
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    const { data: result, error } = await this.db
      .from("categories")
      .insert(data)
      .select("*")
      .single();

    if (error) throw error;
    return this.toEntity(result);
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const { data: result, error } = await this.db
      .from("categories")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;
    return this.toEntity(result);
  }

  async delete(id: string): Promise<void> {
    await this.db.from("categories").delete().eq("id", id);
  }

  async findByName(name: string): Promise<Category | null> {
    const { data } = await this.db
      .from("categories")
      .select("*")
      .eq("name", name)
      .single();

    if (!data) return null;
    return this.toEntity(data);
  }
}
