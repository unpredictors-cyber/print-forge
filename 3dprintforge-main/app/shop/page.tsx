import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ShopGrid } from '@/components/storefront/shop-grid'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Browse our full catalog of custom 3D printed products. Filter by category and customize color and material.',
}

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Every product is printed on demand in your choice of color and material.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4]" />
            ))}
          </div>
        }
      >
        <ShopGrid />
      </Suspense>
    </div>
  )
}
