/**
 * ## Profile
 *
 * Profile feature module.
 * Contains all components, types, and logic for the profile domain.
 *
 * @packageDocumentation
 * @module profile
 */

'use client';

import React, { useState } from 'react';
import { PageFrame } from '../_components/components.layout';
import { Button, Input, PageHeader } from '../_components/components.atomic';

// ============================================================
// Source: profile.tsx
// ============================================================
export function ProfilePage() {
  const user = null;
  const loading = false;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '', full_name: '', bio: '', github_username: '',
    linkedin_url: '', website_url: '', location: '',
    timezone: 'UTC', preferred_language: 'en',
    is_mentor: false, mentorship_areas: [] as string[], is_public: true
  });

  if (loading) return <PageFrame>Loading...</PageFrame>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile form submitted (auth removed - no submit action)');
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
          <Input label="Email" disabled />
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
