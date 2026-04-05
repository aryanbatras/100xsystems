import type { NextApiRequest, NextApiResponse } from 'next';
import Fuse from 'fuse.js';
import { StaticSiteGenerator } from '../../core/infrastructure/staticSiteGenerator';
import { SearchDocument, SearchResult, SearchFilters } from '../../types/search';

// Load search index at build time with caching
let searchIndex: SearchDocument[] | null = null;
let indexLastUpdated: number | null = null;
const INDEX_CACHE_DURATION = Infinity; // Infinite cache duration - persists until deployment

async function loadSearchIndex(): Promise<SearchDocument[]> {
  const now = Date.now();
  
  // Return cached index if still valid
  if (searchIndex && indexLastUpdated && (now - indexLastUpdated) < INDEX_CACHE_DURATION) {
    return searchIndex;
  }
  
  const startTime = Date.now();
  
  searchIndex = await StaticSiteGenerator.generateSearchIndex();
  indexLastUpdated = now;
  
  const buildTime = Date.now() - startTime;
  
  return searchIndex;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return search status
    const isBuilding = !searchIndex || !indexLastUpdated || (Date.now() - indexLastUpdated) >= INDEX_CACHE_DURATION;
    return res.status(200).json({
      isReady: !isBuilding,
      isBuilding,
      documentCount: searchIndex?.length || 0,
      lastUpdated: indexLastUpdated
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const { query, filters = {} as SearchFilters } = body;
    
    if (!query || query.trim().length < 2) {
      return res.status(200).json({ results: [], total: 0 });
    }
    
    const documents = await loadSearchIndex();
    
    // Configure Fuse.js with proper options
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'content', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'tags', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      shouldSort: true,
      findAllMatches: true
    };
    
    const fuse = new Fuse(documents, fuseOptions);
    let results = fuse.search(query);
    
    // Apply filters
    if (filters.difficulty && filters.difficulty !== 'all') {
      results = results.filter(result => result.item.difficulty === filters.difficulty);
    }
    
    if (filters.section && filters.section !== 'all') {
      results = results.filter(result => result.item.section === filters.section);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(result => 
        filters.tags.some((tag: string) => result.item.tags.includes(tag))
      );
    }
    
    // Sort by relevance score
    results.sort((a, b) => (a.score || 0) - (b.score || 0));
    
    return res.status(200).json({
      results: results.slice(0, 20),
      total: results.length,
      query
    });
    
  } catch (error) {
    return res.status(500).json({ error: 'Search failed' });
  }
}
