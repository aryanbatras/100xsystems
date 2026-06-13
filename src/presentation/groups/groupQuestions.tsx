/**
 * ## Presentation: Group Questions Page
 *
 * Q&A section for study groups where members can
 * ask questions, provide answers, and vote on
 * helpful responses.
 *
 * @packageDocumentation
 */

'use client';

import { useRouter } from 'next/router';
import { GiscusComments } from '../../components/giscus/GiscusComments';
import { GroupHeader, GroupLoading, GroupNotFound, useGroupFetcher } from './groupDetail';
import styles from '../../styles/pages/groups/id.module.css';

/**
 * Group Questions page — Q&A forum for group members.
 *
 * @remarks
 * Q&A section for study groups where members can
 * ask questions and provide answers.
 *
 * @public
 */
export default function GroupQuestionsPage() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GroupHeader group={group} activeCategory="questions" />
        <div className={styles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="question" />
        </div>
      </div>
    </div>
  );
}
