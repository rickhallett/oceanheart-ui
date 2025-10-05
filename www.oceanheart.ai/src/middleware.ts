import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for the member portal
  if (request.nextUrl.pathname.startsWith('/app')) {
    // Get auth state from cookies or check if user has valid session
    // Since we're using localStorage for auth, we need to check client-side
    // We'll use a cookie-based approach for SSR compatibility

    const authCookie = request.cookies.get('bd_user_auth');

    if (!authCookie) {
      // No auth cookie, redirect to signin
      const url = request.nextUrl.clone();
      url.pathname = '/auth/signin';
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    try {
      const auth = JSON.parse(authCookie.value);
      if (!auth.isAuthenticated || !auth.userId) {
        // Invalid auth state, redirect to signin
        const url = request.nextUrl.clone();
        url.pathname = '/auth/signin';
        url.searchParams.set('callbackUrl', request.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    } catch {
      // Invalid JSON in cookie, redirect to signin
      const url = request.nextUrl.clone();
      url.pathname = '/auth/signin';
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
