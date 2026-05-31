import { CategoryForm } from "@/features/categories/infrastructure/ui/category-form";
import { getAllRooms } from "@/lib/actions/rooms.actions";

export default async function NewCategoryPage() {
  const rooms = await getAllRooms();

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <CategoryForm rooms={rooms} />
    </div>
  );
}
