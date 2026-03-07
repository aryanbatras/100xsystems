import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProfilesService } from '../services/database/profilesService';
import { Profile, UserPreferences, ProfileWithPreferences } from '../services/types/database';

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

export const useUserProfile = (): UseUserProfileReturn => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileWithPreferences | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const log = useCallback((message: string, data?: any, level: 'info' | 'warn' | 'error' = 'info') => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [useUserProfile] ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'error':
        console.error(logMessage, data);
        break;
      case 'warn':
        console.warn(logMessage, data);
        break;
      default:
        console.log(logMessage, data);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!user?.id) {
      log('No user ID available, skipping profile fetch');
      return;
    }

    log('Starting profile fetch', { userId: user.id });
    
    try {
      setLoading(true);
      setError(null);

      const profileData = await ProfilesService.getProfileWithPreferences(user.id);
      
      if (profileData) {
        log('Profile data received', { 
          userId: user.id, 
          hasProfile: !!profileData,
          hasPreferences: !!profileData.preferences,
          profileKeys: Object.keys(profileData),
          preferencesKeys: profileData.preferences ? Object.keys(profileData.preferences) : []
        });
        
        setProfile(profileData);
        setPreferences(profileData.preferences);
      } else {
        log('No profile data found', { userId: user.id }, 'warn');
        setError('Profile not found');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
      log('Error in fetchProfile', { userId: user.id, error: errorMessage }, 'error');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [user?.id, log]);

  const updateProfile = useCallback(async (updates: Partial<Profile>): Promise<boolean> => {
    if (!user?.id) {
      log('No user ID available for profile update');
      return false;
    }

    if (!profile) {
      log('No profile available for update');
      return false;
    }

    log('Starting profile update', { userId: user.id, updateFields: Object.keys(updates), updateData: updates });

    try {
      const updatedProfile = await ProfilesService.updateProfile(user.id, updates);
      
      if (updatedProfile) {
        log('Profile update successful', { userId: user.id, updatedFields: Object.keys(updatedProfile) });
        setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
        return true;
      } else {
        log('Profile update failed', { userId: user.id }, 'warn');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      log('Error in updateProfile', { userId: user.id, error: errorMessage }, 'error');
      setError(errorMessage);
      return false;
    }
  }, [user?.id, profile, log]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>): Promise<boolean> => {
    if (!user?.id) {
      log('No user ID available for preferences update');
      return false;
    }

    log('Starting preferences update', { userId: user.id, updateFields: Object.keys(updates), updateData: updates });

    try {
      let updatedPreferences;
      
      if (preferences) {
        log('Updating existing preferences', { userId: user.id });
        updatedPreferences = await ProfilesService.updatePreferences(user.id, updates);
      } else {
        log('Creating new preferences', { userId: user.id });
        updatedPreferences = await ProfilesService.createPreferences(user.id, updates);
      }

      if (updatedPreferences) {
        log('Preferences update successful', { userId: user.id, updatedFields: Object.keys(updatedPreferences) });
        setPreferences(updatedPreferences);
        return true;
      } else {
        log('Preferences update failed', { userId: user.id }, 'warn');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update preferences';
      log('Error in updatePreferences', { userId: user.id, error: errorMessage }, 'error');
      setError(errorMessage);
      return false;
    }
  }, [user?.id, preferences, log]);

  const uploadAvatar = useCallback(async (file: File): Promise<string | null> => {
    if (!user?.id) {
      log('No user ID available for avatar upload');
      return null;
    }

    log('Starting avatar upload', { userId: user.id, fileName: file.name, fileSize: file.size, fileType: file.type });

    try {
      const avatarUrl = await ProfilesService.uploadAvatar(user.id, file);
      
      if (avatarUrl) {
        log('Avatar upload successful', { userId: user.id, avatarUrl });
        return avatarUrl;
      } else {
        log('Avatar upload failed', { userId: user.id }, 'warn');
        return null;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload avatar';
      log('Error in uploadAvatar', { userId: user.id, error: errorMessage }, 'error');
      setError(errorMessage);
      return null;
    }
  }, [user?.id, log, updateProfile]);

  const refreshProfile = useCallback(async () => {
    log('Manual profile refresh requested', { userId: user?.id });
    await fetchProfile();
  }, [fetchProfile, log, user?.id]);

  useEffect(() => {
    log('useUserProfile hook initialized', { userId: user?.id });
    fetchProfile();
  }, [fetchProfile, log, user?.id]);

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
