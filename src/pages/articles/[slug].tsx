import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { StaticSiteGenerator, ArticleManifest } from '../../core/infrastructure/staticSiteGenerator';
import GiscusComments from '../../components/discussions/GiscusComments';
import { DiscussionProvider } from '../../components/discussions/DiscussionProvider';
import styles from './Articles.module.css';
import { useChat } from '../../contexts/ChatContext';
import AdvancedChatBot from '../../components/ai/AdvancedChatBot';


interface ArticleProps {
  html: string;
  slug: string;
  title: string;
  description: string | null;
  date: string | null; 
  manifest?: ArticleManifest;
}

export default function Article({ html, slug, title, description, date, manifest }: ArticleProps) {
  const discussionEnabled = manifest?.discussion?.enabled || false;
  const articleTitle = title || slug;
  const { openChat, updateSelectedText, selectedText, isChatOpen, closeChat } = useChat();
  
  // State for dynamic width calculation
  const [chatbotWidth, setChatbotWidth] = useState(520);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      if (text && text.length > 10) {
        updateSelectedText(text);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, [updateSelectedText]);
  
  // Check if desktop and calculate width
  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Initialize chat with article data (but don't auto-open)
  useEffect(() => {
    if (slug && html) {
      openChat(slug, html);
    }
  }, [slug, html, openChat]);
  
  // Calculate article width based on chatbot state
  const articleWidth = isDesktop && isChatOpen ? `calc(100vw - ${chatbotWidth}px)` : '100%';
  // const articleMaxWidth = isDesktop && isChatOpen ? `calc(100vw - ${chatbotWidth}px)` : '1000px';

  return (
    <>
      <Head>
        <title>{title ? `${title} - 100x Systems` : `${slug} - 100x Systems`}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:title" content={title || slug} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="article" />
        {date && <meta property="article:published_time" content={date} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          :global(.nav) {
            display: none !important;
          }
        `}</style>
      </Head>

      <div className={styles.articleContainer} style={{ width: articleWidth }}>
        <div className={styles.articleWrapper}>
          <header className={styles.articleHeader}>
            <Link href="/articles" className={styles.backLink} onClick={closeChat}>
              ← Back to Articles
            </Link>
            <h1 className={styles.articleTitle}>{title || slug}</h1>
            {date && (
              <p className={styles.articleDate}>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </header>

          <main className={styles.articleContent}>
            <div 
              className={styles.articleBody}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </main>

          {/* Manifest-based Features */}
          {manifest && (
            <div className={styles.articleFeatures}>
              {/* Podcast Section */}
              {manifest.podcast?.enabled && manifest.podcast.url && (
                <section className={styles.podcastSection}>
                  <h3>🎧 Podcast Version</h3>
                  <audio controls className={styles.podcastPlayer}>
                    <source src={manifest.podcast.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </section>
              )}

              {/* Resources Section */}
              {manifest.resources && (
                <section className={styles.resourcesSection}>
                  <h3>📚 Resources</h3>
                  
                  {manifest.resources.externalLinks && manifest.resources.externalLinks.length > 0 && (
                    <div className={styles.resourceGroup}>
                      <h4>External Links</h4>
                      <ul className={styles.resourceList}>
                        {manifest.resources.externalLinks.map((link, index) => (
                          <li key={index}>
                            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {manifest.resources.codeExamples && manifest.resources.codeExamples.length > 0 && (
                    <div className={styles.resourceGroup}>
                      <h4>Code Examples</h4>
                      <ul className={styles.resourceList}>
                        {manifest.resources.codeExamples.map((example, index) => (
                          <li key={index}>
                            <span className={styles.codeExample}>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* Tags Section */}
              {manifest.tags && manifest.tags.length > 0 && (
                <section className={styles.tagsSection}>
                  <h3>🏷️ Tags</h3>
                  <div className={styles.tagsContainer}>
                    {manifest.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Roadmap Navigation */}
              {manifest.roadmaps && manifest.roadmaps.length > 0 && (
                <section className={styles.roadmapSection}>
                  <h3>🗺️ Part of Roadmaps</h3>
                  <div className={styles.roadmapLinks}>
                    {manifest.roadmaps.map((roadmapSlug) => (
                      <Link key={roadmapSlug} href={`/roadmaps/${roadmapSlug}`} className={styles.roadmapLink}>
                        {roadmapSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          



          {/* Discussions Section */}
          {discussionEnabled && (
            <DiscussionProvider enabled={discussionEnabled}>
              <section className={styles.discussionSection}>
                <h2 className={styles.discussionTitle}>💬 Discussion</h2>
                <GiscusComments 
                  title={articleTitle}
                  className={styles.giscusComments}
                />
              </section>
            </DiscussionProvider>
          )}

          <footer className={styles.articleFooter}>
            <Link href="/articles" className={styles.backLink} onClick={closeChat}>
              ← Back to Articles
            </Link>
          </footer>
        </div>
        
        {/* AI Chatbot */}
        <AdvancedChatBot 
          isOpen={isChatOpen}
          onClose={closeChat}
          articleSlug={slug}
          articleContent={html}
          selectedText={selectedText}
        />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs = await StaticSiteGenerator.fetchArticleFolders();
    
    const paths = slugs.map(slug => ({
      params: { slug }
    }));

    console.log(`✅ Generated ${paths.length} article paths for static site`);

    return {
      paths,
      fallback: false // No fallback - pure static generation
    };

  } catch (error) {
    console.error('❌ Error generating article paths:', error);
    return {
      paths: [],
      fallback: false
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params as { slug: string };
    
    const articleData = await StaticSiteGenerator.fetchArticleWithManifest(slug);
    
    // Validate and optimize the article
    StaticSiteGenerator.validateArticleSize(articleData.html, slug);
    const optimizedHtml = StaticSiteGenerator.optimizeHtmlForStatic(articleData.html);

    console.log(`✅ Generated static page for article: ${slug}`);

    return {
      props: {
        ...articleData,
        html: optimizedHtml
      },
      revalidate: false
    };

  } catch (error) {
    console.error(`❌ Error generating article page for ${params?.slug}:`, error);
    return {
      notFound: true
    };
  }
};
