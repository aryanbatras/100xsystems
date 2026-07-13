/**
 * ## Infrastructure: Analytics Database Service
 *
 * Service for tracking user analytics, page views, and
 * engagement metrics in Supabase.
 *
 * @packageDocumentation
 */

import { supabase } from '../supabase';
import { UserAnalytics, ContentAnalytics, Certification, UserCertification } from '../../application/types/database.types';

export class AnalyticsService {
  static async getUserAnalytics(userId: string): Promise<UserAnalytics | null> {
    try {
      const { data, error } = await supabase
        .from('user_analytics')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      return null;
    }
  }

  static async updateUserAnalytics(userId: string, updates: Partial<UserAnalytics>): Promise<UserAnalytics | null> {
    try {
      const { data, error } = await supabase
        .from('user_analytics')
        .upsert({
          id: userId,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getLearningInsights(userId: string): Promise<{
    weeklyActivity: Record<string, number>;
    learningVelocity: Record<string, number>;
    skillProficiency: Record<string, number>;
    retentionRate: number;
    averageSessionDuration: number;
    mostActiveHour: number;
    favoriteCategory: string | null;
    preferredDifficulty: string | null;
  }> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      
      if (!analytics) {
        return {
          weeklyActivity: {},
          learningVelocity: {},
          skillProficiency: {},
          retentionRate: 0,
          averageSessionDuration: 0,
          mostActiveHour: 0,
          favoriteCategory: null,
          preferredDifficulty: null,
        };
      }

      return {
        weeklyActivity: analytics.weekly_activity || {},
        learningVelocity: analytics.learning_velocity || {},
        skillProficiency: analytics.skill_proficiency || {},
        retentionRate: analytics.retention_rate,
        averageSessionDuration: analytics.average_session_duration,
        mostActiveHour: analytics.most_active_hour || 0,
        favoriteCategory: analytics.favorite_category,
        preferredDifficulty: analytics.preferred_difficulty,
      };
    } catch (error) {
      return {
        weeklyActivity: {},
        learningVelocity: {},
        skillProficiency: {},
        retentionRate: 0,
        averageSessionDuration: 0,
        mostActiveHour: 0,
        favoriteCategory: null,
        preferredDifficulty: null,
      };
    }
  }

  static async getContentAnalytics(contentSlug: string, contentType: 'article' | 'roadmap' | 'section'): Promise<ContentAnalytics | null> {
    try {
      const { data, error } = await supabase
        .from('content_analytics')
        .select('*')
        .eq('content_slug', contentSlug)
        .eq('content_type', contentType)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      return null;
    }
  }

  static async updateContentAnalytics(
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    updates: Partial<ContentAnalytics>
  ): Promise<ContentAnalytics | null> {
    try {
      const { data, error } = await supabase
        .from('content_analytics')
        .upsert({
          content_slug: contentSlug,
          content_type: contentType,
          ...updates,
          last_updated: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getPopularContent(limit: number = 10): Promise<ContentAnalytics[]> {
    try {
      const { data, error } = await supabase
        .from('content_analytics')
        .select('*')
        .order('popularity_score', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getTrendingContent(timeframe: 'week' | 'month' | 'year' = 'week'): Promise<ContentAnalytics[]> {
    try {
      const { data, error } = await supabase
        .from('content_analytics')
        .select('*')
        .order('total_views', { ascending: false })
        .limit(20);

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getUserLevel(userId: string): Promise<number> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.current_level || 1;
    } catch (error) {
      return 1;
    }
  }

  static async updateUserLevel(userId: string, newLevel: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_analytics')
        .update({
          current_level: newLevel,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      return false;
    }
  }

  static async calculateUserLevel(points: number): Promise<number> {
    // Level calculation based on points
    // Level 1: 0-99 points
    // Level 2: 100-299 points
    // Level 3: 300-599 points
    // Level 4: 600-999 points
    // Level 5: 1000-1499 points
    // Level 6: 1500-2199 points
    // Level 7: 2200-3099 points
    // Level 8: 3100-4299 points
    // Level 9: 4300+ points

    if (points < 100) return 1;
    if (points < 300) return 2;
    if (points < 600) return 3;
    if (points < 1000) return 4;
    if (points < 1500) return 5;
    if (points < 2200) return 6;
    if (points < 3100) return 7;
    if (points < 4300) return 8;
    return 9;
  }

  static async getWeeklyActivity(userId: string): Promise<Record<string, number>> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.weekly_activity || {};
    } catch (error) {
      return {};
    }
  }

  static async updateWeeklyActivity(userId: string, activity: Record<string, number>): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { weekly_activity: activity });
    } catch (error) {
    }
  }

  static async getLearningVelocity(userId: string): Promise<Record<string, number>> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.learning_velocity || {};
    } catch (error) {
      return {};
    }
  }

  static async updateLearningVelocity(userId: string, velocity: Record<string, number>): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { learning_velocity: velocity });
    } catch (error) {
    }
  }

  static async getSkillProficiency(userId: string): Promise<Record<string, number>> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.skill_proficiency || {};
    } catch (error) {
      return {};
    }
  }

  static async updateSkillProficiency(userId: string, proficiency: Record<string, number>): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { skill_proficiency: proficiency });
    } catch (error) {
    }
  }

  static async getRetentionRate(userId: string): Promise<number> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.retention_rate || 0;
    } catch (error) {
      return 0;
    }
  }

  static async updateRetentionRate(userId: string, rate: number): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { retention_rate: rate });
    } catch (error) {
    }
  }

  static async getAverageSessionDuration(userId: string): Promise<number> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.average_session_duration || 0;
    } catch (error) {
      return 0;
    }
  }

  static async updateAverageSessionDuration(userId: string, duration: number): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { average_session_duration: duration });
    } catch (error) {
    }
  }

  static async getMostActiveHour(userId: string): Promise<number> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.most_active_hour || 0;
    } catch (error) {
      return 0;
    }
  }

  static async updateMostActiveHour(userId: string, hour: number): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { most_active_hour: hour });
    } catch (error) {
    }
  }

  static async getFavoriteCategory(userId: string): Promise<string | null> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.favorite_category || null;
    } catch (error) {
      return null;
    }
  }

  static async updateFavoriteCategory(userId: string, category: string): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { favorite_category: category });
    } catch (error) {
    }
  }

  static async getPreferredDifficulty(userId: string): Promise<string | null> {
    try {
      const analytics = await this.getUserAnalytics(userId);
      return analytics?.preferred_difficulty || null;
    } catch (error) {
      return null;
    }
  }

  static async updatePreferredDifficulty(userId: string, difficulty: string): Promise<void> {
    try {
      await this.updateUserAnalytics(userId, { preferred_difficulty: difficulty as any });
    } catch (error) {
    }
  }

  static async getAllCertifications(): Promise<Certification[]> {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getUserCertifications(userId: string): Promise<UserCertification[]> {
    try {
      const { data, error } = await supabase
        .from('user_certifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async startCertification(userId: string, certificationId: string): Promise<UserCertification | null> {
    try {
      const { data, error } = await supabase
        .from('user_certifications')
        .insert({
          user_id: userId,
          certification_id: certificationId,
          status: 'in-progress',
          started_at: new Date().toISOString(),
          progress_percentage: 0,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async updateCertificationProgress(
    userId: string,
    certificationId: string,
    progress: number,
    assessmentResults?: Record<string, any>
  ): Promise<UserCertification | null> {
    try {
      const updates: Partial<UserCertification> = {
        progress_percentage: progress,
        updated_at: new Date().toISOString(),
      };

      if (assessmentResults) {
        updates.assessment_results = assessmentResults;
      }

      if (progress >= 100) {
        updates.status = 'completed';
        updates.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('user_certifications')
        .update(updates)
        .eq('user_id', userId)
        .eq('certification_id', certificationId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getCertificationProgress(userId: string, certificationId: string): Promise<UserCertification | null> {
    try {
      const { data, error } = await supabase
        .from('user_certifications')
        .select('*')
        .eq('user_id', userId)
        .eq('certification_id', certificationId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      return null;
    }
  }
}
