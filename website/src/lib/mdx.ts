/**
 * ## Markdown Content Library
 *
 * Utilities for reading, parsing, and processing Markdown content files
 * from the `curriculum/` directory. Uses gray-matter for frontmatter.
 *
 * All content files are flat .md files (no subdirectories), with order
 * derived from frontmatter `order` or numeric filename prefix.
 *
 * @packageDocumentation
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

export interface ChapterMeta {
  slug: string;
  title: string;
  order: number;
}

export interface ChapterContent {
  meta: ChapterMeta;
  systemSlug: string;
  language: string;
  content: string;
  frontmatter: Record<string, any>;
}

export interface SystemMeta {
  slug: string;
  title: string;
  languages: string[];
  chapters: ChapterMeta[];
  hasTemplate: boolean;
  hasSpecification: boolean;
  templateInstallCmd?: string;
  specificationInstallCmd?: string;
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

/** A flat file entry within a system (e.g., architecture-overview.md) */
export interface SystemFileEntry {
  slug: string;
  title: string;
  order: number;
  description: string;
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

/** Extract slug from filename by removing prefix (e.g., "01-cap-theorem.md" → "cap-theorem") */
function fileToSlug(filename: string): string {
  const base = filename.replace(/\.md$/, '');
  // Strip numeric prefix like "01-", "02-"
  return base.replace(/^\d+[-_]/, '');
}

/** Get order from filename prefix or frontmatter */
function getOrderFromFile(filename: string, frontmatterOrder?: number): number {
  if (frontmatterOrder !== undefined) return frontmatterOrder;
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

function readChaptersFromDir(chaptersDir: string): ChapterMeta[] {
  const chapters: ChapterMeta[] = [];
  if (!fs.existsSync(chaptersDir)) return chapters;

  const chapterDirs = fs.readdirSync(chaptersDir).filter((name) => {
    return isDirectory(path.join(chaptersDir, name));
  });

  chapterDirs.sort().forEach((chapterDir) => {
    const mdPath = path.join(chaptersDir, chapterDir, 'index.md');
    if (fs.existsSync(mdPath)) {
      try {
        const { data } = matter(fs.readFileSync(mdPath, 'utf-8'));
        chapters.push({
          slug: chapterDir,
          title: data.title || slugToDisplayName(chapterDir),
          order: data.order || chapters.length + 1,
        });
      } catch {}
    }
  });

  return chapters;
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

export function getSystemLanguages(systemSlug: string): string[] {
  try {
    const langDir = path.join(SYSTEMS_DIR, systemSlug, 'languages');
    if (!fs.existsSync(langDir)) return [];
    return fs.readdirSync(langDir).filter((name) => isDirectory(path.join(langDir, name)));
  } catch { return []; }
}

/** Read system flat files (root-level .md files, excluding chapters/ and languages/) */
export function getSystemFlatFiles(systemSlug: string): SystemFileEntry[] {
  const entries: SystemFileEntry[] = [];

  try {
    const systemDir = path.join(SYSTEMS_DIR, systemSlug);
    if (!fs.existsSync(systemDir)) return entries;

    const files = fs.readdirSync(systemDir)
      .filter((f) => f.endsWith('.md'));

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

export function getSystemMeta(slug: string): SystemMeta | null {
  try {
    const systemDir = path.join(SYSTEMS_DIR, slug);
    if (!fs.existsSync(systemDir)) return null;

    const chaptersDir = path.join(systemDir, 'chapters');
    const chapters = readChaptersFromDir(chaptersDir);
    const languages = getSystemLanguages(slug);

    return {
      slug,
      title: slugToDisplayName(slug),
      languages,
      chapters,
      hasTemplate: false,
      hasSpecification: false,
    };
  } catch { return null; }
}

export function getAllSystems(): SystemMeta[] {
  return getAllSystemSlugs()
    .map((slug) => getSystemMeta(slug))
    .filter((s): s is SystemMeta => s !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getHandcraftedSystems(): SystemMeta[] { return getAllSystems(); }
export function getOutsourcedSystems(): SystemMeta[] { return []; }

// ─── Chapter Reading ────────────────────────────────────────────────

export function getChapterContent(systemSlug: string, language: string, chapterSlug: string): ChapterContent | null {
  try {
    const mdPath = path.join(SYSTEMS_DIR, systemSlug, 'chapters', chapterSlug, 'index.md');
    if (!fs.existsSync(mdPath)) return null;

    const fileContent = fs.readFileSync(mdPath, 'utf-8');
    const { data, content } = matter(fileContent);
    const orderMatch = chapterSlug.match(/^(\d+)/);
    const order = orderMatch ? parseInt(orderMatch[1]) : 0;

    return {
      meta: { slug: chapterSlug, title: data.title || slugToDisplayName(chapterSlug), order },
      systemSlug, language, content, frontmatter: data,
    };
  } catch (error) {
    console.error(`Failed to read chapter ${systemSlug}/${chapterSlug}:`, error);
    return null;
  }
}

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
    return { slug, title: slugToDisplayName(slug), chapters: readChaptersFromDir(path.join(langDir, 'chapters')) };
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
