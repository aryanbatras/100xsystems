/**
 * ## Presentation: Roadmaps Page
 *
 * Lists all learning roadmaps with category
 * filtering and difficulty indicators.
 *
 * @packageDocumentation
 */

'use client';
import Head from 'next/head';
import Link from 'next/link';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import type { KnowledgeGraph } from '../../infrastructure/staticSiteGenerator';
import styles from '../../styles/pages/Roadmaps.module.css';

/**
 * Roadmaps page — structured learning paths with knowledge graph relationships.
 *
 * @remarks
 * Renders roadmap cards built from the knowledge graph at build time (SSG).
 * Each card shows difficulty, estimated time, article count, and section previews.
 *
 * @param knowledgeGraph - Pre-built knowledge graph data passed from getStaticProps
 */
export default function RoadmapsPage({ knowledgeGraph }: { knowledgeGraph: KnowledgeGraph }) {
  const { roadmaps, relationships } = knowledgeGraph;

  return (
    <ProtectedRoute requireAuth={true}>
      <Head>
        <title>Learning Roadmaps - 100x Systems</title>
        <meta name="description" content="Explore our structured learning roadmaps for systems thinking, engineering, and innovation." />
        <meta property="og:title" content="Learning Roadmaps - 100x Systems" />
        <meta property="og:description" content="Explore our structured learning roadmaps for systems thinking, engineering, and innovation." />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.roadmapsContainer}>
        <div className={styles.roadmapsWrapper}>
          <header className={styles.roadmapsHeader}>
            <h1>Learning Roadmaps</h1>
            <p className={styles.roadmapsDescription}>
              Structured learning paths designed to take you from beginner to mastery.
              Each roadmap is carefully curated with articles in logical sequence.
            </p>
          </header>

          <main className={styles.roadmapsMain}>
            {Object.keys(roadmaps).length === 0 ? (
              <div className={styles.noRoadmaps}>
                <p>No roadmaps available yet. Check back soon!</p>
              </div>
            ) : (
              <div className={styles.roadmapsGrid}>
                {Object.values(roadmaps).map((roadmap) => {
                  const articles = relationships.byRoadmap[roadmap.slug] || [];
                  const completedArticles = articles.filter(article => article).length;

                  return (
                    <div key={roadmap.slug} className={styles.roadmapCard}>
                      <Link href={`/roadmaps/${roadmap.slug}`}>
                        <div className={styles.roadmapContent}>
                          <div className={styles.roadmapHeader}>
                            <h2 className={styles.roadmapTitle}>{roadmap.title}</h2>
                            <div className={styles.roadmapMeta}>
                              <span className={`${styles.difficulty} ${styles[roadmap.difficulty]}`}>
                                {roadmap.difficulty}
                              </span>
                              <span className={styles.duration}>{roadmap.estimatedTime}</span>
                            </div>
                          </div>

                          <p className={styles.roadmapDescription}>{roadmap.description}</p>

                          <div className={styles.roadmapStats}>
                            <div className={styles.stat}>
                              <span className={styles.statNumber}>{completedArticles}</span>
                              <span className={styles.statLabel}>Articles</span>
                            </div>
                            <div className={styles.stat}>
                              <span className={styles.statNumber}>{roadmap.sections.length}</span>
                              <span className={styles.statLabel}>Sections</span>
                            </div>
                          </div>

                          <div className={styles.sectionsPreview}>
                            <h4>Sections:</h4>
                            <div className={styles.sectionTags}>
                              {roadmap.sections.slice(0, 4).map((section) => (
                                <span key={section} className={styles.sectionTag}>{section}</span>
                              ))}
                              {roadmap.sections.length > 4 && (
                                <span className={styles.moreTag}>+{roadmap.sections.length - 4} more</span>
                              )}
                            </div>
                          </div>

                          <div className={styles.roadmapFooter}>
                            <span className={styles.startLearning}>Start Learning →</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
