'use client';

import { createContext, useContext, useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ user: User | null; loading: boolean }>({
    user: null,
    loading: true,
  });
  const resolvedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const resolve = (user: User | null) => {
      if (resolvedRef.current) return;
      resolvedRef.current = true;
      setState({ user, loading: false });
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        resolve(session?.user ?? null);
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setState({ user: null, loading: false });
    router.push('/login');
    router.refresh();
  }, [router]);

  return (
    <AuthCtx.Provider value={{ ...state, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
