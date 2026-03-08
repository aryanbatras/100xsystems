import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { isAdminUser, isUserAuthenticated } from '../../utils/auth-helpers';
import { Loading } from '../loading/Loading';
import { AuthModal } from './AuthModal';
import styles from './ProtectedRoute.module.css';

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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Show loading while checking auth
  if (loading) {
    return <Loading />;
  }

  // Check if user is authenticated
  const isAuthenticated = isUserAuthenticated(user);
  
  // Check if user is admin (for admin routes)
  const isAdmin = isAdminUser(user);

  // Handle unauthenticated users - show AuthModal
  if (requireAuth && !isAuthenticated) {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Sign In Required</h1>
            <p className={styles.description}>
              Please sign in to access this page. You'll need to create an account or log in to continue.
            </p>
            <div className={styles.actions}>
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={styles.button}
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/')}
                className={`${styles.button} ${styles.secondary}`}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
        />
      </>
    );
  }

  // Handle non-admin users trying to access admin routes
  if (requireAdmin && !isAdmin) {
    return (
      <div className={`${styles.container} ${styles.error}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>Access Denied</h1>
          <p className={styles.description}>
            You don't have permission to access this admin area. This page is restricted to administrators only.
          </p>
          <div className={styles.actions}>
            <button
              onClick={() => router.push('/')}
              className={styles.button}
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
