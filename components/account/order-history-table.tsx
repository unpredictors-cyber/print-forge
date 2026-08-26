'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PenLine, RotateCcw, CircleDollarSign, MessageSquareWarning, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WriteReviewModal } from '@/components/account/write-review-modal'
import { SupportTicketModal } from '@/components/account/support-ticket-modal'
import { mockOrders } from '@/data/mockData'
import { formatDate, formatPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/toast'
import type { OrderStatus, TicketType } from '@/lib/types'

const statusVariant: Record<OrderStatus, 'default' | 'success' | 'warning' | 'neutral' | 'destructive'> = {
  PENDING: 'default',
  IN_PRODUCTION: 'warning',
  SHIPPED: 'neutral',
  DELIVERED: 'success',
  CANCELLED: 'destructive',
}

const statusLabel: Record<OrderStatus, string> = {
  PENDING: 'Pending',
  IN_PRODUCTION: 'In production',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
}

export function OrderHistoryTable() {
  const [reviewTarget, setReviewTarget] = useState<{ orderId: string; productName: string } | null>(null)
  const [ticketTarget, setTicketTarget] = useState<{ orderId: string; type: TicketType } | null>(null)
  const [cancelledOrders, setCancelledOrders] = useState<string[]>([])
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-4">
      {mockOrders.map((order) => {
        const isCancelled = cancelledOrders.includes(order.id)
        const displayStatus = isCancelled ? 'CANCELLED' : order.status
        const canCancel = !isCancelled && (order.status === 'PENDING' || order.status === 'IN_PRODUCTION')
        return (
        <article
          key={order.id}
          className="rounded-md border border-border bg-card transition-shadow hover:shadow-sm"
        >
          <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-mono text-sm font-medium text-foreground">{order.id}</span>
              <time dateTime={order.created_at} className="text-sm text-muted-foreground">
                {formatDate(order.created_at)}
              </time>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={statusVariant[displayStatus]}>{statusLabel[displayStatus]}</Badge>
              <span className="text-sm font-semibold text-foreground">{formatPrice(order.total_amount)}</span>
            </div>
          </header>

          <ul className="divide-y divide-border">
            {order.items.map((item) => (
              <li key={`${order.id}-${item.product_id}`} className="flex items-center gap-4 px-4 py-3 sm:px-5">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-border bg-secondary">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.product_name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{item.product_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.color} · {item.material} · Qty {item.quantity}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {order.status === 'DELIVERED' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReviewTarget({ orderId: order.id, productName: item.product_name })}
                    >
                      <PenLine className="size-3.5" aria-hidden="true" />
                      <span className="hidden sm:inline">Write a review</span>
                      <span className="sr-only sm:hidden">Write a review for {item.product_name}</span>
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <footer className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3 sm:px-5">
            {canCancel && <Button variant="ghost" size="sm" onClick={() => { setCancelledOrders((current) => [...current, order.id]); toast('Order cancelled', { description: `${order.id} was cancelled before production started.`, variant: 'success' }) }}><XCircle className="size-3.5" /> Cancel order</Button>}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTicketTarget({ orderId: order.id, type: 'RETURN' })}
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              Return
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTicketTarget({ orderId: order.id, type: 'REFUND' })}
            >
              <CircleDollarSign className="size-3.5" aria-hidden="true" />
              Refund
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTicketTarget({ orderId: order.id, type: 'COMPLAINT' })}
            >
              <MessageSquareWarning className="size-3.5" aria-hidden="true" />
              Complain
            </Button>
          </footer>
        </article>
        )
      })}

      <WriteReviewModal
        open={reviewTarget !== null}
        onClose={() => setReviewTarget(null)}
        productName={reviewTarget?.productName ?? ''}
      />
      {ticketTarget && (
        <SupportTicketModal
          open
          onClose={() => setTicketTarget(null)}
          ticketType={ticketTarget.type}
          orderId={ticketTarget.orderId}
        />
      )}
    </div>
  )
}
