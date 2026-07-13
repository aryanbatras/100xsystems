/**
 * ## Markdown Content Library
 *
 * Utilities for reading, parsing, and processing Markdown content files
 * from the `curriculum/` directory. Uses gray-matter for frontmatter.
 * Chapter pages use `react-markdown` for rendering.
 *
 * Systems support language-specific subdirectories:
 *   curriculum/systems/{system}/{language}/chapters/{chapter}/index.md
 *
 * No meta.json files needed — everything is inferred from directory structure.
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
  description: string;
  estimatedTime?: string;
}

export interface ChapterContent {
  meta: ChapterMeta;
  systemSlug: string;
  language: string;
  content: string;
  frontmatter: Record<string, any>;
}

export interface SystemLanguage {
  slug: string;
  displayName: string;
  chapters: ChapterMeta[];
}

export interface SystemMeta {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  type: 'handcrafted' | 'outsourced';
  languages: SystemLanguage[];
  prerequisites: string[];
  skills: string[];
  technologies: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sourceUrl?: string;
  author?: string;
  tags: string[];
  hasTemplate: boolean;
  hasSpecification: boolean;
  templateInstallCmd?: string;
  specificationInstallCmd?: string;
}

export interface LanguageMeta {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  chapters: ChapterMeta[];
}

// ─── Paths ──────────────────────────────────────────────────────────

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
          description: data.description || '',
          estimatedTime: data.estimatedTime,
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
      const dir = path.join(SYSTEMS_DIR, name);
      return isDirectory(dir);
    });
  } catch {
    return [];
  }
}

/** Get languages available for a system */
export function getSystemLanguages(systemSlug: string): SystemLanguage[] {
  try {
    const systemDir = path.join(SYSTEMS_DIR, systemSlug);
    if (!fs.existsSync(systemDir)) return [];

    return fs.readdirSync(systemDir)
      .filter((name) => {
        const dir = path.join(systemDir, name);
        return isDirectory(dir) && name !== 'chapters';
      })
      .map((langSlug) => {
        const chaptersDir = path.join(systemDir, langSlug, 'chapters');
        return {
          slug: langSlug,
          displayName: slugToDisplayName(langSlug),
          chapters: readChaptersFromDir(chaptersDir),
        };
      });
  } catch {
    return [];
  }
}

export function getSystemMeta(slug: string): SystemMeta | null {
  try {
    const systemDir = path.join(SYSTEMS_DIR, slug);
    if (!fs.existsSync(systemDir)) return null;

    const languages = getSystemLanguages(slug);

    return {
      slug,
      title: slugToDisplayName(slug),
      description: '',
      type: 'handcrafted',
      languages,
      prerequisites: [],
      skills: [],
      technologies: [],
      estimatedTime: '',
      difficulty: 'beginner',
      author: '100xSystems',
      tags: [slug],
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
    const mdPath = path.join(SYSTEMS_DIR, systemSlug, language, 'chapters', chapterSlug, 'index.md');
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
        description: data.description || '',
        estimatedTime: data.estimatedTime,
      },
      systemSlug,
      language,
      content,
      frontmatter: data,
    };
  } catch (error) {
    console.error(`Failed to read chapter ${systemSlug}/${language}/${chapterSlug}:`, error);
    return null;
  }
}

// ─── Language Reading ───────────────────────────────────────────────

export function getAllLanguageSlugs(): string[] {
  try {
    if (!fs.existsSync(LANGUAGES_DIR)) return [];
    return fs.readdirSync(LANGUAGES_DIR).filter((name) => {
      const dir = path.join(LANGUAGES_DIR, name);
      return isDirectory(dir);
    });
  } catch {
    return [];
  }
}

export function getLanguageMeta(slug: string): LanguageMeta | null {
  try {
    const langDir = path.join(LANGUAGES_DIR, slug);
    if (!fs.existsSync(langDir)) return null;

    const chaptersDir = path.join(LANGUAGES_DIR, slug, 'chapters');
    return {
      slug,
      title: slugToDisplayName(slug),
      description: '',
      icon: undefined,
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
