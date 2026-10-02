import { describe, expect, it } from 'vitest';
import { safeDecodeFrom } from '@/shared/utils/safe-decode';

describe('safeDecodeFrom', () => {
  it('devuelve null para valores vacíos', () => {
    expect(safeDecodeFrom(null)).toBeNull();
    expect(safeDecodeFrom(undefined)).toBeNull();
    expect(safeDecodeFrom('')).toBeNull();
  });

  it('devuelve rutas internas tal cual', () => {
    expect(safeDecodeFrom('/inventory?tab=stock')).toBe('/inventory?tab=stock');
    expect(safeDecodeFrom('/')).toBe('/');
  });

  it('decodifica rutas internas percent-encoded', () => {
    expect(safeDecodeFrom('%2Finventory')).toBe('/inventory');
    expect(safeDecodeFrom('/inventory%3Fsearch%3Dazucar')).toBe(
      '/inventory?search=azucar',
    );
  });

  it('rechaza rutas externas y protocol-relative', () => {
    expect(safeDecodeFrom('https://evil.example')).toBeNull();
    expect(safeDecodeFrom('//evil.example')).toBeNull();
    expect(safeDecodeFrom('%2F%2Fevil.example')).toBeNull();
    expect(safeDecodeFrom('javascript:alert(1)')).toBeNull();
  });

  it('rechaza rutas relativas sin barra inicial', () => {
    expect(safeDecodeFrom('inventory')).toBeNull();
    expect(safeDecodeFrom('inventory/new')).toBeNull();
  });

  it('devuelve null si la decodificación falla', () => {
    // '%' inválido lanza URIError dentro de decodeURIComponent
    expect(safeDecodeFrom('%E0%A4%A')).toBeNull();
    expect(safeDecodeFrom('%')).toBeNull();
  });
});
