/**
 * ## Presentation: Group Members Page
 *
 * Lists all members of a study group with their roles,
 * join dates, and activity status.
 *
 * @packageDocumentation
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { GroupHeader, GroupLoading, GroupNotFound, useGroupFetcher } from './groupDetail';
import styles from '../../_styles/pages/groups/id.module.css';

/**
 * Group Members page — browse members with profile information.
 *
 * @remarks
 * Lists all members of a study group with their roles,
 * join dates, and membership status. Shows avatars, bio,
 * GitHub/LinkedIn links, and contribution scores.
 *
 * @public
 */
export default function GroupMembersPage() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);
  const [members] = useState<any[]>([]);
  const [loadingMembers] = useState(false);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <GroupHeader group={group} activeCategory="members" />

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

        {/* Members Section */}
        <div className={styles.membersSection}>
          <h3 className={styles.membersTitle}>Group Members ({members.length})</h3>
          {loadingMembers ? (
            <div className={styles.loadingMembers}>
              <div className={styles.spinner} />
              <p>Loading members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className={styles.noMembers}>
              <p>No members found in this group.</p>
            </div>
          ) : (
            <div className={styles.membersGrid}>
              {members.map((member: any) => (
                <div key={member.user_id} className={styles.memberCard}>
                  <div className={styles.memberAvatar}>
                    {member.profiles?.avatar_url ? (
                      <img src={member.profiles.avatar_url} alt={member.profiles.full_name || member.profiles.username} className={styles.avatarImage} />
                    ) : (
                      <div className={styles.defaultAvatar}>
                        {(member.profiles?.full_name || member.profiles?.username || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={styles.memberInfo}>
                    <h4 className={styles.memberName}>{member.profiles?.full_name || member.profiles?.username || 'Unknown User'}</h4>
                    <p className={styles.memberUsername}>@{member.profiles?.username || 'unknown'}</p>
                    <p className={styles.memberBio}>{member.profiles?.bio || 'No bio available'}</p>
                    <div className={styles.memberMeta}>
                      <span className={styles.memberRole}>{member.role}</span>
                      <span className={styles.memberJoined}>Joined {new Date(member.joined_at).toLocaleDateString()}</span>
                    </div>
                    <div className={styles.memberSocial}>
                      {member.profiles?.github_username && (
                        <a href={`https://github.com/${member.profiles.github_username}`} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
                      )}
                      {member.profiles?.linkedin_url && (
                        <a href={member.profiles.linkedin_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>LinkedIn</a>
                      )}
                      {member.profiles?.website_url && (
                        <a href={member.profiles.website_url} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Website</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
