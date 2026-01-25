/**
 * NextAuth.js v5 Edge-Compatible Middleware
 *
 * Authentication middleware is currently disabled as there are no features
 * requiring authentication. The /app/* routes remain but are public.
 *
 * To re-enable auth protection:
 * 1. Set AUTH_SECRET environment variable
 * 2. Uncomment the auth middleware below
 * 3. Update the matcher to protect desired routes
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Auth middleware disabled - pass through all requests
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// No routes are protected - auth is disabled
export const config = {
  matcher: [],
};
