import Link from "next/link";
import PayWithStripe from "./PayWithStripe.client";

export default function BookingPage({
  params,
}: {
  params: { locale: "de" | "en" | "es"; orgSlug: string };
}) {
  // --- Platzhalter-Daten NUR zum Testen des Stripe-Buttons ---
  // Du siehst diese Werte auf der Seite; der PayWithStripe-Button
  // liest sie über die IDs (#sum-...) und erstellt daraus die Buchung.
  const serviceName = "Website Audit";
  const staffName = "Service Team";
  const dateText = "15.10.2025";
  const timeText = "09:00";
  const totalPrice = "149 €";

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>MK Digital Works</h1>
      <p>Online-Terminbuchung & Automatisierung für KMU</p>
      <p>mkdigitalworks.studio@gmail.com</p>

      <h2 style={{ marginTop: "2rem" }}>Zahlung</h2>
      <p>Complete your booking with payment</p>

      <h3>Booking Summary</h3>

      <div style={{ lineHeight: "1.6" }}>
        <div>
          Service: <span id="sum-service">{serviceName}</span> (60 min)
        </div>
        <div>
          Staff: <span id="sum-staff">{staffName}</span>
        </div>
        <div>
          Date: <span id="sum-date">{dateText}</span>
        </div>
        <div>
          Time: <span id="sum-time">{timeText}</span>
        </div>
        <div>
          Total: <strong>{totalPrice}</strong>
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <PayWithStripe
          orgSlug={params.orgSlug}
          locale={params.locale}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Link href={`/${params.locale}/${params.orgSlug}`}>Zurück</Link>
      </div>
    </main>
  );
}
