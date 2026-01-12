# Oceanheart-Phoenix Website Integration

## Product Requirements Document

**Version:** 1.0
**Date:** October 4, 2025
**Author:** Architecture Team
**Status:** Proposal for Review

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Architectural Approach Comparison](#architectural-approach-comparison)
4. [Recommended Approach](#recommended-approach)
5. [Information Architecture](#information-architecture)
6. [Technical Stack Decisions](#technical-stack-decisions)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Risk Assessment & Mitigation](#risk-assessment--mitigation)
9. [Success Metrics](#success-metrics)
10. [Open Questions & Decisions](#open-questions--decisions)

---

## Executive Summary

### Problem Statement

We currently maintain two separate Next.js websites:
1. **oceanheart-ui** - Original portfolio/services site with blog, consulting, and experimental features
2. **pheonix.oceanheart.ai** - New Kaishin Method branded site with member portal and courses

This creates:
- Duplicate infrastructure and maintenance overhead
- Split user experience
- Fragmented content strategy
- Inconsistent branding

### Proposed Solution

**Unify both sites using pheonix.oceanheart.ai as the foundation**, migrating valuable features from oceanheart-ui while preserving the modern tech stack, superior UX, and established Kaishin Method branding.

### Key Goals

1. **Unified Homepage** - Single entry point showcasing The Kaishin Method
2. **Portfolio Integration** - Professional work showcase
3. **Marketing Platform** - Advertisement for programs, books, and services
4. **Content Hub** - Consolidated blog with rich categorization
5. **Member Portal** - Protected access to courses and AI chat

### Timeline

**10-12 weeks** for complete integration across 6 phases

### Investment

- **Development:** 8-10 weeks engineering effort
- **Design:** 2-3 weeks UX/visual design
- **Content:** 1-2 weeks migration and editorial review
- **QA:** 1 week testing and validation

---

## Current State Analysis

### oceanheart-ui (Original Site)

**Tech Stack:**
- Next.js 14 with App Router
- Supabase (Auth + PostgreSQL database)
- DaisyUI, Framer Motion
- Port 4444

**Features:**
- ✅ Landing page with Hero, TwoPathways, BigHeartBigTech sections
- ✅ About page
- ✅ Blog system with categories and author support
- ✅ Consulting services page
- ✅ Somatic Bournemouth (local somatic practice)
- ✅ HDI (Human Digital Interface) experimental section
  - AudioPlayer component
  - TerminalEmulation component
  - CountdownTimer component
- ✅ Portfolio page (professional work showcase)
- ✅ SynAI page
- ✅ Privacy Policy / Terms of Service
- ✅ Stripe payment integration
- ✅ Resend email service
- ✅ OpenAI API integration

**Strengths:**
- Full-featured blog with category/author taxonomy
- Established Supabase infrastructure
- Professional portfolio section
- Experimental HDI features

**Weaknesses:**
- Older Next.js version (14 vs 15)
- DaisyUI vs modern Aceternity components
- No CMS for content management
- Supabase vendor lock-in

---

### pheonix.oceanheart.ai (New Site)

**Tech Stack:**
- Next.js 15 with App Router
- React 19, Turbopack
- Aceternity UI (89 pre-built animated components)
- NextAuth.js v5 for authentication
- Turso (LibSQL) database
- Decap CMS (Git-based content management)
- Port 3003

**Features:**
- ✅ Landing page with The Kaishin Method branding
  - View, Compass, Ground pillars
  - Pure black theme with gold/ocean-blue accents
- ✅ Member portal (/app/*) with authentication
  - Dashboard with user stats
  - Courses system
  - DiamondMindAI chat (Claude via Anthropic)
  - Profile management
  - Settings
  - Support resources
- ✅ The Path, Program, Book, Collective narrative pages
- ✅ News section with Decap CMS
- ✅ Basic blog structure
- ✅ Authentication flows (Email magic link, Google, GitHub OAuth)

**Strengths:**
- Modern tech stack (Next.js 15, React 19, Turbopack)
- Superior UX with Aceternity components (3D effects, animations)
- Established Kaishin Method branding and visual identity
- Decap CMS for Git-based content management
- Clean architecture foundation
- Better performance patterns

**Weaknesses:**
- Blog system less feature-rich than oceanheart (no categories/authors)
- No portfolio section
- Missing consulting/services pages
- No experimental features like HDI

---

### Feature Comparison Matrix

| Feature | oceanheart-ui | pheonix.oceanheart.ai | Integration Strategy |
|---------|---------------|----------------------|---------------------|
| **Modern Tech Stack** | ⚠️ Next.js 14 | ✅ Next.js 15 + React 19 | Use phoenix |
| **Visual Design** | DaisyUI | ✅ Aceternity UI (89 components) | Use phoenix |
| **Branding** | Generic | ✅ Kaishin Method | Use phoenix |
| **Content Management** | ❌ None | ✅ Decap CMS | Enhance phoenix CMS |
| **Blog System** | ✅ Full (categories, authors) | ⚠️ Basic | Migrate & enhance |
| **Portfolio** | ✅ Professional showcase | ❌ Missing | Port to phoenix |
| **Consulting Services** | ✅ Dedicated page | ❌ Missing | Port to phoenix |
| **Somatic Practice** | ✅ Local offering | ❌ Missing | Port to phoenix |
| **HDI Experimental** | ✅ AudioPlayer, Terminal, Countdown | ❌ Missing | Port to phoenix |
| **SynAI** | ✅ Dedicated page | ❌ Missing | Port to phoenix |
| **Member Portal** | ❌ Missing | ✅ Full portal with courses | Keep in phoenix |
| **AI Chat** | OpenAI | ✅ Claude (Anthropic) | Keep Claude |
| **Authentication** | Supabase Auth | ✅ NextAuth.js v5 | Migrate users |
| **Database** | Supabase PostgreSQL | ✅ Turso LibSQL | Migrate data |
| **Payment** | Stripe | Stripe | Unified |

**Key Insight:** Phoenix has the superior foundation (tech, UX, branding). Oceanheart has richer content features and portfolio. Integration preserves the best of both.

---

## Architectural Approach Comparison

We evaluated four distinct approaches for unifying the sites. Each has different trade-offs in terms of effort, risk, and long-term value.

### Approach 1: Phoenix as Primary (⭐ RECOMMENDED)

**Strategy:** Use pheonix.oceanheart.ai as the foundation and migrate unique oceanheart-ui features as new routes.

**Architecture:**
```
pheonix.oceanheart.ai (Unified Site)
├─ / (Landing) - Kaishin Method homepage
├─ The Kaishin Method
│  ├─ /path, /program, /book, /collective
├─ Services
│  ├─ /consulting (NEW from oceanheart)
│  └─ /somatic (NEW from oceanheart)
├─ /portfolio (NEW from oceanheart)
├─ /blog (ENHANCED with categories/authors)
├─ /news
├─ Experimental
│  ├─ /hdi (NEW from oceanheart)
│  └─ /synai (NEW from oceanheart)
└─ /app/* - Member Portal (KEEP)
```

**Technical Changes:**
- Enhance Decap CMS config for categories, authors, tags
- Create new routes: /portfolio, /consulting, /somatic, /hdi, /synai
- Port HDI React components (AudioPlayer, TerminalEmulation, CountdownTimer)
- Migrate blog content from oceanheart to markdown files
- Migrate user accounts from Supabase Auth → NextAuth.js
- Migrate essential data from Supabase PostgreSQL → Turso

**Pros:**
- ✅ Modern tech stack (Next.js 15, React 19, Turbopack)
- ✅ Superior UX with Aceternity components
- ✅ Established Kaishin branding
- ✅ Single codebase for maintenance
- ✅ Git-based content management with Decap CMS
- ✅ All features preserved

**Cons:**
- ⚠️ Medium-high migration complexity (auth, database)
- ⚠️ 10-12 week timeline
- ⚠️ User disruption during auth migration
- ⚠️ Requires careful content migration

**Timeline:** 10-12 weeks
**Risk Level:** Medium-High (but manageable)

---

### Approach 2: Dual-Site Strategy

**Strategy:** Maintain both sites independently with cross-linking and shared authentication.

**Architecture:**
```
pheonix.oceanheart.ai
├─ Kaishin Method program
├─ Courses & member portal
└─ The Path/Program/Book/Collective

oceanheart.ai (separate site)
├─ Portfolio
├─ Consulting
├─ Blog
└─ HDI experiments
```

**Technical Changes:**
- Implement SSO bridge between sites
- Shared session via JWT/cookies
- Cross-site navigation links
- Minimal refactoring

**Pros:**
- ✅ Minimal refactoring effort
- ✅ Fast implementation (2-3 weeks)
- ✅ Independent deployment
- ✅ No data migration

**Cons:**
- ❌ Split user experience (confusing)
- ❌ Duplicate infrastructure costs
- ❌ Dual maintenance overhead
- ❌ Inconsistent branding across sites
- ❌ SEO challenges (duplicate content risks)
- ❌ Complex session management

**Timeline:** 2-3 weeks
**Risk Level:** Low (but poor long-term value)

---

### Approach 3: Oceanheart as Primary

**Strategy:** Use oceanheart-ui as foundation and migrate phoenix features to it.

**Architecture:**
```
oceanheart.ai (as primary site)
├─ Upgrade to Next.js 15
├─ Integrate 89 Aceternity components
├─ Complete rebrand to Kaishin Method
├─ Migrate Decap CMS, Turso, NextAuth
└─ Port member portal and courses
```

**Technical Changes:**
- Upgrade oceanheart from Next.js 14 → 15
- Install and configure all 89 Aceternity UI components
- Rebrand entire site to Kaishin Method aesthetic
- Migrate from Supabase → Turso + NextAuth (backwards!)
- Port member portal features

**Pros:**
- ✅ Keeps existing Supabase infrastructure
- ✅ No user migration needed

**Cons:**
- ❌ Massive refactoring effort
- ❌ Loses modern UI advances
- ❌ Backwards migration (Turso → Supabase)
- ❌ Complete rebrand required
- ❌ Very long timeline (16-20 weeks)
- ❌ High risk of regressions

**Timeline:** 16-20 weeks
**Risk Level:** Very High (not recommended)

---

### Approach 4: Hybrid Portal Architecture

**Strategy:** Phoenix as marketing site, oceanheart content via subdomain or /legacy routes, with progressive migration.

**Architecture:**
```
pheonix.oceanheart.ai (primary)
├─ Kaishin Method marketing
└─ Member portal

legacy.oceanheart.ai OR /legacy/*
├─ Portfolio
├─ Blog archive
├─ HDI experiments
└─ Progressive migration to main site
```

**Technical Changes:**
- Smart routing between sites
- Gradual migration of features
- Dual infrastructure during transition
- Complex redirect management

**Pros:**
- ✅ Gradual transition
- ✅ Feature preservation during migration
- ⚠️ Moderate effort

**Cons:**
- ❌ Complex routing logic
- ❌ Potential user confusion
- ❌ Dual maintenance during transition
- ⚠️ Long transition period
- ❌ SEO complications

**Timeline:** 8-10 weeks
**Risk Level:** Medium-High

---

### Decision Matrix

| Criteria | Approach 1 (Phoenix Primary) | Approach 2 (Dual Site) | Approach 3 (Oceanheart Primary) | Approach 4 (Hybrid Portal) |
|----------|------------------------------|------------------------|----------------------------------|----------------------------|
| **Tech Stack Modernity** | ✅ Next.js 15, React 19 | ⚠️ Split | ❌ Requires major upgrade | ⚠️ Complex |
| **UX Consistency** | ✅ Unified Aceternity | ❌ Split experience | ❌ Major rebrand needed | ⚠️ Potential confusion |
| **Maintenance Overhead** | ✅ Single codebase | ❌ Dual maintenance | ⚠️ High migration cost | ❌ Complex routing |
| **Migration Complexity** | ⚠️ Medium-High | ✅ Low | ❌ Very High | ❌ High |
| **Feature Preservation** | ✅ All features | ✅ All features | ✅ All features | ⚠️ Requires smart routing |
| **Timeline** | ⚠️ 10-12 weeks | ✅ 2-3 weeks | ❌ 16-20 weeks | ⚠️ 8-10 weeks |
| **Long-term Scalability** | ✅ Excellent | ❌ Poor | ⚠️ Good if migrated | ⚠️ Moderate |
| **SEO Preservation** | ✅ With 301 redirects | ❌ Split authority | ⚠️ If migrated | ⚠️ Complex |
| **Cost (Infrastructure)** | ✅ Single deployment | ❌ Dual hosting | ✅ Single deployment | ❌ Dual during transition |

**Score:**
- **Approach 1:** 6 ✅, 2 ⚠️, 0 ❌ = **WINNER**
- Approach 4: 0 ✅, 4 ⚠️, 2 ❌
- Approach 2: 2 ✅, 1 ⚠️, 3 ❌
- Approach 3: 2 ✅, 2 ⚠️, 3 ❌

---

## Recommended Approach

### Approach 1: Phoenix as Primary Foundation

**Rationale:**

Approach 1 provides the optimal balance of:
1. **Modern Foundation** - Leverages Next.js 15, React 19, and Turbopack
2. **Superior UX** - Aceternity UI components provide world-class animations and effects
3. **Brand Coherence** - Established Kaishin Method visual identity
4. **Single Codebase** - Reduced maintenance overhead
5. **Feature Completeness** - All valuable features from both sites preserved
6. **Long-term Value** - Scalable architecture for future growth

While the migration complexity is medium-high, the challenges (auth migration, database consolidation, content migration) are well-understood and have clear mitigation strategies.

**Expert Validation:**

The expert analysis confirms this approach, noting:
> "Your breakdown of the two applications and the decision to use `pheonix.oceanheart.ai` as the foundational codebase is spot on. It leverages the more modern stack and superior UX, which is the correct long-term strategic move."

The expert emphasizes front-loading the highest-risk tasks (auth and database audits) in Phase 0 to provide early feedback on project viability.

---

## Information Architecture

### Site Structure

```
pheonix.oceanheart.ai (Unified Site)
│
├─ PUBLIC MARKETING
│  ├─ / (Landing)
│  │  └─ Kaishin Method hero + View/Compass/Ground pillars showcase
│  │
│  ├─ The Kaishin Method
│  │  ├─ /path - The methodology explanation
│  │  ├─ /program - 90-day transformation program details
│  │  ├─ /book - Book landing page & purchase
│  │  └─ /collective - Community information
│  │
│  ├─ Services
│  │  ├─ /consulting - Professional consulting services (NEW)
│  │  └─ /somatic - Somatic practice sessions (NEW, rebrand from "Bournemouth")
│  │
│  ├─ /portfolio - Professional work showcase (NEW)
│  │  └─ Uses BentoGrid, CardHoverEffect for project displays
│  │
│  ├─ /blog - Unified blog system (ENHANCED)
│  │  ├─ Categories: ACT Psychology, Zen, Somatic, Integration, etc.
│  │  ├─ Authors: Author pages with bio, avatar, social links
│  │  ├─ Tags: Cross-referencing system
│  │  ├─ /blog/[slug] - Individual posts
│  │  ├─ /blog/category/[category] - Category views
│  │  └─ /blog/author/[author] - Author views
│  │
│  ├─ /news - Updates & announcements (Decap CMS)
│  │  └─ /news/[slug]
│  │
│  ├─ /about - About page (consolidate from both sites)
│  │
│  └─ Experimental (Footer navigation)
│     ├─ /hdi - Human Digital Interface (NEW)
│     │  └─ AudioPlayer, TerminalEmulation, CountdownTimer components
│     └─ /synai - SynAI project information (NEW)
│
└─ MEMBER PORTAL (Protected by NextAuth)
   └─ /app/*
      ├─ /app (Dashboard)
      │  └─ User stats, progress tracking, upcoming sessions
      ├─ /app/courses
      │  └─ Course catalog, enrollment, individual courses
      ├─ /app/chat
      │  └─ DiamondMindAI (Claude via Anthropic)
      ├─ /app/profile
      │  └─ User profile and progress visualization
      ├─ /app/settings
      │  └─ Account settings
      └─ /app/support
         └─ Help & support resources
```

---

### Navigation Design

#### Top Navigation (Public Pages)

**Desktop:**
```
Logo | Home | The Path ▾ | Services ▾ | Portfolio | Blog | [Member Portal CTA]
```

**Dropdowns:**
- **The Path** ▾
  - The Methodology
  - Program (90-Day)
  - Book
  - Collective

- **Services** ▾
  - Consulting
  - Somatic Sessions

**Footer Navigation (Secondary):**
- About
- News
- HDI Experiments
- SynAI
- Privacy Policy
- Terms of Service

**Mobile:**
- Hamburger menu with priority order:
  1. Home
  2. Program
  3. Services
  4. Blog
  5. Portfolio
  6. Member Portal (CTA)

#### Member Portal Navigation (Sidebar)

**Desktop Sidebar (Fixed):**
```
Logo
━━━━━━━━━━━━━
📊 Dashboard
📚 Courses
🧠 DiamondMindAI
👤 Profile
⚙️  Settings
❓ Support
━━━━━━━━━━━━━
[Logout Button]
```

**Mobile:**
- Drawer navigation with backdrop
- Collapsible menu icon
- Same structure as desktop

---

### Content Strategy

#### 1. Unified Blog System

**Enhancements to Decap CMS:**
- Add **author** collection with:
  - Name, bio (markdown)
  - Avatar image
  - Social links (Twitter, LinkedIn, etc.)

- Add **category** taxonomy:
  - ACT Psychology
  - Zen & Non-Duality
  - Somatic Work
  - Integration & Practice
  - Personal Development
  - etc.

- Add **tag** system for cross-referencing

- Update **blog** collection fields:
  - Title, author (relation), date
  - Featured image, excerpt, reading time
  - Body (markdown)
  - Categories (list), tags (list)
  - Published status (boolean)

**Visual Design:**
- Grid layout using Aceternity `CardHoverEffect`
- Featured posts highlighted with `CardSpotlight`
- Category badges with Kaishin color scheme
- Author cards with avatars

**Migration:**
- Export existing oceanheart blog posts
- Convert to markdown with proper frontmatter
- Assign authors, categories, tags
- Verify image links
- Spot-check formatting

#### 2. Portfolio Section

**Structure:**
- Asymmetric grid using Aceternity `BentoGrid`
- Featured projects use `3DCard` or `CardSpotlight`
- Filter by category (Web Dev, AI, Design, Consulting, etc.)
- Case study detail pages

**Content:**
- Project title, client (if applicable)
- Hero image, tech stack
- Challenge, solution, outcome
- Results/metrics
- Screenshots/mockups
- Link to live project (if public)

#### 3. HDI Integration

**Philosophy:** Maintain experimental, cutting-edge nature

**Visual Design:**
- Use `BackgroundBeams` or `Spotlight` for atmosphere
- Adapt components to Kaishin dark theme (pure black bg, ocean-blue accents)
- Preserve interactivity and novel UI concepts

**Components to Port:**
- AudioPlayer
- TerminalEmulation
- CountdownTimer
- Any other HDI-specific features

---

### Homepage Design Philosophy

**Hero Section:**
- Headline: "Stop Chasing Fragments. Master the Whole."
- Subheadline: 90-day transformation, 5 bodies integration
- Primary CTA: "Start Your Journey"
- Secondary CTA: "Read the Book"

**Three Pillars Showcase:**
- `LayoutGrid` with asymmetric layout
- View (Zen & Non-Duality)
- Compass (ACT Psychology)
- Ground (Somatic Work)

**Quick Links:**
- Book CTA with cover image
- Program overview teaser
- Portfolio highlight (1-2 featured projects)

**Testimonials:**
- `TestimonialsCarousel` component
- Authentic user stories
- Photos, names, transformations

**Latest Blog Posts:**
- 3-card preview with thumbnails
- "Read More on the Blog" CTA

**Newsletter / Lead Magnet:**
- Email capture form
- Free resource download (e.g., "5 Practices to Ground Your Day")

**Footer:**
- Full navigation tree
- Social media links
- Legal (Privacy, ToS)

---

## Technical Stack Decisions

### Final Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 15.5.3 | Latest, Turbopack support, React 19 |
| **React** | React 19.1.0 | Latest with concurrent features |
| **Bundler** | Turbopack | Faster builds, Next.js 15 default |
| **Styling** | Tailwind CSS 4 | Inline config, design system |
| **UI Components** | Aceternity UI (89 components) + Kaishin custom | World-class animations, branding |
| **CMS** | Decap CMS (Enhanced) | Git-based, version control |
| **Authentication** | NextAuth.js v5 | Industry standard, flexible |
| **Database** | Turso (LibSQL) | Serverless SQLite, edge-compatible |
| **AI** | Anthropic Claude | DiamondMindAI chat |
| **Payments** | Stripe | Already integrated, unified |
| **Email** | Resend | Consolidate on one service |
| **Deployment** | Vercel | Optimized for Next.js |
| **Package Manager** | npm | Phoenix standard |

---

### Migration Decisions

#### Authentication: Supabase Auth → NextAuth.js

**Chosen Strategy: Hard Cutover**

**Process:**
1. Export user data from Supabase `auth.users` table
2. Transform to NextAuth schema (`users`, `accounts` tables)
3. Import to Turso database
4. Force password reset for email/password users on first login
5. Social login users (Google, GitHub) seamless via provider ID matching

**Rationale:**
- Simpler to implement than dual-auth bridge
- More secure (no handling of raw passwords between systems)
- Clean break from old system
- Higher user friction but manageable with communication

**Communication Plan:**
- Email campaign 2 weeks before migration
- Explain benefits (single sign-on, enhanced security)
- Provide support resources
- Grace period for users to reset passwords

---

#### Database: Supabase PostgreSQL → Turso LibSQL

**Critical Investigation Required:**

Before finalizing migration plan, we must:

1. **Schema Audit:**
   - Identify all tables using PostgreSQL `jsonb` columns
   - Document data structures stored in JSON
   - Analyze queries using Postgres-specific JSON operators (`@>`, `?`, `->>`)

2. **Compatibility Assessment:**
   - Determine if libSQL JSON support is sufficient
   - Identify queries that need rewriting
   - Plan for application-layer workarounds if needed

**Migration Strategy:**
1. Schema mapping (Postgres types → libSQL equivalent)
2. Data export scripts with validation
3. Import to Turso with integrity checks
4. **Dual-write period:** Write to both databases during testing
5. Cutover and Supabase deprecation

**Rollback Plan:**
- Maintain Supabase backup for 30 days
- Ability to revert DNS if critical issues arise

---

#### Content: Manual/CMS → Decap CMS

**Blog Migration:**
1. Export oceanheart blog posts
2. Convert HTML/database format → markdown files
3. Add frontmatter (title, author, date, categories, tags)
4. Place in `content/blog/` directory
5. Commit to Git repository

**Validation:**
- Automated script for bulk conversion
- Manual spot-checking for formatting issues
- Link verification (images, internal links)

---

## Implementation Roadmap

### Phase 0: Pre-work & Decision Making (1 week)

**Critical Discoveries:**

- [ ] **Domain Strategy:** Decide if unified site lives at `oceanheart.ai` or new domain
  - **Recommendation:** Use `oceanheart.ai` for brand consistency
  - Impact: All DNS, SEO, redirect planning

- [ ] **Database Schema Audit:**
  - Identify all `jsonb` columns in Supabase
  - Document query patterns using JSON operators
  - Assess libSQL compatibility
  - **Critical Gate:** Project viability depends on migration feasibility

- [ ] **HDI Component Dependency Analysis:**
  - Audit network requests from AudioPlayer, TerminalEmulation, CountdownTimer
  - Check for Supabase Realtime, Storage, or custom Postgres function dependencies
  - Determine if porting is UI-only or full-stack refactor

- [ ] **URL Mapping Spreadsheet:**
  - Create comprehensive mapping of every oceanheart URL → new URL
  - This becomes the blueprint for 301 redirects
  - Critical for SEO preservation

**Deliverables:**
- Domain decision documented
- Schema audit report
- HDI dependency map
- URL mapping spreadsheet (Google Sheets or CSV)

---

### Phase 1: Foundational Migration (3-4 weeks)

**Setup:**
- [ ] Create `feature/unification` branch in phoenix repo
- [ ] Set up staging Turso database for testing

**Authentication Migration:**
- [ ] **Spike:** Implement user migration scripts
  - Export from Supabase Auth
  - Transform to NextAuth schema
  - Import to staging Turso
- [ ] Test login flows:
  - Password-reset users
  - Google OAuth users
  - GitHub OAuth users
  - Email magic link users
- [ ] **Critical Gate:** Auth migration must work before proceeding

**Content Migration:**
- [ ] Configure Decap CMS for enhanced blog system
  - Add author collection
  - Add category/tag taxonomy
  - Update blog collection schema
- [ ] Script blog post export from oceanheart
- [ ] Convert to markdown with frontmatter
- [ ] Import to `content/blog/`
- [ ] Spot-check 10-20 posts manually

**Information Architecture Scaffolding:**
- [ ] Create placeholder pages:
  - `/portfolio/page.tsx`
  - `/consulting/page.tsx`
  - `/somatic/page.tsx`
  - `/hdi/layout.tsx` + `page.tsx`
  - `/synai/page.tsx`
- [ ] Update `Navigation` component with new menu structure
- [ ] Implement dropdown menus

**Deliverables:**
- Working auth migration scripts
- Enhanced Decap CMS configuration
- Migrated blog content (markdown files)
- Placeholder pages for all new routes
- Updated navigation

---

### Phase 2: Feature Implementation & Styling (4-5 weeks)

**Static Pages:**
- [ ] Rebuild About page (consolidate from both sites)
- [ ] Create Consulting services page
  - Use Aceternity cards for service offerings
  - CTA for booking/contact
- [ ] Create Somatic Sessions page (rebrand from "Bournemouth")
  - Explain somatic practice
  - Location information
  - Booking/contact CTA

**Portfolio Section:**
- [ ] Design portfolio layout
  - Asymmetric `BentoGrid` for projects
  - Featured projects with `3DCard` or `CardSpotlight`
- [ ] Implement category filtering
- [ ] Create project detail page template
- [ ] Migrate portfolio content
  - Write/edit project descriptions
  - Gather images, screenshots
  - Add tech stack, metrics

**HDI Component Porting:**
- [ ] Refactor AudioPlayer component
  - Adapt to Next.js 15 patterns
  - Style with Kaishin theme (black bg, ocean-blue accents)
  - Connect to new backend (if dependencies found)
- [ ] Refactor TerminalEmulation component
  - Same process as AudioPlayer
- [ ] Refactor CountdownTimer component
  - Same process as AudioPlayer
- [ ] Create `/hdi` page layout
  - Use `BackgroundBeams` or `Spotlight` for atmosphere
  - Integrate ported components
  - Maintain experimental aesthetic

**Blog Integration:**
- [ ] Wire up migrated markdown content with UI
- [ ] Implement category pages (`/blog/category/[category]`)
- [ ] Implement author pages (`/blog/author/[author]`)
- [ ] Design blog post detail page
  - Featured image, author card
  - Reading time, category badges
  - Social sharing buttons
- [ ] Create blog index with filtering
  - Category filter
  - Search (future enhancement)

**SynAI Page:**
- [ ] Port SynAI content
- [ ] Style with Aceternity components
- [ ] Add to footer navigation

**Deliverables:**
- All ported pages functional and styled
- HDI components working in new environment
- Blog fully integrated with categories/authors
- Portfolio section complete

---

### Phase 3: Testing, SEO & Go-Live Prep (2 weeks)

**301 Redirects:**
- [ ] Implement all redirects in `next.config.ts` using URL mapping
  - Example:
    ```typescript
    module.exports = {
      async redirects() {
        return [
          {
            source: '/old-blog-post',
            destination: '/blog/new-blog-post',
            permanent: true, // 301
          },
          // ... hundreds more
        ];
      },
    };
    ```
- [ ] Test each redirect manually (spot-check)
- [ ] Use redirect testing tool (e.g., httpstatus.io)

**End-to-End QA:**
- [ ] **User Flow Testing:**
  - New user signup (all providers)
  - Existing user login (migrated account)
  - Password reset flow
  - Course enrollment
  - AI chat interaction
  - Profile updates
  - Payment flow (Stripe)

- [ ] **Content Verification:**
  - All blog posts render correctly
  - Images load properly
  - Internal links work
  - Category/author pages functional
  - Portfolio projects display correctly

- [ ] **Cross-Browser Testing:**
  - Chrome, Firefox, Safari, Edge
  - Mobile browsers (iOS Safari, Chrome Mobile)

- [ ] **Responsive Testing:**
  - Mobile (375px, 414px)
  - Tablet (768px, 1024px)
  - Desktop (1280px, 1920px, 2560px)

**Performance Optimization:**
- [ ] Run Lighthouse audits (target 90+ scores)
  - Performance
  - Accessibility
  - Best Practices
  - SEO
- [ ] Optimize images (convert to WebP, next/image)
- [ ] Code splitting review
- [ ] Bundle size analysis

**Accessibility Audit:**
- [ ] WCAG 2.1 AA compliance check
  - Keyboard navigation
  - Screen reader testing (NVDA, VoiceOver)
  - Color contrast ratios
  - Alt text for images
  - Form labels and error messages

**SEO Checklist:**
- [ ] Meta tags (title, description) for all pages
- [ ] Open Graph tags for social sharing
- [ ] Sitemap generation (next-sitemap)
- [ ] robots.txt configuration
- [ ] Google Search Console setup
- [ ] Google Analytics migration

**Deliverables:**
- All 301 redirects implemented and tested
- QA report with all tests passing
- Lighthouse scores 90+
- Accessibility compliance documentation
- SEO checklist completed

---

### Phase 4: Go-Live (1 week)

**Pre-Deployment:**
- [ ] **Final Data Migration:**
  - Run final user export from Supabase
  - Import to production Turso database
  - Validate user count matches

- [ ] **Backup Strategy:**
  - Full Supabase database dump (keep for 30 days)
  - Code repository backup (Git tag: `v1.0-pre-migration`)

- [ ] **Environment Variables:**
  - Set all production env vars in Vercel
  - Test in Vercel preview deployment

**Deployment:**
- [ ] Deploy to Vercel production
- [ ] DNS changes (if needed for domain strategy)
- [ ] Monitor error logs (Vercel, Sentry if configured)
- [ ] Load testing (simulate user traffic)

**Post-Deployment:**
- [ ] Send user communication email
  - Announce new site
  - Explain password reset (if applicable)
  - Highlight new features
  - Provide support contact

- [ ] Monitor for 48 hours:
  - Error rates
  - User feedback
  - Login success rates
  - Page load times

**Rollback Plan:**
- [ ] If critical issues arise:
  - Revert DNS to oceanheart-ui
  - Keep phoenix deployment active for debugging
  - Investigate and fix issues
  - Redeploy when stable

**Deliverables:**
- Production site live
- User communication sent
- Monitoring dashboards active
- Support team briefed

---

### Phase 5: Post-Launch Optimization (Ongoing)

**Week 1-2:**
- [ ] User feedback collection
- [ ] Bug fix priority queue
- [ ] Performance monitoring (Core Web Vitals)

**Week 3-4:**
- [ ] Implement user-requested features
- [ ] Optimize based on analytics (heatmaps, user flows)
- [ ] Content updates based on feedback

**Future Enhancements:**
- [ ] Blog search functionality
- [ ] Newsletter integration (Mailchimp, ConvertKit)
- [ ] Advanced course features (video, quizzes)
- [ ] Community forum
- [ ] Mobile app (React Native or PWA)

---

## Risk Assessment & Mitigation

### Critical Risks (HIGH)

#### 1. Authentication Migration

**Risk:** User disruption, login failures, account lockouts

**Impact:**
- User frustration and churn
- Support ticket volume spike
- Negative reviews/feedback

**Likelihood:** Medium-High (auth migrations are complex)

**Mitigation:**
- **Pre-Migration:**
  - Email campaign 2 weeks before (explain benefits, set expectations)
  - Create detailed FAQ
  - Test with beta user group (10-20 volunteer users)

- **During Migration:**
  - Dual-auth bridge period (1 week) if feasible
  - Real-time monitoring of login success rates
  - Support team on standby

- **Post-Migration:**
  - Grace period for password resets (no account lockouts for 7 days)
  - Automated support emails for failed logins
  - Escalation path for complex issues

**Contingency:**
- If >10% of users unable to login within 24 hours:
  - Implement emergency dual-auth bridge
  - Extend grace period
  - Personal outreach to affected users

---

#### 2. Database Migration

**Risk:** Data loss, data corruption, query failures

**Impact:**
- User data loss (catastrophic)
- Application instability
- Rollback to old system

**Likelihood:** Medium (schema differences, JSON handling)

**Mitigation:**
- **Schema Audit (Phase 0):**
  - Comprehensive audit of all Supabase tables
  - Document all `jsonb` columns and usage
  - Test libSQL JSON compatibility

- **Migration Testing:**
  - Dry-run migration on staging environment
  - Validate data integrity (row counts, checksums)
  - Test all application queries against new schema

- **Dual-Write Period:**
  - Write to both Supabase and Turso for 3-7 days
  - Compare results for discrepancies
  - Gradual cutover (read from Turso, write to both)

- **Backup:**
  - Full Supabase dump before migration
  - Keep Supabase instance read-only for 30 days
  - Ability to revert within 48 hours

**Contingency:**
- If data integrity issues detected:
  - Halt migration immediately
  - Revert to Supabase for reads
  - Debug and fix schema mapping
  - Re-run migration with fixed scripts

---

### Medium Risks (MEDIUM)

#### 3. Content Migration

**Risk:** Broken links, missing images, formatting issues

**Impact:**
- Poor user experience (404 errors)
- SEO penalties
- Content quality degradation

**Likelihood:** Medium (depends on content volume and complexity)

**Mitigation:**
- **Automated Migration:**
  - Script to convert blog posts
  - Link validation tool
  - Image path verification

- **Manual Review:**
  - Spot-check 10-20% of migrated content
  - Prioritize high-traffic pages
  - Editorial review for formatting

- **Post-Migration Monitoring:**
  - 404 error tracking (Google Search Console)
  - Broken link checker (weekly)
  - User-reported issues tracked

**Contingency:**
- If >5% of content has issues:
  - Pause migration
  - Increase manual review percentage
  - Fix issues before proceeding

---

#### 4. SEO Impact

**Risk:** Traffic loss due to URL changes, broken redirects

**Impact:**
- Organic search traffic decline
- Brand visibility loss
- Revenue impact (if traffic-dependent)

**Likelihood:** Medium (URL changes, redirect misconfigurations)

**Mitigation:**
- **Comprehensive 301 Redirects:**
  - URL mapping spreadsheet (all old URLs → new URLs)
  - Test every redirect
  - Redirect chains avoided (old → new, not old → intermediate → new)

- **Google Search Console:**
  - Submit new sitemap
  - Monitor crawl errors
  - Track search performance metrics

- **Gradual Migration:**
  - Redirect high-traffic pages first
  - Monitor for 1 week before proceeding

**Contingency:**
- If >20% traffic drop within 2 weeks:
  - Audit all redirects
  - Identify and fix broken redirects
  - Submit recrawl requests in Search Console
  - Consider temporary canonical tags

---

### Low Risks (LOW)

#### 5. Component Style Reconciliation

**Risk:** Visual inconsistencies, broken UI

**Impact:**
- Brand dilution
- User confusion
- Design system fragmentation

**Likelihood:** Low (well-defined Kaishin theme)

**Mitigation:**
- Design system documentation
- Style guide for Aceternity component usage
- Visual QA review before deployment

---

#### 6. HDI Component Dependencies

**Risk:** Backend dependencies not identified, components broken

**Impact:**
- HDI features non-functional
- Experimental section unavailable

**Likelihood:** Low-Medium (depends on audit findings)

**Mitigation:**
- Comprehensive dependency audit in Phase 0
- Early spike to test ported components
- Fallback: Disable HDI section if critical issues

**Contingency:**
- If HDI porting infeasible:
  - Keep HDI on separate subdomain (hdi.oceanheart.ai)
  - Link from main site
  - Migrate later as Phase 6 project

---

## Success Metrics

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Zero Data Loss** | 100% user data migrated | Row count comparison, checksum validation |
| **Login Success Rate** | >95% within 7 days | Authentication logs, Vercel analytics |
| **Lighthouse Performance Score** | ≥90 | Lighthouse audits (desktop + mobile) |
| **Lighthouse Accessibility Score** | ≥90 | WCAG 2.1 AA compliance |
| **Lighthouse SEO Score** | ≥90 | Meta tags, sitemap, robots.txt |
| **Lighthouse Best Practices Score** | ≥90 | Security, HTTPS, console errors |
| **Page Load Time (LCP)** | <2.5s | Core Web Vitals, Vercel Speed Insights |
| **Cumulative Layout Shift (CLS)** | <0.1 | Core Web Vitals |
| **First Input Delay (FID)** | <100ms | Core Web Vitals |
| **404 Error Rate** | <1% of page views | Google Search Console, Vercel logs |
| **Redirect Success Rate** | 100% | Manual testing, automated redirect checker |

---

### User Experience Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **User Satisfaction** | ≥4/5 stars | Post-migration survey |
| **Support Ticket Volume** | <5% increase | Support system tracking |
| **Time on Site** | +10% vs baseline | Google Analytics |
| **Bounce Rate** | -10% vs baseline | Google Analytics |
| **Pages per Session** | +15% vs baseline | Google Analytics |

---

### Business Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Organic Search Traffic** | ≥95% of baseline (within 30 days) | Google Analytics, Search Console |
| **Blog Engagement** | +20% (comments, shares, time on page) | Analytics, social media tracking |
| **Course Enrollments** | No decrease | Member portal analytics |
| **Book Sales** | No decrease | Stripe dashboard |
| **Email Signups** | +25% (improved lead magnets) | Email service provider (Resend) |

---

### Timeline Adherence

| Phase | Target | Measurement |
|-------|--------|-------------|
| **Phase 0 (Pre-work)** | 1 week | Project plan |
| **Phase 1 (Foundation)** | 3-4 weeks | Sprint tracking |
| **Phase 2 (Implementation)** | 4-5 weeks | Sprint tracking |
| **Phase 3 (Testing)** | 2 weeks | QA checklist |
| **Phase 4 (Go-Live)** | 1 week | Deployment log |
| **Total Timeline** | 10-12 weeks | Project roadmap |

---

## Open Questions & Decisions

### Domain Strategy

**Question:** Should the unified site live at `oceanheart.ai` or a new domain?

**Options:**
1. **oceanheart.ai** (Recommended)
   - Pros: Brand consistency, existing SEO authority, simpler migration
   - Cons: Requires DNS changes, potential downtime

2. **kaishinmethod.com** (New Domain)
   - Pros: Fresh start, clear branding
   - Cons: No SEO authority, additional cost, user confusion

3. **diamond.oceanheart.ai** (Subdomain)
   - Pros: Keeps oceanheart brand, no DNS changes to main domain
   - Cons: Subdomain SEO implications, longer URL

**Recommendation:** Use `oceanheart.ai` for brand consistency and SEO preservation.

**Decision Needed By:** Phase 0, Week 1

---

### Blog vs News Separation

**Question:** Should we keep separate `/blog` and `/news` sections, or merge them?

**Options:**
1. **Keep Separate** (Recommended)
   - `/blog` - Long-form articles (1000+ words), evergreen content, SEO-focused
   - `/news` - Short updates (200-500 words), announcements, timely content
   - Pros: Clear content strategy, different reading experiences
   - Cons: Potential user confusion

2. **Merge into Single `/blog`**
   - Use "News" as a category within the blog
   - Pros: Simpler navigation, single content hub
   - Cons: Mixing content types, harder to highlight updates

**Recommendation:** Keep separate, but add clear descriptions on each section.

**Decision Needed By:** Phase 1, Week 2

---

### Somatic Bournemouth Branding

**Question:** How should we handle the localized "Somatic Bournemouth" service?

**Options:**
1. **Rebrand as "Somatic Sessions"**
   - Add location information in body copy
   - Pros: Aligns with global Kaishin brand
   - Cons: Loses local SEO value

2. **Keep "Somatic Bournemouth"**
   - Separate landing page for local SEO
   - Pros: Preserves local search rankings
   - Cons: Doesn't fit global brand

3. **Create Location-Aware Service Pages**
   - `/somatic` as general page
   - `/somatic/bournemouth` for local variant
   - Pros: Scalable for multiple locations, preserves SEO
   - Cons: More complex structure

**Recommendation:** Option 3 - scalable and SEO-friendly.

**Decision Needed By:** Phase 2, Week 1

---

### HDI Future

**Question:** What is the long-term vision for the HDI experimental section?

**Options:**
1. **Maintain as Experiment**
   - Keep minimal, low-priority maintenance
   - Showcase innovation

2. **Expand into Product**
   - Invest in HDI as a standalone offering
   - Build out features, user testing

3. **Archive/Deprecate**
   - Document learnings
   - Sunset the project

**Recommendation:** TBD - requires stakeholder discussion.

**Decision Needed By:** Phase 2, Week 3

---

### User Count & Blog Post Volume

**Question:** How many users and blog posts need to be migrated?

**Action Required:**
- Query Supabase database for exact user count
- Count blog posts in oceanheart-ui

**Impact:**
- User count affects auth migration complexity
- Blog post count affects content migration effort

**Decision Needed By:** Phase 0, Week 1

---

## Appendix A: Expert Analysis Highlights

The expert analysis (from gemini-2.5-pro via thinkdeep) provided the following key insights:

### 1. Front-Load Risk

> "This plan front-loads the highest-risk tasks to provide early feedback on project viability and timelines."

**Implication:** Phase 0 discoveries (schema audit, HDI dependencies) are **critical gates**. If these reveal blockers, the project timeline or approach must be re-evaluated.

---

### 2. Hard Cutover for Auth

> "The suggestion of a 'dual-auth bridge' is a valid pattern, but it introduces significant complexity. Let's refine the options and their trade-offs."

**Expert Recommendation:** Hard cutover with password reset is simpler and more secure.

**Implication:** Accept short-term user friction in exchange for long-term simplicity.

---

### 3. Database Schema Investigation

> "You correctly flagged the Postgres JSONB vs. libSQL JSON support. This needs a specific investigation."

**Action Items:**
- Identify all `jsonb` columns
- Document query patterns using JSON operators
- Assess libSQL compatibility or plan rewrites

**Implication:** This is a **critical discovery task** that could reveal unexpected complexity.

---

### 4. HDI Dependency Audit

> "These 'Human-Device Interface' components may have backend dependencies on Supabase for more than just data storage (e.g., real-time features for a terminal session, streaming audio from storage)."

**Action Items:**
- Audit network requests from HDI components
- Check for Supabase Realtime, Storage, or custom Postgres functions
- Determine if this is a UI port or full-stack refactor

**Implication:** HDI migration could be more complex than anticipated.

---

### 5. Phased Execution Plan

The expert validated our phased approach and added depth to Phase 0:

**Phase 0 Additions:**
- Domain strategy decision
- Schema & component audits
- URL mapping spreadsheet

These are **non-negotiable prerequisites** for Phases 1-4.

---

## Appendix B: Reference Materials

### Relevant Files

**oceanheart-ui:**
- `/Users/richardhallett/Documents/code/diamond-heart.ai/oceanheart-ui/README.md`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/oceanheart-ui/app/page.tsx`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/oceanheart-ui/app/blog/_assets/content.tsx`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/oceanheart-ui/app/hdi/page.tsx`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/oceanheart-ui/components/Header.tsx`

**pheonix.oceanheart.ai:**
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/README.md`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/ARCHITECTURE.md`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/src/app/page.tsx`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/src/app/blog/page.tsx`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/src/components/kaishin/Navigation.tsx`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/auth.ts`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/src/lib/turso.ts`
- `/Users/richardhallett/Documents/code/diamond-heart.ai/pheonix.oceanheart.ai/public/admin/config.yml`

---

## Conclusion

This PRD outlines a comprehensive plan to unify `oceanheart-ui` and `pheonix.oceanheart.ai` into a single, modern platform that serves as:

1. **Homepage** - Kaishin Method landing page
2. **Portfolio** - Professional work showcase
3. **Marketing Platform** - Program, book, and service advertisement
4. **Content Hub** - Unified blog with rich features
5. **Member Portal** - Protected courses and AI chat

**Recommended Approach:** Approach 1 (Phoenix as Primary) provides the optimal balance of modern technology, superior UX, brand coherence, and feature completeness.

**Timeline:** 10-12 weeks across 6 phases, with **Phase 0 critical discoveries** determining final project viability.

**Next Steps:**
1. **Stakeholder Review** - Approve overall approach and timeline
2. **Phase 0 Kickoff** - Begin audits and decision-making
3. **Go/No-Go Gate** - After Phase 0, confirm project viability based on audit findings

---

**Document Control:**
- **Version:** 1.0
- **Last Updated:** October 4, 2025
- **Next Review:** After Phase 0 completion
- **Approvals Required:** Product Owner, Tech Lead, Design Lead
