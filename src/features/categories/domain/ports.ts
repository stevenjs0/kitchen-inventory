import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "./entities";

export interface CategoryRepository {
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
  create(data: CreateCategoryDTO): Promise<Category>;
  update(id: string, data: UpdateCategoryDTO): Promise<Category>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Category | null>;
}
