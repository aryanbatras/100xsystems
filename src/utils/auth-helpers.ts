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
 * Get user display name
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
 * Check if current route requires admin access
 * @param pathname - Current route path
 * @returns boolean indicating if route requires admin access
 */
export const requiresAdminAccess = (pathname: string): boolean => {
  const adminRoutes = ['/admin-dashboard', '/admin', '/parser'];
  return adminRoutes.some(route => pathname.startsWith(route));
};

/**
 * Check if current route requires authentication
 * @param pathname - Current route path
 * @returns boolean indicating if route requires authentication
 */
export const requiresAuthentication = (pathname: string): boolean => {
  const authRoutes = ['/articles', '/roadmaps', '/groups', '/graph'];
  return authRoutes.some(route => pathname.startsWith(route));
};

/**
 * Get redirect URL for unauthorized access
 * @param isAuthRequired - Whether authentication is required
 * @param isAdminRequired - Whether admin access is required
 * @returns redirect URL string
 */
export const getUnauthorizedRedirectUrl = (
  isAuthRequired: boolean, 
  isAdminRequired: boolean
): string => {
  if (isAdminRequired) {
    return '/?unauthorized=true';
  }
  if (isAuthRequired) {
    return '/?auth-required=true';
  }
  return '/';
};
