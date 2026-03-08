import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserCommunity } from '../../hooks/useUserCommunity';
import { Navbar } from '../../components/navbar/Navbar';
import { GroupsList } from '../../components/groups/GroupsList';
import { CreateGroupModal } from '../../components/groups/CreateGroupModal';
import { GroupEditSection } from '../../components/groups/GroupEditSection';
import styles from './Groups.module.css';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';

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
    updateGroup,
    isCreatingGroup,
    loading 
  } = useUserCommunity();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(publicGroups);

  useEffect(() => {
    console.log('🎯 GroupsPage: State updated:', { 
      user: user?.id, 
      userCreatedGroup: userCreatedGroup?.id,
      canCreateGroup, 
      isCreatingGroup, 
      loading 
    });
  }, [user?.id, userCreatedGroup, canCreateGroup, isCreatingGroup, loading]);

  useEffect(() => {
    const filtered = publicGroups.filter(group => 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredGroups(filtered);
  }, [searchQuery, publicGroups]);

  const handleCreateGroup = async (groupData: any) => {
    const success = await createGroupWithGiscus(groupData);
    if (success) {
      setIsCreateModalOpen(false);
    }
  };

  const handleEditGroup = (groupId: string) => {
    setEditingGroupId(groupId);
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

  return (
    <ProtectedRoute requireAuth={true}>
      <div className={styles.page}>
        <div className={styles.container}>
          {/* Header with title */}
          <div className={styles.header}>
            <h1 className={styles.title}>Study Groups</h1>
            <p className={styles.articlesDescription}>
              Connect with learners, share knowledge, and accelerate your learning journey through collaborative study groups.
            </p>
          </div>

          {/* Search Section */}
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search groups by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={styles.filterButton}>
                🔍 Filter
              </button>
            </div>
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

          {editingGroupId && userCreatedGroup && (
            <GroupEditSection
              group={{
                ...userCreatedGroup,
                user_role: 'admin',
                joined_at: userCreatedGroup.created_at
              }}
              onClose={() => setEditingGroupId(null)}
              onUpdateGroup={async (updatedGroup: any) => {
                const success = await updateGroup(userCreatedGroup.id, updatedGroup);
                if (success) {
                  console.log('Group updated successfully');
                  setEditingGroupId(null);
                } else {
                  console.error('Failed to update group');
                }
              }}
            />
          )}

          <GroupsList
            userCreatedGroup={userCreatedGroup ? {
              ...userCreatedGroup,
              user_role: 'admin',
              joined_at: userCreatedGroup.created_at
            } : null}
            joinedGroups={studyGroups.filter(g => g.user_role !== 'admin')}
            allGroups={filteredGroups}
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
    </ProtectedRoute>
  );
}
