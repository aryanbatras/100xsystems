/**
 * ## Achievements Domain: React Hooks
 *
 * Hooks for achievements and gamification — unlocking achievements,
 * tracking learning streaks, and managing points.
 *
 * @packageDocumentation
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AchievementsService } from '../../infrastructure/database/achievementsService';
import { UserAchievementWithAchievement, Achievement, LearningStreak } from '../types/database.types';

/**
 * Return type of the useUserAchievements hook.
 *
 * @public
 */
export interface UseUserAchievementsReturn {
  achievements: UserAchievementWithAchievement[];
  lockedAchievements: Achievement[];
  streak: LearningStreak | null;
  totalPoints: number;
  loading: boolean;
  error: string | null;
  stats: { totalUnlocked: number; totalLocked: number; currentStreak: number; longestStreak: number; totalLearningDays: number; };
  updateStreak: () => Promise<void>;
  checkAndUnlockAchievements: () => Promise<UserAchievementWithAchievement[]>;
  getAchievementsByCategory: (category: Achievement['category']) => Achievement[];
  getAchievementsByDifficulty: (difficulty: Achievement['difficulty']) => Achievement[];
  refreshAchievements: () => Promise<void>;
}

/**
 * Hook for managing user achievements and learning streaks.
 *
 * @remarks
 * Fetches unlocked and locked achievements, manages streak tracking,
 * and provides methods for checking and unlocking new achievements
 * based on user activity.
 *
 * @public
 */
export const useUserAchievements = (): UseUserAchievementsReturn => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<UserAchievementWithAchievement[]>([]);
  const [lockedAchievements, setLockedAchievements] = useState<Achievement[]>([]);
  const [streak, setStreak] = useState<LearningStreak | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true); setError(null);
      const [userAchievements, lockedAchievs, userStreak, points] = await Promise.all([
        AchievementsService.getUserAchievements(user.id),
        AchievementsService.getLockedAchievements(user.id),
        AchievementsService.getLearningStreak(user.id),
        AchievementsService.getTotalPoints(user.id),
      ]);
      setAchievements(userAchievements);
      setLockedAchievements(lockedAchievs);
      setStreak(userStreak);
      setTotalPoints(points);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch achievements');
    } finally { setLoading(false); }
  }, [user?.id]);

  const updateStreak = useCallback(async () => {
    if (!user?.id) return;
    try {
      const updatedStreak = await AchievementsService.updateLearningStreak(user.id);
      if (updatedStreak) setStreak(updatedStreak);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update streak');
    }
  }, [user?.id]);

  const checkAndUnlockAchievements = useCallback(async (): Promise<UserAchievementWithAchievement[]> => {
    if (!user?.id) return [];
    try {
      const newlyUnlocked = await AchievementsService.checkAndUnlockAchievements(user.id);
      if (newlyUnlocked.length > 0) {
        setAchievements(prev => [...newlyUnlocked, ...prev]);
        setLockedAchievements(prev =>
          prev.filter(locked => !newlyUnlocked.some(u => u.achievement_id === locked.id))
        );
        const newPoints = await AchievementsService.getTotalPoints(user.id);
        setTotalPoints(newPoints);
      }
      return newlyUnlocked;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check achievements');
      return [];
    }
  }, [user?.id]);

  const getAchievementsByCategory = useCallback((category: Achievement['category']): Achievement[] => {
    return achievements.map(ua => ua.achievement).filter(a => a.category === category);
  }, [achievements]);

  const getAchievementsByDifficulty = useCallback((difficulty: Achievement['difficulty']): Achievement[] => {
    return achievements.map(ua => ua.achievement).filter(a => a.difficulty === difficulty);
  }, [achievements]);

  const refreshAchievements = useCallback(async () => { await fetchData(); }, [fetchData]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const stats = {
    totalUnlocked: achievements.length,
    totalLocked: lockedAchievements.length,
    currentStreak: streak?.current_streak || 0,
    longestStreak: streak?.longest_streak || 0,
    totalLearningDays: streak?.total_learning_days || 0,
  };

  return {
    achievements, lockedAchievements, streak, totalPoints, loading, error, stats,
    updateStreak, checkAndUnlockAchievements,
    getAchievementsByCategory, getAchievementsByDifficulty,
    refreshAchievements,
  };
};
