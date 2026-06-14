'use client';

import { SearchDocument, SearchResult, SearchFilters } from '../../application/types/search';
import globalSearchStyles from '../_styles/search-globalsearch.module.css';
import inlineSearchStyles from '../_styles/search-inlinesearch.module.css';
import { useState, useEffect, useRef } from 'react';
/**
 * ## Search
 *
 * Search feature module.
 * Contains all components, types, and logic for the search domain.
 *
 * @packageDocumentation
 * @module search
 */

;



// ============================================================
// Source: GlobalSearch.tsx
// ============================================================
interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    difficulty: 'all',
    section: 'all',
    tags: []
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

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
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query, filters]);

  const highlightText = (text: string, matches?: any[]) => {
    if (!matches || !text) return text;
    
    // Create a safe text copy to work with
    let highlightedText = text;
    const offsets: Array<{start: number, end: number, original: string}> = [];
    
    // Collect all highlight offsets
    matches.forEach(match => {
      if (match.key === 'title' || match.key === 'content') {
        match.indices.forEach(([start, end]: [number, number]) => {
          // Adjust for text length if needed
          const adjustedStart = Math.min(start, highlightedText.length - 1);
          const adjustedEnd = Math.min(end, highlightedText.length - 1);
          
          if (adjustedStart >= 0 && adjustedEnd >= adjustedStart) {
            offsets.push({
              start: adjustedStart,
              end: adjustedEnd,
              original: highlightedText.substring(adjustedStart, adjustedEnd + 1)
            });
          }
        });
      }
    });
    
    // Sort offsets by start position (reverse order to avoid index shifting)
    offsets.sort((a, b) => b.start - a.start);
    
    // Apply highlights in reverse order
    offsets.forEach(offset => {
      const before = highlightedText.substring(0, offset.start);
      const matchText = offset.original;
      const after = highlightedText.substring(offset.end + 1);
      highlightedText = `${before}<mark>${matchText}</mark>${after}`;
    });
    
    return highlightedText;
  };

  if (!isOpen) return null;

  return (
    <div className={globalSearchStyles.searchOverlay}>
      <div className={globalSearchStyles.searchModal}>
        <div className={globalSearchStyles.searchHeader}>
          <div className={globalSearchStyles.searchInputContainer}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles, concepts, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={globalSearchStyles.searchInput}
            />
            {loading && <div className={globalSearchStyles.spinner} />}
          </div>
          <button className={globalSearchStyles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={globalSearchStyles.filters}>
          <select 
            value={filters.difficulty}
            onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
            className={globalSearchStyles.filterSelect}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          
          <select 
            value={filters.section}
            onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
            className={globalSearchStyles.filterSelect}
          >
            <option value="all">All Sections</option>
          </select>
        </div>
        
        <div className={globalSearchStyles.searchResults}>
          {results.length === 0 && query.trim() !== '' ? (
            <div className={globalSearchStyles.noResults}>
              No articles found matching "{query}"
            </div>
          ) : (
            results.map((result) => (
              <div
                key={result.item.id}
                className={globalSearchStyles.resultItem}
                onClick={() => {
                  window.location.href = `/articles/${result.item.slug}`;
                  onClose();
                }}
              >
                <div className={globalSearchStyles.resultContent}>
                  <h3 className={globalSearchStyles.resultTitle}>
                    {highlightText(result.item.title, result.matches)}
                  </h3>
                  {result.item.description && (
                    <p className={globalSearchStyles.resultDescription}>
                      {highlightText(result.item.description.substring(0, 150), result.matches)}
                      {result.item.description.length > 150 && '...'}
                    </p>
                  )}
                  <div className={globalSearchStyles.resultMeta}>
                    <span className={globalSearchStyles.relevance}>
                      {Math.round((1 - (result.score || 0)) * 100)}% match
                    </span>
                    <span className={globalSearchStyles.difficulty}>{result.item.difficulty}</span>
                    <span className={globalSearchStyles.wordCount}>{result.item.wordCount} words</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className={globalSearchStyles.searchFooter}>
          <div className={globalSearchStyles.keyboardHint}>
            <kbd>Ctrl</kbd> + <kbd>K</kbd> to open • <kbd>Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// Source: InlineSearch.tsx
// ============================================================
interface InlineSearchProps {
  articles: any[];
}

export function InlineSearch({ articles }: InlineSearchProps) {
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
    <div className={inlineSearchStyles.searchSection}>
      <div className={globalSearchStyles.searchHeader}>
        <div className={globalSearchStyles.searchInputContainer}>
          <input
            type="text"
            placeholder="Search articles, concepts, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={globalSearchStyles.searchInput}
          />
          {loading && <div className={globalSearchStyles.spinner} />}
        </div>
        <button 
          className={inlineSearchStyles.advancedToggle}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide Advanced' : 'Advanced Search'}
        </button>
      </div>

      {/* Index Building Status */}
      {indexStatus.isBuilding && (
        <div className={inlineSearchStyles.indexBuildingNotice}>
          <div className={inlineSearchStyles.noticeContent}>
            <div className={inlineSearchStyles.noticeText}>
              <strong>Building search index</strong>
              First-time searches may take 30-60 seconds. <br />
              This is a one-time process that improves search performance for all users.
            </div>
          </div>
        </div>
      )}

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className={inlineSearchStyles.advancedFilters}>
          <div className={inlineSearchStyles.filterGroup}>
            <label>Difficulty Level</label>
            <select 
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className={globalSearchStyles.filterSelect}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div className={inlineSearchStyles.filterGroup}>
            <label>Section</label>
            <select 
              value={filters.section}
              onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
              className={globalSearchStyles.filterSelect}
            >
              <option value="all">All Sections</option>
            </select>
          </div>
        </div>
      )}

      {/* Search Results */}
      {query.trim().length >= 2 && (
        <div className={globalSearchStyles.searchResults}>
          <div className={inlineSearchStyles.resultsHeader}>
            <h3>Search Results</h3>
            <span className={inlineSearchStyles.resultsCount}>
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </span>
          </div>
          
          {loading ? (
            <div className={inlineSearchStyles.loadingState}>
              <div className={inlineSearchStyles.loadingSpinner}></div>
              <p>Searching articles...</p>
            </div>
          ) : results.length === 0 ? (
            <div className={globalSearchStyles.noResults}>
              <p>No articles found matching "{query}"</p>
              {query.trim().length >= 2 && (
                <div className={inlineSearchStyles.fallbackResults}>
                  <h4>Basic title matches:</h4>
                  {filteredArticles.length > 0 ? (
                    <div className={inlineSearchStyles.basicResults}>
                      {filteredArticles.map((article) => (
                        <div key={article.slug} className={inlineSearchStyles.basicResultItem}>
                          <a href={`/articles/${article.slug}`} className={inlineSearchStyles.basicResultLink}>
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
            <div className={inlineSearchStyles.resultsGrid}>
              {results.map((result) => (
                <article key={result.item.id} className={globalSearchStyles.resultItem}>
                  <a href={`/articles/${result.item.slug}`} className={inlineSearchStyles.resultLink}>
                    <div className={globalSearchStyles.resultContent}>
                      <h3 className={globalSearchStyles.resultTitle}>
                        {result.item.title}
                      </h3>
                      <div className={globalSearchStyles.resultMeta}>
                        <div className={inlineSearchStyles.metaPrimary}>
                          <span className={globalSearchStyles.difficulty}>{result.item.difficulty}</span>
                          <span className={inlineSearchStyles.readTime}>{calculateReadTime(result.item.wordCount)}</span>
                          <span className={globalSearchStyles.wordCount}>{result.item.wordCount.toLocaleString()} words</span>
                        </div>
                        <div className={inlineSearchStyles.metaSecondary}>
                          {result.matches && result.matches.length > 0 && (
                            <span className={inlineSearchStyles.matchCount}>
                              {result.matches.length} matches found
                            </span>
                          )}
                          {result.item.tags.length > 0 && (
                            <div className={inlineSearchStyles.tags}>
                              {result.item.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className={inlineSearchStyles.tag}>{tag}</span>
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
