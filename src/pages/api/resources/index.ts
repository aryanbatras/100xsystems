import type { NextApiRequest, NextApiResponse } from 'next';
import { Resource } from '../../../types/resources';
import fs from 'fs';
import path from 'path';

interface ResourcesResponse {
  success: boolean;
  data?: Resource[];
  error?: string;
}

const CATEGORIES_DIR = path.join(process.cwd(), 'content/resources/categories');

function readJsonFile(filePath: string): any {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

function getResourcesFromDirectory(dirPath: string, category: string, subcategory: string): Resource[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const resources: Resource[] = [];
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    // Only process JSON files, don't recurse into directories
    if (!stat.isDirectory() && item.endsWith('.json')) {
      const resource = readJsonFile(itemPath);
      if (resource) {
        // Ensure category and subcategory are set
        resource.category = category;
        resource.subcategory = subcategory;
        resources.push(resource);
      }
    }
  }

  return resources.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResourcesResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('📂 Fetching resources from local files...');

    const categories = fs.readdirSync(CATEGORIES_DIR);
    let allResources: Resource[] = [];

    for (const categoryDir of categories) {
      const categoryPath = path.join(CATEGORIES_DIR, categoryDir);
      if (fs.statSync(categoryPath).isDirectory()) {
        // Get only direct subcategories (1 level)
        const subcategories = fs.readdirSync(categoryPath);
        for (const subcategory of subcategories) {
          const subcategoryPath = path.join(categoryPath, subcategory);
          if (fs.statSync(subcategoryPath).isDirectory()) {
            // Get all resources directly in this subcategory (no deeper nesting)
            const resources = getResourcesFromDirectory(subcategoryPath, categoryDir, subcategory);
            allResources.push(...resources);
          }
        }
      }
    }

    // Sort by order first, then by quality and title
    const sortedResources = allResources.sort((a, b) => {
      const orderA = a.order || 999;
      const orderB = b.order || 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      const qualityOrder = { gold: 0, silver: 1, bronze: 2 };
      const qualityA = qualityOrder[a.quality as keyof typeof qualityOrder] ?? 3;
      const qualityB = qualityOrder[b.quality as keyof typeof qualityOrder] ?? 3;
      
      if (qualityA !== qualityB) {
        return qualityA - qualityB;
      }
      
      return a.title.localeCompare(b.title);
    });

    console.log(`✅ Found ${sortedResources.length} resources`);

    res.status(200).json({
      success: true,
      data: sortedResources
    });

  } catch (error) {
    console.error('❌ Error fetching resources:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
