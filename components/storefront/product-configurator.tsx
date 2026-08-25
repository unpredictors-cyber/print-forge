'use client'

import { Check, Clock, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/ui/rating-stars'
import { useToast } from '@/components/ui/toast'
import { useCart } from '@/lib/cart-context'
import type { Product, Review } from '@/lib/types'
import { averageRating, cn, formatPrice } from '@/lib/utils'

export function ProductConfigurator({
  product,
  reviews,
}: {
  product: Product
  reviews: Review[]
}) {
  const { addItem, openCart } = useCart()
  const { toast } = useToast()
  const [color, setColor] = useState(product.available_colors[0])
  const [material, setMaterial] = useState(product.available_materials[0])
  const [quantity, setQuantity] = useState(1)

  const unitPrice = useMemo(
    () => Math.round(product.price * material.priceMultiplier * 100) / 100,
    [product.price, material],
  )
  const avg = averageRating(reviews.map((r) => r.rating))

  function handleAddToCart() {
    addItem({
      product_id: product.id,
      product_name: product.name,
      image: product.images[0],
      color,
      material,
      quantity,
      unit_price: unitPrice,
    })
    toast('Added to cart', {
      description: `${product.name} — ${color.name}, ${material.name} × ${quantity}`,
    })
    openCart()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap gap-1.5">
          {product.category_tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{product.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {reviews.length > 0 ? (
            <span className="flex items-center gap-1.5">
              <RatingStars rating={avg} size="md" />
              <span className="text-sm text-muted-foreground">
                {avg.toFixed(1)} ({reviews.length} review{reviews.length === 1 ? '' : 's'})
              </span>
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">No reviews yet</span>
          )}
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="size-3.5" aria-hidden />
            Lead time: {product.lead_time_days[0]}–{product.lead_time_days[1]} business days
          </span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      <section className="rounded-md border border-border bg-muted/50 p-4" aria-labelledby="size-reference-heading">
        <h2 id="size-reference-heading" className="text-sm font-semibold">Size & scale reference</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{product.size_reference}</p>
      </section>

      {/* Color swatches */}
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Color: <span className="text-muted-foreground">{color.name}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {product.available_colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c)}
              aria-label={`Select color ${c.name}`}
              aria-pressed={color.name === c.name}
              className={cn(
                'relative size-9 rounded-full border transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none',
                color.name === c.name ? 'border-accent ring-2 ring-accent/40' : 'border-border',
              )}
              style={{ backgroundColor: c.hex }}
            >
              {color.name === c.name && (
                <Check
                  className="absolute inset-0 m-auto size-4 text-white mix-blend-difference"
                  aria-hidden
                />
              )}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Material selector */}
      <fieldset>
        <legend className="mb-2.5 text-sm font-medium">
          Material: <span className="text-muted-foreground">{material.name}</span>
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {product.available_materials.map((m) => {
            const price = Math.round(product.price * m.priceMultiplier * 100) / 100
            const selected = material.id === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMaterial(m)}
                aria-pressed={selected}
                className={cn(
                  'flex flex-col gap-0.5 rounded-md border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none',
                  selected
                    ? 'border-primary bg-accent'
                    : 'border-border bg-card hover:border-ring/50',
                )}
              >
                <span className="flex items-center justify-between text-sm font-medium">
                  {m.name}
                  <span className={selected ? 'text-accent-foreground' : 'text-muted-foreground'}>
                    {m.priceMultiplier === 1 ? 'Included' : `+${formatPrice(price - product.price)}`}
                  </span>
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {m.description}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {/* Quantity + price + CTA */}
      <div className="flex flex-col gap-4 rounded-md border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-md border border-border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              className="p-2.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              aria-label="Increase quantity"
              disabled={quantity >= 10}
              className="p-2.5 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold" aria-live="polite">
              {formatPrice(unitPrice * quantity)}
            </p>
            {material.priceMultiplier > 1 && (
              <p className="text-xs text-muted-foreground">
                {formatPrice(unitPrice)} each with {material.name}
              </p>
            )}
          </div>
        </div>
        <Button size="lg" className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="size-4" aria-hidden />
          Add to cart
        </Button>
      </div>
    </div>
  )
}
