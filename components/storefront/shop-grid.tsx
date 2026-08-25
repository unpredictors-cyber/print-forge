'use client'

import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'

import { ProductCard } from '@/components/storefront/product-card'
import { CATEGORIES, mockProducts, mockReviews } from '@/data/mockData'
import { cn } from '@/lib/utils'

export function ShopGrid() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('newest')

  const products = useMemo(() => {
    const query = search.trim().toLowerCase()
    return mockProducts
      .filter((product) => product.is_published)
      .filter((product) => category === 'all' || product.category_tags.includes(category))
      .filter((product) => !query || product.name.toLowerCase().includes(query))
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price
        if (sort === 'price-high') return b.price - a.price
        return mockProducts.indexOf(a) - mockProducts.indexOf(b)
      })
  }, [search, category, sort])

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="lg:w-52 lg:shrink-0" aria-label="Filter by category">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-foreground"><SlidersHorizontal className="size-4 text-accent" aria-hidden /> Categories</h2>
        <div className="flex flex-wrap gap-2 lg:flex-col">
          {['all', ...CATEGORIES].map((cat) => (
            <button key={cat} type="button" onClick={() => setCategory(cat)} className={cn('rounded-lg px-3 py-2 text-left text-sm capitalize transition-colors', category === cat ? 'bg-foreground font-bold text-background shadow-sm' : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground')}>
              {cat === 'all' ? 'All products' : cat}
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-secondary/50 p-3 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search products by name</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-accent" aria-hidden />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product name" className="h-11 w-full rounded-lg border border-border bg-card pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring" />
          </label>
          <label className="sm:w-52"><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
        </div>
        <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">{products.length} product{products.length === 1 ? '' : 's'}{search ? ` matching “${search}”` : ''}</p>
        {products.length === 0 ? <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center"><p className="font-bold">No products found</p><p className="mt-1 text-sm text-muted-foreground">Try another name or category.</p></div> : <div className="stagger-children grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} reviews={mockReviews} />)}</div>}
      </div>
    </div>
  )
}
