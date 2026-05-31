import { Room } from "@/features/rooms/domain/entities";

export interface Location {
  id: string;
  name: string;
  section: string;
  side?: string;
  position?: string;
  level: string;
  full_path: string;
  room_id: string;
  room?: Room;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

export interface CreateLocationDTO {
  name: string;
  section: string;
  side?: string;
  position?: string;
  level: string;
  room_id: string;
}

export interface UpdateLocationDTO {
  name?: string;
  section?: string;
  side?: string;
  position?: string;
  level?: string;
  room_id?: string;
}

export interface LocationTree {
  section: string;
  locations: Location[];
}
