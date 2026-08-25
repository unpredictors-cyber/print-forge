import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 className="h-9 w-9" /></div>
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Order confirmed</p>
    <h1 className="text-4xl font-bold tracking-tight text-slate-950">Thanks for supporting independent making.</h1>
    <p className="mt-4 max-w-lg leading-7 text-slate-600">Your order is in the queue. We&apos;ll send a confirmation with your production timeline and tracking details shortly.</p>
    <Link href="/shop" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90">Continue shopping <ArrowRight className="h-4 w-4" /></Link>
  </main>
}
