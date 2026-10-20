'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  LayoutGrid,
  Layers,
  MapPin,
} from 'lucide-react';
import { RequiredMarker } from './form-parts';

interface LocationSectionProps {
  roomSelected: boolean;
  sections: string[];
  selectedSection: string;
  selectedLevel: string;
  selectedSide: string;
  selectedPosition: string;
  availableLevels: string[];
  availableSides: string[];
  availablePositions: string[];
  locationComplete: boolean;
  locationPath?: string;
  locationError?: string;
  onSectionChange: (section: string) => void;
  onLevelChange: (level: string) => void;
  onSideChange: (side: string) => void;
  onPositionChange: (position: string) => void;
}

export function LocationSection({
  roomSelected,
  sections,
  selectedSection,
  selectedLevel,
  selectedSide,
  selectedPosition,
  availableLevels,
  availableSides,
  availablePositions,
  locationComplete,
  locationPath,
  locationError,
  onSectionChange,
  onLevelChange,
  onSideChange,
  onPositionChange,
}: LocationSectionProps) {
  return (
    <>
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground">
            Ubicación del Item
          </span>
        </div>
      </div>

      {/* Section 2: Location - Card Style */}
      {!roomSelected ? (
        <div className="rounded-xl border bg-muted/30 text-muted-foreground shadow-sm p-5 text-center text-sm">
          Selecciona un ambiente para ver las ubicaciones disponibles
        </div>
      ) : (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-5 space-y-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Ubicación</span>
            <RequiredMarker />
            {locationComplete && (
              <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />
            )}
          </div>

          {/* Step 1: Section Selection */}
          <div className="space-y-3">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <LayoutGrid className="h-3 w-3" />
              1. Selecciona Sección
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {sections.map((section) => (
                <button
                  key={section}
                  type="button"
                  onClick={() => onSectionChange(section)}
                  className={`
                  flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium text-sm
                  ${
                    selectedSection === section
                      ? 'bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]'
                      : 'bg-background border-border hover:border-primary/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground cursor-pointer'
                  }
                `}
                >
                  {selectedSection === section && <CheckCircle2 className="h-4 w-4" />}
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Level and Side - Only show when section is selected */}
          {selectedSection && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-3 w-3" />
                2. Selecciona Nivel y Lado
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Level Select */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-0.5">
                      Nivel
                      <RequiredMarker />
                    </span>
                  </div>
                  <Select
                    value={selectedLevel}
                    onValueChange={(value) => {
                      if (value) onLevelChange(value);
                    }}
                  >
                    <SelectTrigger className="h-11 bg-background border-border">
                      <SelectValue placeholder="Seleccionar nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Side Select */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CircleDot className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-0.5">
                      Lado
                      <RequiredMarker />
                    </span>
                  </div>
                  <Select
                    value={selectedSide}
                    onValueChange={(value) => {
                      if (value) onSideChange(value);
                    }}
                    disabled={!selectedLevel}
                  >
                    <SelectTrigger className="h-11 bg-background border-border">
                      <SelectValue placeholder="Seleccionar lado">
                        {selectedSide || (!selectedLevel ? 'Primero nivel' : 'Seleccionar lado')}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availableSides.map((side) => (
                        <SelectItem key={side} value={side}>
                          {side}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Position Select */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-0.5">
                      Posición
                    </span>
                  </div>
                  <Select
                    value={selectedPosition}
                    onValueChange={(value) => {
                      if (value) onPositionChange(value);
                    }}
                    disabled={!selectedLevel}
                  >
                    <SelectTrigger className="h-11 bg-background border-border">
                      <SelectValue placeholder="Seleccionar posición">
                        {selectedPosition || (!selectedLevel ? 'Primero nivel' : 'Seleccionar posición (opcional)')}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {availablePositions.map((pos) => (
                        <SelectItem key={pos} value={pos}>
                          {pos}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Location Error */}
          {locationError && (
            <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
              <AlertTriangle className="h-3.5 w-3.5" />
              {locationError}
            </div>
          )}

          {/* Location Preview */}
          {locationComplete && locationPath !== undefined && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
              <MapPin className="h-3.5 w-3.5" />
              {locationPath}
            </div>
          )}
        </div>
      )}
    </>
  );
}
