import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Admin emails that have access to admin routes
const ADMIN_EMAILS = ['batraaryan03@gmail.com'];

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define protected routes
  const adminRoutes = ['/admin-dashboard', '/admin', '/parser'];
  const authRoutes = ['/articles', '/roadmaps', '/groups', '/graph'];

  // Check if current path is protected
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // If not a protected route, continue
  if (!isAdminRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  try {
    // Get the session from the request
    const authCookie = request.cookies.get('sb-access-token');
    const refreshCookie = request.cookies.get('sb-refresh-token');
    
    if (!authCookie?.value || !refreshCookie?.value) {
      // No session cookies found - redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Verify the session
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: authCookie!.value,
      refresh_token: refreshCookie!.value
    });

    if (error || !session?.user) {
      // Invalid session - redirect to home
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check admin authorization for admin routes
    if (isAdminRoute && session?.user) {
      const userEmail = session.user.email;
      
      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        // User is not an authorized admin - redirect to home
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's an error, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/admin-dashboard/:path*',
    '/admin/:path*',
    '/parser/:path*',
    '/articles/:path*',
    '/roadmaps/:path*',
    '/groups/:path*',
    '/graph/:path*'
  ]
};
