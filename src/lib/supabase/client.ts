import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

// Singleton por app (módulo): evita crear un cliente en cada render de los
// componentes que llaman a createClient (patrón client-per-app en el browser).
let browserClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

    if (process.env.NODE_ENV === 'development') {
      console.log('[supabase/client] using', url === process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL ? 'LOCAL' : 'CLOUD', 'instance');
    }

    browserClient = createBrowserClient(url, key);
  }
  return browserClient;
}