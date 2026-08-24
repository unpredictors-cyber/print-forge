'use client'

import { useState } from 'react'
import { User, Phone, MapPin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { mockCurrentUser } from '@/data/mockData'

export function ProfileSettingsForm() {
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    fullName: mockCurrentUser.full_name ?? '',
    email: mockCurrentUser.email,
    phone: mockCurrentUser.phone ?? '',
    address: mockCurrentUser.address ?? '',
  })

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    // Simulates persistence; replace with Supabase profiles update when connected
    await new Promise((r) => setTimeout(r, 600))
    setSaving(false)
    toast('Profile saved', { description: 'Your account details have been updated.' })
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="fullName"
            className="pl-9"
            value={form.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            placeholder="Jane Cooper"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="email"
            type="email"
            className="pl-9"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="phone"
            type="tel"
            className="pl-9"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Shipping address</Label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden="true" />
          <textarea
            id="address"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="123 Main St, Springfield, IL 62704"
            rows={3}
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      <div>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}
