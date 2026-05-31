'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRoom } from '@/lib/actions/rooms.actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { ROOM_ICON_OPTIONS } from '@/features/rooms/domain/constants';
import { Home, ChefHat, Bath, WashingMachine, Wrench, Warehouse, Bed, Sofa, Car, ShowerHead, Baby, BookOpen, MapPin } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, ChefHat, Bath, WashingMachine, Wrench, Warehouse, Bed, Sofa, Car, ShowerHead, Baby, BookOpen, MapPin,
};

export function RoomForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Home',
    color: '#6B7280',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createRoom(formData);
      if (result.success) {
        toast.success('Ambiente creado correctamente');
        router.push('/rooms');
      } else {
        toast.error(result.error || 'Error al crear el ambiente');
      }
    } catch {
      toast.error('Error inesperado al crear el ambiente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-none bg-transparent">
      <form onSubmit={handleSubmit}>
        <CardHeader className="px-0 pt-0">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/rooms">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <CardTitle className="text-xl font-bold">Nuevo Ambiente</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-0 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder="Ej. Cocina, Baño, Garaje..."
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={loading}
              className="h-11 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción (Opcional)</Label>
            <Textarea
              id="description"
              placeholder="Breve descripción del ambiente..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
              className="bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-xl min-h-25"
            />
          </div>

          <div className="space-y-2">
            <Label>Ícono</Label>
            <div className="flex flex-wrap gap-2">
              {ROOM_ICON_OPTIONS.map((iconName) => {
                const IconComponent = ICON_MAP[iconName];
                if (!IconComponent) return null;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-2.5 rounded-xl transition-all ${
                      formData.icon === iconName
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color distintivo</Label>
            <div className="flex gap-3 items-center">
              <input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                disabled={loading}
                className="h-10 w-20 rounded cursor-pointer bg-transparent"
              />
              <span className="text-xs text-muted-foreground font-mono uppercase">
                {formData.color}
              </span>
            </div>
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
                Guardar Ambiente
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
