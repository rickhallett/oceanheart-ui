# PRD: Complete Supabase Authentication Removal

## Summary
Remove all Supabase authentication-related code, dependencies, and configuration from the oceanheart-ui codebase without breaking existing functionality. This includes safely disconnecting from Supabase Auth, removing authentication middleware, and preparing the codebase for a new authentication system implementation.

## Objectives
- **Complete Disconnection**: Remove all Supabase authentication dependencies and code
- **Zero Breakage**: Maintain application functionality during and after removal
- **Clean State**: Prepare codebase for new authentication system integration
- **Preserve Data**: Maintain non-authentication Supabase functionality if needed
- **Safe Transition**: Implement temporary authentication stubs to prevent application crashes

## Current Authentication Integration Analysis

### Core Supabase Dependencies
**Package Dependencies to Remove:**
```json
{
  "@supabase/ssr": "^0.4.1",
  "@supabase/supabase-js": "^2.48.1",
  "supabase": "^2.39.2"
}
```

### Files Requiring Complete Removal

#### 1. Core Authentication Files
```
libs/supabase/
├── client.ts                    # Browser Supabase client
├── server.ts                    # SSR Supabase client with cookie management
└── middleware.ts                # Supabase middleware (if exists)

packages/common-auth/
├── src/
│   ├── requireAuth.ts          # Auth middleware for subdomains
│   ├── ssrClient.ts           # Supabase SSR client wrapper
│   ├── withEntitlement.ts     # Entitlement checking
│   └── middlewareClient.ts    # Middleware client
├── package.json               # Package definition
└── README.md                  # Documentation
```

#### 2. Application Authentication Integration
```
components/
├── AuthButton.tsx             # Main authentication button component
├── ButtonSignin.tsx           # Sign-in button
├── ButtonCheckout.tsx         # Checkout with auth (partial removal)
├── ButtonAccount.tsx          # Account management button
└── LayoutClient.tsx           # Client-side layout with auth

app/
├── signin/page.tsx           # Sign-in page
├── auth/callback/route.ts    # OAuth callback route
├── logout/route.ts           # Logout route
├── dashboard/
│   ├── page.tsx             # Protected dashboard (auth removal)
│   └── layout.tsx           # Dashboard layout with auth
└── api/
    └── auth/
        ├── callback/route.ts # API auth callback
        └── saigo-callback/route.ts # Saigo-specific auth

apps/accounts/
├── app/(auth)/signin/page.tsx
└── app/auth/callback/route.ts

apps/flowstate/
└── middleware.ts             # Subdomain auth middleware
```

#### 3. API Routes with Authentication
```
app/api/
├── stripe/
│   ├── create-checkout/route.ts  # Auth-protected Stripe routes
│   └── create-portal/route.ts   # Customer portal access
├── webhook/stripe/route.ts      # Stripe webhooks (user lookup)
├── saigo/                       # Saigo API routes (all auth-protected)
│   ├── username/route.ts
│   ├── practice/route.ts
│   ├── leaderboard/route.ts
│   └── instagram/
└── lead/route.ts               # Lead generation (may have auth)
```

### Configuration Files Requiring Updates

#### 1. Environment Variables to Remove
```bash
# From .env.local.example and production configs
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Keep these for new auth system
COOKIE_DOMAIN=
NEXT_PUBLIC_SITE_URL=
RETURNTO_ALLOW_HOSTS=
```

#### 2. Configuration Updates
```typescript
// config.ts - Remove auth-specific configs
auth: {
  loginUrl: "/signin",        # Keep for new system
  callbackUrl: "",           # Update for new system
}
```

## Removal Strategy

### Phase 1: Dependency Analysis & Backup (0.5 days)

#### 1.1 Create Safety Backup
```bash
# Create feature branch for removal
git checkout -b remove-supabase-auth
git push -u origin remove-supabase-auth

# Create full backup
cp -r . ../oceanheart-ui-backup-$(date +%Y%m%d)
```

#### 1.2 Identify Non-Auth Supabase Usage
```bash
# Search for non-auth Supabase usage (database operations)
grep -r "supabase\.from\|\.select\|\.insert\|\.update\|\.delete" --include="*.ts" --include="*.tsx" app/
```

### Phase 2: Authentication Stub Implementation (1 day)

#### 2.1 Create Authentication Stubs
```typescript
// libs/auth/stubs.ts
export interface AuthUser {
  id: string
  email: string
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

export interface AuthResponse {
  data: { user: AuthUser | null }
  error: null
}

export class AuthStub {
  async getUser(): Promise<AuthResponse> {
    return { 
      data: { user: null }, 
      error: null 
    }
  }

  async signOut(): Promise<void> {
    // Stub implementation - redirect to sign-in
    if (typeof window !== 'undefined') {
      window.location.href = '/signin'
    }
  }
}

export const createAuthClient = () => new AuthStub()
```

#### 2.2 Replace Core Authentication Components
```typescript
// components/AuthButton.tsx (stubbed version)
"use client"
import Link from "next/link"
import config from "@/config"

export default function AuthButton({ 
  mode = "signin",
  text = "Get started",
  extraStyle = ""
}) {
  // Always show sign-in state (no user)
  return (
    <Link 
      className={`btn ${extraStyle}`}
      href={config.auth.loginUrl}
    >
      {text}
    </Link>
  )
}
```

#### 2.3 Create Temporary Sign-in Page
```typescript
// app/signin/page.tsx (temporary)
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title justify-center">Authentication Temporarily Disabled</h2>
          <p>New authentication system coming soon.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" disabled>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Phase 3: Systematic File Removal (1.5 days)

#### 3.1 Remove Core Supabase Files
```bash
# Remove Supabase client libraries
rm -rf libs/supabase/
rm -rf packages/common-auth/

# Remove authentication API routes
rm -rf app/auth/
rm -rf apps/accounts/app/auth/
rm -rf apps/accounts/app/(auth)/
rm app/logout/route.ts
rm app/api/auth/
```

#### 3.2 Update Package Dependencies
```json
// package.json - Remove dependencies
{
  "dependencies": {
    // Remove these:
    // "@supabase/ssr": "^0.4.1",
    // "@supabase/supabase-js": "^2.48.1",
    // "supabase": "^2.39.2"
  }
}
```

#### 3.3 Clean Import Statements
```bash
# Find and remove Supabase imports
grep -r "@supabase\|supabase" --include="*.ts" --include="*.tsx" . | \
  grep "import\|require" > supabase_imports.txt

# Manual cleanup required for each file
```

### Phase 4: API Route Updates (1 day)

#### 4.1 Update Protected API Routes
```typescript
// app/api/stripe/create-checkout/route.ts
export async function POST(req: Request) {
  // Remove: const supabase = createClient()
  // Remove: const { data: { user } } = await supabase.auth.getUser()
  
  // Temporary: Return unauthorized for protected routes
  return new Response(
    JSON.stringify({ error: "Authentication temporarily disabled" }),
    { status: 401, headers: { 'Content-Type': 'application/json' } }
  )
}
```

#### 4.2 Update Stripe Webhook
```typescript
// app/api/webhook/stripe/route.ts
export async function POST(req: Request) {
  // Remove Supabase user lookup
  // Keep Stripe webhook processing for payments
  // Remove user-related operations temporarily
  
  return new Response('OK')
}
```

#### 4.3 Remove/Archive Saigo Routes
```bash
# Archive Saigo routes (auth-dependent)
mkdir archived/saigo-api
mv app/api/saigo/ archived/saigo-api/
mv app/saigo/ archived/saigo-app/
```

### Phase 5: Component Updates (1 day)

#### 5.1 Update Dashboard Components
```typescript
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Please sign in to access your dashboard.</p>
        <a href="/signin" className="btn btn-primary mt-4">
          Sign In
        </a>
      </div>
    </div>
  )
}
```

#### 5.2 Remove Middleware Protection
```typescript
// Remove or comment out middleware.ts files
// apps/flowstate/middleware.ts -> archived/flowstate-middleware.ts
mv apps/flowstate/middleware.ts archived/flowstate-middleware.ts
```

#### 5.3 Update Layout Components
```typescript
// components/LayoutClient.tsx
export default function LayoutClient({ children }: { children: React.ReactNode }) {
  // Remove Supabase auth context
  // Keep basic layout structure
  return <>{children}</>
}
```

### Phase 6: Environment & Configuration Cleanup (0.5 days)

#### 6.1 Update Environment Files
```bash
# .env.local.example
# Remove:
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=

# Keep:
COOKIE_DOMAIN=.lvh.me
NEXT_PUBLIC_SITE_URL=http://oceanheart.lvh.me:3002
RETURNTO_ALLOW_HOSTS=oceanheart.lvh.me:3002,flowstate.lvh.me:3001
```

#### 6.2 Update Configuration
```typescript
// config.ts
const config = {
  // ... other config
  auth: {
    loginUrl: "/signin",
    callbackUrl: "/dashboard", // Update when new auth is ready
  }
}
```

### Phase 7: Testing & Verification (1 day)

#### 7.1 Build Verification
```bash
# Ensure application builds without Supabase
bun install
bun build

# Check for TypeScript errors
bun lint
```

#### 7.2 Runtime Testing
```bash
# Start development server
bun dev

# Test critical paths:
# - Home page loads
# - Sign-in page shows temp message
# - Protected routes show appropriate messages
# - No console errors related to Supabase
```

#### 7.3 Subdomain Testing
```bash
# Test flowstate subdomain (if applicable)
# Ensure no authentication middleware crashes
```

## Safe Removal Checklist

### Pre-Removal Safety
- [ ] Create feature branch for all changes
- [ ] Create full codebase backup
- [ ] Document current authentication flows
- [ ] Identify all Supabase usage (auth vs database)
- [ ] Create authentication stubs for critical components

### Core Removal Tasks
- [ ] Remove `@supabase/ssr`, `@supabase/supabase-js`, `supabase` from package.json
- [ ] Delete `libs/supabase/` directory
- [ ] Delete `packages/common-auth/` directory
- [ ] Archive/remove authentication API routes
- [ ] Remove Supabase imports from all components
- [ ] Update or stub protected API routes
- [ ] Replace authentication components with stubs
- [ ] Remove/archive Saigo authentication-dependent features

### Configuration Updates
- [ ] Remove Supabase environment variables
- [ ] Update config.ts authentication settings
- [ ] Clean up middleware.ts files
- [ ] Update deployment configurations

### Testing & Verification
- [ ] Application builds successfully
- [ ] No TypeScript/ESLint errors
- [ ] Home page loads without authentication
- [ ] Protected routes show appropriate temporary messages
- [ ] No runtime errors in browser console
- [ ] Subdomain applications handle missing auth gracefully

### Post-Removal Cleanup
- [ ] Remove unused import statements
- [ ] Clean up component prop types related to User
- [ ] Update documentation to reflect removal
- [ ] Prepare for new authentication system integration

## Rollback Strategy

If issues arise during removal:

#### 1. Immediate Rollback
```bash
git checkout main
git branch -D remove-supabase-auth
```

#### 2. Partial Rollback (per file)
```bash
git checkout HEAD~1 -- path/to/file.ts
```

#### 3. Restore from Backup
```bash
cp -r ../oceanheart-ui-backup-YYYYMMDD/* .
```

## Success Criteria

- [ ] Application builds and runs without Supabase authentication dependencies
- [ ] All pages load without authentication-related runtime errors
- [ ] Protected routes show appropriate temporary messages instead of crashing
- [ ] No Supabase authentication imports remain in codebase
- [ ] Package.json contains no Supabase authentication dependencies
- [ ] Environment variables are cleaned of Supabase auth configuration
- [ ] Codebase is prepared for new authentication system integration

## Timeline

**Total Duration: 5.5 days**

- **Day 1**: Dependency analysis, backup creation, and stub implementation
- **Day 2**: Core file removal and package cleanup
- **Day 3**: API route updates and Saigo archival
- **Day 4**: Component updates and layout modifications
- **Day 5**: Environment cleanup and configuration updates
- **Day 5.5**: Comprehensive testing and verification

## Risk Mitigation

1. **Feature Branch Development**: All changes in isolated branch
2. **Comprehensive Backup**: Full codebase backup before starting
3. **Gradual Removal**: Remove components systematically, not all at once
4. **Stub Implementation**: Replace auth components with working stubs
5. **Continuous Testing**: Test application functionality after each phase
6. **Clear Rollback Plan**: Multiple rollback options available

## Post-Removal State

After successful removal:
- ✅ Application runs without authentication
- ✅ No Supabase authentication dependencies
- ✅ Clean foundation for new authentication system
- ✅ Preserved non-authentication functionality
- ✅ Clear separation between auth and business logic
- ✅ Documented removal process for future reference

This removal process ensures a clean disconnection from Supabase authentication while maintaining application stability and preparing for the new authentication system implementation.