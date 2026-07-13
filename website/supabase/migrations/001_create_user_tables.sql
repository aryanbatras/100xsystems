-- Migration: Create User Management Tables
-- Description: Core user tables for profiles and preferences
-- Version: 1.0.0

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  github_username TEXT UNIQUE,
  linkedin_url TEXT,
  website_url TEXT,
  location TEXT,
  timezone TEXT DEFAULT 'UTC',
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_public BOOLEAN DEFAULT true,
  is_mentor BOOLEAN DEFAULT false,
  mentorship_areas TEXT[],
  
  -- Constraints
  CONSTRAINT username_length CHECK (LENGTH(username) >= 3 AND LENGTH(username) <= 50),
  CONSTRAINT bio_length CHECK (LENGTH(bio) <= 500),
  CONSTRAINT valid_timezone CHECK (timezone ~ '^[A-Za-z_]+/[A-Za-z_]+$'),
  CONSTRAINT valid_language CHECK (preferred_language ~ '^[a-z]{2}(-[A-Z]{2})?$')
);

-- User preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT false,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  learning_reminders BOOLEAN DEFAULT true,
  reminder_time TIME DEFAULT '09:00:00',
  difficulty_preference TEXT DEFAULT 'adaptive' CHECK (difficulty_preference IN ('beginner', 'intermediate', 'advanced', 'adaptive')),
  weekly_goal_hours INTEGER DEFAULT 5 CHECK (weekly_goal_hours > 0 AND weekly_goal_hours <= 40),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_github_username ON profiles(github_username);
CREATE INDEX IF NOT EXISTS idx_profiles_is_mentor ON profiles(is_mentor);
CREATE INDEX IF NOT EXISTS idx_profiles_last_active ON profiles(last_active_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_public ON profiles(is_public) WHERE is_public = true;

-- Full-text search index for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_search ON profiles USING gin(to_tsvector('english', 
  COALESCE(full_name, '') || ' ' || COALESCE(bio, '') || ' ' || COALESCE(username, '')
));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at 
    BEFORE UPDATE ON user_preferences 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger to update last_active_at
CREATE OR REPLACE FUNCTION update_last_active_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_active_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_last_active_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW EXECUTE FUNCTION update_last_active_at();

-- Add comments for documentation
COMMENT ON TABLE profiles IS 'Extended user profile information extending auth.users';
COMMENT ON TABLE user_preferences IS 'User learning preferences and settings';
COMMENT ON COLUMN profiles.mentorship_areas IS 'Array of areas where user can provide mentorship';
COMMENT ON COLUMN user_preferences.difficulty_preference IS 'Preferred learning difficulty level';
