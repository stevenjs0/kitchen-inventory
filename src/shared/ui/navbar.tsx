'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChartPie, Package, MapPin, Tags, Home } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AuthProvider } from '@/lib/auth-context';
import { UserMenu } from './user-menu';
import { MobileUserMenu } from './mobile-user-menu';

const navItems = [
  { href: '/dashboard', label: 'Resumen', icon: ChartPie, exact: true },
  { href: '/inventory', label: 'Inventario', icon: Package, exact: true },
  { href: '/rooms', label: 'Ambientes', icon: Home, exact: false },
  { href: '/locations', label: 'Ubicaciones', icon: MapPin, exact: false },
  { href: '/categories', label: 'Categorías', icon: Tags, exact: false },
];

/**
 * Determine if a nav item is active for the current pathname.
 * For the inventory item, only match the root `/inventory` and
 * `/inventory?id=...` view (not the detail or edit pages), so the
 * "Inventario" tab stays clean when the user is editing an item.
 */
function isNavActive(href: string, exact: boolean, pathname: string | null) {
  if (!pathname) return false;
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <AuthProvider>
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center justify-between max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Home className="h-7 w-7 text-primary" />
            </Link>
            <nav className="flex items-center gap-6 ml-6 text-sm font-medium">
              {navItems.map((item) => {
                const active = isNavActive(item.href, item.exact, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'transition-colors hover:text-primary',
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
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
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isNavActive(item.href, item.exact, pathname);

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
            <MobileUserMenu />
          </div>
        </div>
      </nav>
    </AuthProvider>
  );
}
