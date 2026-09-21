"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLocation, deleteLocation } from "@/lib/actions/locations.actions";
import { Room } from "@/features/rooms/domain/entities";
import { RoomSelect } from "@/features/rooms/infrastructure/ui/room-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ChevronLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
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
} from "@/components/ui/alert-dialog";

interface LocationFormProps {
  rooms: Room[];
  locationId?: string;
  locationName?: string;
}

export function LocationForm({ rooms, locationId, locationName }: LocationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    section: "",
    side: "",
    position: "",
    level: "",
    room_id: rooms[0]?.id ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
    const result = await createLocation({
      ...formData,
      side: formData.side || undefined,
      position: formData.position || undefined,
      name: `${formData.section} ${formData.side} ${formData.position} ${formData.level}`.trim(),
    });

      if (result.success) {
        toast.success("Ubicación creada correctamente");
        router.push("/locations");
      } else {
        toast.error(result.error || "Error al crear la ubicación");
      }
    } catch {
      toast.error("Error inesperado al crear la ubicación");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!locationId) return;
    setDeleting(true);
    try {
      const result = await deleteLocation(locationId);
      if (result.success) {
        toast.success("Ubicación eliminada correctamente");
        router.push("/locations");
      } else {
        toast.error(result.error || "Error al eliminar la ubicación");
      }
    } catch {
      toast.error("Error inesperado al eliminar la ubicación");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <form onSubmit={handleSubmit}>
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Link href="/locations">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <CardTitle className="text-xl font-bold">
                {locationId ? "Editar Ubicación" : "Nueva Ubicación"}
              </CardTitle>
            </div>
            {locationId && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent size="sm">
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar ubicación?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción eliminará la ubicación {locationName}. Esta operación no se puede deshacer.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={deleting}
                    >
                      {deleting ? "Eliminando..." : "Eliminar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
        <div className="space-y-2">
          <Label>Ambiente</Label>
          <RoomSelect
            rooms={rooms}
            selectedId={formData.room_id}
            onSelect={(room) => setFormData({ ...formData, room_id: room.id })}
          />
        </div>

        <div className="space-y-2">
            <Label htmlFor="section">Sección / Mueble</Label>
            <Input
              id="section"
              placeholder="Ej. Alacena, Heladera, Condimentero"
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              required
              disabled={loading}
              className="h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="side">Lado / Orientación</Label>
              <Input
                id="side"
                placeholder="Ej. Izquierda, Derecha"
                value={formData.side}
                onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                disabled={loading}
                className="h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Posición</Label>
              <Input
                id="position"
                placeholder="Ej. Arriba, Abajo, Centro"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                disabled={loading}
                className="h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Nivel / Estante</Label>
            <Input
              id="level"
              placeholder="Ej. Primer Nivel, Cajón Superior"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              required
              disabled={loading}
              className="h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
            />
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">Vista previa de ruta:</p>
            <p className="text-sm font-semibold italic">
              {formData.section || "?"} → {formData.side || "?"} → {formData.position || "?"} → {formData.level || "?"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="px-0 pt-6">
          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 active:scale-[0.98]"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Guardar Ubicación
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
