import type { NextApiRequest, NextApiResponse } from 'next';
import Fuse from 'fuse.js';
import { StaticSiteGenerator } from '../../../infrastructure/staticSiteGenerator';
import { ResourceSearchDocument, ResourceSearchResult, ResourceSearchFilters, ResourceType } from '../../../types/resources';

// Load search index at build time with caching
let searchIndex: ResourceSearchDocument[] | null = null;
let indexLastUpdated: number | null = null;
const INDEX_CACHE_DURATION = Infinity; // Infinite cache duration - persists until deployment

async function loadSearchIndex(): Promise<ResourceSearchDocument[]> {
  const now = Date.now();
  
  // Return cached index if still valid
  if (searchIndex && indexLastUpdated && (now - indexLastUpdated) < INDEX_CACHE_DURATION) {
    return searchIndex;
  }
  
  const startTime = Date.now();
  
  searchIndex = await StaticSiteGenerator.generateResourceSearchIndex();
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
    const { query, filters = {} as ResourceSearchFilters } = body;
    
    if (!query || query.trim().length < 2) {
      return res.status(200).json({ results: [], total: 0 });
    }
    
    const documents = await loadSearchIndex();
    
    // Configure Fuse.js for resource search
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'description', weight: 0.25 },
        { name: 'content', weight: 0.2 },
        { name: 'tags', weight: 0.15 },
        { name: 'author', weight: 0.05 },
        { name: 'publisher', weight: 0.03 },
        { name: 'searchableMetadata', weight: 0.02 }
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
    if (filters.category && filters.category !== 'all') {
      results = results.filter(result => result.item.category === filters.category);
    }
    
    if (filters.type && filters.type !== 'all') {
      results = results.filter(result => result.item.type === filters.type);
    }
    
    if (filters.quality && filters.quality !== 'all') {
      results = results.filter(result => result.item.quality === filters.quality);
    }
    
    if (filters.difficulty && filters.difficulty !== 'all') {
      results = results.filter(result => result.item.difficulty === filters.difficulty);
    }
    
    if (filters.accessType && filters.accessType !== 'all') {
      results = results.filter(result => result.item.accessType === filters.accessType);
    }
    
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(result => 
        filters.tags.some((tag: string) => result.item.tags.includes(tag))
      );
    }
    
    // Sort by relevance score, then by quality
    results.sort((a, b) => {
      const scoreDiff = (a.score || 0) - (b.score || 0);
      if (scoreDiff !== 0) return scoreDiff;
      
      const qualityOrder = { gold: 0, silver: 1, bronze: 2 };
      const aQuality = qualityOrder[a.item.quality as keyof typeof qualityOrder] ?? 3;
      const bQuality = qualityOrder[b.item.quality as keyof typeof qualityOrder] ?? 3;
      
      return aQuality - bQuality;
    });
    
    return res.status(200).json({
      results: results.slice(0, 20),
      total: results.length,
      query
    });
    
  } catch (error) {
    return res.status(500).json({ error: 'Resource search failed' });
  }
}
