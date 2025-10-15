/* CI-sicheres Stripe-Shim */
let stripe: any;
const isCI = process.env.CI === "true" || process.env.CI === "1";

if (isCI) {
  stripe = {
    checkout: {
      sessions: {
        async create() { return { url: "https://example.org/mock-checkout" }; },
      },
    },
  };
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require("stripe").default;
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2023-10-16",
  });
}
export default stripe;