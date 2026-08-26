'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@/components/ui/toast'
import { PaymentMethodIcons } from '@/components/storefront/payment-methods'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.8.22 2.43.47.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.63.42 1.36.47 2.43.05 1.07.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.8-.47 2.43-.26.66-.6 1.22-1.16 1.77-.55.56-1.11.9-1.77 1.16-.63.25-1.36.42-2.43.47-1.07.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.8-.22-2.43-.47a4.7 4.7 0 0 1-1.77-1.16 4.7 4.7 0 0 1-1.16-1.77c-.25-.63-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.8.47-2.43.26-.66.6-1.22 1.16-1.77.55-.56 1.11-.9 1.77-1.16.63-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.98.04-1.51.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.35-.31.88-.35 1.86-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.98.21 1.51.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.35.14.88.31 1.86.35 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.98-.04 1.51-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.35.31-.88.35-1.86.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.98-.21-1.51-.35-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.35-.14-.88-.31-1.86-.35-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 8.48a3.34 3.34 0 1 0 0-6.68 3.34 3.34 0 0 0 0 6.68Zm6.54-8.62a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  )
}

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: LinkedinIcon },
  { label: 'YouTube', href: 'https://www.youtube.com', Icon: YoutubeIcon },
]

const COLUMNS = [
  {
    heading: 'Get to Know PrintForge',
    links: [
      { href: '/policies/about', label: 'About Us' },
      { href: '/policies/about', label: 'Our Story' },
      { href: '/blog', label: 'Blogs' },
      { href: '/policies/printing-services', label: 'Printing Services' },
      { href: '/policies/bulk-enquiry', label: 'Bulk Enquiry' },
    ],
  },
  {
    heading: 'Subscribe to our newsletter',
    newsletter: true,
    links: [],
  },
  {
    heading: 'Explore & Resources',
    links: [
      { href: '/shop', label: 'Shop products' },
      { href: '/policies/shipping', label: 'Shipping Rates & Policies' },
      { href: '/policies/returns', label: 'Returns & Refunds' },
      { href: '/policies/privacy', label: 'Privacy Policies' },
      { href: '/policies/terms', label: 'Terms & Conditions' },
    ],
  },
  {
    heading: 'Let Us Help You',
    links: [
      { href: '/account', label: 'Your Account' },
      { href: '/account', label: 'Your Orders' },
      { href: '/account', label: 'Support Tickets' },
      { href: '/policies/faq', label: 'FAQs' },
      { href: '/policies/contact', label: 'Contact Us' },
    ],
  },
]

export function Footer() {
  const { toast } = useToast()
  const [currency, setCurrency] = useState('United States (USD $)')
  const [open, setOpen] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)
  const currencies = ['United States (USD $)', 'Canada (CAD $)', 'United Kingdom (GBP £)', 'European Union (EUR €)']

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-8">
        {COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h3 className="text-sm font-bold text-background sm:text-base">{column.heading}</h3>
            {column.newsletter ? (
              <div className="mt-3 max-w-xs">
                <p className="text-sm leading-5 text-background/70">Get first access to new designs, colour drops, and made-to-order offers.</p>
                <form className="mt-4 flex" onSubmit={(event) => { event.preventDefault(); const form = event.currentTarget; if (!form.checkValidity()) return; toast('You are on the list', { description: 'Watch your inbox for PrintForge updates.' }); form.reset() }}>
                  <label htmlFor="footer-newsletter" className="sr-only">Email address</label>
                  <input id="footer-newsletter" name="email" type="email" required placeholder="Email address" className="min-w-0 flex-1 rounded-l-md border border-background/20 bg-background/10 px-3 py-2 text-sm text-background outline-none placeholder:text-background/50 focus:border-background/60" />
                  <button type="submit" className="rounded-r-md bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-background/90">Join</button>
                </form>
              </div>
            ) : (
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={`${column.heading}-${link.label}`}>
                    <Link href={link.href} className="text-sm leading-5 text-background/70 transition-colors hover:text-background">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </nav>
        ))}
      </div>
      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div ref={selectorRef} className="relative">
              <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-md border border-background/20 bg-background/10 px-3 py-2 text-xs text-background hover:bg-background/20">{currency}<span aria-hidden="true">⌄</span></button>
              {open && <div className="absolute bottom-full left-0 z-10 mb-2 w-56 rounded-lg border border-background/20 bg-foreground p-1 shadow-lg">{currencies.map((option) => <button key={option} type="button" onClick={() => { setCurrency(option); setOpen(false) }} className="block w-full rounded px-3 py-2 text-left text-xs text-background/80 hover:bg-background/10 hover:text-background">{option}</button>)}</div>}
            </div>
            <PaymentMethodIcons />
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-background/15 pt-4 sm:flex-row">
            <Link href="/" className="text-sm font-bold text-background">PrintForge</Link>
            <p className="text-center text-xs text-background/60">© 2026 PrintForge. All rights reserved.</p>
            <div className="flex items-center gap-2" aria-label="Social links">
            {socials.map(({ label, href, Icon }) => (
              <Link key={label} href={href} aria-label={label} className="flex size-8 items-center justify-center rounded-full border border-background/20 bg-background/10 text-background/80 transition-colors hover:bg-background/20 hover:text-background">
                <Icon />
              </Link>
            ))}
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
