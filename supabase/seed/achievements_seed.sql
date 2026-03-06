-- Seed Data: Achievements
-- Description: Initial achievement definitions for 100xSystems
-- Version: 1.0.0

INSERT INTO achievements (slug, title, description, category, difficulty, icon_url, badge_color, requirements, points, is_hidden, sort_order) VALUES
-- Learning Achievements
('first-article', 'First Steps', 'Complete your first article on 100xSystems', 'learning', 'bronze', '/achievements/first-article.svg', '#CD7F32', '{"type": "complete_articles", "count": 1}', 10, false, 1),
('article-collector-5', 'Article Collector', 'Complete 5 articles', 'learning', 'bronze', '/achievements/article-collector.svg', '#8B4513', '{"type": "complete_articles", "count": 5}', 25, false, 2),
('article-collector-10', 'Dedicated Learner', 'Complete 10 articles', 'learning', 'silver', '/achievements/dedicated-learner.svg', '#6B7280', '{"type": "complete_articles", "count": 10}', 50, false, 3),
('article-collector-25', 'Knowledge Seeker', 'Complete 25 articles', 'learning', 'gold', '/achievements/knowledge-seeker.svg', '#FFD700', '{"type": "complete_articles", "count": 25}', 100, false, 4),
('article-collector-50', 'Master Learner', 'Complete 50 articles', 'learning', 'platinum', '/achievements/master-learner.svg', '#E5E4E2', '{"type": "complete_articles", "count": 50}', 200, false, 5),
('article-collector-100', '100x Legend', 'Complete 100 articles', 'learning', 'diamond', '/achievements/100x-legend.svg', '#B9F2FF', '{"type": "complete_articles", "count": 100}', 500, false, 6),

-- Roadmap Achievements
('first-roadmap', 'Path Finder', 'Complete your first learning roadmap', 'learning', 'bronze', '/achievements/first-roadmap.svg', '#CD7F32', '{"type": "complete_roadmaps", "count": 1}', 30, false, 7),
('roadmap-explorer-3', 'Path Explorer', 'Complete 3 different roadmaps', 'learning', 'silver', '/achievements/roadmap-explorer.svg', '#6B7280', '{"type": "complete_roadmaps", "count": 3}', 75, false, 8),
('roadmap-master-5', 'Path Master', 'Complete 5 roadmaps', 'learning', 'gold', '/achievements/roadmap-master.svg', '#FFD700', '{"type": "complete_roadmaps", "count": 5}', 150, false, 9),

-- Consistency Achievements
('streak-3', 'Three Day Streak', 'Maintain a 3-day learning streak', 'consistency', 'bronze', '/achievements/streak-3.svg', '#CD7F32', '{"type": "learning_streak", "days": 3}', 15, false, 10),
('streak-7', 'Week Warrior', 'Maintain a 7-day learning streak', 'consistency', 'silver', '/achievements/week-warrior.svg', '#6B7280', '{"type": "learning_streak", "days": 7}', 35, false, 11),
('streak-14', 'Fortnight Champion', 'Maintain a 14-day learning streak', 'consistency', 'gold', '/achievements/fortnight-champion.svg', '#FFD700', '{"type": "learning_streak", "days": 14}', 70, false, 12),
('streak-30', 'Monthly Master', 'Maintain a 30-day learning streak', 'consistency', 'platinum', '/achievements/monthly-master.svg', '#E5E4E2', '{"type": "learning_streak", "days": 30}', 150, false, 13),
('streak-90', 'Quarterly Legend', 'Maintain a 90-day learning streak', 'consistency', 'diamond', '/achievements/quarterly-legend.svg', '#B9F2FF', '{"type": "learning_streak", "days": 90}', 300, false, 14),

-- Time-based Achievements
('time-10h', 'Time Investment', 'Spend 10 hours learning', 'consistency', 'bronze', '/achievements/time-10h.svg', '#CD7F32', '{"type": "total_time", "hours": 10}', 20, false, 15),
('time-50h', 'Dedicated Student', 'Spend 50 hours learning', 'consistency', 'silver', '/achievements/time-50h.svg', '#6B7280', '{"type": "total_time", "hours": 50}', 60, false, 16),
('time-100h', 'Time Master', 'Spend 100 hours learning', 'consistency', 'gold', '/achievements/time-100h.svg', '#FFD700', '{"type": "total_time", "hours": 100}', 120, false, 17),
('time-500h', 'Learning Expert', 'Spend 500 hours learning', 'consistency', 'platinum', '/achievements/learning-expert.svg', '#E5E4E2', '{"type": "total_time", "hours": 500}', 300, false, 18),

-- Mastery Achievements
('beginner-mastery', 'Foundation Complete', 'Complete all beginner-level content', 'mastery', 'silver', '/achievements/beginner-mastery.svg', '#6B7280', '{"type": "mastery", "level": "beginner"}', 100, false, 19),
('intermediate-mastery', 'Intermediate Expert', 'Complete all intermediate-level content', 'mastery', 'gold', '/achievements/intermediate-expert.svg', '#FFD700', '{"type": "mastery", "level": "intermediate"}', 200, false, 20),
('advanced-mastery', 'Advanced Master', 'Complete all advanced-level content', 'mastery', 'platinum', '/achievements/advanced-master.svg', '#E5E4E2', '{"type": "mastery", "level": "advanced"}', 400, false, 21),

-- Community Achievements
('first-note', 'Note Taker', 'Create your first learning note', 'community', 'bronze', '/achievements/first-note.svg', '#CD7F32', '{"type": "create_notes", "count": 1}', 10, false, 22),
('note-sharer-5', 'Knowledge Sharer', 'Share 5 public notes', 'community', 'silver', '/achievements/note-sharer.svg', '#6B7280', '{"type": "share_notes", "count": 5}', 25, false, 23),
('discussion-participant', 'Active Discussant', 'Participate in 10 article discussions', 'community', 'bronze', '/achievements/discussion-participant.svg', '#CD7F32', '{"type": "discussions", "count": 10}', 30, false, 24),
('discussion-contributor', 'Discussion Contributor', 'Make 50 helpful contributions in discussions', 'community', 'silver', '/achievements/discussion-contributor.svg', '#6B7280', '{"type": "helpful_contributions", "count": 50}', 75, false, 25),

-- Group Achievements
('group-creator', 'Community Builder', 'Create your first study group', 'community', 'bronze', '/achievements/group-creator.svg', '#CD7F32', '{"type": "create_groups", "count": 1}', 25, false, 26),
('group-leader', 'Group Leader', 'Lead a study group with 10+ members', 'community', 'silver', '/achievements/group-leader.svg', '#6B7280', '{"type": "lead_groups", "members": 10}', 50, false, 27),

-- Hidden Achievements
('early-bird', 'Early Bird', 'Complete 5 learning sessions before 8 AM', 'consistency', 'silver', '/achievements/early-bird.svg', '#6B7280', '{"type": "early_sessions", "count": 5, "before_hour": 8}', 40, true, 28),
('night-owl', 'Night Owl', 'Complete 5 learning sessions after 10 PM', 'consistency', 'silver', '/achievements/night-owl.svg', '#6B7280', '{"type": "late_sessions", "count": 5, "after_hour": 22}', 40, true, 29),
('speed-learner', 'Speed Learner', 'Complete an article in under 15 minutes', 'mastery', 'bronze', '/achievements/speed-learner.svg', '#CD7F32', '{"type": "fast_completion", "minutes": 15}', 20, true, 30),
('deep-diver', 'Deep Diver', 'Spend over 2 hours on a single article', 'mastery', 'bronze', '/achievements/deep-diver.svg', '#CD7F32', '{"type": "deep_session", "minutes": 120}', 25, true, 31),

-- Milestone Achievements
('level-2', 'Level 2 Achieved', 'Reach level 2 in your learning journey', 'mastery', 'bronze', '/achievements/level-2.svg', '#CD7F32', '{"type": "level", "target": 2}', 50, false, 32),
('level-5', 'Level 5 Achieved', 'Reach level 5 in your learning journey', 'mastery', 'silver', '/achievements/level-5.svg', '#6B7280', '{"type": "level", "target": 5}', 125, false, 33),
('level-8', 'Level 8 Achieved', 'Reach level 8 in your learning journey', 'mastery', 'gold', '/achievements/level-8.svg', '#FFD700', '{"type": "level", "target": 8}', 250, false, 34),
('level-9', '100x Engineer', 'Reach the highest level - Level 9', 'mastery', 'diamond', '/achievements/100x-engineer.svg', '#B9F2FF', '{"type": "level", "target": 9}', 500, false, 35);

-- Add comments for documentation
COMMENT ON TABLE achievements IS 'Achievement definitions with various categories and difficulty levels';
COMMENT ON COLUMN achievements.requirements IS 'JSON object defining achievement unlock conditions';
COMMENT ON COLUMN achievements.is_hidden IS 'Whether achievement is visible before being unlocked';
