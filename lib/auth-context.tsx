'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Profile, Role } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import { isValidEmail } from '@/lib/validation'

type AuthResult = { ok: boolean; message: string }

type AuthContextValue = {
  user: Profile | null
  isLoading: boolean
  signIn: (email: string, password: string, remember?: boolean) => Promise<AuthResult>
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

let supabase: SupabaseClient | null = null
function getClient() {
  if (!supabase) supabase = createClient()
  return supabase
}

function normalizeRole(role: string | null | undefined): Role {
  const r = (role ?? 'customer').toUpperCase()
  if (r === 'ADMIN' || r === 'MASTER_ADMIN') return r
  return 'CUSTOMER'
}

function profileFromAuthUser(authUser: {
  id: string
  email?: string
  user_metadata?: { full_name?: string; name?: string }
  created_at?: string
}): Profile {
  return {
    id: authUser.id,
    email: authUser.email ?? '',
    full_name: authUser.user_metadata?.full_name ?? authUser.user_metadata?.name ?? '',
    role: 'CUSTOMER',
    scopes: [],
    phone: null,
    address: null,
    created_at: authUser.created_at ?? '',
  }
}

async function fetchProfile(userId: string): Promise<Profile | null> {
  const client = getClient()
  const { data } = await client
    .from('profiles')
    .select('id, email, full_name, role, scopes, phone, address, created_at')
    .eq('id', userId)
    .maybeSingle()
  if (!data) return null
  return {
    id: data.id,
    email: data.email ?? '',
    full_name: data.full_name ?? '',
    role: normalizeRole(data.role),
    scopes: (data.scopes as Profile['scopes']) ?? [],
    phone: data.phone ?? null,
    address: data.address ? JSON.stringify(data.address) : null,
    created_at: data.created_at ?? '',
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const client = getClient()

    let cancelled = false

    async function applySession(session: Awaited<ReturnType<typeof client.auth.getSession>>['data']['session']) {
      if (!session?.user) {
        if (!cancelled) setUser(null)
        return
      }

      const profile = await fetchProfile(session.user.id)
      if (cancelled) return
      setUser(profile ?? profileFromAuthUser(session.user))
    }

    async function init() {
      const { data: { session } } = await client.auth.getSession()
      await applySession(session)
      if (!cancelled) setIsLoading(false)
    }
    init()

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      void applySession(session).finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string, _remember = false): Promise<AuthResult> {
    if (!isValidEmail(email)) return { ok: false, message: 'Enter a valid email address.' }
    const client = getClient()
    const { error } = await client.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
    if (error) return { ok: false, message: 'Incorrect email or password. Please try again.' }
    return { ok: true, message: 'Signed in successfully.' }
  }

  async function signUp(name: string, email: string, password: string): Promise<AuthResult> {
    if (!isValidEmail(email)) return { ok: false, message: 'Enter a valid email address.' }
    const client = getClient()
    const { data, error } = await client.auth.signUp({ email: email.trim().toLowerCase(), password })
    if (error) {
      if (error.message.toLowerCase().includes('already')) {
        return { ok: false, message: 'An account with this email already exists — sign in instead.' }
      }
      return { ok: false, message: error.message }
    }
    if (!data.user) return { ok: false, message: 'We could not create your account. Please try again.' }

    // When email confirmation is disabled, Supabase returns a session immediately.
    // Keep this fallback for projects that return a user without an active session.
    if (!data.session) {
      const { error: signInError } = await client.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })
      if (signInError) {
        return { ok: false, message: 'Account created, but sign-in is not available yet. Please check the Supabase email confirmation setting.' }
      }
    }

    await client.from('profiles').upsert({
      id: data.user.id,
      email: email.trim().toLowerCase(),
      full_name: name.trim(),
      role: 'customer',
      scopes: [],
    })

    return { ok: true, message: 'Account created successfully.' }
  }

  async function signOut(): Promise<void> {
    const client = getClient()
    await client.auth.signOut()
    setUser(null)
  }

  const value = useMemo(() => ({ user, isLoading, signIn, signUp, signOut }), [user, isLoading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
