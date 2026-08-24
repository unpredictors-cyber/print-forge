import { NextResponse } from 'next/server'
import { isStripeConfigured } from '@/lib/stripe'
import { mockProducts, MATERIALS } from '@/data/mockData'

const MAX_QTY_PER_LINE = 10
const MAX_QTY_PER_ORDER = 25

interface CheckoutItemInput {
  product_id: string
  color: string
  material_id: string
  quantity: number
}

/**
 * Creates a checkout session.
 *
 * Prices and quantities are ALWAYS recomputed server-side from the catalog —
 * the client only sends product ids, variant selections, and quantities.
 *
 * MOCK MODE (Stripe not connected): validates the order and returns a
 * redirect to /checkout/success?mock=1 so the full flow is testable.
 * When Stripe is connected, replace the mock branch with a real
 * stripe.checkout.sessions.create call (guest checkout works by simply not
 * requiring a logged-in user; metadata carries color/material selections).
 */
export async function POST(request: Request) {
  let body: { items?: CheckoutItemInput[]; idempotencyKey?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const items = body.items
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  // Server-side validation: recompute every price from the catalog
  let totalQuantity = 0
  const lineItems: {
    name: string
    description: string
    unit_amount: number
    quantity: number
    metadata: Record<string, string>
  }[] = []

  for (const item of items) {
    const product = mockProducts.find((p) => p.id === item.product_id && p.is_published)
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.product_id}` }, { status: 400 })
    }

    const material = product.available_materials.find((m) => m.id === item.material_id)
    if (!material) {
      return NextResponse.json(
        { error: `Material not available for ${product.name}` },
        { status: 400 },
      )
    }

    const color = product.available_colors.find((c) => c.name === item.color)
    if (!color) {
      return NextResponse.json(
        { error: `Color not available for ${product.name}` },
        { status: 400 },
      )
    }

    if (
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > MAX_QTY_PER_LINE
    ) {
      return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 })
    }
    totalQuantity += item.quantity

    // Recompute unit price server-side: base price x material multiplier
    const unitAmount = Math.round(product.price * material.priceMultiplier * 100)

    lineItems.push({
      name: product.name,
      description: `${color.name} · ${material.name}`,
      unit_amount: unitAmount,
      quantity: item.quantity,
      metadata: {
        product_id: product.id,
        color: color.name,
        material: material.name,
        lead_time_days: product.lead_time_days.join('-'),
      },
    })
  }

  if (totalQuantity > MAX_QTY_PER_ORDER) {
    return NextResponse.json(
      { error: `Orders are limited to ${MAX_QTY_PER_ORDER} items total` },
      { status: 400 },
    )
  }

  const origin = request.headers.get('origin') ?? new URL(request.url).origin

  if (!isStripeConfigured) {
    // MOCK MODE: simulate a successful session so the flow is fully testable
    const mockTotal = lineItems.reduce((s, li) => s + li.unit_amount * li.quantity, 0)
    return NextResponse.json({
      url: `${origin}/checkout/success?mock=1&total=${mockTotal}`,
      mock: true,
    })
  }

  /*
   * REAL STRIPE MODE — uncomment after connecting Stripe & installing `stripe`:
   *
   * const stripe = getStripe()
   * const session = await stripe.checkout.sessions.create(
   *   {
   *     mode: 'payment',
   *     line_items: lineItems.map((li) => ({
   *       price_data: {
   *         currency: 'usd',
   *         product_data: { name: li.name, description: li.description, metadata: li.metadata },
   *         unit_amount: li.unit_amount,
   *       },
   *       quantity: li.quantity,
   *     })),
   *     metadata: {
   *       items: JSON.stringify(lineItems.map((li) => li.metadata)),
   *     },
   *     // Guest checkout: email collected by Stripe, no auth required
   *     customer_creation: 'if_required',
   *     success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
   *     cancel_url: `${origin}/checkout/cancel`,
   *   },
   *   // Idempotency: a client retry cannot create a duplicate charge
   *   { idempotencyKey: body.idempotencyKey },
   * )
   * return NextResponse.json({ url: session.url })
   */

  return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
}
