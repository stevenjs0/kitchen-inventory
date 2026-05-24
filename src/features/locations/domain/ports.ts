import { Location, CreateLocationDTO, UpdateLocationDTO } from "./entities";

export interface MutationContext {
  createdBy?: string;
  updatedBy?: string;
}

export interface LocationRepository {
  findById(id: string): Promise<Location | null>;
  findAll(): Promise<Location[]>;
  create(data: CreateLocationDTO, ctx?: MutationContext): Promise<Location>;
  update(id: string, data: UpdateLocationDTO, ctx?: MutationContext): Promise<Location>;
  delete(id: string): Promise<void>;
  findBySection(section: string): Promise<Location[]>;
}
