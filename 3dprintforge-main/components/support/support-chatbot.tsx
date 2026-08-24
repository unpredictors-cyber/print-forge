'use client'

import { useState } from 'react'
import { Bot, MessageCircle, Send, Ticket, X } from 'lucide-react'
import Link from 'next/link'

const answers: Record<string, string> = {
  shipping: 'Most made-to-order pieces ship in 3–5 business days. You’ll receive tracking as soon as your order leaves our workshop.',
  material: 'PLA is great for everyday objects, while Resin captures finer details. The product page shows the best option for each design.',
  custom: 'Yes. Share your idea through our support team and we’ll help turn it into a printable design.',
  ticket: 'You can open a return, refund, or complaint ticket from My Account. Our support team will reply in the ticket thread.',
}

function getReply(message: string) {
  const text = message.toLowerCase()
  if (text.includes('ship') || text.includes('deliver')) return answers.shipping
  if (text.includes('material') || text.includes('pla') || text.includes('resin')) return answers.material
  if (text.includes('ticket') || text.includes('return') || text.includes('refund') || text.includes('complaint')) return answers.ticket
  if (text.includes('custom') || text.includes('design')) return answers.custom
  return 'I can help with shipping, materials, custom designs, and finding the right product. What would you like to know?'
}

export function SupportChatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! I’m the PrintForge assistant. How can I help?' }])

  function sendMessage() {
    const value = input.trim()
    if (!value) return
    setMessages((current) => [...current, { from: 'user', text: value }, { from: 'bot', text: getReply(value) }])
    setInput('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <section className="mb-3 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-md border border-border bg-card shadow-xl" aria-label="PrintForge assistant">
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <div className="flex items-center gap-2"><Bot className="size-4" /><span className="text-sm font-semibold">PrintForge assistant</span></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X className="size-4" /></button>
          </div>
          <div className="max-h-72 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => <div key={`${message.from}-${index}`} className={`max-w-[85%] rounded-md px-3 py-2 text-sm leading-relaxed ${message.from === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>{message.text}</div>)}
          </div>
          <Link href="/account" className="mx-3 mb-2 flex items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"><Ticket className="size-3.5" /> Open a support ticket</Link>
          <div className="flex gap-2 border-t border-border p-3">
            <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendMessage() }} placeholder="Ask about products..." className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" aria-label="Chat message" />
            <button type="button" onClick={sendMessage} className="rounded-md bg-primary px-3 text-primary-foreground" aria-label="Send message"><Send className="size-4" /></button>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105" aria-label={open ? 'Close support chat' : 'Open support chat'}><MessageCircle className="size-5" /></button>
    </div>
  )
}
