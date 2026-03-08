import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Admin emails that have access to admin routes
const ADMIN_EMAILS = ['batraaryan03@gmail.com'];

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
    // Create Supabase client for middleware
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            // Forward all request headers
            ...Object.fromEntries(request.headers.entries())
          }
        },
        // Use cookies from request
        auth: {
          persistSession: false
        }
      }
    );

    // Get session from cookies
    const accessToken = request.cookies.get('sb-access-token')?.value;
    const refreshToken = request.cookies.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      console.log(' Middleware: No auth cookies found');
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Verify the session
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });

    if (error || !session?.user) {
      console.log(' Middleware: Invalid session', { error, user: session?.user });
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check admin authorization for admin routes
    if (isAdminRoute && session?.user) {
      const userEmail = session.user.email;
      
      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        console.log(' Middleware: Admin access denied for email:', userEmail);
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    console.log(' Middleware: Access granted for:', session.user.email);
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
