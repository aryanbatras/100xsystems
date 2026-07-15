/**
 * ## Markdown Content Library
 *
 * Utilities for reading, parsing, and processing Markdown content files
 * from the `curriculum/` directory.
 *
 * Supports both old folder_tag structure (architecture/, tradeoffs/, etc.)
 * and new lesson/track/module structure (track-x/module-x/lesson-x.md).
 *
 * Curriculum structure:
 *   curriculum/
 *     knowledge-base/      (principles, patterns, tools, technologies)
 *     search/              (JSON metadata files)
 *     systems/
 *       [slug]/
 *         index.md         (system metadata with track definitions)
 *         track-{lang}/    (NEW: language-specific tracks)
 *           module-{n}/
 *             lesson-n.md  (lesson with frontmatter)
 *             quiz.md
 *             challenge.md
 *         {folder_tag}/    (OLD: architecture, diagrams, tradeoffs, etc.)
 *           file.md
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

export interface SystemMeta {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  order: number;
  hasTemplate: boolean;
  hasSpecification: boolean;
  tracks?: TrackMeta[];
  templateInstallCmd?: string;
  specificationInstallCmd?: string;
}

export interface TrackMeta {
  slug: string;
  title: string;
  language: string;
  difficulty: string;
}

export interface ModuleMeta {
  slug: string;
  title: string;
  order: number;
  lessons: LessonMeta[];
}

export interface TrackModuleNode {
  module: ModuleMeta;
  lessons: LessonMeta[];
}

export interface SystemTrackTree {
  track: TrackMeta;
  modules: TrackModuleNode[];
  lessonCount: number;
}

export interface LessonMeta {
  slug: string;
  title: string;
  order: number;
  description: string;
  content: string;
  frontmatter: Record<string, any>;
  track: string;
  module: string;
  pathSegments: string[];
  estimatedTime?: string;
  difficulty?: string;
  knowledgeRefs?: string[];
  prerequisites?: string[];
}

export interface SystemFileEntry {
  slug: string;
  title: string;
  order: number;
  description: string;
  content: string;
  frontmatter: Record<string, any>;
  knowledgeRefs?: string[];
  estimatedTime?: string;
  difficulty?: string;
  trackSlug?: string;
  moduleSlug?: string;
}

export interface SystemFolderTag {
  tag: string;
  displayName: string;
  children: SystemFolderEntry[];
}

export interface SystemFolderEntry {
  type: 'file' | 'folder';
  slug: string;
  title: string;
  order: number;
}

export interface ChapterMeta { slug: string; title: string; order: number; }
export interface LanguageMeta { slug: string; title: string; chapters: ChapterMeta[]; }

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

export interface ResourceItem { title: string; description: string; url: string; }
export interface TagSearchData {
  tag: string; displayName: string; description: string;
  youtube: ResourceItem[]; websites: ResourceItem[]; articles: ResourceItem[];
  courses: ResourceItem[]; books: ResourceItem[]; tools: ResourceItem[];
}

// ─── Helpers ────────────────────────────────────────────────────────

function slugToDisplayName(slug: string): string {
  return slug.split(/[-_]/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function isDirectory(dir: string): boolean {
  try { return fs.statSync(dir).isDirectory(); } catch { return false; }
}

function fileToSlug(filename: string): string {
  return filename.replace(/\.md$/, '').replace(/^\d+[-_]/, '');
}

function getOrderFromFile(filename: string, frontmatterOrder?: number): number {
  if (frontmatterOrder !== undefined) return frontmatterOrder;
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

function readFlatMarkdownFiles(dir: string): Array<{ filename: string; content: string; data: Record<string, any> }> {
  const results: Array<{ filename: string; content: string; data: Record<string, any> }> = [];
  if (!fs.existsSync(dir)) return results;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  files.forEach((filename) => {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data, content } = matter(raw);
      results.push({ filename, content, data });
    } catch {}
  });
  return results;
}

// ─── Knowledge Domain Reading ───────────────────────────────────────

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
  })).sort((a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999));
}

export function getKnowledgeItem(domain: KnowledgeDomain, slug: string): KnowledgeItem | null {
  return getKnowledgeItems(domain).find((item) => item.slug === slug) || null;
}

// ─── System Reading (NEW: Lesson/Track/Module) ──────────────────────

export function getAllSystemSlugs(): string[] {
  try {
    if (!fs.existsSync(SYSTEMS_DIR)) return [];
    return fs.readdirSync(SYSTEMS_DIR).filter((name) => isDirectory(path.join(SYSTEMS_DIR, name)));
  } catch { return []; }
}

/**
 * Get all tracks for a system by scanning for track-* directories
 * and reading track metadata from index.md frontmatter.
 */
export function getSystemTracks(systemSlug: string): TrackMeta[] {
  const tracks: TrackMeta[] = [];
  const systemDir = path.join(SYSTEMS_DIR, systemSlug);
  if (!fs.existsSync(systemDir)) return tracks;

  // Try reading track definitions from index.md frontmatter first
  const indexMdPath = path.join(systemDir, 'index.md');
  if (fs.existsSync(indexMdPath)) {
    try {
      const { data } = matter(fs.readFileSync(indexMdPath, 'utf-8'));
      if (data.tracks && Array.isArray(data.tracks)) {
        return data.tracks.map((t: any) => ({
          slug: t.slug || '',
          title: t.title || slugToDisplayName(t.slug || ''),
          language: t.language || '',
          difficulty: t.difficulty || data.difficulty || 'Intermediate',
        }));
      }
    } catch {}
  }

  // Fallback: scan for track-* directories
  try {
    const items = fs.readdirSync(systemDir).filter((name) => name.startsWith('track-'));
    items.sort().forEach((name) => {
      if (isDirectory(path.join(systemDir, name))) {
        tracks.push({
          slug: name,
          title: slugToDisplayName(name.replace(/^track-/, '')),
          language: name.replace(/^track-/, ''),
          difficulty: 'Intermediate',
        });
      }
    });
  } catch {}
  return tracks;
}

/**
 * Get all modules for a track by scanning module-* directories.
 */
export function getTrackModules(systemSlug: string, trackSlug: string): ModuleMeta[] {
  const modules: ModuleMeta[] = [];
  const trackDir = path.join(SYSTEMS_DIR, systemSlug, trackSlug);
  if (!fs.existsSync(trackDir)) return modules;

  try {
    const items = fs.readdirSync(trackDir).filter((name) => name.startsWith('module-')).sort();
    items.forEach((name) => {
      const moduleDir = path.join(trackDir, name);
      if (!isDirectory(moduleDir)) return;
      const lessons = getModuleLessons(systemSlug, trackSlug, name);
      modules.push({
        slug: name,
        title: (() => {
          const raw = name.replace(/^module-\d+-?/, '').replace(/[-_]/g, ' ').trim();
          return raw ? slugToDisplayName(raw) : `Module ${getOrderFromFile(name)}`;
        })(),
        order: getOrderFromFile(name),
        lessons,
      });
    });
  } catch {}
  return modules;
}

/**
 * Get all lessons for a module by scanning for .md files (excluding quiz.md, challenge.md).
 */
export function getModuleLessons(systemSlug: string, trackSlug: string, moduleSlug: string): LessonMeta[] {
  const lessons: LessonMeta[] = [];
  const moduleDir = path.join(SYSTEMS_DIR, systemSlug, trackSlug, moduleSlug);
  if (!fs.existsSync(moduleDir)) return lessons;

  try {
    const files = fs.readdirSync(moduleDir)
      .filter((f) => f.endsWith('.md') && !f.startsWith('.') && f !== 'quiz.md' && f !== 'challenge.md')
      .sort();
    files.forEach((filename) => {
      try {
        const fullPath = path.join(moduleDir, filename);
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(raw);
        const slug = fileToSlug(filename);
        lessons.push({
          slug,
          title: data.title || slugToDisplayName(slug),
          order: getOrderFromFile(filename, data.order),
          description: data.description || content.slice(0, 200).replace(/#+\s+/g, '').trim() + '...',
          content,
          frontmatter: data,
          track: trackSlug,
          module: moduleSlug,
          pathSegments: [trackSlug, moduleSlug, slug],
          estimatedTime: data.estimated_time,
          difficulty: data.difficulty,
          knowledgeRefs: data.knowledge_refs,
          prerequisites: data.prerequisites,
        });
      } catch {}
    });
    lessons.sort((a, b) => a.order - b.order);
  } catch {}
  return lessons;
}

/**
 * Get all lessons across all tracks/modules (flattened for sidebar nav).
 */
export function getAllSystemLessons(systemSlug: string): LessonMeta[] {
  const all: LessonMeta[] = [];
  const tracks = getSystemTracks(systemSlug);
  for (const track of tracks) {
    const modules = getTrackModules(systemSlug, track.slug);
    for (const mod of modules) {
      all.push(...mod.lessons);
    }
  }
  return all.sort((a, b) => a.order - b.order);
}

/**
 * Get a lesson by its path segments (track-slug/module-slug/lesson-slug).
 */
export function getLessonByPath(systemSlug: string, pathSegments: string[]): LessonMeta | null {
  const all = getAllSystemLessons(systemSlug);
  const pathStr = pathSegments.join('/');
  return all.find((l) => l.pathSegments.join('/') === pathStr) || null;
}

/**
 * Get lesson by its slug (search all tracks/modules).
 */
export function getLessonBySlug(systemSlug: string, lessonSlug: string): LessonMeta | null {
  const all = getAllSystemLessons(systemSlug);
  return all.find((l) => l.slug === lessonSlug) || null;
}

/**
 * Build a tree of tracks → modules → lessons for a system.
 * Used by the system detail page to render hierarchy navigation.
 */
export function getSystemTrackTree(systemSlug: string): SystemTrackTree[] {
  const tracks = getSystemTracks(systemSlug);
  return tracks.map((track) => {
    const modules = getTrackModules(systemSlug, track.slug);
    const moduleNodes: TrackModuleNode[] = modules.map((mod) => ({
      module: mod,
      lessons: mod.lessons,
    }));
    const lessonCount = moduleNodes.reduce((sum, m) => sum + m.lessons.length, 0);
    return { track, modules: moduleNodes, lessonCount };
  });
}

/**
 * Check if a system has tracks (new structure).
 */
export function systemHasTracks(systemSlug: string): boolean {
  return getSystemTracks(systemSlug).length > 0;
}

/**
 * Get lesson navigation (prev/next) across all tracks.
 */
export function getLessonNavigation(systemSlug: string, lessonSlug: string): { prev: LessonMeta | null; next: LessonMeta | null } {
  const all = getAllSystemLessons(systemSlug);
  const idx = all.findIndex((l) => l.slug === lessonSlug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

// ─── System Reading (OLD: folder_tag structure — backward compatible) ──

export function getSystemFolderTags(systemSlug: string): SystemFolderTag[] {
  const tags: SystemFolderTag[] = [];
  try {
    const systemDir = path.join(SYSTEMS_DIR, systemSlug);
    if (!fs.existsSync(systemDir)) return tags;
    const items = fs.readdirSync(systemDir).filter((name) => !name.startsWith('.'));
    const folderTags = items.filter((name) => isDirectory(path.join(systemDir, name)) && !name.startsWith('track-')).sort();
    folderTags.forEach((tag) => {
      const tagDir = path.join(systemDir, tag);
      const children = readFolderEntries(tagDir, tag);
      tags.push({ tag, displayName: slugToDisplayName(tag), children });
    });
  } catch {}
  return tags;
}

function readFolderEntries(dir: string, tag: string): SystemFolderEntry[] {
  const entries: SystemFolderEntry[] = [];
  if (!fs.existsSync(dir)) return entries;
  try {
    const items = fs.readdirSync(dir).filter((name) => !name.startsWith('.'));
    const folders: { name: string; order: number }[] = [];
    const mdFiles: { name: string; order: number; data: Record<string, any> }[] = [];
    items.forEach((name) => {
      const fullPath = path.join(dir, name);
      if (isDirectory(fullPath)) {
        folders.push({ name, order: 999 });
      } else if (name.endsWith('.md')) {
        try {
          const raw = fs.readFileSync(fullPath, 'utf-8');
          const { data } = matter(raw);
          mdFiles.push({ name, order: getOrderFromFile(name, data.order), data });
        } catch { mdFiles.push({ name, order: getOrderFromFile(name), data: {} }); }
      }
    });
    folders.sort((a, b) => a.name.localeCompare(b.name));
    mdFiles.sort((a, b) => a.order - b.order);
    folders.forEach((f) => entries.push({ type: 'folder', slug: f.name, title: slugToDisplayName(f.name), order: f.order }));
    mdFiles.forEach((f) => {
      const slug = fileToSlug(f.name);
      entries.push({ type: 'file', slug, title: f.data.title || slugToDisplayName(slug), order: f.order });
    });
  } catch {}
  return entries;
}

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

export function getSystemFileAtPath(systemSlug: string, filePathSegments: string[]): SystemFileEntry | null {
  // First try lesson path
  const lesson = getLessonByPath(systemSlug, filePathSegments);
  if (lesson) {
    return {
      slug: lesson.slug,
      title: lesson.title,
      order: lesson.order,
      description: lesson.description,
      content: lesson.content,
      frontmatter: lesson.frontmatter,
      knowledgeRefs: lesson.knowledgeRefs,
      estimatedTime: lesson.estimatedTime,
      difficulty: lesson.difficulty,
      trackSlug: lesson.track,
      moduleSlug: lesson.module,
    };
  }

  // Fallback to old folder_tag structure
  try {
    if (filePathSegments.length === 0) return null;
    const dirSegments = filePathSegments.slice(0, -1);
    const fileSlug = filePathSegments[filePathSegments.length - 1];
    const dirPath = path.join(SYSTEMS_DIR, systemSlug, ...dirSegments);
    if (!fs.existsSync(dirPath)) return null;
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md'));
    const matchingFile = files.find((f) => fileToSlug(f) === fileSlug);
    if (!matchingFile) return null;
    const raw = fs.readFileSync(path.join(dirPath, matchingFile), 'utf-8');
    const { data, content } = matter(raw);
    return {
      slug: fileToSlug(matchingFile),
      title: data.title || slugToDisplayName(fileToSlug(matchingFile)),
      order: getOrderFromFile(matchingFile, data.order),
      description: data.description || content.slice(0, 200).replace(/#+\s+/g, '').trim() + '...',
      content,
      frontmatter: data,
    };
  } catch { return null; }
}

export function systemHasDirectory(systemSlug: string, pathSegments: string[]): boolean {
  try {
    const dirPath = path.join(SYSTEMS_DIR, systemSlug, ...pathSegments);
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch { return false; }
}

export function systemHasFile(systemSlug: string, pathSegments: string[]): boolean {
  // Check lessons first
  if (getLessonByPath(systemSlug, pathSegments)) return true;
  // Fallback to old structure
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

export function getSystemDirectoryContents(systemSlug: string, pathSegments: string[]): SystemFolderEntry[] {
  try {
    const dirPath = path.join(SYSTEMS_DIR, systemSlug, ...pathSegments);
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) return [];
    const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
    return readFolderEntries(dirPath, lastSegment);
  } catch { return []; }
}

export function getAllSystemFiles(systemSlug: string): Array<{ slug: string; title: string; order: number; pathSegments: string[] }> {
  const result: Array<{ slug: string; title: string; order: number; pathSegments: string[] }> = [];
  const seenSlugs = new Set<string>();

  // Add lessons from tracks
  const lessons = getAllSystemLessons(systemSlug);
  for (const lesson of lessons) {
    seenSlugs.add(lesson.slug);
    result.push({ slug: lesson.slug, title: lesson.title, order: lesson.order, pathSegments: lesson.pathSegments });
  }

  // Add files from old folder_tag structure (skip track-* directories to avoid duplicates)
  function walk(dir: string, pathSegments: string[], isTopLevel?: boolean) {
    if (!fs.existsSync(dir)) return;
    try {
      const items = fs.readdirSync(dir).filter((name) => !name.startsWith('.'));
      items.forEach((name) => {
        const fullPath = path.join(dir, name);
        if (isDirectory(fullPath)) {
          // Skip track-* directories at the top level (they're handled by getAllSystemLessons)
          if (isTopLevel && name.startsWith('track-')) return;
          walk(fullPath, [...pathSegments, name]);
        } else if (name.endsWith('.md') && name !== 'index.md') {
          try {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const { data } = matter(raw);
            const slug = fileToSlug(name);
            // Skip if this slug was already added by the lesson reader
            if (seenSlugs.has(slug)) return;
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

  walk(path.join(SYSTEMS_DIR, systemSlug), [], true);
  result.sort((a, b) => a.order - b.order);
  return result;
}

export function getSystemFlatFiles(systemSlug: string): SystemFileEntry[] {
  const entries: SystemFileEntry[] = [];
  function walk(dir: string, isTopLevel?: boolean) {
    if (!fs.existsSync(dir)) return;
    try {
      const items = fs.readdirSync(dir).filter((name) => !name.startsWith('.'));
      items.forEach((name) => {
        if (isTopLevel && name.startsWith('track-') && isDirectory(path.join(dir, name))) return; // Skip track dirs
        const fullPath = path.join(dir, name);
        if (isDirectory(fullPath)) {
          walk(fullPath);
        } else if (name.endsWith('.md') && name !== 'index.md') {
          try {
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const { data, content } = matter(raw);
            entries.push({
              slug: fileToSlug(name),
              title: data.title || slugToDisplayName(fileToSlug(name)),
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
  walk(path.join(SYSTEMS_DIR, systemSlug), true);
  entries.sort((a, b) => a.order - b.order);
  return entries;
}

export function getSystemFile(systemSlug: string, fileSlug: string): SystemFileEntry | null {
  // Try lesson first
  const lesson = getLessonBySlug(systemSlug, fileSlug);
  if (lesson) {
    return { slug: lesson.slug, title: lesson.title, order: lesson.order, description: lesson.description, content: lesson.content, frontmatter: lesson.frontmatter };
  }
  return getSystemFlatFiles(systemSlug).find((f) => f.slug === fileSlug) || null;
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
    let tracks: TrackMeta[] | undefined;

    if (fs.existsSync(indexMdPath)) {
      try {
        const { data } = matter(fs.readFileSync(indexMdPath, 'utf-8'));
        title = data.title || title;
        description = data.description || '';
        difficulty = data.difficulty || difficulty;
        tags = data.tags || [];
        order = data.order ?? order;
        if (data.tracks) tracks = data.tracks;
      } catch {}
    }

    return {
      slug, title, description, difficulty, tags, order,
      hasTemplate: false,
      hasSpecification: false,
      tracks,
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

// ─── Search / Tag Data ──────────────────────────────────────────────

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
