import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function PricingPage() {
  const t = useTranslations('marketing.pricing');

  return (
    <div className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {t('title')}
        </h1>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Trial Plan */}
        <div className="rounded-lg border p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{t('plans.trial.name')}</h3>
              <p className="text-muted-foreground">{t('plans.trial.description')}</p>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">{t('plans.trial.price')}</span>
              <span className="text-muted-foreground">{t('plans.trial.period')}</span>
            </div>
            <ul className="space-y-2">
              {t('plans.trial.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button asChild className="w-full">
              <Link href="/auth/signup">{t('cta')}</Link>
            </Button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="rounded-lg border p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">{t('plans.pro.name')}</h3>
              <Badge>Popular</Badge>
            </div>
            <p className="text-muted-foreground">{t('plans.pro.description')}</p>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold">{t('plans.pro.price')}</span>
              <span className="text-muted-foreground">{t('plans.pro.period')}</span>
            </div>
            <ul className="space-y-2">
              {t('plans.pro.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button asChild className="w-full">
              <Link href="/auth/signup">{t('cta')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
