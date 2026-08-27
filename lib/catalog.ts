import { createClient } from '@/lib/supabase/server'
import type { Product, Review } from '@/lib/types'

export async function getPublicProducts(): Promise<Product[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, slug, name, description, size_reference, price, images, available_colors, available_materials, category_tags, lead_time_days, category, is_active')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[v0] Failed to load public products:', error.message)
    return []
  }

  return (data ?? []).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    size_reference: product.size_reference ?? '',
    price: Number(product.price),
    images: product.images ?? [],
    available_colors: product.available_colors ?? [],
    available_materials: product.available_materials ?? [],
    category_tags: product.category_tags ?? (product.category ? [product.category] : []),
    lead_time_days: (product.lead_time_days ?? [3, 5]) as [number, number],
    is_published: product.is_active ?? true,
  }))
}

export async function getPublicReviews(): Promise<Review[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('id, product_id, user_id, user_name, rating, comment, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Failed to load public reviews:', error.message)
    return []
  }

  return (data ?? []).map((review) => ({
    ...review,
    user_id: review.user_id ?? 'anonymous',
    rating: Number(review.rating),
  }))
}

export async function getPublicCatalog() {
  const [products, reviews] = await Promise.all([getPublicProducts(), getPublicReviews()])
  return { products, reviews }
}
