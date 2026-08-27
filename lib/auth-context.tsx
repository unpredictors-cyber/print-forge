'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Profile } from '@/lib/types'

export type DemoRole = 'MASTER_ADMIN' | 'ADMIN' | 'CUSTOMER'
type StoredUser = Profile & { password: string }

const DEMO_USERS: StoredUser[] = [
  { id: 'user-master', email: 'master@example.com', full_name: 'Master Admin', role: 'MASTER_ADMIN', scopes: ['analytics', 'products', 'reviews', 'support', 'team', 'blog'], phone: '', address: '', created_at: '2026-01-01', password: 'master123' },
  { id: 'user-staff', email: 'staff@example.com', full_name: 'Staff Admin', role: 'ADMIN', scopes: ['products', 'support'], phone: '', address: '', created_at: '2026-01-01', password: 'staff123' },
  { id: 'user-1', email: 'user@example.com', full_name: 'Demo Customer', role: 'CUSTOMER', scopes: [], phone: '+1 (555) 014-2024', address: '42 Market Street, Portland, OR', created_at: '2026-01-01', password: 'user123' },
]

const USERS_KEY = 'printforge-demo-users'
const SESSION_KEY = 'printforge-demo-user'
const REMEMBER_KEY = 'printforge-demo-user-remember'

type AuthResult = { ok: boolean; message: string }

type AuthContextValue = {
  user: Profile | null
  isLoading: boolean
  signIn: (email: string, password: string, remember?: boolean) => AuthResult
  signUp: (name: string, email: string, password: string) => AuthResult
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function withoutPassword(user: StoredUser): Profile {
  const { password: _password, ...profile } = user
  return profile
}

function persistUser(user: Profile, remember: boolean) {
  const payload = JSON.stringify(user)
  if (remember) {
    window.localStorage.setItem(REMEMBER_KEY, payload)
    window.sessionStorage.removeItem(SESSION_KEY)
  } else {
    window.sessionStorage.setItem(SESSION_KEY, payload)
    window.localStorage.removeItem(REMEMBER_KEY)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const remembered = window.localStorage.getItem(REMEMBER_KEY)
      if (remembered) {
        setUser(JSON.parse(remembered))
      } else {
        const saved = window.sessionStorage.getItem(SESSION_KEY)
        if (saved) setUser(JSON.parse(saved))
      }
    } catch {}
    setIsLoading(false)
  }, [])

  function getUsers(): StoredUser[] {
    try {
      const saved = window.localStorage.getItem(USERS_KEY)
      return saved ? [...DEMO_USERS, ...JSON.parse(saved)] : DEMO_USERS
    } catch {
      return DEMO_USERS
    }
  }

  function signIn(email: string, password: string, remember = false): AuthResult {
    const found = getUsers().find((candidate) => candidate.email === email.trim().toLowerCase() && candidate.password === password)
    if (!found) return { ok: false, message: 'Incorrect email or password. Please try again.' }
    const next = withoutPassword(found)
    setUser(next)
    persistUser(next, remember)
    return { ok: true, message: 'Signed in successfully.' }
  }

  function signUp(name: string, email: string, password: string): AuthResult {
    const normalizedEmail = email.trim().toLowerCase()
    if (!name.trim() || !normalizedEmail || password.length < 8) return { ok: false, message: 'Enter a name, valid email, and password of at least 8 characters.' }
    if (getUsers().some((candidate) => candidate.email === normalizedEmail)) return { ok: false, message: 'An account with this email already exists — sign in instead.' }
    const created: StoredUser = { id: `user-${Date.now()}`, email: normalizedEmail, full_name: name.trim(), role: 'CUSTOMER', scopes: [], phone: '', address: '', created_at: new Date().toISOString(), password }
    const customUsers = (() => { try { return JSON.parse(window.localStorage.getItem(USERS_KEY) || '[]') as StoredUser[] } catch { return [] } })()
    window.localStorage.setItem(USERS_KEY, JSON.stringify([...customUsers, created]))
    const next = withoutPassword(created)
    setUser(next)
    persistUser(next, false)
    return { ok: true, message: 'Account created successfully.' }
  }

  function signOut() {
    setUser(null)
    window.sessionStorage.removeItem(SESSION_KEY)
    window.localStorage.removeItem(REMEMBER_KEY)
  }

  const value = useMemo(() => ({ user, isLoading, signIn, signUp, signOut }), [user, isLoading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside AuthProvider')
  return value
}
