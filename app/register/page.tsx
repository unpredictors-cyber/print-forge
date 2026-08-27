import type { Metadata } from 'next'
import { Suspense } from 'react'

import { AuthForm } from '@/components/auth/auth-form'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a PrintForge account to track orders, write reviews, and get support.',
}

export default function RegisterPage() {
  return (
    <Suspense>
      <AuthForm mode="register" />
    </Suspense>
  )
}
