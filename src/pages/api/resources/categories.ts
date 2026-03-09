import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface CategoriesResponse {
  success: boolean;
  data?: Record<string, {
    category: string;
    displayName: string;
    description: string;
    icon: string;
    subcategories: string[];
    allowedTypes: string[];
  }>;
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

function getSubcategoriesFromDirectory(categoryPath: string): string[] {
  const subcategories: string[] = [];
  if (!fs.existsSync(categoryPath)) {
    return subcategories;
  }

  const items = fs.readdirSync(categoryPath);
  for (const item of items) {
    const itemPath = path.join(categoryPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      subcategories.push(item);
    }
  }
  return subcategories;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoriesResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('📂 Fetching resource categories from local files...');

    const categories = fs.readdirSync(CATEGORIES_DIR);
    const categoriesData: Record<string, any> = {};

    for (const category of categories) {
      const categoryPath = path.join(CATEGORIES_DIR, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        // Get only direct subcategories (1 level)
        const directSubcategories = getSubcategoriesFromDirectory(categoryPath);
        
        categoriesData[category] = {
          category,
          displayName: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: `${category} resources and learning materials`,
          icon: '📚',
          subcategories: directSubcategories,
          allowedTypes: []
        };
        console.log(`✅ Loaded category: ${category} with ${directSubcategories.length} direct subcategories`);
      }
    }

    console.log(`✅ Found ${Object.keys(categoriesData).length} resource categories`);

    return res.status(200).json({
      success: true,
      data: categoriesData
    });

  } catch (error) {
    console.error('❌ Error fetching resource categories:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}
