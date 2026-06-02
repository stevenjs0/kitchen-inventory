import { getAllInventoryItems } from '@/lib/actions/inventory.actions';
import { getAllCategories } from '@/lib/actions/categories.actions';
import { getAllRooms } from '@/lib/actions/rooms.actions';
import { InventoryContainer } from '@/features/inventory/infrastructure/ui/inventory-container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function InventoryPage() {
  const [items, categories, rooms] = await Promise.all([
    getAllInventoryItems(),
    getAllCategories(),
    getAllRooms(),
  ]);

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="flex justify-between items-end pb-2 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
      <p className="text-muted-foreground text-sm">
        Gestiona los suministros de tu hogar
      </p>
        </div>
        <div className="flex gap-2">
          <Link href="/inventory/new">
            <Button
              size="sm"
              className="rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <Plus className="mr-2 h-4 w-4" /> Nuevo
            </Button>
          </Link>
        </div>
      </header>

      <InventoryContainer initialItems={items} categories={categories} rooms={rooms} />
    </div>
  );
}
