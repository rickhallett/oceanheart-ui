# Next.js Upgrade Plan: 14.2.25 to Latest

This document outlines our plan for upgrading Oceanheart UI from Next.js 14.2.25 to the latest version. The upgrade will be performed in a phased approach to minimize disruption and ensure stability.

## Current State

- **Current Next.js Version**: 14.2.25
- **Current React Version**: 18.2.0
- **Current React DOM Version**: 18.2.0
- **Current ESLint Config Version**: 15.1.7

## Upgrade Preparation

### Phase 1: Setup and Preparation

1. **Create a new branch for the upgrade:**
   ```bash
   git checkout -b feature/nextjs-upgrade
   ```

2. **Create a backup of the current production build:**
   ```bash
   # Generate a production build
   bun run build
   
   # Archive the .next directory
   tar -czvf next-backup-$(date +%Y%m%d).tar.gz .next
   ```

3. **Document current dependencies and their versions:**
   ```bash
   bun list > pre-upgrade-dependencies.txt
   ```

### Phase 2: Initial Upgrade to Next.js 15

1. **Update core packages:**
   ```bash
   bun add next@15 react@19 react-dom@19 eslint-config-next@latest
   ```

2. **Update TypeScript types:**
   ```bash
   bun add -D @types/react@latest @types/react-dom@latest
   ```

3. **Run the Next.js codemod to automate compatibility changes:**
   ```bash
   npx @next/codemod@latest upgrade
   ```

## Implementation Plan

### Phase 3: Address Breaking Changes

#### Async Request APIs

Update all instances of synchronous APIs to the new asynchronous pattern:

```javascript
// Before
import { cookies } from 'next/headers'
const cookieStore = cookies()
const token = cookieStore.get('token')

// After
import { cookies } from 'next/headers'
const cookieStore = await cookies()
const token = cookieStore.get('token')
```

Files to check:
- `app/api/auth/*/route.ts`
- Any page that accesses headers
- Any component that uses cookies or searchParams

#### Caching Changes

Review and update caching strategies:

1. For fetch requests that need to be cached, add the cache option:
   ```javascript
   // Add caching explicitly
   const data = await fetch('https://api.example.com/data', { cache: 'force-cache' })
   ```

2. For components that need to use cached data, update the fetchCache segment config:
   ```javascript
   export const fetchCache = 'default-cache'
   ```

#### Update React Hooks Usage

1. Replace any usage of `useFormState` with `useActionState`:
   ```javascript
   // Before
   const [state, formAction] = useFormState(action, initialState)
   
   // After
   const [state, formAction] = useActionState(action, initialState)
   ```

2. Update any middleware that uses `geo` or `ip` properties:
   ```javascript
   // Before
   export function middleware(request: NextRequest) {
     const { geo } = request
     // ...
   }
   
   // After (with Vercel)
   import { geolocation, ipAddress } from '@vercel/functions'
   
   export function middleware(request: NextRequest) {
     const geo = geolocation(request)
     const ip = ipAddress(request)
     // ...
   }
   ```

### Phase 4: Testing and Verification

1. **Ensure the development server starts correctly:**
   ```bash
   bun dev
   ```

2. **Run linting to catch any issues:**
   ```bash
   bun lint
   ```

3. **Test all site functionality:**
   - Navigation
   - Authentication
   - Form submissions
   - API endpoints
   - Dynamic routes
   - Server components
   - Client components
   - Static generation

4. **Run build process:**
   ```bash
   bun build
   ```

5. **Verify there are no console errors or warnings**

### Phase 5: Dependency Compatibility

1. **Check for any peer dependency warnings:**
   ```bash
   bun install
   ```

2. **Address specific dependency updates as needed:**

   - Potential updates required:
     - `next-auth`
     - `@supabase/ssr`
     - `@supabase/supabase-js`
     - `framer-motion`
     - `react-data-table-component`
     - `recharts`

3. **Update testing libraries:**
   ```bash
   bun add -D @testing-library/react@latest @testing-library/jest-dom@latest
   ```

## Rollback Plan

If critical issues are encountered during the upgrade, follow these steps:

1. **Restore to the previous branch:**
   ```bash
   git checkout main
   ```

2. **Restore dependencies:**
   ```bash
   bun install
   ```

3. **Restore the backed-up build directory if needed:**
   ```bash
   tar -xzvf next-backup-*.tar.gz
   ```

## Post-Upgrade Tasks

1. **Update documentation to reflect any API changes**

2. **Create a post-upgrade assessment document:**
   - Performance changes
   - Build size changes
   - Any issues encountered and solutions

3. **Share findings with team and document lessons learned**

## Timeline

- **Day 1**: Phases 1 & 2 (Setup and Initial Upgrade)
- **Day 2-3**: Phase 3 (Address Breaking Changes)
- **Day 4**: Phase 4 (Testing and Verification)
- **Day 5**: Phase 5 (Dependency Compatibility)
- **Day 6**: Post-Upgrade Tasks and Final Testing
- **Day 7**: Merge to Staging for Extended Testing
- **Day 10**: Production Deployment (if all tests pass)

## Special Considerations

### App Router Compatibility

Since Oceanheart UI already uses the App Router, the core routing system should remain compatible. However, we should pay special attention to:

1. Server Components vs. Client Components
2. Data fetching patterns
3. Middleware functionality

### Supabase Integration

Verify that the Supabase integration continues to work properly, focusing on:

1. Authentication flows
2. Data fetching
3. Middleware for protected routes

### Stripe Integration

Test the Stripe checkout flow thoroughly, ensuring that:

1. Product/price information is correctly fetched
2. Checkout sessions are properly created
3. Webhooks continue to function as expected

## Resources

- [Official Next.js Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [React 19 Documentation](https://react.dev/blog/2024/10/17/react-19-upgrade-guide)
- [Next.js Release Blog](https://nextjs.org/blog/next-15)