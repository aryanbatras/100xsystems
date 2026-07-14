-- Migration: Create Basic Indexes
-- Description: Simple performance indexes without complex functions
-- Version: 1.0.0

-- User progress indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_content ON user_progress(user_id, content_type, content_slug);
CREATE INDEX IF NOT EXISTS idx_user_progress_status ON user_progress(status);
CREATE INDEX IF NOT EXISTS idx_user_progress_last_accessed ON user_progress(last_accessed_at DESC);

-- Learning sessions indexes
CREATE INDEX IF NOT EXISTS idx_learning_sessions_user_date ON learning_sessions(user_id, session_start DESC);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_content ON learning_sessions(content_type, content_slug);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_device ON learning_sessions(device_type);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_duration ON learning_sessions(duration_minutes DESC);

-- User notes indexes
CREATE INDEX IF NOT EXISTS idx_user_notes_user_content ON user_notes(user_id, content_type, content_slug);
CREATE INDEX IF NOT EXISTS idx_user_notes_public ON user_notes(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_user_notes_created ON user_notes(created_at DESC);

-- User achievements indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_earned ON user_achievements(earned_at DESC);

-- Learning streaks indexes
CREATE INDEX IF NOT EXISTS idx_learning_streaks_current ON learning_streaks(current_streak DESC);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_longest ON learning_streaks(longest_streak DESC);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_activity ON learning_streaks(last_activity_date DESC);

-- Achievement progress indexes
CREATE INDEX IF NOT EXISTS idx_achievement_progress_user ON achievement_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_achievement_progress_percentage ON achievement_progress(progress_percentage DESC);

-- Study groups indexes
CREATE INDEX IF NOT EXISTS idx_study_groups_creator ON study_groups(creator_id);
CREATE INDEX IF NOT EXISTS idx_study_groups_roadmap ON study_groups(roadmap_slug);
CREATE INDEX IF NOT EXISTS idx_study_groups_private ON study_groups(is_private);
CREATE INDEX IF NOT EXISTS idx_study_groups_active ON study_groups(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_study_groups_created ON study_groups(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_study_groups_member_count ON study_groups(member_count DESC);

-- Study group members indexes
CREATE INDEX IF NOT EXISTS idx_study_group_members_group ON study_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_user ON study_group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_role ON study_group_members(role);
CREATE INDEX IF NOT EXISTS idx_study_group_members_active ON study_group_members(last_active_at DESC);

-- Mentorship connections indexes
CREATE INDEX IF NOT EXISTS idx_mentorship_mentor ON mentorship_connections(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_mentee ON mentorship_connections(mentee_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_status ON mentorship_connections(status);
CREATE INDEX IF NOT EXISTS idx_mentorship_roadmap ON mentorship_connections(roadmap_slug);
CREATE INDEX IF NOT EXISTS idx_mentorship_created ON mentorship_connections(created_at DESC);

-- Discussion participation indexes
CREATE INDEX IF NOT EXISTS idx_discussion_participation_user ON discussion_participation(user_id);
CREATE INDEX IF NOT EXISTS idx_discussion_participation_article ON discussion_participation(article_slug);
CREATE INDEX IF NOT EXISTS idx_discussion_participation_reputation ON discussion_participation(reputation_score DESC);

-- Community posts indexes
CREATE INDEX IF NOT EXISTS idx_community_posts_group ON community_posts(group_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_author ON community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_type ON community_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON community_posts(created_at DESC);

-- Community replies indexes
CREATE INDEX IF NOT EXISTS idx_community_replies_post ON community_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_community_replies_author ON community_replies(author_id);
CREATE INDEX IF NOT EXISTS idx_community_replies_parent ON community_replies(parent_reply_id);
CREATE INDEX IF NOT EXISTS idx_community_replies_created ON community_replies(created_at ASC);

-- User analytics indexes
CREATE INDEX IF NOT EXISTS idx_user_analytics_points ON user_analytics(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_level ON user_analytics(current_level DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_reading_time ON user_analytics(total_reading_time_minutes DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_completion ON user_analytics(articles_completed DESC);

-- Content analytics indexes
CREATE INDEX IF NOT EXISTS idx_content_analytics_type ON content_analytics(content_type);
CREATE INDEX IF NOT EXISTS idx_content_analytics_popularity ON content_analytics(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_content_analytics_views ON content_analytics(total_views DESC);
CREATE INDEX IF NOT EXISTS idx_content_analytics_completion ON content_analytics(average_completion_rate DESC);

-- Certifications indexes
CREATE INDEX IF NOT EXISTS idx_certifications_slug ON certifications(slug);
CREATE INDEX IF NOT EXISTS idx_certifications_active ON certifications(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_certifications_difficulty ON certifications(difficulty);
CREATE INDEX IF NOT EXISTS idx_certifications_roadmap ON certifications(roadmap_slug);

-- User certifications indexes
CREATE INDEX IF NOT EXISTS idx_user_certifications_user ON user_certifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_certifications_status ON user_certifications(status);
CREATE INDEX IF NOT EXISTS idx_user_certifications_completed ON user_certifications(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_certifications_verification ON user_certifications(verification_code);

-- Assessment results indexes
CREATE INDEX IF NOT EXISTS idx_assessment_results_user ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_certification ON assessment_results(certification_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_score ON assessment_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_submitted ON assessment_results(submitted_at DESC);

-- Learning insights indexes
CREATE INDEX IF NOT EXISTS idx_learning_insights_user ON learning_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_insights_type ON learning_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_learning_insights_priority ON learning_insights(priority, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learning_insights_created ON learning_insights(created_at DESC);
