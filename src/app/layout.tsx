import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from './client-theme-provider';
import { Navbar } from '@/shared/ui/navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inventario Cocina',
  description: 'Sistema de gestión de inventario de cocina',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  const themeClass =
    themeCookie === 'dark' || themeCookie === 'light' ? themeCookie : '';
  const htmlClassName = ['h-full', 'antialiased', themeClass]
    .filter(Boolean)
    .join(' ');

  return (
    <html lang="es" className={htmlClassName} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pb-20 md:pb-8">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
