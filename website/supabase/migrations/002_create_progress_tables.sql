-- Migration: Create Learning Progress Tables
-- Description: Tables for tracking user learning progress, sessions, and notes
-- Version: 1.0.0

-- User progress tracking table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT CHECK (content_type IN ('article', 'roadmap', 'section')),
  content_slug TEXT NOT NULL,
  status TEXT DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed', 'bookmarked')),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  time_spent_minutes INTEGER DEFAULT 0 CHECK (time_spent_minutes >= 0),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  bookmark_position INTEGER DEFAULT 0 CHECK (bookmark_position >= 0),
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  difficulty_feedback TEXT CHECK (difficulty_feedback IN ('too-easy', 'just-right', 'too-hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint to prevent duplicate progress entries
  UNIQUE(user_id, content_type, content_slug)
);

-- Learning sessions table for detailed tracking
CREATE TABLE IF NOT EXISTS learning_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT CHECK (content_type IN ('article', 'roadmap', 'section')),
  content_slug TEXT NOT NULL,
  session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_end TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER CHECK (duration_minutes >= 0),
  pages_read INTEGER DEFAULT 0 CHECK (pages_read >= 0),
  scroll_depth_percentage INTEGER DEFAULT 0 CHECK (scroll_depth_percentage >= 0 AND scroll_depth_percentage <= 100),
  device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User-generated notes table
CREATE TABLE IF NOT EXISTS user_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT CHECK (content_type IN ('article', 'roadmap', 'section')),
  content_slug TEXT NOT NULL,
  note_text TEXT NOT NULL,
  note_type TEXT DEFAULT 'personal' CHECK (note_type IN ('personal', 'public', 'question')),
  position_data JSONB DEFAULT '{}', -- {scroll_position: number, highlighted_text: string}
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Check constraints
  CONSTRAINT note_text_not_empty CHECK (LENGTH(TRIM(note_text)) > 0),
  CONSTRAINT note_text_length CHECK (LENGTH(note_text) <= 2000)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_content ON user_progress(user_id, content_type, content_slug);
CREATE INDEX IF NOT EXISTS idx_user_progress_status ON user_progress(status);
CREATE INDEX IF NOT EXISTS idx_user_progress_last_accessed ON user_progress(last_accessed_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_status ON user_progress(user_id, status) WHERE status IN ('in-progress', 'bookmarked');

CREATE INDEX IF NOT EXISTS idx_learning_sessions_user_date ON learning_sessions(user_id, session_start DESC);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_content ON learning_sessions(content_type, content_slug);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_device ON learning_sessions(device_type);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_duration ON learning_sessions(duration_minutes DESC);

CREATE INDEX IF NOT EXISTS idx_user_notes_user_content ON user_notes(user_id, content_type, content_slug);
CREATE INDEX IF NOT EXISTS idx_user_notes_public ON user_notes(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_user_notes_created ON user_notes(created_at DESC);

-- Full-text search index for notes
CREATE INDEX IF NOT EXISTS idx_user_notes_search ON user_notes USING gin(to_tsvector('english', note_text));

-- Create triggers for updated_at
CREATE TRIGGER update_user_progress_updated_at 
    BEFORE UPDATE ON user_progress 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_notes_updated_at 
    BEFORE UPDATE ON user_notes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update progress when session ends
CREATE OR REPLACE FUNCTION update_progress_from_session()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user progress when a session ends
    IF NEW.session_end IS NOT NULL AND OLD.session_end IS NULL THEN
        UPDATE user_progress 
        SET 
            time_spent_minutes = time_spent_minutes + COALESCE(NEW.duration_minutes, 0),
            last_accessed_at = GREATEST(last_accessed_at, NEW.session_start),
            progress_percentage = LEAST(progress_percentage + 5, 100) -- Increment by 5% max
        WHERE user_id = NEW.user_id 
            AND content_type = NEW.content_type 
            AND content_slug = NEW.content_slug;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for progress update
CREATE TRIGGER update_progress_on_session_end
    AFTER UPDATE ON learning_sessions
    FOR EACH ROW EXECUTE FUNCTION update_progress_from_session();

-- Add comments for documentation
COMMENT ON TABLE user_progress IS 'Tracks user progress through articles, roadmaps, and sections';
COMMENT ON TABLE learning_sessions IS 'Detailed tracking of user learning sessions';
COMMENT ON TABLE user_notes IS 'User-generated notes and highlights';
COMMENT ON COLUMN user_progress.progress_percentage IS 'Completion percentage (0-100)';
COMMENT ON COLUMN user_progress.bookmark_position IS 'Scroll position for resuming reading';
COMMENT ON COLUMN learning_sessions.scroll_depth_percentage IS 'How far user scrolled in content (0-100)';
COMMENT ON COLUMN user_notes.position_data IS 'JSON data for note position and highlighted text';
