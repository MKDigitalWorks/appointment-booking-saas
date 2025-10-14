// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // ensures raw body support behavior in Next 14

// We need the raw body for signature verification. In Next 13/14 Route Handlers, use req.text() not req.json()
export async function POST(req: NextRequest) {
  const stripeSigningSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSigningSecret || !stripeSecretKey) {
    return NextResponse.json({ ok: false, error: "Stripe env not configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ ok: false, error: "Missing stripe-signature" }, { status: 400 });
  }

  const textBody = await req.text();
  const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(textBody, sig, stripeSigningSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err?.message || err);
    return NextResponse.json(
      { ok: false, error: "Unable to verify webhook signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata || {};
        const bookingId = metadata.bookingId;
        const orgId = metadata.orgId || null;
        const serviceId = metadata.serviceId || null;

        if (!bookingId) break;

        // Confirm booking & store payment
        const currency = session.currency?.toUpperCase() || "EUR";
        const amount = (session.amount_total ?? 0);

        await prisma.$transaction(async (tx) => {
          await tx.booking.update({
            where: { id: bookingId },
            data: { status: "confirmed" },
          });

          await tx.payment.create({
            data: {
              bookingId,
              orgId,
              serviceId,
              amountCents: amount,
              currency,
              provider: "stripe",
              type: (metadata.payMode === "deposit" ? "deposit" : "full"),
              externalId: session.id,
              status: "succeeded",
            },
          });
        });

        // send confirmation email (best-effort)
        try {
          const { Resend } = await import("resend");
          const resend = new (Resend as any)(process.env.RESEND_API_KEY);
          const from = process.env.EMAIL_FROM || "onboarding@resend.dev";

          const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { organization: true, service: true, staff: true },
          });
          if (booking) {
            const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
            const icsLink = `${appUrl}/api/ics/${booking.id}`;
            const subject = `Booking confirmed: ${booking.service.name}`;
            const html = `
              <div>
                <p>Hi ${booking.customerName},</p>
                <p>Your booking for <strong>${booking.service.name}</strong> is confirmed.</p>
                <p>${new Date(booking.start).toLocaleString()} – ${new Date(booking.end).toLocaleString()}</p>
                <p><a href="${icsLink}">Add to calendar (.ics)</a></p>
                <p>Thank you,<br/>${booking.organization.name}</p>
              </div>
            `;
            await resend.emails.send({ from, to: booking.customerEmail, subject, html });
          }
        } catch {
          // ignore
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        const bookingId = (pi.metadata && (pi.metadata as any).bookingId) || null;
        if (bookingId) {
          await prisma.booking.update({
            where: { id: bookingId },
            data: { status: "payment_failed" },
          });
        }
        break;
      }

      default:
        // no-op for other events
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("[/api/webhooks/stripe] Handler error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // ensure raw body (for pages router; harmless here)
  },
};
