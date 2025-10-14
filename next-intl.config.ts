import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const supported = ['de', 'en', 'es'] as const;
  const safeLocale = supported.includes(locale as any) ? locale : 'de';
  const messages = (await import(`./locales/${safeLocale}.json`)).default;
  return { locale: safeLocale, messages };
});
