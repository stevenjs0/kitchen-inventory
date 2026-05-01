'use client';

import { Category } from '@/features/categories/domain/entities';
import { cn } from '@/lib/utils';
import { Tag } from 'lucide-react';

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
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1.5',
              selectedId === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80',
            )}
            style={{
              backgroundColor:
                selectedId === category.id ? undefined : category.color,
              color: selectedId === category.id ? undefined : 'white',
            }}
          >
            <Tag className="h-3.5 w-3.5" />
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
          className="px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 text-white"
          style={{ backgroundColor: category.color }}
        >
          <Tag className="h-3.5 w-3.5" />
          {category.name}
        </div>
      ))}
    </div>
  );
}
