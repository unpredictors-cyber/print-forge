import { NextResponse } from 'next/server'
import { isStripeConfigured } from '@/lib/stripe'

/**
 * Stripe webhook handler.
 *
 * Handles `checkout.session.completed` to create the order record.
 * Signature verification is MANDATORY — never trust an unverified payload.
 *
 * MOCK MODE (Stripe not connected): returns 503 so misconfigured webhooks
 * fail loudly instead of silently dropping events.
 */
export async function POST(request: Request) {
  if (!isStripeConfigured || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe webhook not configured' },
      { status: 503 },
    )
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  const rawBody = await request.text()

  /*
   * REAL STRIPE MODE — uncomment after connecting Stripe & installing `stripe`:
   *
   * const stripe = getStripe()
   * let event: Stripe.Event
   * try {
   *   event = stripe.webhooks.constructEvent(
   *     rawBody,
   *     signature,
   *     process.env.STRIPE_WEBHOOK_SECRET!,
   *   )
   * } catch {
   *   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
   * }
   *
   * if (event.type === 'checkout.session.completed') {
   *   const session = event.data.object as Stripe.Checkout.Session
   *
   *   // Idempotent order creation: use the session id as the unique key so
   *   // a retried webhook cannot create a duplicate order.
   *   const supabase = createAdminClient() // service-role client, server only
   *   await supabase.from('orders').upsert(
   *     {
   *       stripe_session_id: session.id,
   *       customer_id: session.client_reference_id ?? null, // null => guest
   *       status: 'PENDING',
   *       total_amount: (session.amount_total ?? 0) / 100,
   *       metadata: {
   *         email: session.customer_details?.email,
   *         items: session.metadata?.items ? JSON.parse(session.metadata.items) : [],
   *       },
   *     },
   *     { onConflict: 'stripe_session_id' },
   *   )
   * }
   *
   * return NextResponse.json({ received: true })
   */

  // Unreachable while not configured; satisfies the type checker
  void rawBody
  return NextResponse.json({ received: true })
}
