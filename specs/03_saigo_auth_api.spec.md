# Saigo Authentication API Specification

> This specification defines new API endpoints to support the Saigo authentication flow by duplicating existing authentication logic while maintaining separate directory paths and endpoint URLs.

## High-Level Objective
- Establish new API endpoints for Saigo authentication by duplicating current authentication API functionality while ensuring complete separation from the original endpoints.

## Mid-Level Objectives
- Create a new callback API route for Saigo authentication at `/api/auth/saigo-callback`.
- Create a new reCAPTCHA verification API route for Saigo at `/api/auth/saigo-verify-and-sign-in`.
- Use the same environment variables and underlying logic as the original endpoints to reduce implementation risk.

## Implementation Notes
- The new callback endpoint should mirror the behavior of `app/api/auth/callback/route.ts`:
  - Retrieve the authorization code from URL parameters.
  - Use the Supabase client to exchange the code for a session.
  - Redirect to the callback URL defined in config (ensure any Saigo-specific adaptations are applied).
- The new reCAPTCHA verification endpoint should mirror the logic of `app/api/auth/verify-and-signin/route.ts`:
  - Accept a reCAPTCHA token and validate it via Google’s reCAPTCHA API.
  - Return a success or error response accordingly.
- Deliberate code duplication is used to prevent early abstraction. Maintaining two parallel implementations minimizes risk—each flow can evolve independently without unexpected side effects.
- Apply the new app router directory structure:
  - **New Callback Endpoint:** `app/api/auth/saigo-callback/route.ts`
  - **New reCAPTCHA Verification Endpoint:** `app/api/auth/saigo-verify-and-sign-in/route.ts`

## Context

### Beginning Context
- Original authentication API endpoints exist at:
  - `app/api/auth/callback/route.ts`
  - `app/api/auth/verify-and-signin/route.ts`

### Ending Context
- New API endpoints exist exclusively for the Saigo authentication flow:
  - **Saigo Callback:** `app/api/auth/saigo-callback/route.ts`
  - **Saigo reCAPTCHA Verification:** `app/api/auth/saigo-verify-and-sign-in/route.ts`

## Low-Level Tasks

### 1. Create Saigo Callback API Route
```plaintext
What file do you want to CREATE or UPDATE? -> Create new file at `app/api/auth/saigo-callback/route.ts`
What function do you want to CREATE or UPDATE? -> Duplicate and adapt the logic from `app/api/auth/callback/route.ts`.
What are details you want to add to drive the code changes? -> Update redirection URLs and any references to ensure the endpoint fits the Saigo flow.
```

### 2. Create Saigo reCAPTCHA Verification API Route
```plaintext
What file do you want to CREATE or UPDATE? -> Create new file at `app/api/auth/saigo-verify-and-sign-in/route.ts`
What function do you want to CREATE or UPDATE? -> Duplicate and adapt the logic from `app/api/auth/verify-and-signin/route.ts`.
What are details you want to add to drive the code changes? -> Ensure that the same environment variables (e.g., for reCAPTCHA) are used and the response is structured identically.
```

### 3. Validate the New API Endpoints
```plaintext
What file do you want to CREATE or UPDATE? -> No file update; this task involves testing.
What function do you want to CREATE or UPDATE? -> Verify endpoint behavior manually or with integration tests.
What are details you want to add to drive the code changes? -> Test that each new endpoint behaves in line with its original counterpart, ensuring seamless integration with the new Saigo sign-in page.



