'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  /** Where to go if there's no history (deep-link entry). */
  fallbackHref: string;
  className?: string;
}

/**
 * Client-side back navigation that uses the browser history when available
 * (preserves query params, filters, and scroll position) and falls back
 * to an explicit URL when there's no history (deep-link / first entry).
 *
 * IMPORTANT: must NOT be replaced with `<Link href={fallbackHref}>` because
 * that strips query params and breaks the "back from edit returns to
 * filtered list" flow.
 */
export function BackButton({ fallbackHref, className }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={className ?? 'rounded-full h-10 w-10'}
      aria-label="Volver"
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
  );
}