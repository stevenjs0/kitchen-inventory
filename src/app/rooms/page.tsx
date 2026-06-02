import { getAllRooms } from '@/lib/actions/rooms.actions';
import { RoomList } from '@/features/rooms/infrastructure/ui/room-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function RoomsPage() {
  const rooms = await getAllRooms();

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="flex justify-between items-end pb-2 border-b">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ambientes</h1>
          <p className="text-muted-foreground text-sm">Organiza los espacios de tu hogar</p>
        </div>
        <Link href="/rooms/new">
          <Button size="sm" className="rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Ambiente
          </Button>
        </Link>
      </header>

      <main className="bg-card/50 backdrop-blur-sm rounded-xl border p-4 shadow-sm">
        <RoomList rooms={rooms} />
      </main>
    </div>
  );
}
