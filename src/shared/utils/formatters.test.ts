import { describe, expect, it } from 'vitest';
import {
  formatDate,
  formatDateTime,
  formatStockStatus,
} from '@/shared/utils/formatters';

describe('formatStockStatus', () => {
  it('marca "Agotado" cuando el stock es 0', () => {
    expect(formatStockStatus(0, 5)).toEqual({
      status: 'out',
      label: 'Agotado',
      color: 'text-red-600',
    });
    // Con min_stock 0 sigue siendo agotado (se chequea antes que el mínimo)
    expect(formatStockStatus(0, 0).status).toBe('out');
  });

  it('marca "Stock bajo" cuando hay stock pero por debajo del mínimo', () => {
    expect(formatStockStatus(2, 5)).toEqual({
      status: 'low',
      label: 'Stock bajo',
      color: 'text-amber-600',
    });
    expect(formatStockStatus(4, 5).status).toBe('low');
  });

  it('marca "Normal" cuando el stock alcanza el mínimo', () => {
    expect(formatStockStatus(5, 5)).toEqual({
      status: 'normal',
      label: 'Normal',
      color: 'text-green-600',
    });
    expect(formatStockStatus(10, 5).status).toBe('normal');
  });
});

describe('formatDate', () => {
  it('formatea fechas en es-AR con mes abreviado', () => {
    expect(formatDate(new Date(2026, 0, 15, 14, 30))).toBe('15 de ene de 2026');
    expect(formatDate(new Date(2026, 8, 3, 9, 5))).toBe('3 de sept de 2026');
  });

  it('acepta fechas en formato ISO sin zona horaria', () => {
    expect(formatDate('2026-01-15T14:30:00')).toBe('15 de ene de 2026');
  });

  it('devuelve "Invalid Date" ante fechas inválidas', () => {
    expect(formatDate('no-es-fecha')).toBe('Invalid Date');
  });
});

describe('formatDateTime', () => {
  it('incluye hora en es-AR con formato de 12 horas', () => {
    expect(formatDateTime(new Date(2026, 0, 15, 14, 30))).toBe(
      '15 de ene de 2026, 02:30 p. m.',
    );
    expect(formatDateTime(new Date(2026, 11, 24, 9, 5))).toBe(
      '24 de dic de 2026, 09:05 a. m.',
    );
  });

  it('acepta fechas en formato ISO sin zona horaria', () => {
    expect(formatDateTime('2026-12-24T09:05:00')).toBe(
      '24 de dic de 2026, 09:05 a. m.',
    );
  });
});
