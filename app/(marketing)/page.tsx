import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, Users, Clock, Shield, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations('marketing');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            <Zap className="mr-1 h-3 w-3" />
            New
          </Badge>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/auth/signup">{t('hero.cta')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/demo">{t('hero.demo')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            {t('features.title')}
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{t('features.items.multiTenant.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.items.multiTenant.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{t('features.items.staffManagement.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.items.staffManagement.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{t('features.items.availability.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.items.availability.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{t('features.items.payments.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.items.payments.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{t('features.items.notifications.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.items.notifications.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Globe className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold">{t('features.items.internationalization.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('features.items.internationalization.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            {t('pricing.title')}
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t('pricing.subtitle')}
          </p>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              {t('pricing.plans.trial.name')}
            </h3>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{t('pricing.plans.trial.price')}</span>
              <span className="text-muted-foreground">{t('pricing.plans.trial.period')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('pricing.plans.trial.description')}
            </p>
            <ul className="grid gap-3 text-sm">
              {t('pricing.plans.trial.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <Button asChild className="w-full">
              <Link href="/auth/signup">{t('pricing.cta')}</Link>
            </Button>
          </div>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold sm:text-2xl">
                {t('pricing.plans.pro.name')}
              </h3>
              <Badge>Popular</Badge>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-bold">{t('pricing.plans.pro.price')}</span>
              <span className="text-muted-foreground">{t('pricing.plans.pro.period')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('pricing.plans.pro.description')}
            </p>
            <ul className="grid gap-3 text-sm">
              {t('pricing.plans.pro.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <Button asChild className="w-full">
              <Link href="/auth/signup">{t('pricing.cta')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
