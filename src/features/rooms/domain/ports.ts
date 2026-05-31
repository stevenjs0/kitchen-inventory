import { Room, CreateRoomDTO, UpdateRoomDTO } from "./entities";

export interface MutationContext {
  createdBy?: string;
  updatedBy?: string;
}

export interface RoomRepository {
  findById(id: string): Promise<Room | null>;
  findAll(): Promise<Room[]>;
  create(data: CreateRoomDTO, ctx?: MutationContext): Promise<Room>;
  update(id: string, data: UpdateRoomDTO, ctx?: MutationContext): Promise<Room>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Room | null>;
}
