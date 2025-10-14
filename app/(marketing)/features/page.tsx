import { useTranslations } from 'next-intl';
import { Calendar, Users, Clock, Shield, Globe, Zap } from 'lucide-react';

export default function FeaturesPage() {
  const t = useTranslations('marketing.features');

  const features = [
    {
      icon: Users,
      title: t('items.multiTenant.title'),
      description: t('items.multiTenant.description'),
    },
    {
      icon: Users,
      title: t('items.staffManagement.title'),
      description: t('items.staffManagement.description'),
    },
    {
      icon: Clock,
      title: t('items.availability.title'),
      description: t('items.availability.description'),
    },
    {
      icon: Shield,
      title: t('items.payments.title'),
      description: t('items.payments.description'),
    },
    {
      icon: Calendar,
      title: t('items.notifications.title'),
      description: t('items.notifications.description'),
    },
    {
      icon: Globe,
      title: t('items.internationalization.title'),
      description: t('items.internationalization.description'),
    },
  ];

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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary mb-4">
              <feature.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
