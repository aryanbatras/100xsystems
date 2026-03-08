import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { shouldBlockAccess } from '../../utils/auth-helpers';
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
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Block access if user shouldn't access this route
  if (shouldBlockAccess(router.pathname, user)) {
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
  
  return <>{children}</>;
};
