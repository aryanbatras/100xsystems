import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { CommunityService } from '../../../../services/database/communityService';
import { Navbar } from '../../../../components/navbar/Navbar';
import { GiscusComments } from '../../../../components/giscus/GiscusComments';
import styles from '../../id.module.css';

const CATEGORIES = [
  { id: 'discussions', label: 'Discussions' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'questions', label: 'Questions' },
  { id: 'resources', label: 'Resources' },
  { id: 'achievements', label: 'Achievements' }
];

export default function AchievementsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const groupId = router.query.id as string;

  useEffect(() => {
    if (groupId) {
      fetchGroup();
    }
  }, [groupId]);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      
      if (!user?.id) {
        setGroup(null);
        setLoading(false);
        return;
      }

      // Try to get the user's created group
      const userGroup = await CommunityService.getUserCreatedGroup(user.id);
      
      if (userGroup && userGroup.id === groupId) {
        setGroup(userGroup);
      } else {
        // If not user's group, try to get from public groups
        const publicGroups = await CommunityService.getPublicStudyGroups(100);
        const foundGroup = publicGroups.find((g: any) => g.id === groupId);
        setGroup(foundGroup || null);
      }
    } catch (error) {
      setGroup(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <h2>Loading Group...</h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!group) {
    return (
      <>
        
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.errorContainer}>
              <h2 className={styles.errorTitle}>Group Not Found</h2>
              <p className={styles.errorText}>The study group you're looking for doesn't exist or you don't have access to it.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isAdmin = user && group && group.creator_id === user.id;

  const handleJoinGroup = async () => {
  };

  return (
    <>
      
      <div className={styles.page}>
        <div className={styles.container}>
          {/* Group Header */}
          <div className={styles.groupHeader}>
            <div className={styles.groupInfo}>
                  <button 
                              onClick={() => router.push('/groups')}
                              className={styles.backButtonTop}
                            >
                              ← Back to Groups
                            </button>
              <h1 className={styles.groupName}>{group.name}</h1>
              <p className={styles.groupDescription}>{group.description}</p>
              <div className={styles.groupMeta}>
                <span className={styles.memberCount}>{group.member_count} members</span>
                {group.is_private && <span className={styles.privateBadge}>Private</span>}
                {group.tags && group.tags.length > 0 && (
                  <div className={styles.tags}>
                    {group.tags.slice(0, 3).map((tag: any, index: any) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {group.group_avatar_url && (
              <img 
                src={group.group_avatar_url} 
                alt={group.name}
                className={styles.groupAvatar}
              />
            )}
          </div>

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.categoryTab} ${cat.id === 'achievements' ? styles.active : ''}`}
                onClick={() => router.push(`/groups/${groupId}/${cat.id}`)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Discussion Content */}
          <div className={styles.discussionContent}>
            <GiscusComments 
              groupId={groupId} 
              groupName={group.name}
              category="achievement"
            />
          </div>
        </div>
      </div>
    </>
  );
}
