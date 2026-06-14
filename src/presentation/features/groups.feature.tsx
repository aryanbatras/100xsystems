'use client';

import { useUserCommunity } from '../../application/hooks';
import { StudyGroup, StudyGroupWithMembership } from '../../application/types/database.types';
import editGroupModalStyles from '../_styles/css/groups-editgroupmodal.module.css';
import groupEditSectionStyles from '../_styles/css/groups-groupeditsection.module.css';
import groupsStyles from '../_styles/css/groups-groups.module.css';
import { useRouter } from 'next/router';
import { GiscusComments } from './giscus.feature';
import React, { useState, useEffect } from 'react';
/**
 * ## Groups
 *
 * Groups feature module.
 * Contains all components, types, and logic for the groups domain.
 *
 * @packageDocumentation
 * @module groups
 */

;



// ============================================================
// Source: CreateGroupModal.tsx
// ============================================================
interface CreateGroupModalProps {
  onClose: () => void;
  onCreateGroup: (groupData: Partial<StudyGroup>) => Promise<boolean | void>;
  isCreating?: boolean;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ 
  onClose, 
  onCreateGroup,
  isCreating = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_private: false,
    max_members: 50,
    tags: [] as string[],
    welcome_message: '',
    rules: '',
    roadmap_slug: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Group name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Group name must be at least 3 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Group name must be less than 100 characters';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    if (formData.max_members < 1 || formData.max_members > 1000) {
      newErrors.max_members = 'Max members must be between 1 and 1000';
    }

    if (formData.welcome_message && formData.welcome_message.length > 500) {
      newErrors.welcome_message = 'Welcome message must be less than 500 characters';
    }

    if (formData.rules && formData.rules.length > 1000) {
      newErrors.rules = 'Rules must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await onCreateGroup(formData);
    if (success) {
      onClose();
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTagsChange = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
    if (errors.tags) {
      setErrors(prev => ({ ...prev, tags: '' }));
    }
  };

  return (
    <div className={groupsStyles.modalOverlay}>
      <div className={groupsStyles.modal}>
        <div className={groupsStyles.modalHeader}>
          <h2>Create Study Group</h2>
          <button 
            className={groupsStyles.closeButton}
            onClick={onClose}
            disabled={isCreating}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={groupsStyles.modalForm}>
          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>
              Group Name *
              <input
                type="text"
                className={groupsStyles.formInput}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter group name"
                maxLength={100}
                disabled={isCreating}
              />
              {errors.name && <span className={groupsStyles.errorText}>{errors.name}</span>}
            </label>
          </div>

          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>
              Description
              <textarea
                className={groupsStyles.formTextarea}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the purpose of this study group"
                maxLength={1000}
                rows={4}
                disabled={isCreating}
              />
              {errors.description && <span className={groupsStyles.errorText}>{errors.description}</span>}
            </label>
          </div>

          <div className={groupsStyles.formRow}>
            <div className={groupsStyles.formGroup}>
              <label className={groupsStyles.formLabel}>
                Visibility
                <select
                  className={groupsStyles.formSelect}
                  value={formData.is_private ? 'private' : 'public'}
                  onChange={(e) => handleInputChange('is_private', e.target.value === 'private')}
                  disabled={isCreating}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </label>
            </div>

            <div className={groupsStyles.formGroup}>
              <label className={groupsStyles.formLabel}>
                Max Members
                <input
                  type="number"
                  className={groupsStyles.formInput}
                  value={formData.max_members}
                  onChange={(e) => handleInputChange('max_members', parseInt(e.target.value))}
                  min={1}
                  max={1000}
                  disabled={isCreating}
                />
                {errors.max_members && <span className={groupsStyles.errorText}>{errors.max_members}</span>}
              </label>
            </div>
          </div>

          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>
              Tags
              <input
                type="text"
                className={groupsStyles.formInput}
                value={formData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="web3, blockchain, defi (comma separated)"
                disabled={isCreating}
              />
              <small className={groupsStyles.formHelp}>
                Add up to 5 tags separated by commas
              </small>
            </label>
          </div>

          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>
              Welcome Message
              <textarea
                className={groupsStyles.formTextarea}
                value={formData.welcome_message}
                onChange={(e) => handleInputChange('welcome_message', e.target.value)}
                placeholder="Welcome new members with a message"
                maxLength={500}
                rows={3}
                disabled={isCreating}
              />
              {errors.welcome_message && <span className={groupsStyles.errorText}>{errors.welcome_message}</span>}
            </label>
          </div>

          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>
              Group Rules
              <textarea
                className={groupsStyles.formTextarea}
                value={formData.rules}
                onChange={(e) => handleInputChange('rules', e.target.value)}
                placeholder="Set community guidelines and rules"
                maxLength={1000}
                rows={4}
                disabled={isCreating}
              />
              {errors.rules && <span className={groupsStyles.errorText}>{errors.rules}</span>}
            </label>
          </div>

          <div className={groupsStyles.modalActions}>
            <button
              type="button"
              className={groupsStyles.cancelButton}
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={groupsStyles.submitButton}
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ============================================================
// Source: EditGroupModal.tsx
// ============================================================
interface EditGroupModalProps {
  groupId: string;
  onClose: () => void;
  onUpdateGroup: (updatedGroup: any) => void;
}

export const EditGroupModal: React.FC<EditGroupModalProps> = ({
  groupId,
  onClose,
  onUpdateGroup
}) => {
  const { studyGroups } = useUserCommunity();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const group = studyGroups.find(g => g.id === groupId);
    if (group) {
      setFormData({
        name: group.name,
        description: group.description || '',
        tags: group.tags?.join(', ') || ''
      });
    }
  }, [groupId, studyGroups]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const updatedGroup = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    await onUpdateGroup(updatedGroup);
    setIsUpdating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={groupsStyles.modalOverlay}>
      <div className={groupsStyles.modal}>
        <div className={groupsStyles.modalHeader}>
          <h2 className={groupsStyles.modalTitle}>Edit Group</h2>
          <button 
            className={groupsStyles.closeButton}
            onClick={onClose}
            disabled={isUpdating}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={groupsStyles.modalForm}>
          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>Group Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={groupsStyles.formInput}
              required
              disabled={isUpdating}
            />
          </div>

          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={groupsStyles.formTextarea}
              rows={4}
              disabled={isUpdating}
            />
          </div>

          <div className={groupsStyles.formGroup}>
            <label className={groupsStyles.formLabel}>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={groupsStyles.formInput}
              placeholder="e.g., javascript, react, web-dev"
              disabled={isUpdating}
            />
          </div>

          <div className={groupsStyles.modalActions}>
            <button
              type="button"
              className={groupsStyles.cancelButton}
              onClick={onClose}
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={groupsStyles.submitButton}
              disabled={isUpdating || !formData.name.trim()}
            >
              {isUpdating ? 'Updating...' : 'Update Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ============================================================
// Source: GroupCard.tsx
// ============================================================
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
    <div className={groupsStyles.groupCard} onClick={handleCardClick}>
      <div className={groupsStyles.groupHeader}>
        <div className={groupsStyles.groupInfo}>
          <h3 className={groupsStyles.groupName}>{group.name}</h3>
          <p className={groupsStyles.groupDescription}>{group.description}</p>
          <div className={groupsStyles.groupMeta}>
            <span className={groupsStyles.memberCount}>{group.member_count} members</span>
            {group.is_private && <span className={groupsStyles.privateBadge}>Private</span>}
            {group.tags && group.tags.length > 0 && (
              <div className={groupsStyles.tags}>
                {group.tags.slice(0, 3).map((tag: any, index: any) => (
                  <span key={index} className={groupsStyles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        {group.group_avatar_url && (
          <img 
            src={group.group_avatar_url} 
            alt={group.name}
            className={groupsStyles.groupAvatar}
          />
        )}
      </div>

      <div className={groupsStyles.groupContent}>
        {group.welcome_message && (
          <div className={groupsStyles.welcomeMessage}>
            <p>{group.welcome_message}</p>
          </div>
        )}
      </div>

      {showActions && (
        <div className={groupsStyles.groupActions}>
          {!isMember && !isAdmin && (
            <button 
              className={groupsStyles.joinButton}
              onClick={handleJoin}
            >
              Join Group
            </button>
          )}
          
          {isMember && !isAdmin && (
            <button 
              className={groupsStyles.leaveButton}
              onClick={handleLeave}
            >
              Leave Group
            </button>
          )}

          {isAdmin && (
            <div className={groupsStyles.adminActions}>
              <button 
                className={groupsStyles.editButton}
                onClick={handleEdit}
              >
                Edit Group
              </button>
              {/* <button 
                className={groupsStyles.deleteButton}
                onClick={handleDelete}
              >
                Delete Group
              </button> */}
            </div>
          )}
        </div>
      )}

      <div className={groupsStyles.groupFooter}>
        <span className={groupsStyles.createdAt}>
          Created {new Date(group.created_at).toLocaleDateString()}
        </span>
        {group.roadmap_slug && (
          <span className={groupsStyles.roadmapLink}>
            📚 {group.roadmap_slug}
          </span>
        )}
      </div>
    </div>
  );
};


// ============================================================
// Source: GroupEditSection.tsx
// ============================================================
interface GroupEditSectionProps {
  group: StudyGroupWithMembership;
  onClose: () => void;
  onUpdateGroup: (updatedGroup: any) => void;
}

export const GroupEditSection: React.FC<GroupEditSectionProps> = ({
  group,
  onClose,
  onUpdateGroup
}) => {
  const [formData, setFormData] = useState({
    description: group.description || '',
    tags: group.tags?.join(', ') || '',
    welcome_message: group.welcome_message || '',
    rules: group.rules || '',
    is_private: group.is_private || false,
    is_active: group.is_active !== false, // Default to true
    max_members: group.max_members || 50,
    roadmap_slug: group.roadmap_slug || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const updatedGroup = {
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
      welcome_message: formData.welcome_message,
      rules: formData.rules,
      is_private: formData.is_private,
      is_active: formData.is_active,
      max_members: formData.max_members,
      roadmap_slug: formData.roadmap_slug
    };

    await onUpdateGroup(updatedGroup);
    setIsUpdating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  return (
    <section className={groupsStyles.groupSettings}>
      <div className={groupsStyles.settingsHeader}>
        <h3 className={groupsStyles.settingsTitle}>Group Settings</h3>
        <button 
          className={groupsStyles.closeSettings}
          onClick={onClose}
          disabled={isUpdating}
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className={groupsStyles.settingsForm}>
        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>Group Name (Read-only)</label>
          <input
            type="text"
            value={group.name}
            className={groupsStyles.formInput}
            disabled
            readOnly
          />
          <small className={groupsStyles.formHelp}>Group names cannot be changed after creation</small>
        </div>
        
        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={groupsStyles.formTextarea}
            rows={4}
            disabled={isUpdating}
            placeholder="Add a description for your group..."
          />
        </div>

        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>Welcome Message</label>
          <textarea
            name="welcome_message"
            value={formData.welcome_message}
            onChange={handleChange}
            className={groupsStyles.formTextarea}
            rows={2}
            disabled={isUpdating}
            placeholder="Welcome message for new members..."
          />
        </div>

        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>Group Rules</label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            className={groupsStyles.formTextarea}
            rows={3}
            disabled={isUpdating}
            placeholder="Rules and guidelines for group members..."
          />
        </div>
        
        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={groupsStyles.formInput}
            placeholder="e.g., javascript, react, web-dev"
            disabled={isUpdating}
          />
        </div>

        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>Roadmap Slug</label>
          <input
            type="text"
            name="roadmap_slug"
            value={formData.roadmap_slug}
            onChange={handleChange}
            className={groupsStyles.formInput}
            placeholder="e.g., dsa, web-development"
            disabled={isUpdating}
          />
        </div>

        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>Max Members</label>
          <input
            type="number"
            name="max_members"
            value={formData.max_members}
            onChange={handleChange}
            className={groupsStyles.formInput}
            min="1"
            max="1000"
            disabled={isUpdating}
          />
        </div>

        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>
            <input
              type="checkbox"
              name="is_private"
              checked={formData.is_private}
              onChange={handleChange}
              disabled={isUpdating}
            />
            {' '}Private Group
          </label>
          <small className={groupsStyles.formHelp}>Only approved members can join private groups</small>
        </div>

        <div className={groupsStyles.formGroup}>
          <label className={groupsStyles.formLabel}>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              disabled={isUpdating}
            />
            {' '}Active Group
          </label>
          <small className={groupsStyles.formHelp}>Inactive groups are hidden from discovery</small>
        </div>
        
        <div className={groupsStyles.settingsActions}>
          <button
            type="button"
            className={groupsStyles.cancelButton}
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={groupsStyles.saveButton}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  );
};


// ============================================================
// Source: GroupsList.tsx
// ============================================================
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

export const GroupsList: React.FC<GroupsListProps> = function GroupsList({
  userCreatedGroup,
  joinedGroups,
  allGroups,
  onJoinGroup,
  onLeaveGroup,
  onEditGroup,
  onDeleteGroup,
  loading = false
}) {
  const joinedGroupsOnly = joinedGroups.filter(g => g.user_role !== 'admin');
  const availableGroups = allGroups.filter(group => 
    !joinedGroups.some(joined => joined.id === group.id) 
    && (!userCreatedGroup || userCreatedGroup.id !== group.id)
  );

  if (loading) {
    return (
      <div className={groupsStyles.loadingState}>
        <div className={groupsStyles.spinner}></div>
        <p>Loading groups...</p>
      </div>
    );
  }

  return (
    <div>
      {/* My Created Group */}
      <section className={groupsStyles.section}>
        <h2 className={groupsStyles.sectionTitle}>
          My Group
          {userCreatedGroup && <span className={groupsStyles.sectionBadge}>1 Created</span>}
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
          <div className={groupsStyles.emptyState}>
            <h3>No Group Created</h3>
            <p>You haven't created a study group yet. Create your first group to start collaborating with others!</p>
          </div>
        )}
      </section>

      {/* Joined Groups */}
      {joinedGroupsOnly.length > 0 && (
        <section className={groupsStyles.section}>
          <h2 className={groupsStyles.sectionTitle}>
            Joined Groups
            <span className={groupsStyles.sectionBadge}>{joinedGroupsOnly.length} Joined</span>
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
        <section className={groupsStyles.section}>
          <h2 className={groupsStyles.sectionTitle}>
            Joined Groups
            <span className={groupsStyles.sectionBadge}>0 Joined</span>
          </h2>
          
          <div className={groupsStyles.emptyState}>
            <h3>No Groups Joined</h3>
            <p>You haven't joined any study groups yet. Browse available groups below to get started!</p>
          </div>
        </section>
      )}

      {/* All Available Groups */}
      {availableGroups.length > 0 && (
        <section className={groupsStyles.section}>
          <h2 className={groupsStyles.sectionTitle}>
            All Groups
            <span className={groupsStyles.sectionBadge}>{availableGroups.length} Available</span>
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
        <section className={groupsStyles.section}>
          <h2 className={groupsStyles.sectionTitle}>
            All Groups
            <span className={groupsStyles.sectionBadge}>0 Available</span>
          </h2>
          
          <div className={groupsStyles.emptyState}>
            <h3>No Groups Available</h3>
            <p>No study groups are available at the moment. Be the first to create one!</p>
          </div>
        </section>
      )}
    </div>
  );
};


// ============================================================
// Source: groupAchievements.tsx
// ============================================================
/**
 */
export function GroupAchievements() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <GroupHeader group={group} activeCategory="achievements" />
        <div className={groupsStyles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="achievement" />
        </div>
      </div>
    </div>
  );
}


// ============================================================
// Source: groupAnnouncements.tsx
// ============================================================
/**
 */
export function GroupAnnouncements() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <GroupHeader group={group} activeCategory="announcements" />
        <div className={groupsStyles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="announcement" />
        </div>
      </div>
    </div>
  );
}


// ============================================================
// Source: groupDetail.tsx
// ============================================================
/**
 */
export const CATEGORIES = [
  { id: 'discussions', label: 'Discussions' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'questions', label: 'Questions' },
  { id: 'resources', label: 'Resources' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'members', label: 'Members' },
];

/**
 * Shared loading state for group detail pages.
 */
export function GroupLoading() {
  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <div className={groupsStyles.loadingState}>
          <div className={groupsStyles.spinner} />
          <h2>Loading Group...</h2>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared error state for group detail pages.
 */
export function GroupNotFound({ onBack }: { onBack: () => void }) {
  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <div className={groupsStyles.errorContainer}>
          <h2 className={groupsStyles.errorTitle}>Group Not Found</h2>
          <p className={groupsStyles.errorText}>The study group you're looking for doesn't exist or you don't have access to it.</p>
          <button onClick={onBack} className={groupsStyles.backButton}>← Back to Groups</button>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared group header with avatar, metadata, tags, and category tabs.
 */
export function GroupHeader({ group, activeCategory }: { group: any; activeCategory: string }) {
  const router = useRouter();
  const groupId = router.query.id as string;

  return (
    <>
      {/* Group Header */}
      <div className={groupsStyles.groupHeader}>
        <div className={groupsStyles.groupInfo}>
          <button onClick={() => router.push('/groups')} className={groupsStyles.backButtonTop}>← Back to Groups</button>
          <h1 className={groupsStyles.groupName}>{group.name}</h1>
          <p className={groupsStyles.groupDescription}>{group.description}</p>
          <div className={groupsStyles.groupMeta}>
            <span className={groupsStyles.memberCount}>{group.member_count} members</span>
            <span className={groupsStyles.maxMembers}>Max: {group.max_members}</span>
            {group.is_private && <span className={groupsStyles.privateBadge}>Private</span>}
            {group.tags?.length > 0 && (
              <div className={groupsStyles.tags}>
                {group.tags.slice(0, 3).map((tag: string, i: number) => (
                  <span key={i} className={groupsStyles.tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        {group.group_avatar_url && (
          <img src={group.group_avatar_url} alt={group.name} className={groupsStyles.groupAvatar} />
        )}
      </div>

      {/* Welcome Message */}
      {group.welcome_message && (
        <div className={groupsStyles.welcomeSection}>
          <h3 className={groupsStyles.welcomeTitle}>Welcome Message</h3>
          <p className={groupsStyles.welcomeText}>{group.welcome_message}</p>
        </div>
      )}

      {/* Group Rules */}
      {group.rules && (
        <div className={groupsStyles.rulesSection}>
          <h3 className={groupsStyles.rulesTitle}>Group Rules</h3>
          <div className={groupsStyles.rulesContent}>
            {group.rules.split('\n').map((rule: string, i: number) => (
              <p key={i} className={groupsStyles.ruleItem}>• {rule}</p>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className={groupsStyles.categoryTabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${groupsStyles.categoryTab} ${cat.id === activeCategory ? groupsStyles.active : ''}`}
            onClick={() => router.push(`/groups/${groupId}/${cat.id}`)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </>
  );
}

/**
 * Hook to fetch a group by ID and return loading/error/group state.
 */
export function useGroupFetcher(groupId: string | undefined) {
  const [group, setGroup] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return { group, loading };
}


// ============================================================
// Source: groupDiscussions.tsx
// ============================================================
/**
 */
export function GroupDiscussions() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <GroupHeader group={group} activeCategory="discussions" />
        <div className={groupsStyles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="discussion" />
        </div>
      </div>
    </div>
  );
}


// ============================================================
// Source: groupMembers.tsx
// ============================================================
/**
 */
export function GroupMembers() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);
  const [members] = useState<any[]>([]);
  const [loadingMembers] = useState(false);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <GroupHeader group={group} activeCategory="members" />

        {/* Welcome Message */}
        {group.welcome_message && (
          <div className={groupsStyles.welcomeSection}>
            <h3 className={groupsStyles.welcomeTitle}>Welcome Message</h3>
            <p className={groupsStyles.welcomeText}>{group.welcome_message}</p>
          </div>
        )}

        {/* Group Rules */}
        {group.rules && (
          <div className={groupsStyles.rulesSection}>
            <h3 className={groupsStyles.rulesTitle}>Group Rules</h3>
            <div className={groupsStyles.rulesContent}>
              {group.rules.split('\n').map((rule: string, i: number) => (
                <p key={i} className={groupsStyles.ruleItem}>• {rule}</p>
              ))}
            </div>
          </div>
        )}

        {/* Members Section */}
        <div className={groupsStyles.membersSection}>
          <h3 className={groupsStyles.membersTitle}>Group Members ({members.length})</h3>
          {loadingMembers ? (
            <div className={groupsStyles.loadingMembers}>
              <div className={groupsStyles.spinner} />
              <p>Loading members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className={groupsStyles.noMembers}>
              <p>No members found in this group.</p>
            </div>
          ) : (
            <div className={groupsStyles.membersGrid}>
              {members.map((member: any) => (
                <div key={member.user_id} className={groupsStyles.memberCard}>
                  <div className={groupsStyles.memberAvatar}>
                    {member.profiles?.avatar_url ? (
                      <img src={member.profiles.avatar_url} alt={member.profiles.full_name || member.profiles.username} className={groupsStyles.avatarImage} />
                    ) : (
                      <div className={groupsStyles.defaultAvatar}>
                        {(member.profiles?.full_name || member.profiles?.username || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className={groupsStyles.memberInfo}>
                    <h4 className={groupsStyles.memberName}>{member.profiles?.full_name || member.profiles?.username || 'Unknown User'}</h4>
                    <p className={groupsStyles.memberUsername}>@{member.profiles?.username || 'unknown'}</p>
                    <p className={groupsStyles.memberBio}>{member.profiles?.bio || 'No bio available'}</p>
                    <div className={groupsStyles.memberMeta}>
                      <span className={groupsStyles.memberRole}>{member.role}</span>
                      <span className={groupsStyles.memberJoined}>Joined {new Date(member.joined_at).toLocaleDateString()}</span>
                    </div>
                    <div className={groupsStyles.memberSocial}>
                      {member.profiles?.github_username && (
                        <a href={`https://github.com/${member.profiles.github_username}`} target="_blank" rel="noopener noreferrer" className={groupsStyles.socialLink}>GitHub</a>
                      )}
                      {member.profiles?.linkedin_url && (
                        <a href={member.profiles.linkedin_url} target="_blank" rel="noopener noreferrer" className={groupsStyles.socialLink}>LinkedIn</a>
                      )}
                      {member.profiles?.website_url && (
                        <a href={member.profiles.website_url} target="_blank" rel="noopener noreferrer" className={groupsStyles.socialLink}>Website</a>
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


// ============================================================
// Source: groupQuestions.tsx
// ============================================================
/**
 */
export function GroupQuestions() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <GroupHeader group={group} activeCategory="questions" />
        <div className={groupsStyles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="question" />
        </div>
      </div>
    </div>
  );
}


// ============================================================
// Source: groupRedirect.tsx
// ============================================================
/**
 */
export function GroupRedirect() {
  const router = useRouter();
  const groupId = router.query.id as string;

  useEffect(() => {
    if (groupId) {
      router.replace(`/groups/${groupId}/discussions`);
    }
  }, [groupId, router]);

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <button onClick={() => router.push('/groups')} className={groupsStyles.backButtonTop}>← Back to Groups</button>
        <GroupLoading />
      </div>
    </div>
  );
}


// ============================================================
// Source: groupResources.tsx
// ============================================================
/**
 */
export function GroupResources() {
  const router = useRouter();
  const groupId = router.query.id as string;
  const { group, loading } = useGroupFetcher(groupId);

  if (loading) return <GroupLoading />;
  if (!group) return <GroupNotFound onBack={() => router.push('/groups')} />;

  return (
    <div className={groupsStyles.page}>
      <div className={groupsStyles.container}>
        <GroupHeader group={group} activeCategory="resources" />
        <div className={groupsStyles.discussionContent}>
          <GiscusComments groupId={groupId} groupName={group.name} category="resource" />
        </div>
      </div>
    </div>
  );
}


// ============================================================
// Source: groups.tsx
// ============================================================
/**
 */
export function GroupsPage() {
  const user = null;
  const [userCreatedGroup, setUserCreatedGroup] = useState<any>(null);
  const [studyGroups, setStudyGroups] = useState<any[]>([]);
  const [publicGroups, setPublicGroups] = useState<any[]>([]);
  const [canCreateGroup, setCanCreateGroup] = useState(true);
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState<any[]>([]);

  useEffect(() => {
    if (false) {
      loadGroups();
    } else {
      setLoading(false);
    }
  }, []);

  const loadGroups = async () => {
    try {
      setLoading(true);
      setStudyGroups([]);
      setPublicGroups([]);
    } catch (error) {
      // Error loading groups
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilteredGroups(
      publicGroups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );
  }, [searchQuery, publicGroups]);

  const createGroupWithGiscus = async (groupData: any) => {
    return false;
  };

  const joinStudyGroup = async (groupId: string) => { return false; };
  const leaveStudyGroup = async (groupId: string) => { return false; };
  const deleteGroupFn = async (groupId: string) => { return false; };
  const updateGroupFn = async (groupId: string, groupData: any) => { return false; };

  return (
      <div className={groupsStyles.page}>
        <div className={groupsStyles.container}>
          {/* Header */}
          <div className={groupsStyles.header}>
            <h1 className={groupsStyles.title}>Study Groups</h1>
            <p className={groupsStyles.articlesDescription}>
              Connect with learners, share knowledge, and accelerate your learning journey through collaborative study groups.
            </p>
          </div>

          {/* Search */}
          <div className={groupsStyles.searchSection}>
            <div className={groupsStyles.searchContainer}>
              <input
                type="text"
                className={groupsStyles.searchInput}
                placeholder="Search groups by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={groupsStyles.filterButton}>🔍 Filter</button>
            </div>
          </div>

          {/* Create Group */}
          <div className={groupsStyles.createSection}>
            <h2 className={groupsStyles.sectionTitle}>Create Your Study Group</h2>
            <div className={groupsStyles.createCard}>
              <div className={groupsStyles.createContent}>
                <h3>Start Learning Together</h3>
                <p>Create a study group to collaborate with others and accelerate your learning journey.</p>
                <button
                  className={groupsStyles.createButton}
                  onClick={() => setIsCreateModalOpen(true)}
                  disabled={isCreatingGroup || !canCreateGroup}
                  title={!canCreateGroup ? 'You can only create one study group' : ''}
                >
                  {isCreatingGroup ? 'Creating...' : userCreatedGroup ? '✓ Group Created' : '+ Create Group'}
                </button>
              </div>
            </div>
          </div>

          {/* Edit Section */}
          {editingGroupId && userCreatedGroup && (
            <GroupEditSection
              group={{ ...userCreatedGroup, user_role: 'admin', joined_at: userCreatedGroup.created_at }}
              onClose={() => setEditingGroupId(null)}
              onUpdateGroup={async (updatedGroup: any) => {
                const success = await updateGroupFn(userCreatedGroup.id, updatedGroup);
                if (success) setEditingGroupId(null);
              }}
            />
          )}

          {/* Groups List */}
          <GroupsList
            userCreatedGroup={userCreatedGroup ? { ...userCreatedGroup, user_role: 'admin', joined_at: userCreatedGroup.created_at } : null}
            joinedGroups={studyGroups.filter(g => g.user_role !== 'admin')}
            allGroups={filteredGroups}
            onJoinGroup={joinStudyGroup}
            onLeaveGroup={leaveStudyGroup}
            onEditGroup={setEditingGroupId}
            onDeleteGroup={deleteGroupFn}
            loading={loading}
          />

          {/* Create Modal */}
          {isCreateModalOpen && (
            <CreateGroupModal
              onClose={() => setIsCreateModalOpen(false)}
              onCreateGroup={createGroupWithGiscus}
              isCreating={isCreatingGroup}
            />
          )}
        </div>

      </div>
  );
}


// ============================================================
// Source: index.ts
// ============================================================
;
