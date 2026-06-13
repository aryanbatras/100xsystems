/**
 * ## Community Domain: React Hooks
 *
 * Hooks for community features — study groups, discussion posts,
 * mentorship connections, and community engagement.
 *
 * @packageDocumentation
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../presentation/contexts/AuthContext';
import { CommunityService } from '../../infrastructure/database/communityService';
import {
  StudyGroup,
  StudyGroupWithMembership,
  CommunityPostWithAuthor,
  CommunityReply,
  MentorshipConnectionWithProfiles,
} from '../types/database.types';

/**
 * Community statistics summary.
 *
 * @public
 */
export interface CommunityStats {
  studyGroupsCount: number;
  postsCount: number;
  repliesCount: number;
  mentorshipConnections: number;
}

/**
 * Return type of the useUserCommunity hook.
 *
 * @public
 */
export interface UseUserCommunityReturn {
  studyGroups: StudyGroupWithMembership[];
  posts: CommunityPostWithAuthor[];
  replies: CommunityReply[];
  mentorshipConnections: MentorshipConnectionWithProfiles[];
  publicGroups: any[];
  stats: CommunityStats;
  loading: boolean;
  error: string | null;
  userCreatedGroup: StudyGroup | null;
  isCreatingGroup: boolean;
  canCreateGroup: boolean;
  createStudyGroup: (groupData: Partial<any>) => Promise<boolean>;
  createGroupWithGiscus: (groupData: Partial<StudyGroup>) => Promise<boolean>;
  joinStudyGroup: (groupId: string) => Promise<boolean>;
  leaveStudyGroup: (groupId: string) => Promise<boolean>;
  createPost: (groupId: string, postData: Partial<any>) => Promise<boolean>;
  createReply: (postId: string, replyText: string, parentReplyId?: string) => Promise<boolean>;
  likePost: (postId: string) => Promise<boolean>;
  likeReply: (replyId: string) => Promise<boolean>;
  createMentorshipRequest: (mentorId: string, roadmapSlug?: string, goals?: string[]) => Promise<boolean>;
  updateMentorshipStatus: (connectionId: string, status: any) => Promise<boolean>;
  refreshCommunity: () => Promise<void>;
}

/**
 * Hook for managing all community interactions.
 *
 * @remarks
 * Provides access to study groups, posts, replies, mentorship connections,
 * and community stats. Handles CRUD operations for groups, posts, and
 * mentorship requests with loading/error state management.
 *
 * @public
 */
export const useUserCommunity = (): UseUserCommunityReturn => {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState<StudyGroupWithMembership[]>([]);
  const [posts, setPosts] = useState<CommunityPostWithAuthor[]>([]);
  const [replies, setReplies] = useState<CommunityReply[]>([]);
  const [mentorshipConnections, setMentorshipConnections] = useState<MentorshipConnectionWithProfiles[]>([]);
  const [publicGroups, setPublicGroups] = useState<any[]>([]);
  const [stats, setStats] = useState<CommunityStats>({ studyGroupsCount: 0, postsCount: 0, repliesCount: 0, mentorshipConnections: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCreatedGroup, setUserCreatedGroup] = useState<StudyGroup | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);
      const userStudyGroups = await CommunityService.getUserStudyGroups(user.id);
      setStudyGroups(userStudyGroups || []);
      const createdGroup = userStudyGroups?.find(group => group.user_role === 'admin') || null;
      setUserCreatedGroup(createdGroup);
      const publicStudyGroups = await CommunityService.getPublicStudyGroups();
      setPublicGroups(publicStudyGroups || []);
      setStats({
        studyGroupsCount: userStudyGroups?.length || 0,
        postsCount: 0, repliesCount: 0, mentorshipConnections: 0,
      });
    } catch (err) {
      setError('Failed to fetch community data');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createStudyGroup = useCallback(async (groupData: Partial<any>): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const newGroup = await CommunityService.createStudyGroup(groupData, user.id);
      if (newGroup) {
        setStudyGroups(prev => [{ ...newGroup, user_role: 'admin', joined_at: new Date().toISOString() }, ...prev]);
        return true;
      }
      return false;
    } catch { setError('Failed to create study group'); return false; }
  }, [user?.id]);

  const joinStudyGroup = useCallback(async (groupId: string): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const success = await CommunityService.joinStudyGroup(groupId, user.id);
      if (success) { await fetchData(); return true; }
      return false;
    } catch { setError('Failed to join study group'); return false; }
  }, [user?.id, fetchData]);

  const leaveStudyGroup = useCallback(async (groupId: string): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const success = await CommunityService.leaveStudyGroup(groupId, user.id);
      if (success) { setStudyGroups(prev => prev.filter(g => g.id !== groupId)); return true; }
      return false;
    } catch { setError('Failed to leave study group'); return false; }
  }, [user?.id]);

  const createPost = useCallback(async (groupId: string, postData: Partial<any>): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const newPost = await CommunityService.createPost(groupId, user.id, postData);
      if (newPost) { await fetchData(); return true; }
      return false;
    } catch { setError('Failed to create post'); return false; }
  }, [user?.id, fetchData]);

  const createReply = useCallback(async (postId: string, replyText: string, parentReplyId?: string): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const newReply = await CommunityService.createReply(postId, user.id, replyText, parentReplyId);
      if (newReply) { await fetchData(); return true; }
      return false;
    } catch { setError('Failed to create reply'); return false; }
  }, [user?.id, fetchData]);

  const likePost = useCallback(async (postId: string): Promise<boolean> => {
    try {
      const success = await CommunityService.likePost(postId);
      if (success) { setPosts(prev => prev.map(p => p.id === postId ? { ...p, like_count: p.like_count + 1 } : p)); return true; }
      return false;
    } catch { setError('Failed to like post'); return false; }
  }, []);

  const likeReply = useCallback(async (replyId: string): Promise<boolean> => {
    try {
      const success = await CommunityService.likeReply(replyId);
      if (success) { setReplies(prev => prev.map(r => r.id === replyId ? { ...r, like_count: r.like_count + 1 } : r)); return true; }
      return false;
    } catch { setError('Failed to like reply'); return false; }
  }, []);

  const createMentorshipRequest = useCallback(async (mentorId: string, roadmapSlug?: string, goals?: string[]): Promise<boolean> => {
    if (!user?.id) return false;
    try {
      const connection = await CommunityService.createMentorshipRequest(mentorId, user.id, roadmapSlug, goals);
      if (connection) {
        const connections = await CommunityService.getMentorshipConnections(user.id);
        setMentorshipConnections(connections); return true;
      }
      return false;
    } catch { setError('Failed to create mentorship request'); return false; }
  }, [user?.id]);

  const updateMentorshipStatus = useCallback(async (connectionId: string, status: any): Promise<boolean> => {
    try {
      const updatedConnection = await CommunityService.updateMentorshipStatus(connectionId, status);
      if (updatedConnection && user?.id) {
        const connections = await CommunityService.getMentorshipConnections(user.id);
        setMentorshipConnections(connections); return true;
      }
      return false;
    } catch { setError('Failed to update mentorship status'); return false; }
  }, [user?.id]);

  const createGroupWithGiscus = useCallback(async (groupData: Partial<StudyGroup>): Promise<boolean> => {
    if (!user?.id) return false;
    try { setIsCreatingGroup(true); return await createStudyGroup(groupData); }
    catch { setError('Failed to create group'); return false; }
    finally { setIsCreatingGroup(false); }
  }, [user?.id, createStudyGroup]);

  const refreshCommunity = useCallback(async () => { await fetchData(); }, [fetchData]);
  const canCreateGroup = !userCreatedGroup;

  useEffect(() => { fetchData(); }, [fetchData]);

  return {
    studyGroups, posts, replies, mentorshipConnections, publicGroups, stats,
    loading, error, userCreatedGroup, isCreatingGroup, canCreateGroup,
    createStudyGroup, createGroupWithGiscus, joinStudyGroup, leaveStudyGroup,
    createPost, createReply, likePost, likeReply,
    createMentorshipRequest, updateMentorshipStatus, refreshCommunity,
  };
};
