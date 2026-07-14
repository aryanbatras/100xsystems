/**
 * ## Infrastructure: Profiles Database Service
 *
 * Service for managing user profiles, preferences, and
 * account data in Supabase.
 *
 * @packageDocumentation
 */

import { supabase } from '../supabase';
import { Profile, UserPreferences, ProfileWithPreferences } from '../../application/types/database.types';

export class ProfilesService {
  private static log(message: string, data?: any, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [ProfilesService] ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'error':
        break;
      case 'warn':
        break;
      default:
    }
  }

  static async getProfile(userId: string): Promise<Profile | null> {
    this.log('Fetching profile', { userId });
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        this.log('Error fetching profile', { userId, error: error.message, code: error.code }, 'error');
        throw error;
      }
      
      this.log('Successfully fetched profile', { userId, hasData: !!data, profileFields: data ? Object.keys(data) : [] });
      return data;
    } catch (error) {
      this.log('Exception in getProfile', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async getProfileWithPreferences(userId: string): Promise<ProfileWithPreferences | null> {
    this.log('Fetching profile with preferences', { userId });
    
    try {
      // First fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);

      if (profileError) {
        this.log('Error fetching profile', { userId, error: profileError.message, code: profileError.code }, 'error');
        throw profileError;
      }

      if (!profileData || profileData.length === 0) {
        this.log('No profile found - user needs to create profile manually', { userId }, 'warn');
        return null; // Return null - frontend should show "complete profile" flow
      }

      const profile = profileData[0];

      // Then fetch preferences separately
      let preferencesData = null;
      try {
        const { data: prefData, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', userId);

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          this.log('Error fetching preferences', { userId, error: preferencesError.message, code: preferencesError.code }, 'warn');
        }
        
        preferencesData = (prefData && prefData.length > 0) ? prefData[0] : null;
      } catch (prefErr) {
        this.log('Exception fetching preferences', { userId, error: prefErr instanceof Error ? prefErr.message : 'Unknown error' }, 'warn');
      }

      const result: ProfileWithPreferences = {
        ...profile,
        preferences: preferencesData
      };
      
      this.log('Successfully fetched profile with preferences', { 
        userId, 
        hasProfile: !!profileData,
        hasPreferences: !!preferencesData,
        profileFields: Object.keys(profileData),
        preferencesFields: preferencesData ? Object.keys(preferencesData) : []
      });
      return result;
    } catch (error) {
      this.log('Exception in getProfileWithPreferences', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
    this.log('Updating profile', { userId, updateFields: Object.keys(updates), updateData: updates });
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        this.log('Error updating profile', { userId, error: error.message, code: error.code }, 'error');
        throw error;
      }
      
      this.log('Successfully updated profile', { userId, hasData: !!data, updatedFields: data ? Object.keys(data) : [] });
      return data;
    } catch (error) {
      this.log('Exception in updateProfile', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async updatePreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences | null> {
    this.log('Updating preferences', { userId, preferenceFields: Object.keys(preferences), preferenceData: preferences });
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .update({
          ...preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        this.log('Error updating preferences', { userId, error: error.message, code: error.code }, 'error');
        throw error;
      }
      
      this.log('Successfully updated preferences', { userId, hasData: !!data, updatedFields: data ? Object.keys(data) : [] });
      return data;
    } catch (error) {
      this.log('Exception in updatePreferences', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async createPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences | null> {
    this.log('Creating preferences', { userId, preferenceFields: Object.keys(preferences), preferenceData: preferences });
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .insert({
          id: userId,
          ...preferences,
        })
        .select()
        .single();

      if (error) {
        this.log('Error creating preferences', { userId, error: error.message, code: error.code }, 'error');
        throw error;
      }
      
      this.log('Successfully created preferences', { userId, hasData: !!data, createdFields: data ? Object.keys(data) : [] });
      return data;
    } catch (error) {
      this.log('Exception in createPreferences', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async uploadAvatar(userId: string, file: File): Promise<string | null> {
    this.log('Uploading avatar', { userId, fileName: file.name, fileSize: file.size, fileType: file.type });
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;
      
      this.log('Uploading file to storage', { userId, fileName, fileExt });
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        this.log('Error uploading avatar to storage', { userId, fileName, error: uploadError.message }, 'error');
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      this.log('Successfully uploaded avatar', { userId, fileName, publicUrl });

      // Update profile with new avatar URL
      const updateResult = await this.updateProfile(userId, { avatar_url: publicUrl });
      
      if (updateResult) {
        this.log('Successfully updated profile with avatar URL', { userId, publicUrl });
        return publicUrl;
      } else {
        this.log('Failed to update profile with avatar URL', { userId, publicUrl }, 'warn');
        return publicUrl; // Still return URL even if profile update failed
      }
    } catch (error) {
      this.log('Exception in uploadAvatar', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async searchProfiles(query: string, limit: number = 10): Promise<Profile[]> {
    this.log('Searching profiles', { query, limit });
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_public', true)
        .or(`username.ilike.%${query}%,full_name.ilike.%${query}%,bio.ilike.%${query}%`)
        .limit(limit);

      if (error) {
        this.log('Error searching profiles', { query, limit, error: error.message }, 'error');
        throw error;
      }
      
      this.log('Successfully searched profiles', { query, limit, resultCount: data?.length || 0 });
      return data || [];
    } catch (error) {
      this.log('Exception in searchProfiles', { query, limit, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return [];
    }
  }

  static async getMentors(limit: number = 20): Promise<Profile[]> {
    this.log('Fetching mentors', { limit });
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_mentor', true)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        this.log('Error fetching mentors', { limit, error: error.message }, 'error');
        throw error;
      }
      
      this.log('Successfully fetched mentors', { limit, resultCount: data?.length || 0 });
      return data || [];
    } catch (error) {
      this.log('Exception in getMentors', { limit, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return [];
    }
  }

  static async updateLastActive(userId: string): Promise<void> {
    this.log('Updating last active timestamp', { userId });
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          last_active_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        this.log('Error updating last active', { userId, error: error.message }, 'error');
      } else {
        this.log('Successfully updated last active', { userId });
      }
    } catch (error) {
      this.log('Exception in updateLastActive', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
    }
  }

  static async getProfileByUsername(username: string): Promise<Profile | null> {
    this.log('Fetching profile by username', { username });
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .eq('is_public', true)
        .single();

      if (error) {
        this.log('Error fetching profile by username', { username, error: error.message }, 'error');
        throw error;
      }
      
      this.log('Successfully fetched profile by username', { username, hasData: !!data });
      return data;
    } catch (error) {
      this.log('Exception in getProfileByUsername', { username, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async followUser(userId: string, targetUserId: string): Promise<boolean> {
    this.log('Following user', { userId, targetUserId });
    
    try {
      const { error } = await supabase
        .from('user_follows')
        .insert({
          follower_id: userId,
          following_id: targetUserId,
        });

      if (error) {
        this.log('Error following user', { userId, targetUserId, error: error.message }, 'error');
        return false;
      }
      
      this.log('Successfully followed user', { userId, targetUserId });
      return true;
    } catch (error) {
      this.log('Exception in followUser', { userId, targetUserId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return false;
    }
  }

  static async unfollowUser(userId: string, targetUserId: string): Promise<boolean> {
    this.log('Unfollowing user', { userId, targetUserId });
    
    try {
      const { error } = await supabase
        .from('user_follows')
        .delete()
        .eq('follower_id', userId)
        .eq('following_id', targetUserId);

      if (error) {
        this.log('Error unfollowing user', { userId, targetUserId, error: error.message }, 'error');
        return false;
      }
      
      this.log('Successfully unfollowed user', { userId, targetUserId });
      return true;
    } catch (error) {
      this.log('Exception in unfollowUser', { userId, targetUserId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return false;
    }
  }

  static async getFollowers(userId: string): Promise<Profile[]> {
    this.log('Fetching followers', { userId });
    
    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          follower:profiles!user_follows_follower_id_fkey (*)
        `)
        .eq('following_id', userId);

      if (error) {
        this.log('Error fetching followers', { userId, error: error.message }, 'error');
        throw error;
      }
      
      const followers = data?.map((follow: any) => follow.follower).filter(Boolean) || [];
      this.log('Successfully fetched followers', { userId, resultCount: followers.length });
      return followers;
    } catch (error) {
      this.log('Exception in getFollowers', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return [];
    }
  }

  static async getFollowing(userId: string): Promise<Profile[]> {
    this.log('Fetching following', { userId });
    
    try {
      const { data, error } = await supabase
        .from('user_follows')
        .select(`
          following:profiles!user_follows_following_id_fkey (*)
        `)
        .eq('follower_id', userId);

      if (error) {
        this.log('Error fetching following', { userId, error: error.message }, 'error');
        throw error;
      }
      
      const following = data?.map((follow: any) => follow.following).filter(Boolean) || [];
      this.log('Successfully fetched following', { userId, resultCount: following.length });
      return following;
    } catch (error) {
      this.log('Exception in getFollowing', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return [];
    }
  }
}
