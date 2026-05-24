'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Package, MapPin, Tags } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserMenu } from './user-menu';

const navItems = [
  { href: '/inventory', label: 'Inventario', icon: Package },
  { href: '/locations', label: 'Ubicaciones', icon: MapPin },
  { href: '/categories', label: 'Categorías', icon: Tags },
];

function KitchenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn('h-8 w-8', className)}>
      <rect
        width="32"
        height="32"
        rx="8"
        className="fill-zinc-950 dark:fill-zinc-100 transition-colors duration-300"
      />
      <path
        d="M10 6C10 4.89543 10.8954 4 12 4H20C21.1046 4 22 4.89543 22 6V26C22 27.1046 21.1046 28 20 28H12C10.8954 28 10 27.1046 10 26V6Z"
        className="fill-zinc-800 dark:fill-zinc-300 stroke-zinc-100 dark:stroke-zinc-950 transition-colors duration-300"
        strokeWidth="1.5"
      />
      <path
        d="M10 12.5H22"
        className="stroke-zinc-100 dark:stroke-zinc-950 transition-colors duration-300"
        strokeWidth="1.5"
      />
      <rect
        x="11.5"
        y="7"
        width="1"
        height="3"
        rx="0.5"
        className="fill-zinc-100 dark:fill-zinc-950 transition-colors duration-300"
      />
      <rect
        x="11.5"
        y="15"
        width="1"
        height="6"
        rx="0.5"
        className="fill-zinc-100 dark:fill-zinc-950 transition-colors duration-300"
      />
      <circle cx="23" cy="23" r="6" className="fill-emerald-500" />
      <path
        d="M20 23L22 25L26 21"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center justify-between max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <KitchenIcon />
            </Link>
            <nav className="flex items-center gap-6 ml-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-primary',
                    pathname?.startsWith(item.href)
                      ? 'text-primary'
                      : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <UserMenu />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t md:hidden z-50">
        <div className="flex justify-around items-center h-16 space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center w-full h-full transition-all duration-200',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <div
                  className={cn(
                    'p-1 rounded-md transition-colors',
                    isActive && 'bg-primary/5',
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium mt-1 uppercase tracking-wider',
                    isActive ? 'opacity-100' : 'opacity-70',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          <div className="flex items-center gap-2 px-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </nav>
    </>
  );
}
