# Oceanheart UI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The frontend web application for Oceanheart.ai, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase.

**For a comprehensive overview of the project architecture, including directory structure, component design, data flow, and developer workflow, please see the [Architecture Documentation](./ARCHITECTURE.md).**

## Overview

Oceanheart UI serves as the primary user interface for the Oceanheart.ai platform. It provides landing pages, user authentication, dashboards, specific feature sections like AI conversations and gamified leaderboards, and integrations with backend services.

## Key Features & Sections

-   **Core Pages:** Landing Page (`/`), About (`/about`), Pricing (`/#pricing`), Blog (`/blog`), Terms of Service (`/tos`), Privacy Policy (`/privacy-policy`).
-   **User Authentication:** Sign-in/Sign-up flows using Supabase Auth (Email Magic Link, Google OAuth) via `/signin`.
-   **User Dashboard:** Basic dashboard area (`/dashboard`) for authenticated users.
-   **Conversations with AI:** Dedicated page (`/conversations`) detailing the AI dialogue learning approach.
-   **Saigo:** Gamified practice logging and leaderboard feature (`/saigo/leaderboard`, `/saigo/signin`, etc.).
-   **HDI (Human Digital Interface):** Experimental section (`/hdi`) exploring novel UI concepts.
-   **Service Pages:** Consulting (`/consulting`), Somatic Practice (`/somatic-bournemouth`), Donations (`/donate`).
-   **API Endpoints:** Backend logic handling auth, payments (Stripe), email (Resend), AI interactions (OpenAI), database operations, webhooks, and scheduled tasks (cron jobs).

## Technology Stack

-   **Framework:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **UI:** React 18, Tailwind CSS, DaisyUI, Framer Motion, Recharts
-   **Backend:** Next.js API Routes, Supabase (Auth, PostgreSQL Database), Stripe (Payments), Resend (Email), OpenAI API
-   **State Management:** React Hooks, SWR
-   **Database (Auxiliary):** SQLite (for HDI feature)
-   **Deployment:** Vercel
-   **Package Manager:** Bun

## Getting Started

### Prerequisites

-   Node.js (LTS version recommended)
-   Bun (Installation guide: [https://bun.sh/docs/installation](https://bun.sh/docs/installation))
-   Access to necessary API keys and secrets (Supabase, Stripe, OpenAI, Resend, reCAPTCHA, etc.)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/oceanheart-ui.git
    cd oceanheart-ui
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    -   Copy the example environment file:
        ```bash
        cp .env.example .env.local
        ```
    -   Fill in the required values in `.env.local` with your API keys and configuration settings.

### Running the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## SSO Auth Flow (Accounts → Apps)

- Accounts hosts the central sign-in UI and callback.
- Magic links and OAuth should redirect to the Accounts callback, which then forwards users to the initiating app via a `returnTo` parameter.
- Environment variables:
  - `NEXT_PUBLIC_SITE_URL` (in this repo) must point to Accounts base.
    - Prod: `https://accounts.oceanheart.ai`
    - Local: `http://accounts.lvh.me:3000`
  - Supabase → Authentication → URL Configuration should include the Accounts callback(s):
    - Prod: `https://accounts.oceanheart.ai/auth/callback`
    - Local: `http://accounts.lvh.me:3000/auth/callback`
- Cookie domains:
  - Prod: `.oceanheart.ai` (shared across subdomains)
  - Local: `.lvh.me` (shared across `*.lvh.me`)
- The Accounts callback exchanges the code, sets cookies for the parent domain, and redirects to `returnTo`.

## Contributing

Please refer to the contribution guidelines (if available) before submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file (if available) for details.
