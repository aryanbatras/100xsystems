/**
 * ## Markdown Content Library
 *
 * Utilities for reading, parsing, and processing Markdown content files
 * from the `curriculum/` directory. Uses gray-matter for frontmatter.
 *
 * All content is flat .md files with order from frontmatter or numeric filename prefix.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Paths ──────────────────────────────────────────────────────────

const CURRICULUM_ROOT = path.join(process.cwd(), '..', 'curriculum');
const SYSTEMS_DIR = path.join(CURRICULUM_ROOT, 'systems');
const LANGUAGES_DIR = path.join(CURRICULUM_ROOT, 'languages');
const TAGS_DIR = path.join(CURRICULUM_ROOT, 'tags');
const PRINCIPLES_DIR = path.join(CURRICULUM_ROOT, 'principles');
const PATTERNS_DIR = path.join(CURRICULUM_ROOT, 'patterns');
const TOOLS_DIR = path.join(CURRICULUM_ROOT, 'tools');
const TECHNOLOGIES_DIR = path.join(CURRICULUM_ROOT, 'technologies');

// ─── Types ──────────────────────────────────────────────────────────

/** A system meta (from index.md or slug) */
export interface SystemMeta {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  order: number;
  hasTemplate: boolean;
  hasSpecification: boolean;
  templateInstallCmd?: string;
  specificationInstallCmd?: string;
}

/** A flat file entry within a system */
export interface SystemFileEntry {
  slug: string;
  title: string;
  order: number;
  description: string;
  content: string;
  frontmatter: Record<string, any>;
}

/** Chapter metadata used in language pages */
export interface ChapterMeta {
  slug: string;
  title: string;
  order: number;
}

export interface LanguageMeta {
  slug: string;
  title: string;
  chapters: ChapterMeta[];
}

/** A knowledge domain item (principle, pattern, tool, technology) */
export interface KnowledgeItem {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  content: string;
  frontmatter: Record<string, any>;
}

export type KnowledgeDomain = 'principles' | 'patterns' | 'tools' | 'technologies';

// ─── Helpers ────────────────────────────────────────────────────────

function slugToDisplayName(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function isDirectory(dir: string): boolean {
  try { return fs.statSync(dir).isDirectory(); }
  catch { return false; }
}

function fileToSlug(filename: string): string {
  const base = filename.replace(/\.md$/, '');
  return base.replace(/^\d+[-_]/, '');
}

function getOrderFromFile(filename: string, frontmatterOrder?: number): number {
  if (frontmatterOrder !== undefined) return frontmatterOrder;
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

/** Read .md files from a flat directory (no subdirectories) */
function readFlatMarkdownFiles(dir: string): Array<{ filename: string; content: string; data: Record<string, any> }> {
  const results: Array<{ filename: string; content: string; data: Record<string, any> }> = [];
  if (!fs.existsSync(dir)) return results;

  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  files.forEach((filename) => {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data, content } = matter(raw);
      results.push({ filename, content, data });
    } catch {}
  });

  return results;
}

// ─── Knowledge Domain Reading (flat files) ──────────────────────────

export function getKnowledgeItems(domain: KnowledgeDomain): KnowledgeItem[] {
  const dirMap: Record<KnowledgeDomain, string> = {
    principles: PRINCIPLES_DIR,
    patterns: PATTERNS_DIR,
    tools: TOOLS_DIR,
    technologies: TECHNOLOGIES_DIR,
  };

  const dir = dirMap[domain];
  const files = readFlatMarkdownFiles(dir);

  return files.map(({ filename, content, data }) => ({
    slug: fileToSlug(filename),
    title: data.title || slugToDisplayName(fileToSlug(filename)),
    description: data.description || content.slice(0, 200).replace(/#+\s+/g, '').trim() + '...',
    difficulty: data.difficulty || 'Beginner',
    tags: data.tags || [],
    content,
    frontmatter: data,
  })).sort((a, b) => {
    const orderA = a.frontmatter.order ?? 999;
    const orderB = b.frontmatter.order ?? 999;
    return orderA - orderB;
  });
}

export function getKnowledgeItem(domain: KnowledgeDomain, slug: string): KnowledgeItem | null {
  const items = getKnowledgeItems(domain);
  return items.find((item) => item.slug === slug) || null;
}

// ─── System Reading ─────────────────────────────────────────────────

export function getAllSystemSlugs(): string[] {
  try {
    if (!fs.existsSync(SYSTEMS_DIR)) return [];
    return fs.readdirSync(SYSTEMS_DIR).filter((name) => isDirectory(path.join(SYSTEMS_DIR, name)));
  } catch { return []; }
}

/** Read system flat files (root-level .md files) */
export function getSystemFlatFiles(systemSlug: string): SystemFileEntry[] {
  const entries: SystemFileEntry[] = [];

  try {
    const systemDir = path.join(SYSTEMS_DIR, systemSlug);
    if (!fs.existsSync(systemDir)) return entries;

    const files = fs.readdirSync(systemDir)
      .filter((f) => f.endsWith('.md'))
      .filter((f) => f !== 'index.md'); // skip system metadata

    files.sort().forEach((filename) => {
      try {
        const raw = fs.readFileSync(path.join(systemDir, filename), 'utf-8');
        const { data, content } = matter(raw);
        const slug = fileToSlug(filename);
        entries.push({
          slug,
          title: data.title || slugToDisplayName(slug),
          order: getOrderFromFile(filename, data.order),
          description: data.description || content.slice(0, 200).replace(/#+\s+/g, '').trim() + '...',
          content,
          frontmatter: data,
        });
      } catch {}
    });

    entries.sort((a, b) => a.order - b.order);
  } catch {}

  return entries;
}

/** Get a single flat file from a system */
export function getSystemFile(systemSlug: string, fileSlug: string): SystemFileEntry | null {
  const files = getSystemFlatFiles(systemSlug);
  return files.find((f) => f.slug === fileSlug) || null;
}

export function getSystemMeta(slug: string): SystemMeta | null {
  try {
    const systemDir = path.join(SYSTEMS_DIR, slug);
    if (!fs.existsSync(systemDir)) return null;

    const indexMdPath = path.join(systemDir, 'index.md');
    let title = slugToDisplayName(slug);
    let description = '';
    let difficulty = 'Intermediate';
    let tags: string[] = [];
    let order = 999;

    if (fs.existsSync(indexMdPath)) {
      try {
        const { data } = matter(fs.readFileSync(indexMdPath, 'utf-8'));
        title = data.title || title;
        description = data.description || '';
        difficulty = data.difficulty || difficulty;
        tags = data.tags || [];
        order = data.order ?? order;
      } catch {}
    }

    return {
      slug,
      title,
      description,
      difficulty,
      tags,
      order,
      hasTemplate: false,
      hasSpecification: false,
    };
  } catch { return null; }
}

export function getAllSystems(): SystemMeta[] {
  return getAllSystemSlugs()
    .map((slug) => getSystemMeta(slug))
    .filter((s): s is SystemMeta => s !== null)
    .sort((a, b) => a.order - b.order);
}

export function getHandcraftedSystems(): SystemMeta[] { return getAllSystems(); }
export function getOutsourcedSystems(): SystemMeta[] { return []; }

// ─── Language Reading ───────────────────────────────────────────────

export function getAllLanguageSlugs(): string[] {
  try {
    if (!fs.existsSync(LANGUAGES_DIR)) return [];
    return fs.readdirSync(LANGUAGES_DIR).filter((name) => isDirectory(path.join(LANGUAGES_DIR, name)));
  } catch { return []; }
}

export function getLanguageMeta(slug: string): LanguageMeta | null {
  try {
    const langDir = path.join(LANGUAGES_DIR, slug);
    if (!fs.existsSync(langDir)) return null;
    return { slug, title: slugToDisplayName(slug), chapters: [] };
  } catch { return null; }
}

export function getAllLanguages(): LanguageMeta[] {
  return getAllLanguageSlugs()
    .map((slug) => getLanguageMeta(slug))
    .filter((l): l is LanguageMeta => l !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

// ─── Tag Search Data ────────────────────────────────────────────────

export interface ResourceItem { title: string; description: string; url: string; }
export interface TagSearchData {
  tag: string; displayName: string; description: string;
  youtube: ResourceItem[]; websites: ResourceItem[]; articles: ResourceItem[];
  courses: ResourceItem[]; books: ResourceItem[]; tools: ResourceItem[];
}

export function getAllTagSlugs(): string[] {
  try {
    if (!fs.existsSync(TAGS_DIR)) return [];
    return fs.readdirSync(TAGS_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));
  } catch { return []; }
}

export function getTagData(tag: string): TagSearchData | null {
  try {
    const tagPath = path.join(TAGS_DIR, `${tag}.json`);
    if (!fs.existsSync(tagPath)) return null;
    return JSON.parse(fs.readFileSync(tagPath, 'utf-8'));
  } catch { return null; }
}

export function getAllTags(): TagSearchData[] {
  return getAllTagSlugs().map((slug) => getTagData(slug)).filter((t): t is TagSearchData => t !== null);
}
