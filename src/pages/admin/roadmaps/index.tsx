import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from './Roadmaps.module.css';

interface RoadmapMeta {
  slug: string;
  title: string;
  description: string;
  sections: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export default function AdminRoadmaps() {
  const [roadmaps, setRoadmaps] = useState<Record<string, RoadmapMeta>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sections: '',
    estimatedTime: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced'
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

  const fetchRoadmaps = async () => {
    try {
      // Use API endpoint without authentication
      const response = await fetch('/api/admin/roadmaps');
      
      if (response.ok) {
        const data = await response.json();
        setRoadmaps(data);
      } else {
        console.error('Failed to fetch roadmaps');
        setRoadmaps({});
      }
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
      setRoadmaps({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const sectionsArray = formData.sections.split(',').map(s => s.trim()).filter(s => s);
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    const roadmapData = {
      title: formData.title,
      description: formData.description,
      sections: sectionsArray,
      estimatedTime: formData.estimatedTime,
      difficulty: formData.difficulty
    };

    try {
      const response = await fetch('/api/admin/roadmaps', {
        method: editingRoadmap ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...roadmapData, slug }),
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
      console.error('Error saving roadmap:', error);
      showNotification('error', 'Failed to save roadmap. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (roadmap: RoadmapMeta) => {
    setEditingRoadmap(roadmap.slug);
    setFormData({
      title: roadmap.title,
      description: roadmap.description,
      sections: roadmap.sections.join(', '),
      estimatedTime: roadmap.estimatedTime,
      difficulty: roadmap.difficulty
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
      console.error('Error deleting roadmap:', error);
      showNotification('error', 'Failed to delete roadmap. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      sections: '',
      estimatedTime: '',
      difficulty: 'beginner'
    });
    setShowCreateForm(false);
    setEditingRoadmap(null);
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
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className={styles.input}
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={3}
                    className={styles.textarea}
                    disabled={isSubmitting}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="sections">Sections (comma-separated)</label>
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
                  <label htmlFor="estimatedTime">Estimated Time</label>
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
                  <label htmlFor="difficulty">Difficulty</label>
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
