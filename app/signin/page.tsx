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

  // Extract app name from returnTo URL
  const appName = useMemo(() => {
    try {
      if (!returnTo) return null
      const url = new URL(returnTo)
      const hostname = url.hostname
      const parts = hostname.split('.')
      // Extract the first part as the app name (e.g., 'thera' from 'thera.lvh.me')
      return parts[0]
    } catch {
      return null
    }
  }, [returnTo])

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

  // Console log the debug information that was previously shown in the card
  useMemo(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Dev Auth Debug] accountsBase:', accountsBaseForPreview)
      console.log('[Dev Auth Debug] returnTo:', returnTo)
      console.log('[Dev Auth Debug] callback:', callbackPreview)
      console.log('[Dev Auth Debug] supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('[Dev Auth Debug] extracted app name:', appName)
    }
  }, [accountsBaseForPreview, returnTo, callbackPreview, appName])

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {appName && (
          <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl border border-white/20">
            <div className="flex items-center mb-3">
              <div className="w-3 h-3 bg-white/30 rounded-full mr-2"></div>
              <div className="w-2 h-2 bg-white/20 rounded-full mr-2"></div>
              <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            </div>
            <div className="font-bold text-2xl mb-3 text-center">Welcome! 👋</div>
            <p className="text-white/90 leading-relaxed text-sm text-center">
              To access <span className="font-bold text-white bg-white/20 px-2 py-1 rounded-md">{appName.toUpperCase()}</span>
            </p>
            <p className="text-white/80 leading-relaxed text-sm text-center">
            please sign in to Oceanheart AI Accounts.
            </p>
          </div>
        )}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Sign In
            </h1>
            <p className="text-gray-600 text-md">We'll send you a magic link to get started</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-md placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="w-full text-md bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Sending magic link...
                </span>
              ) : (
                'Send magic link ✨'
              )}
            </button>
          </form>
          {message && (
            <div className={`mt-6 p-4 rounded-xl text-sm text-center font-medium ${
              status === 'error' 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}
        </div>
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
