'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function SearchShortcutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Redirect to inventory page where SearchBar lives
        // If already on inventory page, we'll need a way to focus the input
        router.push('/inventory');

        // Note: To actually focus the input, we would need a shared state
        // or a custom event. For now, this ensures the user is on the page.
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return <>{children}</>;
}
