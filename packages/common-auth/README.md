# common-auth (scaffold)

Shared authentication utilities for subdomain SSO using Supabase SSR and Next.js 14.

- Entry points:
  - `src/ssrClient.ts`: SSR client factory with cookie adapter
  - `src/requireAuth.ts`: middleware/route guard redirecting to accounts
  - `src/withEntitlement.ts`: server-side entitlement check
  - `src/returnTo.ts`: allowlist validation for return URLs
  - `src/middlewareClient.ts`: optional wrapper for `@supabase/auth-helpers-nextjs`

This is a scaffold to guide implementation; not wired into the current build by default.

Notes
- Cookies: `secure` is on in production only. For local dev without HTTPS, cookies fall back to non-secure; prefer HTTPS locally if possible.
- Consider publishing this package privately and importing by name rather than relative paths.

Publishing
- Build: `npm run build` (emits `dist/`)
- npm (private scoped):
  - Ensure you have an npm token: `npm login`
  - Optional: set auth token via `.npmrc` (see `.npmrc.example`)
  - Publish: `npm publish --access=restricted`
- GitHub Packages:
  - Set `.npmrc` as in `.npmrc.example` with a GitHub token (packages:write)
  - Publish: `npm publish --registry=https://npm.pkg.github.com/`

Consumers
- Install: `npm i @oceanheart/common-auth` (configure registry if using GitHub Packages)
- Peer deps required in apps: `next`, `@supabase/ssr` (and optionally `@supabase/auth-helpers-nextjs`)
