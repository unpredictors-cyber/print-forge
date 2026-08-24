import { ProductCard } from '@/components/storefront/product-card'
import type { Product, Review } from '@/lib/types'

export function RelatedProducts({
  currentProduct,
  allProducts,
  reviews,
}: {
  currentProduct: Product
  allProducts: Product[]
  reviews: Review[]
}) {
  const related = allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.is_published &&
        p.category_tags.some((tag) => currentProduct.category_tags.includes(tag)),
    )
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <section aria-label="Related products" className="mt-14">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">You may also like</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} reviews={reviews} />
        ))}
      </div>
    </section>
  )
}
