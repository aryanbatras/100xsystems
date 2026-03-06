import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, signInWithGitHub, signOut, getCurrentUser, getCurrentSession, syncUserProfile } from '../utils/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const session = await getCurrentSession();
      const user = await getCurrentUser();
      
      setSession(session);
      setUser(user);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Sync user profile when user signs in
        if (event === 'SIGNED_IN' && session?.user) {
          await syncUserProfile(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignInWithGitHub = async () => {
    setLoading(true);
    const { error } = await signInWithGitHub();
    if (error) {
      console.error('GitHub sign in error:', error);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await signOut();
    if (error) {
      console.error('Sign out error:', error);
    } else {
      setUser(null);
      setSession(null);
    }
    setLoading(false);
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signInWithGitHub: handleSignInWithGitHub,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
