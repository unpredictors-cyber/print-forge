'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import { cn, formatDate } from '@/lib/utils'
import type { TicketMessage } from '@/lib/types'

interface TicketThreadProps {
  messages: TicketMessage[]
  currentUserId: string
  /** When true, the composer posts as a support agent (admin view). */
  asSupport?: boolean
}

export function TicketThread({ messages: initialMessages, currentUserId, asSupport = false }: TicketThreadProps) {
  const { toast } = useToast()
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')

  function handleSend(e: React.FormEvent) {
    e.preventDefault()
    const content = draft.trim()
    if (!content) return
    const newMessage: TicketMessage = {
      id: `msg-local-${Date.now()}`,
      ticket_id: messages[0]?.ticket_id ?? 'ticket',
      sender_id: currentUserId,
      sender_name: asSupport ? 'Support Team' : 'You',
      sender_role: asSupport ? 'support' : 'customer',
      content,
      created_at: new Date().toISOString(),
    }
    setMessages((m) => [...m, newMessage])
    setDraft('')
    toast('Reply sent', { description: 'Your message was added to the thread.' })
  }

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-3" aria-label="Ticket conversation">
        {messages.map((msg) => {
          const isMine = asSupport ? msg.sender_role === 'support' : msg.sender_id === currentUserId
          return (
            <li key={msg.id} className={cn('flex', isMine ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[85%] rounded-md border px-3.5 py-2.5 text-sm sm:max-w-[70%]',
                  isMine
                    ? 'border-primary/20 bg-primary/5 text-foreground'
                    : 'border-border bg-secondary text-foreground'
                )}
              >
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <span className="text-xs font-semibold text-foreground">
                    {msg.sender_name}
                    {msg.sender_role === 'support' && (
                      <span className="ml-1.5 rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                        Support
                      </span>
                    )}
                  </span>
                  <time dateTime={msg.created_at} className="shrink-0 text-xs text-muted-foreground">
                    {formatDate(msg.created_at)}
                  </time>
                </div>
                <p className="leading-relaxed text-pretty">{msg.content}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <form onSubmit={handleSend} className="flex items-end gap-2 border-t border-border pt-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
              e.preventDefault()
              handleSend(e)
            }
          }}
          rows={2}
          placeholder="Write a reply…"
          aria-label="Reply to ticket"
          className="w-full flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Button type="submit" size="icon" aria-label="Send reply" disabled={!draft.trim()}>
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  )
}
