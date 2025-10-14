import * as React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('navigation');

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/features"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t('features')}
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t('pricing')}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
