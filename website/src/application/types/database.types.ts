/**
 * ## 100xSystems: Database Type Definitions
 *
 * Central type definitions for all database entities used across the application.
 * These types mirror the Supabase table schemas and provide TypeScript-level
 * type safety for all database operations.
 *
 * WHY A SINGLE FILE:
 *   All domain entities share common patterns (ids, timestamps, status enums).
 *   Having them in one file makes it easy to see relationships between entities
 *   and prevents circular dependency issues that arise from split definitions.
 *
 * @packageDocumentation
 */

/**
 * Core user profile record.
 *
 * @remarks
 * Maps to the `profiles` table in Supabase. Created automatically via
 * database trigger when a new user signs up via OAuth. Contains both
 * authentication metadata and user-controlled profile fields.
 *
 * @public
 */
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

/**
 * User learning preferences and notification settings.
 *
 * @remarks
 * Separate from Profile to allow independent update frequency.
 * Created on first access with defaults rather than on signup.
 *
 * @public
 */
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

/**
 * Tracks a user's learning progress for a specific piece of content.
 *
 * @remarks
 * Each row represents the user's relationship with one content item
 * (article, roadmap section, or full roadmap). Status transitions follow:
 * not-started → in-progress → completed (with optional bookmarked as a
 * persistent state separate from the linear flow).
 *
 * @public
 */
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

/**
 * A single learning session recorded when a user reads content.
 *
 * @remarks
 * Created when a user starts reading content and updated when they leave.
 * Used to calculate time spent, engagement metrics, and learning velocity.
 *
 * @public
 */
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

/**
 * A user-generated note attached to a piece of content.
 *
 * @remarks
 * Notes can be personal (private), public (shared with community), or
 * questions (seeking answers). Position data allows anchoring notes to
 * specific sections of the content.
 *
 * @public
 */
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

/**
 * Achievement definition — a milestone users can unlock.
 *
 * @remarks
 * Achievements are defined by admins and stored in the `achievements` table.
 * Each achievement has a category (learning, consistency, mastery, etc.) and
 * difficulty tier (bronze → diamond). Users unlock them automatically when
 * requirements are met.
 *
 * @public
 */
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

/**
 * Records that a user has unlocked a specific achievement.
 *
 * @remarks
 * Created when checkAndUnlockAchievements() determines the user meets
 * the achievement's requirements. The progress_data field tracks
 * completion metrics toward the achievement.
 *
 * @public
 */
export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at: string;
  progress_data: Record<string, any>;
  share_publicly: boolean;
  notification_sent: boolean;
}

/**
 * Tracks a user's consecutive-day learning streak.
 *
 * @remarks
 * Updated daily when a user engages with content. Streak calendar
 * records every active day for analytics and visualization.
 *
 * @public
 */
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

/**
 * A study group where users collaborate on learning.
 *
 * @remarks
 * Users can create or join study groups. Groups can be public or private,
 * and have configurable max member limits. The creator becomes admin.
 *
 * @public
 */
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

/**
 * Membership record linking a user to a study group.
 *
 * @remarks
 * Tracks role (member/moderator/admin), contribution score, and activity.
 * Used for leaderboards and moderation.
 *
 * @public
 */
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

/**
 * A discussion post within a study group.
 *
 * @remarks
 * Posts can be discussions, announcements, questions, resources, or
 * achievement shares. Moderation status controls visibility.
 *
 * @public
 */
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

/**
 * A reply to a community post, supporting nested (threaded) replies.
 *
 * @remarks
 * Replies can be nested via parent_reply_id. The is_best_answer flag
 * marks the accepted answer for question-type posts.
 *
 * @public
 */
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

/**
 * Tracks a mentorship relationship between mentor and mentee.
 *
 * @remarks
 * Status transitions: pending → active → completed/cancelled/rejected.
 * Meeting frequency and goals are set during the request phase.
 *
 * @public
 */
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

/**
 * Aggregated learning analytics for a user.
 *
 * @remarks
 * Updated periodically to track long-term learning patterns.
 * Fields like learning_velocity and weekly_activity are used
 * by the insights engine for personalized recommendations.
 *
 * @public
 */
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

/**
 * Analytics for a single content item (article/roadmap/section).
 *
 * @remarks
 * Tracks views, completion rates, and engagement metrics.
 * Popularity score is calculated from a weighted combination
 * of views, completion rate, and shares.
 *
 * @public
 */
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

/**
 * A certification that users can earn.
 *
 * @remarks
 * Certifications are tied to roadmaps and require completing
 * all associated articles and passing assessments.
 *
 * @public
 */
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

/**
 * Tracks a user's progress toward earning a certification.
 *
 * @remarks
 * Status transitions: in-progress → completed/expired/failed.
 * Assessment results store final exam data.
 *
 * @public
 */
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
