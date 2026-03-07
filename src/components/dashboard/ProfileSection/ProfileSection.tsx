import React, { useState } from 'react';
import { useUserProfile } from '../../../hooks/useUserProfile';
import styles from './ProfileSection.module.css';

export const ProfileSection: React.FC = () => {
  const { profile, preferences, loading, error, updateProfile, updatePreferences, uploadAvatar } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    bio: '',
    github_username: '',
    linkedin_url: '',
    website_url: '',
    location: '',
    mentorship_areas: [] as string[],
  });

  React.useEffect(() => {
    if (profile) {
      setEditForm({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        github_username: profile.github_username || '',
        linkedin_url: profile.linkedin_url || '',
        website_url: profile.website_url || '',
        location: profile.location || '',
        mentorship_areas: profile.mentorship_areas || [],
      });
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    const success = await updateProfile(editForm);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  const handleMentorshipAreasChange = (area: string) => {
    setEditForm(prev => ({
      ...prev,
      mentorship_areas: prev.mentorship_areas.includes(area)
        ? prev.mentorship_areas.filter(a => a !== area)
        : [...prev.mentorship_areas, area]
    }));
  };

  if (loading) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Profile Information</h2>
        </div>
        <div className={styles.loadingState}>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
          <div className={styles.skeleton}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Profile Information</h2>
        </div>
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Profile Information</h2>
        </div>
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>No profile information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Profile Information</h2>
        <button
          className={styles.editButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Profile Avatar"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {profile.full_name?.charAt(0) || profile.username?.charAt(0) || 'U'}
              </div>
            )}
          </div>
          {isEditing && (
            <div className={styles.avatarUpload}>
              <label htmlFor="avatar-upload" className={styles.uploadButton}>
                Upload Avatar
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className={styles.fileInput}
              />
            </div>
          )}
        </div>

        <div className={styles.profileDetails}>
          {isEditing ? (
            <div className={styles.editForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Full Name</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={editForm.full_name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bio</label>
                <textarea
                  className={styles.formTextarea}
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  maxLength={500}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>GitHub Username</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={editForm.github_username}
                  onChange={(e) => setEditForm(prev => ({ ...prev, github_username: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>LinkedIn URL</label>
                <input
                  type="url"
                  className={styles.formInput}
                  value={editForm.linkedin_url}
                  onChange={(e) => setEditForm(prev => ({ ...prev, linkedin_url: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Website URL</label>
                <input
                  type="url"
                  className={styles.formInput}
                  value={editForm.website_url}
                  onChange={(e) => setEditForm(prev => ({ ...prev, website_url: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Location</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Mentorship Areas</label>
                <div className={styles.mentorshipAreas}>
                  {['Frontend', 'Backend', 'Full-Stack', 'DevOps', 'AI/ML', 'Mobile', 'System Design'].map(area => (
                    <label key={area} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={editForm.mentorship_areas.includes(area)}
                        onChange={() => handleMentorshipAreasChange(area)}
                        className={styles.checkbox}
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.saveButton}
                  onClick={handleSaveProfile}
                >
                  Save Changes
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.profileInfo}>
              <div className={styles.infoGroup}>
                <h3 className={styles.infoLabel}>Name</h3>
                <p className={styles.infoValue}>{profile.full_name || 'Not set'}</p>
              </div>

              <div className={styles.infoGroup}>
                <h3 className={styles.infoLabel}>Username</h3>
                <p className={styles.infoValue}>@{profile.username || 'Not set'}</p>
              </div>

              <div className={styles.infoGroup}>
                <h3 className={styles.infoLabel}>Bio</h3>
                <p className={styles.infoValue}>{profile.bio || 'No bio provided'}</p>
              </div>

              <div className={styles.infoGroup}>
                <h3 className={styles.infoLabel}>Location</h3>
                <p className={styles.infoValue}>{profile.location || 'Not set'}</p>
              </div>

              <div className={styles.infoGroup}>
                <h3 className={styles.infoLabel}>Social Links</h3>
                <div className={styles.socialLinks}>
                  {profile.github_username && (
                    <a
                      href={`https://github.com/${profile.github_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      GitHub: @{profile.github_username}
                    </a>
                  )}
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      LinkedIn
                    </a>
                  )}
                  {profile.website_url && (
                    <a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      Website
                    </a>
                  )}
                  {!profile.github_username && !profile.linkedin_url && !profile.website_url && (
                    <p className={styles.infoValue}>No social links added</p>
                  )}
                </div>
              </div>

              {profile.is_mentor && (
                <div className={styles.infoGroup}>
                  <h3 className={styles.infoLabel}>Mentorship Areas</h3>
                  <div className={styles.mentorshipTags}>
                    {profile.mentorship_areas.length > 0 ? (
                      profile.mentorship_areas.map(area => (
                        <span key={area} className={styles.mentorshipTag}>
                          {area}
                        </span>
                      ))
                    ) : (
                      <p className={styles.infoValue}>No mentorship areas specified</p>
                    )}
                  </div>
                </div>
              )}

              <div className={styles.infoGroup}>
                <h3 className={styles.infoLabel}>Account Status</h3>
                <div className={styles.statusBadges}>
                  <span className={`${styles.statusBadge} ${profile.is_public ? styles.public : styles.private}`}>
                    {profile.is_public ? 'Public Profile' : 'Private Profile'}
                  </span>
                  {profile.is_mentor && (
                    <span className={`${styles.statusBadge} ${styles.mentor}`}>
                      Mentor
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.infoGroup}>
                <h3 className={styles.infoLabel}>Member Since</h3>
                <p className={styles.infoValue}>
                  {new Date(profile.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
