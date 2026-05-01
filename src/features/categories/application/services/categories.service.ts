import { CategoryRepository } from '@/features/categories/domain/ports';
import {
  Category,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '@/features/categories/domain/entities';
import { SupabaseCategoryRepository } from '@/features/categories/infrastructure/repositories/supabase-categories.repository';
import { createClient } from '@/lib/supabase/server';

export class CategoriesService {
  constructor(private repository: CategoryRepository) {
    this.repository = repository;
  }

  async createCategory(
    data: CreateCategoryDTO,
  ): Promise<{ success: boolean; data?: Category; error?: string }> {
    if (!data.name || data.name.trim().length === 0) {
      return { success: false, error: 'El nombre es requerido' };
    }

    const existing = await this.repository.findByName(data.name);
    if (existing) {
      return {
        success: false,
        error: 'Ya existe una categoría con ese nombre',
      };
    }

    try {
      const category = await this.repository.create(data);
      return { success: true, data: category };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Error al crear categoría',
      };
    }
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryDTO,
  ): Promise<{ success: boolean; data?: Category; error?: string }> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      return { success: false, error: 'Categoría no encontrada' };
    }

    if (data.name) {
      const nameExists = await this.repository.findByName(data.name);
      if (nameExists && nameExists.id !== id) {
        return {
          success: false,
          error: 'Ya existe una categoría con ese nombre',
        };
      }
    }

    try {
      const category = await this.repository.update(id, data);
      return { success: true, data: category };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al actualizar categoría',
      };
    }
  }

  async deleteCategory(
    id: string,
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await this.repository.delete(id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al eliminar categoría',
      };
    }
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.repository.findAll();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return await this.repository.findById(id);
  }
}

export async function getCategoriesService(): Promise<CategoriesService> {
  const client = await createClient();
  const repository = new SupabaseCategoryRepository(client);
  return new CategoriesService(repository);
}
