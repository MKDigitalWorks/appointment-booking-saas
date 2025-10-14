'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl';

interface IntlProviderProps {
  children: React.ReactNode;
  messages: any;
}

export function IntlProvider({ children, messages }: IntlProviderProps) {
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
