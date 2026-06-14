import React, { useState, useEffect } from 'react';
import { StudyGroupWithMembership } from '../../application/types/database.types';
import styles from '../_styles/components/groups/GroupEditSection.module.css';;

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
    <section className={styles.groupSettings}>
      <div className={styles.settingsHeader}>
        <h3 className={styles.settingsTitle}>Group Settings</h3>
        <button 
          className={styles.closeSettings}
          onClick={onClose}
          disabled={isUpdating}
        >
          ×
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.settingsForm}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Group Name (Read-only)</label>
          <input
            type="text"
            value={group.name}
            className={styles.formInput}
            disabled
            readOnly
          />
          <small className={styles.formHelp}>Group names cannot be changed after creation</small>
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.formTextarea}
            rows={4}
            disabled={isUpdating}
            placeholder="Add a description for your group..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Welcome Message</label>
          <textarea
            name="welcome_message"
            value={formData.welcome_message}
            onChange={handleChange}
            className={styles.formTextarea}
            rows={2}
            disabled={isUpdating}
            placeholder="Welcome message for new members..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Group Rules</label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            className={styles.formTextarea}
            rows={3}
            disabled={isUpdating}
            placeholder="Rules and guidelines for group members..."
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="e.g., javascript, react, web-dev"
            disabled={isUpdating}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Roadmap Slug</label>
          <input
            type="text"
            name="roadmap_slug"
            value={formData.roadmap_slug}
            onChange={handleChange}
            className={styles.formInput}
            placeholder="e.g., dsa, web-development"
            disabled={isUpdating}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Max Members</label>
          <input
            type="number"
            name="max_members"
            value={formData.max_members}
            onChange={handleChange}
            className={styles.formInput}
            min="1"
            max="1000"
            disabled={isUpdating}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            <input
              type="checkbox"
              name="is_private"
              checked={formData.is_private}
              onChange={handleChange}
              disabled={isUpdating}
            />
            {' '}Private Group
          </label>
          <small className={styles.formHelp}>Only approved members can join private groups</small>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              disabled={isUpdating}
            />
            {' '}Active Group
          </label>
          <small className={styles.formHelp}>Inactive groups are hidden from discovery</small>
        </div>
        
        <div className={styles.settingsActions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </section>
  );
};
