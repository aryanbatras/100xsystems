import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { Navbar } from '../../../components/navbar/Navbar';
import { AuthModal } from '../../../components/auth/AuthModal';
import { supabase } from '../../../utils/supabase';
import styles from './Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };

    checkAuthStatus();
  }, [router]);

  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const errorMessage = urlParams?.get('error');

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loginCard}>
            <div className={styles.header}>
              <h1 className={styles.title}>Welcome to 100xSystems</h1>
              <p className={styles.subtitle}>Sign in to access your learning dashboard</p>
            </div>
            
            {errorMessage && (
              <div className={styles.errorMessage}>
                <p className={styles.errorText}>
                  {errorMessage === 'auth_failed' && 'Authentication failed. Please try again.'}
                  {errorMessage === 'access_denied' && 'Access denied. Please try again.'}
                  {errorMessage === 'unexpected_error' && 'An unexpected error occurred. Please try again.'}
                </p>
              </div>
            )}

            <div className={styles.providers}>
              <button
                onClick={() => setIsAuthModalOpen(true)}
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
                    Sign in with GitHub
                  </>
                )}
              </button>
            </div>

            <div className={styles.terms}>
              <p className={styles.termsText}>By signing in, you agree to our</p>
              <div className={styles.termsLinks}>
                <a href="/terms" className={styles.termsLink}>Terms</a>
                <span>and</span>
                <a href="/privacy" className={styles.termsLink}>Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}