import type { NextApiRequest, NextApiResponse } from 'next';
import { StaticSiteGenerator } from '../../../infrastructure/staticSiteGenerator';
import { ResourceType } from '../../../application/types/resources';

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

    const knowledgeGraph = await StaticSiteGenerator.buildResourceKnowledgeGraph();
    const types: ResourceType[] = [
      'article', 'video', 'podcast', 'tool', 'course', 'book', 'documentation', 
      'tutorial', 'framework', 'library', 'platform', 'community', 'newsletter', 
      'blog', 'research-paper', 'cheat-sheet', 'template', 'extension', 'other'
    ];


    return res.status(200).json({
      success: true,
      types,
      typeDistribution: knowledgeGraph.analytics.typeDistribution
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
