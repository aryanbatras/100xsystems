import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CommunityService } from '../services/database/communityService';
import { 
  StudyGroup,
  StudyGroupWithMembership, 
  CommunityPostWithAuthor, 
  CommunityReply, 
  MentorshipConnectionWithProfiles 
} from '../services/types/database';

export interface CommunityStats {
  studyGroupsCount: number;
  postsCount: number;
  repliesCount: number;
  mentorshipConnections: number;
}

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
  deleteGroup: (groupId: string) => Promise<boolean>;
  updateGroup: (groupId: string, updateData: { 
  description?: string; 
  tags?: string[];
  welcome_message?: string;
  rules?: string;
  is_private?: boolean;
  is_active?: boolean;
  max_members?: number;
  roadmap_slug?: string;
}) => Promise<boolean>;
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

export const useUserCommunity = (): UseUserCommunityReturn => {
  const { user } = useAuth();
  const [studyGroups, setStudyGroups] = useState<StudyGroupWithMembership[]>([]);
  const [posts, setPosts] = useState<CommunityPostWithAuthor[]>([]);
  const [replies, setReplies] = useState<CommunityReply[]>([]);
  const [mentorshipConnections, setMentorshipConnections] = useState<MentorshipConnectionWithProfiles[]>([]);
  const [publicGroups, setPublicGroups] = useState<any[]>([]);
  const [stats, setStats] = useState<CommunityStats>({
    studyGroupsCount: 0,
    postsCount: 0,
    repliesCount: 0,
    mentorshipConnections: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userCreatedGroup, setUserCreatedGroup] = useState<StudyGroup | null>(null);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user?.id) {
      console.log('🚫 fetchData: No user ID, skipping');
      return;
    }

    try {
      console.log('🚀 fetchData: Starting for user:', user.id);
      setLoading(true);
      setError(null);

      // Minimal approach: only fetch what we absolutely need
      const [
        userCreatedGroup,
        publicStudyGroups,
      ] = await Promise.all([
        CommunityService.getUserCreatedGroup(user.id),
        CommunityService.getPublicStudyGroups(20),
      ]);

      console.log('📊 fetchData: Results:', { 
        userCreatedGroup, 
        publicStudyGroupsCount: publicStudyGroups?.length 
      });

      setUserCreatedGroup(userCreatedGroup);
      setPublicGroups(publicStudyGroups);
      
      // Set minimal defaults to avoid all complex queries
      setStudyGroups([]);
      setPosts([]);
      setReplies([]);
      setMentorshipConnections([]);
      
      const stats = {
        studyGroupsCount: userCreatedGroup ? 1 : 0,
        postsCount: 0,
        repliesCount: 0,
        mentorshipConnections: 0,
      };
      
      console.log('📈 fetchData: Setting stats:', stats);
      setStats(stats);
      
      console.log('✅ fetchData: Completed successfully');
    } catch (err) {
      console.error('💥 fetchData: Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch community data');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const createStudyGroup = useCallback(async (groupData: Partial<any>): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const newGroup = await CommunityService.createStudyGroup(groupData, user.id);
      
      if (newGroup) {
        setStudyGroups(prev => [{
          ...newGroup,
          user_role: 'admin',
          joined_at: new Date().toISOString(),
        }, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create study group');
      return false;
    }
  }, [user?.id]);

  const joinStudyGroup = useCallback(async (groupId: string): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const success = await CommunityService.joinStudyGroup(groupId, user.id);
      
      if (success) {
        // Refresh study groups to get updated data
        await fetchData();
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join study group');
      return false;
    }
  }, [user?.id, fetchData]);

  const leaveStudyGroup = useCallback(async (groupId: string): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const success = await CommunityService.leaveStudyGroup(groupId, user.id);
      
      if (success) {
        setStudyGroups(prev => prev.filter(group => group.id !== groupId));
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to leave study group');
      return false;
    }
  }, [user?.id]);

  const createPost = useCallback(async (groupId: string, postData: Partial<any>): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const newPost = await CommunityService.createPost(groupId, user.id, postData);
      
      if (newPost) {
        // Refresh posts to get updated data
        await fetchData();
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
      return false;
    }
  }, [user?.id, fetchData]);

  const createReply = useCallback(async (
    postId: string,
    replyText: string,
    parentReplyId?: string
  ): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const newReply = await CommunityService.createReply(postId, user.id, replyText, parentReplyId);
      
      if (newReply) {
        // Refresh replies to get updated data
        await fetchData();
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create reply');
      return false;
    }
  }, [user?.id, fetchData]);

  const likePost = useCallback(async (postId: string): Promise<boolean> => {
    try {
      const success = await CommunityService.likePost(postId);
      
      if (success) {
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, like_count: post.like_count + 1 }
            : post
        ));
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like post');
      return false;
    }
  }, []);

  const likeReply = useCallback(async (replyId: string): Promise<boolean> => {
    try {
      const success = await CommunityService.likeReply(replyId);
      
      if (success) {
        setReplies(prev => prev.map(reply => 
          reply.id === replyId 
            ? { ...reply, like_count: reply.like_count + 1 }
            : reply
        ));
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like reply');
      return false;
    }
  }, []);

  const createMentorshipRequest = useCallback(async (
    mentorId: string,
    roadmapSlug?: string,
    goals?: string[]
  ): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const connection = await CommunityService.createMentorshipRequest(mentorId, user.id, roadmapSlug, goals);
      
      if (connection) {
        // Fetch the full connection with profiles
        const connections = await CommunityService.getMentorshipConnections(user.id);
        setMentorshipConnections(connections);
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create mentorship request');
      return false;
    }
  }, [user?.id]);

  const updateMentorshipStatus = useCallback(async (connectionId: string, status: any): Promise<boolean> => {
    try {
      const updatedConnection = await CommunityService.updateMentorshipStatus(connectionId, status);
      
      if (updatedConnection) {
        // Refresh connections to get updated profiles
        if (user?.id) {
          const connections = await CommunityService.getMentorshipConnections(user.id);
          setMentorshipConnections(connections);
        }
        return true;
      }
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update mentorship status');
      return false;
    }
  }, [user?.id]);

  const refreshCommunity = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  const createGroupWithGiscus = useCallback(async (groupData: Partial<StudyGroup>): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      setIsCreatingGroup(true);
      const newGroup = await CommunityService.createGroupWithGiscus(groupData, user.id);
      
      if (newGroup) {
        setUserCreatedGroup(newGroup);
        setStudyGroups(prev => [...prev, { ...newGroup, user_role: 'admin', joined_at: newGroup.created_at }]);
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to create group');
      return false;
    } finally {
      setIsCreatingGroup(false);
    }
  }, [user?.id]);

  const deleteGroup = useCallback(async (groupId: string): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      const success = await CommunityService.deleteGroup(groupId, user.id);
      
      if (success) {
        setUserCreatedGroup(null);
        setStudyGroups(prev => prev.filter(g => g.id !== groupId));
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to delete group');
      return false;
    }
  }, [user?.id]);

  const updateGroup = useCallback(async (groupId: string, updateData: { 
  description?: string; 
  tags?: string[];
  welcome_message?: string;
  rules?: string;
  is_private?: boolean;
  is_active?: boolean;
  max_members?: number;
  roadmap_slug?: string;
}): Promise<boolean> => {
    try {
      const updatedGroup = await CommunityService.updateGroup(groupId, updateData);
      
      if (updatedGroup) {
        // Update study groups with the new data
        setStudyGroups(prev => prev.map(g => 
          g.id === groupId 
            ? { ...g, ...updatedGroup }
            : g
        ));
        
        // Update user created group if it's the one being updated
        if (userCreatedGroup?.id === groupId) {
          setUserCreatedGroup({ ...userCreatedGroup, ...updatedGroup });
        }
        
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to update group');
      return false;
    }
  }, [userCreatedGroup]);

  const canCreateGroup = !userCreatedGroup;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    studyGroups,
    posts,
    replies,
    mentorshipConnections,
    publicGroups,
    stats,
    loading,
    error,
    userCreatedGroup,
    isCreatingGroup,
    canCreateGroup,
    createStudyGroup,
    createGroupWithGiscus,
    deleteGroup,
    updateGroup,
    joinStudyGroup,
    leaveStudyGroup,
    createPost,
    createReply,
    likePost,
    likeReply,
    createMentorshipRequest,
    updateMentorshipStatus,
    refreshCommunity,
  };
};
