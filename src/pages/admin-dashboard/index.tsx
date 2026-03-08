import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './AdminDashboard.module.css';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { isAdminUser } from '../../utils/auth-helpers';

interface Article {
  slug: string;
  isLoading?: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/list-articles');
      const data = await response.json();
      setArticles(data.articles || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      setError('Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  };

        
        console.log('🔄 Redirecting to parser...');
        router.push('/parser');
      } else {
        console.error('❌ Failed to load article:', data.error);
        // Reset loading state
        setArticles(prev => prev.map(article => 
          article.slug === slug ? { ...article, isLoading: false } : article
        ));
      }
    } catch (err) {
      console.error('❌ Error loading article:', err);
      // Reset loading state
      setArticles(prev => prev.map(article => 
        article.slug === slug ? { ...article, isLoading: false } : article
      ));
    }
    
    console.log('🔍 === ADMIN DASHBOARD CLICK DEBUG END ===');
  };

  const handleNewArticle = () => {
    router.push('/admin');
  };

  if (isLoading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Loading articles...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.errorContainer}>
          <div className={styles.error}>Error: {error}</div>
          <button onClick={fetchArticles} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardWrapper}>
          <header className={styles.dashboardHeader}>
            <div className={styles.headerTop}>
              <div className={styles.headerInfo}>
                <h1>Admin Dashboard</h1>
                <p>Manage your articles</p>
              </div>
              <button 
                onClick={handleNewArticle}
                className={styles.newArticleButton}
              >
                New Article
              </button>
            </div>
            
            <div className={styles.managementLinks}>
              <Link href="/admin/roadmaps" className={styles.managementLink}>
                🗺️ Manage Roadmaps
              </Link>
              <Link href="/admin/manifests" className={styles.managementLink}>
                📋 Manage Manifests
              </Link>
            </div>
          </header>

          <main className={styles.dashboardMain}>
            {articles.length === 0 ? (
              <div className={styles.emptyState}>
                <h2>No articles found</h2>
                <p>Create your first article to get started</p>
                <button 
                  onClick={handleNewArticle}
                  className={styles.newArticleButton}
                >
                  Create First Article
                </button>
              </div>
            ) : (
              <div className={styles.articleGrid}>
                {articles.map((article) => (
                  <div
                    key={article.slug}
                    className={`${styles.articleCard} ${article.isLoading ? styles.loading : ''}`}
                    onClick={() => !article.isLoading && handleArticleClick(article.slug)}
                  >
                    <div className={styles.articleCardHeader}>
                      <h3>{article.slug}</h3>
                    </div>
                    <div className={styles.articleCardFooter}>
                      {article.isLoading ? (
                        <div className={styles.cardLoading}>Loading...</div>
                      ) : (
                        <div className={styles.editIndicator}>Click to edit</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
