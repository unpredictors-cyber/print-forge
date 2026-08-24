import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-primary/10 text-primary',
  neutral: 'bg-secondary text-secondary-foreground',
  success: 'bg-success/10 text-success',
  warning: 'bg-amber-500/15 text-amber-700',
  destructive: 'bg-destructive/10 text-destructive',
  outline: 'border border-border text-muted-foreground',
} as const

export type BadgeVariant = keyof typeof variants

function Badge({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'span'> & { variant?: BadgeVariant }) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
