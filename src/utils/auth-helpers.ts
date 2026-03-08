import { User } from '@supabase/supabase-js';

// Admin email addresses that have access to admin routes
const ADMIN_EMAILS: string[] = [
  // Add your admin email address here
   "batraaryan03@gmail.com"
];

/**
 * Check if a user is authorized to access admin routes
 * @param user - The authenticated user
 * @returns boolean indicating if user is an authorized admin
 */
export const isAdminUser = (user: User | null): boolean => {
  if (!user || !user.email) {
    return false;
  }
  
  return ADMIN_EMAILS.includes(user.email);
};

/**
 * Check if a user is authenticated
 * @param user - The user object from auth context
 * @returns boolean indicating if user is authenticated
 */
export const isUserAuthenticated = (user: User | null): boolean => {
  return user !== null;
};

/**
 * Get user display name for UI
 * @param user - The authenticated user
 * @returns string display name
 */
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return '';
  
  return (
    user.user_metadata?.full_name || 
    user.user_metadata?.name || 
    user.email?.split('@')[0] || 
    'User'
  );
};

/**
 * Simple route-based protection functions
 */

// Admin routes protection
export const isAdminRoute = (pathname: string): boolean => {
  const adminRoutes = ['/admin-dashboard', '/admin', '/parser'];
  return adminRoutes.some(route => pathname.startsWith(route));
};

// Authenticated routes protection  
export const isAuthRoute = (pathname: string): boolean => {
  const authRoutes = ['/articles', '/roadmaps', '/groups', '/graph'];
  return authRoutes.some(route => pathname.startsWith(route));
};

/**
 * Block access to protected routes - stop user from proceeding
 * @param pathname - Current route path
 * @param user - The authenticated user
 * @returns boolean indicating if access should be blocked
 */
export const shouldBlockAccess = (pathname: string, user: User | null): boolean => {
  // If user is not authenticated, block access to all protected routes
  if (!isUserAuthenticated(user)) {
    return isAdminRoute(pathname) || isAuthRoute(pathname);
  }
  
  // If user is authenticated but not admin, block access to admin routes only
  if (!isAdminUser(user) && isAdminRoute(pathname)) {
    return true;
  }
  
  // User can access the route
  return false;
};
