import { Room, CreateRoomDTO, UpdateRoomDTO } from "./entities";

export interface MutationContext {
  /** Display name del usuario actual (se persiste en created_by). */
  createdBy?: string;
  /** Display name del usuario actual (se persiste en updated_by). */
  updatedBy?: string;
  /** UID del usuario autenticado (se persiste en created_by_uid / updated_by_uid). */
  userId?: string;
}

export interface RoomRepository {
  findById(id: string): Promise<Room | null>;
  findAll(): Promise<Room[]>;
  create(data: CreateRoomDTO, ctx?: MutationContext): Promise<Room>;
  update(id: string, data: UpdateRoomDTO, ctx?: MutationContext): Promise<Room>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Room | null>;
}
