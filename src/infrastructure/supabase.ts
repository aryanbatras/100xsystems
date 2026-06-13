/**
 * ## Infrastructure: Supabase Client
 *
 * Singleton Supabase client instance and authentication
 * helper functions. Provides centralized access to the
 * Supabase backend for all database services.
 *
 * @packageDocumentation
 */

import { createClient, User, Session } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Auth helper functions
export const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  
  if (error) {
  } else {
  }
  
  return { error };
};

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  
  if (error) {
  } else {
  }
  
  return { error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Database helper functions
export const syncUserProfile = async (user: User) => {
  try {
    
    const profileData = {
      id: user.id,
      username: user.user_metadata?.user_name || user.user_metadata?.name || user.email?.split('@')[0],
      full_name: user.user_metadata?.full_name || user.user_metadata?.name,
      avatar_url: user.user_metadata?.avatar_url,
      github_username: user.user_metadata?.user_name,
      updated_at: new Date().toISOString()
    };
    
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData, {
        onConflict: 'id',
        ignoreDuplicates: false
      });
    
    
    if (error) {
      // Don't fail auth if profile sync fails
    } else {
    }
    
    return { error };
  } catch (err) {
    return { error: err };
  }
};