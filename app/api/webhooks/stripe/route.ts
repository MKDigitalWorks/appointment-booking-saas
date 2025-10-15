import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const sig = req.headers.get("stripe-signature") || "";
    const body = await req.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_dummy";

    let event: any;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        // Beispielhafte TX – Types absichtlich weich gehalten
        await prisma.$transaction(async (tx: any) => {
          await tx.booking.updateMany({
            where: { id: session?.metadata?.bookingId },
            data: { paid: true, status: "CONFIRMED" },
          });
        });
        break;
      }
      default:
        // andere Events ignorieren
        break;
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    return new NextResponse(`Server Error: ${e.message}`, { status: 500 });
  }
}
