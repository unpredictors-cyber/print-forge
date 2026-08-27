import { createClient } from '@supabase/supabase-js'
import { mockProducts, mockReviews } from '../data/mockData'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')

const supabase = createClient(url, key, { auth: { persistSession: false } })

const products = mockProducts.map((product) => ({
  id: product.id,
  slug: product.id,
  name: product.name,
  description: product.description,
  size_reference: product.size_reference,
  price: product.price,
  images: product.images,
  available_colors: product.available_colors,
  available_materials: product.available_materials,
  category_tags: product.category_tags,
  lead_time_days: product.lead_time_days,
  category: product.category_tags[0] ?? null,
  is_active: product.is_published,
}))

const reviews = mockReviews.map((review) => ({
  id: review.id,
  product_id: review.product_id,
  user_id: null,
  user_name: review.user_name,
  rating: review.rating,
  comment: review.comment,
  created_at: review.created_at,
}))

const { error: productError } = await supabase.from('products').upsert(products, { onConflict: 'id' })
if (productError) throw productError
const { error: reviewError } = await supabase.from('reviews').upsert(reviews, { onConflict: 'id' })
if (reviewError) throw reviewError
console.log(`Seeded ${products.length} products and ${reviews.length} reviews.`)
