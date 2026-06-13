/**
 * ## Infrastructure: Supabase Client
 *
 * Creates and exports the Supabase client instance with auth
 * helper functions for sign-in, sign-out, and session management.
 *
 * @packageDocumentation
 */

import { createClient, User } from "@supabase/supabase-js";

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

/** Sign in with GitHub OAuth provider. */
export const signInWithGitHub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { error };
};

/** Sign in with Google OAuth provider. */
export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });
  return { error };
};

/** Sign out the current user. */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/** Get the currently authenticated user. */
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

/** Get the current session. */
export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

/** Sync the user profile with the profiles table after sign-in. */
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
    }

    return { error };
  } catch (err) {
    return { error: err };
  }
};
