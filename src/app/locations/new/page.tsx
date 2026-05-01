import { LocationForm } from "@/features/locations/infrastructure/ui/location-form";

export default function NewLocationPage() {
  return (
    <div className="container mx-auto p-4 space-y-8 pb-24 md:pb-8 max-w-2xl">
      <LocationForm />
    </div>
  );
}
