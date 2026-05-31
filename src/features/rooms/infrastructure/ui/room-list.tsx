'use client';

import { Room } from '@/features/rooms/domain/entities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Trash2, Home, ChefHat, Bath, WashingMachine, Wrench, Warehouse, Bed, Sofa, Car, ShowerHead, Baby, BookOpen } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, ChefHat, Bath, WashingMachine, Wrench, Warehouse, Bed, Sofa, Car, ShowerHead, Baby, BookOpen, MapPin,
};

interface RoomListProps {
  rooms: Room[];
  onDelete?: (id: string) => void;
}

export function RoomList({ rooms, onDelete }: RoomListProps) {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
        <p>No hay ambientes definidos</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => {
        const IconComponent = ICON_MAP[room.icon] || MapPin;

        return (
          <Card key={room.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
            <div
              className="h-1.5 w-full opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: room.color || '#6B7280' }}
            />
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent
                    className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"
                  />
                  <h3 className="font-bold text-sm group-hover:text-primary transition-colors tracking-tight">
                    {room.name}
                  </h3>
                </div>
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                    onClick={() => onDelete(room.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {room.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {room.description}
                </p>
              )}
              {room.updated_by && (
                <p className="text-[10px] text-muted-foreground/60 pt-1">
                  Últ. modificación por {room.updated_by}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
