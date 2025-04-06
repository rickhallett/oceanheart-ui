# Oceanheart.ai Platform - Architectural Documentation

## 1. Introduction

### 1.1. Purpose
This document describes the software architecture of the Oceanheart.ai platform. It is intended to provide a comprehensive overview for understanding the system's components, interactions, data management, technology choices, and key architectural decisions. The primary audience for this document is future Large Language Models (LLMs) requiring context about the codebase, as well as current and future development team members.

### 1.2. Application Overview
Oceanheart.ai is a web platform designed primarily for wellbeing professionals (therapists, counselors, coaches). Its purpose is to provide AI-powered tools and features that enhance clinical effectiveness, streamline administrative workflows, and potentially foster community engagement, while prioritizing data privacy.

The platform includes several key areas:
*   **Core Platform:** Landing pages, pricing information, user authentication, dashboard (basic), blog, legal pages (TOS, Privacy Policy), and support features.
*   **DataAngel:** A featured product focusing on privacy-first AI tools for therapists, emphasizing local/on-device processing for tasks like note-taking and summarization.
*   **Saigo:** A gamified or competitive feature involving practice logging, points, a leaderboard, and unique AI-generated usernames, potentially linked to external checks (like Instagram page status).
*   **HDI (Human Digital Interface):** An apparently more experimental feature exploring novel human-computer interaction concepts, possibly involving audio, terminal emulation, and community input.
*   **Consulting/Somatic Practice Pages:** Informational pages detailing specific services offered.
*   **myThera:** Mentioned as a potential future feature involving personalized AI models for users.

The primary goals are to leverage AI to save practitioners time, enhance their practice capabilities, and build a supportive community, all within a secure and privacy-conscious environment.

### 1.3. Target Audience (Documentation)
Future Large Language Models (LLMs) and development teams.

### 1.4. Glossary / Definitions
*   **Platform:** The overall Oceanheart.ai web application.
*   **DataAngel:** A specific product/feature set focused on privacy-first AI tools for therapists.
*   **Saigo:** A feature set related to gamification, practice logging, leaderboards, and potentially external checks.
*   **HDI:** Human Digital Interface - An experimental feature exploring new interaction paradigms.
*   **myThera:** A concept for a personalized AI model feature.
*   **Supabase:** Backend-as-a-Service provider used for authentication, database, and potentially other backend functions.
*   **Stripe:** Payment processing service used for handling subscriptions and one-time payments.
*   **Resend:** Email delivery service.
*   **Vercel:** Cloud platform used for deployment and hosting of the Next.js application.
*   **Next.js App Router:** The framework structure used for routing and server/client component management.
*   **API Route:** Server-side functions within the Next.js application handling specific backend logic (e.g., `/api/auth/callback`).
*   **LLM:** Large Language Model (e.g., OpenAI's GPT models).
*   **SSR:** Server-Side Rendering.
*   **CSR:** Client-Side Rendering.
*   **Component:** Reusable UI element (React component).
*   **Layout:** Special Next.js file defining shared UI structure for a route segment.
*   **Page:** Special Next.js file defining the UI unique to a specific route.
*   **Route Handler:** File defining API endpoints within the Next.js App Router (`route.ts`).
*   **Webhook:** An automated message sent from one app to another when something happens. Used here primarily for Stripe event handling.
*   **Cron Job:** A scheduled task that runs automatically at specified intervals (e.g., Instagram checker via Vercel Cron).

## 2. Architectural Goals and Constraints

### 2.1. Key Goals
*   **Privacy & Security:** Paramount goal, especially for therapist tools (`DataAngel`). Emphasized through local processing concepts and GDPR alignment mentions. Secure authentication (Supabase Auth, reCAPTCHA) is implemented.
*   **User Experience (UX):** Provide intuitive and efficient tools for wellbeing professionals. Offer engaging features like the Saigo leaderboard.
*   **Maintainability:** Leverage a modern framework (Next.js) and clear project structure. TypeScript enhances code quality and maintainability.
*   **Scalability:** Utilize serverless architecture (Next.js on Vercel) and managed services (Supabase, Stripe) which offer inherent scalability.
*   **Rapid Development:** Use a full-stack framework (Next.js) and BaaS (Supabase) to accelerate feature delivery.
*   **Cost-Effectiveness:** Offer an alternative to expensive cloud-based AI solutions by promoting local processing where feasible (`DataAngel`). Stripe integration provides standard payment processing.

### 2.2. Non-Functional Requirements (NFRs)
*   **Privacy:** Client data processed locally (`DataAngel`) must *never* leave the user's device unless explicitly anonymized (`Secure Cloud AI Bridge` plan feature). Cloud features (like Saigo username generation) must handle data appropriately. Compliance with GDPR is a design principle.
*   **Security:** Authentication required for accessing private areas (`/dashboard`, `/saigo`). Sign-in processes protected by reCAPTCHA v3. Secure handling of API keys and secrets via environment variables.
*   **Availability:** High availability expected, primarily managed through Vercel's platform infrastructure.
*   **Performance:** API routes and database queries should be optimized for responsiveness, especially for interactive features like the `LiveLeaderboard`. Local AI processing performance depends on user hardware.
*   **Data Integrity:** Ensure accurate tracking of points and practice logs in the `Saigo` feature. Reliable handling of payment information and user access via Stripe webhooks.

### 2.3. Constraints
*   **Technology Choices:** Locked into Next.js, React, TypeScript, Supabase, Stripe, Resend, Vercel based on the existing codebase.
*   **External Service Dependency:** Reliant on the availability and APIs of Supabase, Stripe, OpenAI, Google (reCAPTCHA), Resend, and potentially Instagram (for checks).
*   **Local Processing Limitations:** The effectiveness of local AI features (`DataAngel`) depends on the user's hardware capabilities.
*   **Compliance:** Adherence to data privacy regulations (like GDPR) is critical due to the target audience and nature of data potentially handled (even if anonymized).
*   **Small Team (Implied):** Architecture should favor simplicity and managed services where possible to reduce operational overhead.

## 3. Architectural Views

### 3.1. Logical View / Decomposition
The system is primarily a full-stack Next.js application deployed on Vercel, functioning largely as a monolith but leveraging external BaaS (Supabase) and specialized services (Stripe, Resend, OpenAI).

*   **Presentation Layer (Frontend):**
    *   **Components:** Located in `/components` and feature-specific directories (e.g., `/app/blog/_assets/components`, `/app/hdi/components`). Built with React, TypeScript, Tailwind CSS, daisyUI. Handles UI rendering, user interaction, client-side state management (e.g., using `useState`, `useEffect`, `useSWR` for data fetching).
    *   **Routing:** Handled by Next.js App Router (`/app` directory structure with `page.tsx` and `layout.tsx` files).
    *   **Responsibilities:** Displaying content (landing pages, blog, pricing, FAQ, etc.), rendering user dashboards and feature interfaces (Saigo, HDI), handling user input (forms, button clicks), client-side data fetching and caching (`swr`), managing client-side authentication state.
    *   **Interfaces:** Interacts with users via the browser. Communicates with the Backend Logic Layer via API routes. Interacts directly with Supabase client-side library for some operations (e.g., auth state).

*   **Backend Logic Layer (API Routes):**
    *   **Location:** Primarily within `/app/api/`. Organized by feature/domain (e.g., `/app/api/auth`, `/app/api/saigo`, `/app/api/stripe`, `/app/api/hdi`).
    *   **Technology:** Next.js Route Handlers (serverless functions on Vercel), TypeScript.
    *   **Responsibilities:** Handling authentication callbacks, user data management (linking auth users to profiles/Saigo users), processing payments via Stripe (creating checkouts, portals, handling webhooks), generating Saigo usernames via OpenAI, managing Saigo practices/leaderboard data, handling HDI name suggestions, serving protected resources (HDI PDF download), running cron jobs (Instagram checker).
    *   **Interfaces:** Exposes RESTful APIs consumed by the Frontend Layer and external services (Stripe Webhooks). Interacts with Supabase (database, auth admin), Stripe API, Resend API, OpenAI API, Google reCAPTCHA API.

*   **Data Layer:**
    *   **Primary Database:** Supabase (PostgreSQL). Stores user profiles (`profiles`), leads (`leads`), Saigo-specific user data (`saigo_users`), Saigo practices (`practices`), Saigo leaderboard logic (derived from `practices`), Instagram check configurations (`instagram_page_checks`, `instagram_affected_users`). Schema defined and managed partly through SQL migrations (`/migrations`).
    *   **HDI Names Database:** A separate SQLite database (`names.db`) located within `/app/api/hdi/names/`, managed via `better-sqlite3`. Contains suggested names for the HDI feature. Seeded via Python/SQL scripts. *Rationale: Possibly chosen for simplicity for this specific, potentially experimental feature, or as an initial implementation before potential migration to the main DB.*
    *   **Responsibilities:** Persisting application state, user information, feature-specific data.
    *   **Interfaces:** Accessed primarily by the Backend Logic Layer via the Supabase client library. Some client-side reads might occur (e.g., for live leaderboard updates via `swr`).

*   **External Services:**
    *   **Supabase:** Authentication, Database (PostgreSQL).
    *   **Stripe:** Payment processing (Checkout, Customer Portal, Webhooks).
    *   **Resend:** Transactional email sending.
    *   **OpenAI:** LLM for Saigo username generation.
    *   **Google reCAPTCHA:** Bot protection for sign-in forms.
    *   **Instagram:** Checked externally (via fetch) for the Saigo feature.
    *   **(Potentially) Crisp:** Customer chat support (if configured).

### 3.2. Process View / Component Interaction

*   **Standard User Sign-up/Sign-in (Magic Link):**
    1.  User enters email on `/signin` page (Frontend).
    2.  Frontend sends reCAPTCHA token to `/api/auth/verify-and-signin` (Backend).
    3.  Backend verifies token with Google. Returns success.
    4.  Frontend calls Supabase client-side `signInWithOtp` with email and callback URL (`/api/auth/callback`).
    5.  Supabase sends magic link email via its configured provider (potentially Resend via Supabase dashboard settings).
    6.  User clicks link, hits Supabase endpoint.
    7.  Supabase redirects user to `/api/auth/callback` with an auth code.
    8.  `/api/auth/callback` (Backend) exchanges code for session with Supabase Auth.
    9.  Backend middleware (`middleware.ts`) updates session cookie.
    10. Backend redirects user to configured `callbackUrl` (`/dashboard`).
    11. **(Implicit via Trigger):** Supabase `handle_new_user` trigger inserts basic user data into `public.profiles`.

*   **Saigo User Sign-up/Sign-in (Google OAuth):**
    1.  User clicks "Sign in with Google" on `/saigo/signin` page (Frontend).
    2.  Frontend sends reCAPTCHA token to `/api/auth/saigo-verify-and-signin` (Backend).
    3.  Backend verifies token with Google. Returns success.
    4.  Frontend calls Supabase client-side `signInWithOAuth` specifying 'google' provider and Saigo callback URL (`/api/auth/saigo-callback`).
    5.  User redirected to Google for authentication.
    6.  Google redirects user back to Supabase endpoint.
    7.  Supabase redirects user to `/api/auth/saigo-callback` with an auth code.
    8.  `/api/auth/saigo-callback` (Backend) exchanges code for session with Supabase Auth.
    9.  Backend retrieves user email from session/user object.
    10. Backend checks if user email exists in `saigo_users`.
    11. If user *doesn't* exist, Backend inserts `{ email: userEmail, user_id: authUserId }` into `saigo_users`. Logs errors but continues.
    12. Backend middleware (`middleware.ts`) updates session cookie.
    13. Backend checks if the `saigo_users` record has a `username`.
    14. If username exists, redirects to `/saigo/leaderboard`.
    15. If username *doesn't* exist, redirects to `/saigo/username`.

*   **Saigo Username Generation:**
    1.  User lands on `/saigo/username` page (Frontend) after sign-in.
    2.  User clicks "Generate Username".
    3.  Frontend sends POST request to `/api/saigo/username` (Backend).
    4.  Backend authenticates user (implicitly via Supabase cookie managed by middleware). Retrieves user email.
    5.  Backend checks for predefined mapping for the email (env var `EMAIL_MAPPINGS`).
    6.  If mapped, updates `saigo_users` table with the predefined username and returns it.
    7.  If not mapped, Backend calls OpenAI API with prompt from `/prompts/saigo_username_prompt.xml`.
    8.  Backend receives generated username from OpenAI.
    9.  Backend updates `saigo_users` table, setting the `username` field for the user's email/user_id.
    10. Backend returns the generated username in the API response.
    11. Frontend displays the username and initiates redirect to `/saigo/leaderboard` after a short delay.

*   **Saigo Practice Submission:**
    1.  User clicks "Submit Practice" on `/saigo/leaderboard` (Frontend), opening a form modal.
    2.  User fills form (activity type, minutes).
    3.  User clicks submit.
    4.  Frontend sends POST request to `/api/saigo/practice` with form data (Backend).
    5.  Backend authenticates user, retrieves their `saigo_users.id` based on `auth.uid()`.
    6.  Backend inserts practice record into `practices` table (`{ type, points: minutes, user_id: saigoUserId, created_at }`).
    7.  Backend returns success/error response.
    8.  Frontend closes modal, potentially shows toast message, triggers SWR revalidation for leaderboard data.

*   **Leaderboard Data Fetch:**
    1.  `/saigo/leaderboard` page (Frontend) mounts.
    2.  `useSWR` hook fetches data from `/api/saigo/leaderboard` (Backend).
    3.  Backend API route queries `practices` table for the last 7 days, joins with `saigo_users` to get usernames, aggregates points per user, per day, and per practice type.
    4.  Backend returns aggregated data (`leaderboardData`, `practiceSummary`, `dailyPoints`, `stackedData`, `practiceTypes`).
    5.  Frontend renders components (`LeaderboardTable`, charts) with the fetched data. `useSWR` automatically re-fetches based on interval/focus.

*   **Stripe Checkout Creation:**
    1.  User clicks checkout button on `/pricing` page (Frontend - `ButtonCheckout` component).
    2.  Frontend checks if user is logged in (Supabase client `auth.getUser`). Redirects to `/signin` if not.
    3.  Frontend sends POST request to `/api/stripe/create-checkout` with `priceId`, `mode`, `successUrl`, `cancelUrl`.
    4.  Backend API route gets user auth data, fetches user profile from `profiles` table (including potential `customer_id`).
    5.  Backend calls Stripe API (`stripe.checkout.sessions.create`) with necessary details (price, mode, URLs, client_reference_id=userId, customer details if available).
    6.  Stripe returns a checkout session URL.
    7.  Backend returns the URL to the frontend.
    8.  Frontend redirects the user to the Stripe checkout URL.

*   **Stripe Webhook Handling:**
    1.  Stripe sends an event (e.g., `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`) to `/api/webhook/stripe` (Backend).
    2.  Backend verifies the Stripe signature.
    3.  Backend uses a `SupabaseClient` with the *service role key* to perform admin actions.
    4.  Based on `eventType`:
        *   `checkout.session.completed`: Retrieves session details (incl. `client_reference_id`), gets/creates user profile in `profiles`, updates profile with `customer_id`, `price_id`, `has_access=true`.
        *   `invoice.paid`: Finds profile by `customer_id`, verifies `price_id`, updates `has_access=true`.
        *   `customer.subscription.deleted`: Finds profile by `customer_id`, updates `has_access=false`.
    5.  Backend returns 200 OK to Stripe.

*   **HDI Name Suggestion:**
    1.  User interacts with form on `/hdi` page (or Footer form).
    2.  Frontend sends POST request to `/api/hdi/names` with the suggested name.
    3.  Backend API route connects to the local SQLite DB (`names.db`) using `better-sqlite3`.
    4.  Backend inserts the new name.
    5.  Backend queries for all names, ordered by creation date.
    6.  Backend returns the updated list of names.
    7.  Frontend updates the display (e.g., the carousel in `HDIHeader`).

*   **Instagram Check Cron Job:**
    1.  Vercel Cron triggers GET request to `/api/cron/instagram-checker` based on schedule (`vercel.json`).
    2.  Backend route verifies `Authorization` header (using `CRON_SECRET`).
    3.  Backend instantiates `InstagramService` with a service role Supabase client.
    4.  Calls `instagramService.runInstagramChecks()`.
    5.  `runInstagramChecks`:
        *   Fetches all checks from `instagram_page_checks`.
        *   For each check: Calls `checkInstagramPageExists(username)` (uses `fetch` with user agent).
        *   If page exists and `page_found` was false:
            *   Fetches associated users from `instagram_affected_users` where `points_reset` is false.
            *   **(Commented out)** Potentially deletes practices for these users from the `practices` table.
            *   Sends email notification via Resend.
            *   **(Commented out)** Updates `instagram_affected_users` setting `points_reset` to true.
        *   Updates `instagram_page_checks` with current `page_found` status and `last_check_time`.
    6.  Route returns JSON summary of results.

### 3.3. Data View

*   **`#### 3.3.1. Data Models`**
    *   **`auth.users` (Supabase Managed):** Core authentication user (`id`, `email`, etc.).
    *   **`public.profiles`:** Extends `auth.users`. Stores Stripe `customer_id`, `price_id`, `has_access` flag for paid features, potentially `name`, `image`. Linked via `id` (UUID) referencing `auth.users(id)`.
    *   **`public.leads`:** Stores emails collected from lead generation forms (`id`, `email`, `created_at`).
    *   **`public.saigo_users`:** Users participating in the Saigo feature. Contains `id` (UUID, primary key), `email` (unique, potentially links to `auth.users.email` or `profiles.email`), `user_id` (UUID, foreign key to `auth.users.id`), generated `username` (unique), `force` (integer, purpose unclear from schema alone, potentially related to practice points?), `created_at`.
    *   **`public.practices`:** Logged practice sessions for Saigo. Contains `id` (UUID, primary key), `user_id` (UUID, foreign key to `saigo_users.id`), `type` (text, e.g., "Meditation"), `points` (integer, likely minutes), `created_at`.
    *   **`public.instagram_page_checks`:** Configuration for checking Instagram pages. Contains `id` (UUID), `page_username` (text), `page_found` (boolean), `last_check_time`, `created_at`.
    *   **`public.instagram_affected_users`:** Links Saigo users to Instagram checks for potential point resets. Contains `id` (UUID), `instagram_check_id` (UUID, FK to `instagram_page_checks`), `user_id` (UUID, FK to `saigo_users`), `points_reset` (boolean), `reset_time`, `created_at`.
    *   **`Name` (SQLite Table in `/app/api/hdi/names/names.db`):** Stores community-suggested names for HDI. Contains `id` (integer, primary key), `name` (text), `created_at` (date).

*   **`#### 3.3.2. Data Storage`**
    *   **Supabase (PostgreSQL):** Primary datastore for relational data (users, profiles, leads, Saigo data, Instagram checks). *Rationale:* Integrated BaaS offering Auth and DB, simplifying development; PostgreSQL provides relational integrity and robust querying.
    *   **SQLite (`names.db`):** Stores HDI names locally within the API route's directory. *Rationale:* Might be for simplicity during development/prototyping of the HDI feature, allowing easy seeding and modification without altering the main Supabase schema. Could also be a remnant or a deliberate choice for isolation.
    *   **Vercel KV/Blob/Postgres (Potential but not explicit):** Vercel offers managed storage options often used with Next.js, but explicit use isn't evident in the provided files.
    *   **Local Storage/Session Storage (Browser):** Likely used for storing client-side state or tokens, although not explicitly detailed in backend/config files.

*   **`#### 3.3.3. Data Flow`**
    *   **User Registration:** User data flows from sign-up form -> Supabase Auth -> `auth.users` table. Trigger -> `public.profiles` table. For Saigo flow, email/user_id also inserted into `saigo_users`.
    *   **Lead Generation:** Email from form -> `/api/lead` -> `public.leads` table.
    *   **Saigo Username:** User email -> `/api/saigo/username` -> OpenAI -> Generated username -> Update `saigo_users` table.
    *   **Saigo Practice Logging:** Practice details from form -> `/api/saigo/practice` -> `public.practices` table.
    *   **Saigo Leaderboard:** `/api/saigo/leaderboard` reads from `public.practices` (last 7 days) and `saigo_users` -> Aggregated data -> Frontend components.
    *   **Stripe Payments:** User action -> `/api/stripe/create-checkout` -> Stripe API -> Redirect to Stripe. Stripe event -> `/api/webhook/stripe` -> Update `public.profiles` table.
    *   **HDI Name Suggestion:** Name from form -> `/api/hdi/names` (POST) -> SQLite `names.db`.
    *   **HDI Name Display:** Frontend component -> `/api/hdi/names` (GET) -> Read SQLite `names.db` -> Frontend display.
    *   **Instagram Check:** Cron job -> `/api/cron/instagram-checker` -> Fetch Instagram page -> Read/Update `instagram_page_checks`, Read `instagram_affected_users`, potentially Delete from `practices`, Send email via Resend.

## 4. Technology Stack

*   **Frontend:**
    *   Framework: Next.js (v14+ using App Router)
    *   Language: TypeScript
    *   UI Library: React (v18)
    *   Styling: Tailwind CSS, daisyUI (with multiple themes: cyberpunk, synthwave)
    *   State Management: React Hooks (`useState`, `useEffect`), SWR (for data fetching/caching)
    *   Animation: Framer Motion, anime.js
    *   Charting: Recharts
    *   Other: `react-hot-toast`, `react-icons`, `react-tooltip`, `crisp-sdk-web` (optional chat)
    *   *Rationale:* Next.js provides a robust full-stack framework with SSR/SSG, API routes, and good developer experience. TypeScript enhances code safety. Tailwind/daisyUI allow for rapid UI development. SWR simplifies client-side data fetching.

*   **Backend (API Routes / Serverless Functions):**
    *   Runtime: Node.js (via Next.js on Vercel)
    *   Language: TypeScript
    *   Framework: Next.js Route Handlers
    *   Database Client: `@supabase/ssr`, `@supabase/supabase-js`
    *   Payment Client: `stripe`
    *   Email Client: `resend`
    *   AI Client: `openai`
    *   HTTP Client: `axios`, native `fetch`
    *   Other: `better-sqlite3` (for HDI names DB)
    *   *Rationale:* Sticking with Node.js/TypeScript via Next.js API routes simplifies the tech stack (no separate backend framework needed). Leveraging official SDKs for external services is standard practice.

*   **Database:**
    *   Primary: Supabase (PostgreSQL)
    *   Secondary: SQLite (`better-sqlite3` for HDI names)
    *   *Rationale:* Supabase provides integrated Auth and a managed Postgres instance, simplifying backend setup. SQLite's use for HDI is specific and likely for isolation or ease of local management for that feature.

*   **Authentication:**
    *   Provider: Supabase Auth
    *   Methods: Google OAuth, Magic Links (Email OTP)
    *   Security: Google reCAPTCHA v3
    *   *Rationale:* Supabase Auth integrates well with the database and Next.js adapters (`@supabase/ssr`). reCAPTCHA adds bot protection.

*   **Payments:**
    *   Provider: Stripe (Checkout, Customer Portal, Webhooks)
    *   *Rationale:* Industry standard for payment processing, comprehensive API, good documentation.

*   **Email:**
    *   Provider: Resend
    *   *Rationale:* Modern email API service, often simpler to integrate than traditional SMTP setups.

*   **Deployment & Hosting:**
    *   Platform: Vercel (implied)
    *   Features: Serverless Functions, Cron Jobs, Edge Middleware (via `middleware.ts`), Speed Insights.
    *   *Rationale:* Native platform for Next.js, offering seamless deployment, serverless scaling, CI/CD integration, and additional platform features like Cron Jobs.

*   **Development/Tooling:**
    *   Package Manager: pnpm (inferred from `bun.lock`, but `package.json` also exists - could be mixed or transitioning. Assuming `pnpm` based on lockfile presence. Wait, `bun.lock` implies **Bun** is used). *Correction: Bun is likely the primary tool.*
    *   Linting: ESLint (`eslint-config-next`)
    *   Testing: (No specific testing framework evident in provided files, though Jest types are dev dependencies)
    *   Sitemap: `next-sitemap`

## 5. Infrastructure and Deployment View

*   **`### 5.1. Hosting Environment`**: Vercel cloud platform. Leverages Vercel's serverless functions for API routes and static hosting for frontend assets. Supabase provides the managed database and authentication infrastructure. Stripe, Resend, OpenAI, Google are external SaaS providers.
*   **`### 5.2. Deployment Strategy`**: Deployment is managed through Vercel, likely via Git integration (e.g., pushes to a specific branch trigger builds and deployments). The application is deployed as a single Next.js project. Static assets are served via Vercel's CDN. API routes run as serverless functions in regions configured on Vercel.
*   **`### 5.3. CI/CD`**: Assumed to be handled by Vercel's built-in CI/CD pipeline, triggered by Git commits/merges. The pipeline likely involves installing dependencies (`bun install`), linting (`bun lint`), building the Next.js app (`bun build`), and deploying to Vercel's infrastructure.
*   **`### 5.4. Monitoring & Logging`**:
    *   **Monitoring:** Vercel provides built-in monitoring for function execution, performance metrics (Speed Insights enabled). Specific application-level monitoring (e.g., tracking API errors, leaderboard update frequency) might require custom implementation or integration with external services (none explicitly configured in provided files).
    *   **Logging:** Vercel captures logs from serverless function executions (API routes). Client-side errors might be logged to the console or potentially a third-party service (none explicitly configured). Backend API routes use `console.log` and `console.error` for basic logging.

## 6. Cross-Cutting Concerns

*   **`### 6.1. Authentication & Authorization`**:
    *   **Authentication:** Handled by Supabase Auth (Google OAuth, Magic Link). Session management uses Supabase's cookie-based approach, managed via `@supabase/ssr` library and the Next.js middleware (`updateSession`). Specific flows exist for the main app and the `Saigo` feature.
    *   **Authorization:** Basic protection is implemented via layouts (`/dashboard/layout.tsx`, `/saigo/layout.tsx`, `/saigo/username/layout.tsx`, `/saigo/leaderboard/layout.tsx`) which check for an authenticated user session and redirect if necessary. More granular authorization (e.g., checking roles or specific permissions for API access) is not explicitly shown but would typically be implemented within API routes using Supabase RLS or custom logic checking user roles/permissions against `auth.uid()`. Supabase RLS policies are defined in migration files (`libs/supabase/init.sql`, `migrations/saigo_tables_uuid.sql`, etc.) allowing users to access/modify their own data. Service role key is used in specific backend routes/services (`createServiceClient`, Stripe webhook handler, Instagram service) for elevated privileges.

*   **`### 6.2. Security`**:
    *   **Authentication Security:** Sign-in flows are protected by Google reCAPTCHA v3 (`/api/auth/verify-and-signin`, `/api/auth/saigo-verify-and-signin`). Supabase handles secure token management and session handling.
    *   **Secrets Management:** API keys and secrets (Supabase keys, Stripe secret, Resend key, OpenAI key, `CRON_SECRET`, `SAIGO_SECRET_KEY`, `RECAPTCHA_SECRET_KEY`) are managed via environment variables (`.env` / Vercel environment variables).
    *   **Transport Security:** Assumed HTTPS enforced by Vercel deployment.
    *   **Input Validation:** Basic validation present (e.g., checking for email in `/api/lead`). More robust validation (e.g., using Zod, as it's a dependency) should be applied consistently across API endpoints, especially those handling user input or external data.
    *   **Rate Limiting:** A simple time-based rate limit is implemented on the client-triggered Instagram check (`/api/saigo/instagram/check-trigger`). More robust rate limiting might be needed for other public or sensitive APIs (potentially handled by Vercel or custom implementation).
    *   **Data Privacy:** Core concern, addressed by local processing concepts (`DataAngel`) and requiring pseudonymization for client data stored in the platform (`privacy-policy.tsx`). Saigo usernames are AI-generated to obscure identity.

*   **`### 6.3. Error Handling & Resilience`**:
    *   **API Routes:** Basic `try...catch` blocks are used in many API routes to catch errors, log them (`console.error`), and return appropriate HTTP status codes (e.g., 400, 500) with error messages in JSON format.
    *   **Frontend:** The root `error.tsx` provides a global error boundary. Specific components might implement local error handling (e.g., displaying error messages from API calls like in `/saigo/username/page.tsx`). `react-hot-toast` is used for user-facing notifications.
    *   **External Services:** Resilience relies on the availability of external services (Supabase, Stripe, etc.). Retries or circuit breakers are not explicitly implemented in the provided code but might be beneficial for calls to external APIs.
    *   **Database:** Supabase client handles database connection management. Errors during DB operations (e.g., unique constraint violations, connection issues) are caught in API routes.

*   **`### 6.4. Configuration Management`**:
    *   **Application Config:** Centralized configuration in `config.ts` defines app name, description, domain, Stripe plans, Resend emails, themes, auth URLs.
    *   **Secrets & Keys:** Managed via environment variables (loaded using `dotenv` for local development, configured in Vercel for deployment). Includes keys for Supabase, Stripe, Resend, OpenAI, reCAPTCHA, Cron Secret, Saigo Secret.
    *   **Feature Flags:** No explicit feature flag system is evident, but conditional rendering/routing based on configuration or user state exists.

## 7. Key Architectural Decisions (ADRs - Summarized)

*   **Decision 1: Use Next.js App Router with TypeScript**
    *   **Context:** Need for a modern, full-stack web framework supporting both frontend UI and backend API logic.
    *   **Rationale:** Leverages React ecosystem, provides SSR/SSG, serverless functions (API Routes), file-based routing, and strong typing with TypeScript for better maintainability and developer experience. Vercel provides first-class support.
    *   **Alternatives:** Separate Frontend/Backend (e.g., React + Express), other full-stack frameworks (Remix, SvelteKit).
    *   **Consequences:** Tight coupling between frontend and backend logic within the same framework. Benefits from Vercel's optimized hosting. Requires understanding of React Server Components vs. Client Components.

*   **Decision 2: Use Supabase for Backend-as-a-Service (Auth & Database)**
    *   **Context:** Need for user authentication, persistent data storage, and potentially real-time features without managing backend infrastructure.
    *   **Rationale:** Provides integrated authentication (OAuth, Magic Link), a managed PostgreSQL database with a convenient client library, real-time capabilities (though not explicitly used heavily yet), and Row Level Security. Simplifies backend development significantly.
    *   **Alternatives:** Firebase, AWS Amplify, building a custom backend with separate Auth/DB providers (e.g., Auth0 + managed PostgreSQL).
    *   **Consequences:** Vendor lock-in with Supabase. Relies on Supabase's uptime and feature set. Simplifies initial development and scaling.

*   **Decision 3: Use Stripe for Payments**
    *   **Context:** Requirement to handle one-time payments and potentially subscriptions for premium features.
    *   **Rationale:** Stripe is the industry standard, offering robust APIs, secure checkout, customer portal features, and extensive documentation. Handles complex compliance requirements (PCI-DSS).
    *   **Alternatives:** Paddle, Lemon Squeezy, PayPal.
    *   **Consequences:** Transaction fees associated with Stripe. Requires careful implementation of webhook handling for reliability.

*   **Decision 4: Privacy-First / Local Processing Emphasis (for DataAngel)**
    *   **Context:** Target audience (therapists) handles highly sensitive client data, making cloud processing a significant privacy and compliance concern. High cost of GDPR-compliant cloud AI hosting.
    *   **Rationale:** Differentiates the product by addressing a key pain point for the target market. Builds trust by keeping sensitive data on the user's device. Reduces ongoing hosting costs for core AI features.
    *   **Alternatives:** Using fully cloud-based AI services with appropriate compliance (e.g., HIPAA/GDPR BAA) - likely much more expensive and complex.
    *   **Consequences:** Performance of local AI depends on user hardware. Limits the scale and complexity of AI models that can be run locally compared to cloud options. Requires clear communication about data handling for different features (local vs. cloud). The "Secure Cloud AI Bridge" feature acknowledges this limitation and provides a hybrid solution.

*   **Decision 5: Separate Authentication Flow/UI for "Saigo" Feature**
    *   **Context:** The Saigo feature (competition/leaderboard) needs a distinct entry point and potentially different user handling (e.g., AI usernames) compared to the main application/DataAngel product.
    *   **Rationale:** Allows for a themed, potentially hidden/exclusive experience. Isolates Saigo user data (`saigo_users`) and logic. Avoids complicating the main sign-in flow. Code duplication chosen over early abstraction to minimize risk during initial feature development.
    *   **Alternatives:** Integrating Saigo login into the main flow with conditional logic, creating a completely separate application.
    *   **Consequences:** Code duplication requires maintaining two similar authentication flows. Clearer separation of concerns for the Saigo feature set.

*   **Decision 6: Using SQLite for HDI Name Suggestions**
    *   **Context:** The HDI feature requires a simple way to store and retrieve community-suggested names.
    *   **Rationale:** SQLite (`better-sqlite3`) provides a very simple, file-based database solution that can be managed directly within the API route's deployment environment (on Vercel's serverless functions, this implies temporary/ephemeral storage unless mounted). Easy to seed and query for this specific, potentially isolated feature. Avoids modifying the main Supabase schema for an experimental feature.
    *   **Alternatives:** Storing names in Supabase (main DB), using a simple JSON file, Vercel KV store.
    *   **Consequences:** Data is likely not persistent across deployments/function invocations unless a persistent volume is used (unlikely on standard Vercel serverless). Scalability is limited compared to Supabase. Simple to implement and manage locally.

## 8. Future Considerations (Optional)

*   **Scalability of Local AI:** As `DataAngel` evolves, managing dependencies and performance across different user hardware for local AI processing will be a challenge. Consider compiled models (e.g., ONNX, WebGPU implementations) or clearer hardware requirement communication.
*   **HDI Feature Persistence:** If the HDI name suggestions need to be persistent and scalable, migrating the data from the local SQLite DB to Supabase PostgreSQL would be necessary.
*   **Database Schema Evolution:** The presence of multiple user-related tables (`profiles`, `saigo_users`) might benefit from consolidation or clearer relationship definitions as the platform grows. The purpose of `saigo_users.force` needs clarification.
*   **Real-time Features:** The `LiveLeaderboard` currently uses SWR polling. If true real-time updates are needed, leveraging Supabase Realtime subscriptions could be explored.
*   **API Authorization:** Implement more granular authorization checks within API routes beyond just checking for an authenticated session, possibly based on user roles or subscription status stored in `profiles`.
*   **Testing:** Formalize testing strategy (Unit, Integration, E2E) to ensure reliability as complexity increases.
*   **Monitoring & Alerting:** Implement more robust application-level monitoring and alerting beyond Vercel's defaults, especially for critical flows like payments and authentication.
*   **Abstracting Duplication:** Revisit the duplicated authentication logic (`/signin` vs `/saigo/signin`, associated API routes) once the Saigo feature stabilizes to reduce maintenance overhead.
*   **`myThera` Implementation:** Architecting the personalized AI model feature will require significant design, considering data sourcing, fine-tuning processes, privacy, and deployment.
