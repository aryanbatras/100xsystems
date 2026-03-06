import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
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
          <div className={styles.dashboardCard}>
            <div className={styles.header}>
              <h1 className={styles.title}>Welcome to Your Dashboard</h1>
              <p className={styles.subtitle}>
                Hello, {user.user_metadata?.full_name || user.email?.split('@')[0]}! 
              </p>
            </div>

            <div className={styles.grid}>
              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleProfile}`}>Profile Information</h3>
                <div className={styles.infoList}>
                  <p className={styles.infoItem}><strong>Email:</strong> {user.email}</p>
                  <p className={styles.infoItem}><strong>Username:</strong> {user.user_metadata?.user_name || 'Not set'}</p>
                  <p className={styles.infoItem}><strong>Full Name:</strong> {user.user_metadata?.full_name || 'Not set'}</p>
                </div>
              </div>

              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleAuth}`}>Authentication Status</h3>
                <div className={styles.infoList}>
                  <p className={styles.infoItem}><strong>Status:</strong> <span className={styles.status}>Authenticated</span></p>
                  <p className={styles.infoItem}><strong>Provider:</strong> GitHub</p>
                  <p className={styles.infoItem}><strong>User ID:</strong> {user.id}</p>
                </div>
              </div>

              <div className={styles.card}>
                <h3 className={`${styles.cardTitle} ${styles.cardTitleActions}`}>Quick Actions</h3>
                <div className={styles.actionList}>
                  <a href="/profile" className={styles.actionLink}>{"-"} View Profile</a>
                  <a href="/articles" className={styles.actionLink}>{"-"} Browse Articles</a>
                  <a href="/roadmaps" className={styles.actionLink}>{"-"} View Roadmaps</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
