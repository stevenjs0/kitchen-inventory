"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package, MapPin, Tags, ChefHat } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "/inventory", label: "Inventario", icon: Package },
  { href: "/locations", label: "Ubicaciones", icon: MapPin },
  { href: "/categories", label: "Categorías", icon: Tags },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between max-w-2xl mx-auto px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="font-bold hidden sm:inline-block">Cocina</span>
            </Link>
            <nav className="flex items-center gap-6 ml-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-primary",
                    pathname?.startsWith(item.href) ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t md:hidden z-50">
        <div className="flex justify-around items-center h-16 space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-1 rounded-md transition-colors",
                  isActive && "bg-primary/5"
                )}>
                  <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium mt-1 uppercase tracking-wider",
                  isActive ? "opacity-100" : "opacity-70"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          <div className="flex items-center px-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
