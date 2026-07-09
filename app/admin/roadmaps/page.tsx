'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/presentation/_styles/css/admin-roadmaps.module.css';

interface RoadmapMeta {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  sections: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'foundation' | 'systems' | 'development' | 'patterns' | 'devops' | 'ai' | 'leadership';
  level: number;
  prerequisites: string[];
  outcomes: string[];
  skills: string[];
  technologies: string[];
  learningObjectives: string[];
  keyProjects: string[];
  assessmentCriteria: string[];
  author?: string;
  tags: string[];
  lastUpdated: string;
  version: string;
  totalArticles: number;
  estimatedHours: number;
  difficultyScore: number;
  discussionEnabled: boolean;
  mentorshipAvailable: boolean;
  communityResources: string[];
  certificateAvailable: boolean;
  certificateRequirements: string[];
}

export default function AdminRoadmaps() {
  const [roadmaps, setRoadmaps] = useState<Record<string, RoadmapMeta>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'learning' | 'community' | 'certification'>('basic');

  const [formData, setFormData] = useState({
    title: '', description: '', longDescription: '', sections: '', estimatedTime: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    category: 'foundation' as 'foundation' | 'systems' | 'development' | 'patterns' | 'devops' | 'ai' | 'leadership',
    level: 1, prerequisites: '', outcomes: '', skills: '', technologies: '',
    learningObjectives: '', keyProjects: '', assessmentCriteria: '',
    author: '', tags: '', version: '1.0.0',
    totalArticles: 0, estimatedHours: 0, difficultyScore: 30,
    discussionEnabled: true, mentorshipAvailable: false, communityResources: '',
    certificateAvailable: false, certificateRequirements: '',
  });

  useEffect(() => { fetchRoadmaps(); }, []);
  useEffect(() => { if (notification) { const t = setTimeout(() => setNotification(null), 3000); return () => clearTimeout(t); } }, [notification]);

  const showNotification = (type: 'success' | 'error', message: string) => setNotification({ type, message });

  const fetchRoadmaps = async () => {
    try {
      const response = await fetch('/api/admin/roadmaps');
      setRoadmaps(response.ok ? await response.json() : {});
    } catch (error) { setRoadmaps({}); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const roadmapData = {
      slug, title: formData.title, description: formData.description, longDescription: formData.longDescription || undefined,
      sections: formData.sections.split(',').map(s => s.trim()).filter(Boolean),
      estimatedTime: formData.estimatedTime, difficulty: formData.difficulty, category: formData.category, level: formData.level,
      prerequisites: formData.prerequisites.split(',').map(s => s.trim()).filter(Boolean),
      outcomes: formData.outcomes.split(',').map(s => s.trim()).filter(Boolean),
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
      learningObjectives: formData.learningObjectives.split('\n').filter(Boolean),
      keyProjects: formData.keyProjects.split('\n').filter(Boolean),
      assessmentCriteria: formData.assessmentCriteria.split('\n').filter(Boolean),
      author: formData.author || undefined, tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      version: formData.version, totalArticles: formData.totalArticles, estimatedHours: formData.estimatedHours,
      difficultyScore: formData.difficultyScore, discussionEnabled: formData.discussionEnabled,
      mentorshipAvailable: formData.mentorshipAvailable,
      communityResources: formData.communityResources.split('\n').filter(Boolean),
      certificateAvailable: formData.certificateAvailable,
      certificateRequirements: formData.certificateRequirements.split('\n').filter(Boolean),
    };

    try {
      const response = await fetch('/api/admin/roadmaps', {
        method: editingRoadmap ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roadmapData),
      });
      if (response.ok) { await fetchRoadmaps(); resetForm(); showNotification('success', `Roadmap ${editingRoadmap ? 'updated' : 'created'} successfully!`); }
      else { const d = await response.json(); showNotification('error', d.error || 'Failed to save roadmap'); }
    } catch (error) { showNotification('error', 'Failed to save roadmap.'); }
    finally { setIsSubmitting(false); }
  };

  const handleEdit = (roadmap: RoadmapMeta) => {
    setEditingRoadmap(roadmap.slug);
    setFormData({
      title: roadmap.title, description: roadmap.description, longDescription: roadmap.longDescription || '',
      sections: roadmap.sections.join(', '), estimatedTime: roadmap.estimatedTime, difficulty: roadmap.difficulty,
      category: roadmap.category, level: roadmap.level, prerequisites: roadmap.prerequisites.join(', '),
      outcomes: roadmap.outcomes.join(', '), skills: roadmap.skills.join(', '), technologies: roadmap.technologies.join(', '),
      learningObjectives: roadmap.learningObjectives.join('\n'), keyProjects: roadmap.keyProjects.join('\n'),
      assessmentCriteria: roadmap.assessmentCriteria.join('\n'), author: roadmap.author || '',
      tags: roadmap.tags.join(', '), version: roadmap.version, totalArticles: roadmap.totalArticles,
      estimatedHours: roadmap.estimatedHours, difficultyScore: roadmap.difficultyScore,
      discussionEnabled: roadmap.discussionEnabled, mentorshipAvailable: roadmap.mentorshipAvailable,
      communityResources: roadmap.communityResources.join('\n'), certificateAvailable: roadmap.certificateAvailable,
      certificateRequirements: roadmap.certificateRequirements.join('\n'),
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this roadmap?')) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/roadmaps?slug=${slug}`, { method: 'DELETE' });
      if (response.ok) { await fetchRoadmaps(); showNotification('success', 'Roadmap deleted successfully!'); }
      else { const d = await response.json(); showNotification('error', d.error || 'Failed to delete roadmap'); }
    } catch (error) { showNotification('error', 'Failed to delete roadmap.'); }
    finally { setIsSubmitting(false); }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', longDescription: '', sections: '', estimatedTime: '', difficulty: 'beginner', category: 'foundation', level: 1, prerequisites: '', outcomes: '', skills: '', technologies: '', learningObjectives: '', keyProjects: '', assessmentCriteria: '', author: '', tags: '', version: '1.0.0', totalArticles: 0, estimatedHours: 0, difficultyScore: 30, discussionEnabled: true, mentorshipAvailable: false, communityResources: '', certificateAvailable: false, certificateRequirements: '' });
    setShowCreateForm(false); setEditingRoadmap(null); setActiveTab('basic');
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}><div className={styles.loading}>Loading roadmaps...</div></div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <Link href="/admin-dashboard" className={styles.backLink}>← Back to Admin</Link>
            <h1 className={styles.title}>Roadmap Management</h1>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.stats}><span>{Object.keys(roadmaps).length} roadmaps</span></div>
            <button onClick={() => setShowCreateForm(true)} className={styles.createButton} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Create New Roadmap'}
            </button>
          </div>
        </div>

        {notification && <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>}

        {showCreateForm && (
          <div className={styles.formSection}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{editingRoadmap ? 'Edit Roadmap' : 'Create New Roadmap'}</h2>
                <button onClick={resetForm} className={styles.closeButton} disabled={isSubmitting}>×</button>
              </div>
              <div className={styles.tabNavigation}>
                {(['basic', 'learning', 'community', 'certification'] as const).map(tab => (
                  <button key={tab} className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab === 'basic' ? 'Basic Info' : tab === 'learning' ? 'Learning Structure' : tab === 'community' ? 'Community' : 'Certification'}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className={styles.form}>
                {activeTab === 'basic' && (
                  <div className={styles.tabContent}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}><label htmlFor="title">Title *</label><input type="text" id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className={styles.input} disabled={isSubmitting} placeholder="e.g., Foundation in JavaScript" /></div>
                      <div className={styles.formGroup}><label htmlFor="category">Category *</label><select id="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className={styles.select} disabled={isSubmitting}><option value="foundation">Foundation</option><option value="systems">Systems</option><option value="development">Development</option><option value="patterns">Patterns</option><option value="devops">DevOps</option><option value="ai">AI</option><option value="leadership">Leadership</option></select></div>
                    </div>
                    <div className={styles.formGroup}><label htmlFor="description">Short Description *</label><textarea id="description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required rows={2} className={styles.textarea} disabled={isSubmitting} placeholder="Brief overview of this roadmap (max 200 chars)" /></div>
                    <div className={styles.formGroup}><label htmlFor="longDescription">Long Description</label><textarea id="longDescription" value={formData.longDescription} onChange={e => setFormData({...formData, longDescription: e.target.value})} rows={4} className={styles.textarea} disabled={isSubmitting} placeholder="Detailed description" /></div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}><label htmlFor="level">Level (1-9) *</label><select id="level" value={formData.level} onChange={e => setFormData({...formData, level: parseInt(e.target.value)})} className={styles.select} disabled={isSubmitting}>{[1,2,3,4,5,6,7,8,9].map(l => <option key={l} value={l}>Level {l} {l <= 3 ? '(Beginner)' : l <= 6 ? '(Intermediate)' : '(Advanced)'}</option>)}</select></div>
                      <div className={styles.formGroup}><label htmlFor="difficulty">Difficulty *</label><select id="difficulty" value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value as any})} className={styles.select} disabled={isSubmitting}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
                    </div>
                    <div className={styles.formGroup}><label htmlFor="sections">Sections (comma-separated) *</label><input type="text" id="sections" value={formData.sections} onChange={e => setFormData({...formData, sections: e.target.value})} placeholder="arrays, linked-lists, trees, graphs" required className={styles.input} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="estimatedTime">Estimated Time *</label><input type="text" id="estimatedTime" value={formData.estimatedTime} onChange={e => setFormData({...formData, estimatedTime: e.target.value})} placeholder="3-6 months" required className={styles.input} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="difficultyScore">Difficulty Score (1-100)</label><input type="range" id="difficultyScore" value={formData.difficultyScore} onChange={e => setFormData({...formData, difficultyScore: parseInt(e.target.value)})} min={1} max={100} className={styles.range} disabled={isSubmitting} /><span className={styles.rangeValue}>{formData.difficultyScore}</span></div>
                    <div className={styles.formGroup}><label htmlFor="prerequisites">Prerequisites (comma-separated roadmap slugs)</label><input type="text" id="prerequisites" value={formData.prerequisites} onChange={e => setFormData({...formData, prerequisites: e.target.value})} placeholder="foundation-javascript, basic-systems" className={styles.input} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="outcomes">Learning Outcomes (comma-separated)</label><input type="text" id="outcomes" value={formData.outcomes} onChange={e => setFormData({...formData, outcomes: e.target.value})} placeholder="deep understanding of JS" className={styles.input} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="skills">Skills Gained (comma-separated)</label><input type="text" id="skills" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} placeholder="javascript, react, node.js" className={styles.input} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="technologies">Technologies Covered (comma-separated)</label><input type="text" id="technologies" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="JavaScript, React, Node.js" className={styles.input} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="tags">Tags (comma-separated)</label><input type="text" id="tags" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="frontend, backend" className={styles.input} disabled={isSubmitting} /></div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}><label htmlFor="author">Author</label><input type="text" id="author" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="John Doe" className={styles.input} disabled={isSubmitting} /></div>
                      <div className={styles.formGroup}><label htmlFor="version">Version</label><input type="text" id="version" value={formData.version} onChange={e => setFormData({...formData, version: e.target.value})} placeholder="1.0.0" className={styles.input} disabled={isSubmitting} /></div>
                    </div>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}><label htmlFor="totalArticles">Total Articles</label><input type="number" id="totalArticles" value={formData.totalArticles} onChange={e => setFormData({...formData, totalArticles: parseInt(e.target.value) || 0})} min={0} className={styles.input} disabled={isSubmitting} /></div>
                      <div className={styles.formGroup}><label htmlFor="estimatedHours">Estimated Hours</label><input type="number" id="estimatedHours" value={formData.estimatedHours} onChange={e => setFormData({...formData, estimatedHours: parseInt(e.target.value) || 0})} min={0} className={styles.input} disabled={isSubmitting} /></div>
                    </div>
                  </div>
                )}
                {activeTab === 'learning' && (
                  <div className={styles.tabContent}>
                    <div className={styles.formGroup}><label htmlFor="learningObjectives">Learning Objectives (one per line)</label><textarea id="learningObjectives" value={formData.learningObjectives} onChange={e => setFormData({...formData, learningObjectives: e.target.value})} rows={4} className={styles.textarea} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="keyProjects">Key Projects (one per line)</label><textarea id="keyProjects" value={formData.keyProjects} onChange={e => setFormData({...formData, keyProjects: e.target.value})} rows={4} className={styles.textarea} disabled={isSubmitting} /></div>
                    <div className={styles.formGroup}><label htmlFor="assessmentCriteria">Assessment Criteria (one per line)</label><textarea id="assessmentCriteria" value={formData.assessmentCriteria} onChange={e => setFormData({...formData, assessmentCriteria: e.target.value})} rows={4} className={styles.textarea} disabled={isSubmitting} /></div>
                  </div>
                )}
                {activeTab === 'community' && (
                  <div className={styles.tabContent}>
                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}><input type="checkbox" checked={formData.discussionEnabled} onChange={e => setFormData({...formData, discussionEnabled: e.target.checked})} disabled={isSubmitting} /> Enable Discussion Forums</label>
                      <label className={styles.checkboxLabel}><input type="checkbox" checked={formData.mentorshipAvailable} onChange={e => setFormData({...formData, mentorshipAvailable: e.target.checked})} disabled={isSubmitting} /> Mentorship Available</label>
                    </div>
                    <div className={styles.formGroup}><label htmlFor="communityResources">Community Resources (one per line)</label><textarea id="communityResources" value={formData.communityResources} onChange={e => setFormData({...formData, communityResources: e.target.value})} rows={3} className={styles.textarea} disabled={isSubmitting} /></div>
                  </div>
                )}
                {activeTab === 'certification' && (
                  <div className={styles.tabContent}>
                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}><input type="checkbox" checked={formData.certificateAvailable} onChange={e => setFormData({...formData, certificateAvailable: e.target.checked})} disabled={isSubmitting} /> Certificate Available</label>
                    </div>
                    <div className={styles.formGroup}><label htmlFor="certificateRequirements">Certificate Requirements (one per line)</label><textarea id="certificateRequirements" value={formData.certificateRequirements} onChange={e => setFormData({...formData, certificateRequirements: e.target.value})} rows={4} className={styles.textarea} disabled={isSubmitting} /></div>
                  </div>
                )}
                <div className={styles.formActions}>
                  <button type="button" onClick={resetForm} className={styles.cancelButton} disabled={isSubmitting}>Cancel</button>
                  <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (editingRoadmap ? 'Update Roadmap' : 'Create Roadmap')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.roadmapsList}>
          {Object.keys(roadmaps).length === 0 ? (
            <div className={styles.emptyState}><h3>No roadmaps yet</h3><p>Create your first roadmap to get started</p></div>
          ) : (
            Object.values(roadmaps).map(roadmap => (
              <div key={roadmap.slug} className={styles.roadmapCard}>
                <div className={styles.roadmapInfo}>
                  <div className={styles.roadmapHeader}>
                    <h3>{roadmap.title}</h3>
                    <div className={styles.roadmapMeta}>
                      <span className={`${styles.difficulty} ${styles[roadmap.difficulty]}`}>{roadmap.difficulty}</span>
                      <span className={styles.estimatedTime}>{roadmap.estimatedTime}</span>
                    </div>
                  </div>
                  <p className={styles.description}>{roadmap.description}</p>
                  <div className={styles.sections}><h4>Sections:</h4><div className={styles.sectionList}>{roadmap.sections.map((s, i) => <span key={i} className={styles.sectionTag}>{s}</span>)}</div></div>
                </div>
                <div className={styles.roadmapActions}>
                  <button onClick={() => handleEdit(roadmap)} className={styles.editButton} disabled={isSubmitting}>Edit</button>
                  <button onClick={() => handleDelete(roadmap.slug)} className={styles.deleteButton} disabled={isSubmitting}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
