import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/api/auth'];
  const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith('/api/auth'));

  const token = request.cookies.get('token')?.value;

  // If trying to access a protected route without a token, redirect to login
  if (!isPublicPath && !token) {
    // Only redirect if it's a page request, optionally we can verify paths
    // But for simplicity, any non-public path without token redirects to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If already logged in and trying to access login page, redirect to a default dashboard
  if (pathname === '/login' && token) {
    const userRole = request.cookies.get('userRole')?.value;
    switch (userRole) {
      case 'SUPERADMIN':
      case 'SUPER_ADMIN':
        return NextResponse.redirect(new URL('/super-admin', request.url));
      case 'ADMIN':
        return NextResponse.redirect(new URL('/organizer', request.url));
      case 'STAFF':
        return NextResponse.redirect(new URL('/staff', request.url));
      default:
        // By default redirect to a dashboard if role isn't recognized somehow
        return NextResponse.redirect(new URL('/organizer', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes except those we might want to attach logic)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
