'use client'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function SignInPage() {
  const sp = useSearchParams()
  const defaultReturnTo = process.env.NEXT_PUBLIC_DEFAULT_RETURN_TO || (typeof window !== 'undefined' ? `${window.location.origin}/` : '/')
  const returnTo = sp.get('returnTo') || defaultReturnTo
  const supabase = createClientComponentClient()
  // Dev preview values
  const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL
  const useOrigin = origin && /(^http:\/\/localhost)|(^http:\/\/.*\.lvh\.me)/.test(origin)
  const baseForPreview = useMemo(() => (useOrigin ? origin : (process.env.NEXT_PUBLIC_SITE_URL || origin || '')), [origin, useOrigin])
  const callbackPreview = useMemo(() => {
    try {
      const u = new URL('/auth/callback', baseForPreview as string)
      if (returnTo) u.searchParams.set('returnTo', returnTo)
      return u.toString()
    } catch { return '' }
  }, [baseForPreview, returnTo])

  async function signInWithEmail(email: string) {
    // Choose a base for the callback:
    // - If running locally (lvh.me/localhost), prefer the current origin to avoid env drift
    // - Else use configured NEXT_PUBLIC_SITE_URL, falling back to current origin
    const origin = typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL
    const useOrigin = origin && /(^http:\/\/localhost)|(^http:\/\/.*\.lvh\.me)/.test(origin)
    const base = useOrigin ? origin : (process.env.NEXT_PUBLIC_SITE_URL || origin || '')
    const callback = new URL('/auth/callback', base)
    if (returnTo) callback.searchParams.set('returnTo', returnTo)
    const callbackStr = callback.toString()
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Accounts/Auth] emailRedirectTo:', callbackStr, 'returnTo:', returnTo)
    }
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: callbackStr } })
  }

  return (
    <div style={{ padding: 24 }}>
      {process.env.NODE_ENV !== 'production' && (
        <div className="mb-4 text-xs p-3 rounded bg-warning text-warning-content">
          <div className="font-semibold">Dev Auth Debug (Accounts)</div>
          <div>base: {String(baseForPreview)}</div>
          <div>returnTo: {String(returnTo)}</div>
          <div>callback: {String(callbackPreview)}</div>
        </div>
      )}
      <h1>Sign in (scaffold)</h1>
      <p>This is a placeholder for the central accounts sign-in UI.</p>
    </div>
  )
}
