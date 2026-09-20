'use client';

import { Location } from '@/features/locations/domain/entities';
import { cn } from '@/lib/utils';
import { MapPin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteLocation } from '@/lib/actions/locations.actions';
import { toast } from 'sonner';
import { useTransition } from 'react';

interface LocationTreeProps {
  locations: Location[];
  onLocationSelect?: (location: Location) => void;
}

export function LocationTree({
  locations,
  onLocationSelect,
}: LocationTreeProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (!confirm(`¿Estás seguro de que deseas eliminar la ubicación "${name}"?`)) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteLocation(id);
        if (result.success) {
          toast.success('Ubicación eliminada correctamente');
        } else {
          toast.error(result.error || 'Error al eliminar la ubicación');
        }
      } catch (error) {
        toast.error('Error inesperado al eliminar la ubicación');
      }
    });
  };

  const groupedBySection = locations.reduce(
    (acc, loc) => {
      if (!acc[loc.section]) {
        acc[loc.section] = [];
      }
      acc[loc.section].push(loc);
      return acc;
    },
    {} as Record<string, Location[]>,
  );

  return (
    <div className="space-y-8">
      {Object.entries(groupedBySection).map(([section, sectionLocations]) => (
        <div key={section} className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" /> {section}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
            {sectionLocations.map((location) => (
              <button
                key={location.id}
                onClick={() => onLocationSelect?.(location)}
                className={cn(
                  'group p-4 bg-background border rounded-xl text-left hover:border-primary hover:shadow-md transition-all',
                  onLocationSelect ? 'cursor-pointer' : 'cursor-default',
                )}
              >
                <div className="flex items-center gap-2 mb-1 group/title">
                  <MapPin className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="font-semibold text-sm group-hover:text-primary transition-colors flex-1">
                    {location.name}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0 opacity-0 group-hover/title:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                    onClick={(e) => handleDelete(e, location.id, location.name)}
                    disabled={isPending}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                </div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-2">
                  {location.side && <span>{location.side}</span>}
                  {location.position && <span>• {location.position}</span>}
                  <span className="px-1.5 py-0.5 rounded bg-muted text-primary ml-auto">
                    {location.level}
                  </span>
                </div>
                {location.updated_by && (
                  <div className="text-[9px] text-muted-foreground/50 mt-1">
                    por {location.updated_by}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
