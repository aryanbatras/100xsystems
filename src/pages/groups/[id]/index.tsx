import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { CommunityService } from '../../../services/database/communityService';
import { Navbar } from '../../../components/navbar/Navbar';
import styles from '../id.module.css';

export default function GroupPage() {
  const router = useRouter();
  const { user } = useAuth();
  const groupId = router.query.id as string;

  useEffect(() => {
    if (groupId) {
      // Redirect to discussions by default
      router.replace(`/groups/${groupId}/discussions`);
    }
  }, [groupId, router]);

  // Show loading while redirecting
  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
              <button 
                  onClick={() => router.push('/groups')}
                  className={styles.backButtonTop}
                >
                  ← Back to Groups
                </button>
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <h2>Loading Group...</h2>
          </div>
        </div>
      </div>
    </>
  );
}
