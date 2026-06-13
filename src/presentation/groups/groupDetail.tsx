/**
 * ## Presentation: Group Detail Page
 *
 * Displays group details, member list, achievements,
 * and navigation to sub-pages.
 *
 * @packageDocumentation
 */

'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { CommunityService } from '../../infrastructure/database/communityService';
import styles from '../../styles/pages/groups/id.module.css';

/** @public */
export const CATEGORIES = [
  { id: 'discussions', label: 'Discussions' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'questions', label: 'Questions' },
  { id: 'resources', label: 'Resources' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'members', label: 'Members' },
];

/**
 * Shared loading state for group detail pages.
 */
export function GroupLoading() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <h2>Loading Group...</h2>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared error state for group detail pages.
 */
export function GroupNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Group Not Found</h2>
          <p className={styles.errorText}>The study group you're looking for doesn't exist or you don't have access to it.</p>
          <button onClick={onBack} className={styles.backButton}>← Back to Groups</button>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared group header with avatar, metadata, tags, and category tabs.
 */
export function GroupHeader({ group, activeCategory }: { group: any; activeCategory: string }) {
  const router = useRouter();
  const groupId = router.query.id as string;

  return (
    <>
      {/* Group Header */}
      <div className={styles.groupHeader}>
        <div className={styles.groupInfo}>
          <button onClick={() => router.push('/groups')} className={styles.backButtonTop}>← Back to Groups</button>
          <h1 className={styles.groupName}>{group.name}</h1>
          <p className={styles.groupDescription}>{group.description}</p>
          <div className={styles.groupMeta}>
            <span className={styles.memberCount}>{group.member_count} members</span>
            <span className={styles.maxMembers}>Max: {group.max_members}</span>
            {group.is_private && <span className={styles.privateBadge}>Private</span>}
            {group.tags?.length > 0 && (
              <div className={styles.tags}>
                {group.tags.slice(0, 3).map((tag: string, i: number) => (
                  <span key={i} className={styles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        {group.group_avatar_url && (
          <img src={group.group_avatar_url} alt={group.name} className={styles.groupAvatar} />
        )}
      </div>

      {/* Welcome Message */}
      {group.welcome_message && (
        <div className={styles.welcomeSection}>
          <h3 className={styles.welcomeTitle}>Welcome Message</h3>
          <p className={styles.welcomeText}>{group.welcome_message}</p>
        </div>
      )}

      {/* Group Rules */}
      {group.rules && (
        <div className={styles.rulesSection}>
          <h3 className={styles.rulesTitle}>Group Rules</h3>
          <div className={styles.rulesContent}>
            {group.rules.split('\n').map((rule: string, i: number) => (
              <p key={i} className={styles.ruleItem}>• {rule}</p>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className={styles.categoryTabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryTab} ${cat.id === activeCategory ? styles.active : ''}`}
            onClick={() => router.push(`/groups/${groupId}/${cat.id}`)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </>
  );
}

/**
 * Hook to fetch a group by ID and return loading/error/group state.
 */
export function useGroupFetcher(groupId: string | undefined) {
  const { user } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!groupId || !user?.id) {
      setLoading(false);
      return;
    }
    fetchGroup();
  }, [groupId, user?.id]);

  const fetchGroup = async () => {
    try {
      setLoading(true);
      const userGroup = await CommunityService.getUserCreatedGroup(user!.id);
      if (userGroup && userGroup.id === groupId) {
        setGroup(userGroup);
      } else {
        const publicGroups = await CommunityService.getPublicStudyGroups(100);
        setGroup(publicGroups.find((g: any) => g.id === groupId) || null);
      }
    } catch {
      setGroup(null);
    } finally {
      setLoading(false);
    }
  };

  return { group, loading };
}
