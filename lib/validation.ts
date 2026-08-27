export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | null {
  const email = value.trim()
  if (!email) return 'Email is required.'
  if (!EMAIL_RE.test(email)) return 'Enter a valid email address.'
  return null
}

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}
