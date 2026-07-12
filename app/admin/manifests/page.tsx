'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '@/presentation/_styles/css/admin-manifests.module.css';

interface ArticleManifest {
  slug: string;
  roadmaps: string[];
  section: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  tags: string[];
  estimatedReadTime: number;
  prerequisites: string[];
  relatedArticles: string[];
  learningOutcomes: string[];
  keyConcepts: string[];
  interactiveElements: { quizzes: boolean; codePlaygrounds: boolean; exercises: boolean; projects: boolean; };
  podcast?: { enabled: boolean; url?: string; duration?: number; };
  video?: { enabled: boolean; url?: string; duration?: number; };
  discussion?: { enabled: boolean; provider: 'giscus' | 'github'; };
  resources?: { externalLinks?: string[]; codeExamples?: string[]; downloads?: string[]; references?: string[]; };
}

export default function AdminManifests() {
  const [articles, setArticles] = useState<Record<string, ArticleManifest>>({});
  const [availableArticles, setAvailableArticles] = useState<string[]>([]);
  const [roadmaps, setRoadmaps] = useState<Record<string, any>>({});
  const [selectedRoadmaps, setSelectedRoadmaps] = useState<string[]>([]);
  const [availableSections, setAvailableSections] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingManifest, setEditingManifest] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const [formData, setFormData] = useState({
    slug: '', roadmaps: '', section: '', order: 1, difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    author: '', tags: '', estimatedReadTime: 30, prerequisites: '', relatedArticles: '',
    learningOutcomes: '', keyConcepts: '', quizzesEnabled: false, codePlaygroundsEnabled: false,
    exercisesEnabled: false, projectsEnabled: false, podcastEnabled: false, podcastUrl: '', podcastDuration: 0,
    videoEnabled: false, videoUrl: '', videoDuration: 0, discussionEnabled: false, discussionProvider: 'giscus' as 'giscus' | 'github',
    externalLinks: '', codeExamples: '', downloads: '', references: '',
  });

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (notification) { const t = setTimeout(() => setNotification(null), 3000); return () => clearTimeout(t); }
  }, [notification]);

  useEffect(() => {
    const sections = new Set<string>();
    selectedRoadmaps.forEach(slug => {
      const r = roadmaps[slug];
      if (r?.sections) r.sections.forEach((s: string) => sections.add(s));
    });
    setAvailableSections(Array.from(sections));
  }, [selectedRoadmaps, roadmaps]);

  const showNotification = (type: 'success' | 'error', message: string) => setNotification({ type, message });

  const handleRoadmapSelection = (slug: string) => {
    setSelectedRoadmaps(prev => prev.includes(slug) ? prev.filter(r => r !== slug) : [...prev, slug]);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (formRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = formRef.current;
      setIsUserScrolling(!(scrollTop + clientHeight >= scrollHeight - 10));
      if (scrollHeight > clientHeight) { e.preventDefault(); e.stopPropagation(); }
    }
  };

  useEffect(() => {
    if (formRef.current && showCreateForm && !isUserScrolling) {
      formRef.current.scrollTop = formRef.current.scrollHeight;
    }
  }, [showCreateForm, selectedRoadmaps, isUserScrolling]);

  const fetchData = async () => {
    try {
      const [manifestsResponse, articlesResponse, roadmapsResponse] = await Promise.all([
        fetch('/api/admin/manifests'), fetch('/api/list-articles'), fetch('/api/admin/roadmaps')
      ]);
      const manifestsData = manifestsResponse.ok ? await manifestsResponse.json() : {};
      setArticles(manifestsData);
      if (articlesResponse.ok) { const d = await articlesResponse.json(); setAvailableArticles(d.success ? d.articles.filter((s: string) => !manifestsData[s]) : []); }
      setRoadmaps(roadmapsResponse.ok ? await roadmapsResponse.json() : {});
    } catch (error) { setArticles({}); setAvailableArticles([]); setRoadmaps({}); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const manifestData: ArticleManifest = {
      slug: formData.slug, roadmaps: selectedRoadmaps, section: formData.section, order: Number(formData.order),
      difficulty: formData.difficulty, author: formData.author || undefined,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      estimatedReadTime: formData.estimatedReadTime,
      prerequisites: formData.prerequisites.split(',').map(p => p.trim()).filter(Boolean),
      relatedArticles: formData.relatedArticles.split(',').map(r => r.trim()).filter(Boolean),
      learningOutcomes: formData.learningOutcomes.split('\n').filter(Boolean),
      keyConcepts: formData.keyConcepts.split('\n').filter(Boolean),
      interactiveElements: { quizzes: formData.quizzesEnabled, codePlaygrounds: formData.codePlaygroundsEnabled, exercises: formData.exercisesEnabled, projects: formData.projectsEnabled },
      podcast: formData.podcastEnabled ? { enabled: true, url: formData.podcastUrl || undefined, duration: formData.podcastDuration || undefined } : undefined,
      video: formData.videoEnabled ? { enabled: true, url: formData.videoUrl || undefined, duration: formData.videoDuration || undefined } : undefined,
      discussion: formData.discussionEnabled ? { enabled: true, provider: formData.discussionProvider } : undefined,
      resources: createResourcesObject(),
    };

    try {
      const response = await fetch('/api/admin/manifests', {
        method: editingManifest ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manifestData),
      });
      if (response.ok) { await fetchData(); resetForm(); showNotification('success', `Manifest ${editingManifest ? 'updated' : 'created'} successfully!`); }
      else { const d = await response.json(); showNotification('error', d.error || 'Failed to save manifest'); }
    } catch (error) { showNotification('error', 'Failed to save manifest.'); }
    finally { setIsSubmitting(false); }
  };

  const createResourcesObject = () => {
    const el = formData.externalLinks.split('\n').filter(Boolean);
    const ce = formData.codeExamples.split('\n').filter(Boolean);
    const dw = formData.downloads.split('\n').filter(Boolean);
    const rf = formData.references.split('\n').filter(Boolean);
    if (el.length || ce.length || dw.length || rf.length) {
      return { externalLinks: el.length ? el : undefined, codeExamples: ce.length ? ce : undefined, downloads: dw.length ? dw : undefined, references: rf.length ? rf : undefined };
    }
    return undefined;
  };

  const handleEdit = (manifest: ArticleManifest) => {
    setEditingManifest(manifest.slug);
    setSelectedRoadmaps(manifest.roadmaps);
    setFormData({
      slug: manifest.slug, roadmaps: manifest.roadmaps.join(', '), section: manifest.section, order: manifest.order,
      difficulty: manifest.difficulty, author: manifest.author || '', tags: manifest.tags.join(', '),
      estimatedReadTime: manifest.estimatedReadTime || 30, prerequisites: manifest.prerequisites?.join(', ') || '',
      relatedArticles: manifest.relatedArticles?.join(', ') || '',
      learningOutcomes: manifest.learningOutcomes?.join('\n') || '', keyConcepts: manifest.keyConcepts?.join('\n') || '',
      quizzesEnabled: manifest.interactiveElements?.quizzes || false, codePlaygroundsEnabled: manifest.interactiveElements?.codePlaygrounds || false,
      exercisesEnabled: manifest.interactiveElements?.exercises || false, projectsEnabled: manifest.interactiveElements?.projects || false,
      podcastEnabled: manifest.podcast?.enabled || false, podcastUrl: manifest.podcast?.url || '', podcastDuration: manifest.podcast?.duration || 0,
      videoEnabled: manifest.video?.enabled || false, videoUrl: manifest.video?.url || '', videoDuration: manifest.video?.duration || 0,
      discussionEnabled: manifest.discussion?.enabled || false, discussionProvider: manifest.discussion?.provider || 'giscus',
      externalLinks: manifest.resources?.externalLinks?.join('\n') || '', codeExamples: manifest.resources?.codeExamples?.join('\n') || '',
      downloads: manifest.resources?.downloads?.join('\n') || '', references: manifest.resources?.references?.join('\n') || '',
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this manifest?')) return;
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/manifests?slug=${slug}`, { method: 'DELETE' });
      if (response.ok) { await fetchData(); showNotification('success', 'Manifest deleted successfully!'); }
      else { const d = await response.json(); showNotification('error', d.error || 'Failed to delete manifest'); }
    } catch (error) { showNotification('error', 'Failed to delete manifest.'); }
    finally { setIsSubmitting(false); }
  };

  const resetForm = () => {
    setFormData({ slug: '', roadmaps: '', section: '', order: 1, difficulty: 'beginner', author: '', tags: '', estimatedReadTime: 30, prerequisites: '', relatedArticles: '', learningOutcomes: '', keyConcepts: '', quizzesEnabled: false, codePlaygroundsEnabled: false, exercisesEnabled: false, projectsEnabled: false, podcastEnabled: false, podcastUrl: '', podcastDuration: 0, videoEnabled: false, videoUrl: '', videoDuration: 0, discussionEnabled: false, discussionProvider: 'giscus', externalLinks: '', codeExamples: '', downloads: '', references: '' });
    setShowCreateForm(false); setEditingManifest(null); setSelectedRoadmaps([]); setAvailableSections([]);
  };

  if (isLoading) {
    return <div className={styles.loadingContainer}><div className={styles.loading}>Loading manifests...</div></div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <Link href="/admin-dashboard" className={styles.backLink}>← Back to Admin</Link>
            <h1 className={styles.title}>Manifest Management</h1>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.stats}><span>{Object.keys(articles).length} articles with manifests</span><span>{availableArticles.length} articles without manifests</span></div>
            <button onClick={() => setShowCreateForm(true)} className={styles.createButton}>Create New Manifest</button>
          </div>
        </div>

        {showCreateForm && (
          <div className={styles.formSection}>
            <div ref={formRef} className={styles.formContainer} onWheel={handleWheel}>
              <div className={styles.formHeader}>
                <h2>{editingManifest ? 'Edit Manifest' : 'Create New Manifest'}</h2>
                <button onClick={resetForm} className={styles.closeButton} disabled={isSubmitting}>×</button>
              </div>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Article Slug *</label>
                  <select value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required className={styles.select} disabled={!!editingManifest}>
                    <option value="">Select an article</option>
                    {[...availableArticles, ...(editingManifest ? [editingManifest] : [])].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Select Roadmaps *</label>
                  <div className={styles.roadmapSelection}>
                    {Object.keys(roadmaps).length === 0 ? <p className={styles.noRoadmaps}>No roadmaps available.</p> : Object.values(roadmaps).map((r: any) => (
                      <div key={r.slug} className={styles.roadmapCheckbox}>
                        <label className={styles.roadmapLabel}>
                          <input type="checkbox" checked={selectedRoadmaps.includes(r.slug)} onChange={() => handleRoadmapSelection(r.slug)} disabled={isSubmitting} />
                          <div className={styles.roadmapInfo}>
                            <div className={styles.roadmapTitle}>{r.title}</div>
                            <div className={styles.roadmapMeta}><span className={`${styles.difficulty} ${styles[r.difficulty]}`}>{r.difficulty}</span><span className={styles.category}>{r.category}</span><span className={styles.level}>Level {r.level}</span></div>
                            <div className={styles.roadmapDescription}>{r.description}</div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Section *</label>
                    <select value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} required className={styles.select} disabled={selectedRoadmaps.length === 0 || isSubmitting}>
                      <option value="">{selectedRoadmaps.length === 0 ? 'Select roadmaps first' : 'Select a section'}</option>
                      {availableSections.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Order *</label>
                    <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} required min="1" className={styles.input} disabled={isSubmitting} />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Difficulty *</label>
                  <select value={formData.difficulty} onChange={e => setFormData({...formData, difficulty: e.target.value as any})} className={styles.select} disabled={isSubmitting}>
                    <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className={styles.formGroup}><label>Tags (comma-separated)</label><input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className={styles.input} disabled={isSubmitting} /></div>
                <div className={styles.formGroup}><label>Author</label><input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className={styles.input} disabled={isSubmitting} /></div>

                <div className={styles.formSection}><h3>📚 Enhanced Features</h3>
                  <div className={styles.formGroup}><label>Estimated Read Time (minutes)</label><input type="number" value={formData.estimatedReadTime} onChange={e => setFormData({...formData, estimatedReadTime: parseInt(e.target.value) || 30})} min="1" className={styles.input} disabled={isSubmitting} /></div>
                  <div className={styles.formGroup}><label>Prerequisites (comma-separated)</label><input type="text" value={formData.prerequisites} onChange={e => setFormData({...formData, prerequisites: e.target.value})} className={styles.input} disabled={isSubmitting} /></div>
                  <div className={styles.formGroup}><label>Related Articles (comma-separated)</label><input type="text" value={formData.relatedArticles} onChange={e => setFormData({...formData, relatedArticles: e.target.value})} className={styles.input} disabled={isSubmitting} /></div>
                  <div className={styles.formGroup}><label>Learning Outcomes (one per line)</label><textarea value={formData.learningOutcomes} onChange={e => setFormData({...formData, learningOutcomes: e.target.value})} rows={3} className={styles.textarea} disabled={isSubmitting} /></div>
                  <div className={styles.formGroup}><label>Key Concepts (one per line)</label><textarea value={formData.keyConcepts} onChange={e => setFormData({...formData, keyConcepts: e.target.value})} rows={3} className={styles.textarea} disabled={isSubmitting} /></div>
                </div>

                <div className={styles.formSection}><h3>🎮 Interactive Elements</h3>
                  <div className={styles.checkboxGroup}>
                    {[['quizzesEnabled', 'Enable Quizzes'], ['codePlaygroundsEnabled', 'Enable Code Playgrounds'], ['exercisesEnabled', 'Enable Exercises'], ['projectsEnabled', 'Enable Projects']].map(([key, label]) => (
                      <label key={key} className={styles.checkboxLabel}><input type="checkbox" checked={(formData as any)[key]} onChange={e => setFormData({...formData, [key]: e.target.checked})} disabled={isSubmitting} /> {label}</label>
                    ))}
                  </div>
                </div>

                <div className={styles.formSection}><h3>🎥 Media</h3>
                  {[['podcast', 'Podcast'], ['video', 'Video']].map(([key, label]) => (
                    <div key={key} className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}><input type="checkbox" checked={(formData as any)[`${key}Enabled`]} onChange={e => setFormData({...formData, [`${key}Enabled`]: e.target.checked})} disabled={isSubmitting} /> Enable {label}</label>
                      {(formData as any)[`${key}Enabled`] && (
                        <div className={styles.mediaFields}>
                          <input type="url" value={(formData as any)[`${key}Url`]} onChange={e => setFormData({...formData, [`${key}Url`]: e.target.value})} placeholder={`${label} URL`} className={styles.input} disabled={isSubmitting} />
                          <input type="number" value={(formData as any)[`${key}Duration`]} onChange={e => setFormData({...formData, [`${key}Duration`]: parseInt(e.target.value) || 0})} placeholder="Duration (minutes)" className={styles.input} disabled={isSubmitting} />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}><input type="checkbox" checked={formData.discussionEnabled} onChange={e => setFormData({...formData, discussionEnabled: e.target.checked})} disabled={isSubmitting} /> Enable Discussion</label>
                    {formData.discussionEnabled && <select value={formData.discussionProvider} onChange={e => setFormData({...formData, discussionProvider: e.target.value as any})} className={styles.select} disabled={isSubmitting}><option value="giscus">Giscus</option><option value="github">GitHub</option></select>}
                  </div>
                </div>

                <div className={styles.formSection}><h3>📚 Resources</h3>
                  {[['externalLinks', 'External Links'], ['codeExamples', 'Code Examples'], ['downloads', 'Downloads'], ['references', 'References']].map(([key, label]) => (
                    <div key={key} className={styles.formGroup}><label>{label} (one per line)</label><textarea value={(formData as any)[key]} onChange={e => setFormData({...formData, [key]: e.target.value})} rows={2} className={styles.textarea} disabled={isSubmitting} /></div>
                  ))}
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={resetForm} className={styles.cancelButton} disabled={isSubmitting}>Cancel</button>
                  <button type="submit" className={styles.submitButton} disabled={isSubmitting || selectedRoadmaps.length === 0}>
                    {isSubmitting ? 'Saving...' : (editingManifest ? 'Update Manifest' : 'Create Manifest')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.manifestsList}>
          {Object.keys(articles).length === 0 ? (
            <div className={styles.emptyState}><h3>No manifests yet</h3><p>Create manifests for your articles to organize them into roadmaps.</p></div>
          ) : (
            Object.values(articles).map(manifest => (
              <div key={manifest.slug} className={styles.manifestCard}>
                <div className={styles.manifestInfo}>
                  <div className={styles.manifestHeader}>
                    <h3>{manifest.slug}</h3>
                    <div className={styles.manifestMeta}><span className={`${styles.difficulty} ${styles[manifest.difficulty]}`}>{manifest.difficulty}</span><span className={styles.order}>Order: {manifest.order}</span></div>
                  </div>
                  <div className={styles.manifestDetails}>
                    <p><strong>Section:</strong> {manifest.section}</p>
                    <p><strong>Roadmaps:</strong> {manifest.roadmaps.join(', ')}</p>
                    {manifest.author && <p><strong>Author:</strong> {manifest.author}</p>}
                  </div>
                  <div className={styles.manifestFeatures}>
                    {manifest.podcast?.enabled && <span className={styles.feature}>🎧 Podcast</span>}
                    {manifest.discussion?.enabled && <span className={styles.feature}>💬 Discussion</span>}
                    {manifest.resources?.externalLinks && <span className={styles.feature}>🔗 Links ({manifest.resources.externalLinks.length})</span>}
                  </div>
                </div>
                <div className={styles.manifestActions}>
                  <button onClick={() => handleEdit(manifest)} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(manifest.slug)} className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
