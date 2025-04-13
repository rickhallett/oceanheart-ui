# Project Architecture Overview

This document provides a high-level overview of the Oceanheart UI project structure.

## Root Directory

The root directory contains configuration files, scripts, and top-level project setup:

-   **Configuration:** `next.config.js`, `tailwind.config.js`, `tsconfig.json`, `package.json`, `.env`, `.eslintrc.json`, `postcss.config.js`
-   **Version Control:** `.git/`, `.gitignore`
-   **Dependency Management:** `bun.lock`, `pyproject.toml`, `uv.lock` (indicates use of Bun and potentially Python tools like `uv`)
-   **Middleware:** `middleware.ts` - Handles request processing before reaching pages/APIs (likely auth, redirects).
-   **Static Assets:** `public/` - Contains static files served directly (images, fonts, etc.).
-   **Documentation:** `README.md`, `ARCHITECTURE.md` (this file)
-   **Source Code:** `app/`, `components/`, `libs/`, `src/` (presence of `src/` might indicate older structure or separate concerns), `types/`
-   **Database:** `supabase/`, `migrations/` - Suggests Supabase is used for backend/database.
-   **Other:** `.next/` (Next.js build output), `node_modules/`, `.venv/` (Python virtual environment), `prompts/`, `specs/`

## `app/` Directory (Pages & Routing)

This directory follows the Next.js App Router convention. Subdirectories typically map to URL routes.

-   **`layout.tsx`:** Defines the root layout shared across all pages.
-   **`page.tsx`:** Defines the content for the homepage (`/`).
-   **`globals.css`:** Global styles applied throughout the application.
-   **Route Groups:**
    -   `about/`: Contains the `/about` page.
    -   `blog/`: Contains the `/blog` related pages/routes.
    -   `consulting/`: Contains the `/consulting` page.
    -   `conversations/`: Contains the `/conversations` page (where you were).
    -   `dashboard/`: Contains the `/dashboard` related pages (likely user-specific).
    -   `donate/`: Contains the `/donate` page.
    -   `hdi/`: Purpose unclear from name, potentially related to a specific feature/section "HDI".
    -   `privacy-policy/`: Contains the `/privacy-policy` page.
    -   `saigo/`: Purpose unclear from name, potentially related to a specific feature/section "Saigo".
    -   `signin/`: Contains the `/signin` page and related auth flows.
    -   `somatic-bournemouth/`: Contains the `/somatic-bournemouth` page.
    -   `tos/`: Contains the `/tos` (Terms of Service) page.
-   **Error Handling:** `error.tsx`, `not-found.tsx` define custom error and 404 pages.
-   **Metadata Files:** `favicon.ico`, `opengraph-image.png`, etc., define site icons and social media previews.

## `app/api/` Directory (API Routes)

Contains backend API endpoints built using Next.js API Routes.

-   **`auth/`:** Handles authentication-related API calls.
-   **`cron/`:** Likely contains scheduled tasks/cron jobs.
-   **`hdi/`:** API endpoints related to the "HDI" feature.
-   **`lead/`:** API endpoints for handling sales/marketing leads.
-   **`saigo/`:** API endpoints related to the "Saigo" feature.
-   **`stripe/`:** Handles interactions with the Stripe payment gateway.
-   **`webhook/`:** Endpoints for receiving webhooks from third-party services (e.g., Stripe, Supabase).

## `components/` Directory

Contains reusable React components used throughout the application.

-   **Structure:** Seems to be a flat structure, but contains a wide variety of components like `Header.tsx`, `Footer.tsx`, `Pricing.tsx`, `ButtonCheckout.tsx`, various chart components (`PracticeTypesRadarChart.tsx`, `LineGraph.tsx`), UI elements (`Modal.tsx`, `Tabs.tsx`), etc.

## `libs/` Directory

Contains shared utility functions, service integrations, and potentially core logic not tied to specific UI components or API routes.

-   **`api.ts`:** Utility for making API calls.
-   **`chartColors.ts`:** Defines colors for charts.
-   **`gpt.ts`:** Integration with a GPT-based service.
-   **`instagram-service.ts`:** Service for interacting with Instagram.
-   **`resend.ts`:** Integration with the Resend email service.
-   **`seo.tsx`:** Utilities or components for SEO.
-   **`stripe.ts`:** Client-side or shared Stripe configuration/utilities.
-   **`supabase/`:** Contains Supabase client setup and potentially helper functions.

## Middleware (`middleware.ts`)

Located in the root directory, this file intercepts requests before they are processed by Next.js. It's commonly used for:

-   Authentication checks
-   Redirects
-   Setting request headers

## Data Fetching & State Management

-   Data fetching likely occurs within Server Components (`app/` directory pages) and potentially Client Components using libraries like `swr` or `react-query` (though not explicitly listed).
-   Supabase client (`libs/supabase/`) is used for database interactions.
-   Client-side state is managed using React hooks (`useState`, `useRef`, etc.) within Client Components (`"use client";`).

## Styling

-   Tailwind CSS (`tailwind.config.js`, `globals.css`) is used for styling.
-   DaisyUI plugin (`tailwind.config.js`) seems to be used for pre-built Tailwind components. 