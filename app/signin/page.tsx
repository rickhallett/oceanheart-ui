'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/libs/supabase/client'
import { useMemo } from 'react'

function SignInForm() {
  const sp = useSearchParams()
  const supabase = createClient()
  const [email, setEmail] = useState('rickhallett@icloud.com')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)

  // If Flowstate or another app initiated sign-in, it will pass a full returnTo URL.
  // Default comes from env so we can point to Flowstate in dev.
  const defaultReturnTo = process.env.NEXT_PUBLIC_DEFAULT_RETURN_TO || (typeof window !== 'undefined' ? `${window.location.origin}/` : '/')
  const returnTo = sp.get('returnTo') || defaultReturnTo

  // Dev-only banner info to verify redirect construction
  const accountsBaseForPreview = useMemo(() => {
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
    if (typeof window !== 'undefined') return window.location.origin
    return ''
  }, [])
  const callbackPreview = useMemo(() => {
    try {
      const u = new URL('/auth/callback', accountsBaseForPreview)
      if (returnTo) u.searchParams.set('returnTo', returnTo)
      return u.toString()
    } catch {
      return ''
    }
  }, [accountsBaseForPreview, returnTo])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setMessage(null)
    try {
      // Always redirect the magic link back to the central Accounts callback,
      // which will exchange the code, set shared cookies, and then forward to returnTo.
      // Keep it simple and deterministic: always use the Accounts base from env.
      // Ensure NEXT_PUBLIC_SITE_URL is set to the Accounts origin for the current env
      // (prod: https://accounts.oceanheart.ai, local: http://accounts.lvh.me:3000).
      const accountsBase = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
      const callback = new URL('/auth/callback', accountsBase)
      if (returnTo) callback.searchParams.set('returnTo', returnTo)
      const callbackStr = callback.toString()
      if (process.env.NODE_ENV !== 'production') {
        console.log('[Auth] emailRedirectTo:', callbackStr, 'returnTo:', returnTo)
      }
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: callbackStr },
      })
      if (error) throw error
      setStatus('sent')
      setMessage('Check your email for a magic link to sign in.')
    } catch (err: any) {
      setStatus('error')
      setMessage(err?.message || 'Failed to send magic link')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-base-200 rounded-xl p-6 shadow">
        {process.env.NODE_ENV !== 'production' && (
          <div className="mb-4 text-xs p-3 rounded bg-warning text-warning-content">
            <div className="font-semibold">Dev Auth Debug</div>
            <div>accountsBase: {accountsBaseForPreview}</div>
            <div>returnTo: {returnTo}</div>
            <div>callback: {callbackPreview}</div>
            <div>supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</div>
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <p className="mb-6 text-sm opacity-80">We will email you a magic link to sign in.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send magic link'}
          </button>
        </form>
        {message && (
          <div className={`mt-4 text-sm ${status === 'error' ? 'text-error' : 'text-success'}`}>{message}</div>
        )}
      </div>
    </main>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}
