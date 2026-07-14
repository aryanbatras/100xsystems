/**
 * ## Markdown Content Library
 *
 * Utilities for reading, parsing, and processing Markdown content files
 * from the `curriculum/` directory. Uses gray-matter for frontmatter.
 *
 * Curriculum structure:
 *   curriculum/
 *     knowledge-base/      (principles, patterns, tools, technologies)
 *     search/              (formerly tags/ — JSON metadata files)
 *     systems/
 *       [slug]/
 *         index.md         (system metadata)
 *         [folder_tag]/    (architecture, diagrams, tradeoffs, etc.)
 *           file.md
 *           [subfolder]/   (e.g. implementation/java/)
 *             file.md
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Paths ──────────────────────────────────────────────────────────

const CURRICULUM_ROOT = path.join(process.cwd(), '..', 'curriculum');
const SYSTEMS_DIR = path.join(CURRICULUM_ROOT, 'systems');
const LANGUAGES_DIR = path.join(CURRICULUM_ROOT, 'languages');
const SEARCH_DIR = path.join(CURRICULUM_ROOT, 'search');
const KNOWLEDGE_BASE_DIR = path.join(CURRICULUM_ROOT, 'knowledge-base');

// ─── Types ──────────────────────────────────────────────────────────

/** A system meta (from index.md) */
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

/** A file entry within a system's folder_tag */
export interface SystemFileEntry {
  slug: string;
  title: string;
  order: number;
  description: string;
  content: string;
  frontmatter: Record<string, any>;
}

/** A folder_tag within a system (e.g., architecture, diagrams) */
export interface SystemFolderTag {
  tag: string;           // folder name (e.g., "architecture")
  displayName: string;   // human-readable (e.g., "Architecture")
  children: SystemFolderEntry[];
}

/** An entry inside a folder_tag — could be a file or a subfolder */
export interface SystemFolderEntry {
  type: 'file' | 'folder';
  slug: string;
  title: string;
  order: number;
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

// ─── Knowledge Domain Reading (from knowledge-base/) ────────────────

export function getKnowledgeItems(domain: KnowledgeDomain): KnowledgeItem[] {
  const dir = path.join(KNOWLEDGE_BASE_DIR, domain);
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

// ─── System Reading (folder_tag structure) ──────────────────────────

export function getAllSystemSlugs(): string[] {
  try {
    if (!fs.existsSync(SYSTEMS_DIR)) return [];
    return fs.readdirSync(SYSTEMS_DIR).filter((name) => isDirectory(path.join(SYSTEMS_DIR, name)));
  } catch { return []; }
}

/** Get all folder_tags for a system (top-level directories excluding hidden and index.md) */
export function getSystemFolderTags(systemSlug: string): SystemFolderTag[] {
  const tags: SystemFolderTag[] = [];
  try {
    const systemDir = path.join(SYSTEMS_DIR, systemSlug);
    if (!fs.existsSync(systemDir)) return tags;

    const items = fs.readdirSync(systemDir).filter((name) => !name.startsWith('.'));
    const folderTags = items.filter((name) => isDirectory(path.join(systemDir, name))).sort();

    folderTags.forEach((tag) => {
      const tagDir = path.join(systemDir, tag);
      const children = readFolderEntries(tagDir, tag);
      tags.push({
        tag,
        displayName: slugToDisplayName(tag),
        children,
      });
    });
  } catch {}
  return tags;
}

/** Read entries (files + subfolders) inside a folder_tag directory */
function readFolderEntries(dir: string, tag: string): SystemFolderEntry[] {
  const entries: SystemFolderEntry[] = [];
  if (!fs.existsSync(dir)) return entries;

  try {
    const items = fs.readdirSync(dir).filter((name) => !name.startsWith('.'));

    // Collect folders and .md files separately
    const folders: { name: string; order: number }[] = [];
    const mdFiles: { name: string; order: number }[] = [];

    items.forEach((name) => {
      const fullPath = path.join(dir, name);
      if (isDirectory(fullPath)) {
        folders.push({ name, order: 999 });
      } else if (name.endsWith('.md')) {
        // Parse frontmatter for order
        try {
          const raw = fs.readFileSync(fullPath, 'utf-8');
          const { data } = matter(raw);
          mdFiles.push({ name, order: getOrderFromFile(name, data.order) });
        } catch {
          mdFiles.push({ name, order: getOrderFromFile(name) });
        }
      }
    });

    // Sort folders first (by name), then files (by order)
    folders.sort((a, b) => a.name.localeCompare(b.name));
    mdFiles.sort((a, b) => a.order - b.order);

    // Add folders
    folders.forEach((f) => {
      entries.push({
        type: 'folder',
        slug: f.name,
        title: slugToDisplayName(f.name),
        order: f.order,
      });
    });

    // Add files
    mdFiles.forEach((f) => {
      const slug = fileToSlug(f.name);
      const title = (() => {
        try {
          const raw = fs.readFileSync(path.join(dir, f.name), 'utf-8');
          const { data } = matter(raw);
          return data.title || slugToDisplayName(slug);
        } catch {
          return slugToDisplayName(slug);
        }
      })();
      entries.push({
        type: 'file',
        slug,
        title,
        order: f.order,
      });
    });
  } catch {}

  return entries;
}

/** Get the folder path segments for a system's folder_tag */
export function getSystemTagPaths(systemSlug: string): string[][] {
  const tags = getSystemFolderTags(systemSlug);
  const paths: string[][] = [];

  function walk(prefix: string[], tagDir: string) {
    if (!fs.existsSync(tagDir)) return;
    try {
      const items = fs.readdirSync(tagDir).filter((name) => !name.startsWith('.') && !name.endsWith('.md'));
      items.forEach((name) => {
        const fullPath = path.join(tagDir, name);
        if (isDirectory(fullPath)) {
          const segments = [...prefix, name];
          paths.push(segments);
          walk(segments, fullPath);
        }
      });
    } catch {}
  }

  tags.forEach((tag) => {
    const tagDir = path.join(SYSTEMS_DIR, systemSlug, tag.tag);
    walk([tag.tag], tagDir);
  });

  return paths;
}

/** 
 * Read content from a file at a path relative to the system directory.
 * filePathSegments is e.g. ['architecture', 'architecture-overview'] or ['implementation', 'java', 'java-setup']
 * The last segment is a slug (without numeric prefix). We search the directory for a matching file.
 */
export function getSystemFileAtPath(systemSlug: string, filePathSegments: string[]): SystemFileEntry | null {
  try {
    if (filePathSegments.length === 0) return null;

    // Directory = all segments except the last (which is the file slug)
    const dirSegments = filePathSegments.slice(0, -1);
    const fileSlug = filePathSegments[filePathSegments.length - 1];
    const dirPath = path.join(SYSTEMS_DIR, systemSlug, ...dirSegments);

    if (!fs.existsSync(dirPath)) return null;

    // Find the file whose slug matches (files may have numeric prefixes)
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));
    const matchingFile = files.find((f) => fileToSlug(f) === fileSlug);
    if (!matchingFile) return null;

    const filePath = path.join(dirPath, matchingFile);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const slug = fileToSlug(matchingFile);
    return {
      slug,
      title: data.title || slugToDisplayName(slug),
      order: getOrderFromFile(matchingFile, data.order),
      description: data.description || content.slice(0, 200).replace(/#+\s+/g, '').trim() + '...',
      content,
      frontmatter: data,
    };
  } catch { return null; }
}

/**
 * Check if a path resolves to a directory (folder_tag or subfolder)
 * pathSegments is e.g. ['architecture'] or ['implementation', 'java']
 */
export function systemHasDirectory(systemSlug: string, pathSegments: string[]): boolean {
  try {
    const dirPath = path.join(SYSTEMS_DIR, systemSlug, ...pathSegments);
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch { return false; }
}

/**
 * Check if a path resolves to a file (by slug matching in the parent directory)
 * pathSegments is e.g. ['architecture', 'architecture-overview']
 */
export function systemHasFile(systemSlug: string, pathSegments: string[]): boolean {
  try {
    if (pathSegments.length === 0) return false;
    const dirSegments = pathSegments.slice(0, -1);
    const fileSlug = pathSegments[pathSegments.length - 1];
    const dirPath = path.join(SYSTEMS_DIR, systemSlug, ...dirSegments);
    if (!fs.existsSync(dirPath)) return false;
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));
    return files.some((f) => fileToSlug(f) === fileSlug);
  } catch { return false; }
}

/**
 * Read the contents of a directory within a system (used for folder browsing).
 * Returns entries of files and subdirectories.
 */
export function getSystemDirectoryContents(systemSlug: string, pathSegments: string[]): SystemFolderEntry[] {
  try {
    const dirPath = path.join(SYSTEMS_DIR, systemSlug, ...pathSegments);
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return [];

    const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
    return readFolderEntries(dirPath, lastSegment);
  } catch { return []; }
}

/** Get all files across all folder_tags (flattened, for sidebar nav) */
export function getAllSystemFiles(systemSlug: string): Array<{ slug: string; title: string; order: number; pathSegments: string[] }> {
  const result: Array<{ slug: string; title: string; order: number; pathSegments: string[] }> = [];

  function walk(dir: string, pathSegments: string[]) {
    if (!fs.existsSync(dir)) return;
    try {
      const items = fs.readdirSync(dir).filter((name) => !name.startsWith('.'));
      items.forEach((name) => {
        const fullPath = path.join(dir, name);
        if (isDirectory(fullPath)) {
          walk(fullPath, [...pathSegments, name]);
        } else if (name.endsWith('.md') && name !== 'index.md') {
          try {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const { data } = matter(raw);
            const slug = fileToSlug(name);
            // Store pathSegments using the slug (no numeric prefix) so URLs are clean
            result.push({
              slug,
              title: data.title || slugToDisplayName(slug),
              order: getOrderFromFile(name, data.order),
              pathSegments: [...pathSegments, slug],
            });
          } catch {}
        }
      });
    } catch {}
  }

  walk(path.join(SYSTEMS_DIR, systemSlug), []);
  result.sort((a, b) => a.order - b.order);
  return result;
}

/** 
 * Backward-compatible: get all flat files from a system (used by old reading page).
 * Now returns files from ALL folder_tags, not just root-level.
 */
export function getSystemFlatFiles(systemSlug: string): SystemFileEntry[] {
  const entries: SystemFileEntry[] = [];

  function walk(dir: string) {
    if (!fs.existsSync(dir)) return;
    try {
      const items = fs.readdirSync(dir).filter((name) => !name.startsWith('.'));
      items.forEach((name) => {
        const fullPath = path.join(dir, name);
        if (isDirectory(fullPath)) {
          walk(fullPath);
        } else if (name.endsWith('.md') && name !== 'index.md') {
          try {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const { data, content } = matter(raw);
            const slug = fileToSlug(name);
            entries.push({
              slug,
              title: data.title || slugToDisplayName(slug),
              order: getOrderFromFile(name, data.order),
              description: data.description || content.slice(0, 200).replace(/#+\s+/g, '').trim() + '...',
              content,
              frontmatter: data,
            });
          } catch {}
        }
      });
    } catch {}
  }

  walk(path.join(SYSTEMS_DIR, systemSlug));
  entries.sort((a, b) => a.order - b.order);
  return entries;
}

/** Get a single file by slug (backward-compatible, searches all folder_tags) */
export function getSystemFile(systemSlug: string, fileSlug: string): SystemFileEntry | null {
  const files = getSystemFlatFiles(systemSlug);
  return files.find((f) => f.slug === fileSlug) || null;
}

/** Get system metadata from index.md */
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

// ─── Search / Tag Data (from search/ directory) ─────────────────────

export interface ResourceItem { title: string; description: string; url: string; }
export interface TagSearchData {
  tag: string; displayName: string; description: string;
  youtube: ResourceItem[]; websites: ResourceItem[]; articles: ResourceItem[];
  courses: ResourceItem[]; books: ResourceItem[]; tools: ResourceItem[];
}

export function getAllTagSlugs(): string[] {
  try {
    if (!fs.existsSync(SEARCH_DIR)) return [];
    return fs.readdirSync(SEARCH_DIR).filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));
  } catch { return []; }
}

export function getTagData(tag: string): TagSearchData | null {
  try {
    const tagPath = path.join(SEARCH_DIR, `${tag}.json`);
    if (!fs.existsSync(tagPath)) return null;
    return JSON.parse(fs.readFileSync(tagPath, 'utf-8'));
  } catch { return null; }
}

export function getAllTags(): TagSearchData[] {
  return getAllTagSlugs().map((slug) => getTagData(slug)).filter((t): t is TagSearchData => t !== null);
}
