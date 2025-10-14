// app/(dashboard)/dashboard/layout.tsx
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';

// Optional: Wenn du Auth erzwingen willst, diese zwei Zeilen entkommentieren
// import { auth } from '@/lib/auth';
// import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  // ---- Optionaler Auth-Guard ----
  // const session = await auth();
  // if (!session) redirect('/login'); // oder '/de/login' je nach deiner Route

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
