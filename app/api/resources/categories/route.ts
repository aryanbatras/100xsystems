import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CATEGORIES_DIR = path.join(process.cwd(), 'content/resources/categories');

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

export async function GET() {
  try {
    if (!fs.existsSync(CATEGORIES_DIR)) {
      return NextResponse.json({ success: true, data: {} });
    }

    const categories = fs.readdirSync(CATEGORIES_DIR);
    const categoriesData: Record<string, any> = {};

    for (const category of categories) {
      const categoryPath = path.join(CATEGORIES_DIR, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        const directSubcategories = getSubcategoriesFromDirectory(categoryPath);

        categoriesData[category] = {
          category,
          displayName: category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
          description: `${category} resources and learning materials`,
          icon: '📚',
          subcategories: directSubcategories,
          allowedTypes: [],
        };
      }
    }

    return NextResponse.json({ success: true, data: categoriesData });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}
