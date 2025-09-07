'use client'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function SignInPage() {
  const sp = useSearchParams()
  const returnTo = sp.get('returnTo') || process.env.NEXT_PUBLIC_SITE_URL
  const supabase = createClientComponentClient()

  async function signInWithEmail(email: string) {
    const callback = new URL('/auth/callback', process.env.NEXT_PUBLIC_SITE_URL)
    if (returnTo) callback.searchParams.set('returnTo', returnTo)
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: callback.toString() } })
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Sign in (scaffold)</h1>
      <p>This is a placeholder for the central accounts sign-in UI.</p>
    </div>
  )
}
