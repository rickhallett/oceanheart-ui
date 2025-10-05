# Next.js 15 Upgrade Checklist

This is a comprehensive checklist for upgrading Oceanheart UI from Next.js 14.2.25 to Next.js 15.

## Pre-Upgrade Tasks

- [ ] Create a new git branch `feature/nextjs-upgrade`
- [ ] Backup the current production build
- [ ] Document current dependency versions
- [ ] Review current ESLint configuration
- [ ] Create snapshot of current performance metrics

## Core Upgrade Tasks

- [ ] Update Next.js, React, and React DOM:
  ```bash
  bun add next@latest react@latest react-dom@latest
  ```

- [ ] Update TypeScript types:
  ```bash
  bun add -D @types/react@latest @types/react-dom@latest
  ```

- [ ] Run the Next.js codemod to automate compatibility changes:
  ```bash
  npx @next/codemod@latest upgrade
  ```

- [ ] Fix any errors that appear in the console after running the upgrade

## Breaking Changes Fixes

### Async Request APIs

- [ ] Update `libs/supabase/server.ts`:
  ```typescript
  // Change from:
  const cookieStore = cookies();
  // To:
  const cookieStore = await cookies();
  ```

- [ ] Check other locations that may use cookies, headers, or searchParams APIs

### IP Property Removal

- [ ] Update `app/api/ab-tracking/route.ts`:
  ```typescript
  // Change from:
  ip_hash: hashIp(request.ip || ""),
  // To (if using Vercel):
  import { ipAddress } from '@vercel/functions';
  ip_hash: hashIp(ipAddress(request) || ""),
  // Or (platform agnostic):
  ip_hash: hashIp(request.headers.get('x-forwarded-for')?.split(',')[0] || ""),
  ```

- [ ] Check other API routes that may use the `ip` property

### Caching Changes

- [ ] Review data fetching across the application
- [ ] Add explicit cache options where needed:
  ```typescript
  // For data that should be cached:
  const data = await fetch(url, { cache: 'force-cache' });
  ```

## Dependencies Update

### Required Updates

- [ ] Update ESLint configuration:
  ```bash
  bun add -D eslint-config-next@latest
  ```

### Potential Issues

- [ ] Install framer-motion with force flag if needed:
  ```bash
  bun add framer-motion --force
  ```

- [ ] Check and update other dependencies with potential React 19 compatibility issues:
  - [ ] react-data-table-component
  - [ ] recharts
  - [ ] react-hot-toast

## Testing Tasks

- [ ] Verify development server starts correctly:
  ```bash
  bun dev
  ```

- [ ] Run linting:
  ```bash
  bun lint
  ```

- [ ] Check for console errors and warnings

- [ ] Test critical functionality:
  - [ ] Authentication flows
  - [ ] Navigation
  - [ ] Forms and data submission
  - [ ] Animations and transitions
  - [ ] Data fetching and display

- [ ] Verify production build completes:
  ```bash
  bun build
  ```

- [ ] Test production build locally:
  ```bash
  bun start
  ```

## Performance Verification

- [ ] Compare build sizes before and after upgrade
- [ ] Check page load times
- [ ] Verify Lighthouse scores
- [ ] Review Vercel analytics (if available)

## Final Steps

- [ ] Update documentation to reflect any API changes
- [ ] Create a summary of the upgrade process
- [ ] Draft release notes
- [ ] Deploy to staging environment
- [ ] Conduct final testing in staging
- [ ] Plan production deployment

## Rollback Plan

If critical issues are encountered:

- [ ] Revert to the main branch
- [ ] Restore dependencies
- [ ] Document specific issues for future resolution