# Becoming Diamond

**Premium Coaching & Personal Development Platform**
*(Client Project)*

---

## 1. Overview

**Becoming Diamond** is a production coaching and personal development platform featuring a public marketing site with advanced animations, a protected member portal, and integrated content management. The platform combines cutting-edge UI/UX with robust authentication and content workflows.

The application delivers:

* **Immersive landing experience** with 3D visualizations and advanced animations
* **Protected member portal** with dashboard, courses, AI chat, and profile management
* **Git-based content management** via Decap CMS with GitHub OAuth
* **Server-side and client-side rendering** for optimal performance
* **Premium design system** using Aceternity UI components

The site is live at [diamond.oceanheart.ai](https://diamond.oceanheart.ai)

---

## 2. Key Features

* **Next.js 15 App Router** with React 19 and Turbopack
* **Aceternity UI components** – 89 pre-built animated components
* **3D visualizations** using React Three Fiber and Three.js Globe
* **Framer Motion animations** throughout the interface
* **Protected routes** for member-only content
* **GitHub OAuth integration** via Decap CMS
* **Markdown-based content** with frontmatter and rich formatting
* **Member dashboard** with progress tracking and course access
* **DiamondMindAI chat** interface for coaching interactions
* **Tailwind CSS 4** with inline theme configuration

---

## 3. Tech Stack

| Layer      | Technology                          | Notes                                             |
| ---------- | ----------------------------------- | ------------------------------------------------- |
| Framework  | **Next.js 15.5.3**                  | App Router with React 19, Turbopack               |
| UI Library | **Aceternity UI**                   | 89 pre-built animated components                  |
| Animation  | **Framer Motion**                   | Advanced animation orchestration                  |
| 3D         | **React Three Fiber**, **Three.js** | WebGL-based 3D visualizations                     |
| Styling    | **Tailwind CSS 4**                  | Inline theme config in globals.css                |
| CMS        | **Decap CMS**                       | Git-based content management                      |
| Auth       | **GitHub OAuth**                    | For CMS access and member authentication          |
| Content    | **Gray-matter**, **Remark**         | Markdown processing with frontmatter              |
| Deployment | **Vercel**                          | Edge deployment with serverless functions         |
| Icons      | **Tabler Icons**, **Lucide React**  | Comprehensive icon libraries                      |

---

## 4. Architecture Overview

### Hybrid Rendering Strategy

* **Public pages** (landing, news): Server-side rendered (SSR) and statically generated (SSG)
* **Member portal** (`/app/*`): Client-side rendered (CSR) with protected routes
* **CMS integration**: Static HTML with JavaScript-based OAuth flow

### Layered Architecture

1. **Presentation Layer**: React Server/Client Components with Aceternity UI
2. **Business Logic Layer**: Content processing, authentication flows
3. **Data Layer**: File-based CMS (markdown) + GitHub OAuth
4. **Infrastructure Layer**: Next.js 15 with Turbopack, deployed on Vercel

---

## 5. Project Structure

### Core Directories

* **`src/app/`** – Next.js App Router pages and API routes
  * `page.tsx` – Public landing page with advanced animations
  * `app/` – Protected member portal with shared layout
  * `news/` – Dynamic routes for blog/news content
  * `auth/` – Authentication pages and OAuth flow
  * `api/` – API Route Handlers for backend operations
* **`src/components/ui/`** – 89 Aceternity UI components (vendor code, excluded from linting)
* **`src/lib/`** – Utility functions and service integrations
  * `content.ts` – Content management API
  * `utils.ts` – Tailwind class merging utility (`cn`)
* **`content/`** – Git-based content storage (markdown files)
  * `news/`, `blog/`, `pages/`, `settings/`
* **`public/admin/`** – Decap CMS admin interface
  * `config.yml` – CMS configuration
  * `index.html` – CMS entry point

---

## 6. Landing Page Architecture

### Component Type: Client Component

The main landing page demonstrates advanced React patterns:

* **Dynamic Imports**: Heavy 3D components loaded with `next/dynamic` for code-splitting
  ```typescript
  const World = dynamic(() => import("@/components/ui/globe").then(m => m.World), { ssr: false });
  ```
* **Performance Optimization**: `ssr: false` prevents server-side rendering of WebGL components
* **Scroll-based State**: `useEffect` with scroll event listener for navbar state
* **Framer Motion**: Extensive animation orchestration

### Page Sections

1. **Hero** with Spotlight effect and gradient text
2. **BentoGrid** feature showcase
3. **Timeline** component showing program phases
4. **Animated testimonials** with card effects
5. **3D Globe visualization** with arc animations
6. **Background effects** (BackgroundBeams, Aurora)

---

## 7. Member Portal

### Protected Route Structure

**Layout** (`/app/*/layout.tsx`):

* Fixed sidebar navigation (desktop)
* Mobile drawer navigation with backdrop
* Active route highlighting using `usePathname()`
* Consistent black theme with diamond blue accents

**Navigation Items**:

* Dashboard (`/app`) – User stats and progress tracking
* Courses (`/app/courses`) – Course catalog and enrollment
* DiamondMindAI (`/app/chat`) – AI coaching chat interface
* Profile (`/app/profile`) – User profile and progress
* Settings (`/app/settings`) – Account settings
* Support (`/app/support`) – Help resources

### Design System

* **Pure black theme**: `--background: #000000`
* **Diamond blue accent**: `--primary: #4fc3f7`
* **Gradient backgrounds**: With blur effects
* **Glass morphism**: Subtle transparency and backdrop blur

---

## 8. Content Management System

### Decap CMS Integration

* **Storage**: Git-based (markdown files in repository)
* **Backend**: GitHub (commits pushed to repository)
* **Authentication**: GitHub OAuth via custom API routes
* **Access**: `/admin` route (static HTML)

### Content Collections

* **news/** – News updates with date, thumbnail, tags, published status
* **blog/** – Blog posts with author, categories, tags
* **pages/** – Static pages (about, contact)
* **settings/** – Site configuration (YAML format)

### Content API (`src/lib/content.ts`)

* `getContentByType(type: string)` – Fetches all content of a type
* `getContentBySlug(type: string, slug: string)` – Fetches single content item
* Automatic filtering of unpublished items
* Auto-sorting by date (newest first)
* Markdown to HTML conversion with remark

---

## 9. Authentication Flow

### GitHub OAuth Pattern

**API Routes**:

1. **`/api/auth` (GET)** – OAuth Initiation
   - Redirects to GitHub authorization URL
   - Includes client_id, redirect_uri, scope (repo, user)

2. **`/api/auth` (POST)** – Token Exchange
   - Exchanges authorization code for access token
   - Fetches user info from GitHub API
   - Returns token and user data

3. **`/api/callback` (GET)** – OAuth Callback Handler
   - Returns HTML page with postMessage script
   - Communicates authorization code to CMS opener window

**Flow**:

```
CMS Login → OAuth Popup → GitHub Authorization → Callback
                ↓                                    ↓
         postMessage to parent ← Token exchange (POST)
                ↓
         GitHub API Token → CMS Git Operations
```

---

## 10. Aceternity UI Components

### Component Library

89 pre-built components organized into categories:

1. **3D Components**: 3d-card, 3d-pin, globe, world-map
2. **Backgrounds**: aurora, background-beams, background-boxes, sparkles, stars
3. **Animations**: animated-modal, flip-words, text-generate-effect, typewriter-effect
4. **Cards**: bento-grid, card-hover-effect, card-spotlight, focus-cards, wobble-card
5. **Navigation**: floating-navbar, sidebar, resizable-navbar
6. **Effects**: spotlight, lens, vortex, meteors, shooting-stars
7. **Inputs**: file-upload, placeholders-and-vanish-input
8. **Layout**: timeline, tabs, container-scroll-animation, sticky-scroll-reveal

### Usage Pattern

* Import directly: `import { Component } from '@/components/ui/component'`
* Treat as external library (do not modify)
* Use dynamic imports for heavy 3D components
* Some components require client-side rendering

---

## 11. Performance Optimization

### Code Splitting

* Dynamic imports for WebGL components
* Route-based code splitting via App Router
* Lazy loading for below-fold content

### Rendering Strategy

| Route          | Strategy                   | Rationale                              |
| -------------- | -------------------------- | -------------------------------------- |
| `/`            | SSR (Client Component)     | Interactive animations, scroll effects |
| `/news`        | SSG (Static Generation)    | Content rarely changes, SEO important  |
| `/news/[slug]` | SSG with ISR potential     | Pre-render all articles                |
| `/app/*`       | CSR (Client-Side)          | Protected content, user-specific data  |
| `/admin`       | Static HTML                | Decap CMS single-page application      |
| `/api/*`       | Server-Side                | API endpoints, OAuth handlers          |

### Asset Optimization

* **CSS-in-JS**: Tailwind with minimal runtime overhead
* **Font optimization**: Using next/font (Geist Sans, Geist Mono)
* **Image optimization**: Next.js automatic image optimization (recommended upgrade)

---

## 12. Development Workflow

### Common Commands

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev

# Build for production (Turbopack)
npm run build

# Start production server
npm start

# Linting
npm run lint         # ESLint
npm run lint:fix     # Auto-fix
npm run lint:next    # Next.js linter
```

### Pre-build Hook

The `prebuild` script automatically copies Decap CMS assets:

```bash
cp node_modules/decap-cms/dist/decap-cms.js public/admin/decap-cms.js
```

---

## 13. Data Flow Architecture

### Content Flow

```
Editor → Decap CMS UI → GitHub OAuth → Git Commit → Repository
                                                        ↓
Build → getContentByType() → gray-matter → remark → HTML → React Components → User
```

### Static Generation Flow

```
Build Time:
  → generateStaticParams() reads markdown files
  → Creates static routes for each slug
  → Pre-renders pages with content
  → Outputs static HTML

Request Time:
  → Next.js serves pre-rendered HTML
  → No database queries needed
```

---

## 14. Tailwind CSS 4 Configuration

### Inline Theme Syntax

Located in `src/app/globals.css`:

```css
@theme inline {
  --color-primary: #4fc3f7;
  --color-background: #000000;
  /* ... more theme variables */
}
```

This replaces the traditional `tailwind.config.js` file, following Tailwind CSS 4 best practices.

---

## 15. Mobile Responsiveness

### Responsive Breakpoints

* **Mobile**: Default styles
* **sm**: 640px
* **md**: 768px
* **lg**: 1024px
* **xl**: 1280px

### Mobile Optimizations

* Mobile menu with drawer navigation
* Touch-optimized interactive elements
* Responsive grid layouts
* Scaled typography with clamp()
* Optimized 3D component loading

---

## 16. Security Considerations

* **OAuth secrets**: Stored in environment variables
* **Origin validation**: In postMessage handlers
* **XSS protection**: React's automatic escaping
* **Environment variables**: Never committed to Git
* **Content Security**: Git-based CMS prevents SQL injection

---

## 17. Testing Strategy

### Recommended Testing Approach

* **Unit tests**: Vitest or Jest for utility functions
* **Component tests**: React Testing Library
* **E2E tests**: Playwright or Cypress
* **API tests**: Supertest or Vitest

---

## 18. Deployment

### Vercel Configuration

* **Build command**: `npm run build`
* **Output directory**: `.next/`
* **Node version**: Automatic detection
* **Environment variables**: Managed through Vercel dashboard

### Required Environment Variables

* `GITHUB_CLIENT_ID` – For Decap CMS OAuth
* `GITHUB_CLIENT_SECRET` – For Decap CMS OAuth
* `NEXT_PUBLIC_SITE_URL` – Base URL for the application

---

## 19. Future Enhancements

### Recommended Improvements

1. **Authentication & Authorization**
   - Implement NextAuth.js for member authentication
   - Add middleware for route protection
   - Store user sessions securely

2. **Database Integration**
   - Add database for user data (PostgreSQL, MongoDB)
   - Store user progress, course enrollment, chat history
   - Consider Prisma ORM for type-safe database access

3. **API Layer Expansion**
   - Implement REST or GraphQL API for member features
   - Add API authentication (JWT, session tokens)
   - Create endpoints for courses, progress, chat

4. **State Management**
   - Add Zustand or Jotai for global state
   - Store user profile, preferences, UI state

5. **Performance**
   - Replace `<img>` with `next/image`
   - Implement ISR for news pages
   - Add loading skeletons for async content

6. **Monitoring & Analytics**
   - Add error tracking (Sentry)
   - Implement analytics (Plausible, Vercel Analytics)
   - Add performance monitoring

---

## 20. Project Impact

Becoming Diamond demonstrates:

* **Next-generation UI/UX**: Advanced animations and 3D visualizations
* **Modern React patterns**: Server/Client Components, App Router
* **Scalable architecture**: File-based CMS with edge deployment
* **Premium design execution**: Aceternity UI integration
* **Performance-first approach**: Code-splitting and optimized rendering
* **Content management flexibility**: Git-based workflow for non-technical users

---

## 21. Technical Highlights

* **Next.js 15 App Router**: Latest React architecture patterns
* **Aceternity UI**: 89 pre-built animated components
* **React Three Fiber**: Advanced 3D visualizations in React
* **Turbopack**: Next-generation bundler for faster builds
* **Decap CMS**: Git-based CMS with OAuth integration
* **Tailwind CSS 4**: Inline theme configuration
* **Framer Motion**: Advanced animation orchestration
* **TypeScript**: Full type safety across application

---

## 22. License

Copyright © 2024 Becoming Diamond.
All rights reserved.

---

## 23. Contact

* **Website**: [diamond.oceanheart.ai](https://diamond.oceanheart.ai)
* **Developer**: Rick "Kai" Hallett / Oceanheart.ai
* **Email**: [hello@oceanheart.ai](mailto:hello@oceanheart.ai)

---
