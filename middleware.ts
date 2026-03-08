import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin email addresses that have access to admin routes
const ADMIN_EMAILS: string[] = [
  "batraaryan03@gmail.com"
  // Add your admin email address here
];

// Routes that require admin access
const ADMIN_ROUTES = ['/admin-dashboard', '/admin', '/parser'];

// Routes that require user authentication
const AUTH_ROUTES = ['/articles', '/roadmaps', '/groups', '/graph'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route requires protection
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  
  if (!isAdminRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  try {
    // Get the session from the request
    const authCookie = request.cookies.get('sb-access-token');
    const refreshCookie = request.cookies.get('sb-refresh-token');
    
    if (!authCookie?.value || !refreshCookie?.value) {
      // No session cookies found
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/?admin-required=true', request.url));
      } else if (isAuthRoute) {
        return NextResponse.redirect(new URL('/?auth-required=true', request.url));
      }
    }

    // Verify the session
    const { data: { session }, error } = await supabase.auth.setSession({
      access_token: authCookie!.value,
      refresh_token: refreshCookie!.value
    });

    if (error || !session?.user) {
      // Invalid session
      if (isAdminRoute) {
        return NextResponse.redirect(new URL('/?admin-required=true', request.url));
      } else if (isAuthRoute) {
        return NextResponse.redirect(new URL('/?auth-required=true', request.url));
      }
    }

    // Check admin authorization for admin routes
    if (isAdminRoute && session?.user) {
      const userEmail = session.user.email;
      
      if (!userEmail || !ADMIN_EMAILS.includes(userEmail)) {
        // User is not an authorized admin
        return NextResponse.redirect(new URL('/?unauthorized=true', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    
    // If there's an error, redirect to home with error
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/?admin-required=true', request.url));
    } else if (isAuthRoute) {
      return NextResponse.redirect(new URL('/?auth-required=true', request.url));
    }
    
    return NextResponse.next();
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
