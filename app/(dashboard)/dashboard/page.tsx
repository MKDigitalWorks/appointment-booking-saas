import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Calendar, Users, Clock, Euro, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const t = useTranslations('dashboard.overview');

  // Mock data - in a real app, this would come from API calls
  const stats = {
    todayBookings: 5,
    weekBookings: 23,
    monthBookings: 89,
    revenue: 2450.50,
  };

  const recentBookings = [
    {
      id: '1',
      customerName: 'John Doe',
      service: 'Haircut & Style',
      staff: 'Sarah Johnson',
      date: '2024-01-15',
      time: '14:00',
      status: 'CONFIRMED',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      service: 'Relaxing Massage',
      staff: 'Mike Chen',
      date: '2024-01-15',
      time: '16:00',
      status: 'PENDING',
    },
    {
      id: '3',
      customerName: 'Bob Wilson',
      service: 'Haircut & Style',
      staff: 'Sarah Johnson',
      date: '2024-01-16',
      time: '10:00',
      status: 'CONFIRMED',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'CANCELLED':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('welcome')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.todayBookings')}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayBookings}</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.weekBookings')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weekBookings}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.monthBookings')}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.monthBookings}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.revenue')}
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{stats.revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('recentBookings')}</CardTitle>
            <CardDescription>
              Latest booking requests and confirmations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.service} with {booking.staff}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View All Bookings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('upcomingBookings')}</CardTitle>
            <CardDescription>
              Bookings scheduled for today and tomorrow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Alice Johnson</p>
                  <p className="text-xs text-muted-foreground">
                    Haircut & Style with Sarah Johnson
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 10:00
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">David Brown</p>
                  <p className="text-xs text-muted-foreground">
                    Relaxing Massage with Mike Chen
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Today at 14:00
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
