import { RoomForm } from "@/features/rooms/infrastructure/ui/room-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NewRoomPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <header className="space-y-4">
        <Link href="/rooms">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Volver a Ambientes
          </Button>
        </Link>
        <div className="pb-2 border-b">
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Ambiente</h1>
          <p className="text-muted-foreground text-sm">
            Define un nuevo espacio en tu hogar
          </p>
        </div>
      </header>

      <main className="bg-card/50 backdrop-blur-sm rounded-xl border p-6 shadow-sm">
        <RoomForm />
      </main>
    </div>
  );
}
