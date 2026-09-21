'use client';

import { useState } from "react";
import { Location } from '@/features/locations/domain/entities';
import { cn } from '@/lib/utils';
import { MapPin, Trash2 } from 'lucide-react';
import { deleteLocation } from '@/lib/actions/locations.actions';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface LocationTreeProps {
  locations: Location[];
  onLocationSelect?: (location: Location) => void;
}

export function LocationTree({
  locations,
  onLocationSelect,
}: LocationTreeProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteLocation(id);
      if (result.success) {
        toast.success("Ubicación eliminada correctamente");
      } else {
        toast.error(result.error || "Error al eliminar la ubicación");
      }
    } catch (error) {
      toast.error("Error inesperado al eliminar la ubicación");
    } finally {
      setDeletingId(null);
    }
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
              <div key={location.id} className="group relative">
                <button
                  onClick={() => onLocationSelect?.(location)}
                  className={cn(
                    'w-full p-4 bg-background border rounded-xl text-left hover:border-primary hover:shadow-md transition-all',
                    onLocationSelect ? 'cursor-pointer' : 'cursor-default',
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {location.name}
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
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AlertDialog onOpenChange={(open) => !open && setDeletingId(null)}>
                    <AlertDialogTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingId(location.id);
                        }}
                        className="p-2 bg-background border rounded-lg text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar ubicación?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará la ubicación {location.name}. Esta operación no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(location.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
