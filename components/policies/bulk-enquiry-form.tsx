'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BulkEnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      setError('Please complete the required fields before sending your enquiry.')
      form.reportValidity()
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) return <div className="flex flex-col items-start gap-4 border border-success/30 bg-success/10 p-6" role="status"><CheckCircle2 className="size-8 text-success" /><div><h2 className="text-xl font-semibold">Enquiry received</h2><p className="mt-2 leading-7 text-muted-foreground">Thanks for getting in touch. We&apos;ll review the details and reply with a tailored quote.</p></div></div>

  return <form onSubmit={handleSubmit} className="space-y-5" noValidate><div className="grid gap-5 sm:grid-cols-2"><label className="space-y-2 text-sm font-medium">Name *<input name="name" required className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" /></label><label className="space-y-2 text-sm font-medium">Email *<input name="email" type="email" required className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" placeholder="you@company.com" /></label></div><label className="block space-y-2 text-sm font-medium">Company <input name="company" className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" placeholder="Company or event name" /></label><label className="block space-y-2 text-sm font-medium">Product and quantity needed *<input name="quantity" required className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring" placeholder="e.g. 100 branded desk organizers" /></label><label className="block space-y-2 text-sm font-medium">Message *<textarea name="message" required rows={5} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" placeholder="Tell us about your timeline, colors, and requirements." /></label>{error && <p className="text-sm text-destructive" role="alert">{error}</p>}<Button type="submit" size="lg"><Send className="size-4" /> Request a quote</Button></form>
}
