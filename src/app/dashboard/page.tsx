import { getAllInventoryItems } from '@/lib/actions/inventory.actions';
import { getAllRooms } from '@/lib/actions/rooms.actions';
import { DashboardContainer } from '@/features/dashboard/infrastructure/ui/dashboard-container';

export default async function DashboardPage() {
  const [items, rooms] = await Promise.all([
    getAllInventoryItems(),
    getAllRooms(),
  ]);

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-6xl">
      <header className="pb-2 border-b">
        <h1 className="text-3xl font-bold tracking-tight">Resumen</h1>
        <p className="text-muted-foreground text-sm">
          Visualiza tu inventario de forma gráfica
        </p>
      </header>

      <DashboardContainer initialItems={items} rooms={rooms} />
    </div>
  );
}