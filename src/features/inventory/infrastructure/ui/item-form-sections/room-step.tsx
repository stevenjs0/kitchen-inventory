'use client';

import { Label } from '@/components/ui/label';
import { Room } from '@/features/rooms/domain/entities';
import { ROOM_ICON_MAP } from '@/features/rooms/infrastructure/ui/constants';
import { CheckCircle2, ChevronRight, Home } from 'lucide-react';
import { RequiredMarker } from './form-parts';

const ICON_MAP = ROOM_ICON_MAP;

interface RoomStepProps {
  rooms: Room[];
  selectedRoomId: string;
  selectedSection: string;
  selectedLevel: string;
  selectedSide: string;
  selectedPosition: string;
  onRoomChange: (roomId: string) => void;
  onClearSection: () => void;
  onClearLevel: () => void;
  onClearSide: () => void;
}

export function RoomStep({
  rooms,
  selectedRoomId,
  selectedSection,
  selectedLevel,
  selectedSide,
  selectedPosition,
  onRoomChange,
  onClearSection,
  onClearLevel,
  onClearSide,
}: RoomStepProps) {
  return (
    <>
      {/* Step 0: Room Selection */}
      <div className="space-y-3">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <Home className="h-3 w-3" />
          Ambiente
          <RequiredMarker />
        </Label>
        <div className="flex flex-wrap gap-2">
          {rooms.map((room) => {
            const RoomIcon = ICON_MAP[room.icon] || Home;
            return (
              <button
                key={room.id}
                type="button"
                onClick={() => onRoomChange(room.id)}
                className={`
                px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 inline-flex items-center gap-2
                ${selectedRoomId === room.id
                  ? 'text-white shadow-md scale-[1.02]'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer'}
              `}
                style={selectedRoomId === room.id ? { backgroundColor: room.color } : undefined}
              >
                <RoomIcon className="h-4 w-4" />
                {room.name}
                {selectedRoomId === room.id && <CheckCircle2 className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedRoomId && (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/30 rounded-lg px-3 py-2 overflow-x-auto">
          <Home className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium text-foreground whitespace-nowrap">
            {rooms.find((r) => r.id === selectedRoomId)?.name}
          </span>
          {selectedSection && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <button type="button" onClick={onClearSection} className="hover:text-primary whitespace-nowrap">{selectedSection}</button>
            </>
          )}
          {selectedLevel && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <button type="button" onClick={onClearLevel} className="hover:text-primary whitespace-nowrap">{selectedLevel}</button>
            </>
          )}
          {selectedSide && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <button type="button" onClick={onClearSide} className="hover:text-primary whitespace-nowrap">{selectedSide}</button>
            </>
          )}
          {selectedPosition && (
            <>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">{selectedPosition}</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
