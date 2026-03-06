import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';

export default function UserDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !user) {
      router.push('/auth/login');
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

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Authentication Required</h2>
            <p className="text-gray-600 mt-2">Please sign in to access your dashboard.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Hello, {user.user_metadata?.full_name || user.email?.split('@')[0]}! 
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Profile Information</h3>
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Username:</strong> {user.user_metadata?.user_name || 'Not set'}</p>
                  <p><strong>Full Name:</strong> {user.user_metadata?.full_name || 'Not set'}</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Authentication Status</h3>
                <div className="space-y-2">
                  <p><strong>Status:</strong> <span className="text-green-600">Authenticated</span></p>
                  <p><strong>Provider:</strong> GitHub</p>
                  <p><strong>User ID:</strong> {user.id}</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Quick Actions</h3>
                <div className="space-y-3">
                  <a href="/profile" className="block text-blue-600 hover:text-blue-800">View Profile</a>
                  <a href="/articles" className="block text-blue-600 hover:text-blue-800">Browse Articles</a>
                  <a href="/roadmaps" className="block text-blue-600 hover:text-blue-800">View Roadmaps</a>
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
