'use client';

import { useUserProgress, useUserProfile, useUserAchievements } from '../..//application/hooks';
import { UserProgressWithContent, Achievement, UserAchievementWithAchievement } from '../..//application/types/database.types';
import achievementsSectionStyles from '../_styles/dashboard-achievementssection.module.css';
import profileSectionStyles from '../_styles/dashboard-profilesection.module.css';
import progressSectionStyles from '../_styles/dashboard-progresssection.module.css';
import dashboardStyles from '../_styles/dashboard.module.css';
import { InteractiveButton, AnimatedSection, AnimatedTitle } from './animated.feature';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
/**
 * ## Dashboard
 *
 * Merged feature module for the dashboard domain.
 * Contains all components, sub-components, hooks, and types.
 *
 * @packageDocumentation
 * @module dashboard
 */

;



// ============================================================
// dashboard/dashboard.tsx
// ============================================================
interface SystemModule {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

/**
 * Dashboard page — learning overview with modules, stats, and coming-soon features.
 *
 * @remarks
 * Renders the user's learning dashboard including hero stats, module progress cards,
 * and a coming-soon section. Currently uses mocked data; will be connected to
 * user progress services in a future iteration.
 */
export function DashboardPage() {
  const router = useRouter();
  const [user] = useState({ name: '100x Engineer', level: 'Senior Systems Architect' });
  const [modules] = useState<SystemModule[]>([
    {
      id: 'system-fundamentals', title: 'System Fundamentals',
      description: 'Master the core principles of systems thinking and software architecture',
      progress: 75, totalLessons: 12, completedLessons: 9,
      difficulty: 'Intermediate', estimatedTime: '8 hours', status: 'in-progress'
    },
    {
      id: 'scalability-patterns', title: 'Scalability Patterns',
      description: 'Learn patterns and strategies for building scalable distributed systems',
      progress: 30, totalLessons: 15, completedLessons: 4,
      difficulty: 'Advanced', estimatedTime: '12 hours', status: 'in-progress'
    },
    {
      id: 'performance-optimization', title: 'Performance Optimization',
      description: 'Techniques for optimizing system performance and resource utilization',
      progress: 0, totalLessons: 10, completedLessons: 0,
      difficulty: 'Advanced', estimatedTime: '10 hours', status: 'not-started'
    },
    {
      id: 'microservices-architecture', title: 'Microservices Architecture',
      description: 'Design and implement microservices-based systems',
      progress: 60, totalLessons: 14, completedLessons: 8,
      difficulty: 'Intermediate', estimatedTime: '15 hours', status: 'in-progress'
    },
    {
      id: 'database-design', title: 'Database Design & Optimization',
      description: 'Master database design patterns and optimization techniques',
      progress: 90, totalLessons: 8, completedLessons: 7,
      difficulty: 'Intermediate', estimatedTime: '6 hours', status: 'in-progress'
    },
    {
      id: 'security-patterns', title: 'Security Patterns',
      description: 'Implement security best practices and patterns in system design',
      progress: 0, totalLessons: 11, completedLessons: 0,
      difficulty: 'Advanced', estimatedTime: '9 hours', status: 'not-started'
    }
  ]);

  const [stats] = useState({
    totalModulesCompleted: 2, totalLessonsCompleted: 28,
    totalHoursSpent: 45, currentStreak: 7, longestStreak: 14
  });

  const handleModuleClick = (moduleId: string) => {
    router.push(`/modules/${moduleId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return dashboardStyles.beginner;
      case 'Intermediate': return dashboardStyles.intermediate;
      case 'Advanced': return dashboardStyles.advanced;
      default: return dashboardStyles.beginner;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return dashboardStyles.completed;
      case 'in-progress': return dashboardStyles.inProgress;
      case 'not-started': return dashboardStyles.notStarted;
      default: return dashboardStyles.notStarted;
    }
  };

  return (
    <>
      <Head>
        <title>100x Systems Dashboard</title>
        <meta name="description" content="Your learning dashboard for mastering systems thinking" />
      </Head>

      <div className={dashboardStyles.page}>
        {/* Hero Section */}
        <section className={dashboardStyles.heroSection}>
          <div className={dashboardStyles.heroContainer}>
            <div className={dashboardStyles.heroContent}>
              <AnimatedTitle variant="hero" delay={0.1} className={dashboardStyles.heroTitle}>
                Welcome Back, {user.name.split(' ')[0]}
              </AnimatedTitle>
              <p className={dashboardStyles.heroSubtitle}>
                Continue your journey to becoming a {user.level}
              </p>
              <div className={dashboardStyles.heroActions}>
                <InteractiveButton
                  variant="cta"
                  href="/modules/continue"
                  scrambleText={{ hover: "CONTINUE JOURNEY", speed: 2, chars: "upperCase", revealDelay: 0.1 }}
                >
                  Continue Learning
                </InteractiveButton>
                <InteractiveButton
                  variant="secondary"
                  href="/paths"
                  scrambleText={{ hover: "EXPLORE PATHS", speed: 2, chars: "upperCase", revealDelay: 0.1 }}
                >
                  Explore Paths
                </InteractiveButton>
              </div>
            </div>
            <div className={dashboardStyles.heroStats}>
              <div className={dashboardStyles.heroStat}>
                <span className={dashboardStyles.heroStatNumber}>{stats.currentStreak}</span>
                <span className={dashboardStyles.heroStatLabel}>Day Streak</span>
              </div>
              <div className={dashboardStyles.heroStat}>
                <span className={dashboardStyles.heroStatNumber}>{stats.totalHoursSpent}h</span>
                <span className={dashboardStyles.heroStatLabel}>Hours Learned</span>
              </div>
              <div className={dashboardStyles.heroStat}>
                <span className={dashboardStyles.heroStatNumber}>{stats.totalModulesCompleted}</span>
                <span className={dashboardStyles.heroStatLabel}>Modules Done</span>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Modules */}
        <AnimatedSection animationType="fadeInUp" delay={0.4}>
          <section className={dashboardStyles.modulesSection}>
            <div className={dashboardStyles.modulesContainer}>
              <AnimatedTitle variant="section" delay={0.1} className={dashboardStyles.sectionTitle}>
                Your Learning Modules
              </AnimatedTitle>
              <div className={dashboardStyles.modulesGrid}>
                {modules.map((module) => (
                  <div key={module.id} className={dashboardStyles.moduleCard} onClick={() => handleModuleClick(module.id)}>
                    <div className={dashboardStyles.moduleHeader}>
                      <h3 className={dashboardStyles.moduleTitle}>{module.title}</h3>
                      <span className={`${dashboardStyles.difficulty} ${getDifficultyColor(module.difficulty)}`}>
                        {module.difficulty}
                      </span>
                    </div>
                    <p className={dashboardStyles.moduleDescription}>{module.description}</p>
                    <div className={dashboardStyles.moduleProgress}>
                      <div className={dashboardStyles.progressInfo}>
                        <span>{module.completedLessons}/{module.totalLessons} lessons</span>
                        <span>{module.progress}%</span>
                      </div>
                      <div className={dashboardStyles.progressBar}>
                        <div className={dashboardStyles.progressFill} style={{ width: `${module.progress}%` }} />
                      </div>
                    </div>
                    <div className={dashboardStyles.moduleFooter}>
                      <span className={dashboardStyles.estimatedTime}>⏱️ {module.estimatedTime}</span>
                      <span className={`${dashboardStyles.status} ${getStatusColor(module.status)}`}>
                        {module.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Coming Soon Section */}
        <AnimatedSection animationType="fadeInUp" delay={0.6}>
          <section className={dashboardStyles.comingSoonSection}>
            <div className={dashboardStyles.comingSoonContainer}>
              <AnimatedTitle variant="section" delay={0.1} className={dashboardStyles.sectionTitle}>
                Coming Soon
              </AnimatedTitle>
              <div className={dashboardStyles.comingSoonGrid}>
                {[
                  { icon: '🏆', title: 'Achievements System', desc: 'Track your progress and unlock special badges as you master new concepts' },
                  { icon: '📊', title: 'Progress Reports', desc: 'Detailed analytics and insights about your learning journey' },
                  { icon: '🎮', title: 'Practice Challenges', desc: 'Test your skills with real-world system design challenges' },
                  { icon: '👥', title: 'Community Features', desc: 'Connect with other learners and share your insights' },
                ].map((item, i) => (
                  <div key={i} className={dashboardStyles.comingSoonCard}>
                    <div className={dashboardStyles.comingSoonIcon}>{item.icon}</div>
                    <h3 className={dashboardStyles.comingSoonTitle}>{item.title}</h3>
                    <p className={dashboardStyles.comingSoonDescription}>{item.desc}</p>
                    <div className={dashboardStyles.comingSoonBadge}>Coming Soon</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </>
  );
}


// ============================================================
// dashboard/index.ts
// ============================================================
;


// ============================================================
// dashboard/ProgressSection/ProgressSection.tsx
// ============================================================
export const ProgressSection: React.FC = () => {
  const { 
    progress, 
    completedContent, 
    inProgressContent, 
    bookmarkedContent, 
    stats,
    loading, 
    error, 
    markAsCompleted,
    bookmarkContent 
  } = useUserProgress();
  
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed' | 'bookmarked'>('all');

  const filteredProgress = React.useMemo(() => {
    switch (activeTab) {
      case 'in-progress':
        return inProgressContent;
      case 'completed':
        return completedContent;
      case 'bookmarked':
        return bookmarkedContent;
      default:
        return progress;
    }
  }, [activeTab, progress, inProgressContent, completedContent, bookmarkedContent]);

  const handleMarkCompleted = async (contentSlug: string, contentType: 'article' | 'roadmap' | 'section') => {
    await markAsCompleted(contentSlug, contentType);
  };

  const handleBookmark = async (contentSlug: string, contentType: 'article' | 'roadmap' | 'section') => {
    await bookmarkContent(contentSlug, contentType);
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return dashboardStyles.completed;
      case 'in-progress':
        return dashboardStyles.inProgress;
      case 'bookmarked':
        return dashboardStyles.bookmarked;
      default:
        return dashboardStyles.notStarted;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return dashboardStyles.beginner;
      case 'intermediate':
        return dashboardStyles.intermediate;
      case 'advanced':
        return dashboardStyles.advanced;
      default:
        return dashboardStyles.unknown;
    }
  };

  if (loading) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.sectionHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Learning Progress</h2>
        </div>
        <div className={dashboardStyles.loadingState}>
          <div className={dashboardStyles.skeleton}></div>
          <div className={dashboardStyles.skeleton}></div>
          <div className={dashboardStyles.skeleton}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.sectionHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Learning Progress</h2>
        </div>
        <div className={dashboardStyles.errorState}>
          <p className={dashboardStyles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={dashboardStyles.section}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>Learning Progress</h2>
        <div className={dashboardStyles.statsOverview}>
          <div className={dashboardStyles.stat}>
            <span className={dashboardStyles.statNumber}>{stats.totalCompleted}</span>
            <span className={dashboardStyles.statLabel}>Completed</span>
          </div>
          <div className={dashboardStyles.stat}>
            <span className={dashboardStyles.statNumber}>{stats.totalInProgress}</span>
            <span className={dashboardStyles.statLabel}>In Progress</span>
          </div>
          <div className={dashboardStyles.stat}>
            <span className={dashboardStyles.statNumber}>{formatTime(stats.totalTimeSpent)}</span>
            <span className={dashboardStyles.statLabel}>Time Spent</span>
          </div>
        </div>
      </div>

      <div className={dashboardStyles.tabs}>
        {[
          { key: 'all', label: 'All Content', count: progress.length },
          { key: 'in-progress', label: 'In Progress', count: inProgressContent.length },
          { key: 'completed', label: 'Completed', count: completedContent.length },
          { key: 'bookmarked', label: 'Bookmarked', count: bookmarkedContent.length },
        ].map(tab => (
          <button
            key={tab.key}
            className={`${dashboardStyles.tab} ${activeTab === tab.key ? dashboardStyles.active : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
            <span className={dashboardStyles.tabCount}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className={dashboardStyles.progressGrid}>
        {filteredProgress.length === 0 ? (
          <div className={dashboardStyles.emptyState}>
            <p className={dashboardStyles.emptyMessage}>
              {activeTab === 'all' 
                ? 'No content found. Start learning to see your progress here!'
                : `No ${activeTab.replace('-', ' ')} content found.`
              }
            </p>
          </div>
        ) : (
          filteredProgress.map((item: UserProgressWithContent) => (
            <div key={`${item.content_type}-${item.content_slug}`} className={dashboardStyles.progressCard}>
              <div className={dashboardStyles.cardHeader}>
                <h3 className={dashboardStyles.cardTitle}>
                  {item.content_title || item.content_slug}
                </h3>
                <div className={dashboardStyles.cardMeta}>
                  <span className={`${dashboardStyles.contentType} ${dashboardStyles[item.content_type]}`}>
                    {item.content_type}
                  </span>
                  {item.content_difficulty && (
                    <span className={`${dashboardStyles.difficulty} ${getDifficultyColor(item.content_difficulty)}`}>
                      {item.content_difficulty}
                    </span>
                  )}
                </div>
              </div>

              {item.content_description && (
                <p className={dashboardStyles.cardDescription}>
                  {item.content_description}
                </p>
              )}

              <div className={dashboardStyles.progressInfo}>
                <div className={dashboardStyles.progressBar}>
                  <div
                    className={dashboardStyles.progressFill}
                    style={{ width: `${item.progress_percentage}%` }}
                  />
                </div>
                <div className={dashboardStyles.progressText}>
                  <span>{item.progress_percentage}% complete</span>
                  <span>{formatTime(item.time_spent_minutes || 0)}</span>
                </div>
              </div>

              <div className={dashboardStyles.cardFooter}>
                <div className={dashboardStyles.statusInfo}>
                  <span className={`${dashboardStyles.status} ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                  {item.last_accessed_at && (
                    <span className={dashboardStyles.lastAccessed}>
                      Last accessed {new Date(item.last_accessed_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className={dashboardStyles.cardActions}>
                  {item.status !== 'completed' && (
                    <button
                      className={dashboardStyles.actionButton}
                      onClick={() => handleMarkCompleted(item.content_slug, item.content_type)}
                    >
                      Mark Complete
                    </button>
                  )}
                  
                  <button
                    className={`${dashboardStyles.actionButton} ${item.status === 'bookmarked' ? dashboardStyles.bookmarked : ''}`}
                    onClick={() => handleBookmark(item.content_slug, item.content_type)}
                  >
                    {item.status === 'bookmarked' ? 'Bookmarked' : 'Bookmark'}
                  </button>

                  <a
                    href={`/${item.content_type}s/${item.content_slug}`}
                    className={dashboardStyles.viewButton}
                  >
                    View
                  </a>
                </div>
              </div>

              {item.notes && (
                <div className={dashboardStyles.notesSection}>
                  <h4 className={dashboardStyles.notesTitle}>Notes</h4>
                  <p className={dashboardStyles.notesText}>{item.notes}</p>
                </div>
              )}

              {item.rating && (
                <div className={dashboardStyles.ratingSection}>
                  <h4 className={dashboardStyles.ratingTitle}>Your Rating</h4>
                  <div className={dashboardStyles.ratingStars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`${dashboardStyles.star} ${star <= (item.rating || 0) ? dashboardStyles.filled : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.difficulty_feedback && (
                <div className={dashboardStyles.feedbackSection}>
                  <h4 className={dashboardStyles.feedbackTitle}>Difficulty Feedback</h4>
                  <span className={`${dashboardStyles.feedback} ${getDifficultyColor(item.difficulty_feedback)}`}>
                    {item.difficulty_feedback.replace('-', ' ')}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};


// ============================================================
// dashboard/ProfileSection/ProfileSection.tsx
// ============================================================
export const ProfileSection: React.FC = () => {
  const { profile, preferences, loading, error, updateProfile, updatePreferences, uploadAvatar } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    bio: '',
    github_username: '',
    linkedin_url: '',
    website_url: '',
    location: '',
    mentorship_areas: [] as string[],
  });

  React.useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        github_username: profile.github_username || '',
        linkedin_url: profile.linkedin_url || '',
        website_url: profile.website_url || '',
        location: profile.location || '',
        mentorship_areas: profile.mentorship_areas || [],
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    const success = await updateProfile(editForm);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  const handleMentorshipAreasChange = (area: string) => {
    setEditForm(prev => ({
      ...prev,
      mentorship_areas: prev.mentorship_areas.includes(area)
        ? prev.mentorship_areas.filter(a => a !== area)
        : [...prev.mentorship_areas, area]
    }));
  };

  if (loading) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.sectionHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Profile Information</h2>
        </div>
        <div className={dashboardStyles.loadingState}>
          <div className={dashboardStyles.skeleton}></div>
          <div className={dashboardStyles.skeleton}></div>
          <div className={dashboardStyles.skeleton}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.sectionHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Profile Information</h2>
        </div>
        <div className={dashboardStyles.errorState}>
          <p className={dashboardStyles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.sectionHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Profile Information</h2>
        </div>
        <div className={dashboardStyles.emptyState}>
          <p className={dashboardStyles.emptyMessage}>No profile information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={dashboardStyles.section}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>Profile Information</h2>
        <button
          className={dashboardStyles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className={dashboardStyles.profileContent}>
        <div className={dashboardStyles.avatarSection}>
          <div className={dashboardStyles.avatarContainer}>
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile Avatar"
                className={dashboardStyles.avatar}
              />
            ) : (
              <div className={dashboardStyles.avatarPlaceholder}>
                {profile.full_name?.charAt(0) || profile.username?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          {isEditing && (
            <div className={dashboardStyles.avatarUpload}>
              <label htmlFor="avatar-upload" className={dashboardStyles.uploadButton}>
                Upload Avatar
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className={dashboardStyles.fileInput}
              />
            </div>
          )}
        </div>

        <div className={dashboardStyles.profileDetails}>
          {isEditing ? (
            <div className={dashboardStyles.editForm}>
              <div className={dashboardStyles.formGroup}>
                <label className={dashboardStyles.formLabel}>Full Name</label>
                <input
                  type="text"
                  className={dashboardStyles.formInput}
                  value={editForm.full_name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                />
              </div>

              <div className={dashboardStyles.formGroup}>
                <label className={dashboardStyles.formLabel}>Bio</label>
                <textarea
                  className={dashboardStyles.formTextarea}
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  maxLength={500}
                  rows={3}
                />
              </div>

              <div className={dashboardStyles.formGroup}>
                <label className={dashboardStyles.formLabel}>GitHub Username</label>
                <input
                  type="text"
                  className={dashboardStyles.formInput}
                  value={editForm.github_username}
                  onChange={(e) => setEditForm(prev => ({ ...prev, github_username: e.target.value }))}
                />
              </div>

              <div className={dashboardStyles.formGroup}>
                <label className={dashboardStyles.formLabel}>LinkedIn URL</label>
                <input
                  type="url"
                  className={dashboardStyles.formInput}
                  value={editForm.linkedin_url}
                  onChange={(e) => setEditForm(prev => ({ ...prev, linkedin_url: e.target.value }))}
                />
              </div>

              <div className={dashboardStyles.formGroup}>
                <label className={dashboardStyles.formLabel}>Website URL</label>
                <input
                  type="url"
                  className={dashboardStyles.formInput}
                  value={editForm.website_url}
                  onChange={(e) => setEditForm(prev => ({ ...prev, website_url: e.target.value }))}
                />
              </div>

              <div className={dashboardStyles.formGroup}>
                <label className={dashboardStyles.formLabel}>Location</label>
                <input
                  type="text"
                  className={dashboardStyles.formInput}
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className={dashboardStyles.formGroup}>
                <label className={dashboardStyles.formLabel}>Mentorship Areas</label>
                <div className={dashboardStyles.mentorshipAreas}>
                  {['Frontend', 'Backend', 'Full-Stack', 'DevOps', 'AI/ML', 'Mobile', 'System Design'].map(area => (
                    <label key={area} className={dashboardStyles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={editForm.mentorship_areas.includes(area)}
                        onChange={() => handleMentorshipAreasChange(area)}
                        className={dashboardStyles.checkbox}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              <div className={dashboardStyles.formActions}>
                <button
                  className={dashboardStyles.saveButton}
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
                <button
                  className={dashboardStyles.cancelButton}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={dashboardStyles.profileInfo}>
              <div className={dashboardStyles.infoGroup}>
                <h3 className={dashboardStyles.infoLabel}>Name</h3>
                <p className={dashboardStyles.infoValue}>{profile.full_name || 'Not set'}</p>
              </div>

              <div className={dashboardStyles.infoGroup}>
                <h3 className={dashboardStyles.infoLabel}>Username</h3>
                <p className={dashboardStyles.infoValue}>@{profile.username || 'Not set'}</p>
              </div>

              <div className={dashboardStyles.infoGroup}>
                <h3 className={dashboardStyles.infoLabel}>Bio</h3>
                <p className={dashboardStyles.infoValue}>{profile.bio || 'No bio provided'}</p>
              </div>

              <div className={dashboardStyles.infoGroup}>
                <h3 className={dashboardStyles.infoLabel}>Location</h3>
                <p className={dashboardStyles.infoValue}>{profile.location || 'Not set'}</p>
              </div>

              <div className={dashboardStyles.infoGroup}>
                <h3 className={dashboardStyles.infoLabel}>Social Links</h3>
                <div className={dashboardStyles.socialLinks}>
                  {profile.github_username && (
                    <a
                      href={`https://github.com/${profile.github_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={dashboardStyles.socialLink}
                    >
                      GitHub: @{profile.github_username}
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={dashboardStyles.socialLink}
                    >
                      LinkedIn
                    </a>
                  )}
                  {profile.website_url && (
                    <a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={dashboardStyles.socialLink}
                    >
                      Website
                    </a>
                  )}
                  {!profile.github_username && !profile.linkedin_url && !profile.website_url && (
                    <p className={dashboardStyles.infoValue}>No social links added</p>
                  )}
                </div>
              </div>

              {profile.is_mentor && (
                <div className={dashboardStyles.infoGroup}>
                  <h3 className={dashboardStyles.infoLabel}>Mentorship Areas</h3>
                  <div className={dashboardStyles.mentorshipTags}>
                    {profile.mentorship_areas.length > 0 ? (
                      profile.mentorship_areas.map(area => (
                        <span key={area} className={dashboardStyles.mentorshipTag}>
                          {area}
                        </span>
                      ))
                    ) : (
                      <p className={dashboardStyles.infoValue}>No mentorship areas specified</p>
                    )}
                  </div>
                </div>
              )}

              <div className={dashboardStyles.infoGroup}>
                <h3 className={dashboardStyles.infoLabel}>Account Status</h3>
                <div className={dashboardStyles.statusBadges}>
                  <span className={`${dashboardStyles.statusBadge} ${profile.is_public ? dashboardStyles.public : dashboardStyles.private}`}>
                    {profile.is_public ? 'Public Profile' : 'Private Profile'}
                  </span>
                  {profile.is_mentor && (
                    <span className={`${dashboardStyles.statusBadge} ${dashboardStyles.mentor}`}>
                      Mentor
                    </span>
                  )}
                </div>
              </div>

              <div className={dashboardStyles.infoGroup}>
                <h3 className={dashboardStyles.infoLabel}>Member Since</h3>
                <p className={dashboardStyles.infoValue}>
                  {new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// ============================================================
// dashboard/AchievementsSection/AchievementsSection.tsx
// ============================================================
export const AchievementsSection: React.FC = () => {
  const { 
    achievements, 
    lockedAchievements, 
    streak, 
    totalPoints, 
    stats, 
    loading, 
    error,
    updateStreak,
    getAchievementsByCategory,
    getAchievementsByDifficulty
  } = useUserAchievements();
  
  const [activeTab, setActiveTab] = useState<'unlocked' | 'locked' | 'categories'>('unlocked');
  const [selectedCategory, setSelectedCategory] = useState<Achievement['category'] | 'all'>('all');

  const categories: Achievement['category'][] = ['learning', 'consistency', 'mastery', 'community', 'contribution'];
  const difficulties: Achievement['difficulty'][] = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

  const filteredAchievements = React.useMemo(() => {
    if (activeTab === 'unlocked') {
      return achievements;
    } else if (activeTab === 'locked') {
      return lockedAchievements.map(achievement => ({
        id: achievement.id,
        achievement_id: achievement.id,
        user_id: '',
        earned_at: '',
        progress_data: {},
        share_publicly: true,
        notification_sent: false,
        achievement,
      }));
    }
    return [];
  }, [activeTab, achievements, lockedAchievements]);

  const categoryAchievements = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return achievements;
    }
    return getAchievementsByCategory(selectedCategory);
  }, [selectedCategory, achievements, getAchievementsByCategory]);

  const getDifficultyColor = (difficulty: Achievement['difficulty']) => {
    switch (difficulty) {
      case 'bronze':
        return dashboardStyles.bronze;
      case 'silver':
        return dashboardStyles.silver;
      case 'gold':
        return dashboardStyles.gold;
      case 'platinum':
        return dashboardStyles.platinum;
      case 'diamond':
        return dashboardStyles.diamond;
      default:
        return dashboardStyles.unknown;
    }
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'learning':
        return '📚';
      case 'consistency':
        return '🔥';
      case 'mastery':
        return '🏆';
      case 'community':
        return '👥';
      case 'contribution':
        return '💡';
      default:
        return '🎯';
    }
  };

  const getStreakEmoji = (streakDays: number) => {
    if (streakDays >= 100) return '🔥🔥🔥';
    if (streakDays >= 50) return '🔥🔥';
    if (streakDays >= 10) return '🔥';
    return '✨';
  };

  if (loading) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.sectionHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Achievements & Progress</h2>
        </div>
        <div className={dashboardStyles.loadingState}>
          <div className={dashboardStyles.skeleton}></div>
          <div className={dashboardStyles.skeleton}></div>
          <div className={dashboardStyles.skeleton}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={dashboardStyles.section}>
        <div className={dashboardStyles.sectionHeader}>
          <h2 className={dashboardStyles.sectionTitle}>Achievements & Progress</h2>
        </div>
        <div className={dashboardStyles.errorState}>
          <p className={dashboardStyles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={dashboardStyles.section}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>Achievements & Progress</h2>
        <div className={dashboardStyles.pointsDisplay}>
          <span className={dashboardStyles.pointsNumber}>{totalPoints}</span>
          <span className={dashboardStyles.pointsLabel}>Points</span>
        </div>
      </div>

      {/* Streak Information */}
      <div className={dashboardStyles.streakCard}>
        <div className={dashboardStyles.streakHeader}>
          <h3 className={dashboardStyles.streakTitle}>Learning Streak</h3>
          <button 
            className={dashboardStyles.updateStreakButton}
            onClick={updateStreak}
          >
            Update Today
          </button>
        </div>
        <div className={dashboardStyles.streakContent}>
          <div className={dashboardStyles.streakMain}>
            <span className={dashboardStyles.streakEmoji}>
              {getStreakEmoji(stats.currentStreak)}
            </span>
            <div className={dashboardStyles.streakNumbers}>
              <div className={dashboardStyles.currentStreak}>
                <span className={dashboardStyles.streakNumber}>{stats.currentStreak}</span>
                <span className={dashboardStyles.streakLabel}>Current Streak</span>
              </div>
              <div className={dashboardStyles.streakDivider}></div>
              <div className={dashboardStyles.longestStreak}>
                <span className={dashboardStyles.streakNumber}>{stats.longestStreak}</span>
                <span className={dashboardStyles.streakLabel}>Longest Streak</span>
              </div>
            </div>
          </div>
          <div className={dashboardStyles.streakDetails}>
            <div className={dashboardStyles.streakDetail}>
              <span className={dashboardStyles.detailNumber}>{stats.totalLearningDays}</span>
              <span className={dashboardStyles.detailLabel}>Total Learning Days</span>
            </div>
            {streak?.last_activity_date && (
              <div className={dashboardStyles.streakDetail}>
                <span className={dashboardStyles.detailDate}>
                  Last: {new Date(streak.last_activity_date).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Tabs */}
      <div className={dashboardStyles.tabs}>
        <button
          className={`${dashboardStyles.tab} ${activeTab === 'unlocked' ? dashboardStyles.active : ''}`}
          onClick={() => setActiveTab('unlocked')}
        >
          Unlocked ({stats.totalUnlocked})
        </button>
        <button
          className={`${dashboardStyles.tab} ${activeTab === 'locked' ? dashboardStyles.active : ''}`}
          onClick={() => setActiveTab('locked')}
        >
          Locked ({stats.totalLocked})
        </button>
        <button
          className={`${dashboardStyles.tab} ${activeTab === 'categories' ? dashboardStyles.active : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          By Category
        </button>
      </div>

      {/* Category Filter (shown when categories tab is active) */}
      {activeTab === 'categories' && (
        <div className={dashboardStyles.categoryFilter}>
          <button
            className={`${dashboardStyles.categoryButton} ${selectedCategory === 'all' ? dashboardStyles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`${dashboardStyles.categoryButton} ${selectedCategory === category ? dashboardStyles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className={dashboardStyles.categoryIcon}>{getCategoryIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Achievement Grid */}
      <div className={dashboardStyles.achievementsGrid}>
        {(activeTab === 'categories' ? categoryAchievements : filteredAchievements).length === 0 ? (
          <div className={dashboardStyles.emptyState}>
            <p className={dashboardStyles.emptyMessage}>
              {activeTab === 'locked' 
                ? 'No locked achievements. You have unlocked everything! 🎉'
                : activeTab === 'categories' && selectedCategory !== 'all'
                ? `No achievements in ${selectedCategory} category yet.`
                : 'No achievements unlocked yet. Start learning to earn your first achievement!'
              }
            </p>
          </div>
        ) : (
          (activeTab === 'categories' ? categoryAchievements : filteredAchievements).map((item: UserAchievementWithAchievement | Achievement) => {
            const achievement = 'achievement' in item ? item.achievement : item;
            const earnedAt = 'earned_at' in item ? item.earned_at : null;
            const sharePublicly = 'share_publicly' in item ? item.share_publicly : true;
            
            return (
              <div key={achievement.id} className={dashboardStyles.achievementCard}>
                <div className={dashboardStyles.achievementHeader}>
                  <div className={dashboardStyles.achievementIcon}>
                    {achievement.icon_url ? (
                      <img src={achievement.icon_url} alt={achievement.title} />
                    ) : (
                      <span className={dashboardStyles.defaultIcon}>
                        {getCategoryIcon(achievement.category)}
                      </span>
                    )}
                  </div>
                  <div className={dashboardStyles.achievementMeta}>
                    <span className={`${dashboardStyles.difficulty} ${getDifficultyColor(achievement.difficulty)}`}>
                      {achievement.difficulty}
                    </span>
                    <span className={dashboardStyles.points}>
                      {achievement.points} pts
                    </span>
                  </div>
                </div>

                <div className={dashboardStyles.achievementContent}>
                  <h3 className={dashboardStyles.achievementTitle}>
                    {achievement.title}
                  </h3>
                  {achievement.description && (
                    <p className={dashboardStyles.achievementDescription}>
                      {achievement.description}
                    </p>
                  )}
                </div>

                {earnedAt && (
                  <div className={dashboardStyles.achievementFooter}>
                    <div className={dashboardStyles.earnedInfo}>
                      <span className={dashboardStyles.earnedDate}>
                        Earned {new Date(earnedAt).toLocaleDateString()}
                      </span>
                      {sharePublicly && (
                        <button className={dashboardStyles.shareButton}>
                          Share
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'locked' && (
                  <div className={dashboardStyles.lockedOverlay}>
                    <div className={dashboardStyles.lockedContent}>
                      <span className={dashboardStyles.lockIcon}>🔒</span>
                      <p className={dashboardStyles.lockedText}>Complete the requirements to unlock</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Achievement Statistics */}
      <div className={dashboardStyles.statsSection}>
        <h3 className={dashboardStyles.statsTitle}>Achievement Statistics</h3>
        <div className={dashboardStyles.statsGrid}>
          <div className={dashboardStyles.statCard}>
            <span className={dashboardStyles.statNumber}>{stats.totalUnlocked}</span>
            <span className={dashboardStyles.statLabel}>Unlocked</span>
          </div>
          <div className={dashboardStyles.statCard}>
            <span className={dashboardStyles.statNumber}>{stats.totalLocked}</span>
            <span className={dashboardStyles.statLabel}>Locked</span>
          </div>
          <div className={dashboardStyles.statCard}>
            <span className={dashboardStyles.statNumber}>
              {stats.totalUnlocked > 0 ? Math.round((stats.totalUnlocked / (stats.totalUnlocked + stats.totalLocked)) * 100) : 0}%
            </span>
            <span className={dashboardStyles.statLabel}>Completion Rate</span>
          </div>
          <div className={dashboardStyles.statCard}>
            <span className={dashboardStyles.statNumber}>{totalPoints}</span>
            <span className={dashboardStyles.statLabel}>Total Points</span>
          </div>
        </div>
      </div>
    </div>
  );
};
