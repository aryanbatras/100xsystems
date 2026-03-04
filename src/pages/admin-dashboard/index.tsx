import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './AdminDashboard.module.css';

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
      setError(null);
      
      const response = await fetch('/api/list-articles');
      const data = await response.json();
      
      if (data.success) {
        setArticles(data.articles.map((slug: string) => ({ slug })));
      } else {
        setError(data.error || 'Failed to fetch articles');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Error fetching articles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticleClick = async (slug: string) => {
    console.log('🔍 === ADMIN DASHBOARD CLICK DEBUG START ===');
    console.log('📂 Article clicked:', slug);
    
    // Set loading state for this specific article
    setArticles(prev => prev.map(article => 
      article.slug === slug ? { ...article, isLoading: true } : article
    ));

    try {
      // Fetch the HTML content
      console.log('📄 Fetching HTML from API...');
      const response = await fetch(`/api/load-html?slug=${encodeURIComponent(slug)}`);
      const data = await response.json();
      
      console.log('📊 API Response status:', response.ok);
      console.log('📊 Data received:', !!data);
      console.log('📊 HTML length:', data.html?.length || 0);
      
      if (response.ok && data.html) {
        console.log('💾 Storing HTML in sessionStorage...');
        sessionStorage.setItem('parserHtml', data.html);
        
        console.log('🔍 Verifying sessionStorage...');
        const storedHtml = sessionStorage.getItem('parserHtml');
        console.log('📊 Stored HTML length:', storedHtml?.length || 0);
        console.log('📝 First 200 chars of stored HTML:', storedHtml?.substring(0, 200));
        
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
  );
}
