import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const priceId = process.env.PRICE_ID || "price_dummy";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const body = await req.json().catch(() => ({} as any));
    const metadata = (body?.metadata ?? {}) as Record<string, string>;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout-cancelled`,
      metadata,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Stripe error" }, { status: 500 });
  }
}