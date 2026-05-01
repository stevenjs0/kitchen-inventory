"use client";

import { Category } from "@/features/categories/domain/entities";
import { cn } from "@/lib/utils";

interface CategorySelectProps {
  categories: Category[];
  selectedId?: string;
  onSelect?: (category: Category) => void;
  multiple?: boolean;
}

export function CategorySelect({
  categories,
  selectedId,
  onSelect,
  multiple = false,
}: CategorySelectProps) {
  if (!multiple && onSelect) {
    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              selectedId === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            )}
            style={{
              backgroundColor:
                selectedId === category.id ? undefined : category.color,
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-secondary"
          style={{ backgroundColor: category.color }}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
}
