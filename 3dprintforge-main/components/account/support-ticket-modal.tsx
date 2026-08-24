'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import type { TicketType } from '@/lib/types'

interface SupportTicketModalProps {
  open: boolean
  onClose: () => void
  ticketType: TicketType
  orderId: string
}

const typeLabels: Record<TicketType, { title: string; placeholder: string }> = {
  RETURN: {
    title: 'Request a return',
    placeholder: 'Let us know which items you want to return and the reason…',
  },
  REFUND: {
    title: 'Request a refund',
    placeholder: 'Describe the issue and the amount you believe should be refunded…',
  },
  COMPLAINT: {
    title: 'File a complaint',
    placeholder: 'Tell us what went wrong with this order…',
  },
}

export function SupportTicketModal({ open, onClose, ticketType, orderId }: SupportTicketModalProps) {
  const { toast } = useToast()
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const labels = typeLabels[ticketType]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // Simulates persistence; replace with Supabase tickets insert when connected
    await new Promise((r) => setTimeout(r, 500))
    setSubmitting(false)
    setMessage('')
    onClose()
    toast('Ticket submitted', {
      description: 'Our support team will reply in the Support tab shortly.',
    })
  }

  return (
    <Modal open={open} onClose={onClose} title={labels.title}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Order <span className="font-mono text-foreground">{orderId}</span>
        </p>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ticket-message" className="text-sm font-medium text-foreground">
            Details
          </label>
          <textarea
            id="ticket-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            placeholder={labels.placeholder}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit ticket'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
