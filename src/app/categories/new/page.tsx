import { CategoryForm } from "@/features/categories/infrastructure/ui/category-form";

export default function NewCategoryPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <CategoryForm />
    </div>
  );
}
