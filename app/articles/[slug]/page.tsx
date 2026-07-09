import { Metadata } from 'next';
import Link from 'next/link';
import { StaticSiteGenerator, ArticleManifest } from '@/infrastructure/staticSiteGenerator';
import { GiscusComments, DiscussionProvider } from '@/presentation/features/discussions.feature';
import styles from '@/presentation/_styles/css/articles.module.css';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

interface ArticleData {
  html: string;
  title: string | null;
  description: string | null;
  date: string | null;
  manifest?: ArticleManifest;
}

async function getArticleData(slug: string): Promise<ArticleData | null> {
  try {
    const articleData = await StaticSiteGenerator.fetchArticleWithManifest(slug);
    StaticSiteGenerator.validateArticleSize(articleData.html, slug);
    const optimizedHtml = StaticSiteGenerator.optimizeHtmlForStatic(articleData.html);
    return { ...articleData, html: optimizedHtml };
  } catch (error) {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await StaticSiteGenerator.fetchArticleFolders();
    return slugs.map((slug: string) => ({ slug }));
  } catch (error) {
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const data = await getArticleData(slug);

  if (!data) {
    return <div>Article not found</div>;
  }

  const { html, title, description, date, manifest } = data;
  const discussionEnabled = manifest?.discussion?.enabled || false;
  const articleTitle = title || slug;

  return (
    <>
      <div className={styles.articleContainer}>
        <div className={styles.articleWrapper}>
          <header className={styles.articleHeader}>
            <Link href="/articles" className={styles.backLink}>
              ← Back to Articles
            </Link>
            <h1 className={styles.articleTitle}>{articleTitle}</h1>
            {date && (
              <p className={styles.articleDate}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </header>

          <main className={styles.articleContent}>
            <div className={styles.articleBody} dangerouslySetInnerHTML={{ __html: html }} />
          </main>

          {manifest && (
            <div className={styles.articleFeatures}>
              {manifest.podcast?.enabled && manifest.podcast.url && (
                <section className={styles.podcastSection}>
                  <h3>🎧 Podcast Version</h3>
                  <audio controls className={styles.podcastPlayer}>
                    <source src={manifest.podcast.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </section>
              )}

              {manifest.resources && (
                <section className={styles.resourcesSection}>
                  <h3>📚 Resources</h3>
                  {manifest.resources.externalLinks && manifest.resources.externalLinks.length > 0 && (
                    <div className={styles.resourceGroup}>
                      <h4>External Links</h4>
                      <ul className={styles.resourceList}>
                        {manifest.resources.externalLinks.map((link: string, index: number) => (
                          <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>{link}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {manifest.resources.codeExamples && manifest.resources.codeExamples.length > 0 && (
                    <div className={styles.resourceGroup}>
                      <h4>Code Examples</h4>
                      <ul className={styles.resourceList}>
                        {manifest.resources.codeExamples.map((example: string, index: number) => (
                          <li key={index}><span className={styles.codeExample}>{example}</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {manifest.tags && manifest.tags.length > 0 && (
                <section className={styles.tagsSection}>
                  <h3>🏷️ Tags</h3>
                  <div className={styles.tagsContainer}>
                    {manifest.tags.map((tag: string) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </section>
              )}

              {manifest.roadmaps && manifest.roadmaps.length > 0 && (
                <section className={styles.roadmapSection}>
                  <h3>🗺️ Part of Roadmaps</h3>
                  <div className={styles.roadmapLinks}>
                    {manifest.roadmaps.map((roadmapSlug: string) => (
                      <Link key={roadmapSlug} href={`/roadmaps/${roadmapSlug}`} className={styles.roadmapLink}>
                        {roadmapSlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {discussionEnabled && (
            <DiscussionProvider enabled={discussionEnabled}>
              <section className={styles.discussionSection}>
                <h2 className={styles.discussionTitle}>💬 Discussion</h2>
                <GiscusComments title={articleTitle} className={styles.giscusComments} />
              </section>
            </DiscussionProvider>
          )}

          <footer className={styles.articleFooter}>
            <Link href="/articles" className={styles.backLink}>
              ← Back to Articles
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}
