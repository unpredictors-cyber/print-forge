'use client'

import { Star } from 'lucide-react'

import { cn } from '@/lib/utils'

export function RatingStars({
  rating,
  size = 'sm',
  interactive = false,
  onChange,
  className,
}: {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (value: number) => void
  className?: string
}) {
  const sizeClass = { sm: 'size-3.5', md: 'size-4.5', lg: 'size-6' }[size]

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? 'Select a rating' : `Rated ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(rating)
        const StarEl = (
          <Star
            className={cn(
              sizeClass,
              filled ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground/30',
              'transition-colors',
            )}
            aria-hidden
          />
        )
        if (!interactive) return <span key={star}>{StarEl}</span>
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === Math.round(rating)}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
            onClick={() => onChange?.(star)}
            className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {StarEl}
          </button>
        )
      })}
    </div>
  )
}
