/**
 * ## CLI Docs Reader
 *
 * Reads CLI documentation markdown files from `curriculum/cli-docs/`
 * and provides typed access for the website pages.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Paths ──────────────────────────────────────────────────────────

const CLI_DOCS_DIR = path.join(process.cwd(), '..', 'curriculum', 'cli-docs');

// ─── Types ──────────────────────────────────────────────────────────

export interface CliDocItem {
  slug: string;
  title: string;
  description: string;
  content: string;
  frontmatter: Record<string, any>;
  order: number;
  authRequired: boolean;
  category: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

function fileToSlug(filename: string): string {
  return filename.replace(/\.md$/, '');
}

function slugToTitle(slug: string): string {
  if (slug === 'index') return 'CLI Documentation';
  return `100xsystems ${slug}`;
}

// ─── Reader ─────────────────────────────────────────────────────────

export function getCliDocsIndexContent(): string | null {
  try {
    const fullPath = path.join(CLI_DOCS_DIR, 'index.md');
    if (!fs.existsSync(fullPath)) return null;
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { content } = matter(raw);
    // Strip the first # heading since the page has its own title
    return content.replace(/^\s*# .+(\n|$)/, '').trim();
  } catch {
    return null;
  }
}

export function getCliDocSlugs(): string[] {
  try {
    if (!fs.existsSync(CLI_DOCS_DIR)) return [];
    const files = fs.readdirSync(CLI_DOCS_DIR)
      .filter((f) => f.endsWith('.md') && f !== 'index.md')
      .sort();
    return files.map(fileToSlug);
  } catch {
    return [];
  }
}

export function getCliDoc(slug: string): CliDocItem | null {
  try {
    const expectedFiles = [`${slug}.md`];
    for (const file of expectedFiles) {
      const fullPath = path.join(CLI_DOCS_DIR, file);
      if (fs.existsSync(fullPath)) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(raw);
        return {
          slug,
          title: data.title || slugToTitle(slug),
          description: data.description || content.slice(0, 200).replace(/#+\s+/g, '').trim() + '...',
          content,
          frontmatter: data,
          order: data.order ?? 999,
          authRequired: data.auth_required ?? false,
          category: data.category ?? 'general',
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function getAllCliDocs(): CliDocItem[] {
  const slugs = getCliDocSlugs();
  const docs: CliDocItem[] = [];
  for (const slug of slugs) {
    const doc = getCliDoc(slug);
    if (doc) docs.push(doc);
  }
  return docs.sort((a, b) => a.order - b.order);
}
