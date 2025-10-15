export const metadata = {
  title: "Termin-Tool – Home",
  description: "SaaS für Terminbuchungen (Multi-Tenant).",
};

export default function MarketingHomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">Termin-Tool</h1>
        <p className="mt-2 text-muted-foreground">
          Buchungen, Zahlungen, Erinnerungen – in Minuten startklar.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {["Schnell starten", "Stripe integriert", "Mehrsprachig"].map((f) => (
          <article key={f} className="rounded-xl border p-6 bg-white shadow-sm">
            <h2 className="text-lg font-semibold">{f}</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Demo-Featuretext – echte Inhalte folgen.
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
