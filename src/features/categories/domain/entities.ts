import { Room } from "@/features/rooms/domain/entities";

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  room_id: string;
  room?: Room;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  color?: string;
  room_id: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  color?: string;
  room_id?: string;
}
