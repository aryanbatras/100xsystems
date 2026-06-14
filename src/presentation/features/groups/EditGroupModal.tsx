import React, { useState, useEffect } from 'react';
import { useUserCommunity } from '../../../application/hooks';
import styles from '../../_styles/components/groups/EditGroupModal.module.css';;

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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Edit Group</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            disabled={isUpdating}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Group Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
              disabled={isUpdating}
            />
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

          <div className={styles.modalActions}>
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
              className={styles.submitButton}
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
