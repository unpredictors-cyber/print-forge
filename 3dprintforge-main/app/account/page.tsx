'use client'

import Link from 'next/link'
import { LockKeyhole } from 'lucide-react'
import { AccountTabs } from '@/components/account/account-tabs'
import { useAuth } from '@/lib/auth-context'

export default function AccountPage() {
  const { user, isLoading } = useAuth()
  if (isLoading) return <main className="mx-auto max-w-5xl px-4 py-12"><div className="h-8 w-48 animate-pulse rounded-md bg-muted" /></main>
  if (!user) return <main className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-4 py-12"><div className="max-w-sm text-center"><LockKeyhole className="mx-auto size-8 text-primary" /><h1 className="mt-4 text-2xl font-semibold">Sign in to view your account</h1><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Track orders, manage your profile, and contact support from one place.</p><Link href="/login" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Sign in</Link></div></main>
  return <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6"><header className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Customer space</p><h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">My Account</h1><p className="mt-1 text-sm text-muted-foreground">Welcome back, {user.email}.</p></header><AccountTabs /></main>
}
