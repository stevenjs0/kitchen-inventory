import { LocationForm } from "@/features/locations/infrastructure/ui/location-form";
import { getAllRooms } from "@/lib/actions/rooms.actions";

export default async function NewLocationPage() {
  const rooms = await getAllRooms();

  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <LocationForm rooms={rooms} />
    </div>
  );
}
