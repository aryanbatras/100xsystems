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
