'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Check, Clock, Eye, Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { RatingStars } from '@/components/ui/rating-stars'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/components/ui/toast'
import type { Product, Review } from '@/lib/types'
import { averageRating, formatPrice } from '@/lib/utils'

export function ProductCard({ product, reviews }: { product: Product; reviews: Review[] }) {
  const { addItem, openCart } = useCart()
  const { toast } = useToast()
  const [added, setAdded] = useState(false)
  const productReviews = reviews.filter((r) => r.product_id === product.id)
  const avg = averageRating(productReviews.map((r) => r.rating))
  const discountByProduct: Record<string, number> = {
    'prod-honeycomb-controller-stand': 12,
    'prod-dual-honeycomb-controller-stand': 18,
    'prod-dragon-headphone-stand': 15,
    'prod-phone-stand': 21,
    'prod-hex-shelves': 9,
  }
  const discount = discountByProduct[product.id] ?? 10
  const originalPrice = Math.round(product.price / (1 - discount / 100))
  const add = () => {
    addItem({ product_id: product.id, product_name: product.name, image: product.images[0], color: product.available_colors[0], material: product.available_materials[0], unit_price: product.price, quantity: 1 })
    toast('Added to cart', { description: product.name, variant: 'success' })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
    openCart()
  }
  return <article className="group animate-fade-up relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="absolute left-3 top-3 z-10 rounded-sm bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">{discount}% off</div>
    <button aria-label="Add to wishlist" onClick={() => toast('Added to wishlist', { variant: 'success' })} className="absolute right-3 top-3 z-10 rounded-full bg-card/90 p-2 text-muted-foreground shadow-sm hover:text-destructive"><Heart className="size-4" /></button>
    <Link href={`/shop/${product.id}`} className="group/image relative aspect-square overflow-hidden bg-muted"><Image src={product.images[0] || '/placeholder.svg'} alt={product.name} fill className="object-cover transition-all duration-300 group-hover/image:scale-[1.03] group-hover/image:opacity-0" sizes="270px" /><Image src={product.images[1] || product.images[0] || '/placeholder.svg'} alt={`${product.name} alternate view`} fill className="object-cover opacity-0 transition-all duration-300 group-hover/image:scale-[1.03] group-hover/image:opacity-100" sizes="270px" /></Link>
    <div className="flex flex-1 flex-col gap-2 p-4"><div className="flex items-center justify-between gap-2"><span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{product.category_tags[0]}</span><span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3" />{product.lead_time_days[0]}–{product.lead_time_days[1]} days</span></div><Link href={`/shop/${product.id}`}><h3 className="line-clamp-2 text-sm font-bold leading-snug text-card-foreground hover:text-primary">{product.name}</h3></Link>{productReviews.length > 0 && <div className="flex items-center gap-1.5"><RatingStars rating={avg} /><span className="text-xs text-muted-foreground">({productReviews.length})</span></div>}<div className="mt-auto flex items-baseline gap-2 pt-2"><span className="text-xl font-black text-card-foreground">{formatPrice(product.price)}</span><span className="text-xs text-muted-foreground line-through">{formatPrice(originalPrice)}</span></div><div className="grid grid-cols-[1fr_auto_auto] gap-2 pt-2 opacity-100"><button onClick={add} className="rounded-md bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md active:translate-y-0" aria-live="polite">{added ? <><Check className="mr-1 inline size-3.5" />Added</> : <><ShoppingCart className="mr-1 inline size-3.5" />Add to Cart</>}</button><button aria-label="Quick view" onClick={() => toast('Quick view', { description: 'Open the product page to configure color and material.', variant: 'info' })} className="rounded-md border border-border p-2 text-muted-foreground hover:bg-muted"><Eye className="size-4" /></button><button aria-label="Wishlist" onClick={() => toast('Wishlist saved', { variant: 'success' })} className="rounded-md border border-border p-2 text-muted-foreground hover:bg-muted hover:text-destructive"><Heart className="size-4" /></button></div></div>
  </article>
}
