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
import { Button, Input, PageHeader } from '@/presentation/__components';

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

  if (loading) return <div className="p-6">Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile form submitted (auth removed - no submit action)');
  };

  const updateField = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader title="Profile" subtitle="Manage your personal information"
        actions={
          <Button variant={isEditing ? 'secondary' : 'primary'} onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        }
      />
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Email</label>
            <Input disabled />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Username</label>
            <Input name="username" value={formData.username} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Full Name</label>
            <Input name="full_name" value={formData.full_name} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          </div>
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-[10px] font-semibold uppercase tracking-[0.6px] text-[#76777d]">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} rows={3}
              className="w-full border border-[#e5e5e5] px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#572EFF]/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">GitHub</label>
            <Input name="github_username" value={formData.github_username} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">LinkedIn URL</label>
            <Input name="linkedin_url" value={formData.linkedin_url} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Website</label>
            <Input name="website_url" value={formData.website_url} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Location</label>
            <Input name="location" value={formData.location} onChange={(e) => updateField(e.target.name, e.target.value)} disabled={!isEditing} />
          </div>
        </div>
        {isEditing && (
          <div className="mt-6">
            <Button type="submit">Save Profile</Button>
          </div>
        )}
      </form>
    </div>
  );
}
