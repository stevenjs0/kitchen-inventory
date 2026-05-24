import { Category } from "@/features/categories/domain/entities";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
        <p>No hay categorías definidas</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
          <div 
            className="h-1.5 w-full opacity-70 group-hover:opacity-100 transition-opacity" 
            style={{ backgroundColor: category.color || "#6B7280" }} 
          />
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <h3 className="font-bold text-sm group-hover:text-primary transition-colors tracking-tight">{category.name}</h3>
            </div>
            {category.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            )}
            {category.updated_by && (
              <p className="text-[10px] text-muted-foreground/60 pt-1">
                Últ. modificación por {category.updated_by}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
