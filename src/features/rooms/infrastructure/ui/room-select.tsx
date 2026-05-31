'use client';

import { Room } from '@/features/rooms/domain/entities';
import { cn } from '@/lib/utils';
import { MapPin, Home, ChefHat, Bath, WashingMachine, Wrench, Warehouse, Bed, Sofa, Car, ShowerHead, Baby, BookOpen } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, ChefHat, Bath, WashingMachine, Wrench, Warehouse, Bed, Sofa, Car, ShowerHead, Baby, BookOpen, MapPin,
};

interface RoomSelectProps {
  rooms: Room[];
  selectedId?: string;
  onSelect?: (room: Room) => void;
}

export function RoomSelect({
  rooms,
  selectedId,
  onSelect,
}: RoomSelectProps) {
  if (!onSelect) {
    return (
      <div className="flex flex-wrap gap-2">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 text-white"
            style={{ backgroundColor: room.color }}
          >
            <MapPin className="h-3.5 w-3.5" />
            {room.name}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {rooms.map((room) => {
        const IconComponent = ICON_MAP[room.icon] || MapPin;

        return (
          <button
            key={room.id}
            onClick={() => onSelect(room)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1.5',
              selectedId === room.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80',
            )}
            style={
              selectedId === room.id
                ? undefined
                : { backgroundColor: room.color, color: 'white' }
            }
          >
            <IconComponent className="h-3.5 w-3.5" />
            {room.name}
          </button>
        );
      })}
    </div>
  );
}
