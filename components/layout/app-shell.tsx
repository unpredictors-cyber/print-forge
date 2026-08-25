'use client'

import { usePathname } from 'next/navigation'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { CartDrawer } from '@/components/storefront/cart-drawer'
import { SupportChatbot } from '@/components/support/support-chatbot'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')

  if (isAdminRoute) return <>{children}</>

  return (
    <div className="flex min-h-svh w-full min-w-0 flex-col overflow-x-hidden">
      <Navbar />
      <main key={pathname} className="flex min-w-0 flex-1 animate-fade-in">{children}</main>
      <Footer />
      <CartDrawer />
      <SupportChatbot />
    </div>
  )
}
