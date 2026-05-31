import { RoomForm } from "@/features/rooms/infrastructure/ui/room-form";

export default function NewRoomPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <RoomForm />
    </div>
  );
}
