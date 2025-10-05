# The Kaishin Method - Architecture Documentation

**Version:** 1.0
**Last Updated:** October 2, 2025
**Framework:** Next.js 15.5.3 with App Router
**React Version:** 19.1.0

---

## Table of Contents

1. [System Overview](#system-overview)
2. [High-Level Architecture](#high-level-architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Component Architecture](#component-architecture)
6. [Design System](#design-system)
7. [Data Flow Patterns](#data-flow-patterns)
8. [Routing Strategy](#routing-strategy)
9. [Authentication & Authorization](#authentication--authorization)
10. [Content Management System](#content-management-system)
11. [State Management](#state-management)
12. [API Architecture](#api-architecture)
13. [Performance Patterns](#performance-patterns)
14. [Key Architectural Decisions](#key-architectural-decisions)
15. [Integration Patterns](#integration-patterns)
16. [Future Considerations](#future-considerations)

---

## System Overview

The Kaishin Method is a Next.js 15 application built for a transformational program integrating Mental, Emotional, Physical, Energetic, and Spiritual development. The application serves three distinct user groups:

- **Public Visitors**: Landing pages, marketing content, news/blog
- **Authenticated Members**: Member portal with courses, AI chat, progress tracking
- **Content Editors**: Git-based CMS (Decap CMS) for content management

### Core Capabilities

- **Marketing Website**: Public-facing pages with rich animations and 3D effects
- **Member Portal**: Protected dashboard with courses, AI chat, and progress tracking
- **Content Management**: Git-based CMS with GitHub OAuth for content editors
- **Authentication**: NextAuth.js v5 with email magic links, Google, and GitHub OAuth
- **Database**: Turso (LibSQL) for user data, sessions, and progress tracking

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐ │
│  │   Public     │  │   Member     │  │   Content Editor         │ │
│  │   Visitor    │  │   Portal     │  │   (Decap CMS)           │ │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────────┘ │
└─────────┼──────────────────┼─────────────────────┼──────────────────┘
          │                  │                     │
          ▼                  ▼                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 APP ROUTER                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Middleware Layer                            │  │
│  │  • NextAuth.js Edge Middleware (Route Protection)            │  │
│  │  • Session Validation                                        │  │
│  │  • Public/Protected Route Handling                           │  │
│  └────────┬─────────────────────────────────┬───────────────────┘  │
│           │                                  │                      │
│  ┌────────▼──────────┐            ┌─────────▼────────────┐        │
│  │  Public Routes    │            │  Protected Routes     │        │
│  │  (SSR/SSG)        │            │  (CSR)                │        │
│  │  • /              │            │  • /app/*             │        │
│  │  • /path          │            │  • /app/courses       │        │
│  │  • /program       │            │  • /app/chat          │        │
│  │  • /news/[slug]   │            │  • /app/profile       │        │
│  │  • /blog/[slug]   │            │  • /app/settings      │        │
│  └────────┬──────────┘            └─────────┬────────────┘        │
│           │                                  │                      │
│  ┌────────▼──────────────────────────────────▼────────────┐       │
│  │              API Routes (Route Handlers)                │       │
│  │  • /api/auth/* (NextAuth.js)                            │       │
│  │  • /api/callback (OAuth callback)                       │       │
│  │  • /api/testimonials (Data API)                         │       │
│  │  • /api/checkout (Stripe)                               │       │
│  │  • /api/leads (Lead capture)                            │       │
│  └────────┬──────────────────────────────────┬─────────────┘       │
└───────────┼──────────────────────────────────┼──────────────────────┘
            │                                  │
            ▼                                  ▼
┌─────────────────────┐          ┌─────────────────────────────────┐
│   Content Layer     │          │     Data Layer                  │
│                     │          │                                 │
│  ┌──────────────┐  │          │  ┌──────────────────────────┐  │
│  │  Git Repo    │  │          │  │  Turso (LibSQL)          │  │
│  │  ├─ content/ │  │          │  │  • users                  │  │
│  │  │  ├─ news/ │  │          │  │  • sessions               │  │
│  │  │  ├─ blog/ │  │          │  │  • accounts               │  │
│  │  │  ├─ courses/│ │          │  │  • user_profiles          │  │
│  │  │  └─ pages/ │  │          │  │  • verification_tokens    │  │
│  │  └──────────────┘  │          │  └──────────────────────────┘  │
│  │                     │          │                                 │
│  │  ┌──────────────┐  │          │  ┌──────────────────────────┐  │
│  │  │  Markdown    │  │          │  │  External Services       │  │
│  │  │  Processing  │  │          │  │  • Resend (Email)        │  │
│  │  │  • gray-matter│ │          │  │  • Stripe (Payments)     │  │
│  │  │  • remark     │  │          │  │  • Anthropic (AI Chat)  │  │
│  │  └──────────────┘  │          │  └──────────────────────────┘  │
│  └─────────────────────┘          └─────────────────────────────────┘
            │                                  │
            ▼                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    GitHub Repository                                 │
│  • Version Control                                                  │
│  • Content Versioning                                               │
│  • OAuth Provider                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Architectural Pattern

**Layered Architecture** with clear separation of concerns:

1. **Presentation Layer**: React Server/Client Components with Aceternity UI + Kaishin components
2. **Business Logic Layer**: Content processing, authentication flows, API route handlers
3. **Data Layer**: File-based CMS (markdown) + Turso database for user data
4. **Infrastructure Layer**: Next.js 15 App Router, Turbopack bundler, Vercel deployment

---

## Technology Stack

### Core Framework
- **Next.js**: 15.5.3 with App Router
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Bundler**: Turbopack (dev and production)

### Styling & UI
- **Tailwind CSS**: 4.x with inline `@theme` configuration
- **Aceternity UI**: 89 pre-built animated components
- **Framer Motion**: 12.23.12 (animations)
- **React Three Fiber**: 9.0.0-alpha.8 (3D graphics)
- **Radix UI**: Accessible primitive components
- **Tabler Icons**: Icon system

### Authentication & Database
- **NextAuth.js**: 5.0.0-beta.29 (authentication)
- **Turso (LibSQL)**: Serverless SQLite database
- **Resend**: Email delivery service
- **OAuth Providers**: Google, GitHub, Email Magic Links

### Content Management
- **Decap CMS**: 3.8.4 (formerly Netlify CMS)
- **gray-matter**: 4.0.3 (frontmatter parsing)
- **remark**: 15.0.1 (markdown processing)
- **remark-html**: 16.0.1 (HTML conversion)

### AI & Integrations
- **Anthropic SDK**: 0.65.0 (Claude AI for chat)
- **Stripe**: 19.0.0 (payment processing)
- **Vercel Speed Insights**: Performance monitoring

### Development Tools
- **ESLint**: 9.x with Next.js config
- **tsx**: 4.20.6 (TypeScript execution)
- **repomix**: 0.3.5 (codebase packaging)

---

## Project Structure

```
pheonix.oceanheart.ai/
├── src/
│   ├── app/                          # Next.js App Router (file-based routing)
│   │   ├── layout.tsx                # Root layout (fonts, providers, global wrappers)
│   │   ├── page.tsx                  # Landing page (222 lines, client component)
│   │   ├── globals.css               # Tailwind config + design system (382 lines)
│   │   │
│   │   ├── app/                      # Member portal (protected routes)
│   │   │   ├── layout.tsx            # Portal layout with sidebar navigation
│   │   │   ├── page.tsx              # Dashboard
│   │   │   ├── courses/              # Course catalog & individual courses
│   │   │   ├── chat/                 # AI chat interface (Kaishin AI)
│   │   │   ├── profile/              # User profile
│   │   │   ├── settings/             # Account settings
│   │   │   └── support/              # Help & support
│   │   │
│   │   ├── auth/                     # Authentication pages
│   │   │   ├── signin/               # Sign-in page
│   │   │   ├── error/                # Auth error page
│   │   │   └── verify-request/       # Email verification page
│   │   │
│   │   ├── news/                     # News section
│   │   │   ├── page.tsx              # News index
│   │   │   └── [slug]/page.tsx       # Individual news articles (SSG)
│   │   │
│   │   ├── blog/                     # Blog section
│   │   │   ├── page.tsx              # Blog index
│   │   │   └── [slug]/page.tsx       # Individual blog posts (SSG)
│   │   │
│   │   ├── path/page.tsx             # "The Path" page (method explanation)
│   │   ├── program/page.tsx          # Program overview
│   │   ├── book/page.tsx             # Book landing page
│   │   ├── collective/page.tsx       # Collective community page
│   │   │
│   │   └── api/                      # API Routes (Route Handlers)
│   │       ├── auth/                 # NextAuth.js handlers
│   │       ├── callback/             # OAuth callback
│   │       ├── testimonials/         # Testimonials API
│   │       ├── checkout/             # Stripe checkout
│   │       ├── leads/                # Lead capture
│   │       └── ask/                  # AI question endpoint
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # Aceternity UI (89 vendor components)
│   │   │   ├── 3d-card.tsx
│   │   │   ├── globe.tsx
│   │   │   ├── spotlight.tsx
│   │   │   ├── bento-grid.tsx
│   │   │   └── ... (85+ more components)
│   │   │
│   │   ├── kaishin/                  # Kaishin custom components (14 components)
│   │   │   ├── index.ts              # Component exports
│   │   │   ├── Navigation.tsx        # Site navigation
│   │   │   ├── Footer.tsx            # Site footer
│   │   │   ├── CourseCard.tsx        # Course display card
│   │   │   ├── PillarCard.tsx        # 5 Pillars visualization
│   │   │   ├── CircleProgress.tsx    # Progress circles
│   │   │   ├── FiveBodiesVisualizer.tsx  # 5 Bodies system visual
│   │   │   ├── LeadMagnetForm.tsx    # Lead capture form
│   │   │   ├── TestimonialsCarousel.tsx  # Testimonials display
│   │   │   ├── FAQSection.tsx        # FAQ component
│   │   │   └── ... (5 more)
│   │   │
│   │   ├── auth/                     # Authentication components
│   │   │   ├── SignInButton.tsx
│   │   │   ├── SignOutButton.tsx
│   │   │   └── UserAvatar.tsx
│   │   │
│   │   └── course/                   # Course-related components
│   │       ├── CoursePlayer.tsx
│   │       └── SlideRenderer.tsx
│   │
│   ├── contexts/                     # React Context providers
│   │   ├── ChatContext.tsx           # AI chat state management
│   │   ├── CourseContext.tsx         # Course progress tracking
│   │   └── UserContext.tsx           # User profile state
│   │
│   ├── lib/                          # Shared utilities and libraries
│   │   ├── content.ts                # Content management API
│   │   ├── course-parser.ts          # Course markdown parser
│   │   ├── turso.ts                  # Turso database client
│   │   ├── turso-adapter.ts          # NextAuth.js Turso adapter
│   │   ├── utils.ts                  # Tailwind utilities (cn)
│   │   ├── progress.ts               # Progress tracking utilities
│   │   ├── storage.ts                # Local storage utilities
│   │   ├── testimonials.ts           # Testimonials data management
│   │   └── rag/                      # RAG (Retrieval-Augmented Generation)
│   │       └── claude-simple.ts      # Claude AI integration
│   │
│   ├── hooks/                        # Custom React hooks
│   │   └── use-outside-click.tsx     # Click outside detection
│   │
│   ├── types/                        # TypeScript type definitions
│   │   └── course.ts                 # Course data structures
│   │
│   └── data/                         # Static data files
│       └── testimonials.json         # Testimonials data
│
├── content/                          # Git-based CMS content
│   ├── news/                         # News articles (markdown)
│   ├── blog/                         # Blog posts (markdown)
│   ├── courses/                      # Course content (markdown)
│   ├── book/                         # Book content
│   ├── pages/                        # Static pages (about, contact)
│   └── settings/                     # Site settings (YAML)
│
├── public/                           # Static assets
│   ├── admin/                        # Decap CMS admin interface
│   │   ├── config.yml                # CMS configuration
│   │   ├── index.html                # CMS entry point
│   │   └── decap-cms.js              # CMS bundle (copied on build)
│   ├── uploads/                      # User-uploaded media
│   ├── images/                       # Static images
│   └── book_cover.jpg                # Book cover image
│
├── scripts/                          # Utility scripts
│   ├── migrate-db.ts                 # Database migration
│   └── test-auth-setup.ts            # Auth testing
│
├── migrations/                       # Database migrations
│   └── 001_initial.sql               # Initial schema
│
├── auth.ts                           # NextAuth.js configuration
├── auth.config.ts                    # NextAuth.js edge config
├── middleware.ts                     # NextAuth.js middleware (route protection)
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── eslint.config.mjs                 # ESLint configuration
├── postcss.config.mjs                # PostCSS configuration
├── components.json                   # shadcn/ui configuration
├── package.json                      # Dependencies and scripts
├── CLAUDE.md                         # Development documentation
└── ARCHITECTURE.md                   # This file
```

### Key Directory Purposes

- **`src/app/`**: File-based routing. Each `page.tsx` becomes a route.
- **`src/components/ui/`**: **Vendor code** (Aceternity UI). Do not modify. 89 pre-built components.
- **`src/components/kaishin/`**: **Project-specific components**. Reusable across the app.
- **`src/lib/`**: Pure utility functions and external service integrations.
- **`src/contexts/`**: React Context providers for global state.
- **`content/`**: Git-based CMS storage. Managed by Decap CMS.
- **`public/admin/`**: Decap CMS admin interface (static HTML).

---

## Component Architecture

### Component Hierarchy

```
Application Components (122 total .tsx files)
│
├── Aceternity UI Components (89 components)
│   ├── 3D & Visual Effects
│   │   ├── 3d-card.tsx
│   │   ├── 3d-pin.tsx
│   │   ├── globe.tsx (Three.js + React Three Fiber)
│   │   └── world-map.tsx
│   │
│   ├── Backgrounds & Atmospheres
│   │   ├── aurora-background.tsx
│   │   ├── background-beams.tsx
│   │   ├── background-boxes.tsx
│   │   ├── stars-background.tsx
│   │   ├── sparkles-background.tsx
│   │   └── meteors.tsx
│   │
│   ├── Animations & Effects
│   │   ├── animated-modal.tsx
│   │   ├── animated-testimonials.tsx
│   │   ├── flip-words.tsx
│   │   ├── text-generate-effect.tsx
│   │   ├── spotlight.tsx
│   │   ├── lens.tsx
│   │   └── vortex.tsx
│   │
│   ├── Cards & Grids
│   │   ├── bento-grid.tsx (compound component pattern)
│   │   ├── card-hover-effect.tsx
│   │   ├── card-spotlight.tsx
│   │   ├── focus-cards.tsx
│   │   ├── wobble-card.tsx
│   │   └── parallax-scroll.tsx
│   │
│   ├── Navigation
│   │   ├── floating-navbar.tsx
│   │   ├── sidebar.tsx
│   │   └── resizable-navbar.tsx
│   │
│   ├── Layout & Containers
│   │   ├── timeline.tsx
│   │   ├── tabs.tsx
│   │   ├── container-scroll-animation.tsx
│   │   └── sticky-scroll-reveal.tsx
│   │
│   └── Inputs & Forms
│       ├── file-upload.tsx
│       └── placeholders-and-vanish-input.tsx
│
├── Kaishin Custom Components (14 components)
│   ├── Brand & Navigation
│   │   ├── Navigation.tsx (site-wide nav with mobile support)
│   │   └── Footer.tsx (site footer with links)
│   │
│   ├── Core Visualizations
│   │   ├── PillarIcon.tsx (5 Pillars badge system)
│   │   ├── PillarCard.tsx (Pillar visualization cards)
│   │   ├── CircleProgress.tsx (3-circle progress system)
│   │   └── FiveBodiesVisualizer.tsx (5 Bodies integration visual)
│   │
│   ├── Course Components
│   │   ├── CourseCard.tsx (course display with tier badges)
│   │   └── PopularBadge.tsx (course popularity indicator)
│   │
│   ├── Marketing Components
│   │   ├── LeadMagnetForm.tsx (email capture)
│   │   ├── TestimonialsCarousel.tsx (testimonials display)
│   │   ├── FAQSection.tsx (collapsible FAQ)
│   │   ├── ProblemAmplification.tsx (problem awareness)
│   │   └── RiskReversal.tsx (guarantee display)
│   │
│   └── Utilities
│       ├── PageTransition.tsx (page transition wrapper)
│       ├── Switch.tsx (toggle component)
│       └── Tabs.tsx (tab component)
│
├── Authentication Components (3 components)
│   ├── SignInButton.tsx (OAuth sign-in)
│   ├── SignOutButton.tsx (sign-out action)
│   └── UserAvatar.tsx (user profile picture)
│
└── Course Components (2 components)
    ├── CoursePlayer.tsx (course slide player)
    └── SlideRenderer.tsx (markdown slide rendering)
```

### Component Organization Strategy

#### 1. Aceternity UI Components (`src/components/ui/`)
- **Purpose**: Pre-built, effect-heavy, animated components
- **Pattern**: Self-contained with minimal configuration
- **Technology**: Framer Motion, React Three Fiber, Radix UI
- **Rule**: **NEVER MODIFY**. Treat as external library/vendor code.
- **ESLint**: Directory excluded from linting to preserve vendor code.
- **Usage Example**:
  ```typescript
  import { Spotlight } from '@/components/ui/spotlight';
  import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
  ```

#### 2. Kaishin Custom Components (`src/components/kaishin/`)
- **Purpose**: Project-specific, reusable components aligned with brand identity
- **Pattern**: Composition of Aceternity components + custom logic
- **Export Strategy**: Centralized through `index.ts`
- **Usage Example**:
  ```typescript
  import { Navigation, Footer, CourseCard } from '@/components/kaishin';
  ```
- **Design Philosophy**: Integrate 5 Pillars and 3 Circles methodology into UI

#### 3. Feature-Specific Components
- **`src/components/auth/`**: Authentication-related components
- **`src/components/course/`**: Course player and rendering logic
- **Pattern**: Co-locate components with related functionality

### Component Patterns

#### Compound Component Pattern (Aceternity UI)
```typescript
// BentoGrid usage - parent + children relationship
<BentoGrid className="max-w-7xl mx-auto">
  <BentoGridItem
    title="Mental Pillar"
    description="..."
    header={<PillarIcon type="mental" />}
  />
  <BentoGridItem
    title="Emotional Pillar"
    description="..."
    header={<PillarIcon type="emotional" />}
  />
</BentoGrid>
```

#### Client vs Server Components
- **Client Components**: Use `"use client"` directive
  - When: Browser APIs, useState, useEffect, event handlers, animations
  - Examples: Landing page, member portal layout, forms
- **Server Components**: Default in App Router
  - When: Data fetching, static content, SEO
  - Examples: News/blog pages, content rendering

#### Dynamic Imports (Performance Optimization)
```typescript
// Heavy 3D components loaded on demand
const Globe = dynamic(() => import('@/components/ui/globe').then(m => m.World), {
  ssr: false  // Disable SSR for WebGL components
});
```

---

## Design System

### "The Kaishin Method" Dark Theme

The design system is built on a **pure black foundation** with **subtle gradients** and **accent colors** representing the 5 Pillars and 3 Circles of transformation.

### Color Palette

#### Base Dark Colors (Void to Ash Gradient)
```css
--void: #000000          /* Pure black - main background */
--obsidian: #0a0a0a      /* Near-black - card backgrounds */
--charcoal: #1a1a1a      /* Dark gray - elevated surfaces */
--slate: #262626         /* Medium dark - borders */
--ash: #3a3a3a           /* Light gray - muted elements */
```

#### Zinc Text Scale (Aceternity Pattern)
```css
--zinc-50: #fafafa       /* Brightest text - headings */
--zinc-100: #f4f4f5      /* Bright text - primary content */
--zinc-200: #e4e4e7      /* Light text - secondary content */
--zinc-300: #d4d4d8      /* Medium text - body copy */
--zinc-400: #a1a1aa      /* Muted text - labels */
--zinc-500: #71717a      /* Subdued text - captions */
--zinc-600: #52525b      /* Borders */
--zinc-700: #3f3f46      /* Dark borders */
--zinc-800: #27272a      /* Darker surfaces */
--zinc-900: #18181b      /* Darkest surfaces */
```

#### Accent Colors (5 Pillars Representation)
```css
--ocean-blue: #4fc3f7    /* Primary accent - Water/Flow */
--ocean-blue-dark: #0288d1  /* Darker variant */
--jade: #5dd6ae          /* Growth/Vitality - Physical Pillar */
--plum: #ba68c8          /* Depth/Wisdom - Spiritual Pillar */
--gold: #f2cc8f          /* Illumination/Integration - Mental Pillar */
--rust: #e57373          /* Passion/Energy - Emotional Pillar */
```

#### Theme Mappings (Semantic Colors)
```css
--background: var(--void)            /* Pure black */
--foreground: var(--zinc-50)         /* White text */
--primary: var(--ocean-blue)         /* Primary actions */
--secondary: var(--slate)            /* Secondary surfaces */
--accent: var(--ocean-blue)          /* Interactive elements */
--muted: var(--ash)                  /* Disabled states */
--destructive: var(--rust)           /* Error states */
--border: rgba(255,255,255,0.1)     /* Subtle borders */
```

### Typography System

#### Font Stack
```css
/* Headings: Elegance and Authority */
--font-noto-serif: 'Noto Serif', 'Georgia', serif
  Weights: 300 (light), 400 (regular), 500 (medium)

/* Body: Clarity and Readability */
--font-noto-sans: 'Noto Sans', 'Helvetica Neue', 'Arial', sans-serif
  Weights: 300 (light), 400 (regular), 500 (medium)

/* Japanese Kanji: Brand Element */
--font-noto-serif-jp: 'Noto Serif JP'
  Usage: 心 (heart/mind) kanji in logo

/* Code/Monospace */
--font-geist-mono: 'Geist Mono'
  Usage: Technical content, code blocks
```

#### Typography Scale
```css
/* H1 - Hero Headings */
font-size: clamp(2.25rem, 6vw, 3rem)  /* 36px - 48px */
font-weight: 300
line-height: 1.2
letter-spacing: -0.02em
color: var(--zinc-100)

/* H2 - Section Headings */
font-size: clamp(1.875rem, 5vw, 2.25rem)  /* 30px - 36px */
font-weight: 300
line-height: 1.3
letter-spacing: -0.01em
color: var(--zinc-100)

/* H3 - Sub-Headings */
font-size: clamp(1.5rem, 4vw, 1.875rem)  /* 24px - 30px */
font-weight: 400
line-height: 1.4
color: var(--zinc-100)

/* Body Text */
font-size: 1.0625rem  /* 17px */
font-weight: 350
line-height: 1.8
letter-spacing: 0.02em
color: var(--zinc-300)
```

### Spacing System

```css
--spacing-unit: 0.25rem  /* 4px base */
--space-1: 0.25rem       /* 4px */
--space-2: 0.5rem        /* 8px */
--space-3: 0.75rem       /* 12px */
--space-4: 1rem          /* 16px */
--space-5: 1.25rem       /* 20px */
--space-6: 1.5rem        /* 24px */
--space-8: 2rem          /* 32px */
--space-10: 2.5rem       /* 40px */
--space-12: 3rem         /* 48px */
--space-16: 4rem         /* 64px */
--space-20: 5rem         /* 80px */
--space-24: 6rem         /* 96px */
--space-32: 8rem         /* 128px */

/* Responsive Spacing */
--section-padding: clamp(40px, 8vw, 150px)
--section-padding-mobile: clamp(20px, 6vw, 60px)
--container-padding: clamp(20px, 5vw, 60px)
--nav-height: 80px
--nav-height-mobile: 60px
```

### Animation System

#### Easing Functions
```css
--ease-in-out: cubic-bezier(0.23, 1, 0.320, 1)
--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
```

#### Keyframe Animations
```css
/* Fade In (Content Entry) */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Spotlight (Hero Effect) */
@keyframes spotlight {
  0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
  100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
}

/* Scroll Animation (Marquee) */
@keyframes scroll {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-50% - 0.5rem)); }
}
```

#### Transition Pattern
```css
/* Global Interactive Elements */
a, button, input, textarea, select {
  transition-property: color, background-color, border-color,
                       opacity, box-shadow, transform;
  transition-timing-function: var(--ease-in-out);
  transition-duration: 400ms;
}
```

### Button Visibility Pattern (CRITICAL)

**Problem**: Low-opacity buttons on pure black backgrounds are invisible.

**Solution**: Always use **solid backgrounds** with sufficient contrast:

```typescript
// ✅ CORRECT - Solid background on black
<button className="bg-ocean-blue text-black hover:bg-ocean-blue/90">
  Click Me
</button>

// ✅ CORRECT - Border with fill on hover
<button className="border-2 border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-black">
  Click Me
</button>

// ❌ WRONG - Low opacity on black (invisible)
<button className="bg-ocean-blue/20 text-white">
  Click Me
</button>
```

**Design Rule**: Buttons must have opacity ≥0.9 OR solid borders with hover states.

### Responsive Design

#### Breakpoints (Tailwind Default)
```css
sm: 640px   /* Small devices (landscape phones) */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktops) */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* Ultra-wide displays */
```

#### Mobile-First Strategy
- Base styles target mobile
- Use `md:` and `lg:` prefixes for larger screens
- Typography scales with `clamp()` for fluid sizing

---

## Data Flow Patterns

### 1. Content Flow (File-Based CMS)

```
┌──────────────┐
│   Editor     │
│ (Decap CMS)  │
└──────┬───────┘
       │ GitHub OAuth
       ▼
┌──────────────────┐
│  Git Repository  │
│  content/        │
│   ├─ news/       │
│   ├─ blog/       │
│   ├─ courses/    │
│   └─ pages/      │
└──────┬───────────┘
       │ Build Time
       ▼
┌──────────────────────────┐
│  Content Processing      │
│  • gray-matter (YAML)    │
│  • remark (Markdown→HTML)│
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  getContentByType()      │
│  getContentBySlug()      │
│  getCourseContent()      │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  React Components        │
│  • page.tsx              │
│  • dangerouslySetInnerHTML│
└──────────────────────────┘
```

**Key Functions** (`src/lib/content.ts`):

```typescript
// Fetch all items of a type (news, blog, courses)
async function getContentByType(type: string): Promise<ContentItem[]>
  → Reads from content/{type}/*.md
  → Parses YAML frontmatter with gray-matter
  → Converts markdown to HTML with remark
  → Filters unpublished (published: false)
  → Sorts by date (newest first)

// Fetch single item by slug
async function getContentBySlug(type: string, slug: string): Promise<ContentItem | null>
  → Reads content/{type}/{slug}.md
  → Returns null if not found
  → Used for dynamic routes

// Fetch course by ID
async function getCourseContent(courseId: string): Promise<ParsedCourse | null>
  → Finds course by metadata.id in frontmatter
  → Parses structured course format (chapters, slides)
  → Returns null if not found
```

**ContentItem Interface**:
```typescript
interface ContentItem {
  slug: string;
  frontmatter: {
    title: string;
    date?: string;
    description?: string;
    thumbnail?: string;
    published?: boolean;
    [key: string]: unknown;
  };
  content: string;  // HTML rendered from markdown
}
```

### 2. Static Generation Flow (News/Blog)

```
Build Time:
┌─────────────────────────────────────────────┐
│  generateStaticParams()                     │
│  → Reads all markdown files                 │
│  → Extracts slugs                           │
│  → Returns array of { slug: string }        │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  Next.js Static Site Generation (SSG)       │
│  → Pre-renders page for each slug           │
│  → Outputs static HTML files                │
│  → No runtime database queries              │
└─────────────┬───────────────────────────────┘
              │
              ▼
Request Time:
┌─────────────────────────────────────────────┐
│  Next.js serves pre-rendered HTML           │
│  → Instant page load                        │
│  → No markdown processing                   │
│  → Edge-cached on CDN                       │
└─────────────────────────────────────────────┘
```

**Example Implementation**:
```typescript
// src/app/news/[slug]/page.tsx
export async function generateStaticParams() {
  const items = await getContentByType('news');
  return items.map(item => ({ slug: item.slug }));
}

export default async function NewsArticle({ params }: { params: { slug: string } }) {
  const article = await getContentBySlug('news', params.slug);
  return <div dangerouslySetInnerHTML={{ __html: article.content }} />;
}
```

### 3. Client-Side Rendering Flow (Member Portal)

```
User Navigation (Client-Side):
┌─────────────────────────────────────────────┐
│  User clicks nav link                       │
│  → Next.js Client-Side Navigation           │
│  → No full page reload                      │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  Layout Persists (app/layout.tsx)           │
│  → Sidebar remains mounted                  │
│  → No re-render of shared components        │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  Page Component Mounts                      │
│  → Local state initialized (useState)       │
│  → Context providers supply global state    │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│  UI Renders with Animations                 │
│  → Framer Motion transitions                │
│  → Aceternity effects                       │
└─────────────────────────────────────────────┘
```

### 4. Authentication Data Flow

```
CMS Login Flow:
┌──────────────────────────────────────────────────────┐
│  1. User clicks "Login with GitHub" in Decap CMS     │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  2. CMS opens popup to /api/auth?provider=github     │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  3. Server redirects popup to GitHub OAuth page      │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  4. User authorizes on GitHub                        │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  5. GitHub redirects to /api/callback?code=XXX       │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  6. Callback page sends code via postMessage         │
│     to parent window (CMS)                           │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  7. CMS receives code, calls /api/auth (POST)        │
│     to exchange code for access token                │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  8. Server returns { token, user }                   │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  9. CMS uses token for Git operations                │
│     (create/edit/delete content)                     │
└──────────────────────────────────────────────────────┘

Member Portal Login (NextAuth.js):
┌──────────────────────────────────────────────────────┐
│  1. User visits /app/* route                         │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  2. Middleware checks authentication                 │
│     (middleware.ts)                                  │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  3. If not authenticated, redirect to /auth/signin   │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  4. User chooses provider (Email/Google/GitHub)      │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  5. NextAuth.js handles OAuth flow                   │
│     OR sends magic link via Resend                   │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  6. Session created in Turso database                │
└─────────────┬────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────────┐
│  7. User redirected to /app (dashboard)              │
└──────────────────────────────────────────────────────┘
```

### 5. Database Data Flow (Turso)

```
┌──────────────────┐
│  User Action     │
│  (Sign-in, etc.) │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  NextAuth.js Handler                 │
│  (auth.ts)                           │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Turso Adapter                       │
│  (turso-adapter.ts)                  │
│  • Creates/updates user records      │
│  • Manages sessions                  │
│  • Stores OAuth accounts             │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Turso Database (LibSQL)             │
│  • users table                       │
│  • sessions table                    │
│  • accounts table                    │
│  • verification_tokens table         │
│  • user_profiles table               │
└──────────────────────────────────────┘
```

**Database Schema** (SQLite/LibSQL):
```sql
-- Core NextAuth.js Tables
users (id, name, email, emailVerified, image)
sessions (sessionToken, userId, expires)
accounts (userId, type, provider, providerAccountId, ...)
verification_tokens (identifier, token, expires)

-- Custom Application Tables
user_profiles (id, user_id, created_at, updated_at, ...)
```

---

## Routing Strategy

### Route Types and Rendering Strategies

| Route | Type | Strategy | Rationale |
|-------|------|----------|-----------|
| `/` | Public | SSR (Client Component) | Heavy animations, scroll effects, interactive 3D |
| `/path` | Public | SSR (Client Component) | Interactive content, animations |
| `/program` | Public | SSR (Client Component) | Interactive content, animations |
| `/book` | Public | SSR (Client Component) | Lead capture form |
| `/collective` | Public | SSR (Client Component) | Community page |
| `/news` | Public | SSG | Static content list, SEO important |
| `/news/[slug]` | Public | SSG | Pre-render articles, fast page loads |
| `/blog` | Public | SSG | Static content list, SEO important |
| `/blog/[slug]` | Public | SSG | Pre-render posts, fast page loads |
| `/app/*` | Protected | CSR | User-specific data, real-time updates, requires auth |
| `/app/courses` | Protected | CSR | Course enrollment, progress tracking |
| `/app/courses/[courseId]` | Protected | CSR | Interactive course player |
| `/app/chat` | Protected | CSR | AI chat interface, real-time streaming |
| `/app/profile` | Protected | CSR | User profile, progress visualization |
| `/app/settings` | Protected | CSR | Account management |
| `/app/support` | Protected | CSR | Help & support resources |
| `/auth/signin` | Public | SSR | Sign-in page (redirects if authenticated) |
| `/auth/error` | Public | SSR | Auth error page |
| `/auth/verify-request` | Public | SSR | Email verification message |
| `/admin` | Public | Static HTML | Decap CMS SPA (runs in browser) |
| `/api/auth/*` | API | Server-Side | NextAuth.js handlers |
| `/api/callback` | API | Server-Side | OAuth callback handler |
| `/api/*` | API | Server-Side | Data endpoints |

### File-Based Routing Structure

```
src/app/
├── page.tsx                    → /
├── path/page.tsx               → /path
├── program/page.tsx            → /program
├── book/page.tsx               → /book
├── collective/page.tsx         → /collective
│
├── news/
│   ├── page.tsx                → /news
│   └── [slug]/page.tsx         → /news/:slug
│
├── blog/
│   ├── page.tsx                → /blog
│   └── [slug]/page.tsx         → /blog/:slug
│
├── app/
│   ├── layout.tsx              → Shared layout for all /app/* routes
│   ├── page.tsx                → /app (dashboard)
│   ├── courses/
│   │   ├── page.tsx            → /app/courses
│   │   └── [courseId]/page.tsx → /app/courses/:courseId
│   ├── chat/page.tsx           → /app/chat
│   ├── profile/page.tsx        → /app/profile
│   ├── settings/page.tsx       → /app/settings
│   └── support/page.tsx        → /app/support
│
├── auth/
│   ├── signin/page.tsx         → /auth/signin
│   ├── error/page.tsx          → /auth/error
│   └── verify-request/page.tsx → /auth/verify-request
│
└── api/
    ├── auth/route.ts           → /api/auth (GET, POST)
    ├── callback/route.ts       → /api/callback (GET)
    ├── testimonials/route.ts   → /api/testimonials (GET)
    ├── checkout/route.ts       → /api/checkout (POST)
    ├── leads/route.ts          → /api/leads (POST)
    └── ask/route.ts            → /api/ask (POST)
```

### Dynamic Route Patterns

#### Static Generation with Dynamic Params
```typescript
// src/app/news/[slug]/page.tsx
export async function generateStaticParams() {
  const news = await getContentByType('news');
  return news.map(item => ({ slug: item.slug }));
}

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const article = await getContentBySlug('news', params.slug);
  if (!article) notFound();
  return <Article content={article} />;
}
```

#### Client-Side Dynamic Routes
```typescript
// src/app/app/courses/[courseId]/page.tsx
"use client";
export default function CoursePage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course data on client
    fetch(`/api/courses/${params.courseId}`)
      .then(res => res.json())
      .then(setCourse);
  }, [params.courseId]);

  return <CoursePlayer course={course} />;
}
```

---

## Authentication & Authorization

### NextAuth.js v5 Configuration

**Architecture**: Database-backed sessions with OAuth providers

**Providers**:
1. **Email Magic Links** (Resend)
   - Passwordless authentication
   - Email: `noreply@diamond.oceanheart.ai`
   - Verification page: `/auth/verify-request`

2. **Google OAuth**
   - Client ID: `process.env.AUTH_GOOGLE_ID`
   - Client Secret: `process.env.AUTH_GOOGLE_SECRET`
   - Email account linking: enabled

3. **GitHub OAuth**
   - Client ID: `process.env.AUTH_GITHUB_ID`
   - Client Secret: `process.env.AUTH_GITHUB_SECRET`
   - Email account linking: enabled

### Session Management

```typescript
// auth.ts
session: {
  strategy: "database",        // Sessions stored in Turso
  maxAge: 30 * 24 * 60 * 60,  // 30 days
  updateAge: 24 * 60 * 60,    // Refresh every 24 hours
}
```

**Session Flow**:
1. User signs in via provider
2. NextAuth.js creates user record in `users` table
3. Session token stored in `sessions` table
4. Session cookie sent to browser
5. Middleware validates session on protected routes

### Middleware-Based Route Protection

```typescript
// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    // Protect all routes except:
    // - API routes (except /api/auth)
    // - Static files
    // - Public assets
    // - Admin (Decap CMS)
    "/((?!api/(?!auth)|_next/static|_next/image|favicon.ico|admin).*)",
  ],
};
```

**Protected Routes**:
- `/app/*` - All member portal pages
- Redirects to `/auth/signin` if not authenticated

**Public Routes**:
- `/` - Landing page
- `/path`, `/program`, `/book`, `/collective` - Marketing pages
- `/news/*`, `/blog/*` - Content pages
- `/admin` - Decap CMS (separate auth)

### Custom Pages

```typescript
// auth.ts
pages: {
  signIn: "/auth/signin",           // Custom sign-in page
  error: "/auth/error",             // Auth error page
  verifyRequest: "/auth/verify-request",  // Email sent confirmation
}
```

### Callbacks & Events

```typescript
// auth.ts
callbacks: {
  async session({ session, user }) {
    // Attach user ID to session
    if (session.user) {
      session.user.id = user.id;
    }
    return session;
  },

  async signIn({ user, account, profile }) {
    // Custom sign-in logic (currently allows all)
    return true;
  },
}

events: {
  async createUser({ user }) {
    // Create user profile when new user signs up
    await turso.execute({
      sql: `INSERT INTO user_profiles (id, user_id, created_at, updated_at)
            VALUES (?, ?, ?, ?)`,
      args: [crypto.randomUUID(), user.id, now, now],
    });
  },
}
```

### Usage in Components

```typescript
// Server Component
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  return <div>Welcome {session?.user?.name}</div>;
}

// Client Component
"use client";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return <div>Welcome {session?.user?.name}</div>;
}
```

### Turso Adapter

Custom adapter (`src/lib/turso-adapter.ts`) implements NextAuth.js adapter interface for LibSQL/Turso database. Manages:
- User creation and updates
- Session storage and retrieval
- Account linking (OAuth providers)
- Verification token management

---

## Content Management System

### Decap CMS Architecture

**Pattern**: Git-based CMS with OAuth-protected editing

Decap CMS (formerly Netlify CMS) provides a React-based admin interface for editing content stored in Git.

### Configuration

**Location**: `public/admin/config.yml`

```yaml
backend:
  name: github
  repo: owner/repo              # GitHub repository
  branch: main                  # Target branch
  base_url: http://localhost:3000
  auth_endpoint: api/auth       # Custom OAuth handler

media_folder: "public/uploads"  # Uploaded media destination
public_folder: "/uploads"       # Public URL path
```

### Content Collections

#### 1. News Updates
```yaml
- name: "news"
  label: "News Updates"
  folder: "content/news"
  slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
  fields:
    - {label: "Title", name: "title", widget: "string"}
    - {label: "Date", name: "date", widget: "datetime"}
    - {label: "Featured Image", name: "thumbnail", widget: "image"}
    - {label: "Description", name: "description", widget: "text"}
    - {label: "Body", name: "body", widget: "markdown"}
    - {label: "Tags", name: "tags", widget: "list"}
    - {label: "Published", name: "published", widget: "boolean", default: true}
```

**File Naming**: `content/news/2025-10-02-article-title.md`

#### 2. Blog Posts
```yaml
- name: "blog"
  label: "Blog Posts"
  folder: "content/blog"
  slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
  fields:
    - {label: "Title", name: "title", widget: "string"}
    - {label: "Author", name: "author", widget: "string"}
    - {label: "Date", name: "date", widget: "datetime"}
    - {label: "Featured Image", name: "thumbnail", widget: "image"}
    - {label: "Excerpt", name: "excerpt", widget: "text"}
    - {label: "Body", name: "body", widget: "markdown"}
    - {label: "Categories", name: "categories", widget: "list"}
    - {label: "Tags", name: "tags", widget: "list"}
    - {label: "Published", name: "published", widget: "boolean"}
```

#### 3. Pages (File Collection)
```yaml
- name: "pages"
  label: "Pages"
  files:
    - label: "About Page"
      name: "about"
      file: "content/pages/about.md"
    - label: "Contact Page"
      name: "contact"
      file: "content/pages/contact.md"
```

#### 4. Site Settings (YAML)
```yaml
- name: "settings"
  label: "Site Settings"
  files:
    - label: "General Settings"
      name: "general"
      file: "content/settings/general.yml"
      fields:
        - {label: "Site Title", name: "title", widget: "string"}
        - {label: "Site Description", name: "description", widget: "text"}
        - {label: "Social Media", name: "social", widget: "object"}
```

### CMS Workflow

```
1. Editor accesses /admin (static HTML page)
2. Decap CMS loads from /admin/decap-cms.js
3. OAuth authentication via /api/auth (GitHub)
4. Editor creates/edits content through CMS UI
5. CMS commits changes to GitHub repository
6. Next.js rebuilds pages on next deployment
```

### OAuth Flow for CMS

**API Routes** (`src/app/api/auth/route.ts` and `src/app/api/callback/route.ts`):

```typescript
// GET /api/auth?provider=github
// Redirects to GitHub OAuth page
export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get('provider');
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo,user`;
  return NextResponse.redirect(authUrl);
}

// POST /api/auth
// Exchanges authorization code for access token
export async function POST(request: NextRequest) {
  const { code, provider } = await request.json();
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: JSON.stringify({ client_id, client_secret, code }),
  });
  const { access_token } = await tokenResponse.json();
  const user = await fetchGitHubUser(access_token);
  return NextResponse.json({ token: access_token, user });
}

// GET /api/callback?code=XXX
// Returns HTML page with postMessage to parent window
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  return new Response(`
    <script>
      window.opener.postMessage({ type: 'authorization_response', code: '${code}' }, '*');
      window.close();
    </script>
  `);
}
```

**Security**: OAuth secrets stored in environment variables (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`).

### Prebuild Script

```json
// package.json
"prebuild": "cp node_modules/decap-cms/dist/decap-cms.js public/admin/decap-cms.js"
```

Copies CMS bundle to public directory before build. Required for CMS to function.

---

## State Management

### Strategy: Local State + Context Providers

**No Global State Library**: Redux, Zustand, or Jotai not used. State management is lightweight and co-located.

### 1. Local Component State

**Pattern**: `useState` for UI state within single components

```typescript
// src/app/app/layout.tsx
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// Toggle sidebar on mobile
<button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
  {isSidebarOpen ? <IconX /> : <IconMenu2 />}
</button>
```

**Use Cases**:
- Form inputs
- Modal visibility
- Dropdown/accordion state
- Animation triggers
- Loading states

### 2. React Context Providers

#### ChatContext (`src/contexts/ChatContext.tsx`)
**Purpose**: AI chat state management

```typescript
interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  clearMessages: () => void;
}

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    setIsLoading(true);
    // Call AI API
    const response = await fetch('/api/chat', { body: content });
    const data = await response.json();
    setMessages([...messages, { role: 'user', content }, { role: 'assistant', content: data.message }]);
    setIsLoading(false);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};
```

**Usage**:
```typescript
const { messages, sendMessage, isLoading } = useChatContext();
```

#### CourseContext (`src/contexts/CourseContext.tsx`)
**Purpose**: Course progress tracking

```typescript
interface CourseContextType {
  currentCourse: ParsedCourse | null;
  currentSlide: number;
  progress: number;
  nextSlide: () => void;
  previousSlide: () => void;
  goToSlide: (index: number) => void;
}
```

#### UserContext (`src/contexts/UserContext.tsx`)
**Purpose**: User profile and preferences

```typescript
interface UserContextType {
  profile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  isLoading: boolean;
}
```

### 3. NextAuth.js Session State

**Provider**: `SessionProvider` from NextAuth.js

```typescript
// src/app/layout.tsx
<SessionProvider>
  {children}
</SessionProvider>

// Usage in components
const { data: session, status } = useSession();
```

**Session Data**:
```typescript
session = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  expires: string;
}
```

### 4. URL State (Next.js Router)

**Pattern**: `useSearchParams`, `useRouter`, `usePathname`

```typescript
"use client";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const pathname = usePathname();  // Current route
const router = useRouter();      // Navigation
const searchParams = useSearchParams();  // Query params
```

**Use Cases**:
- Active route highlighting
- Pagination
- Filtering/sorting
- Modal state in URL

### State Management Summary

| State Type | Solution | Scope | Example |
|------------|----------|-------|---------|
| UI State | useState | Component | Sidebar open/closed |
| Chat Messages | ChatContext | App-wide | AI conversation history |
| Course Progress | CourseContext | App-wide | Current slide, completion % |
| User Profile | UserContext | App-wide | Profile data, preferences |
| Authentication | NextAuth SessionProvider | App-wide | User session, auth status |
| Route State | Next.js Router | App-wide | Current route, navigation |
| Content Data | Server Components | Page-level | Markdown content |

---

## API Architecture

### Route Handlers (Next.js 15 App Router)

**Location**: `src/app/api/*/route.ts`

**Pattern**: HTTP methods as named exports

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Handle GET request
  return NextResponse.json({ message: 'Success' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Handle POST request
  return NextResponse.json({ data: body });
}
```

### Current API Endpoints

#### 1. Authentication (`/api/auth/*`)
**Handler**: NextAuth.js built-in handlers

```typescript
// auth.ts exports handlers
export const { handlers, auth, signIn, signOut } = NextAuth(config);

// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

**Endpoints**:
- `GET /api/auth/signin` - Sign-in page
- `POST /api/auth/signin/email` - Email magic link
- `GET /api/auth/callback/google` - Google OAuth callback
- `GET /api/auth/callback/github` - GitHub OAuth callback
- `GET /api/auth/signout` - Sign-out
- `GET /api/auth/session` - Current session data
- `GET /api/auth/csrf` - CSRF token

#### 2. OAuth Callback (`/api/callback`)
**Purpose**: Decap CMS GitHub OAuth callback

```typescript
// src/app/api/callback/route.ts
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');

  // Return HTML with postMessage to parent window
  return new Response(`
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'authorization_response',
              code: '${code}',
              state: '${state}'
            }, '*');
            window.close();
          }
        </script>
      </body>
    </html>
  `);
}
```

#### 3. Testimonials (`/api/testimonials`)
**Purpose**: Fetch testimonials data

```typescript
// src/app/api/testimonials/route.ts
export async function GET() {
  const testimonials = await getTestimonials();
  return NextResponse.json({ testimonials });
}
```

#### 4. Checkout (`/api/checkout`)
**Purpose**: Stripe payment integration

```typescript
// src/app/api/checkout/route.ts
export async function POST(request: NextRequest) {
  const { priceId, userId } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: `${origin}/app/courses?success=true`,
    cancel_url: `${origin}/book?canceled=true`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

#### 5. Leads (`/api/leads`)
**Purpose**: Lead capture (email signup)

```typescript
// src/app/api/leads/route.ts
export async function POST(request: NextRequest) {
  const { email, source } = await request.json();

  // Save to database or send to email service
  await saveLeadToDatabase(email, source);

  return NextResponse.json({ success: true });
}
```

#### 6. Ask (`/api/ask`)
**Purpose**: AI question endpoint (RAG)

```typescript
// src/app/api/ask/route.ts
export async function POST(request: NextRequest) {
  const { question, context } = await request.json();

  const answer = await askClaude(question, context);

  return NextResponse.json({ answer });
}
```

### API Error Handling

```typescript
export async function GET(request: NextRequest) {
  try {
    const data = await fetchData();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

### Environment Variables

**Required**:
```bash
# Authentication
AUTH_GOOGLE_ID=xxx
AUTH_GOOGLE_SECRET=xxx
AUTH_GITHUB_ID=xxx
AUTH_GITHUB_SECRET=xxx
AUTH_RESEND_KEY=xxx
AUTH_SECRET=xxx  # Generated via: openssl rand -base64 32

# Database
TURSO_DATABASE_URL=libsql://xxx.turso.io
TURSO_AUTH_TOKEN=xxx

# Payments
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx

# AI
ANTHROPIC_API_KEY=sk-ant-xxx

# Email
RESEND_API_KEY=re_xxx
```

---

## Performance Patterns

### 1. Dynamic Imports (Code Splitting)

**Pattern**: Load heavy components on demand

```typescript
// src/app/page.tsx
import dynamic from 'next/dynamic';

// Heavy 3D component - load only when needed
const Globe = dynamic(() => import('@/components/ui/globe').then(m => m.World), {
  ssr: false,  // Disable server-side rendering for WebGL
  loading: () => <div>Loading globe...</div>
});

export default function Page() {
  return <Globe />;
}
```

**Use Cases**:
- Three.js/WebGL components (globe, 3d-card)
- Large chart libraries
- Video players
- Rich text editors

### 2. Static Site Generation (SSG)

**Pattern**: Pre-render pages at build time

```typescript
// src/app/news/[slug]/page.tsx
export async function generateStaticParams() {
  const news = await getContentByType('news');
  return news.map(item => ({ slug: item.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getContentBySlug('news', params.slug);
  return <Article article={article} />;
}
```

**Benefits**:
- Instant page loads (no server processing)
- CDN caching
- SEO optimization
- Lower server costs

**Routes Using SSG**:
- `/news/[slug]`
- `/blog/[slug]`

### 3. Image Optimization

**Current State**: Using `<img>` tags (not optimized)

**Recommended Pattern**:
```typescript
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority  // LCP optimization
/>
```

**next.config.ts** already configured for remote images:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
  ],
}
```

### 4. Font Optimization

**Pattern**: next/font with variable fonts

```typescript
// src/app/layout.tsx
import { Noto_Serif, Noto_Sans, Geist_Mono } from "next/font/google";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",  // FOUT prevention
});

<body className={`${notoSerif.variable} ${notoSans.variable}`}>
  {children}
</body>
```

**Benefits**:
- Self-hosted fonts (no external requests)
- Automatic subsetting
- Font loading optimization
- FOUT/FOIT prevention

### 5. Turbopack (Next.js 15)

**Configuration**:
```json
// package.json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build"
  }
}
```

**Benefits**:
- Faster cold starts
- Incremental compilation
- Better tree-shaking
- Improved dev experience

### 6. React 19 Optimizations

**Concurrent Features**:
- Automatic batching
- useTransition for non-urgent updates
- Suspense for data fetching

**Example**:
```typescript
"use client";
import { Suspense } from 'react';

<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

### 7. Vercel Speed Insights

**Integration**:
```typescript
// src/app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

<SpeedInsights />
```

**Monitors**:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to First Byte (TTFB)
- Cumulative Layout Shift (CLS)

### Performance Checklist

- ✅ Turbopack for faster builds
- ✅ next/font for font optimization
- ✅ Dynamic imports for heavy components
- ✅ SSG for static content (news, blog)
- ✅ Speed Insights for monitoring
- ❌ Image optimization (using `<img>` instead of `next/image`)
- ❌ Bundle analysis (not configured)
- ❌ ISR (Incremental Static Regeneration) for content updates

---

## Key Architectural Decisions

### 1. Next.js 15 App Router vs Pages Router

**Decision**: Use App Router

**Rationale**:
- Modern React patterns (Server Components)
- Better performance (streaming SSR)
- Improved routing (nested layouts)
- Future-proof architecture

**Trade-offs**:
- Newer API (fewer examples online)
- Requires understanding client/server boundaries
- Migration path from Pages Router

### 2. File-Based CMS (Decap CMS) vs Headless CMS

**Decision**: Decap CMS with Git-based storage

**Rationale**:
- Version control for content
- No database infrastructure for content
- Easy backups (Git repository)
- Content in codebase (atomic deployments)
- Free (no CMS hosting costs)

**Trade-offs**:
- Limited query capabilities
- No real-time updates (rebuild required)
- Not suitable for high-frequency content
- Editor must understand Git workflow

**Suitable for**: Marketing content, documentation, blog posts
**Not suitable for**: User-generated content, comments, real-time data

### 3. Turso (LibSQL) vs PostgreSQL/MongoDB

**Decision**: Turso for user data, file-based for content

**Rationale**:
- Serverless SQLite (low cost)
- Edge-compatible
- SQL familiarity
- Built-in replication
- Free tier generous (500MB)

**Trade-offs**:
- Smaller ecosystem than Postgres
- Newer technology (less mature)
- Limited advanced features

### 4. NextAuth.js v5 vs Custom Auth

**Decision**: NextAuth.js v5 (beta)

**Rationale**:
- Industry standard
- Multiple providers (email, OAuth)
- Database-backed sessions
- Edge-compatible middleware
- Active maintenance

**Trade-offs**:
- Beta version (breaking changes possible)
- Database required (Turso adapter)
- Complex configuration

### 5. Tailwind CSS 4 Inline Configuration

**Decision**: `@theme inline` in `globals.css` instead of `tailwind.config.js`

**Rationale**:
- Tailwind CSS 4 best practice
- Single source of truth
- Better performance (no config file parsing)
- Easier to maintain CSS variables

**Trade-offs**:
- Non-standard location (harder to find)
- Requires understanding of new syntax
- Migration from v3 required

**Location**: `src/app/globals.css` (lines 7-73)

### 6. Client Components for Landing Page

**Decision**: Use `"use client"` directive for main landing page

**Rationale**:
- Heavy use of animations (Framer Motion)
- Scroll effects and event listeners
- Interactive 3D components (Three.js)
- Complex state management

**Trade-offs**:
- Larger initial JavaScript bundle
- No static optimization for interactive elements
- Slower initial render

**Mitigation**: Dynamic imports with `ssr: false` for heavy 3D components

### 7. Monolithic Landing Page Component

**Current**: 222-line `page.tsx` with all sections inline

**Rationale**:
- Single file shows complete page structure
- Easier to understand page flow
- Less context switching

**Trade-offs**:
- Harder to maintain (large file)
- Difficult to test individual sections
- Reusability limited

**Opportunity**: Extract sections into separate components (`Hero`, `Features`, `Testimonials`, etc.)

### 8. No Global State Management Library

**Decision**: Use React Context + local state instead of Redux/Zustand

**Rationale**:
- Lightweight (no extra dependencies)
- Sufficient for current needs
- Co-located with components
- Simpler mental model

**Trade-offs**:
- Manual context provider setup
- No devtools
- No middleware (thunks, sagas)

**When to add**: When global state becomes complex (many contexts, deep prop drilling)

### 9. Aceternity UI as Vendor Code

**Decision**: Treat `src/components/ui/` as external library (no modifications)

**Rationale**:
- Preserve vendor code integrity
- Easier to update components
- Clear separation from custom code

**Implementation**:
- Excluded from ESLint
- No custom modifications
- Import and use as-is

**Custom UI**: Create in `src/components/kaishin/` or `src/components/`

### 10. Turbopack for Development and Build

**Decision**: Use `--turbopack` flag for both dev and build

**Rationale**:
- Faster builds (especially incremental)
- Improved development experience
- Next.js 15 default (future-proof)
- Better tree-shaking

**Trade-offs**:
- Newer bundler (potential compatibility issues)
- Less mature than Webpack
- Fewer plugins

**Status**: Next.js 15 feature, increasingly stable

---

## Integration Patterns

### 1. Anthropic Claude Integration (AI Chat)

**Library**: `@anthropic-ai/sdk`

**Integration Point**: `src/lib/rag/claude-simple.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function askClaude(question: string, context: string) {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Context: ${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  return message.content[0].text;
}
```

**Usage**:
- `/app/chat` - AI chat interface (Kaishin AI)
- `/api/ask` - Question answering endpoint
- RAG (Retrieval-Augmented Generation) with course content

### 2. Stripe Integration (Payments)

**Library**: `stripe`

**Integration Point**: `src/app/api/checkout/route.ts`

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: `${origin}/app/courses?success=true`,
    cancel_url: `${origin}/book?canceled=true`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

**Client-Side**:
```typescript
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
const { error } = await stripe.redirectToCheckout({ sessionId });
```

### 3. Resend Integration (Email)

**Library**: `resend`

**Integration Point**: NextAuth.js provider configuration

```typescript
// auth.ts
import Resend from "next-auth/providers/resend";

Resend({
  apiKey: process.env.AUTH_RESEND_KEY!,
  from: "noreply@diamond.oceanheart.ai",
})
```

**Use Cases**:
- Email magic links (passwordless auth)
- Transactional emails
- Course notifications

### 4. Turso Database Integration

**Library**: `@libsql/client`

**Integration Point**: `src/lib/turso.ts`

```typescript
import { createClient } from '@libsql/client';

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL || '',
  authToken: process.env.TURSO_AUTH_TOKEN || '',
});

// Usage
const result = await turso.execute({
  sql: 'SELECT * FROM users WHERE id = ?',
  args: [userId],
});
```

**Custom Adapter**: `src/lib/turso-adapter.ts` implements NextAuth.js adapter interface.

### 5. GitHub OAuth Integration (Decap CMS)

**Pattern**: Custom OAuth handlers

**Flow**:
1. Decap CMS initiates OAuth: `GET /api/auth?provider=github`
2. Server redirects to GitHub: `https://github.com/login/oauth/authorize`
3. User authorizes on GitHub
4. GitHub redirects to callback: `GET /api/callback?code=XXX`
5. Callback page sends code via `postMessage` to CMS
6. CMS exchanges code for token: `POST /api/auth` with `{ code, provider }`
7. Server returns `{ token, user }`
8. CMS uses token for Git operations

**Environment Variables**:
```bash
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

### 6. Vercel Deployment Integration

**Platform**: Vercel (optimized for Next.js)

**Configuration**: `vercel.json` (optional, auto-detected)

**Features**:
- Automatic deployments (Git push)
- Edge Functions (middleware)
- Image optimization
- Analytics
- Environment variables (secure)

**Deployment**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 7. Content Processing Pipeline

**Libraries**:
- `gray-matter`: YAML frontmatter parsing
- `remark`: Markdown processing
- `remark-html`: HTML conversion

**Pipeline**:
```
Markdown File → gray-matter → { frontmatter, content }
                                          ↓
                                     remark.process()
                                          ↓
                                      remark-html
                                          ↓
                                    HTML string
                                          ↓
                              dangerouslySetInnerHTML
```

---

## Future Considerations

### Recommended Enhancements

#### 1. Authentication & Authorization (HIGH PRIORITY)

**Current State**: Authentication implemented, but no role-based access control

**Recommendations**:
- Add role field to user table (`role: 'member' | 'admin' | 'editor'`)
- Implement route-level authorization (member-only, admin-only)
- Add course enrollment tracking
- Restrict content access by subscription tier

**Implementation**:
```typescript
// middleware.ts
export default async function middleware(request: NextRequest) {
  const session = await auth();

  if (request.nextUrl.pathname.startsWith('/admin-panel')) {
    if (session?.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/app', request.url));
    }
  }

  return NextResponse.next();
}
```

#### 2. Database Schema Expansion (MEDIUM PRIORITY)

**Current State**: User auth tables only (NextAuth.js schema)

**Recommendations**:
Add tables for:
- Course enrollment and progress
- User achievements/badges
- Chat message history
- Payment/subscription records
- User preferences

**Example Schema**:
```sql
CREATE TABLE course_enrollments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  course_id TEXT NOT NULL,
  enrolled_at INTEGER NOT NULL,
  completed_at INTEGER,
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

CREATE TABLE course_progress (
  id TEXT PRIMARY KEY,
  enrollment_id TEXT NOT NULL REFERENCES course_enrollments(id),
  chapter_id TEXT NOT NULL,
  slide_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at INTEGER,
  UNIQUE(enrollment_id, chapter_id, slide_id)
);
```

#### 3. Image Optimization (HIGH PRIORITY)

**Current State**: Using `<img>` tags (not optimized)

**Recommendations**:
- Replace all `<img>` with `next/image`
- Add image CDN (Vercel Image Optimization included)
- Implement lazy loading
- Use WebP format with fallbacks

**Migration**:
```typescript
// Before
<img src="/images/hero.jpg" alt="Hero" />

// After
<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={630}
  priority
/>
```

#### 4. ISR (Incremental Static Regeneration) (MEDIUM PRIORITY)

**Current State**: SSG for news/blog (rebuild required for updates)

**Recommendations**:
- Enable ISR for content pages
- Auto-regenerate on content changes
- Cache invalidation strategy

**Implementation**:
```typescript
// src/app/news/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function Page({ params }: { params: { slug: string } }) {
  const article = await getContentBySlug('news', params.slug);
  return <Article article={article} />;
}
```

#### 5. API Layer Expansion (MEDIUM PRIORITY)

**Current State**: Basic API routes for auth and checkout

**Recommendations**:
Create comprehensive API layer:
- `/api/courses` - Course catalog and enrollment
- `/api/progress` - User progress tracking
- `/api/chat` - AI chat with streaming support
- `/api/profile` - User profile management
- `/api/achievements` - Badge/achievement system

**Pattern**:
```typescript
// src/app/api/courses/route.ts
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const courses = await getAllCourses();
  const enrollments = await getUserEnrollments(session.user.id);

  return NextResponse.json({ courses, enrollments });
}
```

#### 6. Testing Infrastructure (HIGH PRIORITY)

**Current State**: No tests

**Recommendations**:
- **Unit Tests**: Vitest for utilities and business logic
- **Component Tests**: React Testing Library
- **E2E Tests**: Playwright for critical user flows
- **API Tests**: Vitest or Supertest

**Setup**:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom playwright
```

```typescript
// src/lib/__tests__/content.test.ts
import { describe, it, expect } from 'vitest';
import { getContentByType } from '../content';

describe('getContentByType', () => {
  it('returns published content only', async () => {
    const news = await getContentByType('news');
    expect(news.every(item => item.frontmatter.published !== false)).toBe(true);
  });
});
```

#### 7. Monitoring & Analytics (MEDIUM PRIORITY)

**Current State**: Vercel Speed Insights only

**Recommendations**:
- **Error Tracking**: Sentry for error monitoring
- **Analytics**: Plausible or Vercel Analytics for user behavior
- **Performance Monitoring**: Web Vitals tracking
- **API Logging**: Structured logging for API routes

**Sentry Integration**:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### 8. Content Search & Filtering (LOW PRIORITY)

**Current State**: No search functionality

**Recommendations**:
- Add full-text search for courses and content
- Filter by category, pillar, circle
- Search suggestions/autocomplete

**Options**:
- Client-side: Fuse.js (lightweight fuzzy search)
- Server-side: Turso FTS5 (full-text search)
- External: Algolia or Meilisearch

#### 9. Progressive Web App (PWA) (LOW PRIORITY)

**Recommendations**:
- Add service worker for offline support
- Manifest for "Add to Home Screen"
- Cache-first strategy for static assets
- Background sync for course progress

**Implementation**:
```bash
npm install next-pwa
```

```typescript
// next.config.ts
import withPWA from 'next-pwa';

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});
```

#### 10. Component Library Documentation (LOW PRIORITY)

**Current State**: No component documentation

**Recommendations**:
- Add Storybook for component showcase
- Document Kaishin component usage
- Create design system documentation
- Interactive component playground

**Setup**:
```bash
npx storybook@latest init
```

---

## Appendix A: Quick Start Guide

### Development Setup

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd pheonix.oceanheart.ai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   # Opens http://localhost:3003
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Common Tasks

#### Add a New Page
```typescript
// 1. Create src/app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>;
}

// 2. Add to navigation (if needed)
// src/components/kaishin/Navigation.tsx
```

#### Add a New API Endpoint
```typescript
// src/app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Success' });
}
```

#### Create Content
1. Access `/admin` in browser
2. Sign in with GitHub
3. Create new content item
4. Publish
5. Rebuild site: `npm run build`

---

## Appendix B: Environment Variables Reference

### Required for Development

```bash
# Authentication (NextAuth.js)
AUTH_SECRET=xxx                    # Generate: openssl rand -base64 32
AUTH_GOOGLE_ID=xxx
AUTH_GOOGLE_SECRET=xxx
AUTH_GITHUB_ID=xxx
AUTH_GITHUB_SECRET=xxx
AUTH_RESEND_KEY=xxx

# Database (Turso)
TURSO_DATABASE_URL=libsql://xxx.turso.io
TURSO_AUTH_TOKEN=xxx

# Decap CMS (GitHub OAuth)
GITHUB_CLIENT_ID=xxx               # Can reuse AUTH_GITHUB_ID
GITHUB_CLIENT_SECRET=xxx           # Can reuse AUTH_GITHUB_SECRET

# AI (Anthropic Claude)
ANTHROPIC_API_KEY=sk-ant-xxx

# Payments (Stripe)
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLIC_KEY=pk_test_xxx      # Prefix with NEXT_PUBLIC_ for client access

# Email (Resend)
RESEND_API_KEY=re_xxx
```

### Optional for Production

```bash
# Sentry (Error Tracking)
SENTRY_DSN=xxx
SENTRY_ORG=xxx
SENTRY_PROJECT=xxx

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-xxx
```

---

## Appendix C: File Naming Conventions

### Components
- **Aceternity UI**: PascalCase (e.g., `BentoGrid.tsx`)
- **Kaishin Custom**: PascalCase (e.g., `CourseCard.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)

### Routes
- **Pages**: `page.tsx` (lowercase)
- **Layouts**: `layout.tsx` (lowercase)
- **API Routes**: `route.ts` (lowercase)

### Content
- **News/Blog**: `YYYY-MM-DD-slug.md` (e.g., `2025-10-02-article-title.md`)
- **Pages**: `name.md` (e.g., `about.md`)
- **Settings**: `name.yml` (e.g., `general.yml`)

---

## Appendix D: Key Commands Reference

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run lint:next        # Run Next.js linter

# Database
npm run db:migrate       # Run database migrations

# Testing
npm run test:auth        # Test authentication setup

# Deployment (Vercel)
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
```

---

## Document Metadata

**Created**: October 2, 2025
**Author**: Architecture Documentation Team
**Next Review**: January 2, 2026 (Quarterly)
**Related Documents**:
- `/CLAUDE.md` - Development guide for Claude Code
- `/README.md` - Project overview and setup
- `/TRANSFORMATION_STATUS.md` - Migration tracking

**Change Log**:
- v1.0 (2025-10-02): Initial architecture documentation
