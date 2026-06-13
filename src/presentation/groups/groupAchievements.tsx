/**
 * ## Presentation: Group Achievements
 *
 * Displays achievements and leaderboard for
 * a specific study group.
 *
 * @packageDocumentation
 */

'use client';
import { useRouter } from 'next/router';
import { GiscusComments } from '../../presentation/components/giscus/GiscusComments';
import { GroupHeader, GroupLoading, GroupNotFound, useGroupFetcher } from './groupDetail';
import styles from '../../presentation/_styles/pages/groups/id.module.css';

/**
 * Group Achievements page — celebrates group milestones and accomplishments.
 */
export default function GroupAchievementsPage() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GroupHeader group={group} activeCategory="achievements" />
        <div className={styles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="achievement" />
        </div>
      </div>
    </div>
  );
}
