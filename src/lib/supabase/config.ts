/**
 * Configuración centralizada de Supabase (URL y clave anon/publishable).
 *
 * La instancia local se habilita con `NEXT_PUBLIC_SUPABASE_LOCAL_URL` (nombre
 * canónico) y, por compatibilidad, también se acepta `SUPABASE_LOCAL_URL`
 * (drift de nombres documentado históricamente en AGENTS.md). Lo mismo para
 * la clave anon.
 *
 * La usan las cuatro fábricas/contexts server del app: client (browser),
 * server (RSC, Server Actions y Route Handlers) y middleware (proxy).
 */
export interface SupabaseConfig {
  url: string;
  key: string;
  /** true si está configurada una instancia local. */
  isLocal: boolean;
}

export function getSupabaseConfig(): SupabaseConfig {
  const localUrl =
    process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL ||
    process.env.SUPABASE_LOCAL_URL;
  const localKey =
    process.env.NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY ||
    process.env.SUPABASE_LOCAL_ANON_KEY;

  const url = localUrl || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = localKey || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  return { url, key, isLocal: Boolean(localUrl) };
}