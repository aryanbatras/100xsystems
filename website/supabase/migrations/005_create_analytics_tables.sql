-- Migration: Create Analytics & Certification Tables
-- Description: Tables for user analytics, content analytics, and certification system
-- Version: 1.0.0

-- User analytics summary table
CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  total_reading_time_minutes INTEGER DEFAULT 0 CHECK (total_reading_time_minutes >= 0),
  articles_completed INTEGER DEFAULT 0 CHECK (articles_completed >= 0),
  roadmaps_completed INTEGER DEFAULT 0 CHECK (roadmaps_completed >= 0),
  current_level INTEGER DEFAULT 1 CHECK (current_level >= 1 AND current_level <= 9),
  total_points INTEGER DEFAULT 0 CHECK (total_points >= 0),
  favorite_category TEXT,
  preferred_difficulty TEXT CHECK (preferred_difficulty IN ('beginner', 'intermediate', 'advanced')),
  most_active_hour INTEGER CHECK (most_active_hour >= 0 AND most_active_hour <= 23),
  learning_velocity JSONB DEFAULT '{}', -- Track speed over time: {week1: 2.5, week2: 3.1}
  skill_proficiency JSONB DEFAULT '{}', -- {javascript: 75, system-design: 60}
  weekly_activity JSONB DEFAULT '{}', -- Last 52 weeks of activity: {week1: 120, week2: 95}
  retention_rate DECIMAL(5,2) DEFAULT 0.00 CHECK (retention_rate >= 0 AND retention_rate <= 100),
  average_session_duration INTEGER DEFAULT 0 CHECK (average_session_duration >= 0), -- minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content analytics table
CREATE TABLE IF NOT EXISTS content_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT CHECK (content_type IN ('article', 'roadmap', 'section')),
  content_slug TEXT NOT NULL,
  total_views INTEGER DEFAULT 0 CHECK (total_views >= 0),
  unique_users INTEGER DEFAULT 0 CHECK (unique_users >= 0),
  average_completion_rate DECIMAL(5,2) DEFAULT 0.00 CHECK (average_completion_rate >= 0 AND average_completion_rate <= 100),
  average_time_spent INTEGER DEFAULT 0 CHECK (average_time_spent >= 0), -- minutes
  difficulty_rating DECIMAL(3,2), -- User feedback: 1.0-5.0
  popularity_score DECIMAL(5,2) DEFAULT 0.00 CHECK (popularity_score >= 0),
  bounce_rate DECIMAL(5,2) DEFAULT 0.00 CHECK (bounce_rate >= 0 AND bounce_rate <= 100),
  bookmark_count INTEGER DEFAULT 0 CHECK (bookmark_count >= 0),
  share_count INTEGER DEFAULT 0 CHECK (share_count >= 0),
  comment_count INTEGER DEFAULT 0 CHECK (comment_count >= 0),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(content_type, content_slug)
);

-- Learning patterns table
CREATE TABLE IF NOT EXISTS learning_patterns (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  preferred_session_length INTEGER DEFAULT 30 CHECK (preferred_session_length > 0 AND preferred_session_length <= 240), -- minutes
  most_productive_time TEXT CHECK (most_productive_time IN ('morning', 'afternoon', 'evening', 'night')),
  learning_style JSONB DEFAULT '{}', -- {visual: 80, reading: 60, practical: 90}
  strength_areas TEXT[] DEFAULT '{}',
  improvement_areas TEXT[] DEFAULT '{}',
  recommended_next_content TEXT[] DEFAULT '{}',
  retention_score DECIMAL(5,2) DEFAULT 0.00 CHECK (retention_score >= 0 AND retention_score <= 100),
  focus_score DECIMAL(5,2) DEFAULT 0.00 CHECK (focus_score >= 0 AND focus_score <= 100),
  consistency_score DECIMAL(5,2) DEFAULT 0.00 CHECK (consistency_score >= 0 AND consistency_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  roadmap_slug TEXT, -- Optional: associated with specific roadmap
  issuer TEXT DEFAULT '100xSystems',
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_hours INTEGER CHECK (estimated_hours > 0),
  validity_months INTEGER, -- null for lifetime certification
  requirements JSONB NOT NULL, -- {articles: ['slug1', 'slug2'], projects: ['project1'], quiz_score: 80}
  certificate_template_url TEXT,
  badge_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT title_length CHECK (LENGTH(title) >= 3 AND LENGTH(title) <= 100),
  CONSTRAINT description_length CHECK (LENGTH(description) <= 1000)
);

-- User certifications table
CREATE TABLE IF NOT EXISTS user_certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  certification_id UUID REFERENCES certifications(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in-progress' CHECK (status IN ('in-progress', 'completed', 'expired', 'revoked')),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  certificate_url TEXT,
  verification_code TEXT UNIQUE,
  progress_data JSONB DEFAULT '{}', -- Track completion of requirements
  final_score INTEGER CHECK (final_score >= 0 AND final_score <= 100),
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  issued_by TEXT, -- Admin who issued certificate
  issued_at TIMESTAMP WITH TIME ZONE,
  
  UNIQUE(user_id, certification_id)
);

-- Assessment results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  certification_id UUID REFERENCES certifications(id) ON DELETE CASCADE,
  assessment_type TEXT CHECK (assessment_type IN ('quiz', 'project', 'peer-review', 'final-exam', 'practical')),
  title TEXT NOT NULL,
  description TEXT,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  max_score INTEGER DEFAULT 100 CHECK (max_score > 0),
  passed BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 1 CHECK (attempts > 0),
  time_taken_minutes INTEGER CHECK (time_taken_minutes >= 0),
  feedback JSONB DEFAULT '{}', -- Detailed feedback: {strengths: [], improvements: [], notes: ''}
  submission_data JSONB DEFAULT '{}', -- Submitted answers or project links
  graded_by TEXT, -- Admin/mentor who graded
  graded_at TIMESTAMP WITH TIME ZONE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  retake_available_after TIMESTAMP WITH TIME ZONE
);

-- Learning insights table (AI-powered recommendations)
CREATE TABLE IF NOT EXISTS learning_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  insight_type TEXT CHECK (insight_type IN ('recommendation', 'pattern', 'achievement', 'warning', 'celebration')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  action_url TEXT, -- Link to relevant content
  action_text TEXT, -- CTA button text
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}', -- Additional context data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_analytics_points ON user_analytics(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_level ON user_analytics(current_level DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_reading_time ON user_analytics(total_reading_time_minutes DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_completion ON user_analytics(articles_completed DESC);

CREATE INDEX IF NOT EXISTS idx_content_analytics_popularity ON content_analytics(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_content_analytics_views ON content_analytics(total_views DESC);
CREATE INDEX IF NOT EXISTS idx_content_analytics_completion ON content_analytics(average_completion_rate DESC);
CREATE INDEX IF NOT EXISTS idx_content_analytics_content ON content_analytics(content_type, content_slug);

CREATE INDEX IF NOT EXISTS idx_learning_patterns_retention ON learning_patterns(retention_score DESC);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_consistency ON learning_patterns(consistency_score DESC);
CREATE INDEX IF NOT EXISTS idx_learning_patterns_focus ON learning_patterns(focus_score DESC);

CREATE INDEX IF NOT EXISTS idx_certifications_slug ON certifications(slug);
CREATE INDEX IF NOT EXISTS idx_certifications_active ON certifications(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_certifications_difficulty ON certifications(difficulty);
CREATE INDEX IF NOT EXISTS idx_certifications_roadmap ON certifications(roadmap_slug);

CREATE INDEX IF NOT EXISTS idx_user_certifications_user ON user_certifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_certifications_status ON user_certifications(status);
CREATE INDEX IF NOT EXISTS idx_user_certifications_completed ON user_certifications(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_certifications_verification ON user_certifications(verification_code);

CREATE INDEX IF NOT EXISTS idx_assessment_results_user ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_certification ON assessment_results(certification_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_score ON assessment_results(score DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_results_submitted ON assessment_results(submitted_at DESC);

CREATE INDEX IF NOT EXISTS idx_learning_insights_user ON learning_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_insights_type ON learning_insights(insight_type);
CREATE INDEX IF NOT EXISTS idx_learning_insights_priority ON learning_insights(priority, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learning_insights_unread ON learning_insights(is_read, is_dismissed) WHERE NOT (is_read OR is_dismissed);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_certifications_search ON certifications USING gin(to_tsvector('english', 
  COALESCE(title, '') || ' ' || COALESCE(description, '')
));

-- Create triggers for updated_at
CREATE TRIGGER update_user_analytics_updated_at 
    BEFORE UPDATE ON user_analytics 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_patterns_updated_at 
    BEFORE UPDATE ON learning_patterns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at 
    BEFORE UPDATE ON certifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_certifications_updated_at 
    BEFORE UPDATE ON user_certifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate popularity score
CREATE OR REPLACE FUNCTION calculate_popularity_score()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE content_analytics 
    SET popularity_score = (
        (total_views * 0.3) +
        (unique_users * 0.25) +
        (average_completion_rate * 2) +
        (bookmark_count * 5) +
        (share_count * 3) +
        (comment_count * 2) -
        (bounce_rate * 0.5)
    );
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to update user analytics
CREATE OR REPLACE FUNCTION update_user_analytics_on_progress()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user analytics based on progress changes
    UPDATE user_analytics 
    SET 
        total_reading_time_minutes = total_reading_time_minutes + COALESCE(NEW.time_spent_minutes - OLD.time_spent_minutes, 0),
        articles_completed = CASE 
            WHEN NEW.status = 'completed' AND OLD.status != 'completed' THEN articles_completed + 1
            ELSE articles_completed
        END,
        updated_at = NOW()
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER calculate_popularity_on_update
    AFTER UPDATE ON content_analytics
    FOR EACH ROW EXECUTE FUNCTION calculate_popularity_score();

CREATE TRIGGER update_analytics_on_progress_change
    AFTER UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_user_analytics_on_progress();

-- Add comments for documentation
COMMENT ON TABLE user_analytics IS 'Comprehensive analytics summary for each user';
COMMENT ON TABLE content_analytics IS 'Performance metrics for articles and roadmaps';
COMMENT ON TABLE learning_patterns IS 'User learning behavior patterns and preferences';
COMMENT ON TABLE certifications IS 'Available certification programs';
COMMENT ON TABLE user_certifications IS 'User progress and completion of certifications';
COMMENT ON TABLE assessment_results IS 'Detailed results for certification assessments';
COMMENT ON TABLE learning_insights IS 'AI-powered personalized learning recommendations';
COMMENT ON COLUMN user_analytics.learning_velocity IS 'JSON tracking learning speed over time periods';
COMMENT ON COLUMN content_analytics.popularity_score IS 'Calculated score based on engagement metrics';
COMMENT ON COLUMN certifications.validity_months IS 'Certificate validity period, null for lifetime';
COMMENT ON COLUMN user_certifications.verification_code IS 'Unique code for certificate verification';
