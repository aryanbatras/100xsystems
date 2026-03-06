import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loading, signInWithGitHub, signInWithGoogle } = useAuth();

  if (!isOpen) return null;

  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      onClose();
    } catch (error) {
      console.error('GitHub sign in error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Sign In to 100xSystems</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.content}>
          <p className={styles.description}>
            Choose your preferred sign-in method to access your learning dashboard
          </p>
          
          <div className={styles.providers}>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={styles.providerButton}
            >
              {loading ? (
                <>
                  <div className={styles.spinner}></div>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className={styles.providerIcon} viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
            
            <button
              onClick={handleGitHubSignIn}
              disabled={loading}
              className={styles.providerButton}
            >
              {loading ? (
                <>
                  <div className={styles.spinner}></div>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className={styles.providerIcon} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10c5.523 0 10-4.477 10-10S15.523 0 10 0zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm7.418-2c-.532 0-.954-.468-.954-1s-.418 1-1 1h-1c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1zm-5 4c0 .532-.468 1-1 1s-.468 1-1 1H4c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1zm11 2c0 .532-.468 1-1 1s-.468 1-1 1h-1c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1zm-5 4c0 .532-.468 1-1 1s-.468 1-1 1H4c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1z" clipRule="evenodd" />
                  </svg>
                  Continue with GitHub
                </>
              )}
            </button>
          </div>
          
          <div className={styles.terms}>
            <p>By signing in, you agree to our</p>
            <div className={styles.termsLinks}>
              <a href="/terms" className={styles.termsLink}>Terms</a>
              <span>and</span>
              <a href="/privacy" className={styles.termsLink}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
