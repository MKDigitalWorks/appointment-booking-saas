import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY || "sk_dummy";
export const stripe = new Stripe(apiKey, {
  // Types von stripe@x können hinterherhinken; wir casten bewusst weich
  apiVersion: "2024-06-20" as unknown as Stripe.LatestApiVersion,
});

export default stripe;
