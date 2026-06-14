/**
 * ## Presentation: Group Discussions Page
 *
 * Displays discussion threads within a study group.
 * Users can view, create, and reply to discussions
 * with their group members.
 *
 * @packageDocumentation
 */

'use client';

import { useRouter } from 'next/router';
import { GiscusComments } from '../../presentation/giscus/GiscusComments';
import { GroupHeader, GroupLoading, GroupNotFound, useGroupFetcher } from './groupDetail';
import styles from '../../presentation/_styles/pages/groups/id.module.css';

/**
 * Group Discussions page — real-time discussion threads powered by Giscus.
 *
 * @remarks
 * Shows discussion threads within a study group.
 * Users can view existing threads and create new ones.
 *
 * @public
 */
export default function GroupDiscussionsPage() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GroupHeader group={group} activeCategory="discussions" />
        <div className={styles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="discussion" />
        </div>
      </div>
    </div>
  );
}
