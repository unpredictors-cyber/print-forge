'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { useToast } from '@/components/ui/toast'

export function QuickViewDialog({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem, openCart } = useCart()
  const { toast } = useToast()
  useEffect(() => { const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [onClose])
  const add = () => { addItem({ product_id: product.id, product_name: product.name, image: product.images[0], color: product.available_colors[0], material: product.available_materials[0], unit_price: product.price, quantity: 1 }); toast('Added to cart', { description: product.name, variant: 'success' }); openCart(); onClose() }
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/60 p-4" role="dialog" aria-modal="true" aria-label={`Quick view ${product.name}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="relative grid w-full max-w-2xl overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:grid-cols-2"><button onClick={onClose} aria-label="Close quick view" className="absolute right-3 top-3 z-10 rounded-full bg-card/90 p-2 text-muted-foreground hover:text-foreground"><X className="size-4" /></button><div className="relative aspect-square bg-muted"><Image src={product.images[0] || '/placeholder.svg'} alt={product.name} fill className="object-cover" /></div><div className="flex flex-col gap-4 p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-primary">Quick view</p><h2 className="text-2xl font-black text-card-foreground">{product.name}</h2><p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p><p className="text-2xl font-black">{formatPrice(product.price)}</p><div className="mt-auto grid gap-2"><button onClick={add} className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"><ShoppingCart className="size-4" />Add to cart</button><Link href={`/shop/${product.id}`} onClick={onClose} className="rounded-md border border-border px-4 py-3 text-center text-sm font-semibold hover:bg-muted">View full details</Link></div></div></div></div>
}
