import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import { ProfileSection } from '../../components/dashboard/ProfileSection/ProfileSection';
import { ProgressSection } from '../../components/dashboard/ProgressSection/ProgressSection';
import { AchievementsSection } from '../../components/dashboard/AchievementsSection/AchievementsSection';
import { DatabaseDebugPanel } from '../../components/debug/DatabaseDebugPanel';
import styles from '../../styles/pages/UserDashboard.module.css';

export default function UserDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <>
        <div className={styles.userDashboardContainer}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <div className={styles.userDashboardContainer}>
          <div className={styles.errorContainer}>
            <h2 className={styles.errorTitle}>Authentication Required</h2>
            <p className={styles.errorText}>Please sign in to access your dashboard.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.userDashboardContainer}>
        <div className={styles.userDashboardWrapper}>
          <header className={styles.userDashboardHeader}>
            <div className={styles.welcomeSection}>
              <h1>
                Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
              </h1>
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

              {/* Additional sections can be added here as we build them */}
              {/* 
              <section className={styles.dashboardSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Analytics</h2>
                </div>
                <div className={styles.sectionContent}>
                  <AnalyticsSection />
                </div>
              </section>
              */}
            </div>
          </main>

          {/* <footer className={styles.dashboardFooter}>
            <p className={styles.footerText}>
              Keep learning and growing! Every step counts towards becoming a 100x Engineer.
            </p>
            <div className={styles.footerLinks}>
              <a href="/profile" className={styles.footerLink}>View Profile</a>
              <a href="/articles" className={styles.footerLink}>Browse Articles</a>
              <a href="/roadmaps" className={styles.footerLink}>View Roadmaps</a>
            </div>
          </footer> */}
        </div>
      </div>

    </>
  );
}
