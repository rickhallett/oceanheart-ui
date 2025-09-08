import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Anonymous (public) client
 */
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN; // e.g., .oceanheart.ai or .lvh.me
const SECURE_COOKIES = process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production';

export function createClient() {
  const store = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return store.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            store.set({
              name,
              value,
              ...options,
              domain: COOKIE_DOMAIN || (options as any)?.domain,
              secure: SECURE_COOKIES,
              sameSite: (options?.sameSite as any) ?? 'lax',
            });
          } catch {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            store.set({
              name,
              value: '',
              ...options,
              domain: COOKIE_DOMAIN || (options as any)?.domain,
              secure: SECURE_COOKIES,
              sameSite: (options?.sameSite as any) ?? 'lax',
              maxAge: 0,
            });
          } catch {}
        },
      },
    }
  );
}

/**
 * Service-role (admin) client
 */
export function createServiceClient() {
  const store = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return store.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            store.set({
              name,
              value,
              ...options,
              domain: options?.domain ?? COOKIE_DOMAIN,
              secure: SECURE_COOKIES,
              sameSite: (options?.sameSite as any) ?? 'lax',
            });
          } catch {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            store.set({
              name,
              value: '',
              ...options,
              domain: options?.domain ?? COOKIE_DOMAIN,
              secure: SECURE_COOKIES,
              sameSite: (options?.sameSite as any) ?? 'lax',
              maxAge: 0,
            });
          } catch {}
        },
      },
    }
  );
}
