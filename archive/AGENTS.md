# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, API routes.
- `components/`: Reusable React components (PascalCase, one component per file).
- `libs/` and `lib/`: Utilities, API clients, and helpers.
- `hooks/`: Reusable React hooks (useX naming).
- `types/`: Shared TypeScript types and schemas.
- `public/`: Static assets served as-is.
- `docs/`: Project docs and ADRs; see README for architecture link.
- Root configs: `next.config.js`, `tailwind.config.js`, `.eslintrc.json`, `tsconfig.json`, `bunfig.toml`, `config.ts`.

## Build, Test, and Development Commands
- `bun dev`: Start dev server (Next.js) on port 4444.
- `bun run build`: Production build via `next build`.
- `bun run start`: Start built app with `next start`.
- `bun run lint`: Lint with Next + ESLint.
- Env: copy `.env.local.example` (or `.env.prod.example`) to `.env.local` and fill values. Never commit secrets.

## Coding Style & Naming Conventions
- Language: TypeScript; prefer explicit types and `zod` for runtime validation.
- Indentation: 2 spaces, semicolons required, single quotes.
- React: Components in `components/` use PascalCase (`FeatureCard.tsx`); hooks use `useX`; server-only code stays in route handlers or clearly marked modules.
- Paths: Use `@/*` alias from repo root.
- Linting: ESLint with `next/core-web-vitals`; fix warnings before PR. Tailwind utility-first styles; keep class lists readable.

## Testing Guidelines
- Libraries installed: Testing Library (`@testing-library/react`, `@testing-library/jest-dom`).
- Conventions: colocate as `Component.test.tsx` or under `__tests__/` mirroring `app/` or `components/`.
- Render components with Testing Library; avoid snapshot-only tests.
- Note: No test script yet; if adding, prefer `bun run test` with Jest/Vitest and include coverage threshold.

## Commit & Pull Request Guidelines
- Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`; optional scope `feat(portfolio): ...`.
- PRs must include: concise description, linked issue (e.g., `Closes #123`), screenshots for UI changes, and checklist for env/config updates.
- Keep PRs small and focused; include `bun run lint` output clean.

## Security & Configuration Tips
- Client-visible vars must start with `NEXT_PUBLIC_`.
- Remote images require allowlisting in `next.config.js` (`images.domains`).
- For SSO, ensure `NEXT_PUBLIC_SITE_URL` and cookie domains match environment as documented in README.
