# Oceanheart UI Architecture

## Overview

Oceanheart UI is a Next.js 14 web application using the App Router pattern. The application serves as the frontend for Oceanheart.ai, providing landing pages, user authentication, dashboards, and specialized features like AI conversations and leaderboards.

This document provides a comprehensive overview of the project's architecture, including directory structure, key components, data flow, and integration points.

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Directory Structure](#directory-structure)
3. [Core Application Flow](#core-application-flow)
4. [Authentication System](#authentication-system)
5. [State Management](#state-management)
6. [Database & API Integration](#database--api-integration)
7. [Custom Hooks](#custom-hooks)
8. [Component Architecture](#component-architecture)
9. [Styling](#styling)
10. [Testing Strategy](#testing-strategy)
11. [Deployment](#deployment)
12. [Developer Workflow](#developer-workflow)

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Libraries**:
  - React 18
  - Tailwind CSS
  - DaisyUI
  - Framer Motion
  - Recharts (for data visualization)
- **Backend Services**:
  - Supabase (Authentication, PostgreSQL Database)
  - Stripe (Payment processing)
  - Resend (Email delivery)
  - OpenAI API (AI conversations)
- **State Management**: React Hooks, SWR for data fetching
- **Database**: 
  - Primary: Supabase (PostgreSQL)
  - Secondary: SQLite (for specific features)
- **Package Manager**: Bun
- **Testing**:
  - Jest (for unit and component tests)
  - Cypress (for end-to-end tests)

## Directory Structure

```
oceanheart-ui/
├── app/                     # Next.js App Router pages and API routes
│   ├── api/                 # API routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── stripe/          # Payment processing endpoints
│   │   ├── webhook/         # Webhook handlers
│   │   └── ...              # Other API endpoints
│   ├── about/               # About page
│   ├── blog/                # Blog pages
│   ├── dashboard/           # User dashboard
│   ├── signin/              # Authentication pages
│   └── ...                  # Other page routes
├── components/              # Shared React components
│   ├── AuthButton.tsx       # Authentication button component
│   ├── Footer.tsx           # Site footer
│   ├── Header.tsx           # Site header
│   ├── Hero.tsx             # Hero section component
│   ├── Pricing.tsx          # Pricing component
│   └── ...                  # Other components
├── hooks/                   # Custom React hooks
│   ├── useForm.ts           # Form handling hook
│   └── ...                  # Other hooks (to be implemented)
├── lib/                     # Utility functions
│   └── teamData.ts          # Team data utilities
├── libs/                    # Service integrations and utilities
│   ├── api.ts               # API utility functions
│   ├── stripe.ts            # Stripe integration
│   ├── supabase/            # Supabase client and utilities
│   │   ├── client.ts        # Supabase client configuration
│   │   ├── middleware.ts    # Supabase auth middleware
│   │   └── server.ts        # Server-side Supabase functions
│   └── ...                  # Other service integrations
├── public/                  # Static assets
│   ├── images/              # Image assets
│   ├── scripts/             # Client-side scripts
│   └── ...                  # Other static assets
├── types/                   # TypeScript type definitions
│   ├── config.ts            # Configuration types
│   ├── index.ts             # Shared type definitions
│   └── ...                  # Other type definitions
├── config.ts                # Application configuration
├── middleware.ts            # Next.js middleware
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies and scripts
```

### Key Directory Explanations

#### `app/` Directory

The `app/` directory follows the Next.js App Router pattern where each subdirectory represents a route in the application. Key subdirectories include:

- **`api/`**: Server-side API routes
  - **`auth/`**: Authentication-related endpoints
  - **`stripe/`**: Payment processing endpoints
  - **`webhook/`**: Webhook handlers for external services

- **Page Routes**: Each subdirectory typically contains:
  - **`page.tsx`**: The React component for the page
  - **`layout.tsx`**: (Optional) Layout wrapper for the page
  - **Other components**: Page-specific components

#### `components/` Directory

Contains reusable React components used throughout the application. These are organized in a flat structure with related components grouped together by functionality.

#### `hooks/` Directory

Contains custom React hooks that encapsulate reusable logic:

- **`useForm.ts`**: A hook for form state management, validation, and submission
- Additional hooks will be implemented for authentication, data fetching, etc.

#### `libs/` Directory

Contains service integrations and utility functions:

- **`api.ts`**: Utility functions for making API calls
- **`stripe.ts`**: Stripe payment integration
- **`supabase/`**: Supabase client configuration and helper functions

## Core Application Flow

1. **Request Handling**:
   - Incoming requests first pass through `middleware.ts`
   - Middleware handles authentication checks and redirects
   - Next.js routes the request to the appropriate page or API endpoint

2. **Page Rendering**:
   - Pages in the `app/` directory render server-side by default
   - Client components are marked with `"use client";` directive
   - Layout components provide consistent structure

3. **Data Fetching**:
   - Server components fetch data on the server
   - Client components use SWR or custom hooks for data fetching
   - API routes handle data mutation operations

4. **Component Hierarchy**:
   - Layouts define the overall page structure
   - Pages compose reusable components
   - Components use custom hooks for state and side effects

## Authentication System

Authentication is handled through Supabase Authentication:

1. **Sign-in Flow**:
   - User navigates to `/signin`
   - Authentication options include Email Magic Link and Google OAuth
   - reCAPTCHA verifies human users
   - Authentication redirects to appropriate callback handlers

2. **Authentication State**:
   - Supabase client manages session state
   - Middleware checks auth state for protected routes
   - `AuthButton` component adapts based on auth state

3. **Protected Routes**:
   - Middleware redirects unauthenticated users
   - Dashboard and user-specific pages check auth state

### Subdomain SSO (Planned/Implementing)
- Centralized auth UI on `accounts.oceanheart.ai` with domain-scoped cookies (`.oceanheart.ai`).
- Each product app (e.g., `flowstate.oceanheart.ai`) uses shared SSR auth utilities and middleware guards.
- Entitlements enforced server-side via `user_entitlements` table.
- See `docs/PRD-Subdomain-SSO.md` and `packages/common-auth` for details and stubs.

## State Management

1. **Server State**:
   - Fetched directly in server components
   - Passed down as props to client components

2. **Client State**:
   - Local component state using React's `useState`
   - Form state managed through the `useForm` custom hook
   - Session state managed through Supabase

3. **Data Fetching**:
   - SWR for client-side data fetching with caching and revalidation
   - Custom API utilities for specific data operations

## Database & API Integration

1. **Supabase**:
   - Primary database is PostgreSQL hosted on Supabase
   - Authentication via Supabase Auth
   - Data access through Supabase client

2. **API Routes**:
   - Next.js API routes in the `app/api/` directory
   - Endpoints for authentication, data operations, and third-party integrations
   - Webhook handlers for external services

3. **External Services**:
   - Stripe for payment processing
   - Resend for email delivery
   - OpenAI for AI conversation features

## Custom Hooks

Custom hooks encapsulate reusable logic:

1. **`useForm`**:
   - Form state management
   - Validation
   - Submission handling
   - Error management

2. **Future Hooks**:
   - Authentication state management
   - Data fetching
   - Animation controls

## Component Architecture

1. **Layout Components**:
   - `app/layout.tsx`: Root layout with global elements
   - Feature-specific layouts (e.g., `app/blog/layout.tsx`)

2. **Page Components**:
   - Implement specific routes
   - Compose shared components
   - Handle page-specific logic

3. **UI Components**:
   - Reusable UI elements in `components/` directory
   - Follow consistent naming and prop patterns
   - Use Tailwind CSS for styling

4. **Feature Components**:
   - Specialized components for specific features
   - Located in feature-specific directories or in `components/`

## Styling

1. **Tailwind CSS**:
   - Primary styling approach
   - Configuration in `tailwind.config.js`
   - Global styles in `app/globals.css`

2. **DaisyUI**:
   - Component library built on Tailwind
   - Provides pre-styled UI elements

3. **Framer Motion**:
   - Animation library for interactive elements
   - Used for page transitions and UI animations

## Testing Strategy

1. **Unit Tests**:
   - Jest for testing utility functions and hooks
   - React Testing Library for component testing

2. **End-to-End Tests**:
   - Cypress for testing full user flows
   - Coverage of critical paths like authentication and checkout

3. **Test Files**:
   - Located alongside the code they test with `.test.ts` or `.test.tsx` extension
   - Custom hooks have corresponding test files (e.g., `useForm.test.ts`)

## Deployment

The application is deployed on Vercel with the following environment considerations:

1. **Environment Variables**:
   - Stored securely in Vercel
   - Local development uses `.env.local`

2. **Build Process**:
   - Automated through Vercel's integration with GitHub
   - Includes linting, type checking, and testing

3. **Preview Deployments**:
   - Generated for pull requests
   - Allow testing changes before merging

## Developer Workflow

1. **Local Development**:
   - Clone repository and install dependencies
   - Set up environment variables
   - Run development server with `bun dev`

2. **Code Organization**:
   - Follow Next.js App Router conventions
   - Keep components focused and reusable
   - Use custom hooks for shared logic

3. **Build and Verification**:
   - Run linting with `bun lint`
   - Check types with `bun typecheck`
   - Run tests with `bun test`
   - Build locally with `bun build`

4. **Contribution**:
   - Follow the established patterns in the codebase
   - Update documentation for significant changes
   - Use feature branches and pull requests
