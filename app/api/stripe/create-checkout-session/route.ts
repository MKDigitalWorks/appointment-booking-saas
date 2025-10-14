// app/api/stripe/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/price";

const Schema = z.object({
  bookingId: z.string().min(1),
  amount: z.number().int().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ ok: false, error: "Missing body" }, { status: 400 });

    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload", issues: parsed.error.flatten() }, { status: 400 });
    }

    const { bookingId, amount } = parsed.data;
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { organization: true, service: true },
    });
    if (!booking) return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });
    if (booking.status !== "pending")
      return NextResponse.json({ ok: false, error: "Booking not in pending state" }, { status: 409 });

    const orgSlug = booking.organization.slug || "organization";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const successUrl = `${appUrl}/en/${orgSlug}/confirmation?bookingId=${booking.id}`;
    const cancelUrl = `${appUrl}/en/${orgSlug}`;

    const session = await createCheckoutSession({
      bookingId: booking.id,
      orgId: booking.orgId,
      orgSlug,
      serviceId: booking.serviceId,
      amountCents: amount,
      currency: booking.currency || booking.organization.currency || "EUR",
      successUrl,
      cancelUrl,
      tax: process.env.STRIPE_TAX_ENABLED === "true",
      description: `Booking ${booking.service.name} (${formatCents(amount, booking.currency)})`,
    });

    return NextResponse.json({ ok: true, checkoutUrl: session.url });
  } catch (err: any) {
    console.error("[/api/stripe/create-checkout-session] Error:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
  }
}
