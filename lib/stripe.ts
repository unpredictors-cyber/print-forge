/**
 * Stripe server-side helper.
 *
 * The Stripe integration is not connected yet, so this module runs in
 * MOCK MODE: `isStripeConfigured` is false and /api/checkout simulates a
 * successful checkout by redirecting straight to /checkout/success.
 *
 * To activate:
 *  1. Connect the Stripe integration so STRIPE_SECRET_KEY and
 *     STRIPE_WEBHOOK_SECRET exist.
 *  2. Install the dependency: `pnpm add stripe`
 *  3. Uncomment the implementation below.
 */

export const isStripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY)

// import Stripe from 'stripe'
//
// let stripeSingleton: Stripe | null = null
//
// export function getStripe(): Stripe {
//   if (!stripeSingleton) {
//     stripeSingleton = new Stripe(process.env.STRIPE_SECRET_KEY!)
//   }
//   return stripeSingleton
// }

export function getStripe(): never {
  throw new Error(
    'Stripe is not configured. Connect the Stripe integration and install the stripe package, then uncomment the implementation in lib/stripe.ts.',
  )
}
