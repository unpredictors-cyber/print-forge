/*
# Extend products table with storefront fields and fix review policies

## Purpose
The existing `products` table has basic columns (id, slug, name, description, price, images, category, stock, is_active, created_at).
The storefront app needs additional fields to support color/material configuration, category tags, lead times, and size references.
Reviews need an anon-accessible INSERT policy so the storefront can submit reviews without requiring auth (guest checkout model).

## Changes to `products` table
1. Add `size_reference` (text) — human-readable size description shown on product page
2. Add `available_colors` (jsonb) — array of {name, hex} color options
3. Add `available_materials` (jsonb) — array of {id, name, description, priceMultiplier} material options
4. Add `category_tags` (text[]) — tags for filtering and related products
5. Add `lead_time_days` (int4[]) — [min, max] business days for production
6. Add `is_published` (boolean, default true) — whether product is visible on storefront

## Changes to `reviews` table policies
1. Drop existing INSERT policy (requires auth.uid() = user_id)
2. Add new INSERT policy allowing anon + authenticated to insert reviews
   (guest checkout model — reviews can be submitted without an account)

## Security
- products: existing public SELECT policy remains; no new write policies needed (admin-only via service role)
- reviews: public SELECT remains; new INSERT policy allows anon + authenticated
- All other tables unchanged
*/

-- Add missing columns to products table
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS size_reference text,
  ADD COLUMN IF NOT EXISTS available_colors jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS available_materials jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS category_tags text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS lead_time_days int4[] DEFAULT '{3,5}',
  ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT true;

-- Drop and recreate review INSERT policy to allow anon (guest checkout)
DROP POLICY IF EXISTS "Users create own reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_insert_reviews" ON public.reviews;

CREATE POLICY "anon_insert_reviews" ON public.reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Ensure products have anon SELECT (already exists but make it explicit/idempotent)
DROP POLICY IF EXISTS "Products publicly readable" ON public.products;
CREATE POLICY "Products publicly readable" ON public.products FOR SELECT
  TO anon, authenticated USING (true);

-- Ensure reviews have anon SELECT
DROP POLICY IF EXISTS "Reviews publicly readable" ON public.reviews;
CREATE POLICY "Reviews publicly readable" ON public.reviews FOR SELECT
  TO anon, authenticated USING (true);
