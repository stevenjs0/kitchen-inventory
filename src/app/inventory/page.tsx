import { getAllInventoryItems } from '@/lib/actions/inventory.actions';
import { getAllCategories } from '@/lib/actions/categories.actions';
import { getAllRooms } from '@/lib/actions/rooms.actions';
import { InventoryContainer } from '@/features/inventory/infrastructure/ui/inventory-container';

// Filters live in the URL and are applied client-side over the items
// fetched here, so the page itself does not need to read searchParams.
// Keeping this page statically renderable and avoiding a re-fetch on
// every filter toggle (which was causing perceptible mobile lag).
export default async function InventoryPage() {
  const [items, categories, rooms] = await Promise.all([
    getAllInventoryItems(),
    getAllCategories(),
    getAllRooms(),
  ]);

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="pb-2 border-b">
        <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
        <p className="text-muted-foreground text-sm">
          Gestiona los suministros de tu hogar
        </p>
      </header>

      <InventoryContainer
        initialItems={items}
        categories={categories}
        rooms={rooms}
      />
    </div>
  );
}
