#!/usr/bin/env node
// Oceanheart-UI App Scaffolder: Create new authenticated apps in the monorepo
// Based on flowstate template with monorepo-specific enhancements
//
// Usage examples:
//   node scripts/create-app.mjs --app-name "Analytics Dashboard" --app-slug analytics
//   node scripts/create-app.mjs --app-name "Task Manager" --app-slug tasks --port 3003
//   node scripts/create-app.mjs --app-name "Chat App" --entitlements enable

import { execSync } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function parseArgs(argv) {
  const out = {}
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i]
    if (k.startsWith('--')) {
      const key = k.slice(2)
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true'
      out[key] = v
    }
  }
  return out
}

function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function getNextAvailablePort(startPort = 3002) {
  const parentDir = path.dirname(process.cwd())
  const usedPorts = new Set([3000, 3001]) // Reserve ports for accounts and oceanheart-ui
  
  try {
    // Check sibling directories and oceanheart-ui/apps for port usage
    const siblingDirs = await fs.readdir(parentDir, { withFileTypes: true })
    const oceanhartAppsDir = path.join(process.cwd(), 'apps')
    
    // Check oceanheart-ui/apps directory
    try {
      const apps = await fs.readdir(oceanhartAppsDir, { withFileTypes: true })
      for (const app of apps) {
        if (!app.isDirectory()) continue
        const envPath = path.join(oceanhartAppsDir, app.name, '.env.example')
        try {
          const envContent = await fs.readFile(envPath, 'utf8')
          const portMatch = envContent.match(/:(\d{4})\b/)
          if (portMatch) {
            usedPorts.add(parseInt(portMatch[1]))
          }
        } catch {
          // File doesn't exist, skip
        }
      }
    } catch {
      // apps directory doesn't exist, skip
    }
    
    // Check sibling directories for apps with .env files
    for (const dir of siblingDirs) {
      if (!dir.isDirectory()) continue
      const envPath = path.join(parentDir, dir.name, '.env.example')
      try {
        const envContent = await fs.readFile(envPath, 'utf8')
        const portMatch = envContent.match(/:(\d{4})\b/)
        if (portMatch) {
          usedPorts.add(parseInt(portMatch[1]))
        }
      } catch {
        // File doesn't exist or not readable, skip
      }
    }
    
    // Find next available port
    let port = startPort
    while (usedPorts.has(port)) {
      port++
    }
    return port
  } catch {
    return startPort
  }
}

async function copyDir(src, dest, { exclude = [] } = {}) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })
  for (const e of entries) {
    const s = path.join(src, e.name)
    const d = path.join(dest, e.name)
    if (exclude.some((p) => s.includes(p))) continue
    if (e.isDirectory()) {
      await copyDir(s, d, { exclude })
    } else if (e.isFile()) {
      const data = await fs.readFile(s)
      await fs.writeFile(d, data)
    }
  }
}

async function replaceInFile(file, replacements) {
  try {
    let txt = await fs.readFile(file, 'utf8')
    for (const [pattern, repl] of replacements) {
      txt = txt.replace(pattern, repl)
    }
    await fs.writeFile(file, txt)
  } catch (e) {
    // ignore binary/unreadable files
  }
}

async function walkAndReplace(root, replacements, { includeExt = ['.ts', '.tsx', '.md', '.json', '.mjs', '.js'], excludeDirs = ['node_modules', '.next', '.git'] } = {}) {
  const entries = await fs.readdir(root, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(root, e.name)
    if (excludeDirs.some((d) => p.includes(path.sep + d + path.sep))) continue
    if (e.isDirectory()) {
      await walkAndReplace(p, replacements, { includeExt, excludeDirs })
    } else if (e.isFile()) {
      if (!includeExt.includes(path.extname(p))) continue
      await replaceInFile(p, replacements)
    }
  }
}

// ---------- Flowstate clone-and-customize helpers (merged) ----------
async function copySSLCerts(dest) {
  const oceanheartUi = path.resolve(path.join(__dirname, '..'))
  const certFiles = ['accounts.lvh.me+1.pem', 'accounts.lvh.me+1-key.pem']
  console.log('Copying SSL certificates...')
  for (const cert of certFiles) {
    try {
      const srcPath = path.join(oceanheartUi, cert)
      const destPath = path.join(dest, cert)
      await fs.copyFile(srcPath, destPath)
      console.log(`✓ Copied ${cert}`)
    } catch (e) {
      console.warn(`⚠ Could not copy ${cert}:`, e.message)
    }
  }
}

async function updateNginxConfig(dest, appSlug, port) {
  const nginxDir = path.join(dest, 'nginx')
  const configFile = path.join(nginxDir, `${appSlug}-local.conf`)
  await fs.mkdir(nginxDir, { recursive: true })
  const sslPort = 3440 + parseInt(port.toString().slice(-1))
  const certPath = path.join(dest, 'accounts.lvh.me+1.pem')
  const keyPath = path.join(dest, 'accounts.lvh.me+1-key.pem')
  const nginxConfig = `## ${appSlug} over HTTPS → http://127.0.0.1:${port}
server {
  listen ${sslPort} ssl http2;
  server_name ${appSlug}.lvh.me;

  ## SSL certificates (copied by clone script)
  ssl_certificate     ${certPath};
  ssl_certificate_key ${keyPath};

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_read_timeout 3600;
    proxy_buffering off;

    proxy_pass http://127.0.0.1:${port};
  }
}`
  await fs.writeFile(configFile, nginxConfig)
  console.log(`✓ Created nginx config: ${configFile}`)
  return configFile
}

async function loadPreflightEnvTemplate() {
  const preflightEnvPath = path.resolve(path.join(__dirname, '..', '..', 'preflight', '.env.local'))
  try {
    const content = await fs.readFile(preflightEnvPath, 'utf8')
    const supabaseUrl = content.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/)?.[1] || ''
    const supabaseAnon = content.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/)?.[1] || ''
    const supabaseService = content.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1] || ''
    return { supabaseUrl, supabaseAnon, supabaseService }
  } catch (e) {
    console.warn('⚠ Could not load preflight .env.local template:', e.message)
    return { supabaseUrl: '', supabaseAnon: '', supabaseService: '' }
  }
}

async function writeLocalEnv(dest, env, appSlug, port) {
  const template = await loadPreflightEnvTemplate()
  const sslPort = 3440 + parseInt(port.toString().slice(-1))
  const lines = [
    '# ===============================================================================',
    `# ${env.appName?.toUpperCase()} APP - OCEANHEART ECOSYSTEM`,
    '# ===============================================================================',
    `# Self-contained Next.js app with Oceanheart authentication integration`,
    `# Ports: HTTP :${port} | HTTPS :${sslPort} (via nginx proxy)`,
    '',
    '# ===============================================================================',
    '# SUPABASE DATABASE & AUTH',
    '# ===============================================================================',
    `NEXT_PUBLIC_SUPABASE_URL=${template.supabaseUrl || env.supabaseUrl || ''}`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=${template.supabaseAnon || env.supabaseAnon || ''}`,
    `SUPABASE_SERVICE_ROLE_KEY=${template.supabaseService || env.supabaseService || ''}`,
    '',
    '# ===============================================================================',
    '# AUTHENTICATION & ACCESS CONTROL',
    '# ===============================================================================',
    '',
    '# --- LOCAL DEVELOPMENT CONFIGURATION ---',
    '# For local dev with HTTPS via nginx proxy',
    `COOKIE_DOMAIN=${env.cookieDomain || ''}`,
    `COOKIE_SECURE=${env.cookieSecure ?? 'true'}`,
    `NEXT_PUBLIC_SITE_URL=https://${appSlug}.lvh.me:${sslPort}`,
    `NEXT_PUBLIC_LOGIN_URL=${(env.accountsBase || '').replace('example.com', 'lvh.me:3443')}/signin`,
    `RETURNTO_ALLOW_HOSTS=accounts.lvh.me:3443,oceanheart.lvh.me:3002`,
    '',
    '# --- PRODUCTION CONFIGURATION (commented for local dev) ---',
    '# Uncomment these for production deployment:',
    `# COOKIE_DOMAIN=${env.cookieDomain || ''}`,
    `# COOKIE_SECURE=true`,
    `# NEXT_PUBLIC_SITE_URL=${env.origin || ''}`,
    `# NEXT_PUBLIC_LOGIN_URL=${(env.accountsBase || '') + '/signin'}`,
    `# RETURNTO_ALLOW_HOSTS=${env.allowHosts || ''}`,
    '',
    '# ===============================================================================',
    '# ENTITLEMENTS & PERMISSIONS',
    '# ===============================================================================',
    '# Set to \'false\' to enable production entitlement checks',
    `ENTITLEMENTS_DISABLED=${env.entitlementsDisabled ?? 'true'}`,
    '',
    '# ===============================================================================',
    '# LOCAL DEVELOPMENT URLS',
    '# ===============================================================================',
    `# HTTP:  http://${appSlug}.lvh.me:${port}`,
    `# HTTPS: https://${appSlug}.lvh.me:${sslPort} (requires nginx setup - see nginx/SETUP.md)`,
    '',
    '# ===============================================================================',
    '# PRODUCTION URLS',
    '# ===============================================================================',
    `# Production: ${env.origin || ''}`,
    '',
  ]
  await fs.writeFile(path.join(dest, '.env.local'), lines.join('\n'))
}

async function writeAccountsEnv(dest, env) {
  const lines = [
    `NEXT_PUBLIC_SUPABASE_URL=${env.supabaseUrl || ''}`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=${env.supabaseAnon || ''}`,
    `SUPABASE_SERVICE_ROLE_KEY=${env.supabaseService || ''}`,
    ``,
    `NEXT_PUBLIC_SITE_URL=${env.accountsBase || ''}`,
    `NEXT_PUBLIC_DEFAULT_RETURN_TO=${(env.origin || '') + '/'}`,
    ``,
    `COOKIE_DOMAIN=${env.cookieDomain || ''}`,
    `COOKIE_SECURE=${env.cookieSecure ?? 'true'}`,
    `RETURNTO_ALLOW_HOSTS=${env.allowHosts || ''}`,
    ``,
    `# Add this to Supabase → Auth → Redirect URLs:`,
    `#   ${env.accountsBase || ''}/auth/callback`,
    ``,
  ]
  await fs.writeFile(path.join(dest, 'accounts.env.local'), lines.join('\n'))
}

async function writeIntegrationDocClone(dest, ctx) {
  const sslPort = 3440 + parseInt(ctx.port.toString().slice(-1))
  const txt = `# ${ctx.appName} - Integration Guide

This app has been scaffolded to work with Oceanheart's centralized authentication system.

## Configuration Summary

- **App name**: ${ctx.appName}
- **App slug**: ${ctx.appSlug}
- **Local port**: ${ctx.port}
- **Local HTTP URL**: http://${ctx.appSlug}.lvh.me:${ctx.port}
- **Local HTTPS URL**: https://${ctx.appSlug}.lvh.me:${sslPort}
- **Production URL**: ${ctx.origin}
- **Cookie domain**: ${ctx.cookieDomain}

## Setup Steps

### 1. Environment Configuration
The \`.env.local\` file has been pre-configured with Supabase credentials from preflight.
Review and update if needed:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

### 2. HTTPS Local Development Setup

#### SSL Certificates
✅ SSL certificates have been copied to this project root:
- \`accounts.lvh.me+1.pem\` (certificate)
- \`accounts.lvh.me+1-key.pem\` (private key)

#### Nginx Configuration
✅ Nginx config created at \`nginx/${ctx.appSlug}-local.conf\`

To enable HTTPS locally:

1. Install nginx (macOS: brew install nginx; Linux: sudo apt install nginx)
2. Include the config in your nginx.conf:
   include ${dest}/nginx/${ctx.appSlug}-local.conf;
3. Restart nginx (macOS: brew services restart nginx; Linux: sudo systemctl restart nginx)
4. Test: https://${ctx.appSlug}.lvh.me:${sslPort}

### 3. Development
\`\`\`bash
bun install
bun run dev
\`\`\`

## Authentication Flow
1. User visits local or production URL
2. Middleware checks for session; redirect to accounts if absent
3. After login, entitlement check runs and grants/denies access

`
  await fs.writeFile(path.join(dest, 'INTEGRATION.md'), txt)
}

async function setupNginxIntegration(dest, appSlug) {
  console.log('\nNginx integration steps:')
  console.log(`- Include ${path.join(dest, 'nginx', `${appSlug}-local.conf`)} in your nginx.conf`)
  console.log('- Restart nginx (brew services restart nginx or systemctl restart nginx)')
}

async function createNoAccessPage(appDir, appName, appSlug) {
  const noAccessDir = path.join(appDir, 'app', 'no-access')
  await fs.mkdir(noAccessDir, { recursive: true })
  
  const pageContent = `'use client'
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
            You need permission to access ${appName}.
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
                  href={\`/logout?returnTo=\${encodeURIComponent(window.location.origin)}\`}
                  className="btn btn-ghost btn-sm"
                >
                  Sign out
                </a>
              </div>
            </>
          ) : (
            <a 
              href={\`https://accounts.oceanheart.ai/signin?returnTo=\${encodeURIComponent(window.location.href)}\`}
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
`
  
  await fs.writeFile(path.join(noAccessDir, 'page.tsx'), pageContent)
}

async function createAppLayout(appDir, appName) {
  const appAppDir = path.join(appDir, 'app')
  await fs.mkdir(appAppDir, { recursive: true })
  
  const layoutContent = `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '${appName}',
  description: '${appName} - powered by Oceanheart',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  )
}
`
  
  await fs.writeFile(path.join(appAppDir, 'layout.tsx'), layoutContent)
  
  // Create globals.css with Tailwind imports
  const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;
`
  
  await fs.writeFile(path.join(appAppDir, 'globals.css'), cssContent)
}

async function createMainPage(appDir, appName) {
  const pageContent = `'use client'
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
            ${appName}
          </h1>
          {user && (
            <p className="text-base-content/70">
              Welcome, {user.email}
            </p>
          )}
        </header>

        <main>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Getting Started</h2>
              <p>This is your authenticated app. Build something amazing!</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
`
  
  await fs.writeFile(path.join(appDir, 'app', 'page.tsx'), pageContent)
}

async function writeAppEnv(appDir, env) {
  const lines = [
    `# Supabase Configuration`,
    `NEXT_PUBLIC_SUPABASE_URL=${env.supabaseUrl || ''}`,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY=${env.supabaseAnon || ''}`,
    `SUPABASE_SERVICE_ROLE_KEY=${env.supabaseService || ''}`,
    ``,
    `# Cross-domain auth cookies`,
    `COOKIE_DOMAIN=${env.cookieDomain || '.oceanheart.ai'}`,
    `COOKIE_SECURE=${env.cookieSecure || 'true'}`,
    ``,
    `# App-specific configuration`,
    `NEXT_PUBLIC_SITE_URL=${env.origin}`,
    ``,
    `# Accounts sign-in URL (used by /signin route)`,
    `NEXT_PUBLIC_LOGIN_URL=${env.accountsUrl || 'https://accounts.oceanheart.ai/signin'}`,
    ``,
    `# Return URL validation (comma-separated)`,
    `RETURNTO_ALLOW_HOSTS=${env.allowHosts}`,
    ``,
    `# Entitlements (set to 'false' to enable production entitlement checks)`,
    `ENTITLEMENTS_DISABLED=${env.entitlementsDisabled}`,
    ``,
    `# Local development (HTTPS via nginx proxy)`,
    `# COOKIE_DOMAIN=.lvh.me`,
    `# NEXT_PUBLIC_SITE_URL=https://${env.appSlug}.lvh.me:${env.httpsPort}`,
    `# NEXT_PUBLIC_LOGIN_URL=https://accounts.lvh.me:3443/signin`,
    `# RETURNTO_ALLOW_HOSTS=accounts.lvh.me:3443,oceanheart.lvh.me:3002`,
    ``,
  ]
  await fs.writeFile(path.join(appDir, '.env.example'), lines.join('\n'))
}

async function writeMiddleware(appDir, appSlug) {
  const middlewareContent = `import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { requireAuth } from './libs/auth/requireAuth'
import { withEntitlement } from './libs/auth/withEntitlement'

export async function middleware(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth

  const { res, user } = auth
  const allowed = await withEntitlement('${appSlug}', user.id)
  if (!allowed) {
    return NextResponse.redirect(new URL('/no-access', req.url), { headers: res.headers })
  }
  return res
}

export const config = {
  matcher: ['/((?!_next|public|favicon.ico).*)'],
}
`
  
  await fs.writeFile(path.join(appDir, 'middleware.ts'), middlewareContent)
}

async function writeReadme(appDir, appName, appSlug, port, httpsPort) {
  const readmeContent = `# ${appName}

${appName} - powered by Oceanheart authentication.

## Quick Start

\`\`\`bash
# 1. Set up environment
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Access the app
# HTTP:  http://${appSlug}.lvh.me:${port}
# HTTPS: https://${appSlug}.lvh.me:${httpsPort} (requires nginx setup)
\`\`\`

## HTTPS Setup (Recommended)

For cross-domain authentication to work properly, HTTPS is recommended:

1. **Follow nginx setup**: See \`nginx/SETUP.md\` for detailed instructions
2. **Quick setup**: If you have mkcert and certificates already:
   \`\`\`bash
   # Copy certificates
   cp ../oceanheart-ui/accounts.lvh.me+1*.pem ./
   
   # Update nginx config paths in nginx/${appSlug}-local.conf
   # Run nginx with the config
   \`\`\`

## Access URLs

- **HTTP**: http://${appSlug}.lvh.me:${port}
- **HTTPS**: https://${appSlug}.lvh.me:${httpsPort} (after nginx setup)
- **Production**: https://${appSlug}.oceanheart.ai

## Features

- ✅ Oceanheart authentication integration
- ✅ Cross-domain cookie support
- ✅ Entitlement-based access control
- ✅ DaisyUI styling
- ✅ TypeScript support

## Database Setup

To enable entitlements in production:

1. Set \`ENTITLEMENTS_DISABLED=false\` in your .env.local
2. Add user entitlements to the database:

\`\`\`sql
INSERT INTO user_entitlements (user_id, app_slug, expires_at)
VALUES 
  ('user-uuid-here', '${appSlug}', NULL); -- Permanent access
\`\`\`

## Project Structure

\`\`\`
${appSlug}/
├── middleware.ts          # Auth + entitlement protection
├── .env.example          # Environment template
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── libs/
│   └── auth/             # Self-contained auth libraries
│       ├── requireAuth.ts    # Authentication middleware
│       ├── ssrClient.ts      # Supabase SSR client
│       ├── withEntitlement.ts # Entitlement checks
│       └── returnTo.ts       # URL validation
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main app page
│   └── no-access/
│       └── page.tsx      # Access denied page
└── README.md            # This file
\`\`\`

## Development

This app includes self-contained authentication libraries in \`libs/auth/\` that provide the same functionality as the oceanheart-ui common-auth package. The app is fully independent and doesn't require the oceanheart-ui repository to run.

For questions or issues, see the main oceanheart-ui documentation or reference the flowstate app.
`
  
  await fs.writeFile(path.join(appDir, 'README.md'), readmeContent)
}

async function writeIntegrationDoc(destDir, ctx) {
  const txt = `# ${ctx.appName} - Integration Guide

This app has been scaffolded to work with Oceanheart's centralized authentication system.

## Configuration Summary

- **App name**: ${ctx.appName}
- **App slug**: ${ctx.appSlug}
- **Local port**: ${ctx.port}
- **Local URL**: http://${ctx.appSlug}.lvh.me:${ctx.port}
- **Production URL**: https://${ctx.appSlug}.oceanheart.ai
- **Cookie domain**: ${ctx.cookieDomain}

## Setup Steps

### 1. Environment Configuration
Edit \`.env.local\` with your Supabase credentials:

\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
\`\`\`

### 2. Supabase Configuration
In your Supabase project dashboard:

- **Site URL**: https://accounts.oceanheart.ai (production)
- **Redirect URLs**: 
  - https://accounts.oceanheart.ai/auth/callback
  - http://accounts.lvh.me:3000/auth/callback (for local dev)

### 3. Database Setup (Production)
To enable entitlement checks, add entries to \`user_entitlements\` table:

\`\`\`sql
INSERT INTO user_entitlements (user_id, app_slug, expires_at)
VALUES 
  ('user-uuid', '${ctx.appSlug}', NULL); -- Permanent access
\`\`\`

Then set \`ENTITLEMENTS_DISABLED=false\` in production environment.

### 4. Local Development
\`\`\`bash
# Install dependencies and start dev server
npm install
npm run dev

# Access your app at:
# http://${ctx.appSlug}.lvh.me:${ctx.port}
\`\`\`

### 5. Production Deployment
- Configure subdomain routing: \`${ctx.appSlug}.oceanheart.ai\`
- Set production environment variables
- Enable SSL certificate for subdomain
- Test cross-domain authentication flow

## Authentication Flow

1. User visits \`${ctx.appSlug}.oceanheart.ai\`
2. Middleware checks for valid session
3. If unauthenticated → redirect to \`accounts.oceanheart.ai/signin\`
4. After successful auth → redirect back with session cookies
5. Middleware validates entitlements for \`${ctx.appSlug}\`
6. Access granted or redirect to \`/no-access\`

## File Structure Created

\`\`\`
${ctx.appSlug}/
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript configuration
├── postcss.config.js     # PostCSS configuration
├── middleware.ts         # Authentication middleware
├── .env.example         # Environment template
├── libs/
│   └── auth/            # Self-contained auth libraries
│       ├── requireAuth.ts    # Authentication functions
│       ├── ssrClient.ts      # Supabase SSR client
│       ├── withEntitlement.ts # Entitlement validation
│       └── returnTo.ts       # URL security validation
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── globals.css      # Global styles with Tailwind
│   ├── page.tsx         # Main application page
│   └── no-access/
│       └── page.tsx     # Access denied page
├── README.md           # App-specific documentation
└── INTEGRATION.md      # This file
\`\`\`

## Next Steps

1. ✅ App structure created
2. ⏳ Fill in Supabase credentials in \`.env.local\`
3. ⏳ Test authentication flow locally
4. ⏳ Customize app UI and functionality
5. ⏳ Set up production environment and deployment
6. ⏳ Configure user entitlements for production

Need help? Check the main oceanheart-ui documentation (../oceanheart-ui/README.md) or the existing flowstate app for reference patterns.
`
  
  await fs.writeFile(path.join(destDir, 'INTEGRATION.md'), txt)
}

// ---------- Flowstate clone-and-customize main (merged) ----------
async function cloneAndCustomize(args) {
  const cwd = process.cwd()
  const dest = args.dest || path.join(cwd, 'flowstate-copy')
  const appName = args['app-name'] || 'Flowstate'
  const appSlug = args['app-slug'] || slugify(appName)
  const origin = args.origin || `https://${appSlug}.example.com`
  const accountsBase = args.accounts || 'https://accounts.example.com'
  const cookieDomain = args['cookie-domain'] || '.example.com'
  const allowHosts = args['allow-hosts'] || ''
  const entitlementsDisabled = args['entitlements'] === 'enable' ? 'false' : 'true'

  if (args.source) {
    execSync(`git clone --depth 1 ${args.source} ${dest}`, { stdio: 'inherit' })
  } else {
    // Copy current flowstate directory (sibling of oceanheart-ui)
    const src = path.resolve(path.join(__dirname, '..', '..', 'flowstate'))
    await copyDir(src, dest, { exclude: ['node_modules', '.next', '.git'] })
  }

  const replacements = [
    [/\bFlowstate\b/g, appName],
    [/['"]flowstate['"]/g, `'${appSlug}'`],
    [/flowstate\b/g, appSlug],
  ]
  await walkAndReplace(dest, replacements)

  try {
    const pjPath = path.join(dest, 'package.json')
    const pj = JSON.parse(await fs.readFile(pjPath, 'utf8'))
    pj.name = appSlug
    await fs.writeFile(pjPath, JSON.stringify(pj, null, 2) + '\n')
  } catch {}

  const port = 3001 + (appSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 10)

  await writeLocalEnv(dest, {
    appName,
    supabaseUrl: args['supabase-url'] || '',
    supabaseAnon: args['supabase-anon'] || '',
    supabaseService: args['supabase-service'] || '',
    cookieDomain,
    cookieSecure: 'true',
    origin,
    accountsBase,
    allowHosts,
    entitlementsDisabled,
  }, appSlug, port)

  const wantAccountsEnv = args['accounts-env'] !== 'false'
  if (wantAccountsEnv) {
    await writeAccountsEnv(dest, {
      supabaseUrl: args['supabase-url'] || '',
      supabaseAnon: args['supabase-anon'] || '',
      supabaseService: args['supabase-service'] || '',
      accountsBase,
      origin,
      cookieDomain,
      cookieSecure: 'true',
      allowHosts,
    })
  }

  await writeIntegrationDocClone(dest, {
    appName,
    appSlug,
    origin,
    accountsBase,
    cookieDomain,
    entitlementsDisabled,
    supabaseUrl: args['supabase-url'] || '',
    port,
  })

  console.log('\nScaffold complete!')
  console.log(`- App name: ${appName}`)
  console.log(`- App slug: ${appSlug}`)
  console.log(`- Destination: ${dest}`)
  console.log(`- Origin: ${origin}`)
  console.log(`- Accounts base: ${accountsBase}`)

  await copySSLCerts(dest)
  await updateNginxConfig(dest, appSlug, port)
  await setupNginxIntegration(dest, appSlug)

  console.log('\nInstalling dependencies with bun...')
  try {
    execSync('bun install', { cwd: dest, stdio: 'inherit' })
    console.log('✅ Dependencies installed successfully')
  } catch (e) {
    console.warn('⚠ Failed to install dependencies with bun:', e.message)
    console.log('Falling back to npm install...')
    try {
      execSync('npm install', { cwd: dest, stdio: 'inherit' })
      console.log('✅ Dependencies installed successfully with npm')
    } catch (e2) {
      console.warn('⚠ Failed to install dependencies with npm:', e2.message)
      console.log('Please run: cd ' + dest + ' && bun install (or npm install)')
    }
  }

  console.log('\n🎉 Scaffold complete!')
  console.log(`- App name: ${appName}`)
  console.log(`- App slug: ${appSlug}`)
  console.log(`- Destination: ${dest}`)
  console.log(`- Local HTTP: http://${appSlug}.lvh.me:${port}`)
  console.log(`- Local HTTPS: https://${appSlug}.lvh.me:${3440 + parseInt(port.toString().slice(-1))} (with nginx)`)
  console.log(`- Production: ${origin}`)
}

async function writePackageJson(appDir, appName, appSlug, port) {
  const packageContent = {
    "name": appSlug,
    "version": "0.1.0",
    "private": true,
    "description": `${appName} - powered by Oceanheart authentication`,
    "scripts": {
      "dev": `next dev -p ${port}`,
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "type-check": "tsc --noEmit"
    },
    "dependencies": {
      "@supabase/auth-helpers-nextjs": "^0.10.0",
      "@supabase/ssr": "^0.4.1",
      "@supabase/supabase-js": "^2.48.1",
      "next": "^14.2.25",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "@types/node": "^22.14.1",
      "@types/react": "^19.0.12",
      "@types/react-dom": "^18.3.5",
      "autoprefixer": "^10.4.20",
      "daisyui": "^4.12.23",
      "eslint": "^9.20.1",
      "eslint-config-next": "^15.1.7",
      "postcss": "^8.5.2",
      "tailwindcss": "^3.4.17",
      "typescript": "^5.7.3"
    }
  }
  
  await fs.writeFile(path.join(appDir, 'package.json'), JSON.stringify(packageContent, null, 2))
}

async function writeNextConfig(appDir, port) {
  const configContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Set development server port
  server: {
    port: ${port},
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com", 
      "images.unsplash.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
`

  await fs.writeFile(path.join(appDir, 'next.config.js'), configContent)
}

async function writeTailwindConfig(appDir) {
  const configContent = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
  },
}
`

  await fs.writeFile(path.join(appDir, 'tailwind.config.js'), configContent)
}

async function writeTypeScriptConfig(appDir) {
  const configContent = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`

  await fs.writeFile(path.join(appDir, 'tsconfig.json'), configContent)
}

async function writePostCSSConfig(appDir) {
  const configContent = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

  await fs.writeFile(path.join(appDir, 'postcss.config.js'), configContent)
}

async function createAuthLibs(appDir, appSlug) {
  const authDir = path.join(appDir, 'libs', 'auth')
  await fs.mkdir(authDir, { recursive: true })
  
  // requireAuth.ts
  const requireAuthContent = `import { NextRequest, NextResponse } from 'next/server'
import { createSSRClient } from './ssrClient'

export function buildSignInURL(returnTo: URL) {
  const fallback = 'https://accounts.oceanheart.ai/signin'
  const base = process.env.NEXT_PUBLIC_LOGIN_URL || process.env.ACCOUNTS_SIGNIN_URL || fallback

  let u: URL
  try {
    u = new URL(base)
  } catch {
    u = new URL(fallback)
  }

  // Prevent loops if misconfigured to this app's /signin
  const isLoop = u.origin === returnTo.origin && u.pathname === '/signin'
  if (isLoop) {
    u = new URL(fallback)
  }

  u.searchParams.set('returnTo', returnTo.toString())
  return u
}

export async function requireAuth(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createSSRClient(req, res)
  const { data: { user }, error } = await supabase.auth.getUser()
  if (!user) {
    if (process.env.NODE_ENV !== 'production') {
      try {
        const cookieNames = Array.from((req.cookies as any).getAll?.() || []).map((c: any) => c.name)
        console.log('[${appSlug}][Auth] No user. Cookies seen:', cookieNames, 'getUser error:', error?.message)
      } catch {}
    }
    const u = new URL(req.url)
    const xfProto = req.headers.get('x-forwarded-proto') || u.protocol.replace(':', '')
    const xfHost = req.headers.get('x-forwarded-host') || u.host
    const externalOrigin = process.env.NEXT_PUBLIC_APP_ORIGIN || \`\${xfProto}://\${xfHost}\`
    const extUrl = new URL(req.nextUrl.pathname + req.nextUrl.search, externalOrigin)
    return NextResponse.redirect(buildSignInURL(extUrl), { headers: res.headers })
  }
  return { res, user }
}
`

  await fs.writeFile(path.join(authDir, 'requireAuth.ts'), requireAuthContent)
  
  // ssrClient.ts
  const ssrClientContent = `import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN // e.g., .oceanheart.ai or .lvh.me
// Allow forcing secure cookies in HTTPS dev (e.g., lvh.me behind TLS proxy)
const SECURE_COOKIES = process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production'

export function createSSRClient(req: NextRequest, res: NextResponse) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) { return req.cookies.get(name)?.value },
      set(name: string, value: string, options: CookieOptions) {
        res.cookies.set({ name, value, ...options, domain: COOKIE_DOMAIN || (options as any)?.domain, secure: SECURE_COOKIES, sameSite: (options?.sameSite as any) ?? 'lax' })
      },
      remove(name: string, options: CookieOptions) {
        res.cookies.set({ name, value: '', ...options, domain: COOKIE_DOMAIN || (options as any)?.domain, secure: SECURE_COOKIES, sameSite: (options?.sameSite as any) ?? 'lax', maxAge: 0 })
      },
    },
  })
}
`

  await fs.writeFile(path.join(authDir, 'ssrClient.ts'), ssrClientContent)
  
  // withEntitlement.ts
  const withEntitlementContent = `import { createClient } from '@supabase/supabase-js'

const DISABLE_ENTITLEMENTS = process.env.ENTITLEMENTS_DISABLED === 'true'

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function withEntitlement(appSlug: string, userId: string) {
  if (DISABLE_ENTITLEMENTS) return true
  const { data } = await supabaseAdmin.from('user_entitlements').select('expires_at').eq('user_id', userId).eq('app_slug', appSlug).single()
  if (!data) return false
  if (!data.expires_at) return true
  return new Date(data.expires_at).getTime() > Date.now()
}
`

  await fs.writeFile(path.join(authDir, 'withEntitlement.ts'), withEntitlementContent)
  
  // returnTo.ts
  const returnToContent = `const ALLOW_HOSTS = (process.env.RETURNTO_ALLOW_HOSTS || '')
  .split(',')
  .map((h) => h.trim().toLowerCase())
  .filter(Boolean)

export function isAllowedReturnTo(u: URL) {
  const host = u.host.toLowerCase()
  return host.endsWith('.oceanheart.ai') || ALLOW_HOSTS.includes(host)
}
`

  await fs.writeFile(path.join(authDir, 'returnTo.ts'), returnToContent)
}

async function getNextAvailableHttpsPort(startPort = 3444) {
  const parentDir = path.dirname(process.cwd())
  const usedPorts = new Set([3443, 3442]) // Reserve ports for accounts and flowstate HTTPS
  
  try {
    // Check nginx config files for existing HTTPS ports
    const nginxPath = path.join(process.cwd(), 'dev', 'nginx', 'oceanheart-local.conf')
    try {
      const nginxConfig = await fs.readFile(nginxPath, 'utf8')
      const portMatches = nginxConfig.match(/listen\s+(\d{4})\s+ssl/g) || []
      portMatches.forEach(match => {
        const port = parseInt(match.match(/(\d{4})/)[1])
        usedPorts.add(port)
      })
    } catch {
      // nginx config doesn't exist or not readable
    }
    
    // Check sibling directories for HTTPS ports in env files
    const siblingDirs = await fs.readdir(parentDir, { withFileTypes: true })
    for (const dir of siblingDirs) {
      if (!dir.isDirectory()) continue
      const envPath = path.join(parentDir, dir.name, '.env.local')
      try {
        const envContent = await fs.readFile(envPath, 'utf8')
        const httpsPortMatch = envContent.match(/https:\/\/[^:]+:(\d{4})/g)
        if (httpsPortMatch) {
          httpsPortMatch.forEach(match => {
            const port = parseInt(match.match(/:(\d{4})/)[1])
            if (port >= 3440) usedPorts.add(port)
          })
        }
      } catch {
        // File doesn't exist or not readable
      }
    }
    
    // Find next available port
    let port = startPort
    while (usedPorts.has(port)) {
      port++
    }
    return port
  } catch {
    return startPort
  }
}

async function generateNginxConfig(appSlug, httpsPort, httpPort) {
  const configContent = `## ${appSlug} over HTTPS → http://127.0.0.1:${httpPort}
server {
  listen ${httpsPort} ssl http2;
  server_name ${appSlug}.lvh.me;

  ## Update these paths to your mkcert-generated cert files
  ssl_certificate     /ABSOLUTE/PATH/TO/accounts.lvh.me+1.pem;
  ssl_certificate_key /ABSOLUTE/PATH/TO/accounts.lvh.me+1-key.pem;

  location / {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_read_timeout 3600;
    proxy_buffering off;

    proxy_pass http://127.0.0.1:${httpPort};
  }
}`

  return configContent
}

async function writeNginxConfig(appDir, appSlug, httpsPort, httpPort) {
  const configContent = await generateNginxConfig(appSlug, httpsPort, httpPort)
  const nginxDir = path.join(appDir, 'nginx')
  await fs.mkdir(nginxDir, { recursive: true })
  await fs.writeFile(path.join(nginxDir, `${appSlug}-local.conf`), configContent)
  
  // Also write instructions
  const instructionsContent = `# Nginx HTTPS Setup for ${appSlug}

## Prerequisites

1. Install mkcert for local SSL certificates:
   \`\`\`bash
   # macOS
   brew install mkcert
   
   # Linux
   curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"
   chmod +x mkcert-v*-linux-amd64
   sudo mv mkcert-v*-linux-amd64 /usr/local/bin/mkcert
   \`\`\`

2. Generate SSL certificates (if not already done):
   \`\`\`bash
   # Create local CA
   mkcert -install
   
   # Generate certificate for lvh.me subdomains
   mkcert "accounts.lvh.me" "*.lvh.me"
   \`\`\`

## Setup Steps

1. Copy the SSL certificates to your app directory:
   \`\`\`bash
   # From wherever mkcert generated them
   cp accounts.lvh.me+1.pem ./
   cp accounts.lvh.me+1-key.pem ./
   \`\`\`

2. Update the nginx config with absolute paths:
   \`\`\`bash
   # Edit nginx/${appSlug}-local.conf
   # Replace /ABSOLUTE/PATH/TO/ with actual paths to your certificates
   \`\`\`

3. Add to your main nginx config or run standalone:
   \`\`\`bash
   # Option 1: Include in main nginx.conf
   include /path/to/${appSlug}/nginx/${appSlug}-local.conf;
   
   # Option 2: Run standalone nginx (if you don't have nginx running)
   nginx -c /path/to/${appSlug}/nginx/${appSlug}-local.conf -g "daemon off;"
   \`\`\`

4. Start your app and test:
   \`\`\`bash
   npm run dev  # Starts HTTP server on port ${httpPort}
   # nginx proxies https://${appSlug}.lvh.me:${httpsPort} → http://127.0.0.1:${httpPort}
   \`\`\`

## URLs

- **HTTP**: http://${appSlug}.lvh.me:${httpPort}
- **HTTPS**: https://${appSlug}.lvh.me:${httpsPort}

For production cross-domain cookies to work properly, use the HTTPS URL.
`

  await fs.writeFile(path.join(nginxDir, 'SETUP.md'), instructionsContent)
}

async function main() {
  const args = parseArgs(process.argv)
  const cwd = process.cwd()
  
  // Support clone-and-customize mode (merged from flowstate script)
  if (args.mode === 'clone' || args.clone === 'true' || args.dest || args.source) {
    await cloneAndCustomize(args)
    return
  }
  
  // Validate we're in oceanheart-ui root
  const packageJsonPath = path.join(cwd, 'package.json')
  try {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'))
    if (packageJson.name !== 'oceanheart-ui') {
      throw new Error('This script must be run from the oceanheart-ui root directory')
    }
  } catch (error) {
    console.error('❌ Error: This script must be run from the oceanheart-ui root directory')
    console.error('   Current directory:', cwd)
    process.exit(1)
  }
  
  const appName = args['app-name'] || 'New App'
  const appSlug = args['app-slug'] || slugify(appName)
  const assignedPort = args.port ? parseInt(args.port) : await getNextAvailablePort()
  const assignedHttpsPort = args['https-port'] ? parseInt(args['https-port']) : await getNextAvailableHttpsPort()
  const entitlementsDisabled = args['entitlements'] === 'enable' ? 'false' : 'true'
  const cookieDomain = args['cookie-domain'] || '.oceanheart.ai'
  
  // Production URLs
  const origin = `https://${appSlug}.oceanheart.ai`
  const accountsBase = 'https://accounts.oceanheart.ai'
  const allowHosts = 'accounts.oceanheart.ai,oceanheart.ai'
  
  const parentDir = path.dirname(cwd)
  const appDir = path.join(parentDir, appSlug)
  
  // Check if app already exists
  try {
    await fs.access(appDir)
    console.error(`❌ Error: App '${appSlug}' already exists at ${appDir}`)
    process.exit(1)
  } catch {
    // Good, app doesn't exist yet
  }
  
  console.log(`🚀 Creating new app: ${appName}`)
  console.log(`   Slug: ${appSlug}`)
  console.log(`   HTTP Port: ${assignedPort}`)
  console.log(`   HTTPS Port: ${assignedHttpsPort}`)
  console.log(`   Directory: ../${appSlug}`)
  console.log('')
  
  // Create app directory structure
  await fs.mkdir(appDir, { recursive: true })
  
  // Create core files
  await writeMiddleware(appDir, appSlug)
  await createAppLayout(appDir, appName)
  await createMainPage(appDir, appName)
  await createNoAccessPage(appDir, appName, appSlug)
  
  // Write configuration files
  await writeAppEnv(appDir, {
    supabaseUrl: args['supabase-url'] || '',
    supabaseAnon: args['supabase-anon'] || '',
    supabaseService: args['supabase-service'] || '',
    cookieDomain,
    cookieSecure: 'true',
    origin,
    accountsBase,
    accountsUrl: 'https://accounts.oceanheart.ai/signin',
    allowHosts,
    entitlementsDisabled,
    appSlug,
    port: assignedPort,
    httpsPort: assignedHttpsPort,
  })
  
  await writeReadme(appDir, appName, appSlug, assignedPort, assignedHttpsPort)
  await writeIntegrationDoc(appDir, {
    appName,
    appSlug,
    port: assignedPort,
    origin,
    accountsBase,
    cookieDomain,
    entitlementsDisabled,
  })
  
  // Create Next.js configuration files for standalone app
  await writePackageJson(appDir, appName, appSlug, assignedPort)
  await writeNextConfig(appDir, assignedPort)
  await writeTailwindConfig(appDir)
  await writeTypeScriptConfig(appDir)
  await writePostCSSConfig(appDir)
  
  // Create auth libraries for self-contained app
  await createAuthLibs(appDir, appSlug)
  
  // Generate nginx configuration for HTTPS setup
  await writeNginxConfig(appDir, appSlug, assignedHttpsPort, assignedPort)
  
  console.log('✅ App scaffolding complete!')
  console.log('')
  console.log('📁 Files created:')
  console.log(`   ../${appSlug}/package.json`)
  console.log(`   ../${appSlug}/next.config.js`)
  console.log(`   ../${appSlug}/tailwind.config.js`)
  console.log(`   ../${appSlug}/tsconfig.json`)
  console.log(`   ../${appSlug}/postcss.config.js`)
  console.log(`   ../${appSlug}/middleware.ts`)
  console.log(`   ../${appSlug}/.env.example`)
  console.log(`   ../${appSlug}/app/layout.tsx`)
  console.log(`   ../${appSlug}/app/globals.css`)
  console.log(`   ../${appSlug}/app/page.tsx`)
  console.log(`   ../${appSlug}/app/no-access/page.tsx`)
  console.log(`   ../${appSlug}/libs/auth/requireAuth.ts`)
  console.log(`   ../${appSlug}/libs/auth/ssrClient.ts`)
  console.log(`   ../${appSlug}/libs/auth/withEntitlement.ts`)
  console.log(`   ../${appSlug}/libs/auth/returnTo.ts`)
  console.log(`   ../${appSlug}/nginx/${appSlug}-local.conf`)
  console.log(`   ../${appSlug}/nginx/SETUP.md`)
  console.log(`   ../${appSlug}/README.md`)
  console.log(`   ../${appSlug}/INTEGRATION.md`)
  console.log('')
  console.log('🔧 Next steps:')
  console.log(`1. cd ../${appSlug}`)
  console.log('2. cp .env.example .env.local')
  console.log('3. Fill in Supabase credentials in .env.local')
  console.log('4. Set up HTTPS (see nginx/SETUP.md)')
  console.log('5. npm install && npm run dev')
  console.log(`6. Visit HTTP: http://${appSlug}.lvh.me:${assignedPort}`)
  console.log(`7. Visit HTTPS: https://${appSlug}.lvh.me:${assignedHttpsPort} (after nginx setup)`)
  console.log('')
  console.log('📚 Documentation:')
  console.log(`   ../${appSlug}/nginx/SETUP.md - HTTPS setup instructions`)
  console.log(`   ../${appSlug}/INTEGRATION.md - Complete setup guide`)
  console.log(`   ../${appSlug}/README.md - Development instructions`)
}

main().catch((e) => {
  console.error('❌ Error:', e.message)
  process.exit(1)
})
