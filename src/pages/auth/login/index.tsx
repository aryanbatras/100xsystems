import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';
import { Navbar } from '../../../components/navbar/Navbar';
import { Footer } from '../../../components/footer/Footer';
import { supabase } from '../../../utils/supabase';

export default function LoginPage() {
  const router = useRouter();
  const { loading, signInWithGitHub } = useAuth();

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

  const handleGitHubLogin = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const errorMessage = urlParams?.get('error');

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to 100xSystems</h2>
              <p className="text-gray-600 mb-8">Sign in to access your learning dashboard</p>
              
              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border border-red-200 rounded-md">
                  <div className="text-red-800 text-sm">
                    {errorMessage === 'auth_failed' && 'Authentication failed. Please try again.'}
                    {errorMessage === 'access_denied' && 'Access denied. Please try again.'}
                    {errorMessage === 'unexpected_error' && 'An unexpected error occurred. Please try again.'}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleGitHubLogin}
                  disabled={loading}
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10-4.477 10-10S4.477 0 10 0zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8 8 8-3.582 8-8 8zm7.418-2c-.532 0-.954-.468-.954-1s-.418 1-1 1h-1c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1zm-5 4c0 .532-.468 1-1 1s-.468 1-1 1H4c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1zm11 2c0 .532-.468 1-1 1s-.468 1-1 1h-1c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1zm-5 4c0 .532-.468 1-1 1s-.468 1-1 1H4c-.532 0-1-.468-1-1s.468-1 1-1h1c.532 0 1 .468 1 1s-.468 1-1 1h1z" clipRule="evenodd" />
                      </svg>
                      Sign in with GitHub
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p>By signing in, you agree to our</p>
                <div className="space-x-1">
                  <a href="/terms" className="text-blue-600 hover:text-blue-500">Terms</a>
                  <span>and</span>
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
