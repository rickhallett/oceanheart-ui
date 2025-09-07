# common-auth (scaffold)

Shared authentication utilities for subdomain SSO using Supabase SSR and Next.js 14.

- Entry points:
  - `src/ssrClient.ts`: SSR client factory with cookie adapter
  - `src/requireAuth.ts`: middleware/route guard redirecting to accounts
  - `src/withEntitlement.ts`: server-side entitlement check
  - `src/returnTo.ts`: allowlist validation for return URLs

This is a scaffold to guide implementation; not wired into the current build.

