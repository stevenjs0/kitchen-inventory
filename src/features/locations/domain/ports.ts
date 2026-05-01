import { Location, CreateLocationDTO, UpdateLocationDTO } from "./entities";

export interface LocationRepository {
  findById(id: string): Promise<Location | null>;
  findAll(): Promise<Location[]>;
  create(data: CreateLocationDTO): Promise<Location>;
  update(id: string, data: UpdateLocationDTO): Promise<Location>;
  delete(id: string): Promise<void>;
  findBySection(section: string): Promise<Location[]>;
}
