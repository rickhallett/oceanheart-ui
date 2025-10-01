# Swanage Traffic Alliance

**Brutalist Activism Website**
*(Client Project)*

---

## 1. Overview

**Swanage Traffic Alliance** is a production website for a community activism organization focused on traffic safety and infrastructure issues in Swanage, Dorset. The site employs a distinctive brutalist design aesthetic to communicate urgency and authenticity while providing real-time data visualization, community engagement features, and content management capabilities.

The platform serves as a:

* **Information hub** with data-driven impact analysis and traffic statistics
* **Community voice platform** with visitor tracking and comment feeds
* **News timeline** for updates and campaign milestones
* **Lead generation system** with integrated contact forms
* **Content management system** via Decap CMS

The site is fully live at [www.swanagetraffic.org.uk](https://www.swanagetraffic.org.uk)

---

## 2. Key Features

* **Brutalist design system** with heavy borders, bold typography, and high-contrast color scheme
* **Real-time page visit tracking** with live database integration
* **Data visualization blocks** showcasing traffic impact statistics
* **Responsive timeline layout** for news and updates
* **Decap CMS integration** for non-technical content editing
* **Server-side rendering** for optimal performance and SEO
* **Neon PostgreSQL** serverless database for scalable data storage
* **Form handling** with immediate user feedback
* **Mobile-first responsive design** with 768px breakpoint

---

## 3. Tech Stack

| Layer      | Technology                    | Notes                                      |
| ---------- | ----------------------------- | ------------------------------------------ |
| Framework  | **Astro 5**                   | Server-side rendering with island architecture |
| UI         | **React** components          | Interactive islands for dynamic features   |
| Database   | **Neon PostgreSQL**           | Serverless Postgres with edge optimization |
| CMS        | **Decap CMS**                 | Git-based content management with OAuth    |
| Styling    | **CSS** (scoped + global)     | Custom brutalist design system             |
| Deployment | **Vercel**                    | Edge deployment with serverless functions  |
| Auth       | **OAuth** (GitHub)            | For CMS access                             |

---

## 4. Site Structure

The site consists of five main pages:

* **Home** (`/`) – Landing page with data visualizations, impact analysis, and signup form
* **Feed** (`/feed`) – Community voices with user counter and comment feed
* **News** (`/news`) – Timeline of updates with alternating left/right layout
* **Privacy** (`/privacy`) – Privacy policy page
* **Terms** (`/terms`) – Terms of service page

---

## 5. Design System

### Brutalist Visual Language

The site employs a consistent brutalist design pattern across all components:

* **Heavy borders**: 8px solid black borders on all containers
* **Box shadows**: 15px offsets creating depth and emphasis
* **Limited color palette**: Black, white, red (#dc2626), gray, concrete
* **Bold typography**: Arial Black, uppercase text, tight letter-spacing
* **High contrast**: Maximum readability and visual impact
* **No gradients or subtle effects**: Raw, unpolished aesthetic

### Typography Hierarchy

* **Headlines**: Arial Black, uppercase, 2.5rem+
* **Body text**: Arial, 1rem, line-height 1.6
* **Buttons**: Uppercase, bold, heavily bordered

### Mobile Responsiveness

* **Breakpoint**: 768px
* **Timeline**: Collapses from alternating layout to single column
* **Grids**: Switch to single column on mobile
* **Typography**: Scales with clamp() functions
* **Navigation**: Stacks vertically

---

## 6. Component Architecture

### Layout Components

* **Header.astro** – Site-wide navigation with brutalist styling
* **Footer.astro** – Contact information and social links
* **BrutalSection.astro** – Reusable container with consistent borders and shadows

### Data Components

* **DataBlock.astro** – Statistical displays with large numbers and context
* **ImpactCard.astro** – Structured cards for impact metrics
* **PageCounter.astro** – Live visitor tracking with database integration
* **ServerSideDB.astro** – Database connection wrapper component

### Form Components

* **Contact forms** – Client-side JavaScript for immediate feedback
* **Lead submission** – Integrated with API endpoints and database storage

---

## 7. Database Integration

### Neon PostgreSQL Implementation

The site uses Neon's serverless PostgreSQL for:

* **Page visit tracking** – Real-time counter updates
* **Contact form submissions** – Lead storage and retrieval
* **Migration history** – Database schema versioning

### Database Utilities

Located in `src/utils/database.ts`:

* Connection management with environment-aware configuration
* Query functions for counters and leads
* Support for multiple database URL formats (Neon, standard Postgres)

### API Routes

* **`/api/counter.ts`** – Page visit tracking endpoint
* **`/api/submit-lead.ts`** – Contact form submission handler
* **`/api/get-leads.ts`** – Lead retrieval endpoint

---

## 8. Content Management

### Decap CMS Integration

* **Admin interface**: Accessible at `/admin/` route
* **OAuth authentication**: GitHub OAuth for secure access
* **Git-based storage**: Content stored as markdown in repository
* **Live preview**: Real-time preview of content changes
* **Collection types**: News items, pages, settings

### Content Workflow

1. Editor accesses `/admin` route
2. Authenticates via GitHub OAuth
3. Creates or edits content through CMS UI
4. Content commits to Git repository
5. Vercel automatically rebuilds and deploys

---

## 9. Performance Optimization

### Server-Side Rendering

* All pages pre-rendered for optimal initial load
* JavaScript only loaded for interactive islands
* Minimal client-side hydration

### Asset Optimization

* **Images**: Properly sized and compressed
* **CSS**: Scoped styles with minimal global overhead
* **JavaScript**: Only loaded for interactive components
* **Fonts**: System fonts (Arial) for instant rendering

### Deployment Strategy

* **Vercel Edge Network**: Global CDN distribution
* **Serverless Functions**: API routes scale automatically
* **Database**: Neon edge locations for low latency

---

## 10. Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Scripts

```bash
# Migrate leads to database
npm run migrate-leads

# Test migration process
npm run test-migration

# Simulate traffic for testing
npm run simulate-traffic
```

### Environment Configuration

Multiple `.env` file support:

* `.env` – Base configuration
* `.env.development.local` – Local development overrides
* `.env.prod` – Production settings
* `.env.example` – Template for required variables

---

## 11. Animation Strategy

### Scroll-Triggered Animations

* **Intersection Observer API** for performance-optimized animations
* **Staggered delays** for sequential content reveal
* **Counter animations** on Feed page
* **Fade-in effects** for sections entering viewport

### Client-Side Interactivity

* Form validation with immediate feedback
* 5-second confirmation display after form submission
* Mobile menu toggle
* Smooth scroll behaviors

---

## 12. Accessibility

* **Semantic HTML**: Proper heading hierarchy and landmarks
* **ARIA labels**: Screen reader support for interactive elements
* **Keyboard navigation**: Full keyboard accessibility
* **High contrast**: Brutalist design ensures excellent readability
* **Focus indicators**: Clear visual focus states

---

## 13. SEO Optimization

* **Server-side rendering**: All content available to crawlers
* **Meta tags**: Proper title, description, and Open Graph tags
* **Semantic structure**: H1-H6 hierarchy for content organization
* **Fast load times**: Excellent Core Web Vitals scores
* **Mobile-friendly**: Responsive design passes mobile usability tests

---

## 14. Testing & Quality Assurance

### Testing Scripts

* **Migration testing**: `test-migration.ts` for database operations
* **Traffic simulation**: `simulate-traffic.ts` for load testing
* **Manual testing**: Cross-browser and device testing

### Quality Metrics

* **Lighthouse scores**: High performance and accessibility ratings
* **TypeScript**: Strict mode enabled for type safety
* **Code structure**: Clear separation of concerns

---

## 15. Deployment

### Vercel Configuration

* **Build command**: `npm run build`
* **Output directory**: `./dist/`
* **Node version**: Automatic detection
* **Environment variables**: Managed through Vercel dashboard

### Database Setup

* **Neon account**: PostgreSQL database provisioned
* **Connection string**: Stored in environment variables
* **Automatic migrations**: Run on deployment

---

## 16. Project Impact

The Swanage Traffic Alliance website demonstrates:

* **Design as communication**: Brutalist aesthetic conveys urgency and authenticity
* **Performance-first architecture**: Server-side rendering and edge deployment
* **Modern JAMstack patterns**: Static generation with dynamic islands
* **Content editor empowerment**: Non-technical users can update content
* **Scalable infrastructure**: Serverless architecture handles traffic spikes
* **Data-driven storytelling**: Real-time statistics and impact visualization

---

## 17. Future Enhancements

* **Enhanced analytics dashboard**: Deeper insights into visitor behavior
* **Email notification system**: Alerts for new leads and activity
* **Social media integration**: Automated posting and feed embedding
* **Petition functionality**: Integrated signature collection
* **Event calendar**: Community meeting and action dates
* **Multilingual support**: Content translation capabilities

---

## 18. Technical Highlights

* **Astro island architecture**: Optimal performance with selective hydration
* **Decap CMS**: Git-based CMS eliminating database complexity
* **Neon Postgres**: Serverless database with edge optimization
* **OAuth integration**: Secure content management access
* **TypeScript**: Type-safe development experience
* **Vercel deployment**: Automatic deployments with Git push

---

## 19. License

Copyright © 2024 Swanage Traffic Alliance.
All rights reserved.

---

## 20. Contact

* **Website**: [www.swanagetraffic.org.uk](https://www.swanagetraffic.org.uk)
* **Developer**: Rick "Kai" Hallett / Oceanheart.ai
* **Email**: [hello@oceanheart.ai](mailto:hello@oceanheart.ai)

---
