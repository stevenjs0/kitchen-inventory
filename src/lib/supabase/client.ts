import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  if (process.env.NODE_ENV === 'development') {
    console.log('[supabase/client] using', url === process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL ? 'LOCAL' : 'CLOUD', 'instance');
  }

  return createBrowserClient(url, key);
}
