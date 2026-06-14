/**
 * ## Resources
 *
 * Resources feature module.
 * Contains all components, types, and logic for the resources domain.
 *
 * @packageDocumentation
 * @module resources
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Fuse from 'fuse.js';
import styles from '../_styles/css/resources.module.css';
import { Resource } from '../../application/types/resources.types';

// ============================================================
// Source: resources.tsx
// ============================================================
export interface ResourcesCategoryInfo {
  category: string;
  displayName: string;
  description: string;
  icon: string;
  subcategories: string[];
  allowedTypes: string[];
}

/**
 * Resources page — browsable collection of curated learning resources.
 *
 * @remarks
 * Features category/subcategory drill-down, fuzzy search via Fuse.js,
 * tag filtering, minimal/detailed view toggle, and favicon extraction.
 * Resource data is pre-fetched at build time via SSG.
 *
 * @param initialResources - All curated resources from getStaticProps
 * @param categories - Category hierarchy with metadata from getStaticProps
 */
export function ResourcesPage({
  resources: initialResources,
  categories,
}: {
  resources: Resource[];
  categories: Record<string, ResourcesCategoryInfo>;
}) {
  const [resources] = useState<Resource[]>(initialResources);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<string>>(new Set());
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'minimal' | 'detailed'>('minimal');
  const [selectedTags, setSelectedTags] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const fuseOptions = {
    keys: ['title', 'description', 'tags', 'author', 'category', 'subcategory'],
    threshold: 0.3, includeScore: true, ignoreLocation: true,
    includeMatches: true, minMatchCharLength: 2,
  };

  const fuse = useMemo(() => new Fuse(resources, fuseOptions), [resources]);

  const filteredResources = useMemo(() => {
    if (!searchQuery.trim()) return resources;
    return fuse.search(searchQuery).map(r => r.item);
  }, [searchQuery, fuse]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const matchingCategories = new Set<string>();
      const matchingSubcategories = new Set<string>();

      fuse.search(searchQuery).forEach(result => {
        matchingCategories.add(result.item.category);
        if (result.item.subcategory) matchingSubcategories.add(result.item.subcategory);
      });

      Object.entries(categories).forEach(([categoryKey, category]) => {
        const categoryFuse = new Fuse([category], { keys: ['displayName', 'description'], threshold: 0.3 });
        if (categoryFuse.search(searchQuery).length > 0) matchingCategories.add(categoryKey);

        const subcategoryFuse = new Fuse(category.subcategories.map(name => ({ name })), { keys: ['name'], threshold: 0.3 });
        subcategoryFuse.search(searchQuery).forEach(r => {
          matchingCategories.add(categoryKey);
          matchingSubcategories.add(r.item.name);
        });
      });

      setExpandedSections(matchingCategories);
      setExpandedSubcategories(matchingSubcategories);
    } else {
      setExpandedSections(new Set());
      setExpandedSubcategories(new Set());
    }
  }, [searchQuery, categories, fuse]);

  const analytics = useMemo(() => ({
    totalResources: resources.length,
    totalCategories: Object.keys(categories).length,
    typeDistribution: resources.reduce((acc, r) => { acc[r.type] = (acc[r.type] || 0) + 1; return acc; }, {} as Record<string, number>),
    qualityDistribution: resources.reduce((acc, r) => { acc[r.quality] = (acc[r.quality] || 0) + 1; return acc; }, {} as Record<string, number>),
    categoryDistribution: resources.reduce((acc, r) => { acc[r.category] = (acc[r.category] || 0) + 1; return acc; }, {} as Record<string, number>),
    mostCommonTags: resources.reduce((acc, r) => { r.tags.forEach(t => { acc[t] = (acc[t] || 0) + 1; }); return acc; }, {} as Record<string, number>),
    topAuthors: resources.reduce((acc, r) => { if (r.author) acc[r.author] = (acc[r.author] || 0) + 1; return acc; }, {} as Record<string, number>),
    recentlyAdded: resources.slice(0, 5),
    mostViewed: resources.slice(0, 5),
    highestQuality: resources.filter(r => r.quality === 'gold').slice(0, 5),
  }), [resources, categories]);

  const getResourcesForCategory = (categoryKey: string) => resources.filter(r => r.category === categoryKey);
  const getAllResourcesForSubcategory = (subcategoryKey: string) => filteredResources.filter(r => r.subcategory === subcategoryKey);

  const getResourcesForSubcategory = (subcategoryKey: string) => {
    const base = filteredResources.filter(r => r.subcategory === subcategoryKey);
    if (!searchQuery.trim()) {
      const tag = selectedTags[subcategoryKey];
      return tag ? base.filter(r => r.tags.includes(tag)) : base;
    }
    return base;
  };

  const getSubcategoryTags = (subcategoryKey: string) =>
    [...new Set(getAllResourcesForSubcategory(subcategoryKey).flatMap(r => r.tags))].sort();

  const getFavicon = (url: string) => {
    try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`; }
    catch { return ''; }
  };

  return (
    <>
      <Head>
        <title>Resources - 100x Systems</title>
        <meta name="description" content="Comprehensive collection of learning resources organized by categories and subcategories" />
        <meta name="keywords" content="resources, learning, education, development, programming" />
      </Head>

      <div className={styles.resourcesContainer}>
        <div className={styles.resourcesWrapper}>
          <header className={styles.resourcesHeader}>
            <div className={styles.headerContent}>
              <div className={styles.headerLeft}>
                <h1>Resources</h1>
                <p className={styles.resourcesDescription}>
                  Comprehensive collection of learning resources organized by categories and subcategories.
                </p>
                <div className={styles.stats}>
                  <span className={styles.stat}>
                    <span className={styles.statNumber}>{analytics.totalResources}</span>
                    <span className={styles.statLabel}>Total Resources</span>
                  </span>
                  <span className={styles.stat}>
                    <span className={styles.statNumber}>{analytics.totalCategories}</span>
                    <span className={styles.statLabel}>Categories</span>
                  </span>
                </div>
              </div>
              <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <input
                    type="text"
                    placeholder="Search resources, tags, authors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>
              <div className={styles.controlsSection}>
                <div className={styles.viewToggle}>
                  <button className={`${styles.viewButton} ${viewMode === 'minimal' ? styles.active : ''}`} onClick={() => setViewMode('minimal')}>Minimal</button>
                  <button className={`${styles.viewButton} ${viewMode === 'detailed' ? styles.active : ''}`} onClick={() => setViewMode('detailed')}>Detailed</button>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.resourcesMain}>
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className={styles.section}>
                <div className={styles.sectionHeader} onClick={() => {
                  const next = new Set(expandedSections);
                  next.has(key) ? next.delete(key) : next.add(key);
                  setExpandedSections(next);
                }}>
                  <h2 className={styles.sectionTitle}>{category.displayName}</h2>
                  <div className={styles.sectionStats}>{category.subcategories.length} subcategories</div>
                </div>

                {expandedSections.has(key) && (
                  <div className={styles.sectionContent}>
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory} className={styles.category}>
                        <div className={styles.categoryHeader} onClick={() => {
                          const next = new Set(expandedSubcategories);
                          next.has(subcategory) ? next.delete(subcategory) : next.add(subcategory);
                          setExpandedSubcategories(next);
                        }}>
                          <h3 className={styles.categoryTitle}>
                            {subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </h3>
                          <span className={styles.categoryCount}>
                            {getResourcesForSubcategory(subcategory).length} resources
                          </span>
                        </div>

                        {expandedSubcategories.has(subcategory) && (
                          <div className={styles.resourcesList}>
                            {getResourcesForSubcategory(subcategory).length > 0 && (
                              <div className={styles.subcategoryTagFilter}>
                                <div className={styles.subcategoryTagGrid}>
                                  {getSubcategoryTags(subcategory).map(tag => (
                                    <button
                                      key={tag}
                                      className={`${styles.subcategoryTagButton} ${selectedTags[subcategory] === tag ? styles.subcategoryTagActive : ''}`}
                                      onClick={() => {
                                        setSelectedTags(prev => {
                                          if (prev[subcategory] === tag) {
                                            const next = { ...prev }; delete next[subcategory]; return next;
                                          }
                                          return { ...prev, [subcategory]: tag };
                                        });
                                      }}
                                    >{tag}</button>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className={styles.resourcesGrid}>
                              {getResourcesForSubcategory(subcategory).map(resource => (
                                <div
                                  key={resource.id}
                                  className={`${styles.resourceCard} ${selectedResource === resource.id ? styles.selected : ''} ${viewMode === 'minimal' ? styles.minimalCard : styles.detailedCard}`}
                                  onClick={() => viewMode === 'minimal'
                                    ? window.open(resource.url, '_blank')
                                    : setSelectedResource(selectedResource === resource.id ? null : resource.id)
                                  }
                                >
                                  {viewMode === 'minimal' ? (
                                    <div className={styles.minimalContent}>
                                      <img src={getFavicon(resource.url)} alt={resource.title}
                                        className={styles.minimalFavicon}
                                        onError={e => { (e.currentTarget as HTMLImageElement).src = '/placeholder-favicon.webp'; }}
                                      />
                                      <h3 className={styles.minimalTitle}>{resource.title}</h3>
                                    </div>
                                  ) : (
                                    <>
                                      <div className={styles.resourceHeader}>
                                        <img src={getFavicon(resource.url)} alt={resource.title}
                                          className={styles.resourceFavicon}
                                          onError={e => { (e.currentTarget as HTMLImageElement).src = '/placeholder-favicon.webp'; }}
                                        />
                                        <div className={styles.resourceTitle}>
                                          <h3>{resource.title}</h3>
                                          <p className={styles.resourceDescription}>{resource.description}</p>
                                        </div>
                                      </div>
                                      <div className={styles.resourceDetails}>
                                        <div className={styles.detailRow}><span className={styles.detailLabel}>Type:</span><span className={styles.detailValue}>{resource.type}</span></div>
                                        <div className={styles.detailRow}><span className={styles.detailLabel}>Quality:</span><span className={styles.detailValue}>{resource.quality}</span></div>
                                        {resource.difficulty && <div className={styles.detailRow}><span className={styles.detailLabel}>Difficulty:</span><span className={styles.detailValue}>{resource.difficulty}</span></div>}
                                        {resource.tags?.length > 0 && (
                                          <div className={styles.detailRow}>
                                            <span className={styles.detailLabel}>Tags:</span>
                                            <div className={styles.tagsContainer}>{resource.tags.map((t, i) => <span key={i} className={styles.tag}>{t}</span>)}</div>
                                          </div>
                                        )}
                                        {resource.author && <div className={styles.detailRow}><span className={styles.detailLabel}>Author:</span><span className={styles.detailValue}>{resource.author}</span></div>}
                                      </div>
                                      <div className={styles.resourceFooter}>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>Visit Resource →</a>
                                        {resource.accessType && <span className={styles.accessType}>{resource.accessType.charAt(0).toUpperCase() + resource.accessType.slice(1)}</span>}
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
