'use client'

import { Box, CheckCircle2, Loader2, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ForgotPasswordForm() {
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!email.trim()) {
      setError('Email is required.')
      return
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    setSent(true)
    toast('Reset link sent', { description: 'Check your inbox for password reset instructions.' })
  }

  if (sent) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px] text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="size-6 text-success" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            If an account exists for {email}, we&apos;ve sent a link to reset your password.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Back to sign in
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex size-11 items-center justify-center rounded-md bg-primary">
            <Box className="size-6 text-primary-foreground" aria-hidden />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Forgot password?</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-md border border-border bg-card p-6" noValidate>
          <div>
            <Label htmlFor="reset-email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                id="reset-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null) }}
                className="pl-9"
                placeholder="you@example.com"
              />
            </div>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Sending link...
              </>
            ) : (
              'Send reset link'
            )}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
