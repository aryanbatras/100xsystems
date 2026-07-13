-- Migration: Create Achievement & Gamification Tables
-- Description: Tables for achievements, user achievements, and learning streaks
-- Version: 1.0.0

-- Achievement definitions table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('learning', 'community', 'consistency', 'mastery', 'contribution')),
  difficulty TEXT CHECK (difficulty IN ('bronze', 'silver', 'gold', 'platinum', 'diamond')),
  icon_url TEXT,
  badge_color TEXT DEFAULT '#1a1a1a',
  requirements JSONB NOT NULL, -- {type: 'complete_articles', count: 10, difficulty: 'intermediate'}
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  is_hidden BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT title_length CHECK (LENGTH(title) >= 3 AND LENGTH(title) <= 100),
  CONSTRAINT description_length CHECK (LENGTH(description) <= 500)
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress_data JSONB DEFAULT '{}', -- For partial progress tracking
  share_publicly BOOLEAN DEFAULT true,
  notification_sent BOOLEAN DEFAULT false,
  
  UNIQUE(user_id, achievement_id)
);

-- Learning streaks table
CREATE TABLE IF NOT EXISTS learning_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0 CHECK (current_streak >= 0),
  longest_streak INTEGER DEFAULT 0 CHECK (longest_streak >= 0),
  last_activity_date DATE,
  streak_calendar JSONB DEFAULT '{}', -- Track daily activity for last 365 days
  total_learning_days INTEGER DEFAULT 0 CHECK (total_learning_days >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievement progress tracking (for multi-step achievements)
CREATE TABLE IF NOT EXISTS achievement_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  current_progress INTEGER DEFAULT 0 CHECK (current_progress >= 0),
  target_progress INTEGER DEFAULT 1 CHECK (target_progress > 0),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, achievement_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_achievements_slug ON achievements(slug);
CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category, difficulty);
CREATE INDEX IF NOT EXISTS idx_achievements_active ON achievements(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_achievements_points ON achievements(points DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_sort ON achievements(sort_order, category);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_earned ON user_achievements(earned_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_achievements_public ON user_achievements(user_id) WHERE share_publicly = true;

CREATE INDEX IF NOT EXISTS idx_learning_streaks_current ON learning_streaks(current_streak DESC);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_longest ON learning_streaks(longest_streak DESC);
CREATE INDEX IF NOT EXISTS idx_learning_streaks_activity ON learning_streaks(last_activity_date DESC);

CREATE INDEX IF NOT EXISTS idx_achievement_progress_user ON achievement_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_achievement_progress_percentage ON achievement_progress(progress_percentage DESC);

-- Full-text search index for achievements
CREATE INDEX IF NOT EXISTS idx_achievements_search ON achievements USING gin(to_tsvector('english', 
  COALESCE(title, '') || ' ' || COALESCE(description, '')
));

-- Create triggers for updated_at
CREATE TRIGGER update_achievements_updated_at 
    BEFORE UPDATE ON achievements 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learning_streaks_updated_at 
    BEFORE UPDATE ON learning_streaks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: update_learning_streak function moved to migration 009_fix_functions.sql
-- Note: check_achievement_achievement function moved to migration 009_fix_functions.sql

-- Add comments for documentation
COMMENT ON TABLE achievements IS 'Definitions of all available achievements';
COMMENT ON TABLE user_achievements IS 'Achievements earned by users';
COMMENT ON TABLE learning_streaks IS 'User learning streak tracking with calendar data';
COMMENT ON TABLE achievement_progress IS 'Progress tracking for multi-step achievements';
COMMENT ON COLUMN achievements.requirements IS 'JSON object defining achievement conditions';
COMMENT ON COLUMN learning_streaks.streak_calendar IS 'JSON object tracking daily activity';
COMMENT ON COLUMN user_achievements.progress_data IS 'Additional data about achievement completion';
