import Link from 'next/link'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

export default function CheckoutCancelPage() {
  return <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-700"><ShoppingBag className="h-8 w-8" /></div>
    <h1 className="text-4xl font-bold tracking-tight text-slate-950">Your cart is still saved.</h1>
    <p className="mt-4 leading-7 text-slate-600">No payment was taken. Review your selections and come back whenever you&apos;re ready.</p>
    <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 font-semibold text-foreground transition hover:bg-muted"><ArrowLeft className="h-4 w-4" /> Return to shop</Link>
  </main>
}
