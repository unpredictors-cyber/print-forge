'use client'

import { useState } from 'react'
import { LockKeyhole } from 'lucide-react'
import { FaApplePay, FaCcAmex, FaCcDiscover, FaCcMastercard, FaCcPaypal, FaCcVisa, FaGooglePay } from 'react-icons/fa'

export const PAYMENT_METHODS = ['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay'] as const

const PAYMENT_ICON_STYLES: Record<(typeof PAYMENT_METHODS)[number], string> = {
  Visa: 'text-[#1A1F71]',
  Mastercard: 'text-[#EB001B]',
  Amex: 'text-[#2E77BC]',
  Discover: 'text-[#FF6000]',
  PayPal: 'text-[#003087]',
  'Apple Pay': 'text-[#000000]',
  'Google Pay': 'text-[#4285F4]',
}

function MethodMark({ name }: { name: (typeof PAYMENT_METHODS)[number] }) {
  const icons = {
    Visa: FaCcVisa,
    Mastercard: FaCcMastercard,
    Amex: FaCcAmex,
    Discover: FaCcDiscover,
    PayPal: FaCcPaypal,
    'Apple Pay': FaApplePay,
    'Google Pay': FaGooglePay,
  }
  const Icon = icons[name]
  return <Icon aria-hidden="true" className={`text-3xl ${PAYMENT_ICON_STYLES[name]}`} />
}

export function PaymentMethodIcons({ selectable = false, value, onChange }: { selectable?: boolean; value?: string; onChange?: (value: (typeof PAYMENT_METHODS)[number]) => void }) {
  const [selected, setSelected] = useState(value ?? PAYMENT_METHODS[0])
  const active = value ?? selected
  return (
    <div className="flex flex-wrap gap-2" aria-label="Payment methods">
      {PAYMENT_METHODS.map((method) => {
        const isActive = active === method
        const className = `flex h-9 items-center justify-center rounded-md border px-2.5 text-[11px] font-semibold transition-colors ${selectable ? 'cursor-pointer hover:border-accent' : ''} ${isActive && selectable ? 'border-accent bg-accent/10 text-foreground' : 'border-border bg-background/60 text-muted-foreground'}`
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
  return <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/50 p-3 text-sm"><span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden="true"><LockKeyhole className="size-3.5" /></span><div><p className="font-semibold text-foreground">Secure Checkout</p><p className="text-xs leading-5 text-muted-foreground">Encrypted, secure payment processing</p></div></div>
}
