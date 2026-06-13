import { useState, useEffect } from 'react';
import { SearchDocument, SearchResult, SearchFilters } from '../../../application/types/search';
import styles from '../../_styles/components/search/InlineSearch.module.css';

interface InlineSearchProps {
  articles: any[];
}

export default function InlineSearch({ articles }: InlineSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isIndexReady, setIsIndexReady] = useState(false);
  const [indexStatus, setIndexStatus] = useState<{isBuilding: boolean, documentCount: number}>({isBuilding: false, documentCount: 0});
  const [filters, setFilters] = useState<SearchFilters>({
    difficulty: 'all',
    section: 'all',
    tags: []
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Check search index status on mount
  useEffect(() => {
    checkSearchStatus();
  }, []);

  const checkSearchStatus = async () => {
    try {
      const response = await fetch('/api/search');
      const status = await response.json();
      setIndexStatus({
        isBuilding: status.isBuilding,
        documentCount: status.documentCount
      });
      setIsIndexReady(status.isReady);
    } catch (error) {
    }
  };

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchTimer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, filters })
        });
        
        const data = await response.json();
        setResults(data.results);
        
        // Update index status if it was building
        if (indexStatus.isBuilding) {
          checkSearchStatus();
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query, filters]);

  const getSearchContext = (text: string, query: string, maxLength: number = 200) => {
    if (!text || !query) return text;
    
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const queryIndex = lowerText.indexOf(lowerQuery);
    
    if (queryIndex === -1) return text.substring(0, maxLength);
    
    // Get context around the match
    const start = Math.max(0, queryIndex - 50);
    const end = Math.min(text.length, queryIndex + query.length + 50);
    
    let context = text.substring(start, end);
    
    // Add ellipsis if we cut from start or end
    if (start > 0) context = '...' + context;
    if (end < text.length) context = context + '...';
    
    return context;
  };

  const calculateReadTime = (wordCount: number): string => {
    const wordsPerMinute = 200; // Average reading speed
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  const highlightText = (text: string, matches?: any[], query?: string): React.ReactNode => {
    if (!text) return text;
    
    // If we have matches from Fuse.js, use them
    if (matches && matches.length > 0) {
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      
      // Sort matches by start position
      const sortedMatches = matches.flatMap(match => {
        if (match.key === 'title' || match.key === 'content') {
          return match.indices.map(([start, end]: [number, number]) => ({
            start: Math.max(0, Math.min(start, text.length - 1)),
            end: Math.max(0, Math.min(end, text.length - 1))
          }));
        }
        return [];
      }).sort((a, b) => a.start - b.start);
      
      sortedMatches.forEach(match => {
        // Add text before match
        if (match.start > lastIndex) {
          parts.push(text.substring(lastIndex, match.start));
        }
        
        // Add highlighted match
        parts.push(
          <mark key={`${match.start}-${match.end}`}>
            {text.substring(match.start, match.end + 1)}
          </mark>
        );
        
        lastIndex = match.end + 1;
      });
      
      // Add remaining text
      if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
      }
      
      return <>{parts}</>;
    }
    
    // Fallback: simple string highlighting if no matches
    if (query) {
      const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
      return (
        <>
          {parts.map((part, index) => 
            index % 2 === 1 ? <mark key={index}>{part}</mark> : part
          )}
        </>
      );
    }
    
    return text;
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(query.toLowerCase()) ||
    article.slug.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.searchSection}>
      <div className={styles.searchHeader}>
        <div className={styles.searchInputContainer}>
          <input
            type="text"
            placeholder="Search articles, concepts, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.searchInput}
          />
          {loading && <div className={styles.spinner} />}
        </div>
        <button 
          className={styles.advancedToggle}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide Advanced' : 'Advanced Search'}
        </button>
      </div>

      {/* Index Building Status */}
      {indexStatus.isBuilding && (
        <div className={styles.indexBuildingNotice}>
          <div className={styles.noticeContent}>
            <div className={styles.noticeText}>
              <strong>Building search index</strong>
              First-time searches may take 30-60 seconds. <br />
              This is a one-time process that improves search performance for all users.
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className={styles.advancedFilters}>
          <div className={styles.filterGroup}>
            <label>Difficulty Level</label>
            <select 
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className={styles.filterSelect}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <label>Section</label>
            <select 
              value={filters.section}
              onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
              className={styles.filterSelect}
            >
              <option value="all">All Sections</option>
            </select>
          </div>
        </div>
      )}

      {/* Search Results */}
      {query.trim().length >= 2 && (
        <div className={styles.searchResults}>
          <div className={styles.resultsHeader}>
            <h3>Search Results</h3>
            <span className={styles.resultsCount}>
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.loadingSpinner}></div>
              <p>Searching articles...</p>
            </div>
          ) : results.length === 0 ? (
            <div className={styles.noResults}>
              <p>No articles found matching "{query}"</p>
              {query.trim().length >= 2 && (
                <div className={styles.fallbackResults}>
                  <h4>Basic title matches:</h4>
                  {filteredArticles.length > 0 ? (
                    <div className={styles.basicResults}>
                      {filteredArticles.map((article) => (
                        <div key={article.slug} className={styles.basicResultItem}>
                          <a href={`/articles/${article.slug}`} className={styles.basicResultLink}>
                            <h5>{article.title}</h5>
                            {article.description && <p>{article.description}</p>}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No basic matches found either.</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.resultsGrid}>
              {results.map((result) => (
                <article key={result.item.id} className={styles.resultItem}>
                  <a href={`/articles/${result.item.slug}`} className={styles.resultLink}>
                    <div className={styles.resultContent}>
                      <h3 className={styles.resultTitle}>
                        {result.item.title}
                      </h3>
                      <div className={styles.resultMeta}>
                        <div className={styles.metaPrimary}>
                          <span className={styles.difficulty}>{result.item.difficulty}</span>
                          <span className={styles.readTime}>{calculateReadTime(result.item.wordCount)}</span>
                          <span className={styles.wordCount}>{result.item.wordCount.toLocaleString()} words</span>
                        </div>
                        <div className={styles.metaSecondary}>
                          {result.matches && result.matches.length > 0 && (
                            <span className={styles.matchCount}>
                              {result.matches.length} matches found
                            </span>
                          )}
                          {result.item.tags.length > 0 && (
                            <div className={styles.tags}>
                              {result.item.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className={styles.tag}>{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
