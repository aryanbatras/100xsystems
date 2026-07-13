/**
 * ## Markdown Content Library
 *
 * Utilities for reading, parsing, and processing Markdown content files
 * from the `curriculum/` directory. Uses gray-matter for frontmatter.
 *
 * Flat structure:
 *   curriculum/systems/{slug}/chapters/{chapter}/index.md
 *   curriculum/systems/{slug}/languages/{lang}/
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

// ─── Helpers ────────────────────────────────────────────────────────

function slugToDisplayName(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function isDirectory(dir: string): boolean {
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
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
      } catch {
        // Skip files with invalid frontmatter
      }
    }
  });

  return chapters;
}

// ─── System Reading ─────────────────────────────────────────────────

/** Get all system slugs (e.g., "claude-code") */
export function getAllSystemSlugs(): string[] {
  try {
    if (!fs.existsSync(SYSTEMS_DIR)) return [];
    return fs.readdirSync(SYSTEMS_DIR).filter((name) => {
      return isDirectory(path.join(SYSTEMS_DIR, name));
    });
  } catch {
    return [];
  }
}

/** Get language slugs available for a system (e.g., ["java", "python"]) */
export function getSystemLanguages(systemSlug: string): string[] {
  try {
    const langDir = path.join(SYSTEMS_DIR, systemSlug, 'languages');
    if (!fs.existsSync(langDir)) return [];
    return fs.readdirSync(langDir).filter((name) => {
      return isDirectory(path.join(langDir, name));
    });
  } catch {
    return [];
  }
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
  } catch {
    return null;
  }
}

export function getAllSystems(): SystemMeta[] {
  const slugs = getAllSystemSlugs();
  return slugs
    .map((slug) => getSystemMeta(slug))
    .filter((s): s is SystemMeta => s !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getHandcraftedSystems(): SystemMeta[] {
  return getAllSystems();
}

export function getOutsourcedSystems(): SystemMeta[] {
  return [];
}

// ─── Chapter Reading ────────────────────────────────────────────────

export function getChapterContent(
  systemSlug: string,
  language: string,
  chapterSlug: string
): ChapterContent | null {
  try {
    const mdPath = path.join(SYSTEMS_DIR, systemSlug, 'chapters', chapterSlug, 'index.md');
    if (!fs.existsSync(mdPath)) return null;

    const fileContent = fs.readFileSync(mdPath, 'utf-8');
    const { data, content } = matter(fileContent);

    const orderMatch = chapterSlug.match(/^(\d+)/);
    const order = orderMatch ? parseInt(orderMatch[1]) : 0;

    return {
      meta: {
        slug: chapterSlug,
        title: data.title || slugToDisplayName(chapterSlug),
        order,
      },
      systemSlug,
      language,
      content,
      frontmatter: data,
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
    return fs.readdirSync(LANGUAGES_DIR).filter((name) => {
      return isDirectory(path.join(LANGUAGES_DIR, name));
    });
  } catch {
    return [];
  }
}

export function getLanguageMeta(slug: string): LanguageMeta | null {
  try {
    const langDir = path.join(LANGUAGES_DIR, slug);
    if (!fs.existsSync(langDir)) return null;

    const chaptersDir = path.join(langDir, 'chapters');
    return {
      slug,
      title: slugToDisplayName(slug),
      chapters: readChaptersFromDir(chaptersDir),
    };
  } catch {
    return null;
  }
}

export function getAllLanguages(): LanguageMeta[] {
  const slugs = getAllLanguageSlugs();
  return slugs
    .map((slug) => getLanguageMeta(slug))
    .filter((l): l is LanguageMeta => l !== null)
    .sort((a, b) => a.title.localeCompare(b.title));
}

// ─── Tag Search Data ────────────────────────────────────────────────

export interface ResourceItem {
  title: string;
  description: string;
  url: string;
}

export interface TagSearchData {
  tag: string;
  displayName: string;
  description: string;
  youtube: ResourceItem[];
  websites: ResourceItem[];
  articles: ResourceItem[];
  courses: ResourceItem[];
  books: ResourceItem[];
  tools: ResourceItem[];
}

export function getAllTagSlugs(): string[] {
  try {
    if (!fs.existsSync(TAGS_DIR)) return [];
    return fs.readdirSync(TAGS_DIR)
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace('.json', ''));
  } catch {
    return [];
  }
}

export function getTagData(tag: string): TagSearchData | null {
  try {
    const tagPath = path.join(TAGS_DIR, `${tag}.json`);
    if (!fs.existsSync(tagPath)) return null;
    return JSON.parse(fs.readFileSync(tagPath, 'utf-8'));
  } catch {
    return null;
  }
}

export function getAllTags(): TagSearchData[] {
  const slugs = getAllTagSlugs();
  return slugs
    .map((slug) => getTagData(slug))
    .filter((t): t is TagSearchData => t !== null);
}
