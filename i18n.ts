import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const supported = ['en', 'de', 'es'] as const;
  const safe = (supported as readonly string[]).includes(locale) ? locale : 'en';
  const common = (await import(`./locales/${safe}.json`)).default;
  return { locale: safe, messages: common };
});
