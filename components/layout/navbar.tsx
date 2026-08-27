'use client'

import { Box, ChevronDown, Heart, LogOut, Menu, Search, ShoppingCart, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

const PRODUCTS = [
  { id: 'prod-honeycomb-controller-stand', label: 'Honeycomb Controller Stand' },
  { id: 'prod-dual-honeycomb-controller-stand', label: 'Dual Honeycomb Controller Stand' },
  { id: 'prod-dragon-headphone-stand', label: 'Dragon Headphone Stand' },
  { id: 'prod-nexus-max-organizer', label: 'Nexus Max Organizer' },
  { id: 'prod-milk-crate-organizer', label: 'Milk Crate Organizer' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { openCart, count } = useCart()
  const { user, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const closeMenus = () => { setMobileOpen(false); setProductsOpen(false) }

  async function handleSignOut() {
    await signOut()
    setAccountOpen(false)
    closeMenus()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-foreground backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="PrintForge home">
          <span className="flex size-8 items-center justify-center rounded-md bg-accent"><Box className="size-4.5 text-primary-foreground" aria-hidden /></span>
          <span className="text-lg font-semibold tracking-tight text-background">PrintForge</span>
        </Link>

        <nav className="mx-auto hidden flex-1 items-center justify-center gap-2 md:flex" aria-label="Main navigation">
          <Link href="/" className="rounded-md px-3 py-2 text-sm font-bold text-background transition-colors hover:bg-transparent hover:text-accent hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-0">Home</Link>
          <div className="relative" onMouseLeave={() => setProductsOpen(false)}>
            <button type="button" onClick={() => setProductsOpen((open) => !open)} aria-expanded={productsOpen} className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-bold text-background hover:bg-muted">
              Products <ChevronDown className="size-3.5" />
            </button>
            {productsOpen && <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-md border border-border bg-popover p-2 shadow-lg">
              {PRODUCTS.map((product) => <Link key={product.id} href={`/shop/${product.id}`} onClick={closeMenus} className="block rounded-md px-3 py-2.5 text-sm text-popover-foreground hover:bg-muted">{product.label}</Link>)}
            </div>}
          </div>
          <Link href="/blog" className="rounded-md px-3 py-2 text-sm font-bold text-background transition-colors hover:bg-transparent hover:text-accent hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-0">Blog</Link>
          <Link href="/policies/contact" className="rounded-md px-3 py-2 text-sm font-bold text-background transition-colors hover:bg-transparent hover:text-accent hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-0">Contact Us</Link>
          {user && (user.role === 'ADMIN' || user.role === 'MASTER_ADMIN') && <Link href="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-background hover:bg-transparent hover:text-accent hover:underline hover:underline-offset-4">Admin</Link>}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/account" aria-label="Wishlist" />} className="text-background transition-colors hover:bg-transparent hover:text-accent focus-visible:ring-accent"><Heart className="size-4.5" /></Button>
          <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/shop" aria-label="Search products" />} className="text-background transition-colors hover:bg-transparent hover:text-accent focus-visible:ring-accent"><Search className="size-4.5" /></Button>

          {user ? (
            <div className="relative" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-label="Account menu"
                aria-expanded={accountOpen}
                className="flex items-center gap-1 rounded-md p-2 text-background transition-colors hover:bg-muted"
              >
                <User className="size-4.5" />
                <ChevronDown className="size-3.5" />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full z-50 mt-1 w-56 rounded-md border border-border bg-popover p-2 shadow-lg">
                  <div className="border-b border-border px-3 py-2">
                    <p className="truncate text-sm font-semibold text-popover-foreground">{user.full_name || 'Account'}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link href="/account" onClick={() => setAccountOpen(false)} className="block rounded-md px-3 py-2.5 text-sm text-popover-foreground hover:bg-muted">My Account</Link>
                  {user.role === 'ADMIN' || user.role === 'MASTER_ADMIN' ? (
                    <Link href="/admin" onClick={() => setAccountOpen(false)} className="block rounded-md px-3 py-2.5 text-sm text-popover-foreground hover:bg-muted">Admin Dashboard</Link>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-popover-foreground hover:bg-muted"
                  >
                    <LogOut className="size-4" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/login" aria-label="Sign in" />} className="text-background transition-colors hover:bg-transparent hover:text-accent focus-visible:ring-accent"><User className="size-4.5" /></Button>
          )}

          <Button variant="ghost" size="icon" onClick={openCart} aria-label={`Open cart, ${count} items`} className="relative text-background hover:bg-transparent hover:text-accent focus-visible:ring-accent"><ShoppingCart className="size-4.5" />{count > 0 && <span className="absolute -right-0.5 -top-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{count}</span>}</Button>
          <Button variant="ghost" size="icon" className="text-background hover:bg-transparent hover:text-accent focus-visible:ring-accent md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}</Button>
        </div>
      </div>

      {mobileOpen && <div className="border-t border-border bg-background px-4 py-4 md:hidden"><div className="mb-3 grid grid-cols-4 gap-2 border-b border-border pb-3" aria-label="Quick actions"><Link href="/account" onClick={closeMenus} aria-label="Open favourites" className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-md text-xs font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"><Heart className="size-5" aria-hidden />Favourites</Link><Link href="/shop" onClick={closeMenus} aria-label="Search products" className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-md text-xs font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"><Search className="size-5" aria-hidden />Search</Link><Link href={user ? '/account' : '/login'} onClick={closeMenus} aria-label="Open profile" className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-md text-xs font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"><User className="size-5" aria-hidden />{user ? 'Profile' : 'Sign in'}</Link><button type="button" onClick={() => { openCart(); closeMenus() }} aria-label={`Open cart, ${count} items`} className="relative flex min-h-11 flex-col items-center justify-center gap-1 rounded-md text-xs font-medium text-foreground transition-colors hover:bg-muted hover:text-accent"><ShoppingCart className="size-5" aria-hidden />Cart{count > 0 && <span className="absolute right-3 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{count}</span>}</button></div><nav className="flex flex-col gap-1" aria-label="Mobile navigation">
        <Link href="/" onClick={closeMenus} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">Home</Link>
        <button type="button" onClick={() => setProductsOpen((open) => !open)} className="flex items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-muted">Products <ChevronDown className="size-4" /></button>
        {productsOpen && <div className="ml-3 border-l border-border pl-3">{PRODUCTS.map((product) => <Link key={product.id} href={`/shop/${product.id}`} onClick={closeMenus} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted">{product.label}</Link>)}</div>}
        <Link href="/blog" onClick={closeMenus} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">Blog</Link>
        <Link href="/policies/contact" onClick={closeMenus} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">Contact Us</Link>
        {user ? (
          <>
            <Link href="/account" onClick={closeMenus} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">My Account</Link>
            {user.role === 'ADMIN' || user.role === 'MASTER_ADMIN' ? <Link href="/admin" onClick={closeMenus} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">Admin Dashboard</Link> : null}
            <button type="button" onClick={handleSignOut} className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted"><LogOut className="size-4" />Log out</button>
          </>
        ) : (
          <Link href="/login" onClick={closeMenus} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">Sign in</Link>
        )}
      </nav></div>}
    </header>
  )
}
