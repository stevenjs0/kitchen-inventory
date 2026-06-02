import { getAllCategories } from '@/lib/actions/categories.actions';
import { getLocationsTree } from '@/lib/actions/locations.actions';
import { getAllRooms } from '@/lib/actions/rooms.actions';
import { createInventoryItem } from '@/lib/actions/inventory.actions';
import { CreateInventoryItemDTO } from '@/features/inventory/domain/entities';
import { ItemForm } from '@/features/inventory/infrastructure/ui/item-form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function NewInventoryItemPage() {
  const [categories, locations, rooms] = await Promise.all([
    getAllCategories(),
    getLocationsTree(),
    getAllRooms(),
  ]);

  const handleCreate = async (data: CreateInventoryItemDTO) => {
    'use server';
    await createInventoryItem(data);
    redirect('/inventory');
  };

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="space-y-4">
        <Link href="/inventory">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Volver al Inventario
          </Button>
        </Link>
        <div className="pb-2 border-b">
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Item</h1>
          <p className="text-muted-foreground text-sm">
            Registra un nuevo producto o ingrediente
          </p>
        </div>
      </header>

      <main className="bg-card/50 backdrop-blur-sm rounded-xl border p-6 shadow-sm">
        <ItemForm
          categories={categories}
          locations={locations}
          rooms={rooms}
          onSubmit={handleCreate}
        />
      </main>
    </div>
  );
}
