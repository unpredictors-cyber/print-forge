/**
 * Supabase server client (RSC / Route Handlers / Server Actions).
 *
 * The Supabase integration is not connected yet, so this module runs in
 * MOCK MODE: `isSupabaseConfigured` is false and the app falls back to
 * `data/mockData.ts` everywhere.
 *
 * To activate:
 *  1. Connect the Supabase integration so NEXT_PUBLIC_SUPABASE_URL and
 *     NEXT_PUBLIC_SUPABASE_ANON_KEY exist.
 *  2. Install dependencies: `pnpm add @supabase/supabase-js @supabase/ssr`
 *  3. Uncomment the implementation below.
 */

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
//
// export async function createClient() {
//   const cookieStore = await cookies()
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll()
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options),
//             )
//           } catch {
//             // Called from a Server Component — middleware refreshes sessions.
//           }
//         },
//       },
//     },
//   )
// }

export async function createClient(): Promise<never> {
  throw new Error(
    'Supabase is not configured. Connect the Supabase integration and install @supabase/supabase-js + @supabase/ssr, then uncomment the implementation in lib/supabase/server.ts.',
  )
}
