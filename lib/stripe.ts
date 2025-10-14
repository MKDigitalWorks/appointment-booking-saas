// lib/stripe.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

type CreateCheckoutArgs = {
  bookingId: string;
  orgId: string;
  orgSlug: string;
  serviceId: string;
  amountCents: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  tax?: boolean;
  description?: string;
};

export async function createCheckoutSession(args: CreateCheckoutArgs) {
  const {
    bookingId,
    orgId,
    orgSlug,
    serviceId,
    amountCents,
    currency,
    successUrl,
    cancelUrl,
    tax,
    description,
  } = args;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: currency.toLowerCase(),
          unit_amount: amountCents,
          product_data: {
            name: "Appointment booking",
            description: description || `Booking ${serviceId}`,
            metadata: { bookingId, orgId, serviceId },
          },
        },
        tax_rates: tax ? undefined : undefined, // hook for future tax rates
      },
    ],
    metadata: {
      bookingId,
      orgId,
      serviceId,
    },
    payment_intent_data: {
      metadata: {
        bookingId,
        orgId,
        serviceId,
      },
    },
  });

  return session;
}
