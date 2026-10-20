import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "./entities";

export interface MutationContext {
  /** Display name del usuario actual (se persiste en created_by). */
  createdBy?: string;
  /** Display name del usuario actual (se persiste en updated_by). */
  updatedBy?: string;
  /** UID del usuario autenticado (se persiste en created_by_uid / updated_by_uid). */
  userId?: string;
}

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(data: CreateCategoryDTO, ctx?: MutationContext): Promise<Category>;
  update(id: string, data: UpdateCategoryDTO, ctx?: MutationContext): Promise<Category>;
  delete(id: string): Promise<void>;
  findByName(name: string, roomId?: string): Promise<Category | null>;
  findByRoomId(roomId: string): Promise<Category[]>;
}
