import React, { useState } from 'react';
import { StudyGroup } from '../../application/types/database.types';
import styles from '../_styles/components/groups/Groups.module.css';

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
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Create Study Group</h2>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            disabled={isCreating}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Group Name *
              <input
                type="text"
                className={styles.formInput}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter group name"
                maxLength={100}
                disabled={isCreating}
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Description
              <textarea
                className={styles.formTextarea}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the purpose of this study group"
                maxLength={1000}
                rows={4}
                disabled={isCreating}
              />
              {errors.description && <span className={styles.errorText}>{errors.description}</span>}
            </label>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Visibility
                <select
                  className={styles.formSelect}
                  value={formData.is_private ? 'private' : 'public'}
                  onChange={(e) => handleInputChange('is_private', e.target.value === 'private')}
                  disabled={isCreating}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </label>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Max Members
                <input
                  type="number"
                  className={styles.formInput}
                  value={formData.max_members}
                  onChange={(e) => handleInputChange('max_members', parseInt(e.target.value))}
                  min={1}
                  max={1000}
                  disabled={isCreating}
                />
                {errors.max_members && <span className={styles.errorText}>{errors.max_members}</span>}
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Tags
              <input
                type="text"
                className={styles.formInput}
                value={formData.tags.join(', ')}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="web3, blockchain, defi (comma separated)"
                disabled={isCreating}
              />
              <small className={styles.formHelp}>
                Add up to 5 tags separated by commas
              </small>
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Welcome Message
              <textarea
                className={styles.formTextarea}
                value={formData.welcome_message}
                onChange={(e) => handleInputChange('welcome_message', e.target.value)}
                placeholder="Welcome new members with a message"
                maxLength={500}
                rows={3}
                disabled={isCreating}
              />
              {errors.welcome_message && <span className={styles.errorText}>{errors.welcome_message}</span>}
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Group Rules
              <textarea
                className={styles.formTextarea}
                value={formData.rules}
                onChange={(e) => handleInputChange('rules', e.target.value)}
                placeholder="Set community guidelines and rules"
                maxLength={1000}
                rows={4}
                disabled={isCreating}
              />
              {errors.rules && <span className={styles.errorText}>{errors.rules}</span>}
            </label>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
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
