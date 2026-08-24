'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, BarChart3, Box, FileText, Menu, MessageSquare, ShieldCheck, Star, Users, X } from 'lucide-react'
import Link from 'next/link'

import { useAuth } from '@/lib/auth-context'

const links = [
  ['Overview', '/admin', BarChart3, 'all'],
  ['Products', '/admin/products', Box, 'inventory'],
  ['Reviews', '/admin/reviews', Star, 'all'],
  ['Support', '/admin/support', MessageSquare, 'orders'],
  ['Team', '/admin/team', Users, 'all'],
  ['Blog CMS', '/admin/blog', FileText, 'all'],
] as const

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const master = user?.role === 'MASTER_ADMIN'

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== 'MASTER_ADMIN' && user.role !== 'ADMIN'))) {
      router.replace('/login?redirect=/admin')
    }
  }, [isLoading, router, user])

  const visibleLinks = useMemo(
    () => links.filter(([, href, , scope]) => master || href === '/admin' || user?.scopes?.includes(scope)),
    [master, user],
  )

  if (isLoading || !user || (user.role !== 'MASTER_ADMIN' && user.role !== 'ADMIN')) {
    return <main className="flex min-h-svh items-center justify-center bg-muted/30 px-4"><p className="text-sm text-muted-foreground">Checking admin access...</p></main>
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="flex min-h-svh bg-muted/30">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card p-5 md:flex md:flex-col">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">PrintForge</p>
          <h2 className="mt-1 text-lg font-semibold">Admin workspace</h2>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-3.5 text-primary" />{master ? 'Master Admin' : 'Staff Admin'}</div>
        </div>
        <nav className="space-y-1" aria-label="Admin navigation">
          {visibleLinks.map(([label, href, Icon]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${pathname === href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><Icon className="size-4" />{label}</Link>)}
        </nav>
        <div className="mt-auto space-y-2 pt-10">
          <Link href="/" className="flex items-center gap-2 px-3 text-sm font-medium text-muted-foreground hover:text-primary"><ArrowLeft className="size-4" />Back to storefront</Link>
          <button type="button" onClick={() => { signOut(); router.replace('/login') }} className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Sign out</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 md:hidden">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">PrintForge</p><p className="text-sm font-semibold">Admin workspace</p></div>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close admin menu' : 'Open admin menu'} className="rounded-md p-2 hover:bg-muted">{mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
        {mobileOpen && <nav className="border-b border-border bg-card p-3 md:hidden" aria-label="Mobile admin navigation">{visibleLinks.map(([label, href, Icon]) => <Link key={href} href={href} onClick={closeMobile} className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${pathname === href ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}><Icon className="size-4" />{label}</Link>)}<Link href="/" onClick={closeMobile} className="mt-2 flex items-center gap-2 border-t border-border px-3 pt-3 text-sm text-muted-foreground"><ArrowLeft className="size-4" />Back to storefront</Link><button type="button" onClick={() => { signOut(); closeMobile(); router.replace('/login') }} className="w-full rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted">Sign out</button></nav>}
        <main className="min-w-0 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  )
}
