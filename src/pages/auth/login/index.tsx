import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { useGlobalAuthModal } from '../../../contexts/GlobalAuthModalContext';
import { Navbar } from '../../../components/navbar/Navbar';
import { supabase } from '../../../utils/supabase';
import styles from '../../../styles/pages/auth/Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { loading } = useAuth();
  const { openAuthModal } = useGlobalAuthModal();

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
                onClick={openAuthModal}
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
                    Sign In
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
    </>
  );
}