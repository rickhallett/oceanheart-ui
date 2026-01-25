/**
 * Client-Side Providers Wrapper
 *
 * Wraps the application with necessary providers.
 * Must be a client component to use React Context.
 *
 * Note: SessionProvider is currently disabled as authentication features
 * are not in use. To re-enable, uncomment SessionProvider import and wrapper.
 */

"use client";

// import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/contexts/UserContext";
import { CourseProvider } from "@/contexts/CourseContext";

export function Providers({ children }: { children: React.ReactNode }) {
  // SessionProvider disabled - auth features not in use
  // To re-enable: wrap children with <SessionProvider>
  return (
    <UserProvider>
      <CourseProvider>
        {children}
      </CourseProvider>
    </UserProvider>
  );
}
