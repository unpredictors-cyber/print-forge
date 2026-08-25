'use client'

import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastItem {
  id: number
  title: string
  description?: string
  variant: ToastVariant
}

interface ToastContextValue {
  toast: (title: string, opts?: { description?: string; variant?: ToastVariant }) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

let nextId = 1

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (title: string, opts?: { description?: string; variant?: ToastVariant }) => {
      const id = nextId++
      setToasts((prev) => [
        ...prev.slice(-3),
        { id, title, description: opts?.description, variant: opts?.variant ?? 'success' },
      ])
      setTimeout(() => dismiss(id), 4000)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast }), [toast])

  const icons: Record<ToastVariant, ReactNode> = {
    success: <CheckCircle2 className="size-4.5 text-success" aria-hidden />,
    error: <XCircle className="size-4.5 text-destructive" aria-hidden />,
    info: <Info className="size-4.5 text-accent" aria-hidden />,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="pointer-events-none fixed right-4 bottom-4 z-100 flex w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="animate-toast-in pointer-events-auto flex items-start gap-3 rounded-md border border-border bg-card p-3.5 shadow-lg"
          >
            {icons[t.variant]}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-card-foreground">{t.title}</p>
              {t.description ? (
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {t.description}
                </p>
              ) : null}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Dismiss notification"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
