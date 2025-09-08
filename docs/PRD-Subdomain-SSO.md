# PRD: Subdomain SSO for Oceanheart Apps

## Summary
Enable single sign-on across Oceanheart subdomains (e.g., `flowstate.oceanheart.ai`, future apps) using the existing Supabase Auth workflow and Next.js 14 (App Router). Centralize login on `accounts.oceanheart.ai`, share sessions via domain-scoped cookies, and enforce app-level entitlements server-side.

## Goals
- One login grants access across all product subdomains.
- Centralized auth UI on `accounts.oceanheart.ai` with return-to redirects.
- Consistent SSR session handling via a shared auth module.
- Server-side entitlement checks per app (feature gating/plan/expiry).

## Non-Goals
- SAML/OIDC federation, enterprise IdP onboarding.
- Team/org management and complex RBAC (beyond per-app entitlement).

## Architecture Overview
- Identity: Supabase Auth (same project/keys across apps).
- Session sharing: cookies scoped to `.oceanheart.ai` (HTTPS only).
- Apps: separate Next.js deployments per subdomain on Vercel.
- Common auth: shared utilities (SSR client, middleware guard, session provider).
- Entitlements: Supabase table `user_entitlements(user_id, app_slug, plan, expires_at)`.

## Technical Requirements
1) Accounts App
- Route: `https://accounts.oceanheart.ai/signin` (+ signup/reset as needed).
- Accepts `returnTo` param, validates against allowed origins, issues domain cookie, redirects back.
- `/logout` clears domain cookies and calls Supabase sign-out.

2) Cookie Strategy
- Domain: `.oceanheart.ai`
- Secure: `true` (HTTPS only)
- SameSite: `Lax` (recommended for subdomains), use `None` if third‑party contexts are needed.
- httpOnly for refresh/access tokens; short‑lived access token in memory if required.

3) Shared Auth Module (common package)
- `createSSRClient(req, res)` factory using `@supabase/ssr`.
- `requireAuth({ returnToBase })` for middleware/route guards.
- `getSession()`/`getUser()` helpers (server and client wrappers).
- `withEntitlement(appSlug)` server utility to assert access.

4) Middleware Contract (each app)
- In `middleware.ts`: attempt SSR session read; if missing, 302 to `accounts.oceanheart.ai/signin?returnTo=<current-url>`.
- On protected routes, assert entitlement for that app slug and redirect/403 on failure.

5) Entitlements
- Table: `user_entitlements`
  - Columns: `id (uuid)`, `user_id (uuid)`, `app_slug (text)`, `plan (text)`, `expires_at (timestamptz)`, `created_at`.
  - Unique: (`user_id`, `app_slug`).
- Server check utility: valid if now < `expires_at` (or null means non‑expiring) and record exists.

6) Configuration & Env
- All apps: `SUPABASE_URL`, `SUPABASE_ANON_KEY`.
- Accounts app also needs `NEXT_PUBLIC_SITE_URL` and a whitelist for `returnTo` hosts.
- Set cookie domain and same-site in SSR client config.

7) Vercel & Domains
- Separate Vercel projects per app; map custom domains: `accounts.oceanheart.ai`, `flowstate.oceanheart.ai`, etc.
- Enforce HTTPS; add all redirect URLs to Supabase Auth settings.
- Preview deployments: restrict cross-site cookies (tests should focus on production domains or `.vercel.app` equivalents).

8) Local Development
- Use `lvh.me` subdomains: `accounts.lvh.me:3000`, `flowstate.lvh.me:3001`.
- Cookie domain: `.lvh.me`.
- Update Supabase redirect URLs to include local domains/ports.

9) Security & Compliance
- Validate `returnTo` against an allowlist; default to a safe URL.
- Never log tokens; rotate keys in Vercel via encrypted env vars.
- CSRF: `SameSite=Lax` + Next.js middleware checks on state/nonce where applicable.

10) Telemetry & Observability
- Basic auth metrics: login success/failure, redirect loops, entitlement denials.
- Log correlation ID per request; sample at edge middleware.

## Acceptance Criteria
- Logging in on `accounts.oceanheart.ai` grants access to a protected page on another subdomain without re-login.
- Unauthenticated user on `flowstate.oceanheart.ai` is redirected to accounts and back to the original path.
- Entitlement gates block users without access to `app_slug` with a user-friendly screen.
- Logout clears session across all subdomains.
- E2E tests cover login redirect, entitlement allow/deny, logout, and token refresh.

## Implementation Plan (Checklist)
- [ ] Create `apps/accounts` (or separate repo) with signin, callback, logout routes
- [ ] Implement `returnTo` validation and redirects
- [ ] Configure Supabase Auth redirect URLs (prod + local)
- [ ] Add domain‑scoped cookie settings in SSR client
- [ ] Create `packages/common-auth` with SSR client, guards, entitlement helpers
- [ ] Publish or link common package into each app
- [ ] Update each app `middleware.ts` to use `requireAuth`
- [ ] Add server entitlement checks (`withEntitlement('flowstate')`)
- [ ] Create Supabase `user_entitlements` table + unique index
- [ ] Seed minimal test entitlements for dev users
- [ ] Add `/logout` route that clears cookies + Supabase sign‑out
- [ ] Configure Vercel projects and custom domains for each app
- [ ] Add env vars to Vercel (URL, ANON KEY, site URL, allowlist)
- [ ] Local dev: lvh.me subdomains + ports; README update
- [ ] QA: Safari/ITP, mobile, expired token refresh, redirect loops
- [ ] E2E: Cypress specs for login, cross‑subdomain, entitlement, logout
- [ ] Monitoring: basic logs/metrics dashboards
- [ ] Documentation: AGENTS.md + ARCHITECTURE.md updates

## Milestones
- M1: Accounts app + cookie domain working locally (2–3 days)
- M2: First product app integrated with entitlement checks (2–3 days)
- M3: Vercel prod domains + Supabase redirects (1–2 days)
- M4: QA + E2E + docs (2 days)

## Dependencies
- Supabase project keys shared across apps.
- Custom domains provisioned in DNS and Vercel.

## References
- Existing stack: Next.js 14 (App Router), `@supabase/ssr`, Tailwind, Bun.
- Repo docs: `ARCHITECTURE.md`, `AGENTS.md`.

## Env Switching (Local vs Prod)
- Local (lvh.me): use `.env.local.example` as a template
  - `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` → dev project or CLI
  - `COOKIE_DOMAIN=.lvh.me`, `NEXT_PUBLIC_SITE_URL=http://oceanheart.lvh.me:3002`
  - Product apps: `NEXT_PUBLIC_LOGIN_URL=http://oceanheart.lvh.me:3002/signin`
  - Supabase (dev) redirects: add `http://oceanheart.lvh.me:3002/auth/callback` and `/api/auth/unified-callback`
- Prod (Vercel): use `.env.prod.example` as a template
  - `COOKIE_DOMAIN=.oceanheart.ai`, `NEXT_PUBLIC_SITE_URL=https://oceanheart.ai`
  - Product apps: `NEXT_PUBLIC_LOGIN_URL=https://oceanheart.ai/signin`
  - Supabase (prod): set `SUPABASE_AUTH_COOKIE_DOMAIN=.oceanheart.ai`; add prod callback URLs

## Scaffold Usage
- Common package: `packages/common-auth`
  - Use `src/ssrClient.ts` to create the Supabase SSR client in middleware/route handlers.
  - Use `src/requireAuth.ts` in each app’s `middleware.ts` to redirect unauthenticated users to accounts.
  - Use `src/withEntitlement.ts` to gate server routes by `appSlug`.
  - Optional: `src/returnTo.ts` to validate `returnTo` targets.
- Example apps:
  - Accounts: `apps/accounts/app/(auth)/signin/page.tsx`, `apps/accounts/app/logout/route.ts`.
  - Product: `apps/flowstate/middleware.ts` (copy pattern and change slug).
- Env setup: copy `docs/ENV.sample-sso` to your app envs.
  - Required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server only), `COOKIE_DOMAIN`, `NEXT_PUBLIC_SITE_URL`.
- Integration steps (per app):
  1) Import from common-auth (monorepo path alias or internal package name).
  2) Add/adjust `middleware.ts` to call `requireAuth` and entitlement check.
  3) Configure env vars and Supabase redirect URLs for that subdomain.
  4) Map the custom subdomain in Vercel and set envs.
- Local dev:
  - Use `accounts.lvh.me:3000`, `flowstate.lvh.me:3001`; set `COOKIE_DOMAIN=.lvh.me`.
  - Ensure Supabase redirects include the lvh.me hosts and ports.
- Validate:
  - Hit `flowstate` → redirected to accounts → sign-in → returned with session → entitlement gate allows/denies → logout clears across subdomains.

## Alignment With External Guidance
This PRD aligns with the recommended hybrid structure: a central platform for auth + shared utilities, and autonomous subdomain apps.

- Centralized auth: Supported via dedicated accounts app (`accounts.oceanheart.ai`) and shared SSR utilities.
- Separate app repos/projects: Supported; each app hosts its own code and uses `middleware.ts` to read the shared session.
- Shared library: Provided via `packages/common-auth` (candidate for a private NPM package).
- Unified callback: Implemented (`apps/accounts/app/auth/callback/route.ts`) performing `exchangeCodeForSession` and redirecting with `returnTo` validation.
- Cookie domain: Domain-scoped cookies (`.oceanheart.ai`) are set in SSR adapter; also configure Supabase’s cookie domain.
- Authorization: Implemented via a related table (`user_entitlements`), equivalent to extending `profiles` with app access flags.

### Notable Differences and Recommended Decisions
- Login domain: Guidance suggests `oceanheart.ai/signin`; this PRD uses `accounts.oceanheart.ai/signin`.
  - Recommendation: Keep `accounts.*` to decouple auth from marketing. Optionally add `oceanheart.ai/signin` that redirects to accounts for UX continuity.
- Unified callback location: Guidance places it at `app/api/auth/unified-callback` in the main platform; we placed it in the accounts app.
  - Recommendation: Either keep it centralized in `accounts.*` (current), or add a thin proxy endpoint on the main domain that forwards to accounts.
- Cookie config: Add explicit `SUPABASE_AUTH_COOKIE_DOMAIN=.oceanheart.ai` in Supabase settings in addition to SSR adapter domain.
- Authorization model: We use `user_entitlements` (normalized). Guidance mentions `profiles` flags.
  - Recommendation: Keep `user_entitlements` for multi-app scalability; surface summaries in `profiles` if needed for quick reads.
- reCAPTCHA: Guidance centralizes `verify-captcha`.
  - Action: If captcha is in scope, host a central `app/api/auth/verify-captcha` on the platform and call it from accounts.
- RLS Policies: Explicit RLS per app tables.
  - Action: Add RLS policies referencing `auth.uid()` and entitlement checks for each app’s data.

### Action Items to Close Gaps
- [ ] Configure `SUPABASE_AUTH_COOKIE_DOMAIN=.oceanheart.ai` in Supabase project settings.
- [ ] Add `oceanheart.ai/signin` route that 302-redirects to `https://accounts.oceanheart.ai/signin`.
- [ ] (Optional) Add main-domain `app/api/auth/unified-callback` that proxies to accounts callback.
- [ ] Implement/centralize `verify-captcha` if required by the login flow.
- [ ] Define and apply RLS policies for any app-specific tables.


## Reference Implementations (Stubs)
These examples align with current Supabase SSR + Next.js 14 App Router patterns.

1) packages/common-auth/src/ssrClient.ts
```ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN // e.g., .oceanheart.ai or .lvh.me for local

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
          domain: options?.domain ?? COOKIE_DOMAIN,
          secure: true,
          sameSite: (options?.sameSite as any) ?? 'lax',
        })
      },
      remove(name: string, options: CookieOptions) {
        res.cookies.set({
          name,
          value: '',
          ...options,
          domain: options?.domain ?? COOKIE_DOMAIN,
          secure: true,
          sameSite: (options?.sameSite as any) ?? 'lax',
          maxAge: 0,
        })
      },
    },
  })
}
```

2) packages/common-auth/src/requireAuth.ts
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
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const signInUrl = buildSignInURL(new URL(req.url))
    return NextResponse.redirect(signInUrl, { headers: res.headers })
  }
  return { res, user }
}
```

3) apps/flowstate/middleware.ts
```ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { requireAuth } from 'common-auth/requireAuth'
import { withEntitlement } from 'common-auth/withEntitlement'

export async function middleware(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth // redirected to accounts

  const { res, user } = auth
  const allowed = await withEntitlement('flowstate', user.id)
  if (!allowed) {
    return NextResponse.redirect(new URL('/no-access', req.url), { headers: res.headers })
  }
  return res
}

export const config = {
  matcher: ['/((?!_next|public|favicon.ico).*)'],
}
```

4) packages/common-auth/src/withEntitlement.ts
```ts
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only secret
)

export async function withEntitlement(appSlug: string, userId: string) {
  const { data, error } = await supabaseAdmin
    .from('user_entitlements')
    .select('expires_at')
    .eq('user_id', userId)
    .eq('app_slug', appSlug)
    .single()

  if (error || !data) return false
  if (!data.expires_at) return true
  return new Date(data.expires_at).getTime() > Date.now()
}
```

5) apps/accounts/app/(auth)/signin/page.tsx (simplified)
```tsx
'use client'
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function SignInPage() {
  const sp = useSearchParams()
  const returnTo = sp.get('returnTo')
  const supabase = createClientComponentClient()

  async function signInWithEmail(email: string) {
    await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: returnTo ?? process.env.NEXT_PUBLIC_SITE_URL } })
  }
  // Render form and handle providers; on success, backend cookie will be set
  return <div>/* sign-in form */</div>
}
```

6) apps/accounts/app/logout/route.ts
```ts
import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from 'common-auth/ssrClient'

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/', req.url))
  const supabase = createSSRClient(req, res)
  await supabase.auth.signOut()
  // Cookies cleared via SSR adapter
  return res
}
```

7) packages/common-auth/src/returnTo.ts
```ts
const ALLOW_HOSTS = (process.env.RETURNTO_ALLOW_HOSTS || '').split(',').map(h => h.trim()).filter(Boolean)

export function isAllowedReturnTo(u: URL) {
  const host = u.host.toLowerCase()
  if (host.endsWith('.oceanheart.ai')) return true
  return ALLOW_HOSTS.includes(host)
}
```

Note: Ensure Supabase Auth settings include all redirect URLs (prod and local), and that all apps run over HTTPS in production to satisfy cookie security requirements.
