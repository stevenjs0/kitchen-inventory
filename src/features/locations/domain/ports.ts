import { Location, CreateLocationDTO, UpdateLocationDTO } from "./entities";

export interface MutationContext {
  /** Display name del usuario actual (se persiste en created_by). */
  createdBy?: string;
  /** Display name del usuario actual (se persiste en updated_by). */
  updatedBy?: string;
  /** UID del usuario autenticado (se persiste en created_by_uid / updated_by_uid). */
  userId?: string;
}

export interface LocationRepository {
  findById(id: string): Promise<Location | null>;
  findAll(): Promise<Location[]>;
  create(data: CreateLocationDTO, ctx?: MutationContext): Promise<Location>;
  update(id: string, data: UpdateLocationDTO, ctx?: MutationContext): Promise<Location>;
  delete(id: string): Promise<void>;
  findByName(name: string, roomId?: string): Promise<Location | null>;
  findBySection(section: string): Promise<Location[]>;
  findByRoomId(roomId: string): Promise<Location[]>;
}
