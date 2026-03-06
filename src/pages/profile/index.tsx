import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar } from '../../components/navbar/Navbar';
import { supabase } from '../../utils/supabase';
import styles from './Profile.module.css';

export default function Profile() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    bio: '',
    github_username: '',
    linkedin_url: '',
    website_url: '',
    location: '',
    timezone: 'UTC',
    preferred_language: 'en',
    is_mentor: false,
    mentorship_areas: [] as string[],
    is_public: true
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load user profile data
    if (user) {
      setFormData({
        username: user.user_metadata?.username || '',
        full_name: user.user_metadata?.full_name || '',
        bio: user.user_metadata?.bio || '',
        github_username: user.user_metadata?.github_username || user.user_metadata?.user_name || '',
        linkedin_url: user.user_metadata?.linkedin_url || '',
        website_url: user.user_metadata?.website_url || '',
        location: user.user_metadata?.location || '',
        timezone: user.user_metadata?.timezone || 'UTC',
        preferred_language: user.user_metadata?.preferred_language || 'en',
        is_mentor: user.user_metadata?.is_mentor || false,
        mentorship_areas: user.user_metadata?.mentorship_areas || [],
        is_public: user.user_metadata?.is_public !== undefined ? user.user_metadata?.is_public : true
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          user_metadata: formData
        }
      });

      if (error) {
        console.error('Profile update error:', error);
        alert('Error updating profile. Please try again.');
      } else {
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) {
    return (
      <>
        {/* <Navbar /> */}
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        {/* <Navbar /> */}
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Authentication Required</h2>
          <p className={styles.errorText}>Please sign in to view your profile.</p>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.profileCard}>
            <div className={styles.header}>
              <h1 className={styles.title}>Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={styles.editButton}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleTextAreaChange}
                    disabled={!isEditing}
                    rows={4}
                    className={styles.textarea}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>GitHub Username</label>
                  <input
                    type="text"
                    name="github_username"
                    value={formData.github_username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>LinkedIn URL</label>
                  <input
                    type="url"
                    name="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Website URL</label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Timezone</label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleSelectChange}
                    disabled={!isEditing}
                    className={styles.select}
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">EST</option>
                    <option value="PST">PST</option>
                    <option value="IST">IST</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Language</label>
                  <select
                    name="preferred_language"
                    value={formData.preferred_language}
                    onChange={handleSelectChange}
                    disabled={!isEditing}
                    className={styles.select}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>

                <div className={styles.formGroupFull}>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      name="is_mentor"
                      checked={formData.is_mentor}
                      onChange={handleCheckboxChange}
                      disabled={!isEditing}
                      className={styles.checkbox}
                    />
                    <label className={styles.checkboxLabel}>
                      Available as mentor
                    </label>
                  </div>
                </div>

                <div className={styles.formGroupFull}>
                  <div className={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      name="is_public"
                      checked={formData.is_public}
                      onChange={handleCheckboxChange}
                      disabled={!isEditing}
                      className={styles.checkbox}
                    />
                    <label className={styles.checkboxLabel}>
                      Make profile public
                    </label>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className={styles.submitSection}>
                  <button
                    type="submit"
                    className={styles.submitButton}
                  >
                    Save Profile
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
