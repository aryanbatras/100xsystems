/**
 * @deprecated Achievements system has been removed in the migration.
 * This stub exists to prevent import errors in dashboard.feature.tsx.
 */

export interface UseUserAchievementsReturn {
  achievements: any[];
  lockedAchievements: any[];
  streak: any;
  totalPoints: number;
  stats: { totalUnlocked: number; totalLocked: number; currentStreak: number; longestStreak: number; totalLearningDays: number };
  loading: boolean;
  error: string | null;
  updateStreak: () => Promise<void>;
  getAchievementsByCategory: (category: string) => any[];
  getAchievementsByDifficulty: (difficulty: string) => any[];
}

export function useUserAchievements(): UseUserAchievementsReturn {
  return {
    achievements: [],
    lockedAchievements: [],
    streak: null,
    totalPoints: 0,
    stats: { totalUnlocked: 0, totalLocked: 0, currentStreak: 0, longestStreak: 0, totalLearningDays: 0 },
    loading: false,
    error: null,
    updateStreak: async () => {},
    getAchievementsByCategory: () => [],
    getAchievementsByDifficulty: () => [],
  };
}
