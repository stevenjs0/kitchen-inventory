export const UNIT_OPTIONS = [
  { value: 'unidad', label: 'Unidades' },
  { value: 'kg', label: 'Kilogramos (kg)' },
  { value: 'g', label: 'Gramos (g)' },
  { value: 'L', label: 'Litros (L)' },
  { value: 'ml', label: 'Mililitros (ml)' },
  { value: 'paquete', label: 'Paquetes' },
  { value: 'frasco', label: 'Frascos' },
  { value: 'lata', label: 'Latas' },
  { value: 'saco', label: 'Sacos' },
  { value: 'caneca', label: 'Canecas' },
] as const;

export type UnitValue = (typeof UNIT_OPTIONS)[number]['value'];