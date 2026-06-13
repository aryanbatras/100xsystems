/**
 * ## Presentation: Group Redirect Page
 *
 * Redirect handler for group detail pages. Fetches
 * group data and redirects to the appropriate
 * default sub-page (discussions).
 *
 * @packageDocumentation
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { GroupLoading } from './groupDetail';
import styles from '../../presentation/_styles/pages/groups/id.module.css';

/**
 * Group detail redirect page — redirects to discussions by default.
 *
 * @remarks
 * The base `/groups/[id]` route immediately redirects to `/groups/[id]/discussions`
 * as the default landing tab for any study group. Handles loading and
 * not-found states for invalid group IDs.
 *
 * @public
 */
export default function GroupRedirectPage() {
  const router = useRouter();
  const groupId = router.query.id as string;

  useEffect(() => {
    if (groupId) {
      router.replace(`/groups/${groupId}/discussions`);
    }
  }, [groupId, router]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button onClick={() => router.push('/groups')} className={styles.backButtonTop}>← Back to Groups</button>
        <GroupLoading />
      </div>
    </div>
  );
}
