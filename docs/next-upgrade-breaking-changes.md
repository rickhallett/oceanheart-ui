# Next.js 15 Breaking Changes Analysis

This document identifies the breaking changes in Next.js 15 that will impact our codebase and outlines the specific modifications needed.

## 1. Async Request APIs

### Files that Need Updates:

#### Supabase Integration:
- **`libs/supabase/server.ts`**
  ```typescript
  // Current implementation:
  const cookieStore = cookies();
  
  // Needs to be updated to:
  const cookieStore = await cookies();
  ```

This change affects our Supabase authentication mechanism, which relies on cookies. Since our Supabase client initialization happens in server components, we need to update this pattern throughout the application.

### Implementation Plan:
1. Update the `createClient` and `createServiceClient` functions in `libs/supabase/server.ts`
2. Test authentication flows thoroughly after the change
3. Verify that server components can still access Supabase correctly

## 2. NextRequest IP Property Removal

### Files that Need Updates:

#### A/B Testing Tracking:
- **`app/api/ab-tracking/route.ts`**
  ```typescript
  // Current implementation:
  ip_hash: hashIp(request.ip || ""),
  
  // Needs to be updated to use the Vercel functions (preferred):
  import { ipAddress } from '@vercel/functions';
  ip_hash: hashIp(ipAddress(request) || ""),
  
  // Or update to a hosting-agnostic alternative:
  ip_hash: hashIp(request.headers.get('x-forwarded-for')?.split(',')[0] || ""),
  ```

### Implementation Plan:
1. Add the Vercel functions package if deployed on Vercel:
   ```bash
   bun add @vercel/functions
   ```
2. Update all API routes that use `request.ip`
3. Test the updated routes to ensure IP-related functionality still works correctly

## 3. Caching Changes

No explicit usage of caching-specific APIs was found in our code, but we should review:

1. Any data fetching that relies on implicit caching
2. API routes that may have been implicitly cached
3. Client-side navigation that may behave differently with the new caching defaults

### Implementation Plan:
1. Identify components that may be affected by cache changes
2. Add explicit cache options to fetch calls:
   ```typescript
   // For data that should be cached:
   const data = await fetch(url, { cache: 'force-cache' });
   
   // For data that should be refreshed:
   const data = await fetch(url, { cache: 'no-store' });
   ```
3. Test data fetching patterns across the application

## 4. React 19 Compatibility

### Dependencies That Need Review:
- `@supabase/ssr` (v0.4.1)
- `framer-motion` (v12.4.10)
- `react-data-table-component` (v7.6.2)
- `next-auth` (v4.24.11)
- `react-hot-toast` (v2.5.2)
- `recharts` (v2.15.1)

### Implementation Plan:
1. Check each dependency's GitHub/npm for React 19 compatibility
2. Identify alternatives for any incompatible dependencies
3. Update dependencies that have React 19 support

## 5. ESLint Configuration

Our current ESLint configuration uses the old format, which may need updating:

### Implementation Plan:
1. Review current `.eslintrc` file
2. Update to ESLint 9 compatibility if needed
3. Consider adopting the new flat configuration format

## 6. React Hooks Updates

We don't currently use `useFormState`, so no updates are needed for the transition to `useActionState`.

## Summary of Changes Required

| Component | Issue | Required Change | Priority |
|-----------|-------|----------------|----------|
| Supabase Integration | Async cookies() API | Update to await cookies() | High |
| A/B Testing | IP property removal | Use @vercel/functions or headers | Medium |
| Data Fetching | Cache defaults | Add explicit cache options | Medium |
| Dependencies | React 19 compat | Update or find alternatives | High |
| ESLint | Configuration | Update to flat config | Low |

## Testing Strategy

After making these changes, we should prioritize testing:

1. **Authentication Flows**:
   - Sign in/sign up
   - Session persistence
   - Protected routes

2. **API Routes**:
   - A/B testing tracking
   - Stripe integrations
   - Webhook handlers

3. **Data Fetching**:
   - Server components
   - Client components
   - Loading states

4. **UI Components**:
   - React 19 compatibility issues
   - Animations and transitions