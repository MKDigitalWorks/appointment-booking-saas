type PageProps = { params: { locale: string; orgSlug: string } };

export default function OrgLocalePage({ params }: PageProps) {
  const { locale, orgSlug } = params;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold mb-2">
        {locale.toUpperCase()} / {orgSlug}
      </h1>
      <p className="text-muted-foreground">
        Platzhalterseite für den Booking-Flow. Stripe-Button kommt im MVP-Step wieder rein.
      </p>
    </main>
  );
}
