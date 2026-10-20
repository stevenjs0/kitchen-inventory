import { cache } from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSupabaseConfig } from '@/lib/supabase/config';

/**
 * Cliente de Supabase para el server (Server Components, Server Actions y
 * Route Handlers), con deduplicación por request: todas las llamadas dentro
 * de una misma request reutilizan el mismo cliente (patrón client-per-request,
 * igual que `requireUser` en `src/lib/auth.ts`). En Next 16 la función de
 * memoización por request es `cache` de `react`; `next/cache` no la exporta.
 */
export const createClient = cache(async () => {
  const cookieStore = await cookies();
  const { url, key, isLocal } = getSupabaseConfig();

  if (process.env.NODE_ENV === 'development') {
    console.log('[supabase/server] using', isLocal ? 'LOCAL' : 'CLOUD', 'instance');
  }

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Ignorar errores en server components
          }
        },
      },
    },
  );
});
