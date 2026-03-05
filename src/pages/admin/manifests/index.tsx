import { useState, useEffect, useRef } from 'react';
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
  
  // Enhanced features
  estimatedReadTime: number; // minutes
  prerequisites: string[]; // article slugs
  relatedArticles: string[]; // article slugs
  learningOutcomes: string[];
  keyConcepts: string[];
  
  // Interactive features
  interactiveElements: {
    quizzes: boolean;
    codePlaygrounds: boolean;
    exercises: boolean;
    projects: boolean;
  };
  
  // Media
  podcast?: {
    enabled: boolean;
    url?: string;
    duration?: number; // minutes
  };
  video?: {
    enabled: boolean;
    url?: string;
    duration?: number; // minutes
  };
  discussion?: {
    enabled: boolean;
    provider: 'giscus' | 'github';
  };
  resources?: {
    externalLinks?: string[];
    codeExamples?: string[];
    downloads?: string[];
    references?: string[];
  };
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
  
  // Terminal-style scroll handling
  const formRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const [formData, setFormData] = useState({
    slug: '',
    roadmaps: '',
    section: '',
    order: 1,
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    author: '',
    tags: '',
    
    // Enhanced features
    estimatedReadTime: 30,
    prerequisites: '',
    relatedArticles: '',
    learningOutcomes: '',
    keyConcepts: '',
    
    // Interactive features
    quizzesEnabled: false,
    codePlaygroundsEnabled: false,
    exercisesEnabled: false,
    projectsEnabled: false,
    
    // Media
    podcastEnabled: false,
    podcastUrl: '',
    podcastDuration: 0,
    videoEnabled: false,
    videoUrl: '',
    videoDuration: 0,
    discussionEnabled: false,
    discussionProvider: 'giscus' as 'giscus' | 'github',
    
    // Resources
    externalLinks: '',
    codeExamples: '',
    downloads: '',
    references: ''
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

  // Helper functions for dynamic dropdowns
  const handleRoadmapSelection = (roadmapSlug: string) => {
    setSelectedRoadmaps(prev => 
      prev.includes(roadmapSlug) 
        ? prev.filter(r => r !== roadmapSlug)
        : [...prev, roadmapSlug]
    );
  };

  // Update available sections when selected roadmaps change
  useEffect(() => {
    const sections = new Set<string>();
    selectedRoadmaps.forEach(roadmapSlug => {
      const roadmap = roadmaps[roadmapSlug];
      if (roadmap && roadmap.sections) {
        roadmap.sections.forEach((section: string) => sections.add(section));
      }
    });
    setAvailableSections(Array.from(sections));
  }, [selectedRoadmaps, roadmaps]);

  // Terminal-style scroll handling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (formRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = formRef.current;
      const delta = e.deltaY;
      
      // Update scroll state
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsUserScrolling(!isAtBottom);
      
      // Prevent page scroll when form has scrollable content
      const hasScrollableContent = scrollHeight > clientHeight;
      
      if (hasScrollableContent) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  // Auto-scroll to bottom when form opens or content changes
  useEffect(() => {
    if (formRef.current && showCreateForm && !isUserScrolling) {
      formRef.current.scrollTop = formRef.current.scrollHeight;
    }
  }, [showCreateForm, selectedRoadmaps, isUserScrolling]);

  const fetchData = async () => {
    try {
      // Fetch manifests, available articles, and roadmaps via API without authentication
      const [manifestsResponse, articlesResponse, roadmapsResponse] = await Promise.all([
        fetch('/api/admin/manifests'),
        fetch('/api/list-articles'),
        fetch('/api/admin/roadmaps')
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
      
      if (roadmapsResponse.ok) {
        const roadmapsData = await roadmapsResponse.json();
        setRoadmaps(roadmapsData);
      } else {
        console.error('Failed to fetch roadmaps');
        setRoadmaps({});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setArticles({});
      setAvailableArticles([]);
      setRoadmaps({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const roadmapsArray = selectedRoadmaps; // Use selected roadmaps array directly
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    const prerequisitesArray = formData.prerequisites.split(',').map(p => p.trim()).filter(p => p);
    const relatedArticlesArray = formData.relatedArticles.split(',').map(r => r.trim()).filter(r => r);
    const learningOutcomesArray = formData.learningOutcomes.split('\n').map(o => o.trim()).filter(o => o);
    const keyConceptsArray = formData.keyConcepts.split('\n').map(c => c.trim()).filter(c => c);
    const externalLinksArray = formData.externalLinks.split('\n').map(link => link.trim()).filter(link => link);
    const codeExamplesArray = formData.codeExamples.split('\n').map(example => example.trim()).filter(example => example);
    const downloadsArray = formData.downloads.split('\n').map(d => d.trim()).filter(d => d);
    const referencesArray = formData.references.split('\n').map(r => r.trim()).filter(r => r);
    
    const manifestData: ArticleManifest = {
      slug: formData.slug,
      roadmaps: roadmapsArray,
      section: formData.section,
      order: Number(formData.order),
      difficulty: formData.difficulty,
      author: formData.author || undefined,
      tags: tagsArray,
      
      // Enhanced features
      estimatedReadTime: formData.estimatedReadTime,
      prerequisites: prerequisitesArray,
      relatedArticles: relatedArticlesArray,
      learningOutcomes: learningOutcomesArray,
      keyConcepts: keyConceptsArray,
      
      // Interactive features
      interactiveElements: {
        quizzes: formData.quizzesEnabled,
        codePlaygrounds: formData.codePlaygroundsEnabled,
        exercises: formData.exercisesEnabled,
        projects: formData.projectsEnabled
      },
      
      // Media
      podcast: formData.podcastEnabled ? { 
        enabled: true, 
        url: formData.podcastUrl || undefined,
        duration: formData.podcastDuration || undefined
      } : undefined,
      video: formData.videoEnabled ? { 
        enabled: true, 
        url: formData.videoUrl || undefined,
        duration: formData.videoDuration || undefined
      } : undefined,
      discussion: formData.discussionEnabled ? { enabled: true, provider: formData.discussionProvider } : undefined,
      resources: (externalLinksArray.length > 0 || codeExamplesArray.length > 0 || downloadsArray.length > 0 || referencesArray.length > 0) ? {
        externalLinks: externalLinksArray.length > 0 ? externalLinksArray : undefined,
        codeExamples: codeExamplesArray.length > 0 ? codeExamplesArray : undefined,
        downloads: downloadsArray.length > 0 ? downloadsArray : undefined,
        references: referencesArray.length > 0 ? referencesArray : undefined
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
    setSelectedRoadmaps(manifest.roadmaps);
    setFormData({
      slug: manifest.slug,
      roadmaps: manifest.roadmaps.join(', '),
      section: manifest.section,
      order: manifest.order,
      difficulty: manifest.difficulty,
      author: manifest.author || '',
      tags: manifest.tags.join(', '),
      
      // Enhanced features
      estimatedReadTime: manifest.estimatedReadTime || 30,
      prerequisites: manifest.prerequisites?.join(', ') || '',
      relatedArticles: manifest.relatedArticles?.join(', ') || '',
      learningOutcomes: manifest.learningOutcomes?.join('\n') || '',
      keyConcepts: manifest.keyConcepts?.join('\n') || '',
      
      // Interactive features
      quizzesEnabled: manifest.interactiveElements?.quizzes || false,
      codePlaygroundsEnabled: manifest.interactiveElements?.codePlaygrounds || false,
      exercisesEnabled: manifest.interactiveElements?.exercises || false,
      projectsEnabled: manifest.interactiveElements?.projects || false,
      
      // Media
      podcastEnabled: manifest.podcast?.enabled || false,
      podcastUrl: manifest.podcast?.url || '',
      podcastDuration: manifest.podcast?.duration || 0,
      videoEnabled: manifest.video?.enabled || false,
      videoUrl: manifest.video?.url || '',
      videoDuration: manifest.video?.duration || 0,
      discussionEnabled: manifest.discussion?.enabled || false,
      discussionProvider: manifest.discussion?.provider || 'giscus',
      
      // Resources
      externalLinks: manifest.resources?.externalLinks?.join('\n') || '',
      codeExamples: manifest.resources?.codeExamples?.join('\n') || '',
      downloads: manifest.resources?.downloads?.join('\n') || '',
      references: manifest.resources?.references?.join('\n') || ''
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
      
      // Enhanced features
      estimatedReadTime: 30,
      prerequisites: '',
      relatedArticles: '',
      learningOutcomes: '',
      keyConcepts: '',
      
      // Interactive features
      quizzesEnabled: false,
      codePlaygroundsEnabled: false,
      exercisesEnabled: false,
      projectsEnabled: false,
      
      // Media
      podcastEnabled: false,
      podcastUrl: '',
      podcastDuration: 0,
      videoEnabled: false,
      videoUrl: '',
      videoDuration: 0,
      discussionEnabled: false,
      discussionProvider: 'giscus',
      
      // Resources
      externalLinks: '',
      codeExamples: '',
      downloads: '',
      references: ''
    });
    setShowCreateForm(false);
    setEditingManifest(null);
    setSelectedRoadmaps([]);
    setAvailableSections([]);
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
          <div className={styles.formSection}>
            <div 
              ref={formRef}
              className={styles.formContainer}
              onWheel={handleWheel}
            >
              <div className={styles.formHeader}>
                <h2>{editingManifest ? 'Edit Manifest' : 'Create New Manifest'}</h2>
                <button 
                  onClick={resetForm}
                  className={styles.closeButton}
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Article Selection */}
                <div className={styles.formGroup}>
                  <label htmlFor="slug">Article Slug *</label>
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

                {/* Roadmap Selection - Dynamic Checkboxes */}
                <div className={styles.formGroup}>
                  <label>Select Roadmaps *</label>
                  <div className={styles.roadmapSelection}>
                    {Object.keys(roadmaps).length === 0 ? (
                      <p className={styles.noRoadmaps}>No roadmaps available. Please create roadmaps first.</p>
                    ) : (
                      Object.values(roadmaps).map((roadmap: any) => (
                        <div key={roadmap.slug} className={styles.roadmapCheckbox}>
                          <label className={styles.roadmapLabel}>
                            <input
                              type="checkbox"
                              checked={selectedRoadmaps.includes(roadmap.slug)}
                              onChange={() => handleRoadmapSelection(roadmap.slug)}
                              disabled={isSubmitting}
                            />
                            <div className={styles.roadmapInfo}>
                              <div className={styles.roadmapTitle}>{roadmap.title}</div>
                              <div className={styles.roadmapMeta}>
                                <span className={`${styles.difficulty} ${styles[roadmap.difficulty]}`}>
                                  {roadmap.difficulty}
                                </span>
                                <span className={styles.category}>{roadmap.category}</span>
                                <span className={styles.level}>Level {roadmap.level}</span>
                              </div>
                              <div className={styles.roadmapDescription}>{roadmap.description}</div>
                              <div className={styles.roadmapSections}>
                                <strong>Sections:</strong> {roadmap.sections?.join(', ') || 'No sections'}
                              </div>
                            </div>
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Section Selection - Dynamic Dropdown */}
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="section">Section *</label>
                    <select
                      id="section"
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      required
                      className={styles.select}
                      disabled={selectedRoadmaps.length === 0 || isSubmitting}
                    >
                      <option value="">
                        {selectedRoadmaps.length === 0 ? 'Select roadmaps first' : 'Select a section'}
                      </option>
                      {availableSections.map(section => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                    </select>
                    {selectedRoadmaps.length > 0 && (
                      <small className={styles.helperText}>
                        Available sections from: {selectedRoadmaps.join(', ')}
                      </small>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="order">Order *</label>
                    <input
                      type="number"
                      id="order"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                      required
                      min="1"
                      className={styles.input}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Auto-suggested fields based on selected roadmaps */}
                {selectedRoadmaps.length > 0 && (
                  <div className={styles.suggestedFields}>
                    <h3>📝 Auto-suggested from Selected Roadmaps</h3>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="difficulty">Difficulty *</label>
                        <select
                          id="difficulty"
                          value={formData.difficulty}
                          onChange={(e) => setFormData({...formData, difficulty: e.target.value as any})}
                          className={styles.select}
                          disabled={isSubmitting}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                        <small className={styles.helperText}>
                          Based on: {selectedRoadmaps.map(r => roadmaps[r]?.difficulty).filter(Boolean).join(', ')}
                        </small>
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
                          disabled={isSubmitting}
                        />
                        <small className={styles.helperText}>
                          Suggested: {selectedRoadmaps.flatMap(r => roadmaps[r]?.tags || []).slice(0, 5).join(', ')}
                        </small>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="skills">Skills (comma-separated)</label>
                      <input
                        type="text"
                        id="skills"
                        value={formData.tags} // Using tags field temporarily
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="javascript, react, system-design"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                      <small className={styles.helperText}>
                        From roadmaps: {selectedRoadmaps.flatMap(r => roadmaps[r]?.skills || []).slice(0, 8).join(', ')}
                      </small>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="technologies">Technologies (comma-separated)</label>
                      <input
                        type="text"
                        id="technologies"
                        value={formData.tags} // Using tags field temporarily
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="JavaScript, React, Node.js"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                      <small className={styles.helperText}>
                        From roadmaps: {selectedRoadmaps.flatMap(r => roadmaps[r]?.technologies || []).slice(0, 8).join(', ')}
                      </small>
                    </div>
                  </div>
                )}

                {/* Author */}
                <div className={styles.formGroup}>
                  <label htmlFor="author">Author (optional)</label>
                  <input
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="John Doe"
                    className={styles.input}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Enhanced Features */}
                <div className={styles.formSection}>
                  <h3>📚 Enhanced Features</h3>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="estimatedReadTime">Estimated Read Time (minutes)</label>
                      <input
                        type="number"
                        id="estimatedReadTime"
                        value={formData.estimatedReadTime}
                        onChange={(e) => setFormData({...formData, estimatedReadTime: parseInt(e.target.value) || 30})}
                        min="1"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="prerequisites">Prerequisites (comma-separated article slugs)</label>
                    <input
                      type="text"
                      id="prerequisites"
                      value={formData.prerequisites}
                      onChange={(e) => setFormData({...formData, prerequisites: e.target.value})}
                      placeholder="basics-javascript, arrays-introduction"
                      className={styles.input}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="relatedArticles">Related Articles (comma-separated)</label>
                    <input
                      type="text"
                      id="relatedArticles"
                      value={formData.relatedArticles}
                      onChange={(e) => setFormData({...formData, relatedArticles: e.target.value})}
                      placeholder="linked-lists-advanced, trees-introduction"
                      className={styles.input}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="learningOutcomes">Learning Outcomes (one per line)</label>
                    <textarea
                      id="learningOutcomes"
                      value={formData.learningOutcomes}
                      onChange={(e) => setFormData({...formData, learningOutcomes: e.target.value})}
                      placeholder="Understand array operations&#10;Implement common algorithms&#10;Analyze time complexity"
                      rows={3}
                      className={styles.textarea}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="keyConcepts">Key Concepts (one per line)</label>
                    <textarea
                      id="keyConcepts"
                      value={formData.keyConcepts}
                      onChange={(e) => setFormData({...formData, keyConcepts: e.target.value})}
                      placeholder="Time Complexity&#10;Space Complexity&#10;Big O Notation"
                      rows={3}
                      className={styles.textarea}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Interactive Elements */}
                <div className={styles.formSection}>
                  <h3>🎮 Interactive Elements</h3>
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.quizzesEnabled}
                        onChange={(e) => setFormData({...formData, quizzesEnabled: e.target.checked})}
                        disabled={isSubmitting}
                      />
                      Enable Quizzes
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.codePlaygroundsEnabled}
                        onChange={(e) => setFormData({...formData, codePlaygroundsEnabled: e.target.checked})}
                        disabled={isSubmitting}
                      />
                      Enable Code Playgrounds
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.exercisesEnabled}
                        onChange={(e) => setFormData({...formData, exercisesEnabled: e.target.checked})}
                        disabled={isSubmitting}
                      />
                      Enable Exercises
                    </label>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.projectsEnabled}
                        onChange={(e) => setFormData({...formData, projectsEnabled: e.target.checked})}
                        disabled={isSubmitting}
                      />
                      Enable Projects
                    </label>
                  </div>
                </div>

                {/* Media Section */}
                <div className={styles.formSection}>
                  <h3>🎥 Media</h3>
                  
                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.podcastEnabled}
                        onChange={(e) => setFormData({...formData, podcastEnabled: e.target.checked})}
                        disabled={isSubmitting}
                      />
                      Enable Podcast
                    </label>
                    {formData.podcastEnabled && (
                      <div className={styles.mediaFields}>
                        <input
                          type="url"
                          value={formData.podcastUrl}
                          onChange={(e) => setFormData({...formData, podcastUrl: e.target.value})}
                          placeholder="Podcast URL"
                          className={styles.input}
                          disabled={isSubmitting}
                        />
                        <input
                          type="number"
                          value={formData.podcastDuration}
                          onChange={(e) => setFormData({...formData, podcastDuration: parseInt(e.target.value) || 0})}
                          placeholder="Duration (minutes)"
                          className={styles.input}
                          disabled={isSubmitting}
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.videoEnabled}
                        onChange={(e) => setFormData({...formData, videoEnabled: e.target.checked})}
                        disabled={isSubmitting}
                      />
                      Enable Video
                    </label>
                    {formData.videoEnabled && (
                      <div className={styles.mediaFields}>
                        <input
                          type="url"
                          value={formData.videoUrl}
                          onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                          placeholder="Video URL"
                          className={styles.input}
                          disabled={isSubmitting}
                        />
                        <input
                          type="number"
                          value={formData.videoDuration}
                          onChange={(e) => setFormData({...formData, videoDuration: parseInt(e.target.value) || 0})}
                          placeholder="Duration (minutes)"
                          className={styles.input}
                          disabled={isSubmitting}
                        />
                      </div>
                    )}
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.discussionEnabled}
                        onChange={(e) => setFormData({...formData, discussionEnabled: e.target.checked})}
                        disabled={isSubmitting}
                      />
                      Enable Discussion
                    </label>
                    {formData.discussionEnabled && (
                      <select
                        value={formData.discussionProvider}
                        onChange={(e) => setFormData({...formData, discussionProvider: e.target.value as any})}
                        className={styles.select}
                        disabled={isSubmitting}
                      >
                        <option value="giscus">Giscus</option>
                        <option value="github">GitHub</option>
                      </select>
                    )}
                  </div>
                </div>

                {/* Resources */}
                <div className={styles.formSection}>
                  <h3>📚 Resources</h3>
                  <div className={styles.formGroup}>
                    <label htmlFor="externalLinks">External Links (one per line)</label>
                    <textarea
                      id="externalLinks"
                      value={formData.externalLinks}
                      onChange={(e) => setFormData({...formData, externalLinks: e.target.value})}
                      placeholder="https://example.com/resource1&#10;https://example.com/resource2"
                      rows={3}
                      className={styles.textarea}
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="downloads">Downloads (one per line)</label>
                    <textarea
                      id="downloads"
                      value={formData.downloads}
                      onChange={(e) => setFormData({...formData, downloads: e.target.value})}
                      placeholder="slides.pdf&#10;cheatsheet.pdf"
                      rows={2}
                      className={styles.textarea}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="references">References (one per line)</label>
                    <textarea
                      id="references"
                      value={formData.references}
                      onChange={(e) => setFormData({...formData, references: e.target.value})}
                      placeholder="Book: Algorithm Design Manual&#10;Paper: Original Research"
                      rows={2}
                      className={styles.textarea}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    onClick={resetForm} 
                    className={styles.cancelButton}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting || selectedRoadmaps.length === 0}
                  >
                    {isSubmitting ? 'Saving...' : (editingManifest ? 'Update Manifest' : 'Create Manifest')}
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
