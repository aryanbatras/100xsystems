/**
 * ## Infrastructure: Achievements Database Service
 *
 * Service for managing user achievements, learning streaks,
 * and gamification data in Supabase.
 *
 * @packageDocumentation
 */

import { supabase } from '../supabase';
import { Achievement, UserAchievement, UserAchievementWithAchievement, LearningStreak } from '../../application/types/database.types';

export class AchievementsService {
  private static log(message: string, data?: any, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [AchievementsService] ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'error':
        break;
      case 'warn':
        break;
      default:
    }
  }

  static async getAllAchievements(): Promise<Achievement[]> {
    this.log('Fetching all achievements');
    
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        this.log('Error fetching achievements', { error: error.message }, 'error');
        throw error;
      }
      
      this.log('Successfully fetched achievements', { resultCount: data?.length || 0 });
      return data || [];
    } catch (error) {
      this.log('Exception in getAllAchievements', { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return [];
    }
  }

  static async getUserAchievements(userId: string): Promise<UserAchievementWithAchievement[]> {
    this.log('Fetching user achievements', { userId });
    
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements (*)
        `)
        .eq('user_id', userId)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      return data?.map(ua => ({
        ...ua,
        achievement: ua.achievement as Achievement,
      })) || [];
    } catch (error) {
      return [];
    }
  }

  static async getUnlockedAchievements(userId: string): Promise<UserAchievementWithAchievement[]> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements (*)
        `)
        .eq('user_id', userId)
        .order('earned_at', { ascending: false });

      if (error) throw error;
      return data?.map(ua => ({
        ...ua,
        achievement: ua.achievement as Achievement,
      })) || [];
    } catch (error) {
      return [];
    }
  }

  static async getLockedAchievements(userId: string): Promise<Achievement[]> {
    try {
      const unlockedIds = await this.getUserAchievementIds(userId);
      
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_active', true)
        .not('id', 'in', `(${unlockedIds.join(',')})`)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getUserAchievementIds(userId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', userId);

      if (error) throw error;
      return data?.map(ua => ua.achievement_id) || [];
    } catch (error) {
      return [];
    }
  }

  static async unlockAchievement(userId: string, achievementId: string): Promise<UserAchievement | null> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievementId,
          earned_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async updateAchievementProgress(
    userId: string,
    achievementId: string,
    progressData: Record<string, any>
  ): Promise<UserAchievement | null> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .update({
          progress_data: progressData,
        })
        .eq('user_id', userId)
        .eq('achievement_id', achievementId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getLearningStreak(userId: string): Promise<LearningStreak | null> {
    this.log('Fetching learning streak', { userId });
    
    try {
      const { data, error } = await supabase
        .from('learning_streaks')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        if (error.code === 'PGRST116' || error.code === '406') {
          this.log('No learning streak found', { userId }, 'warn');
        } else {
          this.log('Error fetching learning streak', { userId, error: error.message, code: error.code }, 'error');
          throw error;
        }
      }
      
      const streak = (data && data.length > 0) ? data[0] : null;
      this.log('Successfully fetched learning streak', { userId, hasStreak: !!streak });
      return streak;
    } catch (error) {
      this.log('Exception in getLearningStreak', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return null;
    }
  }

  static async updateLearningStreak(userId: string): Promise<LearningStreak | null> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const streak = await this.getLearningStreak(userId);

      if (!streak) {
        const { data, error } = await supabase
          .from('learning_streaks')
          .insert({
            user_id: userId,
            current_streak: 1,
            longest_streak: 1,
            last_activity_date: today,
            streak_calendar: { [today]: true },
            total_learning_days: 1,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      let newStreak = streak.current_streak;
      let newLongestStreak = streak.longest_streak;
      let newTotalDays = streak.total_learning_days;

      if (streak.last_activity_date === today) {
        // Already updated today
        return streak;
      } else if (streak.last_activity_date === yesterdayStr) {
        // Consecutive day
        newStreak += 1;
        newTotalDays += 1;
      } else {
        // Streak broken
        newStreak = 1;
        newTotalDays += 1;
      }

      if (newStreak > newLongestStreak) {
        newLongestStreak = newStreak;
      }

      const updatedCalendar = { ...streak.streak_calendar, [today]: true };

      const { data, error } = await supabase
        .from('learning_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: newLongestStreak,
          last_activity_date: today,
          streak_calendar: updatedCalendar,
          total_learning_days: newTotalDays,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getAchievementsByCategory(category: Achievement['category']): Promise<Achievement[]> {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getAchievementsByDifficulty(difficulty: Achievement['difficulty']): Promise<Achievement[]> {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('difficulty', difficulty)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getTotalPoints(userId: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          achievement:achievements (points)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return data?.reduce((total: number, ua: any) => total + (ua.achievement?.points || 0), 0) || 0;
    } catch (error) {
      return 0;
    }
  }

  static async checkAndUnlockAchievements(userId: string): Promise<UserAchievementWithAchievement[]> {
    const newlyUnlocked: UserAchievementWithAchievement[] = [];

    try {
      // Get user progress and stats
      const progressStats = await this.getUserProgressStats(userId);
      const learningStreak = await this.getLearningStreak(userId);
      
      // Get all achievements
      const allAchievements = await this.getAllAchievements();
      const unlockedIds = await this.getUserAchievementIds(userId);

      for (const achievement of allAchievements) {
        if (unlockedIds.includes(achievement.id)) continue;

        const shouldUnlock = await this.checkAchievementRequirements(
          userId,
          achievement,
          progressStats,
          learningStreak
        );

        if (shouldUnlock) {
          const unlocked = await this.unlockAchievement(userId, achievement.id);
          if (unlocked) {
            const achievementWithDetails = await this.getUserAchievementDetails(unlocked.id);
            if (achievementWithDetails) {
              newlyUnlocked.push(achievementWithDetails);
            }
          }
        }
      }

      return newlyUnlocked;
    } catch (error) {
      return [];
    }
  }

  private static async getUserAchievementDetails(userAchievementId: string): Promise<UserAchievementWithAchievement | null> {
    try {
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievement:achievements (*)
        `)
        .eq('id', userAchievementId)
        .single();

      if (error) throw error;
      return {
        ...data,
        achievement: data.achievement as Achievement,
      };
    } catch (error) {
      return null;
    }
  }

  private static async getUserProgressStats(userId: string) {
    // This would integrate with ProgressService
    // For now, return mock data
    return {
      articlesCompleted: 0,
      totalReadingTime: 0,
      currentStreak: 0,
    };
  }

  private static async checkAchievementRequirements(
    userId: string,
    achievement: Achievement,
    stats: any,
    streak: LearningStreak | null
  ): Promise<boolean> {
    const { requirements } = achievement;

    switch (achievement.category) {
      case 'learning':
        return this.checkLearningAchievement(requirements, stats);
      case 'consistency':
        return this.checkConsistencyAchievement(requirements, streak);
      case 'mastery':
        return this.checkMasteryAchievement(requirements, stats);
      case 'community':
        return this.checkCommunityAchievement(requirements, userId);
      case 'contribution':
        return this.checkContributionAchievement(requirements, userId);
      default:
        return false;
    }
  }

  private static checkLearningAchievement(requirements: Record<string, any>, stats: any): boolean {
    if (requirements.articlesCompleted && stats.articlesCompleted >= requirements.articlesCompleted) {
      return true;
    }
    if (requirements.totalReadingTime && stats.totalReadingTime >= requirements.totalReadingTime) {
      return true;
    }
    return false;
  }

  private static checkConsistencyAchievement(
    requirements: Record<string, any>,
    streak: LearningStreak | null
  ): boolean {
    if (!streak) return false;
    
    if (requirements.streakDays && streak.current_streak >= requirements.streakDays) {
      return true;
    }
    if (requirements.totalLearningDays && streak.total_learning_days >= requirements.totalLearningDays) {
      return true;
    }
    return false;
  }

  private static checkMasteryAchievement(requirements: Record<string, any>, stats: any): boolean {
    // Implementation for mastery achievements
    return false;
  }

  private static checkCommunityAchievement(requirements: Record<string, any>, userId: string): boolean {
    // Implementation for community achievements
    return false;
  }

  private static checkContributionAchievement(requirements: Record<string, any>, userId: string): boolean {
    // Implementation for contribution achievements
    return false;
  }
}
