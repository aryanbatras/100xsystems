/**
 * ## Presentation: Articles List Page
 *
 * Lists all published articles with filtering, search,
 * and metadata display.
 *
 * @packageDocumentation
 */

'use client';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import InlineSearch from '../search/InlineSearch';
import styles from '../../_styles/pages/Articles.module.css';

/** @public */
export interface ArticleItem {
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
}

/**
 * Articles page — browseable collection of published articles.
 *
 * @remarks
 * Renders a filtered list of articles with client-side search. Data is pre-fetched
 * at build time via SSG. Users can filter by title or slug.
 *
 * @param articles - All published articles from getStaticProps
 */
export default function ArticlesPage({ articles }: { articles: ArticleItem[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <>
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
                  <p>No articles found matching &quot;{searchTerm}&quot;</p>
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
                              year: 'numeric', month: 'long', day: 'numeric'
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
    </>
  );
}
