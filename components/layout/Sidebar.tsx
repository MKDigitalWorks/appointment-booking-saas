import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  Clock,
  Building2,
} from 'lucide-react';

const navigation = [
  { name: 'overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'services', href: '/dashboard/services', icon: Building2 },
  { name: 'staff', href: '/dashboard/staff', icon: Users },
  { name: 'availability', href: '/dashboard/availability', icon: Clock },
  { name: 'settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('navigation');

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Dashboard
          </h2>
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {t(item.name)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
