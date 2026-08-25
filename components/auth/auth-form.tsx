'use client'

import { Box, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { isSupabaseConfigured } from '@/lib/supabase/client'
import { useAuth, DEMO_CREDENTIALS } from '@/lib/auth-context'

export function AuthForm({ mode, compact = false }: { mode: 'login' | 'register'; compact?: boolean }) {
  const router = useRouter()
  const { toast } = useToast()
  const { signIn, signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const isLogin = mode === 'login'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') ?? '')
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    if (!isSupabaseConfigured) {
      await new Promise((r) => setTimeout(r, 400))
      const result = isLogin ? signIn(email, password) : signUp(name, email, password)
      if (!result.ok) {
        toast(result.message, { variant: 'error', description: isLogin ? 'Check your email and password.' : 'Please review the form and try again.' })
        setLoading(false)
        return
      }
      toast(isLogin ? 'Signed in' : 'Account created', {
        description: isLogin ? 'Your account is ready.' : 'You are now signed in.',
        variant: 'success',
      })
      router.push(isLogin && email.includes('example.com') && email !== 'user@example.com' ? '/admin' : '/account')
      return
    }

    // Real Supabase auth (activates once the integration is connected):
    // const supabase = createClient()
    // const { error } = isLogin
    //   ? await supabase.auth.signInWithPassword({ email, password })
    //   : await supabase.auth.signUp({ email, password })
    // if (error) { toast(error.message, { variant: 'error' }); setLoading(false); return }
    // router.push('/account')
  }

  return (
    <div className={compact ? 'w-full' : 'flex min-h-[70vh] items-center justify-center px-4 py-12'}>
      <div className={compact ? 'w-full' : 'animate-fade-up w-full max-w-md'}>
        <div className={compact ? 'mb-4 flex flex-col items-center gap-2 text-center' : 'mb-8 flex flex-col items-center gap-3 text-center'}>
          {!compact && (
            <span className="flex size-11 items-center justify-center rounded-md bg-accent">
              <Box className="size-6 text-primary-foreground" aria-hidden />
            </span>
          )}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isLogin
                ? 'Sign in to track orders and manage your account.'
                : 'Track orders, write reviews, and get support in one place.'}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-md border border-border bg-card p-6"
        >
          {!isLogin && (
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" autoComplete="name" required placeholder="Jordan Miles" />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              required
              minLength={8}
              placeholder="At least 8 characters"
            />
          </div>
          <Button type="submit" size="lg" className="mt-1 w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : isLogin ? (
              'Sign in'
            ) : (
              'Create account'
            )}
          </Button>

          {isLogin && (
            <>
              <div className="relative my-1" aria-hidden>
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-2 text-xs text-muted-foreground">or</span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                render={<Link href="/shop" />}
              >
                Continue as guest
              </Button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Guests can shop and check out without an account. Order updates arrive by email.
              </p>
            </>
          )}
        </form>

        {isLogin && !isSupabaseConfigured && (
          <div className="mt-4 rounded-md border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
            <p className="mb-2 font-semibold text-foreground">Preview demo accounts</p>
            <div className="grid gap-1">
              {DEMO_CREDENTIALS.map(([demoEmail, demoPassword, label]) => (
                <div key={demoEmail} className="flex items-center justify-between gap-3">
                  <span>{label}: {demoEmail}</span><code>{demoPassword}</code>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
