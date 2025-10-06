/**
 * NextAuth.js v5 API Route Handler
 *
 * This catch-all route handles all NextAuth.js authentication requests.
 * Required for NextAuth v5 to work with the App Router.
 */

import { handlers } from "@/auth";

export const { GET, POST } = handlers;
