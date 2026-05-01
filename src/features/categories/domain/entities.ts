export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  color?: string;
}
