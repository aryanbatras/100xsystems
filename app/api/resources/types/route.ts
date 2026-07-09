import { NextRequest, NextResponse } from 'next/server';
import { StaticSiteGenerator } from '@/infrastructure/staticSiteGenerator';
import { Resource, ResourceType } from '@/application/types/resources';

let searchIndex: any[] | null = null;
let indexLastUpdated: number | null = null;
const INDEX_CACHE_DURATION = Infinity;

async function loadSearchIndex() {
  const now = Date.now();
  if (searchIndex && indexLastUpdated && (now - indexLastUpdated) < INDEX_CACHE_DURATION) {
    return searchIndex;
  }
  searchIndex = await StaticSiteGenerator.generateResourceSearchIndex();
  indexLastUpdated = now;
  return searchIndex;
}

export async function GET() {
  try {
    const knowledgeGraph = await StaticSiteGenerator.buildResourceKnowledgeGraph();
    const types: ResourceType[] = [
      'article', 'video', 'podcast', 'tool', 'course', 'book', 'documentation',
      'tutorial', 'framework', 'library', 'platform', 'community', 'newsletter',
      'blog', 'research-paper', 'cheat-sheet', 'template', 'extension', 'other',
    ];

    return NextResponse.json({
      success: true,
      types,
      typeDistribution: knowledgeGraph.analytics.typeDistribution,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}
