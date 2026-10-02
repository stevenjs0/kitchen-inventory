/**
 * Decodifica un valor de query param (p. ej. `?from=`) y devuelve solo rutas
 * internas. Rechaza rutas absolutas externas (`https://…`) y protocol-relative
 * (`//host`) para evitar open-redirect / XSS vía el router; si la decodificación
 * falla, devuelve null.
 */
export function safeDecodeFrom(
  value: string | null | undefined,
): string | null {
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value);
    if (!decoded.startsWith('/') || decoded.startsWith('//')) return null;
    return decoded;
  } catch {
    return null;
  }
}
