# Repository Guidelines

## Project Structure & Modules
- `app/`: Next.js App Router pages and API routes (`app/api/*/route.ts`).
- `components/`: Reusable UI (PascalCase files, one component per file).
- `hooks/`: Custom hooks (camelCase, prefixed with `use`; see `hooks/useForm.ts`).
- `libs/` and `lib/`: Service clients and utilities (Supabase, Stripe, helpers).
- `public/`: Static assets. `types/`: Shared TypeScript types.
- `scripts/` and `bin/`: Dev/ops scripts and small CLIs.
- Tests: colocated `*.test.ts(x)` (e.g., `hooks/useForm.test.ts`). E2E: Cypress when present (`cypress/e2e`).

## Build, Test, and Dev Commands
- Install: `bun install`
- Develop: `bun dev` (runs Next.js at `http://localhost:3000`)
- Lint: `bun run lint` (Next.js ESLint config)
- Test (unit/components): `bun run test` (preloads `jest.setup.ts`)
- Build: `bun run build` (triggers `next build` + `postbuild` sitemap)
- Start prod: `bun start`
- Cypress: `bunx cypress open` (interactive) or `bunx cypress run`

## Coding Style & Naming
- Language: TypeScript with React 18 and Next.js 14.
- Indentation: 2 spaces; prefer functional, stateless components where possible.
- Files: Pages use `app/**/page.tsx` and optional `layout.tsx`; API in `app/api/**/route.ts`.
- Components: PascalCase (`components/Hero.tsx`). Hooks: camelCase (`hooks/useForm.ts`).
- Styling: Tailwind CSS utilities; avoid inline styles; keep variants via classnames.
- Linting: Extends `next/core-web-vitals`; fix warnings before PR.

## Testing Guidelines
- Unit/Component: React Testing Library; colocate as `*.test.tsx`/`*.test.ts`.
- DOM matchers via `@testing-library/jest-dom` in `jest.setup.ts`.
- Aim to cover critical hooks, components, and API route logic. Prefer deterministic tests.
- E2E: Cypress specs under `cypress/e2e` (when added). Use stable selectors (`data-testid`).

## Commits & Pull Requests
- Commit style: short imperative with type prefix used in history: `FEAT`, `FIX`, `REFACTOR`, `ENHANCE` (e.g., `FIX: Prevent carousel flicker`).
- PRs must include: scope/intent, before/after screenshots for UI, test plan (`bun test`, manual steps), related issues (`Closes #123`), and risk/rollback notes.

## Security & Config
- Secrets in `.env.local`; never commit. Request required keys from maintainers. Review `config.ts` and `middleware.ts` for auth/edge behavior.
- See `ARCHITECTURE.md` for deeper context before large changes.
- Subdomain SSO: see `docs/PRD-Subdomain-SSO.md`; use `packages/common-auth` helpers and set `COOKIE_DOMAIN`.
