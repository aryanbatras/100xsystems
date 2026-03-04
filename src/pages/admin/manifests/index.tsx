import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Manifests.module.css';

interface ArticleManifest {
  slug: string;
  roadmaps: string[];
  section: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  tags: string[];
  podcast?: {
    enabled: boolean;
    url?: string;
  };
  discussion?: {
    enabled: boolean;
    provider: 'giscus' | 'github';
  };
  resources?: {
    externalLinks?: string[];
    codeExamples?: string[];
  };
}

export default function AdminManifests() {
  const [articles, setArticles] = useState<Record<string, ArticleManifest>>({});
  const [availableArticles, setAvailableArticles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingManifest, setEditingManifest] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    slug: '',
    roadmaps: '',
    section: '',
    order: 1,
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    author: '',
    tags: '',
    podcastEnabled: false,
    podcastUrl: '',
    discussionEnabled: false,
    discussionProvider: 'giscus' as 'giscus' | 'github',
    externalLinks: '',
    codeExamples: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
  };

  const fetchData = async () => {
    try {
      // Fetch manifests and available articles via API without authentication
      const [manifestsResponse, articlesResponse] = await Promise.all([
        fetch('/api/admin/manifests'),
        fetch('/api/list-articles')
      ]);
      
      if (manifestsResponse.ok) {
        const manifestsData = await manifestsResponse.json();
        setArticles(manifestsData);
      } else {
        console.error('Failed to fetch manifests');
        setArticles({});
      }
      
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json();
        const articleSlugs = articlesData.success ? articlesData.articles : [];
        setAvailableArticles(articleSlugs.filter((slug: string) => !articles[slug]));
      } else {
        console.error('Failed to fetch articles');
        setAvailableArticles([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setArticles({});
      setAvailableArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const roadmapsArray = formData.roadmaps.split(',').map(r => r.trim()).filter(r => r);
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    const externalLinksArray = formData.externalLinks.split('\n').map(link => link.trim()).filter(link => link);
    const codeExamplesArray = formData.codeExamples.split('\n').map(example => example.trim()).filter(example => example);
    
    const manifestData: ArticleManifest = {
      slug: formData.slug,
      roadmaps: roadmapsArray,
      section: formData.section,
      order: Number(formData.order),
      difficulty: formData.difficulty,
      author: formData.author || undefined,
      tags: tagsArray,
      podcast: formData.podcastEnabled ? { enabled: true, url: formData.podcastUrl || undefined } : undefined,
      discussion: formData.discussionEnabled ? { enabled: true, provider: formData.discussionProvider } : undefined,
      resources: (externalLinksArray.length > 0 || codeExamplesArray.length > 0) ? {
        externalLinks: externalLinksArray.length > 0 ? externalLinksArray : undefined,
        codeExamples: codeExamplesArray.length > 0 ? codeExamplesArray : undefined
      } : undefined
    };

    try {
      const response = await fetch('/api/admin/manifests', {
        method: editingManifest ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manifestData),
      });

      if (response.ok) {
        await fetchData();
        resetForm();
        showNotification('success', `Manifest ${editingManifest ? 'updated' : 'created'} successfully!`);
      } else {
        const errorData = await response.json();
        showNotification('error', errorData.error || 'Failed to save manifest');
      }
    } catch (error) {
      console.error('Error saving manifest:', error);
      showNotification('error', 'Failed to save manifest. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (manifest: ArticleManifest) => {
    setEditingManifest(manifest.slug);
    setFormData({
      slug: manifest.slug,
      roadmaps: manifest.roadmaps.join(', '),
      section: manifest.section,
      order: manifest.order,
      difficulty: manifest.difficulty,
      author: manifest.author || '',
      tags: manifest.tags.join(', '),
      podcastEnabled: manifest.podcast?.enabled || false,
      podcastUrl: manifest.podcast?.url || '',
      discussionEnabled: manifest.discussion?.enabled || false,
      discussionProvider: manifest.discussion?.provider || 'giscus',
      externalLinks: manifest.resources?.externalLinks?.join('\n') || '',
      codeExamples: manifest.resources?.codeExamples?.join('\n') || ''
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this manifest?')) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/admin/manifests?slug=${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
        showNotification('success', 'Manifest deleted successfully!');
      } else {
        const errorData = await response.json();
        showNotification('error', errorData.error || 'Failed to delete manifest');
      }
    } catch (error) {
      console.error('Error deleting manifest:', error);
      showNotification('error', 'Failed to delete manifest. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      slug: '',
      roadmaps: '',
      section: '',
      order: 1,
      difficulty: 'beginner',
      author: '',
      tags: '',
      podcastEnabled: false,
      podcastUrl: '',
      discussionEnabled: false,
      discussionProvider: 'giscus',
      externalLinks: '',
      codeExamples: ''
    });
    setShowCreateForm(false);
    setEditingManifest(null);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading manifests...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Manifest Management - Admin</title>
        <meta name="description" content="Manage article manifests" />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <Link href="/admin-dashboard" className={styles.backLink}>
              ← Back to Admin
            </Link>
            <h1 className={styles.title}>Manifest Management</h1>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.stats}>
              <span>{Object.keys(articles).length} articles with manifests</span>
              <span>{availableArticles.length} articles without manifests</span>
            </div>
            <button 
              onClick={() => setShowCreateForm(true)}
              className={styles.createButton}
            >
              Create New Manifest
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className={styles.formOverlay}>
            <div className={styles.formContainer}>
              <h2>{editingManifest ? 'Edit Manifest' : 'Create New Manifest'}</h2>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="slug">Article Slug</label>
                    <select
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      required
                      className={styles.select}
                      disabled={!!editingManifest}
                    >
                      <option value="">Select an article</option>
                      {[...availableArticles, ...(editingManifest ? [editingManifest] : [])].map(articleSlug => (
                        <option key={articleSlug} value={articleSlug}>
                          {articleSlug}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="section">Section</label>
                    <input
                      type="text"
                      id="section"
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      required
                      className={styles.input}
                      placeholder="arrays, linked-lists, etc."
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="roadmaps">Roadmaps (comma-separated)</label>
                    <input
                      type="text"
                      id="roadmaps"
                      value={formData.roadmaps}
                      onChange={(e) => setFormData({...formData, roadmaps: e.target.value})}
                      placeholder="datastructures, systemdesign"
                      required
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="order">Order</label>
                    <input
                      type="number"
                      id="order"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                      required
                      min="1"
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                      id="difficulty"
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value as any})}
                      className={styles.select}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="author">Author (optional)</label>
                    <input
                      type="text"
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="tags">Tags (comma-separated)</label>
                  <input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="arrays, algorithms, complexity"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formSection}>
                  <h3>Podcast</h3>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.podcastEnabled}
                        onChange={(e) => setFormData({...formData, podcastEnabled: e.target.checked})}
                      />
                      Enable Podcast
                    </label>
                    {formData.podcastEnabled && (
                      <input
                        type="url"
                        value={formData.podcastUrl}
                        onChange={(e) => setFormData({...formData, podcastUrl: e.target.value})}
                        placeholder="Podcast URL"
                        className={styles.input}
                      />
                    )}
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h3>Discussion</h3>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.discussionEnabled}
                        onChange={(e) => setFormData({...formData, discussionEnabled: e.target.checked})}
                      />
                      Enable Discussion
                    </label>
                    {formData.discussionEnabled && (
                      <select
                        value={formData.discussionProvider}
                        onChange={(e) => setFormData({...formData, discussionProvider: e.target.value as any})}
                        className={styles.select}
                      >
                        <option value="giscus">Giscus</option>
                        <option value="github">GitHub</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h3>Resources</h3>
                  <div className={styles.formGroup}>
                    <label htmlFor="externalLinks">External Links (one per line)</label>
                    <textarea
                      id="externalLinks"
                      value={formData.externalLinks}
                      onChange={(e) => setFormData({...formData, externalLinks: e.target.value})}
                      placeholder="https://example.com/resource1&#10;https://example.com/resource2"
                      rows={3}
                      className={styles.textarea}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="codeExamples">Code Examples (one per line)</label>
                    <textarea
                      id="codeExamples"
                      value={formData.codeExamples}
                      onChange={(e) => setFormData({...formData, codeExamples: e.target.value})}
                      placeholder="solution.js&#10;explanation.md"
                      rows={3}
                      className={styles.textarea}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" onClick={resetForm} className={styles.cancelButton}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    {editingManifest ? 'Update Manifest' : 'Create Manifest'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.manifestsList}>
          {Object.keys(articles).length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No manifests yet</h3>
              <p>Create manifests for your articles to organize them into roadmaps.</p>
            </div>
          ) : (
            Object.values(articles).map((manifest) => (
              <div key={manifest.slug} className={styles.manifestCard}>
                <div className={styles.manifestInfo}>
                  <div className={styles.manifestHeader}>
                    <h3>{manifest.slug}</h3>
                    <div className={styles.manifestMeta}>
                      <span className={`${styles.difficulty} ${styles[manifest.difficulty]}`}>
                        {manifest.difficulty}
                      </span>
                      <span className={styles.order}>Order: {manifest.order}</span>
                    </div>
                  </div>
                  
                  <div className={styles.manifestDetails}>
                    <p><strong>Section:</strong> {manifest.section}</p>
                    <p><strong>Roadmaps:</strong> {manifest.roadmaps.join(', ')}</p>
                    {manifest.author && <p><strong>Author:</strong> {manifest.author}</p>}
                    {manifest.tags.length > 0 && (
                      <p><strong>Tags:</strong> {manifest.tags.join(', ')}</p>
                    )}
                  </div>

                  <div className={styles.manifestFeatures}>
                    {manifest.podcast?.enabled && (
                      <span className={styles.feature}>🎧 Podcast</span>
                    )}
                    {manifest.discussion?.enabled && (
                      <span className={styles.feature}>💬 Discussion</span>
                    )}
                    {manifest.resources?.externalLinks && (
                      <span className={styles.feature}>🔗 Links ({manifest.resources.externalLinks.length})</span>
                    )}
                    {manifest.resources?.codeExamples && (
                      <span className={styles.feature}>💻 Code ({manifest.resources.codeExamples.length})</span>
                    )}
                  </div>
                </div>

                <div className={styles.manifestActions}>
                  <button 
                    onClick={() => handleEdit(manifest)}
                    className={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(manifest.slug)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
