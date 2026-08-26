import type { SupabaseClient } from '@supabase/supabase-js'
import type { ColorOption, Material, Product, Review } from '@/lib/types'

interface ProductRow {
  id: string
  slug: string
  name: string
  description: string | null
  price: number
  images: string[] | null
  category: string | null
  size_reference: string | null
  available_colors: ColorOption[] | null
  available_materials: Material[] | null
  category_tags: string[] | null
  lead_time_days: number[] | null
  is_published: boolean | null
  is_active: boolean | null
}

interface ReviewRow {
  id: string
  product_id: string
  user_id: string | null
  user_name: string
  rating: number
  comment: string
  created_at: string
}

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    size_reference: row.size_reference ?? '',
    price: Number(row.price),
    images: row.images ?? [],
    available_colors: row.available_colors ?? [],
    available_materials: row.available_materials ?? [],
    category_tags: row.category_tags ?? [],
    lead_time_days: [row.lead_time_days?.[0] ?? 3, row.lead_time_days?.[1] ?? 5],
    is_published: row.is_published ?? row.is_active ?? true,
  }
}

export function mapReviewRow(row: ReviewRow): Review {
  return {
    id: row.id,
    product_id: row.product_id,
    user_id: row.user_id ?? '',
    user_name: row.user_name,
    rating: row.rating,
    comment: row.comment,
    created_at: row.created_at,
  }
}

export async function fetchProducts(
  supabase: SupabaseClient,
  options: { publishedOnly?: boolean } = {},
): Promise<Product[]> {
  let query = supabase.from('products').select('*')
  if (options.publishedOnly) {
    query = query.eq('is_published', true)
  }
  const { data, error } = await query.returns<ProductRow[]>()
  if (error) throw error
  return (data ?? []).map(mapProductRow)
}

export async function fetchProductById(
  supabase: SupabaseClient,
  id: string,
): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()
    .returns<ProductRow | null>()
  if (error) throw error
  return data ? mapProductRow(data) : null
}

export async function fetchReviewsForProduct(
  supabase: SupabaseClient,
  productId: string,
): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
    .returns<ReviewRow[]>()
  if (error) throw error
  return (data ?? []).map(mapReviewRow)
}

export async function fetchAllReviews(supabase: SupabaseClient): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .returns<ReviewRow[]>()
  if (error) throw error
  return (data ?? []).map(mapReviewRow)
}

export async function insertReview(
  supabase: SupabaseClient,
  input: { product_id: string; user_name: string; rating: number; comment: string },
): Promise<Review | null> {
  const { data, error } = await supabase
    .from('reviews')
    .insert(input)
    .select('*')
    .maybeSingle()
    .returns<ReviewRow | null>()
  if (error) throw error
  return data ? mapReviewRow(data) : null
}
