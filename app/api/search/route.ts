import { NextRequest, NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { StaticSiteGenerator } from '@/infrastructure/staticSiteGenerator';
import { SearchDocument, SearchFilters } from '@/application/types/search';

let searchIndex: SearchDocument[] | null = null;
let indexLastUpdated: number | null = null;
const INDEX_CACHE_DURATION = Infinity;

async function loadSearchIndex(): Promise<SearchDocument[]> {
  const now = Date.now();
  if (searchIndex && indexLastUpdated && (now - indexLastUpdated) < INDEX_CACHE_DURATION) {
    return searchIndex;
  }
  searchIndex = await StaticSiteGenerator.generateSearchIndex();
  indexLastUpdated = now;
  return searchIndex;
}

export async function GET() {
  const isBuilding = !searchIndex || !indexLastUpdated || (Date.now() - indexLastUpdated) >= INDEX_CACHE_DURATION;
  return NextResponse.json({
    isReady: !isBuilding,
    isBuilding,
    documentCount: searchIndex?.length || 0,
    lastUpdated: indexLastUpdated
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, filters = {} as SearchFilters } = body;

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [], total: 0 });
    }

    const documents = await loadSearchIndex();

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

    if (filters.difficulty && filters.difficulty !== 'all') {
      results = results.filter(result => result.item.difficulty === filters.difficulty);
    }
    if (filters.section && filters.section !== 'all') {
      results = results.filter(result => result.item.section === filters.section);
    }
    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(result =>
        filters.tags!.some((tag: string) => result.item.tags.includes(tag))
      );
    }

    results.sort((a, b) => (a.score || 0) - (b.score || 0));

    return NextResponse.json({
      results: results.slice(0, 20),
      total: results.length,
      query
    });
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
