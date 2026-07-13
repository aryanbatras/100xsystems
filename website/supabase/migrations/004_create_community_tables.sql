-- Migration: Create Community & Social Features Tables
-- Description: Tables for study groups, mentorship, and community interactions
-- Version: 1.0.0

-- Study groups table
CREATE TABLE IF NOT EXISTS study_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_slug TEXT, -- Optional: associated with specific roadmap
  is_private BOOLEAN DEFAULT false,
  max_members INTEGER DEFAULT 50 CHECK (max_members > 0 AND max_members <= 1000),
  member_count INTEGER DEFAULT 1 CHECK (member_count >= 0),
  tags TEXT[] DEFAULT '{}',
  group_avatar_url TEXT,
  welcome_message TEXT,
  rules TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  
  -- Constraints
  CONSTRAINT name_length CHECK (LENGTH(name) >= 3 AND LENGTH(name) <= 100),
  CONSTRAINT description_length CHECK (LENGTH(description) <= 1000)
);

-- Study group memberships table
CREATE TABLE IF NOT EXISTS study_group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contribution_score INTEGER DEFAULT 0 CHECK (contribution_score >= 0),
  is_muted BOOLEAN DEFAULT false,
  notification_preferences JSONB DEFAULT '{"mentions": true, "announcements": true}',
  
  UNIQUE(group_id, user_id)
);

-- Mentorship connections table
CREATE TABLE IF NOT EXISTS mentorship_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  mentee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled', 'rejected')),
  roadmap_slug TEXT, -- Focus area
  goals TEXT[] DEFAULT '{}',
  meeting_frequency TEXT CHECK (meeting_frequency IN ('weekly', 'biweekly', 'monthly', 'as_needed')),
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  scheduled_meetings JSONB DEFAULT '[]', -- Array of scheduled meeting objects
  mentorship_notes TEXT, -- Private notes for mentor
  mentee_feedback TEXT, -- Feedback from mentee
  mentor_feedback TEXT, -- Feedback from mentee
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT different_users CHECK (mentor_id != mentee_id),
  CONSTRAINT goals_array_length CHECK (array_length(goals, 1) <= 10),
  CONSTRAINT goals_length CHECK (array_length(goals, 1) IS NULL OR array_length(goals, 1) > 0)
);

-- Discussion participation tracking table
CREATE TABLE IF NOT EXISTS discussion_participation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  article_slug TEXT NOT NULL,
  discussion_provider TEXT DEFAULT 'giscus' CHECK (discussion_provider IN ('giscus', 'github', 'disqus')),
  comment_count INTEGER DEFAULT 0 CHECK (comment_count >= 0),
  last_commented_at TIMESTAMP WITH TIME ZONE,
  reputation_score INTEGER DEFAULT 0 CHECK (reputation_score >= 0),
  helpful_votes INTEGER DEFAULT 0 CHECK (helpful_votes >= 0),
  total_words_written INTEGER DEFAULT 0 CHECK (total_words_written >= 0),
  discussion_quality_score DECIMAL(3,2) DEFAULT 0.00 CHECK (discussion_quality_score >= 0 AND discussion_quality_score <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, article_slug, discussion_provider)
);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  post_type TEXT DEFAULT 'discussion' CHECK (post_type IN ('discussion', 'announcement', 'question', 'resource', 'achievement')),
  title TEXT,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  attachment_urls TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT false,
  is_locked BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0 CHECK (view_count >= 0),
  like_count INTEGER DEFAULT 0 CHECK (like_count >= 0),
  reply_count INTEGER DEFAULT 0 CHECK (reply_count >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE, -- Soft delete
  moderation_status TEXT DEFAULT 'approved' CHECK (moderation_status IN ('approved', 'pending', 'rejected', 'flagged')),
  
  -- Constraints
  CONSTRAINT title_required_for_discussion CHECK (
    (post_type IN ('discussion', 'question', 'announcement') AND title IS NOT NULL) OR
    post_type IN ('resource', 'achievement')
  ),
  CONSTRAINT content_length CHECK (LENGTH(content) >= 1 AND LENGTH(content) <= 5000),
  CONSTRAINT title_length CHECK (title IS NULL OR (LENGTH(title) >= 5 AND LENGTH(title) <= 200))
);

-- Community replies table
CREATE TABLE IF NOT EXISTS community_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_reply_id UUID REFERENCES community_replies(id) ON DELETE CASCADE, -- For nested replies
  content TEXT NOT NULL,
  attachment_urls TEXT[] DEFAULT '{}',
  like_count INTEGER DEFAULT 0 CHECK (like_count >= 0),
  is_best_answer BOOLEAN DEFAULT false, -- For question posts
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE, -- Soft delete
  moderation_status TEXT DEFAULT 'approved' CHECK (moderation_status IN ('approved', 'pending', 'rejected', 'flagged')),
  
  -- Constraints
  CONSTRAINT reply_content_length CHECK (LENGTH(content) >= 1 AND LENGTH(content) <= 2000)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_study_groups_creator ON study_groups(creator_id);
CREATE INDEX IF NOT EXISTS idx_study_groups_roadmap ON study_groups(roadmap_slug);
CREATE INDEX IF NOT EXISTS idx_study_groups_private ON study_groups(is_private);
CREATE INDEX IF NOT EXISTS idx_study_groups_active ON study_groups(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_study_groups_tags ON study_groups USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_study_groups_created ON study_groups(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_study_group_members_group ON study_group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_user ON study_group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_role ON study_group_members(role);
CREATE INDEX IF NOT EXISTS idx_study_group_members_active ON study_group_members(last_active_at DESC);

CREATE INDEX IF NOT EXISTS idx_mentorship_mentor ON mentorship_connections(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_mentee ON mentorship_connections(mentee_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_status ON mentorship_connections(status);
CREATE INDEX IF NOT EXISTS idx_mentorship_roadmap ON mentorship_connections(roadmap_slug);
CREATE INDEX IF NOT EXISTS idx_mentorship_created ON mentorship_connections(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_discussion_participation_user ON discussion_participation(user_id);
CREATE INDEX IF NOT EXISTS idx_discussion_participation_article ON discussion_participation(article_slug);
CREATE INDEX IF NOT EXISTS idx_discussion_participation_reputation ON discussion_participation(reputation_score DESC);

CREATE INDEX IF NOT EXISTS idx_community_posts_group ON community_posts(group_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_author ON community_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_type ON community_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_community_posts_pinned ON community_posts(is_pinned) WHERE is_pinned = true;
CREATE INDEX IF NOT EXISTS idx_community_posts_created ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_tags ON community_posts USING gin(tags);

CREATE INDEX IF NOT EXISTS idx_community_replies_post ON community_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_community_replies_author ON community_replies(author_id);
CREATE INDEX IF NOT EXISTS idx_community_replies_parent ON community_replies(parent_reply_id);
CREATE INDEX IF NOT EXISTS idx_community_replies_best ON community_replies(is_best_answer) WHERE is_best_answer = true;
CREATE INDEX IF NOT EXISTS idx_community_replies_created ON community_replies(created_at ASC);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_study_groups_search ON study_groups USING gin(to_tsvector('english', 
  COALESCE(name, '') || ' ' || COALESCE(description, '')
));

CREATE INDEX IF NOT EXISTS idx_community_posts_search ON community_posts USING gin(to_tsvector('english', 
  COALESCE(title, '') || ' ' || COALESCE(content, '')
));

CREATE INDEX IF NOT EXISTS idx_community_replies_search ON community_replies USING gin(to_tsvector('english', content));

-- Create triggers for updated_at
CREATE TRIGGER update_study_groups_updated_at 
    BEFORE UPDATE ON study_groups 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_group_members_updated_at 
    BEFORE UPDATE ON study_group_members 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentorship_connections_updated_at 
    BEFORE UPDATE ON mentorship_connections 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discussion_participation_updated_at 
    BEFORE UPDATE ON discussion_participation 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at 
    BEFORE UPDATE ON community_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_replies_updated_at 
    BEFORE UPDATE ON community_replies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update study group member count
CREATE OR REPLACE FUNCTION update_study_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE study_groups 
        SET member_count = member_count + 1 
        WHERE id = NEW.group_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE study_groups 
        SET member_count = GREATEST(member_count - 1, 0) 
        WHERE id = OLD.group_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

-- Create triggers for member count updates
CREATE TRIGGER update_member_count_on_join
    AFTER INSERT ON study_group_members
    FOR EACH ROW EXECUTE FUNCTION update_study_group_member_count();

CREATE TRIGGER update_member_count_on_leave
    AFTER DELETE ON study_group_members
    FOR EACH ROW EXECUTE FUNCTION update_study_group_member_count();

-- Add comments for documentation
COMMENT ON TABLE study_groups IS 'User-created study groups for collaborative learning';
COMMENT ON TABLE study_group_members IS 'Membership table for study groups with roles';
COMMENT ON TABLE mentorship_connections IS 'Mentor-mentee relationships with goals and progress';
COMMENT ON TABLE discussion_participation IS 'Tracks user participation in article discussions';
COMMENT ON TABLE community_posts IS 'Posts within study groups for discussions and announcements';
COMMENT ON TABLE community_replies IS 'Replies to community posts with nesting support';
COMMENT ON COLUMN mentorship_connections.scheduled_meetings IS 'JSON array of scheduled meeting objects';
COMMENT ON COLUMN community_posts.moderation_status IS 'Content moderation status for posts';
COMMENT ON COLUMN study_group_members.notification_preferences IS 'JSON object for notification settings';
