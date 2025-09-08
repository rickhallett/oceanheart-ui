# Agent Instructions: Manual Common Auth Install (Flowstate App)

Goal: Set up SSO auth in a standalone Next.js (App Router) repo for `flowstate.oceanheart.ai` without consuming the `@oceanheart/common-auth` package. Copy minimal helpers, wire middleware, and validate.

## Prerequisites
- Next.js 15+ (App Router) + TypeScript
- Dependencies installed: `@supabase/ssr`, `@supabase/supabase-js`
- Accounts app live at `https://accounts.oceanheart.ai`

## 1) Create Auth Helpers (copy into your app)
- Create `libs/auth/ssrClient.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN // e.g., .oceanheart.ai or .lvh.me
const SECURE_COOKIES = process.env.NODE_ENV === 'production'

export function createSSRClient(req: NextRequest, res: NextResponse) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) { return req.cookies.get(name)?.value },
      set(name: string, value: string, options: CookieOptions) {
        res.cookies.set({ name, value, ...options, domain: options?.domain ?? COOKIE_DOMAIN, secure: SECURE_COOKIES, sameSite: (options?.sameSite as any) ?? 'lax' })
      },
      remove(name: string, options: CookieOptions) {
        res.cookies.set({ name, value: '', ...options, domain: options?.domain ?? COOKIE_DOMAIN, secure: SECURE_COOKIES, sameSite: (options?.sameSite as any) ?? 'lax', maxAge: 0 })
      },
    },
  })
}
```
- Create `libs/auth/requireAuth.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from './ssrClient'

export function buildSignInURL(returnTo: URL) {
  const u = new URL('https://accounts.oceanheart.ai/signin')
  u.searchParams.set('returnTo', returnTo.toString())
  return u
}

export async function requireAuth(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createSSRClient(req, res)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(buildSignInURL(new URL(req.url)), { headers: res.headers })
  return { res, user }
}
```
- Create `libs/auth/withEntitlement.ts`:
```ts
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function withEntitlement(appSlug: string, userId: string) {
  const { data } = await supabaseAdmin.from('user_entitlements').select('expires_at').eq('user_id', userId).eq('app_slug', appSlug).single()
  if (!data) return false
  if (!data.expires_at) return true
  return new Date(data.expires_at).getTime() > Date.now()
}
```
- Create `libs/auth/returnTo.ts`:
```ts
const ALLOW_HOSTS = (process.env.RETURNTO_ALLOW_HOSTS || '').split(',').map(h => h.trim()).filter(Boolean)
export function isAllowedReturnTo(u: URL) { const host = u.host.toLowerCase(); return host.endsWith('.oceanheart.ai') || ALLOW_HOSTS.includes(host) }
```

## 2) Add middleware guard
- `middleware.ts` (repo root):
```ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { requireAuth } from './libs/auth/requireAuth'
import { withEntitlement } from './libs/auth/withEntitlement'

export async function middleware(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  const { res, user } = auth
  const allowed = await withEntitlement('flowstate', user.id)
  if (!allowed) return NextResponse.redirect(new URL('/no-access', req.url), { headers: res.headers })
  return res
}

export const config = { matcher: ['/((?!_next|static|image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'] }
```
- Add `app/no-access/page.tsx` with a simple message.

## 3) Sign-out helper (optional)
- `app/signout/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) { const url = new URL(req.url); const to = new URL('https://accounts.oceanheart.ai/logout'); to.searchParams.set('returnTo', `${url.origin}/`); return NextResponse.redirect(to) }
```

## 4) Environment
- `.env.local` in this app:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
COOKIE_DOMAIN=.oceanheart.ai  # .lvh.me for local
RETURNTO_ALLOW_HOSTS=
```
- For local dev: `COOKIE_DOMAIN=.lvh.me`, app base URL like `http://flowstate.lvh.me:3001`

## 5) Supabase Dashboard
- Set `SUPABASE_AUTH_COOKIE_DOMAIN = .oceanheart.ai`
- Redirect URLs:
  - Prod: `https://accounts.oceanheart.ai/auth/callback`, `https://oceanheart.ai/api/auth/unified-callback`
  - Local: `http://accounts.lvh.me:3000/auth/callback`, `http://oceanheart.lvh.me:3002/api/auth/unified-callback`
- Seed entitlements: ensure a row exists in `user_entitlements` for `(user_id, 'flowstate')`

## 6) Validate
- Start accounts app + main site + this app (unique ports, lvh.me hosts)
- Visit Flowstate → redirected to accounts → sign in → returned with session → entitlement allow/deny → `/signout` clears session

Tips
- Keep service role key server-only.
- If you prefer, replace SSR client in middleware with `createMiddlewareClient` from `@supabase/auth-helpers-nextjs`.

