/* CI-sicheres Stripe-Shim: In CI wird nur ein Mock genutzt */
let stripe: any = null;
const isCI = process.env.CI === "true" || process.env.CI === "1";

if (isCI) {
  stripe = {
    checkout: {
      sessions: {
        async create() {
          return { url: "https://example.org/mock-checkout" };
        },
      },
    },
  };
} else {
  // Runtime import, damit fehlende Pakete in CI nicht crashen
  const { default: Stripe } = require("stripe");
  const key = process.env.STRIPE_SECRET_KEY;
  stripe = new Stripe(key || "sk_test_dummy", { apiVersion: "2023-10-16" });
}

export default stripe;
