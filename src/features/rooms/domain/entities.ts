export interface Room {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

export interface CreateRoomDTO {
  name: string;
  description?: string;
  icon: string;
  color?: string;
}

export interface UpdateRoomDTO {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
}
