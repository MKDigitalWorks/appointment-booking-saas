/* CI-sicheres Stripe-Shim: in CI wird ein Mock verwendet */
let stripe: any = null;
const isCI = process.env.CI === \"true\" || process.env.CI === \"1\";

if (isCI) {
  stripe = {
    checkout: {
      sessions: {
        async create() {
          return { url: \"https://example.org/mock-checkout\" };
        },
      },
    },
  };
} else {
  // Runtime import – damit CI ohne Stripe-Paket nicht crasht
  const { default: Stripe } = require(\"stripe\");
  const key = process.env.STRIPE_SECRET_KEY || \"sk_test_dummy\";
  stripe = new Stripe(key, { apiVersion: \"2023-10-16\" });
}

export default stripe;