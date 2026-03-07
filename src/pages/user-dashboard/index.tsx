import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import { ProfileSection } from '../../components/dashboard/ProfileSection/ProfileSection';
import { ProgressSection } from '../../components/dashboard/ProgressSection/ProgressSection';
import { AchievementsSection } from '../../components/dashboard/AchievementsSection/AchievementsSection';
import { DatabaseDebugPanel } from '../../components/debug/DatabaseDebugPanel';
import styles from './UserDashboard.module.css';

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
        {/* <Navbar /> */}
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        {/* <Navbar /> */}
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Authentication Required</h2>
          <p className={styles.errorText}>Please sign in to access your dashboard.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.dashboardHeader}>
            <div className={styles.welcomeSection}>
              <h1 className={styles.title}>
                Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}!
              </h1>
              <p className={styles.subtitle}>
                Track your learning progress, manage your profile, and achieve your goals.
              </p>
            </div>
            <div className={styles.quickActions}>
              <a href="/articles" className={styles.quickAction}>
                <span className={styles.actionIcon}>📚</span>
                <span className={styles.actionText}>Browse Articles</span>
              </a>
              <a href="/roadmaps" className={styles.quickAction}>
                <span className={styles.actionIcon}>🗺️</span>
                <span className={styles.actionText}>View Roadmaps</span>
              </a>
              <a href="/profile" className={styles.quickAction}>
                <span className={styles.actionIcon}>👤</span>
                <span className={styles.actionText}>Public Profile</span>
              </a>
            </div>
          </div>

          <div className={styles.dashboardGrid}>
            {/* Profile Section */}
            <ProfileSection />

            {/* Progress Section */}
            <ProgressSection />

            {/* Achievements Section */}
            <AchievementsSection />

            {/* Additional sections can be added here as we build them */}
            {/* 
            <AnalyticsSection />
            <CommunitySection />
            <CertificationsSection />
            */}
          </div>

          {/* Footer */}
          <div className={styles.dashboardFooter}>
            <p className={styles.footerText}>
              Keep learning and growing! Every step counts towards becoming a 100x Engineer.
            </p>
            <div className={styles.actionList}>
              <a href="/profile" className={styles.actionLink}>{"->"} View Profile</a>
              <a href="/articles" className={styles.actionLink}>{"->"} Browse Articles</a>
              <a href="/roadmaps" className={styles.actionLink}>{"->"} View Roadmaps</a>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Panel - Only in development */}
       <DatabaseDebugPanel />
    </>
  );
}
