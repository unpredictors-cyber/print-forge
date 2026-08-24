'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgePercent, ChevronLeft, ChevronRight, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { mockProducts, mockReviews } from '@/data/mockData'
import { ProductCard } from '@/components/storefront/product-card'

const slides = [
  { label: 'Made to order', title: 'Your idea, in your colour.', copy: 'Custom-coloured 3D printed products made to order, with designs ready to bring home.', image: '/images/hero-printer.png', cta: 'Shop ready-to-print products' },
  { label: 'Creator favourite', title: 'Unique designs, made for you.', copy: 'Choose your colour and make it yours with distinctive products printed just for your space.', image: '/images/products/chess-set.png', cta: 'Explore best sellers' },
  { label: 'Fast turnaround', title: 'More personality. Less waiting.', copy: 'Discover unique ready-to-print products with quick turnaround from order to dispatch.', image: '/images/products/litho-lamp.png', cta: 'See hot deals' },
]

const trustItems: [string, typeof Truck][] = [
  ['Fast Shipping', Truck], ['7 Days Return Policy', RotateCcw], ['Best Deals', BadgePercent], ['Safe Transactions', ShieldCheck],
]

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const products = mockProducts.filter((p) => p.is_published)
  const current = slides[slide]

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((currentSlide) => (currentSlide + 1) % slides.length), 2000)
    return () => window.clearInterval(timer)
  }, [])
  const advance = (direction: number) => setSlide((slide + direction + slides.length) % slides.length)

  return (
    <main className="w-full min-h-screen bg-background">
      <section className="w-full px-4 pt-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-card shadow-sm">
          <div key={slide} className="grid min-h-[360px] items-stretch md:grid-cols-[.9fr_1.1fr] lg:min-h-[370px]" aria-live="polite">
            <div className="hero-slide-copy relative z-10 flex flex-col justify-center px-6 py-6 sm:px-10 sm:py-7 lg:px-12">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-primary">{current.label}</p>
              <h1 className="mt-3 max-w-xl text-3xl font-black tracking-tight text-card-foreground sm:text-4xl lg:text-5xl">{current.title}</h1>
              <p className="mt-4 max-w-md leading-7 text-muted-foreground">{current.copy}</p>
              <Link href="/shop" className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90">{current.cta}<ArrowRight className="size-4" /></Link>
            </div>
            <div className="relative h-[220px] overflow-hidden bg-muted md:h-[370px]"><Image src={current.image} alt={`${current.title} featured image`} width={1200} height={900} className="h-full w-full object-cover object-center transition-opacity duration-500" priority={slide === 0} sizes="(max-width: 768px) 100vw, 55vw" /></div>
          </div>
          <button aria-label="Previous slide" onClick={() => advance(-1)} className="absolute left-3 top-1/2 rounded-full bg-card/90 p-2 shadow-sm"><ChevronLeft className="size-4" /></button>
          <button aria-label="Next slide" onClick={() => advance(1)} className="absolute right-3 top-1/2 rounded-full bg-card/90 p-2 shadow-sm"><ChevronRight className="size-4" /></button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">{slides.map((_, i) => <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setSlide(i)} className={`h-1.5 rounded-full ${i === slide ? 'w-7 bg-primary' : 'w-2 bg-muted-foreground/45'}`} />)}</div>
        </div>
        <div className="-mx-4 sm:mx-0"><TrustStrip /></div>
      </section>
      <ProductRail title="Best Selling Products" eyebrow="PrintForge picks" products={products.slice(0, 5)} />
      <ProductRail title="New Arrivals" eyebrow="Just landed" products={products.slice(3, 8)} />
      <ProductRail title="Hot Deals" eyebrow="Limited time" products={products.slice().reverse().slice(0, 5)} accent />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"><div className="grid gap-4 rounded-md bg-primary p-6 text-primary-foreground sm:grid-cols-[1fr_auto] sm:items-center sm:p-10"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-primary-foreground/70">For businesses & makers</p><h2 className="mt-2 text-2xl font-black">Need more than one?</h2><p className="mt-2 text-sm text-primary-foreground/80">Get dedicated pricing and support for bulk orders, custom printing, and workshop setups.</p></div><Link href="/policies/bulk-enquiry" className="inline-flex items-center justify-center gap-2 rounded-md bg-card px-5 py-3 text-sm font-bold text-primary">Bulk enquiry <ArrowRight className="size-4" /></Link></div></section>
    </main>
  )
}

function TrustStrip() {
  const items = [...trustItems, ...trustItems]
  return <div className="trust-marquee overflow-hidden border-x border-b border-border bg-card py-5" aria-label="Store benefits"><div className="trust-marquee-track flex w-max items-center gap-14 px-8">{items.map(([label, Icon], index) => { const BenefitIcon = Icon; return <div key={`${label}-${index}`} className="flex min-w-[180px] shrink-0 items-center justify-center gap-3 whitespace-nowrap px-3 text-center text-xs font-semibold text-foreground sm:min-w-[220px] sm:text-sm"><BenefitIcon className="size-5 shrink-0 text-primary" />{label}</div> })}</div></div>
}

function ProductRail({ title, eyebrow, products, accent = false }: { title: string; eyebrow: string; products: typeof mockProducts; accent?: boolean }) {
  return <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8"><div className="flex items-end justify-between"><div><p className={`text-xs font-bold uppercase tracking-[.18em] ${accent ? 'text-accent' : 'text-primary'}`}>{eyebrow}</p><h2 className="mt-2 text-2xl font-black text-card-foreground">{title}</h2></div><Link href="/shop" className="flex items-center gap-1 text-sm font-bold text-primary">View all <ArrowRight className="size-4" /></Link></div><div className="-mx-4 mt-5 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">{products.map((product) => <div key={product.id} className="w-[250px] shrink-0 snap-start sm:w-[270px]"><ProductCard product={product} reviews={mockReviews} /></div>)}</div></section>
}
