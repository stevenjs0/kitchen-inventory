import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "./entities";

export interface MutationContext {
  createdBy?: string;
  updatedBy?: string;
}

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(data: CreateCategoryDTO, ctx?: MutationContext): Promise<Category>;
  update(id: string, data: UpdateCategoryDTO, ctx?: MutationContext): Promise<Category>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Category | null>;
  findByRoomId(roomId: string): Promise<Category[]>;
}
