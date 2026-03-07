import React from 'react';
import { StudyGroupWithMembership } from '../../services/types/database';
import { GroupCard } from './GroupCard';
import styles from './Groups.module.css';

interface GroupsListProps {
  userCreatedGroup: StudyGroupWithMembership | null;
  joinedGroups: StudyGroupWithMembership[];
  allGroups: StudyGroupWithMembership[];
  onJoinGroup?: (groupId: string) => void;
  onLeaveGroup?: (groupId: string) => void;
  onEditGroup?: (groupId: string) => void;
  onDeleteGroup?: (groupId: string) => void;
  loading?: boolean;
}

export const GroupsList: React.FC<GroupsListProps> = ({
  userCreatedGroup,
  joinedGroups,
  allGroups,
  onJoinGroup,
  onLeaveGroup,
  onEditGroup,
  onDeleteGroup,
  loading = false
}) => {
  console.log('🔍 GroupsList Debug:', {
    userCreatedGroup: userCreatedGroup ? {
      id: userCreatedGroup.id,
      name: userCreatedGroup.name,
      user_role: userCreatedGroup.user_role
    } : null,
    joinedGroupsCount: joinedGroups.length,
    allGroupsCount: allGroups.length,
    joinedGroupsRoles: joinedGroups.map(g => ({ id: g.id, name: g.name, user_role: g.user_role })),
    allGroupsRoles: allGroups.map(g => ({ id: g.id, name: g.name, user_role: g.user_role }))
  });

  const joinedGroupsOnly = joinedGroups.filter(g => g.user_role !== 'admin');
  const availableGroups = allGroups.filter(group => 
    !joinedGroups.some(joined => joined.id === group.id) 
    && (!userCreatedGroup || userCreatedGroup.id !== group.id)
  );

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>Loading groups...</p>
      </div>
    );
  }

  return (
    <div>
      {/* My Created Group */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          My Group
          {userCreatedGroup && <span className={styles.sectionBadge}>1 Created</span>}
        </h2>
        
        {userCreatedGroup ? (
          <div>
            <GroupCard
              group={userCreatedGroup}
              onEdit={onEditGroup}
              onDelete={onDeleteGroup}
              showActions={true}
            />
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3>No Group Created</h3>
            <p>You haven't created a study group yet. Create your first group to start collaborating with others!</p>
          </div>
        )}
      </section>

      {/* Joined Groups */}
      {joinedGroupsOnly.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Joined Groups
            <span className={styles.sectionBadge}>{joinedGroupsOnly.length} Joined</span>
          </h2>
          
          <div>
            {joinedGroupsOnly.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onLeave={onLeaveGroup}
                showActions={true}
              />
            ))}
          </div>
        </section>
      )}

      {joinedGroupsOnly.length === 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Joined Groups
            <span className={styles.sectionBadge}>0 Joined</span>
          </h2>
          
          <div className={styles.emptyState}>
            <h3>No Groups Joined</h3>
            <p>You haven't joined any study groups yet. Browse available groups below to get started!</p>
          </div>
        </section>
      )}

      {/* All Available Groups */}
      {availableGroups.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            All Groups
            <span className={styles.sectionBadge}>{availableGroups.length} Available</span>
          </h2>
          
          <div>
            {availableGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onJoin={onJoinGroup}
                showActions={true}
              />
            ))}
          </div>
        </section>
      )}

      {availableGroups.length === 0 && joinedGroupsOnly.length === 0 && !userCreatedGroup && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            All Groups
            <span className={styles.sectionBadge}>0 Available</span>
          </h2>
          
          <div className={styles.emptyState}>
            <h3>No Groups Available</h3>
            <p>No study groups are available at the moment. Be the first to create one!</p>
          </div>
        </section>
      )}
    </div>
  );
};
