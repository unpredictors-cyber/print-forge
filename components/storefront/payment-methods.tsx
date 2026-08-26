'use client'

import { useState } from 'react'
import { LockKeyhole } from 'lucide-react'
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal, FaCcApplePay, FaGooglePay } from 'react-icons/fa'

export const PAYMENT_METHODS = ['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay'] as const

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Visa: FaCcVisa,
  Mastercard: FaCcMastercard,
  Amex: FaCcAmex,
  Discover: FaCcDiscover,
  PayPal: FaCcPaypal,
  'Apple Pay': FaCcApplePay,
  'Google Pay': FaGooglePay,
}

export function PaymentMethodIcons({ selectable = false, value, onChange }: { selectable?: boolean; value?: string; onChange?: (value: string) => void }) {
  const [selected, setSelected] = useState(value ?? PAYMENT_METHODS[0])
  const active = value ?? selected
  return (
    <div className="flex flex-wrap gap-2" aria-label="Payment methods">
      {PAYMENT_METHODS.map((method) => {
        const isActive = active === method
        const Icon = ICONS[method]
        const className = `flex h-7 items-center justify-center rounded-md border px-2 transition-colors ${selectable ? 'cursor-pointer hover:border-primary' : ''} ${isActive && selectable ? 'border-primary bg-primary/10' : 'border-border bg-background/60'}`
        return selectable ? (
          <button key={method} type="button" className={className} aria-pressed={isActive} aria-label={method} onClick={() => { setSelected(method); onChange?.(method) }}>
            {Icon && <Icon className="h-6 w-auto" />}
          </button>
        ) : (
          <span key={method} className={className} aria-label={method}>
            {Icon && <Icon className="h-6 w-auto" />}
          </span>
        )
      })}
    </div>
  )
}

export function SecureCheckoutBadge() {
  return <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm"><span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true"><LockKeyhole className="size-3.5" /></span><div><p className="font-semibold text-foreground">Secure Checkout</p><p className="text-xs leading-5 text-muted-foreground">Encrypted, secure payment processing</p></div></div>
}
