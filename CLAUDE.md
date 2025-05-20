# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Oceanheart UI is a Next.js 14 (App Router) web application that serves as the frontend for Oceanheart.ai. The application includes landing pages, user authentication, dashboards, AI conversations, a gamified leaderboard feature (Saigo), and other specialized sections.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: React 18, Tailwind CSS, DaisyUI, Framer Motion, Recharts
- **Backend**: Next.js API Routes, Supabase (Auth, PostgreSQL)
- **Payments**: Stripe
- **Email**: Resend
- **State Management**: React Hooks, SWR
- **Database**: Supabase (PostgreSQL), SQLite (for HDI feature)
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

### Saigo Feature Commands

```bash
# Add Instagram check
bun add-instagram-check

# Add Instagram check with users
bun add-instagram-check-with-users
```

## Project Architecture

### Directory Structure

- **`app/`**: Next.js App Router pages and API routes
  - `api/`: Backend API endpoints for auth, payments, webhooks, etc.
  - Other directories represent routes (e.g., `/about`, `/blog`, `/saigo`)
- **`components/`**: Reusable React components
- **`libs/`**: Utility functions and service integrations
  - `supabase/`: Supabase client configuration
  - Various service integrations (Stripe, Resend, etc.)
- **`public/`**: Static assets (images, fonts, etc.)
- **`types/`**: TypeScript type definitions
- **`migrations/`**: Database migration files
- **`supabase/`**: Supabase configuration and migrations

### Key Configuration Files

- **`next.config.js`**: Next.js configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`middleware.ts`**: Next.js middleware (likely handles auth)

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