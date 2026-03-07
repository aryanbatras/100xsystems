import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserCommunity } from '../../hooks/useUserCommunity';
import { Navbar } from '../../components/navbar/Navbar';
import { GroupsList } from '../../components/groups/GroupsList';
import { CreateGroupModal } from '../../components/groups/CreateGroupModal';
import styles from './Groups.module.css';

export default function GroupsPage() {
  const { user } = useAuth();
  const { 
    userCreatedGroup, 
    studyGroups, 
    publicGroups, 
    canCreateGroup,
    createGroupWithGiscus,
    joinStudyGroup,
    leaveStudyGroup,
    deleteGroup,
    isCreatingGroup,
    loading 
  } = useUserCommunity();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    console.log('🎯 GroupsPage: State updated:', { 
      user: user?.id, 
      userCreatedGroup: userCreatedGroup?.id,
      canCreateGroup, 
      isCreatingGroup, 
      loading 
    });
  }, [user?.id, userCreatedGroup, canCreateGroup, isCreatingGroup, loading]);

  const handleCreateGroup = async (groupData: any) => {
    const success = await createGroupWithGiscus(groupData);
    if (success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleEditGroup = (groupId: string) => {
    // TODO: Implement edit group functionality
    console.log('Edit group:', groupId);
  };

  const handleDeleteGroup = async (groupId: string) => {
    const success = await deleteGroup(groupId);
    if (success) {
      console.log('Group deleted successfully');
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    const success = await joinStudyGroup(groupId);
    if (success) {
      console.log('Joined group successfully');
    }
  };

  const handleLeaveGroup = async (groupId: string) => {
    const success = await leaveStudyGroup(groupId);
    if (success) {
      console.log('Left group successfully');
    }
  };

  if (!user) {
    return (
      <>
        {/* <Navbar /> */}
        <div className={styles.page}>
          <div className={styles.container}>
            <div className={styles.errorContainer}>
              <h2 className={styles.errorTitle}>Authentication Required</h2>
              <p className={styles.errorText}>Please sign in to access study groups.</p>
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
          {/* Header with title */}
          <div className={styles.header}>
            <h1 className={styles.title}>Study Groups</h1>
          </div>

          {/* Create Group Section */}
          <div className={styles.createSection}>
            <h2 className={styles.sectionTitle}>Create Your Study Group</h2>
            <div className={styles.createCard}>
              <div className={styles.createContent}>
                <h3>Start Learning Together</h3>
                <p>Create a study group to collaborate with others and accelerate your learning journey.</p>
                <button 
                  className={styles.createButton}
                  onClick={() => setIsCreateModalOpen(true)}
                  disabled={isCreatingGroup || !canCreateGroup}
                  title={!canCreateGroup ? 'You can only create one study group' : ''}
                >
                  {isCreatingGroup ? 'Creating...' : userCreatedGroup ? '✓ Group Created' : '+ Create Group'}
                </button>
              </div>
            </div>
          </div>

          {/* Groups List */}
          <GroupsList
            userCreatedGroup={userCreatedGroup ? {
              ...userCreatedGroup,
              user_role: 'admin',
              joined_at: userCreatedGroup.created_at
            } : null}
            joinedGroups={studyGroups.filter(g => g.user_role !== 'admin')}
            allGroups={publicGroups}
            onJoinGroup={handleJoinGroup}
            onLeaveGroup={handleLeaveGroup}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
            loading={loading}
          />

          {isCreateModalOpen && (
            <CreateGroupModal
              onClose={() => setIsCreateModalOpen(false)}
              onCreateGroup={handleCreateGroup}
              isCreating={isCreatingGroup}
            />
          )}
        </div>
      </div>
    </>
  );
}
