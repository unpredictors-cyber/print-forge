'use client'

import { useState } from 'react'
import { LockKeyhole } from 'lucide-react'

export const PAYMENT_METHODS = ['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay'] as const

function MethodMark({ name }: { name: string }) {
  return <span className="font-mono text-[10px] font-bold tracking-tight">{name === 'Mastercard' ? 'MC' : name === 'American Express' ? 'AMEX' : name}</span>
}

export function PaymentMethodIcons({ selectable = false, value, onChange }: { selectable?: boolean; value?: string; onChange?: (value: string) => void }) {
  const [selected, setSelected] = useState(value ?? PAYMENT_METHODS[0])
  const active = value ?? selected
  return (
    <div className="flex flex-wrap gap-2" aria-label="Payment methods">
      {PAYMENT_METHODS.map((method) => {
        const isActive = active === method
        const className = `flex h-9 items-center justify-center rounded-md border px-2.5 text-[11px] font-semibold transition-colors ${selectable ? 'cursor-pointer hover:border-primary' : ''} ${isActive && selectable ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background/60 text-muted-foreground'}`
        return selectable ? (
          <button key={method} type="button" className={className} aria-pressed={isActive} onClick={() => { setSelected(method); onChange?.(method) }}>
            <MethodMark name={method} />
          </button>
        ) : <span key={method} className={className}><MethodMark name={method} /></span>
      })}
    </div>
  )
}

export function SecureCheckoutBadge() {
  return <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm"><span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true"><LockKeyhole className="size-3.5" /></span><div><p className="font-semibold text-foreground">Secure Checkout</p><p className="text-xs leading-5 text-muted-foreground">Encrypted, secure payment processing</p></div></div>
}
