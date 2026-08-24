'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ProductCard } from '@/components/storefront/product-card'
import { Skeleton } from '@/components/ui/skeleton'
import { CATEGORIES, mockProducts, mockReviews } from '@/data/mockData'
import { cn } from '@/lib/utils'

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-border bg-card">
      <Skeleton className="aspect-square rounded-none" />
      <div className="flex flex-col gap-2.5 p-4">
        <Skeleton className="h-3.5 w-16" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3.5 w-24" />
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-3.5 w-16" />
        </div>
      </div>
    </div>
  )
}

export function ShopGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = (searchParams.get('q') ?? '').toLowerCase()
  const category = searchParams.get('category')
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'newest')

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (search) params.set('q', search)
    else params.delete('q')
    if (sort !== 'newest') params.set('sort', sort)
    else params.delete('sort')
    router.replace(`/shop?${params.toString()}`, { scroll: false })
  }, [search, sort])

  // Simulate initial data fetch so skeletons are visible; swap with real fetch when Supabase is connected.
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const filtered = mockProducts.filter((p) => {
    if (!p.is_published) return false
    if (category && !p.category_tags.includes(category)) return false
    if (
      query &&
      !p.name.toLowerCase().includes(query) &&
      !p.description.toLowerCase().includes(query) &&
      !p.category_tags.some((t) => t.includes(query))
    )
      return false
    return true
  })

  function setCategory(cat: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (cat) params.set('category', cat)
    else params.delete('category')
    router.push(`/shop?${params.toString()}`)
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price
    if (sort === 'price-high') return b.price - a.price
    return b.id.localeCompare(a.id)
  })

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Category sidebar (desktop) / chips (mobile) */}
      <aside className="lg:w-48 lg:shrink-0" aria-label="Filter by category">
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-semibold">
          <SlidersHorizontal className="size-3.5" aria-hidden />
          Categories
        </h2>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
          <button
            onClick={() => setCategory(null)}
            className={cn(
              'rounded-md px-3 py-1.5 text-left text-sm capitalize transition-colors lg:w-full',
              !category
                ? 'bg-primary font-medium text-primary-foreground'
                : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground lg:bg-transparent',
            )}
          >
            All products
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-md px-3 py-1.5 text-left text-sm capitalize transition-colors lg:w-full',
                category === cat
                  ? 'bg-primary font-medium text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground lg:bg-transparent',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </aside>

      {/* Grid */}
      <div className="flex-1">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm outline-none transition focus:ring-2 focus:ring-ring" />
          </label>
          <label className="sm:w-44">
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none transition focus:ring-2 focus:ring-ring">
              <option value="newest">Newest</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
        <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">
          {loading
            ? 'Loading products...'
            : `${sorted.length} product${sorted.length === 1 ? '' : 's'}${
                query ? ` for "${query}"` : ''
              }${category ? ` in ${category}` : ''}`}
        </p>
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-md border border-dashed border-border p-12 text-center">
            <p className="text-sm font-medium">No products found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <div className="stagger-children grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} reviews={mockReviews} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
