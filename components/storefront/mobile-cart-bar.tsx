'use client'

import { ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'

export function MobileCartBar({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()
  const add = () => { addItem({ product_id: product.id, product_name: product.name, image: product.images[0], color: product.available_colors[0], material: product.available_materials[0], unit_price: product.price, quantity: 1 }); openCart() }
  return <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-card/95 p-3 shadow-lg backdrop-blur md:hidden"><div><p className="text-xs text-muted-foreground">Starting at</p><p className="font-black">{formatPrice(product.price)}</p></div><button onClick={add} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"><ShoppingCart className="size-4" />Add to cart</button></div>
}
