# Publishing @oceanheart/common-auth

This package contains shared SSR auth utilities for subdomain SSO. You can publish it privately to either npm or GitHub Packages.

Prereqs
- Node.js + npm
- Accounts on npm and/or GitHub with appropriate tokens

Build
- cd packages/common-auth
- npm run build (outputs `dist/`)

Option A: npm (private scoped)
- npm login
- npm publish --access=restricted

Option B: GitHub Packages
- Create a Personal Access Token with `write:packages` scope
- Create `.npmrc` based on `packages/common-auth/.npmrc.example`
- npm publish --registry=https://npm.pkg.github.com/

Consumers
- npm i @oceanheart/common-auth
- Ensure peer dependencies are installed in the consuming app:
  - next >= 13.4
  - @supabase/ssr >= 0.1.0
  - @supabase/auth-helpers-nextjs (optional; used only if you call middleware helper)

Versioning
- Bump `version` in `packages/common-auth/package.json`
- Prepublish builds automatically via `prepublishOnly`

