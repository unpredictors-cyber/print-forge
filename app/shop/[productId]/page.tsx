import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ProductConfigurator } from '@/components/storefront/product-configurator'
import { ProductGallery } from '@/components/storefront/product-gallery'
import { RelatedProducts } from '@/components/storefront/related-products'
import { ReviewSection } from '@/components/storefront/review-section'
import { mockProducts, mockReviews } from '@/data/mockData'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ productId: string }>
}): Promise<Metadata> {
  const { productId } = await params
  const product = mockProducts.find((p) => p.id === productId)
  if (!product) return { title: 'Product not found' }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const product = mockProducts.find((p) => p.id === productId && p.is_published)
  if (!product) notFound()

  const productReviews = mockReviews.filter((r) => r.product_id === product.id)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="truncate font-medium text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div className="animate-fade-up">
          <ProductConfigurator product={product} reviews={productReviews} />
        </div>
      </div>

      <ReviewSection reviews={productReviews} />
      <RelatedProducts
        currentProduct={product}
        allProducts={mockProducts}
        reviews={mockReviews}
      />
    </div>
  )
}
