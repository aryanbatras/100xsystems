import { useState, useEffect, useRef } from 'react';
import { SearchDocument, SearchResult, SearchFilters } from '../../application/types/search';
import styles from '../_styles/components/search/GlobalSearch.module.css';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
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
    <div className={styles.searchOverlay}>
      <div className={styles.searchModal}>
        <div className={styles.searchHeader}>
          <div className={styles.searchInputContainer}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search articles, concepts, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={styles.searchInput}
            />
            {loading && <div className={styles.spinner} />}
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.filters}>
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
          
          <select 
            value={filters.section}
            onChange={(e) => setFilters(prev => ({ ...prev, section: e.target.value }))}
            className={styles.filterSelect}
          >
            <option value="all">All Sections</option>
          </select>
        </div>
        
        <div className={styles.searchResults}>
          {results.length === 0 && query.trim() !== '' ? (
            <div className={styles.noResults}>
              No articles found matching "{query}"
            </div>
          ) : (
            results.map((result) => (
              <div
                key={result.item.id}
                className={styles.resultItem}
                onClick={() => {
                  window.location.href = `/articles/${result.item.slug}`;
                  onClose();
                }}
              >
                <div className={styles.resultContent}>
                  <h3 className={styles.resultTitle}>
                    {highlightText(result.item.title, result.matches)}
                  </h3>
                  {result.item.description && (
                    <p className={styles.resultDescription}>
                      {highlightText(result.item.description.substring(0, 150), result.matches)}
                      {result.item.description.length > 150 && '...'}
                    </p>
                  )}
                  <div className={styles.resultMeta}>
                    <span className={styles.relevance}>
                      {Math.round((1 - (result.score || 0)) * 100)}% match
                    </span>
                    <span className={styles.difficulty}>{result.item.difficulty}</span>
                    <span className={styles.wordCount}>{result.item.wordCount} words</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className={styles.searchFooter}>
          <div className={styles.keyboardHint}>
            <kbd>Ctrl</kbd> + <kbd>K</kbd> to open • <kbd>Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
