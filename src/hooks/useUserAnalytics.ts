import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AnalyticsService } from '../services/database/analyticsService';
import { UserAnalytics, Certification, UserCertification } from '../services/types/database';

export interface LearningInsights {
  weeklyActivity: Record<string, number>;
  learningVelocity: Record<string, number>;
  skillProficiency: Record<string, number>;
  retentionRate: number;
  averageSessionDuration: number;
  mostActiveHour: number;
  favoriteCategory: string | null;
  preferredDifficulty: string | null;
}

export interface UseUserAnalyticsReturn {
  analytics: UserAnalytics | null;
  insights: LearningInsights;
  level: number;
  certifications: Certification[];
  userCertifications: UserCertification[];
  popularContent: any[];
  loading: boolean;
  error: string | null;
  updateAnalytics: (updates: Partial<UserAnalytics>) => Promise<boolean>;
  updateWeeklyActivity: (activity: Record<string, number>) => Promise<void>;
  updateLearningVelocity: (velocity: Record<string, number>) => Promise<void>;
  updateSkillProficiency: (proficiency: Record<string, number>) => Promise<void>;
  updateRetentionRate: (rate: number) => Promise<void>;
  updateAverageSessionDuration: (duration: number) => Promise<void>;
  updateMostActiveHour: (hour: number) => Promise<void>;
  updateFavoriteCategory: (category: string) => Promise<void>;
  updatePreferredDifficulty: (difficulty: string) => Promise<void>;
  startCertification: (certificationId: string) => Promise<UserCertification | null>;
  updateCertificationProgress: (certificationId: string, progress: number, assessmentResults?: Record<string, any>) => Promise<boolean>;
  refreshAnalytics: () => Promise<void>;
}

export const useUserAnalytics = (): UseUserAnalyticsReturn => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [insights, setInsights] = useState<LearningInsights>({
    weeklyActivity: {},
    learningVelocity: {},
    skillProficiency: {},
    retentionRate: 0,
    averageSessionDuration: 0,
    mostActiveHour: 0,
    favoriteCategory: null,
    preferredDifficulty: null,
  });
  const [level, setLevel] = useState(1);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [userCertifications, setUserCertifications] = useState<UserCertification[]>([]);
  const [popularContent, setPopularContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const [
        userAnalytics,
        userInsights,
        userLevel,
        allCertifications,
        userCerts,
        popular,
      ] = await Promise.all([
        AnalyticsService.getUserAnalytics(user.id),
        AnalyticsService.getLearningInsights(user.id),
        AnalyticsService.getUserLevel(user.id),
        AnalyticsService.getAllCertifications(),
        AnalyticsService.getUserCertifications(user.id),
        AnalyticsService.getPopularContent(10),
      ]);

      setAnalytics(userAnalytics);
      setInsights(userInsights);
      setLevel(userLevel);
      setCertifications(allCertifications);
      setUserCertifications(userCerts);
      setPopularContent(popular);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updateAnalytics = useCallback(async (updates: Partial<UserAnalytics>): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const updatedAnalytics = await AnalyticsService.updateUserAnalytics(user.id, updates);
      
      if (updatedAnalytics) {
        setAnalytics(updatedAnalytics);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update analytics');
      return false;
    }
  }, [user?.id]);

  const updateWeeklyActivity = useCallback(async (activity: Record<string, number>) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updateWeeklyActivity(user.id, activity);
      setInsights(prev => ({ ...prev, weeklyActivity: activity }));
      
      // Also update analytics if it exists
      if (analytics) {
        await updateAnalytics({ weekly_activity: activity });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update weekly activity');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const updateLearningVelocity = useCallback(async (velocity: Record<string, number>) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updateLearningVelocity(user.id, velocity);
      setInsights(prev => ({ ...prev, learningVelocity: velocity }));
      
      if (analytics) {
        await updateAnalytics({ learning_velocity: velocity });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update learning velocity');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const updateSkillProficiency = useCallback(async (proficiency: Record<string, number>) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updateSkillProficiency(user.id, proficiency);
      setInsights(prev => ({ ...prev, skillProficiency: proficiency }));
      
      if (analytics) {
        await updateAnalytics({ skill_proficiency: proficiency });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update skill proficiency');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const updateRetentionRate = useCallback(async (rate: number) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updateRetentionRate(user.id, rate);
      setInsights(prev => ({ ...prev, retentionRate: rate }));
      
      if (analytics) {
        await updateAnalytics({ retention_rate: rate });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update retention rate');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const updateAverageSessionDuration = useCallback(async (duration: number) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updateAverageSessionDuration(user.id, duration);
      setInsights(prev => ({ ...prev, averageSessionDuration: duration }));
      
      if (analytics) {
        await updateAnalytics({ average_session_duration: duration });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update average session duration');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const updateMostActiveHour = useCallback(async (hour: number) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updateMostActiveHour(user.id, hour);
      setInsights(prev => ({ ...prev, mostActiveHour: hour }));
      
      if (analytics) {
        await updateAnalytics({ most_active_hour: hour });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update most active hour');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const updateFavoriteCategory = useCallback(async (category: string) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updateFavoriteCategory(user.id, category);
      setInsights(prev => ({ ...prev, favoriteCategory: category }));
      
      if (analytics) {
        await updateAnalytics({ favorite_category: category });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update favorite category');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const updatePreferredDifficulty = useCallback(async (difficulty: string) => {
    if (!user?.id) return;

    try {
      await AnalyticsService.updatePreferredDifficulty(user.id, difficulty);
      setInsights(prev => ({ ...prev, preferredDifficulty: difficulty }));
      
      if (analytics) {
        await updateAnalytics({ preferred_difficulty: difficulty as any });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update preferred difficulty');
    }
  }, [user?.id, analytics, updateAnalytics]);

  const startCertification = useCallback(async (certificationId: string): Promise<UserCertification | null> => {
    if (!user?.id) return null;

    try {
      const certification = await AnalyticsService.startCertification(user.id, certificationId);
      
      if (certification) {
        setUserCertifications(prev => [certification, ...prev]);
      }
      
      return certification;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start certification');
      return null;
    }
  }, [user?.id]);

  const updateCertificationProgress = useCallback(async (
    certificationId: string,
    progress: number,
    assessmentResults?: Record<string, any>
  ): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const updatedCertification = await AnalyticsService.updateCertificationProgress(
        user.id,
        certificationId,
        progress,
        assessmentResults
      );
      
      if (updatedCertification) {
        setUserCertifications(prev => 
          prev.map(cert => cert.certification_id === certificationId ? updatedCertification : cert)
        );
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update certification progress');
      return false;
    }
  }, [user?.id]);

  const refreshAnalytics = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    analytics,
    insights,
    level,
    certifications,
    userCertifications,
    popularContent,
    loading,
    error,
    updateAnalytics,
    updateWeeklyActivity,
    updateLearningVelocity,
    updateSkillProficiency,
    updateRetentionRate,
    updateAverageSessionDuration,
    updateMostActiveHour,
    updateFavoriteCategory,
    updatePreferredDifficulty,
    startCertification,
    updateCertificationProgress,
    refreshAnalytics,
  };
};
