# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oceanheart UI is a Next.js web application that serves as the frontend for Oceanheart.ai. The application includes landing pages, user authentication, dashboards, AI conversations, and other specialized sections.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: React 18, Tailwind CSS, DaisyUI, Framer Motion, Recharts
- **Backend**: Next.js API Routes, Supabase (Auth, PostgreSQL)
- **Payments**: Stripe
- **Email**: Resend
- **State Management**: React Hooks, SWR
- **Database**: Supabase (PostgreSQL)
- **Package Manager**: Bun

## Common Commands

### Development

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Start production server
bun start

# Run linting
bun lint

# Generate sitemap (runs automatically after build)
bun postbuild
```

### Testing

```bash
# Run Jest tests (component tests)
bun test

# Run a specific test file
bun test -- components/team/RoleCard.test.tsx

# Run Cypress end-to-end tests
bun cypress run

# Open Cypress test runner
bun cypress open
```

### Supabase Local Development

The project uses Supabase for authentication and database. If working with Supabase features:

```bash
# Initialize Supabase locally (if needed)
supabase init

# Start Supabase local development
supabase start

# Apply migrations
supabase db push
```

## Project Architecture

### Directory Structure

- **`app/`**: Next.js App Router pages and API routes
  - `api/`: Backend API endpoints for auth, payments, webhooks, etc.
  - Other directories represent routes (e.g., `/about`, `/blog`)
- **`components/`**: Reusable React components
- **`hooks/`**: Custom React hooks
- **`libs/`**: Utility functions and service integrations
  - `supabase/`: Supabase client configuration
  - Various service integrations (Stripe, Resend, etc.)
- **`public/`**: Static assets (images, fonts, etc.)
- **`types/`**: TypeScript type definitions
- **`migrations/`**: Database migration files
- **`supabase/`**: Supabase configuration and migrations
- **`scripts/`**: Helper scripts for development and operations

### Key Configuration Files

- **`next.config.js`**: Next.js configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`middleware.ts`**: Next.js middleware (handles auth)

### Data Flow

1. Client-side requests are handled by Next.js App Router
2. Authentication is managed by Supabase Auth
3. API requests go through Next.js API Routes in `app/api/`
4. Database operations are performed via Supabase client

## Environment Setup

The application requires several environment variables for API keys and configuration. Copy from `.env.example` to `.env.local` and fill in the necessary values:

```
# Copy example environment file
cp .env.example .env.local
```

Required environment variables include Supabase credentials, Stripe API keys, and others specific to application features.

## Testing Approach

- **Component Testing**: Jest with React Testing Library for component tests (`*.test.tsx` files)
- **End-to-End Testing**: Cypress for integration tests

## Deployment

The application is deployed on Vercel.

## File Operations Helper

For file operations (when bash commands might have issues), use the Python helper scripts in the `scripts/` directory:

### File Operations Script

Use `scripts/fileops.py` for file and git operations:

```bash
# Create directories
python scripts/fileops.py mkdir -p path/to/directory

# Copy files or directories
python scripts/fileops.py cp -r source destination

# Move files or directories
python scripts/fileops.py mv source destination

# Remove files or directories
python scripts/fileops.py rm -rf path/to/remove

# Git operations
python scripts/fileops.py git-branch branch-name
python scripts/fileops.py git-add file1 file2
python scripts/fileops.py git-commit -m "Commit message"
python scripts/fileops.py git-status

# Create backups
python scripts/fileops.py backup source_dir backup_name

# Install packages
python scripts/fileops.py install next@latest react@latest --package-manager bun --force
```

### Next.js Upgrade Helper

For Next.js upgrade tasks, use `scripts/nextjs_upgrade.py`:

```bash
# Prepare for upgrade (create branch and backup)
python scripts/nextjs_upgrade.py prepare

# Update dependencies
python scripts/nextjs_upgrade.py update-deps --force

# Run Next.js codemod
python scripts/nextjs_upgrade.py run-codemod

# Update async APIs in the codebase
python scripts/nextjs_upgrade.py update-async-apis

# Fix IP properties in API routes
python scripts/nextjs_upgrade.py fix-ip-properties

# Check and fix caching patterns
python scripts/nextjs_upgrade.py check-cache

# Verify build process
python scripts/nextjs_upgrade.py verify-build
```

These helper scripts ensure that file operations work consistently even when direct bash commands may encounter issues.

### Making Scripts Executable

To make the helper scripts executable, run the following command:

```bash
# Make scripts executable with Python
python -c "import os, stat; script_dir='scripts'; scripts=['fileops.py', 'nextjs_upgrade.py']; [os.chmod(os.path.join(script_dir, script), os.stat(os.path.join(script_dir, script)).st_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH) for script in scripts if os.path.exists(os.path.join(script_dir, script))]; print('Scripts made executable')"
```

After making them executable, you can run them directly:

```bash
# Run file operations script
./scripts/fileops.py mkdir -p new/directory

# Run Next.js upgrade helper
./scripts/nextjs_upgrade.py prepare
```