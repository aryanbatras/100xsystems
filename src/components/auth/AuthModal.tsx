import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loading, signInWithGitHub } = useAuth();

  if (!isOpen) return null;

  const handleGitHubSignIn = async () => {
    try {
      await signInWithGitHub();
      onClose();
    } catch (error) {
      console.error('GitHub sign in error:', error);
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
            
            <div className={styles.comingSoon}>
              <p>More providers coming soon!</p>
            </div>
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
