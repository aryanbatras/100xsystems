import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { CommunityService } from '../../../../services/database/communityService';
import { Navbar } from '../../../../components/navbar/Navbar';
import styles from '../../../../styles/pages/groups/id.module.css';

const CATEGORIES = [
  { id: 'discussions', label: 'Discussions' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'questions', label: 'Questions' },
  { id: 'resources', label: 'Resources' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'members', label: 'Members' }
];

export default function MembersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [group, setGroup] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(false);

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
        // Fetch group members
        await fetchGroupMembers(groupId);
      } else {
        // If not user's group, try to get from public groups
        const publicGroups = await CommunityService.getPublicStudyGroups(100);
        const foundGroup = publicGroups.find((g: any) => g.id === groupId);
        setGroup(foundGroup || null);
        if (foundGroup) {
          // Fetch group members
          await fetchGroupMembers(groupId);
        }
      }
    } catch (error) {
      setGroup(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupMembers = async (groupId: string) => {
    try {
      setLoadingMembers(true);
      // TODO: Implement getGroupMembers method in CommunityService
      setMembers([]);
    } catch (error) {
      setMembers([]);
    } finally {
      setLoadingMembers(false);
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
        <Navbar />
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.errorContainer}>
              <h2 className={styles.errorTitle}>Group Not Found</h2>
              <p className={styles.errorText}>The study group you're looking for doesn't exist or you don't have access to it.</p>
              <button 
                onClick={() => router.push('/groups')}
                className={styles.backButton}
              >
                ← Back to Groups
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                <span className={styles.maxMembers}>Max: {group.max_members}</span>
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
                {group.rules.split('\n').map((rule: any, index: any) => (
                  <p key={index} className={styles.ruleItem}>• {rule}</p>
                ))}
              </div>
            </div>
          )}

          {/* Category Tabs */}
          <div className={styles.categoryTabs}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`${styles.categoryTab} ${cat.id === 'members' ? styles.active : ''}`}
                onClick={() => router.push(`/groups/${groupId}/${cat.id}`)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Members Section */}
          <div className={styles.membersSection}>
            <h3 className={styles.membersTitle}>Group Members ({members.length})</h3>
            {loadingMembers ? (
              <div className={styles.loadingMembers}>
                <div className={styles.spinner}></div>
                <p>Loading members...</p>
              </div>
            ) : members.length === 0 ? (
              <div className={styles.noMembers}>
                <p>No members found in this group.</p>
              </div>
            ) : (
              <div className={styles.membersGrid}>
                {members.map((member: any, index: number) => (
                  <div key={member.user_id} className={styles.memberCard}>
                    <div className={styles.memberAvatar}>
                      {member.profiles?.avatar_url ? (
                        <img 
                              src={member.profiles.avatar_url} 
                              alt={member.profiles.full_name || member.profiles.username}
                              className={styles.avatarImage}
                            />
                          ) : (
                            <div className={styles.defaultAvatar}>
                              {(member.profiles?.full_name || member.profiles?.username || 'User')?.charAt(0)?.toUpperCase()}
                            </div>
                          )}
                    </div>
                    <div className={styles.memberInfo}>
                      <h4 className={styles.memberName}>
                        {member.profiles?.full_name || member.profiles?.username || 'Unknown User'}
                      </h4>
                      <p className={styles.memberUsername}>@{member.profiles?.username || 'unknown'}</p>
                      <p className={styles.memberBio}>
                        {member.profiles?.bio || 'No bio available'}
                      </p>
                      <div className={styles.memberMeta}>
                        <span className={styles.memberRole}>{member.role}</span>
                        <span className={styles.memberJoined}>
                          Joined {new Date(member.joined_at).toLocaleDateString()}
                        </span>
                        <span className={styles.memberScore}>
                          Score: {member.contribution_score || 0}
                        </span>
                        {member.profiles?.location && (
                          <span className={styles.memberLocation}>
                            📍 {member.profiles.location}
                          </span>
                        )}
                        {member.profiles?.is_mentor && (
                          <span className={styles.mentorBadge}>
                            👨‍🏫 Mentor
                          </span>
                        )}
                      </div>
                      <div className={styles.memberSocial}>
                        {member.profiles?.github_username && (
                          <a 
                            href={`https://github.com/${member.profiles.github_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                          >
                            GitHub
                          </a>
                        )}
                        {member.profiles?.linkedin_url && (
                          <a 
                            href={member.profiles.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                          >
                            LinkedIn
                          </a>
                        )}
                        {member.profiles?.website_url && (
                          <a 
                            href={member.profiles.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                          >
                            Website
                          </a>
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
    </>
  );
}
