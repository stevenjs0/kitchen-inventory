"use server";

import { revalidatePath } from "next/cache";
import { getCategoriesService } from "@/features/categories/application/services/categories.service";

export async function getAllCategories() {
  const service = await getCategoriesService();
  return await service.getAllCategories();
}

export async function createCategory(data: {
  name: string;
  description?: string;
  color?: string;
}) {
  const service = await getCategoriesService();
  const result = await service.createCategory(data);

  if (result.success) {
    revalidatePath("/categories");
    revalidatePath("/inventory");
  }

  return result;
}

export async function deleteCategory(id: string) {
  const service = await getCategoriesService();
  const result = await service.deleteCategory(id);

  if (result.success) {
    revalidatePath("/categories");
    revalidatePath("/inventory");
  }

  return result;
}
