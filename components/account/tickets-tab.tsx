'use client'

import { useState } from 'react'
import { ChevronDown, LifeBuoy } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TicketThread } from '@/components/account/ticket-thread'
import { mockCurrentUser, mockTicketMessages, mockTickets } from '@/data/mockData'
import { cn, formatDate } from '@/lib/utils'
import type { TicketStatus } from '@/lib/types'

const statusVariant: Record<TicketStatus, 'warning' | 'success' | 'neutral'> = {
  OPEN: 'warning',
  IN_PROGRESS: 'neutral',
  RESOLVED: 'success',
}

export function TicketsTab() {
  const myTickets = mockTickets.filter((t) => t.customer_id === mockCurrentUser.id)
  const [openId, setOpenId] = useState<string | null>(myTickets[0]?.id ?? null)

  if (myTickets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-dashed border-border py-16 text-center">
        <LifeBuoy className="size-8 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          No support tickets yet. Open one from any order in your Order History.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {myTickets.map((ticket) => {
        const isOpen = openId === ticket.id
        const messages = mockTicketMessages.filter((m) => m.ticket_id === ticket.id)
        return (
          <div key={ticket.id} className="overflow-hidden rounded-md border border-border bg-card">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : ticket.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-secondary/60 sm:px-5"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{ticket.type}</Badge>
                  <Badge variant={statusVariant[ticket.status]}>{ticket.status.replace('_', ' ')}</Badge>
                </div>
                <p className="truncate text-sm font-medium text-foreground">{ticket.subject}</p>
                <p className="text-xs text-muted-foreground">
                  Order <span className="font-mono">{ticket.order_id}</span> · {formatDate(ticket.created_at)}
                </p>
              </div>
              <ChevronDown
                className={cn('size-4 shrink-0 text-muted-foreground transition-transform', isOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="border-t border-border px-4 py-4 sm:px-5">
                <TicketThread messages={messages} currentUserId={mockCurrentUser.id} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
