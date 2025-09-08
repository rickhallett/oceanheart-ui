# App Integration with Oceanheart-UI Auth Flow

## Overview

This specification documents the authentication and integration flow between @oceanheart-ui/ (the main auth system) and integrated apps like @flowstate/. This serves as a template for rapidly building new apps with fully integrated oceanheart-ui accounts.

## Architecture Summary

The system uses a **centralized auth with subdomain-based app distribution** pattern:

- **accounts.oceanheart.ai** (or accounts.lvh.me:3000 locally) - Central authentication hub
- **flowstate.oceanheart.ai** (or flowstate.lvh.me:3001 locally) - Example integrated app
- **oceanheart.ai** (or oceanheart.lvh.me:3002 locally) - Main platform

## Authentication Flow

### 1. Initial Access Attempt
```
User accesses: flowstate.oceanheart.ai
↓
App middleware checks for auth session
↓ (if no auth)
Redirect to: accounts.oceanheart.ai/signin?returnTo=flowstate.oceanheart.ai
```

### 2. Authentication Process
```
User completes auth on accounts.oceanheart.ai
↓
Supabase creates session with cross-domain cookies (.oceanheart.ai)
↓
Redirect back to original app with authenticated session
```

### 3. Entitlement Check
```
App middleware validates:
1. User is authenticated (via Supabase session)
2. User has entitlement for specific app (via user_entitlements table)
↓ (if no entitlement)
Redirect to /no-access page
```

## Core Components

### 1. Common Auth Package (`packages/common-auth/`)

**Location**: `/packages/common-auth/src/`

#### Key Files:
- `requireAuth.ts` - Validates user session, redirects to auth if needed
- `withEntitlement.ts` - Checks app-specific user permissions
- `ssrClient.ts` - Supabase SSR client with cross-domain cookie support
- `returnTo.ts` - Validates allowed return URLs for security

#### Functions:
```typescript
// Check if user is authenticated
requireAuth(req: NextRequest) → { res, user } | NextResponse (redirect)

// Check app entitlements
withEntitlement(appSlug: string, userId: string) → boolean

// Build sign-in URL with return path
buildSignInURL(returnTo: URL) → URL
```

### 2. App-Level Integration

#### Middleware Pattern (`apps/{appname}/middleware.ts`):
```typescript
import { requireAuth } from '../../packages/common-auth/src/requireAuth'
import { withEntitlement } from '../../packages/common-auth/src/withEntitlement'

export async function middleware(req: NextRequest) {
  // 1. Check authentication
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth

  // 2. Check entitlements
  const { res, user } = auth
  const allowed = await withEntitlement('appname', user.id)
  if (!allowed) {
    return NextResponse.redirect(new URL('/no-access', req.url), { headers: res.headers })
  }
  
  return res
}
```

### 3. Environment Configuration

#### App-Specific Environment (`.env.example`):
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
COOKIE_DOMAIN=.oceanheart.ai  # Enables cross-subdomain cookies
NEXT_PUBLIC_SITE_URL=https://appname.oceanheart.ai
RETURNTO_ALLOW_HOSTS=accounts.oceanheart.ai,oceanheart.ai
SUPABASE_SERVICE_ROLE_KEY=  # For entitlement checks
```

#### Local Development:
```bash
COOKIE_DOMAIN=.lvh.me
NEXT_PUBLIC_SITE_URL=http://appname.lvh.me:300X
RETURNTO_ALLOW_HOSTS=accounts.lvh.me:3000,oceanheart.lvh.me:3002
```

### 4. Database Schema

#### User Entitlements Table:
```sql
user_entitlements (
  user_id: uuid (references auth.users)
  app_slug: text (e.g., 'flowstate', 'analytics', etc.)
  expires_at: timestamp (nullable - null means no expiry)
  created_at: timestamp
)
```

## Security Features

### 1. Cross-Domain Cookie Management
- Cookies set with `domain: .oceanheart.ai` for subdomain sharing
- Secure flags enforced in production
- SameSite: 'lax' for cross-origin compatibility

### 2. Return URL Validation
```typescript
// Only allow returns to trusted domains
isAllowedReturnTo(url) {
  return url.host.endsWith('.oceanheart.ai') || ALLOWED_HOSTS.includes(url.host)
}
```

### 3. Middleware Security
- All routes protected by default (matcher: `['/((?!_next|public|favicon.ico).*)']`)
- Service role key used only for server-side entitlement checks
- Authentication state managed by Supabase SSR client

## App Structure Template

### Minimum Required Files:
```
apps/{appname}/
├── middleware.ts          # Auth + entitlement checks
├── .env.example          # Environment template
├── app/
│   └── no-access/
│       └── page.tsx      # Shown when user lacks entitlements
└── README.md            # App-specific documentation
```

### Optional App Features:
```
apps/{appname}/
├── app/
│   ├── (protected)/     # Routes requiring special permissions
│   ├── api/             # App-specific API endpoints
│   └── components/      # App-specific components
└── lib/                 # App-specific utilities
```

## Integration Checklist

For each new app:

### 1. Environment Setup
- [ ] Copy `.env.example` from flowstate template
- [ ] Update `NEXT_PUBLIC_SITE_URL` with app subdomain
- [ ] Set `COOKIE_DOMAIN` for cross-subdomain auth
- [ ] Configure `RETURNTO_ALLOW_HOSTS`

### 2. Middleware Configuration
- [ ] Create `middleware.ts` with auth + entitlement checks
- [ ] Set correct `appSlug` in `withEntitlement()` call
- [ ] Configure route matcher for protected paths

### 3. Database Setup
- [ ] Add app entry to `user_entitlements` table
- [ ] Grant appropriate users entitlements for new app

### 4. Deployment
- [ ] Configure subdomain routing (DNS/CDN)
- [ ] Set production environment variables
- [ ] Test cross-domain auth flow

## Local Development Setup

### 1. Domain Configuration
Use `lvh.me` for local subdomain testing:
```bash
# These resolve to 127.0.0.1 automatically:
accounts.lvh.me:3000  # Auth service
flowstate.lvh.me:3001 # Example app
oceanheart.lvh.me:3002 # Main platform
```

### 2. SSL/HTTPS (Optional)
For HTTPS testing locally, configure `COOKIE_SECURE=true` and use TLS proxy.

### 3. Database
- Use shared Supabase instance across all apps
- Ensure `user_entitlements` table is accessible via service role

## Scaling Considerations

1. **App Isolation**: Each app can have independent deployments while sharing auth
2. **Entitlement Flexibility**: Support time-based and permanent access via `expires_at`
3. **Multi-tenant Support**: Apps can implement their own user segmentation
4. **API Integration**: Apps can share API endpoints via common packages

## Common Patterns

### App-Specific API Routes
```typescript
// apps/{appname}/app/api/data/route.ts
import { requireAuth } from '../../../packages/common-auth/src/requireAuth'

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  
  const { user } = auth
  // App-specific logic...
}
```

### Conditional UI Based on Entitlements
```typescript
// In any app component
import { useUser } from '@supabase/auth-helpers-react'
import { useEntitlement } from '../lib/useEntitlement'  // Custom hook

export function FeatureComponent() {
  const user = useUser()
  const hasAccess = useEntitlement('premium-features', user?.id)
  
  if (!hasAccess) return <UpgradePrompt />
  return <PremiumFeature />
}
```

This integration pattern enables rapid development of new authenticated apps within the oceanheart ecosystem while maintaining centralized user management and security controls.