import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { isAdminUser, isUserAuthenticated } from '../../utils/auth-helpers';
import { Loading } from '../loading/Loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireAuth?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false, 
  requireAuth = false 
}) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    // Check if user is authenticated
    const isAuthenticated = isUserAuthenticated(user);
    
    // Check if user is admin (for admin routes)
    const isAdmin = isAdminUser(user);

    // Handle unauthenticated users
    if (requireAuth && !isAuthenticated) {
      router.push('/?auth-required=true');
      return;
    }

    // Handle non-admin users trying to access admin routes
    if (requireAdmin && !isAdmin) {
      router.push('/?unauthorized=true');
      return;
    }
  }, [user, loading, router, requireAdmin, requireAuth]);

  // Show loading while checking auth
  if (loading) {
    return <Loading />;
  }

  // Check if user is authenticated
  const isAuthenticated = isUserAuthenticated(user);
  
  // Check if user is admin (for admin routes)
  const isAdmin = isAdminUser(user);

  // Handle unauthenticated users
  if (requireAuth && !isAuthenticated) {
    return <Loading />;
  }

  // Handle non-admin users trying to access admin routes
  if (requireAdmin && !isAdmin) {
    return <Loading />;
  }

  return <>{children}</>;
};
