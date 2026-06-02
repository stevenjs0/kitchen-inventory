import { RoomRepository } from '@/features/rooms/domain/ports';
import {
    Room,
    CreateRoomDTO,
    UpdateRoomDTO,
} from '@/features/rooms/domain/entities';

export class RoomsService {
  constructor(
    private repository: RoomRepository,
    private currentUserName?: string,
  ) {}

  async createRoom(
    data: CreateRoomDTO,
  ): Promise<{ success: boolean; data?: Room; error?: string }> {
    if (!data.name || data.name.trim().length === 0) {
      return { success: false, error: 'El nombre es requerido' };
    }

    const existing = await this.repository.findByName(data.name);
    if (existing) {
      return { success: false, error: 'Ya existe un ambiente con ese nombre' };
    }

    try {
      const room = await this.repository.create(data, {
        createdBy: this.currentUserName,
        updatedBy: this.currentUserName,
      });
      return { success: true, data: room };
    } catch (error) {
      console.error('Error creating room:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Error al crear ambiente',
      };
    }
  }

  async updateRoom(
    id: string,
    data: UpdateRoomDTO,
  ): Promise<{ success: boolean; data?: Room; error?: string }> {
    const existing = await this.repository.findById(id);

    if (!existing) {
      return { success: false, error: 'Ambiente no encontrado' };
    }

    if (data.name) {
      const nameExists = await this.repository.findByName(data.name);
      if (nameExists && nameExists.id !== id) {
        return {
          success: false,
          error: 'Ya existe un ambiente con ese nombre',
        };
      }
    }

    try {
      const room = await this.repository.update(id, data, {
        updatedBy: this.currentUserName,
      });
      return { success: true, data: room };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Error al actualizar ambiente',
      };
    }
  }

  async deleteRoom(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.repository.delete(id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Error al eliminar ambiente',
      };
    }
  }

  async getAllRooms(): Promise<Room[]> {
    return await this.repository.findAll();
  }

  async getRoomById(id: string): Promise<Room | null> {
    return await this.repository.findById(id);
  }
}
