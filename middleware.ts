import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['de', 'en', 'es'] as const;
const DEFAULT_LOCALE = 'de';
const DEFAULT_ORG_SLUG =
  process.env.NEXT_PUBLIC_DEFAULT_ORG_SLUG?.trim() || 'mkdigitalworks';

const intl = createMiddleware({
  locales: [...LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always'
});

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname } = url;

  // "/" → "/de/<orgSlug>"
  if (pathname === '/' || pathname === '') {
    const u = url.clone();
    u.pathname = `/${DEFAULT_LOCALE}/${DEFAULT_ORG_SLUG}`;
    return NextResponse.redirect(u);
  }

  // Ohne Locale-Prefix → Prefix ergänzen
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  const isStatic =
    first?.startsWith('_next') ||
    first === 'api' ||
    /\.(?:svg|png|jpg|jpeg|gif|webp|ico)$/.test(pathname);
  const hasLocale = first && (LOCALES as readonly string[]).includes(first);

  if (!isStatic && first && !hasLocale) {
    const u = url.clone();
    u.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(u);
  }

  return intl(req);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)'
  ]
};
