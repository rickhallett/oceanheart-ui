# Saigo Sign‑In Page Specification

> Ingest this information to build a new Saigo sign‑in page that duplicates the existing authentication UI from `app/signin/page.tsx`, but uses a different daisy UI theme and is integrated with new Saigo API endpoints.

## High-Level Objective
- Create a new sign‑in page for the Saigo flow that uses an alternate daisy UI theme, integrates Google reCAPTCHA v3, and offers both Google OAuth and Magic Link sign‑in options.

## Mid‑Level Objectives
- Duplicate the authentication process from the existing `app/signin/page.tsx`.
- Apply a distinct daisy UI theme so that the Saigo sign‑in page is visually separate.
- Integrate Google reCAPTCHA v3 using existing environment variables.
- Present both Google Auth and Magic Link options.
- Replace existing API endpoint references with new ones that point to the Saigo authentication routes (e.g., use a new callback URL in the `ButtonSignin` component).

## Implementation Notes
- Create a new page (e.g., `app/saigo/signin/page.tsx`) by copying and adjusting the original sign‑in page.
- Maintain `"use client"` at the top and replicate the recaptcha script loading logic.
- Create a new `ButtonSignin` component (or duplicate and adjust the existing one) that, on sign‑in actions, calls the new API callback route (e.g., `/api/auth/saigo-callback`).
- Retain the same environment variables (e.g., `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`) for reCAPTCHA integration.
- Ensure that the new sign‑in page functions fully independently from the existing sign‑in page.

## Context

### Beginning context
- The original sign‑in page exists at `app/signin/page.tsx` and uses the standard UI and API routes.

### Ending context
- A new Saigo sign‑in page exists (e.g., at `app/saigo/signin/page.tsx`) with an alternate daisy UI theme.
- It integrates reCAPTCHA v3 and provides both Google Auth and Magic Link sign‑in options using the new API endpoints.

## Low‑Level Tasks

### 1. Duplicate the Sign‑In Page
```plaintext
What file do you want to CREATE or UPDATE? -> Create a new file at `app/saigo/signin/page.tsx`
What function do you want to CREATE or UPDATE? -> Duplicate the authentication logic from the original sign‑in page.
What are details you want to add to drive the code changes? -> Copy the code from `app/signin/page.tsx` and update internal references (especially URLs) to point to Saigo endpoints.

### 2. Update UI theme

What file do you want to CREATE or UPDATE? -> `app/saigo/signin/page.tsx` (and any associated style or theme files)
What function do you want to CREATE or UPDATE? -> Update the rendering logic to apply a different daisy UI theme.
What are details you want to add to drive the code changes? -> Replace or augment daisyUI classes so that the page has a distinct look and feel.

### 3. Integrate Google reCAPTCHA v3

What file do you want to CREATE or UPDATE? -> `app/saigo/signin/page.tsx`
What function do you want to CREATE or UPDATE? -> Replicate the `useEffect` logic handling recaptcha script loading and token generation.
What are details you want to add to drive the code changes? -> Use the same recaptcha integration code and environment variables as in the original sign‑in page.

### 4. Implement Sign‑In Options with New API Endpoints

What file do you want to CREATE or UPDATE? -> Create or update the new `ButtonSignin` component (e.g., `components/saigo/ButtonSignin.tsx`)
What function do you want to CREATE or UPDATE? -> Update the `onClick` handlers for Google Auth and Magic Link sign‑in to call the new auth callback route (`/api/auth/saigo-callback`) instead of the original.
What are details you want to add to drive the code changes? -> Modify redirection URLs and endpoint calls so that they reference the new Saigo authentication API endpoints.


