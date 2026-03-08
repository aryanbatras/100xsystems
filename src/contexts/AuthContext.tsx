import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, signInWithGitHub, signInWithGoogle, signOut, getCurrentUser, getCurrentSession, syncUserProfile } from '../utils/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGitHub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
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
      console.log('🔍 AuthContext: Getting initial session...');
      const session = await getCurrentSession();
      const user = await getCurrentUser();
      
      console.log('🔍 AuthContext: Initial session:', session);
      console.log('🔍 AuthContext: Initial user:', user);
      
      setSession(session);
      setUser(user);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔍 AuthContext: Auth state change:', { event, session });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Sync user profile when user signs in
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('🔍 AuthContext: User signed in, syncing profile...', session.user);
          const { error } = await syncUserProfile(session.user);
          if (error) {
            console.error('🔍 AuthContext: Profile sync failed:', error);
          } else {
            console.log('🔍 AuthContext: Profile sync successful');
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignInWithGitHub = async () => {
    console.log('🔍 AuthContext: Starting GitHub sign in...');
    setLoading(true);
    const { error } = await signInWithGitHub();
    if (error) {
      console.error('🔍 AuthContext: GitHub sign in error:', error);
    } else {
      console.log('🔍 AuthContext: GitHub sign in initiated successfully');
    }
    setLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    console.log('🔍 AuthContext: Starting Google sign in...');
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      console.error('🔍 AuthContext: Google sign in error:', error);
    } else {
      console.log('🔍 AuthContext: Google sign in initiated successfully');
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
    signInWithGoogle: handleSignInWithGoogle,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
