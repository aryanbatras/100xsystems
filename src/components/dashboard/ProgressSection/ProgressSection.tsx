import React, { useState } from 'react';
import { useUserProgress } from '../../../hooks/useUserProgress';
import { UserProgressWithContent } from '../../../services/types/database';
import styles from '../../styles/components/dashboard/ProgressSection.module.css';;

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
        return styles.completed;
      case 'in-progress':
        return styles.inProgress;
      case 'bookmarked':
        return styles.bookmarked;
      default:
        return styles.notStarted;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return styles.beginner;
      case 'intermediate':
        return styles.intermediate;
      case 'advanced':
        return styles.advanced;
      default:
        return styles.unknown;
    }
  };

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Learning Progress</h2>
        </div>
        <div className={styles.loadingState}>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Learning Progress</h2>
        </div>
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Learning Progress</h2>
        <div className={styles.statsOverview}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.totalCompleted}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{stats.totalInProgress}</span>
            <span className={styles.statLabel}>In Progress</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{formatTime(stats.totalTimeSpent)}</span>
            <span className={styles.statLabel}>Time Spent</span>
          </div>
        </div>
      </div>

      <div className={styles.tabs}>
        {[
          { key: 'all', label: 'All Content', count: progress.length },
          { key: 'in-progress', label: 'In Progress', count: inProgressContent.length },
          { key: 'completed', label: 'Completed', count: completedContent.length },
          { key: 'bookmarked', label: 'Bookmarked', count: bookmarkedContent.length },
        ].map(tab => (
          <button
            key={tab.key}
            className={`${styles.tab} ${activeTab === tab.key ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
            <span className={styles.tabCount}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.progressGrid}>
        {filteredProgress.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
              {activeTab === 'all' 
                ? 'No content found. Start learning to see your progress here!'
                : `No ${activeTab.replace('-', ' ')} content found.`
              }
            </p>
          </div>
        ) : (
          filteredProgress.map((item: UserProgressWithContent) => (
            <div key={`${item.content_type}-${item.content_slug}`} className={styles.progressCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  {item.content_title || item.content_slug}
                </h3>
                <div className={styles.cardMeta}>
                  <span className={`${styles.contentType} ${styles[item.content_type]}`}>
                    {item.content_type}
                  </span>
                  {item.content_difficulty && (
                    <span className={`${styles.difficulty} ${getDifficultyColor(item.content_difficulty)}`}>
                      {item.content_difficulty}
                    </span>
                  )}
                </div>
              </div>

              {item.content_description && (
                <p className={styles.cardDescription}>
                  {item.content_description}
                </p>
              )}

              <div className={styles.progressInfo}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${item.progress_percentage}%` }}
                  />
                </div>
                <div className={styles.progressText}>
                  <span>{item.progress_percentage}% complete</span>
                  <span>{formatTime(item.time_spent_minutes || 0)}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.statusInfo}>
                  <span className={`${styles.status} ${getStatusColor(item.status)}`}>
                    {item.status.replace('-', ' ')}
                  </span>
                  {item.last_accessed_at && (
                    <span className={styles.lastAccessed}>
                      Last accessed {new Date(item.last_accessed_at).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className={styles.cardActions}>
                  {item.status !== 'completed' && (
                    <button
                      className={styles.actionButton}
                      onClick={() => handleMarkCompleted(item.content_slug, item.content_type)}
                    >
                      Mark Complete
                    </button>
                  )}
                  
                  <button
                    className={`${styles.actionButton} ${item.status === 'bookmarked' ? styles.bookmarked : ''}`}
                    onClick={() => handleBookmark(item.content_slug, item.content_type)}
                  >
                    {item.status === 'bookmarked' ? 'Bookmarked' : 'Bookmark'}
                  </button>

                  <a
                    href={`/${item.content_type}s/${item.content_slug}`}
                    className={styles.viewButton}
                  >
                    View
                  </a>
                </div>
              </div>

              {item.notes && (
                <div className={styles.notesSection}>
                  <h4 className={styles.notesTitle}>Notes</h4>
                  <p className={styles.notesText}>{item.notes}</p>
                </div>
              )}

              {item.rating && (
                <div className={styles.ratingSection}>
                  <h4 className={styles.ratingTitle}>Your Rating</h4>
                  <div className={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`${styles.star} ${star <= (item.rating || 0) ? styles.filled : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.difficulty_feedback && (
                <div className={styles.feedbackSection}>
                  <h4 className={styles.feedbackTitle}>Difficulty Feedback</h4>
                  <span className={`${styles.feedback} ${getDifficultyColor(item.difficulty_feedback)}`}>
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
