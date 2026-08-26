'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return <div className="flex items-center justify-center gap-3 bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground"><span>Free shipping on orders over $50 · New designs added weekly</span><button onClick={() => setVisible(false)} aria-label="Dismiss announcement" className="rounded-full p-0.5 hover:bg-primary-foreground/15"><X className="size-3.5" /></button></div>
}
