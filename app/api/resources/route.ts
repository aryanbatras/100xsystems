import { NextRequest, NextResponse } from 'next/server';
import { Resource } from '@/application/types/resources';
import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = path.join(process.cwd(), 'content/resources/categories');

function readJsonFile(filePath: string): any {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
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

    if (!stat.isDirectory() && item.endsWith('.json')) {
      const resource = readJsonFile(itemPath);
      if (resource) {
        resource.category = category;
        resource.subcategory = subcategory;
        resources.push(resource);
      }
    }
  }

  return resources.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export async function GET() {
  try {
    if (!fs.existsSync(CATEGORIES_DIR)) {
      return NextResponse.json({ success: true, data: [] });
    }

    const categories = fs.readdirSync(CATEGORIES_DIR);
    const allResources: Resource[] = [];

    for (const categoryDir of categories) {
      const categoryPath = path.join(CATEGORIES_DIR, categoryDir);
      if (fs.statSync(categoryPath).isDirectory()) {
        const subcategories = fs.readdirSync(categoryPath);
        for (const subcategory of subcategories) {
          const subcategoryPath = path.join(categoryPath, subcategory);
          if (fs.statSync(subcategoryPath).isDirectory()) {
            const resources = getResourcesFromDirectory(subcategoryPath, categoryDir, subcategory);
            allResources.push(...resources);
          }
        }
      }
    }

    const sortedResources = allResources.sort((a, b) => {
      const orderA = a.order || 999;
      const orderB = b.order || 999;
      if (orderA !== orderB) return orderA - orderB;

      const qualityOrder = { gold: 0, silver: 1, bronze: 2 } as const;
      const qualityA = qualityOrder[a.quality as keyof typeof qualityOrder] ?? 3;
      const qualityB = qualityOrder[b.quality as keyof typeof qualityOrder] ?? 3;
      if (qualityA !== qualityB) return qualityA - qualityB;

      return a.title.localeCompare(b.title);
    });

    return NextResponse.json({ success: true, data: sortedResources });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}
