import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { StaticSiteGenerator } from '../../core/infrastructure/staticSiteGenerator';
import InlineSearch from '../../components/search/InlineSearch';
import styles from './Articles.module.css';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { isUserAuthenticated } from '../../utils/auth-helpers';

interface Article {
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
}

interface ArticlesProps {
  articles: Article[];
}

export default function Articles({ articles }: ArticlesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute requireAuth={true}>
      <Head>
        <title>Articles - 100x Systems</title>
        <meta name="description" content="Explore our collection of articles on systems thinking, engineering, and innovation." />
        <meta property="og:title" content="Articles - 100x Systems" />
        <meta property="og:description" content="Explore our collection of articles on systems thinking, engineering, and innovation." />
        <meta property="og:type" content="website" />
      </Head>

      <div className={styles.articlesContainer}>
        <div className={styles.articlesWrapper}>
          <header className={styles.articlesHeader}>
            <h1>Articles</h1>
            <p className={styles.articlesDescription}>
              Explore our collection of articles on systems thinking, engineering, and innovation.
            </p>
            
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Quick filter articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </header>

          <InlineSearch articles={articles} />

          <main className={styles.articlesMain}>
            {filteredArticles.length === 0 ? (
              <div className={styles.noArticles}>
                {searchTerm ? (
                  <p>No articles found matching "{searchTerm}"</p>
                ) : (
                  <p>No articles available yet. Check back soon!</p>
                )}
              </div>
            ) : (
              <div className={styles.articlesGrid}>
                {filteredArticles.map((article) => (
                  <article key={article.slug} className={styles.articleCard}>
                    <Link href={`/articles/${article.slug}`}>
                      <div className={styles.articleContent}>
                        <h2 className={styles.articleTitle}>{article.title}</h2>
                        {article.description && (
                          <p className={styles.articleDescription}>{article.description}</p>
                        )}
                        {article.date && (
                          <p className={styles.articleDate}>
                            {new Date(article.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const articles = await StaticSiteGenerator.fetchAllArticlesMetadata();
    console.log(`✅ Generated ${articles.length} articles for static site`);

    return {
      props: {
        articles
      },
      revalidate: 3600
    };

  } catch (error) {
    console.error('❌ Error generating articles page:', error);
    return {
      props: {
        articles: []
      }
    };
  }
};
