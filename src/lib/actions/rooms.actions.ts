'use server';

import { revalidatePath } from 'next/cache';
import { getRoomsService } from '@/lib/composition';

export async function getAllRooms() {
  const service = await getRoomsService();
  return await service.getAllRooms();
}

export async function createRoom(data: {
  name: string;
  description?: string;
  icon: string;
  color?: string;
}) {
  const service = await getRoomsService();
  const result = await service.createRoom(data);

  if (result.success) {
    revalidatePath('/rooms');
    revalidatePath('/inventory');
  }

  return result;
}

export async function deleteRoom(id: string) {
  const service = await getRoomsService();
  const result = await service.deleteRoom(id);

  if (result.success) {
    revalidatePath('/rooms');
    revalidatePath('/inventory');
  }

  return result;
}
