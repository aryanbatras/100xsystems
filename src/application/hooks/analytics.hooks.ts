/**
 * ## Analytics Domain: React Hooks
 *
 * Hooks for learning analytics — insights, certifications,
 * skill proficiency, and engagement metrics.
 *
 * @packageDocumentation
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../presentation/contexts/AuthContext';
import { AnalyticsService } from '../../infrastructure/database/analyticsService';
import { UserAnalytics, Certification, UserCertification } from '../types/database.types';

/**
 * Learning insights derived from user analytics data.
 *
 * @public
 */
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

/**
 * Return type of the useUserAnalytics hook.
 *
 * @public
 */
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
  startCertification: (certificationId: string) => Promise<UserCertification | null>;
  updateCertificationProgress: (certificationId: string, progress: number, assessmentResults?: Record<string, any>) => Promise<boolean>;
  refreshAnalytics: () => Promise<void>;
}

/**
 * Hook for fetching learning analytics and managing certifications.
 *
 * @remarks
 * Provides aggregate learning data: weekly activity, skill proficiency,
 * retention rates, and certification progress. Updates are batched to
 * minimize database writes.
 *
 * @public
 */
export const useUserAnalytics = (): UseUserAnalyticsReturn => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [insights, setInsights] = useState<LearningInsights>({
    weeklyActivity: {}, learningVelocity: {}, skillProficiency: {},
    retentionRate: 0, averageSessionDuration: 0, mostActiveHour: 0,
    favoriteCategory: null, preferredDifficulty: null,
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
      setLoading(true); setError(null);
      const [userAnalytics, userInsights, userLevel, allCertifications, userCerts, popular] = await Promise.all([
        AnalyticsService.getUserAnalytics(user.id),
        AnalyticsService.getLearningInsights(user.id),
        AnalyticsService.getUserLevel(user.id),
        AnalyticsService.getAllCertifications(),
        AnalyticsService.getUserCertifications(user.id),
        AnalyticsService.getPopularContent(10),
      ]);
      setAnalytics(userAnalytics); setInsights(userInsights); setLevel(userLevel);
      setCertifications(allCertifications); setUserCertifications(userCerts); setPopularContent(popular);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics');
    } finally { setLoading(false); }
  }, [user?.id]);

  const updateAnalytics = useCallback(async (updates: Partial<UserAnalytics>): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const updatedAnalytics = await AnalyticsService.updateUserAnalytics(user.id, updates);
      if (updatedAnalytics) { setAnalytics(updatedAnalytics); return true; }
      return false;
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to update analytics'); return false; }
  }, [user?.id]);

  const startCertification = useCallback(async (certificationId: string): Promise<UserCertification | null> => {
    if (!user?.id) return null;
    try {
      const certification = await AnalyticsService.startCertification(user.id, certificationId);
      if (certification) { setUserCertifications(prev => [certification, ...prev]); }
      return certification;
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to start certification'); return null; }
  }, [user?.id]);

  const updateCertificationProgress = useCallback(async (
    certificationId: string, progress: number, assessmentResults?: Record<string, any>
  ): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const updatedCertification = await AnalyticsService.updateCertificationProgress(user.id, certificationId, progress, assessmentResults);
      if (updatedCertification) {
        setUserCertifications(prev => prev.map(cert => cert.certification_id === certificationId ? updatedCertification : cert));
        return true;
      }
      return false;
    } catch (err) { setError(err instanceof Error ? err.message : 'Failed to update certification'); return false; }
  }, [user?.id]);

  const refreshAnalytics = useCallback(async () => { await fetchData(); }, [fetchData]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return {
    analytics, insights, level, certifications, userCertifications, popularContent,
    loading, error, updateAnalytics, startCertification, updateCertificationProgress, refreshAnalytics,
  };
};
