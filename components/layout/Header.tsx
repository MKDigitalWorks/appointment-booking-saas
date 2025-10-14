import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/providers/theme-provider';

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
  };
}

export function Header({ isAuthenticated, user }: HeaderProps) {
  const t = useTranslations('navigation');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Bookings
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('features')}
            </Link>
            <Link
              href="/pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('pricing')}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t('contact')}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="mr-6 flex items-center space-x-2 md:hidden">
              <span className="font-bold">Bookings</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {user?.name || user?.email}
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard">{t('dashboard')}</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/signout">{t('signOut')}</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/auth/signin">{t('signIn')}</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/auth/signup">{t('signUp')}</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
