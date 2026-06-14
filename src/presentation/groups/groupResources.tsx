/**
 * ## Presentation: Group Resources Page
 *
 * Curated resource list for study groups where
 * members can share and discover learning materials,
 * links, and references.
 *
 * @packageDocumentation
 */

'use client';

import { useRouter } from 'next/router';
import { GiscusComments } from '../../presentation/giscus/GiscusComments';
import { GroupHeader, GroupLoading, GroupNotFound, useGroupFetcher } from './groupDetail';
import styles from '../../presentation/_styles/pages/groups/id.module.css';

/**
 * Group Resources page — shared resource links for group members.
 *
 * @remarks
 * Curated resource list where study group members
 * can share and discover learning materials.
 *
 * @public
 */
export default function GroupResourcesPage() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GroupHeader group={group} activeCategory="resources" />
        <div className={styles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="resource" />
        </div>
      </div>
    </div>
  );
}
