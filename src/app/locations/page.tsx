import { getLocationsTree } from '@/lib/actions/locations.actions';
import { LocationTree } from '@/features/locations/infrastructure/ui/location-tree';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function LocationsPage() {
  const locations = await getLocationsTree();

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-6xl">
      <header className="flex justify-between items-end pb-2 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ubicaciones</h1>
          <p className="text-muted-foreground text-sm">
            Organiza tus espacios de almacenamiento
          </p>
        </div>
        <Link href="/locations/new">
          <Button
            size="sm"
            className="rounded-full shadow-sm hover:shadow-md transition-shadow"
          >
            <Plus className="mr-2 h-4 w-4" /> Nueva Ubicación
          </Button>
        </Link>
      </header>

      <main className="bg-card/50 backdrop-blur-sm rounded-xl border p-4 shadow-sm">
        <LocationTree locations={locations} />
      </main>
    </div>
  );
}
