import { Metadata } from 'next';
import Link from 'next/link';
import { StaticSiteGenerator, KnowledgeGraph, RoadmapMeta, ArticleManifest } from '@/infrastructure/staticSiteGenerator';
import styles from '@/presentation/_styles/css/roadmap.module.css';

interface RoadmapPageProps {
  params: Promise<{ roadmap: string }>;
}

interface RoadmapData {
  roadmap: RoadmapMeta;
  articles: ArticleManifest[];
  knowledgeGraph: KnowledgeGraph;
}

async function getRoadmapData(roadmap: string): Promise<RoadmapData | null> {
  try {
    const knowledgeGraph = await StaticSiteGenerator.buildKnowledgeGraph();
    const roadmapData = knowledgeGraph.roadmaps[roadmap];
    if (!roadmapData) return null;
    const articles = knowledgeGraph.relationships.byRoadmap[roadmap] || [];
    return { roadmap: roadmapData, articles, knowledgeGraph };
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const knowledgeGraph = await StaticSiteGenerator.buildKnowledgeGraph();
    return Object.keys(knowledgeGraph.roadmaps).map(roadmap => ({ roadmap }));
  } catch (error) {
    return [];
  }
}

export default async function RoadmapDetailPage({ params }: RoadmapPageProps) {
  const { roadmap } = await params;
  const data = await getRoadmapData(roadmap);

  if (!data) {
    return <div>Roadmap not found</div>;
  }

  const roadmapData = data.roadmap;
  const articles = data.articles || [];

  const articlesBySection: Record<string, ArticleManifest[]> = {};
  
  for (const article of articles) {
    const section = article.section || 'General';
    if (!articlesBySection[section]) {
      articlesBySection[section] = [];
    }
    articlesBySection[section].push(article);
  }

  Object.keys(articlesBySection).forEach(section => {
    articlesBySection[section].sort((a, b) => a.order - b.order);
  });

  const sections = roadmapData.sections || [];

  return (
    <>
      <div className={styles.roadmapContainer}>
        <div className={styles.roadmapWrapper}>
          <header className={styles.roadmapHeader}>
            <Link href="/roadmaps" className={styles.backLink}>
              ← Back to Roadmaps
            </Link>
            <div className={styles.roadmapMeta}>
              <h1 className={styles.roadmapTitle}>{roadmapData.title}</h1>
              <div className={styles.roadmapInfo}>
                <span className={`${styles.difficulty} ${styles[roadmapData.difficulty]}`}>{roadmapData.difficulty}</span>
                <span className={styles.duration}>{roadmapData.estimatedTime}</span>
                <span className={styles.articleCount}>{articles.length} articles</span>
              </div>
            </div>
            <p className={styles.roadmapDescription}>{roadmapData.description}</p>
          </header>

          <main className={styles.roadmapMain}>
            {sections.length === 0 ? (
              <div className={styles.noArticles}><p>No articles available in this roadmap yet.</p></div>
            ) : (
              <div className={styles.sectionsContainer}>
                {sections.map((section: string) => {
                  const sectionArticles = articlesBySection[section] || [];
                  return (
                    <section key={section} className={styles.section}>
                      <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{section}</h2>
                        <span className={styles.sectionCount}>{sectionArticles.length} articles</span>
                      </div>
                      {sectionArticles.length === 0 ? (
                        <div className={styles.emptySection}><p>No articles in this section yet.</p></div>
                      ) : (
                        <div className={styles.articlesList}>
                          {sectionArticles.map((article) => (
                            <article key={article.slug} className={styles.articleCard}>
                              <Link href={`/articles/${article.slug}`}>
                                <div className={styles.articleContent}>
                                  <div className={styles.articleHeader}>
                                    <span className={styles.articleOrder}>{article.order}</span>
                                    <h3 className={styles.articleTitle}>
                                      {(article.slug || '').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                    </h3>
                                  </div>
                                  <div className={styles.articleMeta}>
                                    <span className={`${styles.articleDifficulty} ${styles[article.difficulty]}`}>{article.difficulty}</span>
                                    {article.author && <span className={styles.articleAuthor}>by {article.author}</span>}
                                  </div>
                                  {article.tags && article.tags.length > 0 && (
                                    <div className={styles.articleTags}>
                                      {article.tags.map((tag: string) => <span key={tag} className={styles.tag}>{tag}</span>)}
                                    </div>
                                  )}
                                  <div className={styles.articleFeatures}>
                                    {article.podcast?.enabled && <span className={styles.feature} title="Podcast Available">🎧 Podcast</span>}
                                    {article.discussion?.enabled && <span className={styles.feature} title="Discussion Enabled">💬 Discussion</span>}
                                    {article.resources?.externalLinks?.length && <span className={styles.feature} title="External Resources">🔗 Resources</span>}
                                  </div>
                                  <div className={styles.articleFooter}>
                                    <span className={styles.readMore}>Read Article →</span>
                                  </div>
                                </div>
                              </Link>
                            </article>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
