/**
 * ## Presentation: User Dashboard
 *
 * User dashboard showing achievements, progress,
 * learning streaks, and profile overview.
 *
 * @packageDocumentation
 */

import { useRouter } from 'next/router';
import { ProfileSection } from '../dashboard/ProfileSection/ProfileSection';
import { ProgressSection } from '../dashboard/ProgressSection/ProgressSection';
import { AchievementsSection } from '../dashboard/AchievementsSection/AchievementsSection';
import styles from '../../_styles/pages/UserDashboard.module.css';

export default function UserDashboard() {
  const router = useRouter();
  const user = null;
  const loading = false;

  if (loading) {
    return (
      <div className={styles.userDashboardContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.userDashboardContainer}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Authentication Required</h2>
          <p className={styles.errorText}>Please sign in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userDashboardContainer}>
      <div className={styles.userDashboardWrapper}>
        <header className={styles.userDashboardHeader}>
          <div className={styles.welcomeSection}>
            <h1>Welcome back!</h1>
            <p className={styles.userDashboardDescription}>
              Track your learning progress, manage your profile, and achieve your goals.
            </p>
            <div className={styles.quickActions}>
              <a href="/articles" className={styles.quickAction}>
                <span className={styles.actionIcon}>📚</span>
                <span className={styles.actionText}>Browse Articles</span>
              </a>
              <a href="/roadmaps" className={styles.quickAction}>
                <span className={styles.actionIcon}>🗺️</span>
                <span className={styles.actionText}>View Roadmaps</span>
              </a>
              <a href="/groups" className={styles.quickAction}>
                <span className={styles.actionIcon}>👥</span>
                <span className={styles.actionText}>Join Groups</span>
              </a>
              <a href="/dsa" className={styles.quickAction}>
                <span className={styles.actionIcon}>💻</span>
                <span className={styles.actionText}>DSA Practice</span>
              </a>
              <a href="/graph" className={styles.quickAction}>
                <span className={styles.actionIcon}>🕸️</span>
                <span className={styles.actionText}>Knowledge Graph</span>
              </a>
            </div>
          </div>
        </header>

        <main className={styles.userDashboardMain}>
          <div className={styles.dashboardGrid}>
            <section className={styles.dashboardSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Profile Overview</h2>
              </div>
              <div className={styles.sectionContent}>
                <ProfileSection />
              </div>
            </section>

            <section className={styles.dashboardSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Learning Progress</h2>
              </div>
              <div className={styles.sectionContent}>
                <ProgressSection />
              </div>
            </section>

            <section className={styles.dashboardSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Achievements</h2>
              </div>
              <div className={styles.sectionContent}>
                <AchievementsSection />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
