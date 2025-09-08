import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN // e.g., .oceanheart.ai or .lvh.me for local
// Allow forcing secure cookies in HTTPS dev (e.g., lvh.me behind TLS proxy)
const SECURE_COOKIES = process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production'

export function createSSRClient(req: NextRequest, res: NextResponse) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        res.cookies.set({
          name,
          value,
          ...options,
          // Force parent-domain cookies when COOKIE_DOMAIN is provided
          domain: COOKIE_DOMAIN || (options as any)?.domain,
          secure: SECURE_COOKIES,
          sameSite: (options?.sameSite as any) ?? 'lax',
        })
      },
      remove(name: string, options: CookieOptions) {
        res.cookies.set({
          name,
          value: '',
          ...options,
          domain: COOKIE_DOMAIN || (options as any)?.domain,
          secure: SECURE_COOKIES,
          sameSite: (options?.sameSite as any) ?? 'lax',
          maxAge: 0,
        })
      },
    },
  })
}
