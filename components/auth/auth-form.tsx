'use client'

import { Box, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { useAuth } from '@/lib/auth-context'

type FieldErrors = Record<string, string>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(value: string): string | null {
  if (!value.trim()) return 'Email is required.'
  if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.'
  return null
}

function validatePassword(value: string): string | null {
  if (!value) return 'Password is required.'
  if (value.length < 8) return 'Password must be at least 8 characters.'
  if (!/\d/.test(value)) return 'Password must include at least one number.'
  return null
}

export function AuthForm({ mode, compact = false }: { mode: 'login' | 'register'; compact?: boolean }) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading, signIn, signUp } = useAuth()
  const isLogin = mode === 'login'

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    remember: false,
    terms: false,
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<FieldErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [failedAttempts, setFailedAttempts] = useState(0)

  const params = useSearchParams()
  const redirectTarget = (() => {
    const r = params.get('redirect')
    return r && r.startsWith('/') ? r : null
  })()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(redirectTarget ?? '/account')
    }
  }, [isLoading, user, router, redirectTarget])

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }))
    setFormError(null)
    if (touched[key] || key === 'confirm') {
      revalidate({ ...values, [key]: value }, touched)
    }
  }

  function revalidate(next: typeof values, currentTouched: Record<string, boolean>) {
    const nextErrors: FieldErrors = {}
    if (currentTouched.email) {
      const e = validateEmail(next.email)
      if (e) nextErrors.email = e
    }
    if (currentTouched.password) {
      const e = validatePassword(next.password)
      if (e) nextErrors.password = e
    }
    if (!isLogin) {
      if (currentTouched.name && !next.name.trim()) nextErrors.name = 'Full name is required.'
      if (currentTouched.confirm) {
        if (!next.confirm) nextErrors.confirm = 'Please confirm your password.'
        else if (next.confirm !== next.password) nextErrors.confirm = 'Passwords do not match.'
      }
      if (currentTouched.terms && !next.terms) nextErrors.terms = 'You must accept the Terms to continue.'
    }
    setErrors(nextErrors)
  }

  function markTouched(field: string) {
    setTouched((t) => {
      const updated = { ...t, [field]: true }
      revalidate(values, updated)
      return updated
    })
  }

  function validateAll(): boolean {
    const nextErrors: FieldErrors = {}
    const e = validateEmail(values.email)
    if (e) nextErrors.email = e
    if (isLogin) {
      if (!values.password) nextErrors.password = 'Password is required.'
    } else {
      if (!values.name.trim()) nextErrors.name = 'Full name is required.'
      const p = validatePassword(values.password)
      if (p) nextErrors.password = p
      if (!values.confirm) nextErrors.confirm = 'Please confirm your password.'
      else if (values.confirm !== values.password) nextErrors.confirm = 'Passwords do not match.'
      if (!values.terms) nextErrors.terms = 'You must accept the Terms to continue.'
    }
    setErrors(nextErrors)
    setTouched({ email: true, password: true, name: true, confirm: true, terms: true })
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    if (!validateAll()) return
    setLoading(true)

    await new Promise((r) => setTimeout(r, 450))

    if (isLogin) {
      const result = signIn(values.email, values.password, values.remember)
      if (!result.ok) {
        const attempts = failedAttempts + 1
        setFailedAttempts(attempts)
        setFormError(
          attempts >= 3
            ? 'Having trouble? Check your email and password, or reset your password.'
            : 'Incorrect email or password. Please try again.',
        )
        setLoading(false)
        return
      }
      toast('Welcome back!', { variant: 'success' })
      router.push(redirectTarget ?? (values.email.includes('example.com') && values.email !== 'user@example.com' ? '/admin' : '/account'))
      return
    }

    const result = signUp(values.name, values.email, values.password)
    if (!result.ok) {
      setFormError(result.message)
      setLoading(false)
      return
    }
    toast('Account created successfully', { variant: 'success' })
    router.push('/account')
  }

  if (!isLoading && user && !compact) {
    return null
  }

  const passwordType = showPassword ? 'text' : 'password'
  const confirmType = showConfirm ? 'text' : 'password'

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {!isLogin && (
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            onBlur={() => markTouched('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="Jordan Miles"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-destructive">{errors.name}</p>
          )}
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          onBlur={() => markTouched('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-xs text-destructive">{errors.email}</p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={passwordType}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
            value={values.password}
            onChange={(e) => update('password', e.target.value)}
            onBlur={() => markTouched('password')}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className="pr-10"
            placeholder={isLogin ? 'Enter your password' : 'At least 8 characters with a number'}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="mt-1 text-xs text-destructive">{errors.password}</p>
        )}
      </div>

      {!isLogin && (
        <div>
          <Label htmlFor="confirm">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirm"
              name="confirm"
              type={confirmType}
              autoComplete="new-password"
              value={values.confirm}
              onChange={(e) => update('confirm', e.target.value)}
              onBlur={() => markTouched('confirm')}
              aria-invalid={!!errors.confirm}
              aria-describedby={errors.confirm ? 'confirm-error' : undefined}
              className="pr-10"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-foreground"
            >
              {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.confirm && (
            <p id="confirm-error" className="mt-1 text-xs text-destructive">{errors.confirm}</p>
          )}
        </div>
      )}

      {isLogin ? (
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={values.remember}
              onChange={(e) => update('remember', e.target.checked)}
              className="size-4 accent-primary"
            />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
      ) : (
        <div>
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={values.terms}
              onChange={(e) => update('terms', e.target.checked)}
              onBlur={() => markTouched('terms')}
              className="mt-0.5 size-4 accent-primary"
            />
            <span>
              I agree to the{' '}
              <Link href="/policies/terms" className="font-medium text-primary hover:underline">Terms & Conditions</Link>{' '}
              and{' '}
              <Link href="/policies/privacy" className="font-medium text-primary hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1 text-xs text-destructive">{errors.terms}</p>
          )}
        </div>
      )}

      {formError && (
        <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {formError}
        </div>
      )}

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
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            Continue as guest
          </Button>
        </>
      )}
    </form>
  )

  if (compact) {
    return (
      <div className="w-full">
        {formContent}
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
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

        <div className="rounded-md border border-border bg-card p-6">
          {formContent}
        </div>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </div>
    </main>
  )
}
