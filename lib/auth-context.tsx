'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Profile, Role } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import type { SupabaseClient } from '@supabase/supabase-js'

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

    async function init() {
      const { data: { session } } = await client.auth.getSession()
      if (session?.user) {
        const profile = await fetchProfile(session.user.id)
        if (profile) setUser(profile)
      }
      setIsLoading(false)
    }
    init()

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          const profile = await fetchProfile(session.user.id)
          setUser(profile)
        } else {
          setUser(null)
        }
      })()
    })

    return () => subscription.unsubscribe()
  }, [])

  async function signIn(email: string, password: string, _remember = false): Promise<AuthResult> {
    const client = getClient()
    const { error } = await client.auth.signInWithPassword({ email: email.trim().toLowerCase(), password })
    if (error) return { ok: false, message: 'Incorrect email or password. Please try again.' }
    return { ok: true, message: 'Signed in successfully.' }
  }

  async function signUp(name: string, email: string, password: string): Promise<AuthResult> {
    const client = getClient()
    const { data, error } = await client.auth.signUp({ email: email.trim().toLowerCase(), password })
    if (error) {
      if (error.message.toLowerCase().includes('already')) {
        return { ok: false, message: 'An account with this email already exists — sign in instead.' }
      }
      return { ok: false, message: error.message }
    }
    if (data.user) {
      await client.from('profiles').upsert({
        id: data.user.id,
        email: email.trim().toLowerCase(),
        full_name: name.trim(),
        role: 'customer',
        scopes: [],
      })
    }
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
