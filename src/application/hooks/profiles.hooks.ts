/**
 * ## Profiles Domain: React Hooks
 *
 * Focused hooks for user profile management — fetching, updating,
 * and managing user profile data and preferences.
 *
 * @packageDocumentation
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../presentation/contexts/AuthContext';
import { ProfilesService } from '../../infrastructure/database/profilesService';
import { Profile, UserPreferences, ProfileWithPreferences } from '../types/database.types';

/**
 * Return type of the useUserProfile hook.
 *
 * @public
 */
export interface UseUserProfileReturn {
  profile: ProfileWithPreferences | null;
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<Profile>) => Promise<boolean>;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<boolean>;
  uploadAvatar: (file: File) => Promise<string | null>;
  refreshProfile: () => Promise<void>;
}

/**
 * Hook for fetching and updating the current user's profile.
 *
 * @remarks
 * Handles the full profile lifecycle: fetching profile with preferences,
 * updating profile fields, uploading avatars, and managing follower
 * relationships. Returns loading and error states for each operation.
 *
 * @returns Profile data, preferences, update handlers, and loading/error states
 *
 * @public
 */
export const useUserProfile = (): UseUserProfileReturn => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileWithPreferences | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);
      const profileData = await ProfilesService.getProfileWithPreferences(user.id);
      if (profileData) {
        setProfile(profileData);
        setPreferences(profileData.preferences);
      } else {
        setError('Profile not found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updateProfile = useCallback(async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user?.id || !profile) return false;
    try {
      const updatedProfile = await ProfilesService.updateProfile(user.id, updates);
      if (updatedProfile) {
        setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      return false;
    }
  }, [user?.id, profile]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const updatedPreferences = preferences
        ? await ProfilesService.updatePreferences(user.id, updates)
        : await ProfilesService.createPreferences(user.id, updates);
      if (updatedPreferences) {
        setPreferences(updatedPreferences);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferences');
      return false;
    }
  }, [user?.id, preferences]);

  const uploadAvatar = useCallback(async (file: File): Promise<string | null> => {
    if (!user?.id) return null;
    try {
      return await ProfilesService.uploadAvatar(user.id, file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      return null;
    }
  }, [user?.id]);

  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    preferences,
    loading,
    error,
    updateProfile,
    updatePreferences,
    uploadAvatar,
    refreshProfile,
  };
};
