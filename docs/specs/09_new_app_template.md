# New App Template - Quick Setup Guide

## Overview
This template provides step-by-step instructions for rapidly creating new apps integrated with oceanheart-ui authentication, using the proven flowstate pattern.

## Quick Start (5-minute setup)

### Step 1: Create App Directory Structure
```bash
# From oceanheart-ui root:
mkdir -p apps/{NEW_APP_NAME}/{app/no-access}
cd apps/{NEW_APP_NAME}
```

### Step 2: Copy Core Files from Flowstate Template
```bash
# Copy middleware and environment template
cp ../flowstate/middleware.ts .
cp ../flowstate/.env.example .
cp ../flowstate/README.md .
```

### Step 3: Create Basic App Structure
```bash
# Create no-access page
cat > app/no-access/page.tsx << 'EOF'
export default function NoAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-base-content mb-4">Access Required</h1>
        <p className="text-base-content/70 mb-6">
          You need access permissions to use {NEW_APP_NAME}.
        </p>
        <a 
          href="https://oceanheart.ai/pricing" 
          className="btn btn-primary"
        >
          Get Access
        </a>
      </div>
    </div>
  )
}
EOF
```

### Step 4: Configure Middleware
```bash
# Update middleware.ts with your app slug
sed -i 's/flowstate/{NEW_APP_NAME}/g' middleware.ts
```

### Step 5: Update Environment Configuration
```bash
# Update .env.example with your app details
sed -i 's/flowstate/{NEW_APP_NAME}/g' .env.example
sed -i 's/:3001/:300X/g' .env.example  # Replace X with next available port
```

### Step 6: Create README
```bash
cat > README.md << 'EOF'
# {NEW_APP_NAME} App

Brief description of what this app does.

## Local Development

```bash
# Set up environment
cp .env.example .env.local
# Update values in .env.local

# Run development server
cd ../../  # Back to oceanheart-ui root
bun dev
```

## Access
- Local: http://{NEW_APP_NAME}.lvh.me:300X
- Production: https://{NEW_APP_NAME}.oceanheart.ai

## Dependencies
- Inherits all dependencies from oceanheart-ui parent
- Uses common-auth package for authentication flow
EOF
```

## Detailed Template Files

### 1. Middleware Template (`middleware.ts`)
```typescript
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { requireAuth } from '../../packages/common-auth/src/requireAuth'
import { withEntitlement } from '../../packages/common-auth/src/withEntitlement'

export async function middleware(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { res, user } = auth
  const allowed = await withEntitlement('{APP_SLUG}', user.id)
  if (!allowed) {
    return NextResponse.redirect(new URL('/no-access', req.url), { headers: res.headers })
  }
  return res
}

export const config = {
  matcher: ['/((?!_next|public|favicon.ico).*)'],
}
```

### 2. Environment Template (`.env.example`)
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Cross-domain auth cookies
COOKIE_DOMAIN=.oceanheart.ai  # Production
# COOKIE_DOMAIN=.lvh.me      # Local development

# App-specific configuration
NEXT_PUBLIC_SITE_URL=https://{APP_NAME}.oceanheart.ai
# NEXT_PUBLIC_SITE_URL=http://{APP_NAME}.lvh.me:{PORT}  # Local

# Return URL validation (comma-separated)
RETURNTO_ALLOW_HOSTS=accounts.oceanheart.ai,oceanheart.ai
# RETURNTO_ALLOW_HOSTS=accounts.lvh.me:3000,oceanheart.lvh.me:3002  # Local

# Server-side entitlement checks
SUPABASE_SERVICE_ROLE_KEY=

# Optional: Force secure cookies in HTTPS dev environments
# COOKIE_SECURE=true
```

### 3. No-Access Page Template (`app/no-access/page.tsx`)
```typescript
'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function NoAccessPage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [supabase])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warning/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-warning" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            Access Required
          </h1>
          <p className="text-base-content/70 mb-6">
            You need permission to access {'{APP_DISPLAY_NAME}'}.
          </p>
        </div>

        <div className="space-y-3">
          {user ? (
            <>
              <p className="text-sm text-base-content/60">
                Signed in as: {user.email}
              </p>
              <div className="space-y-2">
                <a 
                  href="https://oceanheart.ai/upgrade" 
                  className="btn btn-primary w-full"
                >
                  Upgrade Account
                </a>
                <a 
                  href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://accounts.oceanheart.ai'}/logout?returnTo=${encodeURIComponent(window.location.origin)}`}
                  className="btn btn-ghost btn-sm"
                >
                  Sign out
                </a>
              </div>
            </>
          ) : (
            <a 
              href={`https://accounts.oceanheart.ai/signin?returnTo=${encodeURIComponent(window.location.href)}`}
              className="btn btn-primary w-full"
            >
              Sign In
            </a>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-base-300">
          <a 
            href="https://oceanheart.ai" 
            className="text-sm text-base-content/60 hover:text-base-content"
          >
            ← Back to Oceanheart
          </a>
        </div>
      </div>
    </div>
  )
}
```

### 4. Basic App Layout (`app/layout.tsx`)
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '{APP_DISPLAY_NAME}',
  description: 'Brief description of your app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="oceanheart">
      <body>{children}</body>
    </html>
  )
}
```

### 5. Main App Page (`app/page.tsx`)
```typescript
'use client'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [supabase])

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-base-content mb-2">
            {'{APP_DISPLAY_NAME}'}
          </h1>
          {user && (
            <p className="text-base-content/70">
              Welcome, {user.email}
            </p>
          )}
        </header>

        <main>
          {/* Your app content here */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Getting Started</h2>
              <p>This is your authenticated app. Build something amazing!</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
```

## Database Setup

### Add User Entitlements
```sql
-- Grant access to specific users
INSERT INTO user_entitlements (user_id, app_slug, expires_at)
VALUES 
  ('user-uuid-here', '{APP_SLUG}', NULL), -- Permanent access
  ('user-uuid-here', '{APP_SLUG}', '2024-12-31 23:59:59'); -- Time-limited access

-- Or create via Supabase dashboard/API
```

## Deployment Configuration

### 1. Subdomain Setup
- Configure DNS: `{APP_NAME}.oceanheart.ai` → Your deployment platform
- Update CDN/proxy settings for subdomain routing
- Ensure SSL certificates cover subdomain

### 2. Environment Variables (Production)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
COOKIE_DOMAIN=.oceanheart.ai
NEXT_PUBLIC_SITE_URL=https://{APP_NAME}.oceanheart.ai
RETURNTO_ALLOW_HOSTS=accounts.oceanheart.ai,oceanheart.ai
```

### 3. Local Development Ports
Assign sequential ports to avoid conflicts:
- accounts: 3000
- flowstate: 3001  
- {NEW_APP}: 3002, 3003, etc.

## Advanced Features

### API Routes with Auth
```typescript
// app/api/data/route.ts
import { NextRequest } from 'next/server'
import { requireAuth } from '../../../packages/common-auth/src/requireAuth'

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { user } = auth
  
  // Your API logic here
  return Response.json({ user_id: user.id })
}
```

### Custom Entitlement Checks
```typescript
// lib/useEntitlement.ts
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function useEntitlement(appSlug: string) {
  const [hasAccess, setHasAccess] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function checkEntitlement() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Check entitlement via API call
      const response = await fetch(`/api/check-entitlement?app=${appSlug}`)
      const { allowed } = await response.json()
      setHasAccess(allowed)
    }

    checkEntitlement()
  }, [appSlug, supabase])

  return hasAccess
}
```

This template provides everything needed to rapidly spin up new authenticated apps within the oceanheart ecosystem. The pattern scales well and maintains security while enabling fast development iteration.