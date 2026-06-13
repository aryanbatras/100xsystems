/**
 * ## Infrastructure: Community Database Service
 *
 * Service for managing community features — groups, memberships,
 * discussions, and social interactions in Supabase.
 *
 * @packageDocumentation
 */

import { supabase } from '../supabase';
import { 
  StudyGroup, 
  StudyGroupMember, 
  CommunityPost, 
  CommunityReply, 
  MentorshipConnection,
  StudyGroupWithMembership,
  CommunityPostWithAuthor,
  MentorshipConnectionWithProfiles 
} from '../../application/types/database.types';

export class CommunityService {
  static async getUserStudyGroups(userId: string): Promise<StudyGroupWithMembership[]> {
    try {
      const { data: members, error: memberError } = await supabase
        .from('study_group_members')
        .select(`
          user_id,
          group_id,
          role,
          joined_at
        `)
        .eq('user_id', userId);

      if (memberError) throw memberError;

      if (!members || members.length === 0) return [];

      // Get group details for each membership
      const groupIds = members.map(m => m.group_id);
      const { data: groups, error: groupsError } = await supabase
        .from('study_groups')
        .select('*')
        .in('id', groupIds);

      if (groupsError) throw groupsError;

      // Combine membership and group data
      return members.map((member: any) => {
        const group = groups?.find(g => g.id === member.group_id);
        return {
          ...(group || {}),
          user_role: member.role,
          joined_at: member.joined_at,
        };
      }).filter(Boolean) as StudyGroupWithMembership[];
    } catch (error) {
      return [];
    }
  }

  static async createStudyGroup(groupData: Partial<StudyGroup>, creatorId: string): Promise<StudyGroup | null> {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert({
          ...groupData,
          creator_id: creatorId,
          member_count: 1,
        })
        .select()
        .single();

      if (error) throw error;

      // Add creator as admin member
      if (data) {
        await this.addStudyGroupMember(data.id, creatorId, 'admin');
      }

      return data;
    } catch (error) {
      return null;
    }
  }

  static async joinStudyGroup(groupId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('study_group_members')
        .insert({
          group_id: groupId,
          user_id: userId,
          role: 'member',
        });

      if (error) throw error;

      // Update member count
      await this.updateGroupMemberCount(groupId);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async leaveStudyGroup(groupId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('study_group_members')
        .delete()
        .eq('group_id', groupId)
        .eq('user_id', userId);

      if (error) throw error;

      // Update member count
      await this.updateGroupMemberCount(groupId);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async addStudyGroupMember(
    groupId: string, 
    userId: string, 
    role: 'member' | 'moderator' | 'admin' = 'member'
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('study_group_members')
        .insert({
          group_id: groupId,
          user_id: userId,
          role,
        });

      if (error) throw error;

      // Update member count
      await this.updateGroupMemberCount(groupId);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async updateGroupMemberCount(groupId: string): Promise<void> {
    try {
      const { count } = await supabase
        .from('study_group_members')
        .select('*', { count: 'exact', head: true })
        .eq('group_id', groupId);

      if (count !== null) {
        await supabase
          .from('study_groups')
          .update({ member_count: count })
          .eq('id', groupId);
      }
    } catch (error) {
    }
  }

  static async getStudyGroupPosts(groupId: string, limit: number = 20): Promise<CommunityPostWithAuthor[]> {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .eq('group_id', groupId)
        .eq('moderation_status', 'approved')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      
      // Get author profiles separately
      if (!data || data.length === 0) return [];
      
      const authorIds = data.map(post => post.author_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', authorIds);

      if (profilesError) throw profilesError;
      
      return data.map(post => ({
        ...post,
        author: profiles?.find(p => p.id === post.author_id) || null,
      })) || [];
    } catch (error) {
      return [];
    }
  }

  static async createPost(
    groupId: string,
    authorId: string,
    postData: Partial<CommunityPost>
  ): Promise<CommunityPost | null> {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          ...postData,
          group_id: groupId,
          author_id: authorId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getPostReplies(postId: string): Promise<CommunityReply[]> {
    try {
      const { data, error } = await supabase
        .from('community_replies')
        .select('*')
        .eq('post_id', postId)
        .eq('moderation_status', 'approved')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async createReply(
    postId: string,
    authorId: string,
    replyText: string,
    parentReplyId?: string
  ): Promise<CommunityReply | null> {
    try {
      const { data, error } = await supabase
        .from('community_replies')
        .insert({
          post_id: postId,
          author_id: authorId,
          content: replyText,
          parent_reply_id: parentReplyId,
        })
        .select()
        .single();

      if (error) throw error;

      // Update reply count on post
      await this.updatePostReplyCount(postId);

      return data;
    } catch (error) {
      return null;
    }
  }

  static async updatePostReplyCount(postId: string): Promise<void> {
    try {
      const { count } = await supabase
        .from('community_replies')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);

      if (count !== null) {
        await supabase
          .from('community_posts')
          .update({ reply_count: count })
          .eq('id', postId);
      }
    } catch (error) {
    }
  }

  static async likePost(postId: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('increment_post_likes', { post_id: postId });
      if (error) throw error;
      return true;
    } catch (error) {
      return false;
    }
  }

  static async likeReply(replyId: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('increment_reply_likes', { reply_id: replyId });
      if (error) throw error;
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getMentorshipConnections(userId: string): Promise<MentorshipConnectionWithProfiles[]> {
    try {
      const { data, error } = await supabase
        .from('mentorship_connections')
        .select('*')
        .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (!data || data.length === 0) return [];
      
      // Get mentor and mentee profiles separately
      const mentorIds = data.map(c => c.mentor_id);
      const menteeIds = data.map(c => c.mentee_id);
      
      const [mentors, mentees] = await Promise.all([
        supabase.from('profiles').select('*').in('id', mentorIds),
        supabase.from('profiles').select('*').in('id', menteeIds)
      ]);
      
      return data.map(connection => ({
        ...connection,
        mentor: mentors.data?.find(p => p.id === connection.mentor_id) || null,
        mentee: mentees.data?.find(p => p.id === connection.mentee_id) || null,
      })) || [];
    } catch (error) {
      return [];
    }
  }

  static async createMentorshipRequest(
    mentorId: string,
    menteeId: string,
    roadmapSlug?: string,
    goals?: string[]
  ): Promise<MentorshipConnection | null> {
    try {
      const { data, error } = await supabase
        .from('mentorship_connections')
        .insert({
          mentor_id: mentorId,
          mentee_id: menteeId,
          roadmap_slug: roadmapSlug,
          goals: goals || [],
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async updateMentorshipStatus(
    connectionId: string,
    status: MentorshipConnection['status']
  ): Promise<MentorshipConnection | null> {
    try {
      const updates: Partial<MentorshipConnection> = {
        status,
        updated_at: new Date().toISOString(),
      };

      if (status === 'active') {
        updates.started_at = new Date().toISOString();
      } else if (status === 'completed' || status === 'cancelled') {
        updates.ended_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('mentorship_connections')
        .update(updates)
        .eq('id', connectionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getAvailableMentors(limit: number = 20): Promise<StudyGroupMember[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_mentor', true)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async searchStudyGroups(query: string, limit: number = 10): Promise<StudyGroup[]> {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .eq('is_active', true)
        .eq('is_private', false)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('member_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getPublicStudyGroups(limit: number = 20): Promise<StudyGroup[]> {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .eq('is_active', true)
        .eq('is_private', false)
        .order('member_count', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async updateMemberContributionScore(
    groupId: string,
    userId: string,
    score: number
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('study_group_members')
        .update({
          contribution_score: score,
          last_active_at: new Date().toISOString(),
        })
        .eq('group_id', groupId)
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getUserCreatedGroup(userId: string): Promise<StudyGroup | null> {
    try {
      
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .eq('creator_id', userId)
        .maybeSingle();
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      return null;
    }
  }

  static async canUserCreateGroup(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .rpc('can_create_group', { user_id: userId });
      
      if (error) throw error;
      return data || false;
    } catch (error) {
      return false;
    }
  }

  static async createGroupWithGiscus(
    groupData: Partial<StudyGroup>, 
    creatorId: string
  ): Promise<StudyGroup | null> {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .insert({
          ...groupData,
          creator_id: creatorId,
          giscus_repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
          giscus_repo_id: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
          giscus_category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
          giscus_discussions_enabled: true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async deleteGroup(groupId: string, userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('study_groups')
        .delete()
        .eq('id', groupId)
        .eq('creator_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      return false;
    }
  }

  static async updateGroup(groupId: string, updateData: { 
  description?: string; 
  tags?: string[];
  welcome_message?: string;
  rules?: string;
  is_private?: boolean;
  is_active?: boolean;
  max_members?: number;
  roadmap_slug?: string;
}): Promise<StudyGroup | null> {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .update(updateData)
        .eq('id', groupId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      return null;
    }
  }

  static async getGroupMembers(groupId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('study_group_members')
        .select(`
          user_id,
          role,
          joined_at,
          contribution_score,
          last_active_at,
          profiles!user_id (
            id,
            full_name,
            username,
            avatar_url,
            bio,
            github_username,
            linkedin_url,
            website_url,
            location,
            is_mentor,
            mentorship_areas,
            created_at
          )
        `)
        .eq('group_id', groupId)
        .order('joined_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      return [];
    }
  }

  static async getUserCommunityStats(userId: string): Promise<{
    studyGroupsCount: number;
    postsCount: number;
    repliesCount: number;
    mentorshipConnections: number;
  }> {
    try {
      const [studyGroups, posts, replies, connections] = await Promise.all([
        this.getUserStudyGroups(userId),
        supabase.from('community_posts').select('*', { count: 'exact', head: true }).eq('author_id', userId),
        supabase.from('community_replies').select('*', { count: 'exact', head: true }).eq('author_id', userId),
        this.getMentorshipConnections(userId),
      ]);

      return {
        studyGroupsCount: studyGroups.length,
        postsCount: posts.count || 0,
        repliesCount: replies.count || 0,
        mentorshipConnections: connections.length,
      };
    } catch (error) {
      return {
        studyGroupsCount: 0,
        postsCount: 0,
        repliesCount: 0,
        mentorshipConnections: 0,
      };
    }
  }
}
