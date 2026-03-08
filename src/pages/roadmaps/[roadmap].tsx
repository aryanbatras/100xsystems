import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { StaticSiteGenerator, KnowledgeGraph, RoadmapMeta, ArticleManifest } from '../../core/infrastructure/staticSiteGenerator';
import styles from './Roadmap.module.css';

interface RoadmapProps {
  roadmap: RoadmapMeta;
  articles: ArticleManifest[];
  knowledgeGraph: KnowledgeGraph;
}

export default function Roadmap({ roadmap, articles, knowledgeGraph }: RoadmapProps) {
  const { relationships } = knowledgeGraph;
  
  // Group articles by section
  const articlesBySection = articles.reduce((acc, article) => {
    if (!acc[article.section]) {
      acc[article.section] = [];
    }
    acc[article.section].push(article);
    return acc;
  }, {} as Record<string, ArticleManifest[]>);

  // Sort articles within each section by order
  Object.keys(articlesBySection).forEach(section => {
    articlesBySection[section].sort((a, b) => a.order - b.order);
  });

  return (
    <>
      <Head>
        <title>{roadmap.title} - 100x Systems</title>
        <meta name="description" content={roadmap.description} />
        <meta property="og:title" content={roadmap.title} />
        <meta property="og:description" content={roadmap.description} />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.roadmapContainer}>
        <div className={styles.roadmapWrapper}>
          <header className={styles.roadmapHeader}>
            <Link href="/roadmaps" className={styles.backLink}>
              ← Back to Roadmaps
            </Link>
            <div className={styles.roadmapMeta}>
              <h1 className={styles.roadmapTitle}>{roadmap.title}</h1>
              <div className={styles.roadmapInfo}>
                <span className={`${styles.difficulty} ${styles[roadmap.difficulty]}`}>
                  {roadmap.difficulty}
                </span>
                <span className={styles.duration}>{roadmap.estimatedTime}</span>
                <span className={styles.articleCount}>{articles.length} articles</span>
              </div>
            </div>
            <p className={styles.roadmapDescription}>{roadmap.description}</p>
          </header>

          <main className={styles.roadmapMain}>
            {Object.keys(articlesBySection).length === 0 ? (
              <div className={styles.noArticles}>
                <p>No articles available in this roadmap yet.</p>
              </div>
            ) : (
              <div className={styles.sectionsContainer}>
                {roadmap.sections.map((section) => {
                  const sectionArticles = articlesBySection[section] || [];
                  
                  return (
                    <section key={section} className={styles.section}>
                      <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{section}</h2>
                        <span className={styles.sectionCount}>
                          {sectionArticles.length} articles
                        </span>
                      </div>

                      {sectionArticles.length === 0 ? (
                        <div className={styles.emptySection}>
                          <p>No articles in this section yet.</p>
                        </div>
                      ) : (
                        <div className={styles.articlesList}>
                          {sectionArticles.map((article) => (
                            <article key={article.slug} className={styles.articleCard}>
                              <Link href={`/articles/${article.slug}`}>
                                <div className={styles.articleContent}>
                                  <div className={styles.articleHeader}>
                                    <span className={styles.articleOrder}>
                                      {article.order}
                                    </span>
                                    <h3 className={styles.articleTitle}>
                                      {article.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </h3>
                                  </div>
                                  
                                  <div className={styles.articleMeta}>
                                    <span className={`${styles.articleDifficulty} ${styles[article.difficulty]}`}>
                                      {article.difficulty}
                                    </span>
                                    {article.author && (
                                      <span className={styles.articleAuthor}>
                                        by {article.author}
                                      </span>
                                    )}
                                  </div>

                                  {article.tags.length > 0 && (
                                    <div className={styles.articleTags}>
                                      {article.tags.map((tag) => (
                                        <span key={tag} className={styles.tag}>
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  <div className={styles.articleFeatures}>
                                    {article.podcast?.enabled && (
                                      <span className={styles.feature} title="Podcast Available">
                                        🎧 Podcast
                                      </span>
                                    )}
                                    {article.discussion?.enabled && (
                                      <span className={styles.feature} title="Discussion Enabled">
                                        💬 Discussion
                                      </span>
                                    )}
                                    {article.resources?.externalLinks?.length && (
                                      <span className={styles.feature} title="External Resources">
                                        🔗 Resources
                                      </span>
                                    )}
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
                  )}
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const knowledgeGraph = await StaticSiteGenerator.buildKnowledgeGraph();
    const roadmaps = Object.keys(knowledgeGraph.roadmaps);
    
    const paths = roadmaps.map(roadmap => ({
      params: { roadmap }
    }));

    console.log(`✅ Generated ${paths.length} roadmap paths for static site`);

    return {
      paths,
      fallback: false
    };

  } catch (error) {
    console.error('❌ Error generating roadmap paths:', error);
    return {
      paths: [],
      fallback: false
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { roadmap } = params as { roadmap: string };
    const knowledgeGraph = await StaticSiteGenerator.buildKnowledgeGraph();
    
    const roadmapData = knowledgeGraph.roadmaps[roadmap];
    if (!roadmapData) {
      return { notFound: true };
    }

    const articles = knowledgeGraph.relationships.byRoadmap[roadmap] || [];

    console.log(`✅ Generated static page for roadmap: ${roadmap}`);

    return {
      props: {
        roadmap: roadmapData,
        articles,
        knowledgeGraph
      },
      revalidate: false
    };

  } catch (error) {
    console.error(`❌ Error generating roadmap page for ${params?.roadmap}:`, error);
    return {
      notFound: true
    };
  }
};
