import { GetStaticProps } from "next";
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Resource, ResourceCategory } from "../../types/resources";
import styles from "../../styles/pages/Resources.module.css";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";
import { StaticSiteGenerator } from "../../core/infrastructure/staticSiteGenerator";

interface ResourcesProps {
  resources: Resource[];
  categories: Record<
    string,
    {
      category: string;
      displayName: string;
      description: string;
      icon: string;
      subcategories: string[];
      allowedTypes: string[];
    }
  >;
}

export default function Resources({
  resources: initialResources,
  categories,
}: ResourcesProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );
  const [expandedSubcategories, setExpandedSubcategories] = useState<
    Set<string>
  >(new Set());
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"minimal" | "detailed">("minimal");
  const [selectedTags, setSelectedTags] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
  }, [categories]);

  const fuseOptions = {
    keys: ["title", "description", "tags", "author", "category", "subcategory"],
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true,
    includeMatches: true,
    minMatchCharLength: 2,
  };

  const fuse = useMemo(() => new Fuse(resources, fuseOptions), [resources]);

  const filteredResources = useMemo(() => {
    if (!searchQuery.trim()) {
      return resources;
    }

    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [searchQuery, fuse]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const matchingCategories = new Set<string>();
      const matchingSubcategories = new Set<string>();

      // Use Fuse results to determine matching categories and subcategories
      const searchResults = fuse.search(searchQuery);

      searchResults.forEach((result) => {
        const resource = result.item;
        matchingCategories.add(resource.category);
        if (resource.subcategory) {
          matchingSubcategories.add(resource.subcategory);
        }
      });

      // Also search in category/subcategory names directly
      Object.entries(categories).forEach(([categoryKey, category]) => {
        const categoryFuse = new Fuse([category], {
          keys: ["displayName", "description"],
          threshold: 0.3,
        });

        if (categoryFuse.search(searchQuery).length > 0) {
          matchingCategories.add(categoryKey);
        }

        // Search in subcategory names
        const subcategoryFuse = new Fuse(
          category.subcategories.map((name) => ({ name })),
          {
            keys: ["name"],
            threshold: 0.3,
          },
        );

        const matchingSubcategoryResults = subcategoryFuse.search(searchQuery);
        matchingSubcategoryResults.forEach((result) => {
          matchingCategories.add(categoryKey);
          matchingSubcategories.add(result.item.name);
        });
      });

      // Auto-expand matching categories and subcategories, close others
      setExpandedSections(matchingCategories);
      setExpandedSubcategories(matchingSubcategories);
    } else {
      // Clear all expansions when search is empty
      setExpandedSections(new Set());
      setExpandedSubcategories(new Set());
    }
  }, [searchQuery, categories, fuse]);

  const analytics = {
    totalResources: resources.length,
    totalCategories: Object.keys(categories).length,
    typeDistribution: resources.reduce(
      (acc, resource) => {
        acc[resource.type] = (acc[resource.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
    qualityDistribution: resources.reduce(
      (acc, resource) => {
        acc[resource.quality] = (acc[resource.quality] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
    categoryDistribution: resources.reduce(
      (acc, resource) => {
        acc[resource.category] = (acc[resource.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
    mostCommonTags: resources.reduce(
      (acc, resource) => {
        resource.tags.forEach((tag) => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>,
    ),
    topAuthors: resources.reduce(
      (acc, resource) => {
        if (resource.author) {
          acc[resource.author] = (acc[resource.author] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    ),
    recentlyAdded: resources.slice(0, 5),
    mostViewed: resources.slice(0, 5),
    highestQuality: resources.filter((r) => r.quality === "gold").slice(0, 5),
  };

  const toggleSection = (sectionName: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  const toggleSubcategory = (subcategoryName: string) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryName)) {
      newExpanded.delete(subcategoryName);
    } else {
      newExpanded.add(subcategoryName);
    }
    setExpandedSubcategories(newExpanded);
  };

  const handleResourceClick = (resourceId: string) => {
    setSelectedResource(resourceId === selectedResource ? null : resourceId);
  };

  const getResourcesForCategory = (categoryKey: string) => {
    return resources.filter((resource) => {
      return resource.category === categoryKey;
    });
  };

  const getAllResourcesForSubcategory = (subcategoryKey: string) => {
    return filteredResources.filter((resource) => {
      return resource.subcategory === subcategoryKey;
    });
  };

  const getResourcesForSubcategory = (subcategoryKey: string) => {
    const baseResources = filteredResources.filter((resource) => {
      return resource.subcategory === subcategoryKey;
    });

    if (!searchQuery.trim()) {
      // Apply tag filtering only when not searching
      const selectedTagForSubcategory = selectedTags[subcategoryKey];
      return baseResources.filter(
        (resource) =>
          !selectedTagForSubcategory ||
          resource.tags.includes(selectedTagForSubcategory),
      );
    }

    return baseResources;
  };

  const toggleTag = (subcategoryKey: string, tag: string) => {
    setSelectedTags((prev) => {
      const currentTag = prev[subcategoryKey];
      if (currentTag === tag) {
        const newTags = { ...prev };
        delete newTags[subcategoryKey];
        return newTags;
      } else {
        return { ...prev, [subcategoryKey]: tag };
      }
    });
  };

  const clearTags = (subcategoryKey: string) => {
    setSelectedTags((prev) => {
      const newTags = { ...prev };
      delete newTags[subcategoryKey];
      return newTags;
    });
  };

  const getSubcategoryTags = (subcategoryKey: string) => {
    const subcategoryTags = new Set<string>();
    getAllResourcesForSubcategory(subcategoryKey).forEach((resource) => {
      resource.tags.forEach((tag) => subcategoryTags.add(tag));
    });
    return Array.from(subcategoryTags).sort();
  };

  const getFavicon = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return "";
    }
  };

  return (
    <>
      <Head>
        <title>Resources - 100x Systems</title>
        <meta
          name="description"
          content="Comprehensive collection of learning resources organized by categories and subcategories"
        />
        <meta
          name="keywords"
          content="resources, learning, education, development, programming"
        />
      </Head>

      {/* <ProtectedRoute> */}
      <div className={styles.resourcesContainer}>
        <div className={styles.resourcesWrapper}>
          <header className={styles.resourcesHeader}>
            <div className={styles.headerContent}>
              <div className={styles.headerLeft}>
                <h1>Resources</h1>
                <p className={styles.resourcesDescription}>
                  Comprehensive collection of learning resources organized by
                  categories and subcategories. Find tutorials, articles,
                  documentation, and tools to accelerate your learning journey.
                </p>
                <div className={styles.stats}>
                  <span className={styles.stat}>
                    <span className={styles.statNumber}>
                      {analytics.totalResources}
                    </span>
                    <span className={styles.statLabel}>Total Resources</span>
                  </span>
                  <span className={styles.stat}>
                    <span className={styles.statNumber}>
                      {analytics.totalCategories}
                    </span>
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
                  <button
                    className={`${styles.viewButton} ${viewMode === "minimal" ? styles.active : ""}`}
                    onClick={() => setViewMode("minimal")}
                  >
                    Minimal
                  </button>
                  <button
                    className={`${styles.viewButton} ${viewMode === "detailed" ? styles.active : ""}`}
                    onClick={() => setViewMode("detailed")}
                  >
                    Detailed
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className={styles.resourcesMain}>
            {Object.entries(categories).map(([key, category]) => (
              <div key={key} className={styles.section}>
                <div
                  className={styles.sectionHeader}
                  onClick={() => toggleSection(key)}
                >
                  <h2 className={styles.sectionTitle}>
                    {/* {category.icon}  */}
                    {category.displayName}
                    {/* <span
                      className={`${styles.expandIcon} ${expandedSections.has(key) ? styles.expanded : ""}`}
                    >
                      {expandedSections.has(key) ? "▲" : "▼"}
                    </span> */}
                  </h2>
                  <div className={styles.sectionStats}>
                    {category.subcategories.length} subcategories
                  </div>
                </div>

                {expandedSections.has(key) && (
                  <div className={styles.sectionContent}>
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory} className={styles.category}>
                        <div
                          className={styles.categoryHeader}
                          onClick={() => toggleSubcategory(subcategory)}
                        >
                          <h3 className={styles.categoryTitle}>
                            {subcategory
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                          </h3>
                          <span className={styles.categoryCount}>
                            {getResourcesForSubcategory(subcategory).length}{" "}
                            resources
                          </span>
                        </div>

                        {expandedSubcategories.has(subcategory) && (
                          <div className={styles.resourcesList}>
                            {getResourcesForSubcategory(subcategory).length >
                              0 && (
                              <div className={styles.subcategoryTagFilter}>
                                <div className={styles.subcategoryTagGrid}>
                                  {getSubcategoryTags(subcategory).map(
                                    (tag) => (
                                      <button
                                        key={tag}
                                        className={`${styles.subcategoryTagButton} ${selectedTags[subcategory] === tag ? styles.subcategoryTagActive : ""}`}
                                        onClick={() =>
                                          toggleTag(subcategory, tag)
                                        }
                                      >
                                        {tag}
                                      </button>
                                    ),
                                  )}
                                </div>
                                {/* {selectedTags[subcategory] && (
                                  <button
                                    className={styles.subcategoryClearButton}
                                    onClick={() => clearTags(subcategory)}
                                  >
                                    Clear
                                  </button>
                                )} */}
                              </div>
                            )}

                            <div className={styles.resourcesGrid}>
                              {getResourcesForSubcategory(subcategory).map(
                                (resource) => (
                                  <div
                                    key={resource.id}
                                    className={`${styles.resourceCard} ${selectedResource === resource.id ? styles.selected : ""} ${viewMode === "minimal" ? styles.minimalCard : styles.detailedCard}`}
                                    onClick={() =>
                                      viewMode === "minimal"
                                        ? window.open(resource.url, "_blank")
                                        : handleResourceClick(resource.id)
                                    }
                                  >
                                    {viewMode === "minimal" ? (
                                      <div className={styles.minimalContent}>
                                        <img
                                          src={getFavicon(resource.url)}
                                          alt={resource.title}
                                          className={styles.minimalFavicon}
                                          onError={(e) =>
                                            (e.currentTarget.src =
                                              "/placeholder-favicon.webp")
                                          }
                                        />
                                        <h3 className={styles.minimalTitle}>
                                          {resource.title}
                                        </h3>
                                      </div>
                                    ) : (
                                      <>
                                        <div className={styles.resourceHeader}>
                                          <img
                                            src={getFavicon(resource.url)}
                                            alt={resource.title}
                                            className={styles.resourceFavicon}
                                            onError={(e) =>
                                              (e.currentTarget.src =
                                                "/placeholder-favicon.webp")
                                            }
                                          />
                                          <div className={styles.resourceTitle}>
                                            <h3>{resource.title}</h3>
                                            <p
                                              className={
                                                styles.resourceDescription
                                              }
                                            >
                                              {resource.description}
                                            </p>
                                          </div>
                                        </div>

                                        <div className={styles.resourceDetails}>
                                          <div className={styles.detailRow}>
                                            <span
                                              className={styles.detailLabel}
                                            >
                                              Type:
                                            </span>
                                            <span
                                              className={styles.detailValue}
                                            >
                                              {resource.type}
                                            </span>
                                          </div>
                                          <div className={styles.detailRow}>
                                            <span
                                              className={styles.detailLabel}
                                            >
                                              Quality:
                                            </span>
                                            <span
                                              className={styles.detailValue}
                                            >
                                              {resource.quality}
                                            </span>
                                          </div>
                                          {resource.difficulty && (
                                            <div className={styles.detailRow}>
                                              <span
                                                className={styles.detailLabel}
                                              >
                                                Difficulty:
                                              </span>
                                              <span
                                                className={styles.detailValue}
                                              >
                                                {resource.difficulty}
                                              </span>
                                            </div>
                                          )}
                                          {resource.tags &&
                                            resource.tags.length > 0 && (
                                              <div className={styles.detailRow}>
                                                <span
                                                  className={styles.detailLabel}
                                                >
                                                  Tags:
                                                </span>
                                                <div
                                                  className={
                                                    styles.tagsContainer
                                                  }
                                                >
                                                  {resource.tags.map(
                                                    (tag, index) => (
                                                      <span
                                                        key={index}
                                                        className={styles.tag}
                                                      >
                                                        {tag}
                                                      </span>
                                                    ),
                                                  )}
                                                </div>
                                              </div>
                                            )}
                                          {resource.author && (
                                            <div className={styles.detailRow}>
                                              <span
                                                className={styles.detailLabel}
                                              >
                                                Author:
                                              </span>
                                              <span
                                                className={styles.detailValue}
                                              >
                                                {resource.author}
                                              </span>
                                            </div>
                                          )}
                                        </div>

                                        <div className={styles.resourceFooter}>
                                          <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.visitButton}
                                          >
                                            Visit Resource →
                                          </a>
                                          {resource.accessType && (
                                            <span className={styles.accessType}>
                                              {resource.accessType
                                                .charAt(0)
                                                .toUpperCase() +
                                                resource.accessType.slice(1)}
                                            </span>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                ),
                              )}
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
        {/* )} */}
      </div>
      {/* </div>
      </ProtectedRoute> */}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    
    // Fetch resources and categories at build time using StaticSiteGenerator
    const [resources, categories] = await Promise.all([
      StaticSiteGenerator.fetchAllResources(),
      StaticSiteGenerator.fetchResourceCategories()
    ]);


    return {
      props: {
        resources,
        categories
      }
    };
  } catch (error) {
    
    return {
      props: {
        resources: [],
        categories: {}
      }
    };
  }
};
