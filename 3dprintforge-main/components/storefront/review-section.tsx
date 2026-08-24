import { RatingStars } from '@/components/ui/rating-stars'
import type { Review } from '@/lib/types'
import { averageRating, formatDate } from '@/lib/utils'

export function ReviewSection({ reviews }: { reviews: Review[] }) {
  const avg = averageRating(reviews.map((r) => r.rating))

  return (
    <section aria-label="Customer reviews" className="mt-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Customer reviews</h2>
          {reviews.length > 0 && (
            <span className="flex items-center gap-2">
              <RatingStars rating={avg} size="md" />
              <span className="text-sm text-muted-foreground">
                {avg.toFixed(1)} out of 5 · {reviews.length} review{reviews.length === 1 ? '' : 's'}
              </span>
            </span>
          )}
        </div>
        <details className="relative">
          <summary className="cursor-pointer list-none rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90">
            Write a review
          </summary>
          <form className="absolute right-0 z-10 mt-2 grid w-72 gap-3 rounded-md border border-border bg-card p-4 shadow-lg">
            <label className="grid gap-1 text-sm font-medium">Your name<input required className="h-9 rounded border border-input bg-background px-2" /></label>
            <label className="grid gap-1 text-sm font-medium">Rating<select required className="h-9 rounded border border-input bg-background px-2"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label>
            <label className="grid gap-1 text-sm font-medium">Review<textarea required rows={3} className="rounded border border-input bg-background p-2" /></label>
            <button type="button" className="rounded-md bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground">Submit review</button>
          </form>
        </details>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-md border border-dashed border-border p-10 text-center">
          <p className="text-sm font-medium">No reviews yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Reviews appear here after verified customers rate this product.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-md border border-border bg-card p-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground"
                  >
                    {review.user_name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{review.user_name}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(review.created_at)}</p>
                  </div>
                </div>
                <RatingStars rating={review.rating} />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
