/**
 * Supabase browser client.
 *
 * The Supabase integration is not connected yet, so this module runs in
 * MOCK MODE: `isSupabaseConfigured` is false and the app falls back to
 * `data/mockData.ts` everywhere.
 *
 * To activate:
 *  1. Connect the Supabase integration (Project Settings → Integrations)
 *     so NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY exist.
 *  2. Install dependencies: `pnpm add @supabase/supabase-js @supabase/ssr`
 *  3. Uncomment the implementation below.
 */

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

// import { createBrowserClient } from '@supabase/ssr'
//
// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   )
// }

export function createClient(): never {
  throw new Error(
    'Supabase is not configured. Connect the Supabase integration and install @supabase/supabase-js + @supabase/ssr, then uncomment the implementation in lib/supabase/client.ts.',
  )
}
