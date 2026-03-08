import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase, getCurrentSession } from '../../../utils/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log('🔍 AuthCallback: Processing auth callback...');
      console.log('🔍 AuthCallback: Current URL:', window.location.href);
      
      try {
        // Get the session after OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        console.log('🔍 AuthCallback: getSession result:', { data, error });
        
        if (error) {
          console.error('🔍 AuthCallback: Auth callback error:', error);
          router.push('/auth/login?error=auth_failed');
          return;
        }

        if (data.session) {
          console.log('🔍 AuthCallback: Successfully authenticated:', data.session.user);
          // User profile is automatically synced in AuthContext
          router.push('/user-dashboard');
        } else {
          // No session found, redirect to login
          console.log('🔍 AuthCallback: No session found, redirecting to login');
          router.push('/auth/login');
        }
      } catch (err) {
        console.error('🔍 AuthCallback: Unexpected error in auth callback:', err);
        router.push('/auth/login?error=unexpected_error');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authenticating...</h2>
            <p className="text-gray-600">Please wait while we complete your authentication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
