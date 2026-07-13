/**
 * ## MDX Content Library
 *
 * Utilities for reading, parsing, and processing MDX content files
 * from the `content/` directory. Uses gray-matter for frontmatter.
 * Chapter pages use `next-mdx-remote/rsc` which compiles raw markdown
 * on the server, so no pre-serialization is needed here.
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Types ──────────────────────────────────────────────────────────

export interface SystemMeta {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  type: 'handcrafted' | 'outsourced';
  languages: string[];
  languageAgnostic: boolean;
  prerequisites: string[];
  skills: string[];
  technologies: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sourceUrl?: string;
  author?: string;
  tags: string[];
  chapters: ChapterMeta[];
  hasTemplate: boolean;
  hasSpecification: boolean;
  templateInstallCmd?: string;
  specificationInstallCmd?: string;
}

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
  content: string;
  frontmatter: Record<string, any>;
}

export interface LanguageMeta {
  slug: string;
  title: string;
  description: string;
  icon?: string;
  chapters: ChapterMeta[];
}

// ─── Paths ──────────────────────────────────────────────────────────

// In monorepo: project root = website/, curriculum/ is a sibling
const CURRICULUM_ROOT = path.join(process.cwd(), '..', 'curriculum');
const CONTENT_ROOT = CURRICULUM_ROOT;
const SYSTEMS_DIR = path.join(CONTENT_ROOT, 'systems');
const LANGUAGES_DIR = path.join(CONTENT_ROOT, 'languages');
const TAGS_DIR = path.join(CONTENT_ROOT, 'tags');

// ─── System Reading ─────────────────────────────────────────────────

export function getAllSystemSlugs(): string[] {
  try {
    if (!fs.existsSync(SYSTEMS_DIR)) return [];
    return fs.readdirSync(SYSTEMS_DIR).filter((name) => {
      const dir = path.join(SYSTEMS_DIR, name);
      return fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'meta.json'));
    });
  } catch {
    return [];
  }
}

export function getSystemMeta(slug: string): SystemMeta | null {
  try {
    const metaPath = path.join(SYSTEMS_DIR, slug, 'meta.json');
    if (!fs.existsSync(metaPath)) return null;
    const raw = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    const chaptersDir = path.join(SYSTEMS_DIR, slug, 'chapters');
    const chapters: ChapterMeta[] = [];

    if (fs.existsSync(chaptersDir)) {
      const chapterDirs = fs.readdirSync(chaptersDir).filter((name) => {
        const dir = path.join(chaptersDir, name);
        return fs.statSync(dir).isDirectory();
      });
      chapterDirs.sort().forEach((chapterDir) => {
        const mdxPath = path.join(chaptersDir, chapterDir, 'index.mdx');
        if (fs.existsSync(mdxPath)) {
          const fileContent = fs.readFileSync(mdxPath, 'utf-8');
          const { data } = matter(fileContent);
          chapters.push({
            slug: chapterDir,
            title: data.title || chapterDir,
            order: data.order || chapters.length + 1,
            description: data.description || '',
            estimatedTime: data.estimatedTime,
          });
        }
      });
    }

    return {
      slug,
      title: raw.title || slug,
      description: raw.description || '',
      longDescription: raw.longDescription,
      type: raw.type || 'handcrafted',
      languages: raw.languages || [],
      languageAgnostic: raw.languageAgnostic ?? true,
      prerequisites: raw.prerequisites || [],
      skills: raw.skills || [],
      technologies: raw.technologies || [],
      estimatedTime: raw.estimatedTime || '',
      difficulty: raw.difficulty || 'beginner',
      sourceUrl: raw.sourceUrl,
      author: raw.author,
      tags: raw.tags || [],
      chapters,
      hasTemplate: raw.hasTemplate ?? false,
      hasSpecification: raw.hasSpecification ?? false,
      templateInstallCmd: raw.templateInstallCmd,
      specificationInstallCmd: raw.specificationInstallCmd,
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
  return getAllSystems().filter((s) => s.type === 'handcrafted');
}

export function getOutsourcedSystems(): SystemMeta[] {
  return getAllSystems().filter((s) => s.type === 'outsourced');
}

// ─── Chapter Reading ────────────────────────────────────────────────

export function getChapterContent(
  systemSlug: string,
  chapterSlug: string
): ChapterContent | null {
  try {
    const mdxPath = path.join(SYSTEMS_DIR, systemSlug, 'chapters', chapterSlug, 'index.mdx');
    if (!fs.existsSync(mdxPath)) return null;

    const fileContent = fs.readFileSync(mdxPath, 'utf-8');
    const { data, content } = matter(fileContent);

    const orderMatch = chapterSlug.match(/^(\d+)/);
    const order = orderMatch ? parseInt(orderMatch[1]) : 0;

    return {
      meta: {
        slug: chapterSlug,
        title: data.title || chapterSlug,
        order,
        description: data.description || '',
        estimatedTime: data.estimatedTime,
      },
      systemSlug,
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
      const dir = path.join(LANGUAGES_DIR, name);
      return fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'meta.json'));
    });
  } catch {
    return [];
  }
}

export function getLanguageMeta(slug: string): LanguageMeta | null {
  try {
    const metaPath = path.join(LANGUAGES_DIR, slug, 'meta.json');
    if (!fs.existsSync(metaPath)) return null;
    const raw = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

    const chaptersDir = path.join(LANGUAGES_DIR, slug, 'chapters');
    const chapters: ChapterMeta[] = [];

    if (fs.existsSync(chaptersDir)) {
      const chapterDirs = fs.readdirSync(chaptersDir).filter((name) => {
        const dir = path.join(chaptersDir, name);
        return fs.statSync(dir).isDirectory();
      });
      chapterDirs.sort().forEach((chapterDir) => {
        const mdxPath = path.join(chaptersDir, chapterDir, 'index.mdx');
        if (fs.existsSync(mdxPath)) {
          const { data } = matter(fs.readFileSync(mdxPath, 'utf-8'));
          chapters.push({
            slug: chapterDir,
            title: data.title || chapterDir,
            order: data.order || chapters.length + 1,
            description: data.description || '',
            estimatedTime: data.estimatedTime,
          });
        }
      });
    }

    return {
      slug,
      title: raw.title || slug,
      description: raw.description || '',
      icon: raw.icon,
      chapters,
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
