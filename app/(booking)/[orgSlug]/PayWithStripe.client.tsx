"use client";

import { DateTime } from "luxon";
import { useState } from "react";

type Props = {
  orgSlug: string;
  locale: "de" | "en" | "es";
  // Optional: Fallback-E-Mail falls keine im UI markiert ist
  fallbackEmail?: string;
};

export default function PayWithStripe({ orgSlug, locale, fallbackEmail = "mkdigitalworks.studio@gmail.com" }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      // 1) Werte direkt aus dem DOM lesen (wir markieren sie gleich in Schritt 2)
      const serviceName = document.getElementById("sum-service")?.textContent?.trim();
      const staffName = document.getElementById("sum-staff")?.textContent?.trim() || null;
      const dateText = document.getElementById("sum-date")?.textContent?.trim();   // z.B. 15.10.2025
      const timeText = document.getElementById("sum-time")?.textContent?.trim();   // z.B. 09:00
      const customerName = (document.getElementById("sum-customer-name")?.textContent?.trim() || "Testkunde");
      const customerEmail = (document.getElementById("sum-customer-email")?.textContent?.trim() || fallbackEmail);

      if (!serviceName || !dateText || !timeText) {
        alert("Fehlende Buchungsdaten (Service/Datum/Uhrzeit). Bitte prüfe die Zusammenfassung.");
        setLoading(false);
        return;
      }

      // 2) Org-ID holen
      const orgRes = await fetch(`/api/organizations/by-slug/${orgSlug}`);
      const orgJson = await orgRes.json();
      if (!orgRes.ok || !orgJson?.organization?.id) {
        alert("Organisation nicht gefunden.");
        setLoading(false);
        return;
      }
      const orgId = orgJson.organization.id;

      // 3) Services & Staff der Org laden
      const [svcJson, staffJson] = await Promise.all([
        fetch(`/api/services?orgId=${orgId}`).then(r => r.json()),
        fetch(`/api/staff?orgId=${orgId}`).then(r => r.json())
      ]);

      // 4) Service & Staff zuordnen
      const service = svcJson?.services?.find((s: any) =>
        String(s.name).trim().toLowerCase() === serviceName.toLowerCase()
      );
      if (!service) {
        alert(`Service nicht gefunden: ${serviceName}`);
        setLoading(false);
        return;
      }
      const staff = staffName
        ? staffJson?.staff?.find((m: any) => String(m.name).trim().toLowerCase() === staffName.toLowerCase())
        : null;

      // 5) Start/Ende in Europe/Berlin interpretieren → ISO in UTC
      const tz = orgJson.organization.timezone || "Europe/Berlin";
      const startDT = DateTime.fromFormat(`${dateText} ${timeText}`, "dd.LL.yyyy HH:mm", { zone: tz });
      if (!startDT.isValid) {
        alert(`Datum/Uhrzeit ungültig: ${dateText} ${timeText}`);
        setLoading(false);
        return;
      }
      const endDT = startDT.plus({ minutes: service.duration ?? 60 }); // falls Dauer unbekannt, 60min fallback
      const startISO = startDT.toUTC().toISO();
      const endISO = endDT.toUTC().toISO();

      // 6) Booking anlegen (immer mit Zahlung → "full")
      const payload = {
        orgId,
        serviceId: service.id,
        staffId: staff?.id ?? null,
        start: startISO,
        end: endISO,
        payMode: "full" as const,
        customer: {
          name: customerName,
          email: customerEmail
        }
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        alert(`Booking fehlgeschlagen (${res.status}): ${data?.error ?? "Unknown error"}`);
        setLoading(false);
        return;
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl; // ↪️ Stripe Checkout
        return;
      }

      // Falls payMode=="none" (hier nutzen wir "full"), würden wir redirecten:
      if (data.bookingId) {
        window.location.href = `/${locale}/${orgSlug}/confirmation?bookingId=${data.bookingId}`;
        return;
      }

      alert("Server hat keine checkoutUrl/bookingId geliefert.");
    } catch (e: any) {
      console.error(e);
      alert("Unerwarteter Fehler: " + (e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={loading}>
      {loading ? "…" : "Pay with Stripe"}
    </button>
  );
}
