/**
 * ## Infrastructure: Progress Database Service
 *
 * Service for tracking user learning progress, sessions,
 * notes, and completion data in Supabase.
 *
 * @packageDocumentation
 */

import { supabase } from '../supabase';
import { UserProgress, LearningSession, UserNote, UserProgressWithContent } from '../../application/types/database.types';

export class ProgressService {
  private static log(message: string, data?: any, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [ProgressService] ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'error':
        break;
      case 'warn':
        break;
      default:
    }
  }

  static async getUserProgress(userId: string): Promise<UserProgress[]> {
    this.log('Fetching user progress', { userId });
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .order('last_accessed_at', { ascending: false });

      if (error) {
        this.log('Error fetching user progress', { userId, error: error.message }, 'error');
        throw error;
      }
      
      this.log('Successfully fetched user progress', { userId, resultCount: data?.length || 0 });
      return data || [];
    } catch (error) {
      this.log('Exception in getUserProgress', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return [];
    }
  }

  static async getUserProgressWithContent(userId: string): Promise<UserProgressWithContent[]> {
    this.log('Fetching user progress with content', { userId });
    
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select(`
          *,
          content_type,
          content_slug
        `)
        .eq('user_id', userId)
        .order('last_accessed_at', { ascending: false });

      if (error) {
        this.log('Error fetching user progress with content', { userId, error: error.message }, 'error');
        throw error;
      }
      
      this.log('Successfully fetched user progress with content', { userId, resultCount: data?.length || 0 });
      return data || [];
    } catch (error) {
      this.log('Exception in getUserProgressWithContent', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return [];
    }
  }

  static async updateProgress(
    userId: string,
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    updates: Partial<UserProgress>
  ): Promise<UserProgress | null> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          content_slug: contentSlug,
          content_type: contentType,
          ...updates,
          updated_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,content_type,content_slug',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async markAsCompleted(
    userId: string,
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    rating?: number,
    difficultyFeedback?: string
  ): Promise<UserProgress | null> {
    return this.updateProgress(userId, contentSlug, contentType, {
      status: 'completed',
      progress_percentage: 100,
      completed_at: new Date().toISOString(),
      rating,
      difficulty_feedback: difficultyFeedback as any,
    });
  }

  static async bookmarkContent(
    userId: string,
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    position?: number
  ): Promise<UserProgress | null> {
    return this.updateProgress(userId, contentSlug, contentType, {
      status: 'bookmarked',
      bookmark_position: position || 0,
    });
  }

  static async getProgressByContentType(
    userId: string,
    contentType: 'article' | 'roadmap' | 'section'
  ): Promise<UserProgress[]> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('content_type', contentType)
        .order('last_accessed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getCompletedContent(userId: string): Promise<UserProgress[]> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getBookmarkedContent(userId: string): Promise<UserProgress[]> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'bookmarked')
        .order('last_accessed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getInProgressContent(userId: string): Promise<UserProgress[]> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'in-progress')
        .order('last_accessed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async startLearningSession(
    userId: string,
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    deviceType: 'desktop' | 'mobile' | 'tablet'
  ): Promise<LearningSession | null> {
    try {
      const { data, error } = await supabase
        .from('learning_sessions')
        .insert({
          user_id: userId,
          content_slug: contentSlug,
          content_type: contentType,
          device_type: deviceType,
          user_agent: navigator.userAgent,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async endLearningSession(
    sessionId: string,
    durationMinutes: number,
    pagesRead: number,
    scrollDepth: number
  ): Promise<LearningSession | null> {
    try {
      const { data, error } = await supabase
        .from('learning_sessions')
        .update({
          session_end: new Date().toISOString(),
          duration_minutes: durationMinutes,
          pages_read: pagesRead,
          scroll_depth_percentage: scrollDepth,
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getLearningSessions(userId: string, limit: number = 50): Promise<LearningSession[]> {
    try {
      const { data, error } = await supabase
        .from('learning_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('session_start', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getUserNotes(userId: string): Promise<UserNote[]> {
    try {
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async createNote(
    userId: string,
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    noteText: string,
    noteType: 'personal' | 'public' | 'question' = 'personal',
    positionData?: Record<string, any>
  ): Promise<UserNote | null> {
    try {
      const { data, error } = await supabase
        .from('user_notes')
        .insert({
          user_id: userId,
          content_slug: contentSlug,
          content_type: contentType,
          note_text: noteText,
          note_type: noteType,
          position_data: positionData || {},
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async updateNote(noteId: string, updates: Partial<UserNote>): Promise<UserNote | null> {
    try {
      const { data, error } = await supabase
        .from('user_notes')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async deleteNote(noteId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getNotesByContent(
    userId: string,
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section'
  ): Promise<UserNote[]> {
    try {
      const { data, error } = await supabase
        .from('user_notes')
        .select('*')
        .eq('user_id', userId)
        .eq('content_slug', contentSlug)
        .eq('content_type', contentType)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getProgressStats(userId: string): Promise<{
    totalCompleted: number;
    totalInProgress: number;
    totalBookmarked: number;
    totalTimeSpent: number;
    averageRating: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('status, time_spent_minutes, rating')
        .eq('user_id', userId);

      if (error) throw error;

      const stats = {
        totalCompleted: 0,
        totalInProgress: 0,
        totalBookmarked: 0,
        totalTimeSpent: 0,
        averageRating: 0,
      };

      if (data) {
        stats.totalCompleted = data.filter(p => p.status === 'completed').length;
        stats.totalInProgress = data.filter(p => p.status === 'in-progress').length;
        stats.totalBookmarked = data.filter(p => p.status === 'bookmarked').length;
        stats.totalTimeSpent = data.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0);
        
        const ratedItems = data.filter(p => p.rating !== null);
        stats.averageRating = ratedItems.length > 0 
          ? ratedItems.reduce((sum, p) => sum + (p.rating || 0), 0) / ratedItems.length 
          : 0;
      }

      return stats;
    } catch (error) {
      return {
        totalCompleted: 0,
        totalInProgress: 0,
        totalBookmarked: 0,
        totalTimeSpent: 0,
        averageRating: 0,
      };
    }
  }
}
