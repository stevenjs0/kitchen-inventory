import { describe, expect, it } from 'vitest';
import { buildLocationPath } from '@/features/locations/domain/location-path';

describe('buildLocationPath', () => {
  it('une todas las partes con un solo espacio', () => {
    expect(
      buildLocationPath({
        section: 'Alacena',
        side: 'Izquierda',
        position: 'Arriba',
        level: 'Primer Nivel',
      }),
    ).toBe('Alacena Izquierda Arriba Primer Nivel');
  });

  it('omite las partes vacías sin dejar espacios repetidos', () => {
    expect(
      buildLocationPath({
        section: 'Condimentero',
        side: 'Izquierdo',
        position: null,
        level: 'Primer nivel',
      }),
    ).toBe('Condimentero Izquierdo Primer nivel');

    expect(
      buildLocationPath({
        section: 'Heladera',
        side: '',
        position: '   ',
        level: 'Puerta',
      }),
    ).toBe('Heladera Puerta');
  });

  it('descarta espacios sobrantes de cada parte', () => {
    expect(
      buildLocationPath({
        section: '  Alacena ',
        side: ' Derecha ',
        level: ' Cajón ',
      }),
    ).toBe('Alacena Derecha Cajón');
  });

  it('devuelve la sección y el nivel cuando no hay partes opcionales', () => {
    expect(
      buildLocationPath({
        section: 'Alacena',
        level: 'Primer Nivel',
      }),
    ).toBe('Alacena Primer Nivel');
  });
});
