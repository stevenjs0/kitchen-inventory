import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '@/lib/supabase/config';

// Singleton por app (módulo): evita crear un cliente en cada render de los
// componentes que llaman a createClient (patrón client-per-app en el browser).
let browserClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (!browserClient) {
    const { url, key, isLocal } = getSupabaseConfig();

    if (process.env.NODE_ENV === 'development') {
      console.log('[supabase/client] using', isLocal ? 'LOCAL' : 'CLOUD', 'instance');
    }

    browserClient = createBrowserClient(url, key);
  }
  return browserClient;
}