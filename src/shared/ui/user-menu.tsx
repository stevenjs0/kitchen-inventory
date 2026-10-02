'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';

interface UserMenuProps {
  /** 'desktop' usa el dropdown de Base UI; 'mobile' un popover compacto anclado al avatar. */
  variant?: 'desktop' | 'mobile';
}

export function UserMenu({ variant = 'desktop' }: UserMenuProps) {
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cerrar el popover mobile al hacer click fuera (solo en esa variante).
  useEffect(() => {
    if (variant !== 'mobile' || !open) return;
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
  }, [open, variant]);

  const userMetadata = user?.user_metadata;
  const displayName =
    userMetadata?.full_name ||
    userMetadata?.name ||
    user?.email?.split('@')[0] ||
    'Usuario';
  const avatarUrl = userMetadata?.avatar_url;

  if (loading) {
    return (
      <div className="h-8 w-8 shrink-0 rounded-full bg-muted animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Link href="/login" className="shrink-0">
        <Button variant="ghost" size="sm">
          Iniciar sesión
        </Button>
      </Link>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  if (variant === 'mobile') {
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
              alt={displayName}
              width={32}
              height={32}
              priority
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-medium text-primary-foreground">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 z-60 w-56 rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <div className="px-1.5 py-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              {user.email && (
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2" onClick={signOut}>
          <LogOutIcon className="size-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
