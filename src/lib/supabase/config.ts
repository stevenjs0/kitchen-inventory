export interface SupabaseConfig {
  url: string;
  key: string;
  isLocal: boolean;
}

export function getSupabaseConfig(): SupabaseConfig {
  const localEnabled = process.env.NODE_ENV !== 'production';

  const localUrl = localEnabled
    ? process.env.NEXT_PUBLIC_SUPABASE_LOCAL_URL
    : undefined;
  const localKey = localEnabled
    ? process.env.NEXT_PUBLIC_SUPABASE_LOCAL_ANON_KEY
    : undefined;

  const url = localUrl || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = localKey || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  return { url, key, isLocal: Boolean(localUrl) };
}
