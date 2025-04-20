import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/libs/supabase/middleware";

export async function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith("/hdi")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  const { pathname, searchParams } = request.nextUrl;

  // Check if the request is for the recruitment page
  if (pathname === '/recruitment') {
    const adminKey = searchParams.get('admin');
    const expectedKey = process.env.ADMIN_VIEW_ROUTE_KEY;

    // Ensure the key is set in environment variables
    if (!expectedKey) {
      console.error('ADMIN_VIEW_ROUTE_KEY environment variable is not set.');
      // Redirect to homepage or an error page in production
      // Avoid leaking info about missing env var
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check if the provided key matches the expected key
    if (adminKey !== expectedKey) {
      // Redirect to homepage if the key is missing or incorrect
      console.log('Recruitment access denied: Invalid or missing admin key.');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Key is valid, allow the request to proceed
    console.log('Recruitment access granted.');
    return NextResponse.next();
  }

  // For any other path, just continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
