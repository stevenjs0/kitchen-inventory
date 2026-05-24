'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';

export function MobileUserMenu() {
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const timer = setTimeout(() => document.addEventListener('click', handler), 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handler);
    };
  }, [open]);

  const meta = user?.user_metadata;
  const name = meta?.full_name || meta?.name || user?.email?.split('@')[0] || 'Usuario';
  const avatarUrl = meta?.avatar_url;

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  if (loading) {
    return <div className="h-8 w-8 rounded-full bg-muted animate-pulse shrink-0" />;
  }

  if (!user) {
    return (
      <Link href="/login" className="shrink-0">
        <Button variant="ghost" size="sm">Iniciar sesión</Button>
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="h-8 w-8 shrink-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={32}
            height={32}
            priority
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-medium text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-2 z-60 w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
          <div className="px-1.5 py-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            {user.email && (
              <p className="text-xs leading-none text-muted-foreground mt-1">{user.email}</p>
            )}
          </div>
          <div className="-mx-1 my-1 h-px bg-border" />
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <LogOutIcon className="size-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
