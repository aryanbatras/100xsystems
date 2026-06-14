/**
 * ## Presentation: Group Announcements
 *
 * Shows announcements and updates posted
 * within a study group.
 *
 * @packageDocumentation
 */

'use client';
import { useRouter } from 'next/router';
import { GiscusComments } from '../giscus/GiscusComments';
import { GroupHeader, GroupLoading, GroupNotFound, useGroupFetcher } from './groupDetail';
import styles from '../../_styles/pages/groups/id.module.css';

/**
 * Group Announcements page — official announcements for group members.
 */
export default function GroupAnnouncementsPage() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GroupHeader group={group} activeCategory="announcements" />
        <div className={styles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="announcement" />
        </div>
      </div>
    </div>
  );
}
