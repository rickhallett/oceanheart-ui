/**
 * NextAuth.js v5 Edge-Compatible Middleware
 *
 * Protects routes using NextAuth session validation.
 * Uses edge-compatible configuration (no database/Node.js APIs in middleware).
 */

import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/app/:path*", "/auth/:path*"],
};
