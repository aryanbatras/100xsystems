import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ProgressService } from '../services/database/progressService';
import { UserProgress, UserProgressWithContent, LearningSession, UserNote } from '../services/types/database';

export interface UseUserProgressReturn {
  progress: UserProgressWithContent[];
  completedContent: UserProgress[];
  inProgressContent: UserProgress[];
  bookmarkedContent: UserProgress[];
  sessions: LearningSession[];
  notes: UserNote[];
  loading: boolean;
  error: string | null;
  stats: {
    totalCompleted: number;
    totalInProgress: number;
    totalBookmarked: number;
    totalTimeSpent: number;
    averageRating: number;
  };
  updateProgress: (contentSlug: string, contentType: 'article' | 'roadmap' | 'section', updates: Partial<UserProgress>) => Promise<boolean>;
  markAsCompleted: (contentSlug: string, contentType: 'article' | 'roadmap' | 'section', rating?: number, difficultyFeedback?: string) => Promise<boolean>;
  bookmarkContent: (contentSlug: string, contentType: 'article' | 'roadmap' | 'section', position?: number) => Promise<boolean>;
  startLearningSession: (contentSlug: string, contentType: 'article' | 'roadmap' | 'section', deviceType: 'desktop' | 'mobile' | 'tablet') => Promise<string | null>;
  endLearningSession: (sessionId: string, durationMinutes: number, pagesRead: number, scrollDepth: number) => Promise<boolean>;
  createNote: (contentSlug: string, contentType: 'article' | 'roadmap' | 'section', noteText: string, noteType?: 'personal' | 'public' | 'question', positionData?: Record<string, any>) => Promise<boolean>;
  updateNote: (noteId: string, updates: Partial<UserNote>) => Promise<boolean>;
  deleteNote: (noteId: string) => Promise<boolean>;
  refreshProgress: () => Promise<void>;
}

export const useUserProgress = (): UseUserProgressReturn => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgressWithContent[]>([]);
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);

      const [progressData, sessionsData, notesData, statsData] = await Promise.all([
        ProgressService.getUserProgressWithContent(user.id),
        ProgressService.getLearningSessions(user.id, 50),
        ProgressService.getUserNotes(user.id),
        ProgressService.getProgressStats(user.id),
      ]);

      setProgress(progressData);
      setSessions(sessionsData);
      setNotes(notesData);
      
      return statsData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch progress data');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const updateProgress = useCallback(async (
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    updates: Partial<UserProgress>
  ): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const updatedProgress = await ProgressService.updateProgress(user.id, contentSlug, contentType, updates);
      
      if (updatedProgress) {
        await fetchData();
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update progress');
      return false;
    }
  }, [user?.id, fetchData]);

  const markAsCompleted = useCallback(async (
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    rating?: number,
    difficultyFeedback?: string
  ): Promise<boolean> => {
    return updateProgress(contentSlug, contentType, {
      status: 'completed',
      progress_percentage: 100,
      completed_at: new Date().toISOString(),
      rating,
      difficulty_feedback: difficultyFeedback as any,
    });
  }, [updateProgress]);

  const bookmarkContent = useCallback(async (
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    position?: number
  ): Promise<boolean> => {
    return updateProgress(contentSlug, contentType, {
      status: 'bookmarked',
      bookmark_position: position || 0,
    });
  }, [updateProgress]);

  const startLearningSession = useCallback(async (
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    deviceType: 'desktop' | 'mobile' | 'tablet'
  ): Promise<string | null> => {
    if (!user?.id) return null;

    try {
      const session = await ProgressService.startLearningSession(user.id, contentSlug, contentType, deviceType);
      
      if (session) {
        setCurrentSession(session.id);
        setSessions(prev => [session, ...prev]);
        return session.id;
      }
      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start learning session');
      return null;
    }
  }, [user?.id]);

  const endLearningSession = useCallback(async (
    sessionId: string,
    durationMinutes: number,
    pagesRead: number,
    scrollDepth: number
  ): Promise<boolean> => {
    try {
      const updatedSession = await ProgressService.endLearningSession(sessionId, durationMinutes, pagesRead, scrollDepth);
      
      if (updatedSession) {
        setSessions(prev => prev.map(s => s.id === sessionId ? updatedSession : s));
        if (currentSession === sessionId) {
          setCurrentSession(null);
        }
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to end learning session');
      return false;
    }
  }, [currentSession]);

  const createNote = useCallback(async (
    contentSlug: string,
    contentType: 'article' | 'roadmap' | 'section',
    noteText: string,
    noteType: 'personal' | 'public' | 'question' = 'personal',
    positionData?: Record<string, any>
  ): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const note = await ProgressService.createNote(user.id, contentSlug, contentType, noteText, noteType, positionData);
      
      if (note) {
        setNotes(prev => [note, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
      return false;
    }
  }, [user?.id]);

  const updateNote = useCallback(async (noteId: string, updates: Partial<UserNote>): Promise<boolean> => {
    try {
      const updatedNote = await ProgressService.updateNote(noteId, updates);
      
      if (updatedNote) {
        setNotes(prev => prev.map(n => n.id === noteId ? updatedNote : n));
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update note');
      return false;
    }
  }, []);

  const deleteNote = useCallback(async (noteId: string): Promise<boolean> => {
    try {
      const success = await ProgressService.deleteNote(noteId);
      
      if (success) {
        setNotes(prev => prev.filter(n => n.id !== noteId));
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
      return false;
    }
  }, []);

  const refreshProgress = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const completedContent = progress.filter(p => p.status === 'completed');
  const inProgressContent = progress.filter(p => p.status === 'in-progress');
  const bookmarkedContent = progress.filter(p => p.status === 'bookmarked');

  const stats = {
    totalCompleted: completedContent.length,
    totalInProgress: inProgressContent.length,
    totalBookmarked: bookmarkedContent.length,
    totalTimeSpent: progress.reduce((sum, p) => sum + (p.time_spent_minutes || 0), 0),
    averageRating: progress.filter(p => p.rating !== null).length > 0 
      ? progress.reduce((sum, p) => sum + (p.rating || 0), 0) / progress.filter(p => p.rating !== null).length 
      : 0,
  };

  return {
    progress,
    completedContent,
    inProgressContent,
    bookmarkedContent,
    sessions,
    notes,
    loading,
    error,
    stats,
    updateProgress,
    markAsCompleted,
    bookmarkContent,
    startLearningSession,
    endLearningSession,
    createNote,
    updateNote,
    deleteNote,
    refreshProgress,
  };
};
