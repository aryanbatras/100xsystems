/**
 * ## Infrastructure: Auth Helpers
 *
 * Route protection and access control utilities.
 *
 * @packageDocumentation
 */

import { User } from '@supabase/supabase-js';

const ADMIN_EMAILS: string[] = [
  "batraaryan03@gmail.com"
];

/** Check if a user is an authorized admin. */
export const isAdminUser = (user: User | null): boolean => {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email);
};

/** Check if a user is authenticated. */
export const isUserAuthenticated = (user: User | null): boolean => {
  return user !== null;
};

/** Get a display name for the user. */
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return '';
  return (
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'User'
  );
};

/** Check if the pathname is an admin-only route. */
export const isAdminRoute = (pathname: string): boolean => {
  const adminRoutes = ['/admin-dashboard', '/admin', '/parser'];
  return adminRoutes.some(route => pathname.startsWith(route));
};

/** Check if the pathname requires authentication. */
export const isAuthRoute = (pathname: string): boolean => {
  const authRoutes = ['/articles', '/roadmaps', '/groups', '/graph'];
  return authRoutes.some(route => pathname.startsWith(route));
};

/** Determine if access to the given pathname should be blocked. */
export const shouldBlockAccess = (pathname: string, user: User | null): boolean => {
  if (!isUserAuthenticated(user)) {
    return isAdminRoute(pathname) || isAuthRoute(pathname);
  }
  if (!isAdminUser(user) && isAdminRoute(pathname)) {
    return true;
  }
  return false;
};
