/**
 * ## Presentation: Auth Page
 *
 * Authentication page with redirect logic and
 * sign-in prompt for unauthenticated users.
 *
 * @packageDocumentation
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../presentation/contexts/AuthContext';
import { Navbar } from '../../presentation/components/navbar/Navbar';
import { Footer } from '../../presentation/components/footer/Footer';

export default function AuthPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/user-dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h1>
              <p className="text-gray-600 mb-6">Please choose an authentication option</p>
              <a href="/auth/login" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
