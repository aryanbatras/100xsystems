import type { NextApiRequest, NextApiResponse } from 'next';
import { StaticSiteGenerator } from '../../../core/infrastructure/staticSiteGenerator';
import { ResourceType } from '../../../types/resources';

interface TypesResponse {
  success: boolean;
  types?: ResourceType[];
  typeDistribution?: Record<ResourceType, number>;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TypesResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('📂 Fetching resource types...');

    const knowledgeGraph = await StaticSiteGenerator.buildResourceKnowledgeGraph();
    const types: ResourceType[] = [
      'article', 'video', 'podcast', 'tool', 'course', 'book', 'documentation', 
      'tutorial', 'framework', 'library', 'platform', 'community', 'newsletter', 
      'blog', 'research-paper', 'cheat-sheet', 'template', 'extension', 'other'
    ];

    console.log(`✅ Found ${types.length} resource types`);

    return res.status(200).json({
      success: true,
      types,
      typeDistribution: knowledgeGraph.analytics.typeDistribution
    });

  } catch (error) {
    console.error('❌ Error fetching resource types:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
