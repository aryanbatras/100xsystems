-- Migration: Essential RLS Policies (CRITICAL)
-- Description: Deploy essential Row Level Security policies to restore functionality
-- Version: 1.0.0
-- Priority: CRITICAL - Application is non-functional without these policies

-- Enable RLS on all tables (already enabled, but ensuring)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_participation ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- =================================================================
-- USER MANAGEMENT POLICIES
-- =================================================================

-- Profiles table policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
    FOR SELECT USING (is_public = true AND auth.role() = 'authenticated');

CREATE POLICY "Service role full access" ON profiles
    FOR ALL USING (auth.role() = 'service_role');

-- User preferences policies
CREATE POLICY "Users can manage own preferences" ON user_preferences
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Service role full access" ON user_preferences
    FOR ALL USING (auth.role() = 'service_role');

-- =================================================================
-- LEARNING PROGRESS POLICIES
-- =================================================================

-- User progress policies
CREATE POLICY "Users can view own progress" ON user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own progress" ON user_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON user_progress
    FOR ALL USING (auth.role() = 'service_role');

-- Learning sessions policies
CREATE POLICY "Users can view own sessions" ON learning_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions" ON learning_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON learning_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON learning_sessions
    FOR ALL USING (auth.role() = 'service_role');

-- User notes policies
CREATE POLICY "Users can view own notes" ON user_notes
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own notes" ON user_notes
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public notes are viewable by everyone" ON user_notes
    FOR SELECT USING (is_public = true AND auth.role() = 'authenticated');

CREATE POLICY "Service role full access" ON user_notes
    FOR ALL USING (auth.role() = 'service_role');

-- =================================================================
-- ACHIEVEMENT SYSTEM POLICIES
-- =================================================================

-- Achievements policies (public content)
CREATE POLICY "Achievements are viewable by authenticated users" ON achievements
    FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);

CREATE POLICY "Service role full access" ON achievements
    FOR ALL USING (auth.role() = 'service_role');

-- User achievements policies
CREATE POLICY "Users can view own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own achievements" ON user_achievements
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public achievements are viewable" ON user_achievements
    FOR SELECT USING (share_publicly = true AND auth.role() = 'authenticated');

CREATE POLICY "Service role full access" ON user_achievements
    FOR ALL USING (auth.role() = 'service_role');

-- Achievement progress policies
CREATE POLICY "Users can view own achievement progress" ON achievement_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own achievement progress" ON achievement_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON achievement_progress
    FOR ALL USING (auth.role() = 'service_role');

-- Learning streaks policies
CREATE POLICY "Users can view own streaks" ON learning_streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own streaks" ON learning_streaks
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON learning_streaks
    FOR ALL USING (auth.role() = 'service_role');

-- =================================================================
-- COMMUNITY FEATURES POLICIES
-- =================================================================

-- Study groups policies
CREATE POLICY "Users can view public study groups" ON study_groups
    FOR SELECT USING (is_private = false AND auth.role() = 'authenticated');

CREATE POLICY "Group members can view their groups" ON study_groups
    FOR SELECT USING (
        id IN (SELECT group_id FROM study_group_members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can create study groups" ON study_groups
    FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Group admins can manage groups" ON study_groups
    FOR UPDATE USING (
        id IN (SELECT group_id FROM study_group_members 
               WHERE user_id = auth.uid() AND role IN ('admin', 'moderator'))
    );

CREATE POLICY "Service role full access" ON study_groups
    FOR ALL USING (auth.role() = 'service_role');

-- Study group members policies
CREATE POLICY "Group members can view membership" ON study_group_members
    FOR SELECT USING (
        group_id IN (SELECT group_id FROM study_group_members WHERE user_id = auth.uid())
        OR user_id = auth.uid()
    );

CREATE POLICY "Users can join groups" ON study_group_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own membership" ON study_group_members
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Group admins can manage members" ON study_group_members
    FOR UPDATE USING (
        group_id IN (SELECT group_id FROM study_group_members 
               WHERE user_id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Users can leave groups" ON study_group_members
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON study_group_members
    FOR ALL USING (auth.role() = 'service_role');

-- Community posts policies
CREATE POLICY "Group members can view posts" ON community_posts
    FOR SELECT USING (
        group_id IN (SELECT group_id FROM study_group_members WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can create posts in groups" ON community_posts
    FOR INSERT WITH CHECK (
        auth.uid() = author_id AND
        group_id IN (SELECT group_id FROM study_group_members WHERE user_id = auth.uid())
    );

CREATE POLICY "Authors can manage own posts" ON community_posts
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Group admins can manage posts" ON community_posts
    FOR UPDATE USING (
        group_id IN (SELECT group_id FROM study_group_members 
               WHERE user_id = auth.uid() AND role IN ('admin', 'moderator'))
    );

CREATE POLICY "Service role full access" ON community_posts
    FOR ALL USING (auth.role() = 'service_role');

-- Community replies policies
CREATE POLICY "Group members can view replies" ON community_replies
    FOR SELECT USING (
        post_id IN (
            SELECT id FROM community_posts 
            WHERE group_id IN (SELECT group_id FROM study_group_members WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Users can create replies" ON community_replies
    FOR INSERT WITH CHECK (
        auth.uid() = author_id AND
        post_id IN (
            SELECT id FROM community_posts 
            WHERE group_id IN (SELECT group_id FROM study_group_members WHERE user_id = auth.uid())
        )
    );

CREATE POLICY "Authors can manage own replies" ON community_replies
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Group admins can manage replies" ON community_replies
    FOR UPDATE USING (
        post_id IN (
            SELECT id FROM community_posts 
            WHERE group_id IN (SELECT group_id FROM study_group_members 
                   WHERE user_id = auth.uid() AND role IN ('admin', 'moderator'))
        )
    );

CREATE POLICY "Service role full access" ON community_replies
    FOR ALL USING (auth.role() = 'service_role');

-- Mentorship connections policies
CREATE POLICY "Users can view own mentorship connections" ON mentorship_connections
    FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Users can create mentorship connections" ON mentorship_connections
    FOR INSERT WITH CHECK (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Users can update own connections" ON mentorship_connections
    FOR UPDATE USING (auth.uid() = mentor_id OR auth.uid() = mentee_id);

CREATE POLICY "Service role full access" ON mentorship_connections
    FOR ALL USING (auth.role() = 'service_role');

-- Discussion participation policies
CREATE POLICY "Users can view own discussion participation" ON discussion_participation
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own discussion participation" ON discussion_participation
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON discussion_participation
    FOR ALL USING (auth.role() = 'service_role');

-- =================================================================
-- ANALYTICS POLICIES
-- =================================================================

-- User analytics policies
CREATE POLICY "Users can view own analytics" ON user_analytics
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Service role full access" ON user_analytics
    FOR ALL USING (auth.role() = 'service_role');

-- Content analytics policies (public read-only)
CREATE POLICY "Content analytics are viewable by authenticated users" ON content_analytics
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Service role full access" ON content_analytics
    FOR ALL USING (auth.role() = 'service_role');

-- Learning patterns policies
CREATE POLICY "Users can view own learning patterns" ON learning_patterns
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Service role full access" ON learning_patterns
    FOR ALL USING (auth.role() = 'service_role');

-- Learning insights policies
CREATE POLICY "Users can view own insights" ON learning_insights
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own insights" ON learning_insights
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON learning_insights
    FOR ALL USING (auth.role() = 'service_role');

-- =================================================================
-- CERTIFICATION POLICIES
-- =================================================================

-- Certifications policies (public read-only)
CREATE POLICY "Certifications are viewable by authenticated users" ON certifications
    FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);

CREATE POLICY "Service role full access" ON certifications
    FOR ALL USING (auth.role() = 'service_role');

-- User certifications policies
CREATE POLICY "Users can view own certifications" ON user_certifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own certifications" ON user_certifications
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public certifications are viewable" ON user_certifications
    FOR SELECT USING (status = 'completed' AND auth.role() = 'authenticated');

CREATE POLICY "Service role full access" ON user_certifications
    FOR ALL USING (auth.role() = 'service_role');

-- Assessment results policies
CREATE POLICY "Users can view own assessment results" ON assessment_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own assessment results" ON assessment_results
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON assessment_results
    FOR ALL USING (auth.role() = 'service_role');

-- =================================================================
-- POLICY VERIFICATION
-- =================================================================

-- Verify policies were created
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO policy_count FROM pg_policy;
    RAISE NOTICE 'Created % RLS policies', policy_count;
    
    IF policy_count < 40 THEN
        RAISE EXCEPTION 'Expected at least 40 policies, got %', policy_count;
    END IF;
END $$;
