'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { RatingStars } from '@/components/ui/rating-stars'
import { useToast } from '@/components/ui/toast'

interface WriteReviewModalProps {
  open: boolean
  onClose: () => void
  productName: string
}

export function WriteReviewModal({ open, onClose, productName }: WriteReviewModalProps) {
  const { toast } = useToast()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // Simulates persistence; replace with Supabase reviews insert when connected
    await new Promise((r) => setTimeout(r, 500))
    setSubmitting(false)
    setComment('')
    setRating(5)
    onClose()
    toast('Review submitted', { description: `Thanks for reviewing ${productName}.` })
  }

  return (
    <Modal open={open} onClose={onClose} title={`Review ${productName}`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-foreground">Your rating</span>
          <RatingStars rating={rating} interactive onChange={setRating} size={24} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="review-comment" className="text-sm font-medium text-foreground">
            Your review
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
            placeholder="Share what you liked (or didn't) about the print quality, material, and finish…"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting…' : 'Submit review'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
