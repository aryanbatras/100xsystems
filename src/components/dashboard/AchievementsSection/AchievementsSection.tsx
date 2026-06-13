import React, { useState } from 'react';
import { useUserAchievements } from '../../../application/hooks';
import { Achievement, UserAchievementWithAchievement } from '../../../application/types/database.types';
import styles from '../../../styles/components/dashboard/AchievementsSection.module.css';

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
        return styles.bronze;
      case 'silver':
        return styles.silver;
      case 'gold':
        return styles.gold;
      case 'platinum':
        return styles.platinum;
      case 'diamond':
        return styles.diamond;
      default:
        return styles.unknown;
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
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Achievements & Progress</h2>
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
          <h2 className={styles.sectionTitle}>Achievements & Progress</h2>
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
        <h2 className={styles.sectionTitle}>Achievements & Progress</h2>
        <div className={styles.pointsDisplay}>
          <span className={styles.pointsNumber}>{totalPoints}</span>
          <span className={styles.pointsLabel}>Points</span>
        </div>
      </div>

      {/* Streak Information */}
      <div className={styles.streakCard}>
        <div className={styles.streakHeader}>
          <h3 className={styles.streakTitle}>Learning Streak</h3>
          <button 
            className={styles.updateStreakButton}
            onClick={updateStreak}
          >
            Update Today
          </button>
        </div>
        <div className={styles.streakContent}>
          <div className={styles.streakMain}>
            <span className={styles.streakEmoji}>
              {getStreakEmoji(stats.currentStreak)}
            </span>
            <div className={styles.streakNumbers}>
              <div className={styles.currentStreak}>
                <span className={styles.streakNumber}>{stats.currentStreak}</span>
                <span className={styles.streakLabel}>Current Streak</span>
              </div>
              <div className={styles.streakDivider}></div>
              <div className={styles.longestStreak}>
                <span className={styles.streakNumber}>{stats.longestStreak}</span>
                <span className={styles.streakLabel}>Longest Streak</span>
              </div>
            </div>
          </div>
          <div className={styles.streakDetails}>
            <div className={styles.streakDetail}>
              <span className={styles.detailNumber}>{stats.totalLearningDays}</span>
              <span className={styles.detailLabel}>Total Learning Days</span>
            </div>
            {streak?.last_activity_date && (
              <div className={styles.streakDetail}>
                <span className={styles.detailDate}>
                  Last: {new Date(streak.last_activity_date).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'unlocked' ? styles.active : ''}`}
          onClick={() => setActiveTab('unlocked')}
        >
          Unlocked ({stats.totalUnlocked})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'locked' ? styles.active : ''}`}
          onClick={() => setActiveTab('locked')}
        >
          Locked ({stats.totalLocked})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'categories' ? styles.active : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          By Category
        </button>
      </div>

      {/* Category Filter (shown when categories tab is active) */}
      {activeTab === 'categories' && (
        <div className={styles.categoryFilter}>
          <button
            className={`${styles.categoryButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className={styles.categoryIcon}>{getCategoryIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Achievement Grid */}
      <div className={styles.achievementsGrid}>
        {(activeTab === 'categories' ? categoryAchievements : filteredAchievements).length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyMessage}>
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
              <div key={achievement.id} className={styles.achievementCard}>
                <div className={styles.achievementHeader}>
                  <div className={styles.achievementIcon}>
                    {achievement.icon_url ? (
                      <img src={achievement.icon_url} alt={achievement.title} />
                    ) : (
                      <span className={styles.defaultIcon}>
                        {getCategoryIcon(achievement.category)}
                      </span>
                    )}
                  </div>
                  <div className={styles.achievementMeta}>
                    <span className={`${styles.difficulty} ${getDifficultyColor(achievement.difficulty)}`}>
                      {achievement.difficulty}
                    </span>
                    <span className={styles.points}>
                      {achievement.points} pts
                    </span>
                  </div>
                </div>

                <div className={styles.achievementContent}>
                  <h3 className={styles.achievementTitle}>
                    {achievement.title}
                  </h3>
                  {achievement.description && (
                    <p className={styles.achievementDescription}>
                      {achievement.description}
                    </p>
                  )}
                </div>

                {earnedAt && (
                  <div className={styles.achievementFooter}>
                    <div className={styles.earnedInfo}>
                      <span className={styles.earnedDate}>
                        Earned {new Date(earnedAt).toLocaleDateString()}
                      </span>
                      {sharePublicly && (
                        <button className={styles.shareButton}>
                          Share
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'locked' && (
                  <div className={styles.lockedOverlay}>
                    <div className={styles.lockedContent}>
                      <span className={styles.lockIcon}>🔒</span>
                      <p className={styles.lockedText}>Complete the requirements to unlock</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Achievement Statistics */}
      <div className={styles.statsSection}>
        <h3 className={styles.statsTitle}>Achievement Statistics</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalUnlocked}</span>
            <span className={styles.statLabel}>Unlocked</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalLocked}</span>
            <span className={styles.statLabel}>Locked</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {stats.totalUnlocked > 0 ? Math.round((stats.totalUnlocked / (stats.totalUnlocked + stats.totalLocked)) * 100) : 0}%
            </span>
            <span className={styles.statLabel}>Completion Rate</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{totalPoints}</span>
            <span className={styles.statLabel}>Total Points</span>
          </div>
        </div>
      </div>
    </div>
  );
};
