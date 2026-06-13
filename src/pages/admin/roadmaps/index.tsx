import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../../presentation/_styles/pages/admin/Roadmaps.module.css';

interface RoadmapMeta {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  sections: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // Enhanced metadata for 100xSystems context
  category: 'foundation' | 'systems' | 'development' | 'patterns' | 'devops' | 'ai' | 'leadership';
  level: number; // 1-9 based on README path
  prerequisites: string[]; // roadmap slugs that should be completed first
  outcomes: string[]; // what learner will achieve
  skills: string[]; // specific skills gained
  technologies: string[]; // technologies covered
  
  // Learning structure
  learningObjectives: string[];
  keyProjects: string[];
  assessmentCriteria: string[];
  
  // Metadata
  author?: string;
  tags: string[];
  lastUpdated: string;
  version: string;
  
  // Progress tracking
  totalArticles: number;
  estimatedHours: number;
  difficultyScore: number; // 1-100
  
  // Community features
  discussionEnabled: boolean;
  mentorshipAvailable: boolean;
  communityResources: string[];
  
  // Certification
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
    // Basic Info
    title: '',
    description: '',
    longDescription: '',
    sections: '',
    estimatedTime: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    category: 'foundation' as 'foundation' | 'systems' | 'development' | 'patterns' | 'devops' | 'ai' | 'leadership',
    level: 1,
    
    // Learning Structure
    prerequisites: '',
    outcomes: '',
    skills: '',
    technologies: '',
    learningObjectives: '',
    keyProjects: '',
    assessmentCriteria: '',
    
    // Metadata
    author: '',
    tags: '',
    version: '1.0.0',
    
    // Progress Tracking
    totalArticles: 0,
    estimatedHours: 0,
    difficultyScore: 30,
    
    // Community Features
    discussionEnabled: true,
    mentorshipAvailable: false,
    communityResources: '',
    
    // Certification
    certificateAvailable: false,
    certificateRequirements: ''
  });

  useEffect(() => {
    fetchRoadmaps();
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

  // Dynamic section suggestions based on category
  const getCategorySections = (category: string) => {
    const sections: Record<string, string[]> = {
      foundation: ['variables', 'functions', 'objects', 'arrays', 'async', 'modules'],
      systems: ['architecture', 'databases', 'networking', 'security', 'scaling'],
      development: ['frontend', 'backend', 'mobile', 'desktop', 'apis'],
      patterns: ['creational', 'structural', 'behavioral', 'architectural', 'concurrency'],
      devops: ['containers', 'orchestration', 'cicd', 'monitoring', 'security'],
      ai: ['machine-learning', 'deep-learning', 'nlp', 'computer-vision', 'ethics'],
      leadership: ['team-management', 'project-planning', 'communication', 'strategy', 'mentoring']
    };
    return sections[category] || [];
  };

  // Dynamic skill suggestions based on category and level
  const getSkillSuggestions = (category: string, level: number) => {
    const skills: Record<string, Record<number, string[]>> = {
      foundation: {
        1: ['basic-syntax', 'variables', 'control-flow'],
        2: ['functions', 'objects', 'arrays'],
        3: ['async-programming', 'modules', 'error-handling']
      },
      systems: {
        4: ['system-design', 'databases', 'networking'],
        5: ['scalability', 'security', 'performance'],
        6: ['distributed-systems', 'microservices', 'cloud-architecture']
      },
      development: {
        2: ['html-css', 'javascript-basics', 'react-fundamentals'],
        4: ['advanced-react', 'nodejs', 'api-design'],
        6: ['fullstack-development', 'mobile-development', 'performance-optimization']
      }
    };
    return skills[category]?.[level] || [];
  };

  const fetchRoadmaps = async () => {
    try {
      // Use API endpoint without authentication
      const response = await fetch('/api/admin/roadmaps');
      
      if (response.ok) {
        const data = await response.json();
        setRoadmaps(data);
      } else {
        setRoadmaps({});
      }
    } catch (error) {
      setRoadmaps({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const sectionsArray = formData.sections.split(',').map(s => s.trim()).filter(s => s);
    const prerequisitesArray = formData.prerequisites.split(',').map(p => p.trim()).filter(p => p);
    const outcomesArray = formData.outcomes.split(',').map(o => o.trim()).filter(o => o);
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
    const technologiesArray = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
    const learningObjectivesArray = formData.learningObjectives.split('\n').map(o => o.trim()).filter(o => o);
    const keyProjectsArray = formData.keyProjects.split('\n').map(p => p.trim()).filter(p => p);
    const assessmentCriteriaArray = formData.assessmentCriteria.split('\n').map(a => a.trim()).filter(a => a);
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);
    const communityResourcesArray = formData.communityResources.split('\n').map(r => r.trim()).filter(r => r);
    const certificateRequirementsArray = formData.certificateRequirements.split('\n').map(r => r.trim()).filter(r => r);
    
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    const roadmapData = {
      slug,
      title: formData.title,
      description: formData.description,
      longDescription: formData.longDescription || undefined,
      sections: sectionsArray,
      estimatedTime: formData.estimatedTime,
      difficulty: formData.difficulty,
      
      // Enhanced metadata for 100xSystems context
      category: formData.category,
      level: formData.level,
      prerequisites: prerequisitesArray,
      outcomes: outcomesArray,
      skills: skillsArray,
      technologies: technologiesArray,
      
      // Learning structure
      learningObjectives: learningObjectivesArray,
      keyProjects: keyProjectsArray,
      assessmentCriteria: assessmentCriteriaArray,
      
      // Metadata
      author: formData.author || undefined,
      tags: tagsArray,
      version: formData.version,
      
      // Progress tracking
      totalArticles: formData.totalArticles,
      estimatedHours: formData.estimatedHours,
      difficultyScore: formData.difficultyScore,
      
      // Community features
      discussionEnabled: formData.discussionEnabled,
      mentorshipAvailable: formData.mentorshipAvailable,
      communityResources: communityResourcesArray,
      
      // Certification
      certificateAvailable: formData.certificateAvailable,
      certificateRequirements: certificateRequirementsArray
    };

    try {
      const response = await fetch('/api/admin/roadmaps', {
        method: editingRoadmap ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roadmapData),
      });

      if (response.ok) {
        await fetchRoadmaps();
        resetForm();
        showNotification('success', `Roadmap ${editingRoadmap ? 'updated' : 'created'} successfully!`);
      } else {
        const errorData = await response.json();
        showNotification('error', errorData.error || 'Failed to save roadmap');
      }
    } catch (error) {
      showNotification('error', 'Failed to save roadmap. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (roadmap: RoadmapMeta) => {
    setEditingRoadmap(roadmap.slug);
    setFormData({
      // Basic Info
      title: roadmap.title,
      description: roadmap.description,
      longDescription: roadmap.longDescription || '',
      sections: roadmap.sections.join(', '),
      estimatedTime: roadmap.estimatedTime,
      difficulty: roadmap.difficulty,
      category: roadmap.category,
      level: roadmap.level,
      
      // Learning Structure
      prerequisites: roadmap.prerequisites.join(', '),
      outcomes: roadmap.outcomes.join(', '),
      skills: roadmap.skills.join(', '),
      technologies: roadmap.technologies.join(', '),
      learningObjectives: roadmap.learningObjectives.join('\n'),
      keyProjects: roadmap.keyProjects.join('\n'),
      assessmentCriteria: roadmap.assessmentCriteria.join('\n'),
      
      // Metadata
      author: roadmap.author || '',
      tags: roadmap.tags.join(', '),
      version: roadmap.version,
      
      // Progress Tracking
      totalArticles: roadmap.totalArticles,
      estimatedHours: roadmap.estimatedHours,
      difficultyScore: roadmap.difficultyScore,
      
      // Community Features
      discussionEnabled: roadmap.discussionEnabled,
      mentorshipAvailable: roadmap.mentorshipAvailable,
      communityResources: roadmap.communityResources.join('\n'),
      
      // Certification
      certificateAvailable: roadmap.certificateAvailable,
      certificateRequirements: roadmap.certificateRequirements.join('\n')
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this roadmap?')) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/admin/roadmaps?slug=${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchRoadmaps();
        showNotification('success', 'Roadmap deleted successfully!');
      } else {
        const errorData = await response.json();
        showNotification('error', errorData.error || 'Failed to delete roadmap');
      }
    } catch (error) {
      showNotification('error', 'Failed to delete roadmap. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      // Basic Info
      title: '',
      description: '',
      longDescription: '',
      sections: '',
      estimatedTime: '',
      difficulty: 'beginner',
      category: 'foundation',
      level: 1,
      
      // Learning Structure
      prerequisites: '',
      outcomes: '',
      skills: '',
      technologies: '',
      learningObjectives: '',
      keyProjects: '',
      assessmentCriteria: '',
      
      // Metadata
      author: '',
      tags: '',
      version: '1.0.0',
      
      // Progress Tracking
      totalArticles: 0,
      estimatedHours: 0,
      difficultyScore: 30,
      
      // Community Features
      discussionEnabled: true,
      mentorshipAvailable: false,
      communityResources: '',
      
      // Certification
      certificateAvailable: false,
      certificateRequirements: ''
    });
    setShowCreateForm(false);
    setEditingRoadmap(null);
    setActiveTab('basic');
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading roadmaps...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Roadmap Management - Admin</title>
        <meta name="description" content="Manage roadmaps" />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <Link href="/admin-dashboard" className={styles.backLink}>
              ← Back to Admin
            </Link>
            <h1 className={styles.title}>Roadmap Management</h1>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.stats}>
              <span>{Object.keys(roadmaps).length} roadmaps</span>
            </div>
            <button 
              onClick={() => setShowCreateForm(true)}
              className={styles.createButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Create New Roadmap'}
            </button>
          </div>
        </div>

        {notification && (
          <div className={`${styles.notification} ${styles[notification.type]}`}>
            {notification.message}
          </div>
        )}

        {showCreateForm && (
          <div className={styles.formSection}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2>{editingRoadmap ? 'Edit Roadmap' : 'Create New Roadmap'}</h2>
                <button 
                  onClick={resetForm}
                  className={styles.closeButton}
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>

              {/* Tab Navigation */}
              <div className={styles.tabNavigation}>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'basic' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic Info
                </button>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'learning' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('learning')}
                >
                  Learning Structure
                </button>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'community' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('community')}
                >
                  Community
                </button>
                <button 
                  className={`${styles.tabButton} ${activeTab === 'certification' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('certification')}
                >
                  Certification
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className={styles.tabContent}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="title">Title *</label>
                        <input
                          type="text"
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({...formData, title: e.target.value})}
                          required
                          className={styles.input}
                          disabled={isSubmitting}
                          placeholder="e.g., Foundation in JavaScript"
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="category">Category *</label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                          className={styles.select}
                          disabled={isSubmitting}
                        >
                          <option value="foundation">Foundation</option>
                          <option value="systems">Systems</option>
                          <option value="development">Development</option>
                          <option value="patterns">Patterns</option>
                          <option value="devops">DevOps</option>
                          <option value="ai">AI</option>
                          <option value="leadership">Leadership</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="description">Short Description *</label>
                      <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                        rows={2}
                        className={styles.textarea}
                        disabled={isSubmitting}
                        placeholder="Brief overview of this roadmap (max 200 chars)"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="longDescription">Long Description</label>
                      <textarea
                        id="longDescription"
                        value={formData.longDescription}
                        onChange={(e) => setFormData({...formData, longDescription: e.target.value})}
                        rows={4}
                        className={styles.textarea}
                        disabled={isSubmitting}
                        placeholder="Detailed description of what learners will achieve"
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="level">Level (1-9) *</label>
                        <select
                          id="level"
                          value={formData.level}
                          onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})}
                          className={styles.select}
                          disabled={isSubmitting}
                        >
                          {[1,2,3,4,5,6,7,8,9].map(level => (
                            <option key={level} value={level}>
                              Level {level} {level <= 3 ? '(Beginner)' : level <= 6 ? '(Intermediate)' : '(Advanced)'}
                            </option>
                          ))}
                        </select>
                      </div>

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
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="sections">Sections (comma-separated) *</label>
                      <input
                        type="text"
                        id="sections"
                        value={formData.sections}
                        onChange={(e) => setFormData({...formData, sections: e.target.value})}
                        placeholder="arrays, linked-lists, trees, graphs"
                        required
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="estimatedTime">Estimated Time *</label>
                      <input
                        type="text"
                        id="estimatedTime"
                        value={formData.estimatedTime}
                        onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                        placeholder="3-6 months"
                        required
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="difficultyScore">Difficulty Score (1-100)</label>
                      <input
                        type="range"
                        id="difficultyScore"
                        value={formData.difficultyScore}
                        onChange={(e) => setFormData({...formData, difficultyScore: parseInt(e.target.value)})}
                        min={1}
                        max={100}
                        className={styles.range}
                        disabled={isSubmitting}
                      />
                      <span className={styles.rangeValue}>{formData.difficultyScore}</span>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="prerequisites">Prerequisites (comma-separated roadmap slugs)</label>
                      <input
                        type="text"
                        id="prerequisites"
                        value={formData.prerequisites}
                        onChange={(e) => setFormData({...formData, prerequisites: e.target.value})}
                        placeholder="foundation-javascript, basic-systems"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="outcomes">Learning Outcomes (comma-separated)</label>
                      <input
                        type="text"
                        id="outcomes"
                        value={formData.outcomes}
                        onChange={(e) => setFormData({...formData, outcomes: e.target.value})}
                        placeholder="deep understanding of JS, ability to build scalable apps"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="skills">Skills Gained (comma-separated)</label>
                      <input
                        type="text"
                        id="skills"
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        placeholder="javascript, react, node.js, system design"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="technologies">Technologies Covered (comma-separated)</label>
                      <input
                        type="text"
                        id="technologies"
                        value={formData.technologies}
                        onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                        placeholder="JavaScript, React, Node.js, MongoDB"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="tags">Tags (comma-separated)</label>
                      <input
                        type="text"
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="frontend, backend, fullstack, javascript"
                        className={styles.input}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="author">Author</label>
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

                      <div className={styles.formGroup}>
                        <label htmlFor="version">Version</label>
                        <input
                          type="text"
                          id="version"
                          value={formData.version}
                          onChange={(e) => setFormData({...formData, version: e.target.value})}
                          placeholder="1.0.0"
                          className={styles.input}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="totalArticles">Total Articles</label>
                        <input
                          type="number"
                          id="totalArticles"
                          value={formData.totalArticles}
                          onChange={(e) => setFormData({...formData, totalArticles: parseInt(e.target.value) || 0})}
                          min={0}
                          className={styles.input}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="estimatedHours">Estimated Hours</label>
                        <input
                          type="number"
                          id="estimatedHours"
                          value={formData.estimatedHours}
                          onChange={(e) => setFormData({...formData, estimatedHours: parseInt(e.target.value) || 0})}
                          min={0}
                          className={styles.input}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Learning Structure Tab */}
                {activeTab === 'learning' && (
                  <div className={styles.tabContent}>
                    <div className={styles.formGroup}>
                      <label htmlFor="learningObjectives">Learning Objectives (one per line)</label>
                      <textarea
                        id="learningObjectives"
                        value={formData.learningObjectives}
                        onChange={(e) => setFormData({...formData, learningObjectives: e.target.value})}
                        rows={4}
                        className={styles.textarea}
                        disabled={isSubmitting}
                        placeholder="Understand core JavaScript concepts&#10;Build scalable applications&#10;Master asynchronous programming"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="keyProjects">Key Projects (one per line)</label>
                      <textarea
                        id="keyProjects"
                        value={formData.keyProjects}
                        onChange={(e) => setFormData({...formData, keyProjects: e.target.value})}
                        rows={4}
                        className={styles.textarea}
                        disabled={isSubmitting}
                        placeholder="E-commerce platform&#10;Real-time chat application&#10;API gateway system"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="assessmentCriteria">Assessment Criteria (one per line)</label>
                      <textarea
                        id="assessmentCriteria"
                        value={formData.assessmentCriteria}
                        onChange={(e) => setFormData({...formData, assessmentCriteria: e.target.value})}
                        rows={4}
                        className={styles.textarea}
                        disabled={isSubmitting}
                        placeholder="Complete all coding challenges&#10;Pass final project review&#10;Demonstrate system design skills"
                      />
                    </div>
                  </div>
                )}

                {/* Community Tab */}
                {activeTab === 'community' && (
                  <div className={styles.tabContent}>
                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.discussionEnabled}
                          onChange={(e) => setFormData({...formData, discussionEnabled: e.target.checked})}
                          disabled={isSubmitting}
                        />
                        Enable Discussion Forums
                      </label>
                      
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.mentorshipAvailable}
                          onChange={(e) => setFormData({...formData, mentorshipAvailable: e.target.checked})}
                          disabled={isSubmitting}
                        />
                        Mentorship Available
                      </label>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="communityResources">Community Resources (one per line)</label>
                      <textarea
                        id="communityResources"
                        value={formData.communityResources}
                        onChange={(e) => setFormData({...formData, communityResources: e.target.value})}
                        rows={3}
                        className={styles.textarea}
                        disabled={isSubmitting}
                        placeholder="Discord server link&#10;Weekly study groups&#10;Peer review sessions"
                      />
                    </div>
                  </div>
                )}

                {/* Certification Tab */}
                {activeTab === 'certification' && (
                  <div className={styles.tabContent}>
                    <div className={styles.checkboxGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={formData.certificateAvailable}
                          onChange={(e) => setFormData({...formData, certificateAvailable: e.target.checked})}
                          disabled={isSubmitting}
                        />
                        Certificate Available
                      </label>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="certificateRequirements">Certificate Requirements (one per line)</label>
                      <textarea
                        id="certificateRequirements"
                        value={formData.certificateRequirements}
                        onChange={(e) => setFormData({...formData, certificateRequirements: e.target.value})}
                        rows={4}
                        className={styles.textarea}
                        disabled={isSubmitting}
                        placeholder="Complete all modules&#10;Score 80%+ on assessments&#10;Submit final project"
                      />
                    </div>
                  </div>
                )}

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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : (editingRoadmap ? 'Update Roadmap' : 'Create Roadmap')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.roadmapsList}>
          {Object.keys(roadmaps).length === 0 ? (
            <div className={styles.emptyState}>
              <h3>No roadmaps yet</h3>
              <p>Create your first roadmap to get started</p>
            </div>
          ) : (
            Object.values(roadmaps).map((roadmap) => (
              <div key={roadmap.slug} className={styles.roadmapCard}>
                <div className={styles.roadmapInfo}>
                  <div className={styles.roadmapHeader}>
                    <h3>{roadmap.title}</h3>
                    <div className={styles.roadmapMeta}>
                      <span className={`${styles.difficulty} ${styles[roadmap.difficulty]}`}>
                        {roadmap.difficulty}
                      </span>
                      <span className={styles.estimatedTime}>{roadmap.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <p className={styles.description}>{roadmap.description}</p>
                  
                  <div className={styles.sections}>
                    <h4>Sections:</h4>
                    <div className={styles.sectionList}>
                      {roadmap.sections.map((section, index) => (
                        <span key={index} className={styles.sectionTag}>{section}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.roadmapActions}>
                  <button 
                    onClick={() => handleEdit(roadmap)}
                    className={styles.editButton}
                    disabled={isSubmitting}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(roadmap.slug)}
                    className={styles.deleteButton}
                    disabled={isSubmitting}
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
