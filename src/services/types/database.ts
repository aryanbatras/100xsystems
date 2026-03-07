// Database type definitions for 100xSystems
export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  github_username: string | null;
  linkedin_url: string | null;
  website_url: string | null;
  location: string | null;
  timezone: string;
  preferred_language: string;
  created_at: string;
  updated_at: string;
  last_active_at: string;
  is_public: boolean;
  is_mentor: boolean;
  mentorship_areas: string[];
}

export interface UserPreferences {
  id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  learning_reminders: boolean;
  reminder_time: string;
  difficulty_preference: 'beginner' | 'intermediate' | 'advanced' | 'adaptive';
  weekly_goal_hours: number;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  content_type: 'article' | 'roadmap' | 'section';
  content_slug: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'bookmarked';
  progress_percentage: number;
  time_spent_minutes: number;
  started_at: string | null;
  completed_at: string | null;
  last_accessed_at: string;
  bookmark_position: number;
  notes: string | null;
  rating: number | null;
  difficulty_feedback: 'too-easy' | 'just-right' | 'too-hard' | null;
  created_at: string;
  updated_at: string;
}

export interface LearningSession {
  id: string;
  user_id: string;
  content_type: 'article' | 'roadmap' | 'section';
  content_slug: string;
  session_start: string;
  session_end: string | null;
  duration_minutes: number | null;
  pages_read: number;
  scroll_depth_percentage: number;
  device_type: 'desktop' | 'mobile' | 'tablet' | null;
  user_agent: string | null;
  ip_address: string | null;
  created_at: string;
}

export interface UserNote {
  id: string;
  user_id: string;
  content_type: 'article' | 'roadmap' | 'section';
  content_slug: string;
  note_text: string;
  note_type: 'personal' | 'public' | 'question';
  position_data: Record<string, any>;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: 'learning' | 'consistency' | 'mastery' | 'community' | 'contribution';
  difficulty: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  icon_url: string | null;
  badge_color: string;
  requirements: Record<string, any>;
  points: number;
  is_hidden: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  progress_data: Record<string, any>;
  share_publicly: boolean;
  notification_sent: boolean;
}

export interface LearningStreak {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  streak_calendar: Record<string, any>;
  total_learning_days: number;
  created_at: string;
  updated_at: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  creator_id: string;
  roadmap_slug: string | null;
  is_private: boolean;
  max_members: number;
  member_count: number;
  tags: string[];
  group_avatar_url: string | null;
  welcome_message: string | null;
  rules: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface StudyGroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'member' | 'moderator' | 'admin';
  joined_at: string;
  last_active_at: string;
  contribution_score: number;
  is_muted: boolean;
  notification_preferences: Record<string, any>;
}

export interface CommunityPost {
  id: string;
  author_id: string;
  group_id: string;
  post_type: 'discussion' | 'announcement' | 'question' | 'resource' | 'achievement';
  title: string | null;
  content: string;
  tags: string[];
  attachment_urls: string[];
  is_pinned: boolean;
  is_locked: boolean;
  view_count: number;
  like_count: number;
  reply_count: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  moderation_status: 'approved' | 'pending' | 'rejected' | 'flagged';
}

export interface CommunityReply {
  id: string;
  post_id: string;
  author_id: string;
  parent_reply_id: string | null;
  content: string;
  attachment_urls: string[];
  like_count: number;
  is_best_answer: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  moderation_status: 'approved' | 'pending' | 'rejected' | 'flagged';
}

export interface MentorshipConnection {
  id: string;
  mentor_id: string;
  mentee_id: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'rejected';
  roadmap_slug: string | null;
  goals: string[];
  meeting_frequency: 'weekly' | 'biweekly' | 'monthly' | 'as_needed';
  started_at: string | null;
  ended_at: string | null;
  scheduled_meetings: any[];
  mentorship_notes: string | null;
  mentee_feedback: string | null;
  mentor_feedback: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserAnalytics {
  id: string;
  total_reading_time_minutes: number;
  articles_completed: number;
  roadmaps_completed: number;
  current_level: number;
  total_points: number;
  favorite_category: string | null;
  preferred_difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  most_active_hour: number | null;
  learning_velocity: Record<string, any>;
  skill_proficiency: Record<string, any>;
  weekly_activity: Record<string, any>;
  retention_rate: number;
  average_session_duration: number;
  created_at: string;
  updated_at: string;
}

export interface ContentAnalytics {
  id: string;
  content_type: 'article' | 'roadmap' | 'section';
  content_slug: string;
  total_views: number;
  unique_users: number;
  average_completion_rate: number;
  average_time_spent: number;
  difficulty_rating: number | null;
  popularity_score: number;
  bounce_rate: number;
  bookmark_count: number;
  share_count: number;
  comment_count: number;
  last_updated: string;
}

export interface Certification {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  roadmap_slug: string | null;
  issuer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours: number | null;
  validity_months: number | null;
  requirements: Record<string, any>;
  certificate_template_url: string | null;
  badge_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserCertification {
  id: string;
  user_id: string;
  certification_id: string;
  status: 'in-progress' | 'completed' | 'expired' | 'failed';
  started_at: string;
  completed_at: string | null;
  expires_at: string | null;
  assessment_results: Record<string, any>;
  certificate_url: string | null;
  progress_percentage: number;
  created_at: string;
  updated_at: string;
}

// Join types for enhanced queries
export interface ProfileWithPreferences extends Profile {
  preferences: UserPreferences | null;
}

export interface UserProgressWithContent extends UserProgress {
  content_title?: string;
  content_description?: string;
  content_difficulty?: string;
}

export interface UserAchievementWithAchievement extends UserAchievement {
  achievement: Achievement;
}

export interface StudyGroupWithMembership extends StudyGroup {
  user_role: 'member' | 'moderator' | 'admin';
  joined_at: string;
}

export interface CommunityPostWithAuthor extends CommunityPost {
  author: Profile;
  replies?: CommunityReply[];
}

export interface MentorshipConnectionWithProfiles extends MentorshipConnection {
  mentor: Profile;
  mentee: Profile;
}
