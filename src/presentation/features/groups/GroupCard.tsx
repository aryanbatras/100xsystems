import React from 'react';
import { useRouter } from 'next/router';
import { StudyGroupWithMembership } from '../../../application/types/database.types';
import styles from '../../_styles/components/groups/Groups.module.css';

interface GroupCardProps {
  group: StudyGroupWithMembership;
  onJoin?: (groupId: string) => void;
  onLeave?: (groupId: string) => void;
  onEdit?: (groupId: string) => void;
  onDelete?: (groupId: string) => void;
  showActions?: boolean;
}

export const GroupCard: React.FC<GroupCardProps> = ({ 
  group, 
  onJoin, 
  onLeave, 
  onEdit, 
  onDelete,
  showActions = true 
}) => {
  const router = useRouter();
  const isAdmin = group.user_role === 'admin';
  const isMember = group.user_role !== undefined;

  const handleCardClick = () => {
    router.push(`/groups/${group.id}`);
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onJoin) onJoin(group.id);
  };

  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLeave) onLeave(group.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(group.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
      onDelete(group.id);
    }
  };

  return (
    <div className={styles.groupCard} onClick={handleCardClick}>
      <div className={styles.groupHeader}>
        <div className={styles.groupInfo}>
          <h3 className={styles.groupName}>{group.name}</h3>
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

      <div className={styles.groupContent}>
        {group.welcome_message && (
          <div className={styles.welcomeMessage}>
            <p>{group.welcome_message}</p>
          </div>
        )}
      </div>

      {showActions && (
        <div className={styles.groupActions}>
          {!isMember && !isAdmin && (
            <button 
              className={styles.joinButton}
              onClick={handleJoin}
            >
              Join Group
            </button>
          )}
          
          {isMember && !isAdmin && (
            <button 
              className={styles.leaveButton}
              onClick={handleLeave}
            >
              Leave Group
            </button>
          )}

          {isAdmin && (
            <div className={styles.adminActions}>
              <button 
                className={styles.editButton}
                onClick={handleEdit}
              >
                Edit Group
              </button>
              {/* <button 
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                Delete Group
              </button> */}
            </div>
          )}
        </div>
      )}

      <div className={styles.groupFooter}>
        <span className={styles.createdAt}>
          Created {new Date(group.created_at).toLocaleDateString()}
        </span>
        {group.roadmap_slug && (
          <span className={styles.roadmapLink}>
            📚 {group.roadmap_slug}
          </span>
        )}
      </div>
    </div>
  );
};
