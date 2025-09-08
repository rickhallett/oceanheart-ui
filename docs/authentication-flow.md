# Oceanheart Accounts ↔ Apps Authentication Flow

This guide explains how Oceanheart’s central Accounts app (accounts.oceanheart.ai) authenticates users and shares sessions with any integrated app (e.g., flowstate.oceanheart.ai). It covers the user flow, cookies, redirects, entitlement checks, local dev, and where the logic lives in this repo.

## TL;DR
- Centralize sign-in at `accounts.oceanheart.ai`.
- Share the Supabase session across subdomains via cookies scoped to `.oceanheart.ai`.
- Each app protects routes in `middleware.ts` and checks per-app entitlements.
- Logout from Accounts clears session cookies for all apps.

## Key Concepts
- Accounts app: `accounts.oceanheart.ai` (local: `accounts.lvh.me:3000`). Hosts the sign-in UI, issues cookies, and handles logout.
- Integrated apps: Any product app on a subdomain (e.g., `flowstate.oceanheart.ai`). Each app enforces auth + entitlements.
- Supabase Auth: Identity provider for sign-in (OTP, OAuth, etc.).
- Domain-scoped cookies: Auth cookies use `domain=.oceanheart.ai` so all subdomains share the same session.
- Entitlements: App-level access control via `public.user_entitlements`.

## End-to-End Flow

1) User navigates to an integrated app
- App middleware tries to read Supabase session.
- If missing, it redirects to Accounts with a `returnTo` parameter.

2) User signs in on Accounts
- Accounts completes Supabase login and sets auth cookies with `domain=.oceanheart.ai`.
- Accounts redirects user back to the original app using the validated `returnTo` URL.

3) App entitlement check
- The app re-reads the session (now present) and checks `user_entitlements` for its `app_slug`.
- If allowed, continue. If not, redirect to `/no-access` (or similar UX).

4) Logout
- Visiting `https://accounts.oceanheart.ai/logout` clears the domain-scoped cookies and signs the user out of Supabase.
- User is effectively logged out from all apps.

## Sequence Diagram (Text)

User → App: open https://flowstate.oceanheart.ai
App → App: check session (SSR client)
App → Accounts: 302 to /signin?returnTo=https://flowstate.oceanheart.ai/path
User → Accounts: complete sign-in (Supabase)
Accounts → Browser: set cookies (domain=.oceanheart.ai)
Accounts → App: 302 to returnTo URL
App → App: check session again (now present)
App → DB (service role): check user_entitlements for app_slug
App → User: allow or redirect to /no-access

## Repo Touchpoints

- Supabase SSR client with parent-domain cookies
  - `libs/supabase/server.ts`
  - `packages/common-auth/src/ssrClient.ts`

- Auth + redirect helper
  - `packages/common-auth/src/requireAuth.ts`

- Entitlement check (server-side)
  - `packages/common-auth/src/withEntitlement.ts`
  - DB table migration: `migrations/20250907_create_user_entitlements.sql`

- Accounts sign-in scaffold
  - `apps/accounts/app/(auth)/signin/page.tsx`

- Example app templates and docs
  - `docs/specs/08_app_auth_integration_flow.md`
  - `docs/PRD-Subdomain-SSO.md`

## Middleware Pattern (per app)

Use the common helpers to guard routes and enforce app entitlements:

```ts
// apps/{appname}/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '../../packages/common-auth/src/requireAuth'
import { withEntitlement } from '../../packages/common-auth/src/withEntitlement'

export async function middleware(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { res, user } = auth
  const allowed = await withEntitlement('appname', user.id)
  if (!allowed) return NextResponse.redirect(new URL('/no-access', req.url), { headers: res.headers })
  return res
}

export const config = {
  matcher: ['/((?!_next|static|public|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

## Cookies & Settings

- Cookie domain
  - Use parent domain for cross-subdomain sharing: `.oceanheart.ai`
  - Local dev uses `.lvh.me` (works for any `*.lvh.me` host on localhost)

- Security flags
  - `secure`: true in production (also support via `COOKIE_SECURE`)
  - `sameSite`: `lax` by default

- Supabase Dashboard
  - Add redirect URLs for Accounts auth callbacks (prod + local)
  - Optionally set `SUPABASE_AUTH_COOKIE_DOMAIN = .oceanheart.ai`

## Environment Variables

Add these to each app (production values in your hosting env):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=           # only used server-side for entitlement checks
COOKIE_DOMAIN=.oceanheart.ai         # .lvh.me for local
COOKIE_SECURE=true                   # recommended in prod
NEXT_PUBLIC_SITE_URL=https://{app}.oceanheart.ai
RETURNTO_ALLOW_HOSTS=accounts.oceanheart.ai,oceanheart.ai
```

## Entitlements

Schema (simplified):

```
user_entitlements (
  user_id uuid,
  app_slug text,
  plan text,
  expires_at timestamptz null,
  created_at timestamptz default now()
)
-- unique (user_id, app_slug)
```

Behavior:
- Allow if row exists and `expires_at` is null or in the future.
- Deny otherwise (redirect to `/no-access`).

Relevant files:
- `migrations/20250907_create_user_entitlements.sql`
- `migrations/20250907_user_entitlements_rls.sql`
- `packages/common-auth/src/withEntitlement.ts`

## Local Development

Recommended hosts/ports:
- Accounts: `http://accounts.lvh.me:3000`
- Example app (Flowstate): `http://flowstate.lvh.me:3001`
- Main site: `http://oceanheart.lvh.me:3002`

Setup tips:
- `COOKIE_DOMAIN=.lvh.me`
- Ensure Supabase redirect URLs include the local Accounts callback URL.
- For HTTPS testing, use a local TLS proxy and set `COOKIE_SECURE=true`.

## Security Notes
- Validate `returnTo` URLs. Only allow known hosts (see `RETURNTO_ALLOW_HOSTS`).
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the client.
- Avoid logging tokens; keep secrets in environment variables.
- Use middleware matchers to exclude static assets from auth checks.

## Related Docs
- Subdomain SSO PRD: `docs/PRD-Subdomain-SSO.md`
- App integration flow: `docs/specs/08_app_auth_integration_flow.md`
- Common auth package install: `docs/AGENT-INSTALL-COMMON-AUTH.md`
- Local SSO setup: `docs/LOCAL-DEV-SSO.md`

