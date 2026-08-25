'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useToast } from '@/components/ui/toast'
import { PaymentMethodIcons } from '@/components/storefront/payment-methods'

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

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg' },
  { label: 'Instagram', href: 'https://www.instagram.com', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/linkedin/default.svg' },
  { label: 'YouTube', href: 'https://www.youtube.com', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/youtube/default.svg' },
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
            {socials.map((social) => (
              <Link key={social.label} href={social.href} aria-label={social.label} className="flex size-8 items-center justify-center rounded-full border border-background/20 bg-background/10 transition-colors hover:bg-background/20">
                <Image src={social.src} alt="" width={14} height={14} loading="lazy" className="size-3.5 object-contain brightness-0 invert" />
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
