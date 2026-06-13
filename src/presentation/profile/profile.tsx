/**
 * ## Presentation: Profile Page
 *
 * User profile page displaying account details,
 * settings, and activity history.
 *
 * @packageDocumentation
 */

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../infrastructure/supabase';
import { PageFrame } from '../_components/components.layout';
import { PageHeader, Input, Button } from '../_components/components.atomic';

/**
 * Profile page component
 */
export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '', full_name: '', bio: '', github_username: '',
    linkedin_url: '', website_url: '', location: '',
    timezone: 'UTC', preferred_language: 'en',
    is_mentor: false, mentorship_areas: [] as string[], is_public: true
  });

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setFormData(prev => ({
        ...prev,
        username: meta.username || '', full_name: meta.full_name || '',
        bio: meta.bio || '', github_username: meta.github_username || meta.user_name || '',
        linkedin_url: meta.linkedin_url || '', website_url: meta.website_url || '',
        location: meta.location || '', timezone: meta.timezone || 'UTC',
        preferred_language: meta.preferred_language || 'en',
        is_mentor: meta.is_mentor || false, is_public: meta.is_public !== undefined ? meta.is_public : true,
      }));
    }
  }, [user]);

  if (loading) return <PageFrame><div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-[#572EFF] border-t-transparent rounded-full" /></div></PageFrame>;
  if (!user) return <PageFrame><div className="text-center py-12"><h2 className="text-xl font-semibold mb-2">Authentication Required</h2><p className="text-gray-500">Please sign in to view your profile.</p></div></PageFrame>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      const { error } = await supabase.auth.updateUser({ data: formData });
      if (error) alert('Error updating profile.');
      else { setIsEditing(false); alert('Profile updated!'); }
    } catch { alert('An error occurred.'); }
  };

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <PageFrame>
      <PageHeader title="Profile" subtitle="Manage your personal information"
        actions={
          <Button variant={isEditing ? 'secondary' : 'primary'} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        }
      />
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Email" value={user.email || ''} disabled />
          <Input label="Username" name="username" value={formData.username} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          <Input label="Full Name" name="full_name" value={formData.full_name} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.6px] text-[#76777d]">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} rows={3}
              className="w-full border border-[#e5e5e5] px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572EFF]/20"
            />
          </div>
          <Input label="GitHub" name="github_username" value={formData.github_username} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          <Input label="LinkedIn URL" name="linkedin_url" value={formData.linkedin_url} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          <Input label="Website" name="website_url" value={formData.website_url} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          <Input label="Location" name="location" value={formData.location} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
        </div>
        {isEditing && (
          <div className="mt-6">
            <Button type="submit">Save Profile</Button>
          </div>
        )}
      </form>
    </PageFrame>
  );
}
