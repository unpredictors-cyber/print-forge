'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { RatingStars } from '@/components/ui/rating-stars'
import { useAuth } from '@/lib/auth-context'
import type { Review } from '@/lib/types'
import { averageRating, formatDate } from '@/lib/utils'

export function ReviewSection({ reviews }: { reviews: Review[] }) {
  const { user, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const avg = averageRating(reviews.map((review) => review.rating))

  useEffect(() => {
    if (!isOpen) return
    const handlePointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) setIsOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const openReviewForm = () => {
    if (isLoading) return
    if (!user) {
      setShowAuthPrompt(true)
      setIsOpen(false)
      return
    }
    setIsOpen(true)
  }

  return (
    <section aria-label="Customer reviews" className="mt-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Customer reviews</h2>
          {reviews.length > 0 && <span className="flex items-center gap-2"><RatingStars rating={avg} size="md" /><span className="text-sm text-muted-foreground">{avg.toFixed(1)} out of 5 · {reviews.length} review{reviews.length === 1 ? '' : 's'}</span></span>}
        </div>
        <div ref={panelRef} className="relative">
          <button type="button" onClick={openReviewForm} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">Write a review</button>
          {isOpen && <form className="absolute right-0 z-10 mt-2 grid w-72 gap-3 rounded-md border border-border bg-card p-4 shadow-lg" onSubmit={(event) => { event.preventDefault(); setIsOpen(false) }}>
            <p className="text-xs text-muted-foreground">Posting as <span className="font-medium text-foreground">{user?.full_name}</span></p>
            <label className="grid gap-1 text-sm font-medium">Rating<select required defaultValue="5" className="h-9 rounded border border-input bg-background px-2"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label>
            <label className="grid gap-1 text-sm font-medium">Review<textarea required rows={3} className="rounded border border-input bg-background p-2" /></label>
            <button type="submit" className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">Submit review</button>
          </form>}
        </div>
      </div>
      {showAuthPrompt && <div role="dialog" aria-modal="true" aria-labelledby="review-auth-title" className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowAuthPrompt(false) }}><div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-xl"><h3 id="review-auth-title" className="text-lg font-semibold">Sign in to write a review</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Create an account or sign in to share your experience with this product.</p><div className="mt-5 flex gap-3"><Link href="/login" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Sign in</Link><button type="button" onClick={() => setShowAuthPrompt(false)} className="rounded-md border border-border px-4 py-2 text-sm font-medium">Cancel</button></div></div></div>}
      {reviews.length === 0 ? <div className="rounded-md border border-dashed border-border p-10 text-center"><p className="text-sm font-medium">No reviews yet</p><p className="mt-1 text-sm text-muted-foreground">Reviews appear here after verified customers rate this product.</p></div> : <ul className="grid gap-4 md:grid-cols-2">{reviews.map((review) => <li key={review.id} className="rounded-md border border-border bg-card p-5"><div className="mb-2 flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">{review.user_name.charAt(0)}</span><div><p className="text-sm font-medium">{review.user_name}</p><p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p></div></div><RatingStars rating={review.rating} /></div><p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p></li>)}</ul>}
    </section>
  )
}

export default ReviewSection
