export const metadata = {
  title: "Preise",
  description: "Einfache Preise – monatlich oder jährlich.",
};

type Plan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: "0 €",
    period: "/Monat",
    features: [
      "1 Standort",
      "Basis-Buchungen",
      "E-Mail-Benachrichtigungen",
    ],
    cta: "Loslegen",
  },
  {
    name: "Pro",
    price: "199 €",
    period: "/Jahr",
    features: [
      "Unbegrenzt Standorte",
      "Stripe-Zahlungen",
      "Kalender-Sync",
      "Automatisierungen",
    ],
    cta: "Jetzt starten",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">Preise</h1>
        <p className="mt-2 text-muted-foreground">
          Wählen Sie den passenden Plan. Sie können jederzeit wechseln.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {PLANS.map((plan) => (
          <article
            key={plan.name}
            className="rounded-xl border p-6 shadow-sm bg-white"
          >
            <h2 className="text-2xl font-semibold">{plan.name}</h2>
            <p className="mt-3 text-3xl font-bold">
              {plan.price}{" "}
              <span className="text-base font-normal text-muted-foreground">
                {plan.period}
              </span>
            </p>
            <ul className="mt-6 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full rounded-md bg-black px-4 py-2 text-white">
              {plan.cta}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
