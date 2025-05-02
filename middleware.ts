import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Add logging for Vercel debugging
  console.log(`Middleware triggered for path: ${pathname}`);

  // Check if the request is for the recruitment page
  if (pathname === '/recruitment') {
    console.log('Checking /recruitment route...');
    const adminKey = searchParams.get('admin');
    const expectedKey = process.env.ADMIN_VIEW_ROUTE_KEY;
    console.log(`Provided admin key: ${adminKey[0]}...`);
    // Avoid logging the expected key directly in production logs ideally
    // console.log(`Expected admin key: ${expectedKey}`);

    // Ensure the key is set in environment variables
    if (!expectedKey) {
      console.error('ADMIN_VIEW_ROUTE_KEY environment variable is not set.');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check if the provided key matches the expected key
    if (adminKey !== expectedKey) {
      console.log('Recruitment access denied: Invalid or missing admin key.');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Key is valid, allow the request to proceed
    console.log('Recruitment access granted.');
    return NextResponse.next();
  }

  // For any other path, just continue
  console.log('Allowing request for non-recruitment path.');
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // Restore the default Vercel matcher
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
