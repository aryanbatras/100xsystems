import React, { useState, useEffect } from 'react';
import { StudyGroupWithMembership } from '../../services/types/database';
import styles from './Groups.module.css';

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
    tags: group.tags?.join(', ') || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const updatedGroup = {
      description: formData.description,
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
