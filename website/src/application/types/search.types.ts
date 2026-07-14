/**
 * ## 100xSystems: Search Type Definitions
 *
 * Types for the site-wide search functionality.
 * Supports full-text search across articles with metadata filtering.
 *
 * @packageDocumentation
 */

/**
 * A searchable document entry for Fuse.js index.
 *
 * @remarks
 * Created from article metadata and full-text content. The `content`
 * field is truncated to 2000 chars for relevance scoring, while
 * `fullContent` holds the complete text for display.
 *
 * @public
 */
export interface SearchDocument {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  fullContent: string;
  tags: string[];
  difficulty: string;
  section: string;
  date: string | null;
  wordCount: number;
}

/**
 * A search result with optional relevance score.
 *
 * @remarks
 * Wraps a SearchDocument with Fuse.js scoring metadata.
 *
 * @public
 */
export interface SearchResult {
  item: SearchDocument;
  score?: number;
  matches?: any[];
}

export interface SearchFilters {
  difficulty: string;
  section: string;
  tags: string[];
}
