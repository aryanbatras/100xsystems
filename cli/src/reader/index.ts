import fs from 'fs';
import path from 'path';

// ─── Paths ──────────────────────────────────────────────────────────

/**
 * Find the repo root by checking:
 *   1. CURRICULUM_PATH env var (overrides everything — for running outside repo)
 *   2. Walk up from cwd looking for curriculum/ directory
 *   3. Fallback: check if parent of cwd has curriculum/
 */
function findRootDir(): string {
  // Allow override via env var so users can scaffold projects from anywhere
  const envPath = process.env.CURRICULUM_PATH;
  if (envPath) {
    const resolved = path.resolve(envPath);
    if (fs.existsSync(resolved)) {
      return resolved;
    }
  }

  let dir = path.resolve(process.cwd());
  for (let i = 0; i < 20; i++) {
    if (fs.existsSync(path.join(dir, 'curriculum'))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break; // hit filesystem root
    dir = parent;
  }
  // Fallback: maybe we're in cli/ and curriculum is a sibling
  const cliParent = path.resolve(process.cwd(), '..');
  if (fs.existsSync(path.join(cliParent, 'curriculum'))) {
    return cliParent;
  }
  return process.cwd();
}

let _rootDir: string | null = null;
function getRootDir(): string {
  if (!_rootDir) _rootDir = findRootDir();
  return _rootDir;
}

// Export findRootDir so that validate.ts (and other consumers) can resolve the
// curriculum path without importing from a non-public API.
export const resolveRootDir = getRootDir;

export const CURRICULUM_DIR = () => path.join(getRootDir(), 'curriculum');
export const SYSTEMS_DIR = () => path.join(CURRICULUM_DIR(), 'systems');
export const KNOWLEDGE_BASE_DIR = () => path.join(CURRICULUM_DIR(), 'knowledge-base');
export const SUBMISSIONS_DIR = () => path.join(getRootDir(), 'submissions');

// ─── Helpers ────────────────────────────────────────────────────────

export function isDirectory(dir: string): boolean {
  try { return fs.statSync(dir).isDirectory(); } catch { return false; }
}

export function slugToDisplayName(slug: string): string {
  return slug
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function fileToSlug(filename: string): string {
  const base = filename.replace(/\.md$/, '');
  return base.replace(/^\d+[-_]/, '');
}

export function getOrderFromFile(filename: string, frontmatterOrder?: number): number {
  if (frontmatterOrder !== undefined) return frontmatterOrder;
  const match = filename.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 999;
}

// ─── Consolidated Frontmatter Parser ────────────────────────────────
// Single parser that handles: simple values, arrays of strings,
// arrays of objects with nested properties, and nested objects.
// Used by all readers instead of 5 separate parsers.

export function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const yamlStr = match[1];
  const content = match[2];
  return { data: parseYamlBlock(yamlStr), content };
}

function parseYamlBlock(yaml: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = yaml.split('\n');

  let currentKey = '';
  let currentArray: any[] = [];
  let inArray = false;
  let inObject = false;
  let objectBuf: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.search(/\S/);
    const isTopLevel = indent === 0;

    if (isTopLevel && currentKey && (inArray || inObject)) {
      if (inObject && objectBuf.length > 0) {
        result[currentKey] = parseYamlBlock(objectBuf.join('\n'));
        objectBuf = [];
        inObject = false;
      }
      if (inArray && currentArray.length > 0) {
        result[currentKey] = currentArray;
        currentArray = [];
        inArray = false;
      }
      currentKey = '';
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('-')) {
      if (!inArray) {
        for (let j = i - 1; j >= 0; j--) {
          const prevLine = lines[j];
          if (prevLine.search(/\S/) === 0) {
            const ci = prevLine.indexOf(':');
            if (ci !== -1 && prevLine.slice(ci + 1).trim() === '') {
              currentKey = prevLine.slice(0, ci).trim();
              break;
            }
          }
        }
        inArray = true;
      }

      const itemStr = trimmed.replace(/^- /, '').trim();

      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      const nextIndent = nextLine ? nextLine.search(/\S/) : 0;

      if (nextLine && nextIndent > indent && itemStr.includes(':')) {
        const subLines: string[] = [itemStr];
        let j = i + 1;
        while (j < lines.length) {
          const sl = lines[j];
          if (sl.search(/\S/) <= indent) break;
          subLines.push(sl.slice(indent + 2));
          j++;
        }
        const obj = parseYamlBlock(subLines.join('\n'));
        currentArray.push(obj);
        i = j - 1;
      } else {
        currentArray.push(parseValue(itemStr));
      }
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) {
      if (inObject && currentKey) {
        objectBuf.push(line);
      }
      continue;
    }

    const key = line.slice(colonIdx).includes(':') ?
      line.slice(0, colonIdx).trim() : trimmed.slice(0, trimmed.indexOf(':')).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      result[key] = value.slice(1, -1).split(',').map((s) => parseValue(s.trim()));
      continue;
    }

    if (value === '') {
      currentKey = key;
      inObject = true;
      objectBuf = [];
      continue;
    }

    if (inObject && currentKey) {
      objectBuf.push(line);
    } else {
      result[key] = parseValue(value);
    }
  }

  if (inObject && currentKey && objectBuf.length > 0) {
    result[currentKey] = parseYamlBlock(objectBuf.join('\n'));
  }
  if (inArray && currentKey && currentArray.length > 0) {
    result[currentKey] = currentArray;
  }

  return result;
}

function parseValue(value: string): any {
  const t = value.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  if (t === 'true') return true;
  if (t === 'false') return false;
  const num = Number(t);
  if (!isNaN(num) && t !== '') return num;
  return t;
}

// ─── Markdown Reading ───────────────────────────────────────────────

export interface ParsedMd {
  filename: string;
  content: string;
  data: Record<string, any>;
}

export function readMdFiles(dir: string): ParsedMd[] {
  const results: ParsedMd[] = [];
  if (!fs.existsSync(dir)) return results;

  const files = fs.readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
      const { data, content } = parseFrontmatter(raw);
      results.push({ filename, content, data });
    } catch {}
  }

  return results;
}

// ─── Types ──────────────────────────────────────────────────────────

export interface SystemInfo {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  order: number;
}

export interface FolderEntry {
  type: 'file' | 'folder';
  slug: string;
  title: string;
  order: number;
}

export interface FolderTag {
  tag: string;
  displayName: string;
  children: FolderEntry[];
}

export interface QuizQuestion {
  question: string;
  type: 'multiple-choice' | 'true-false';
  choices?: { label: string; value: string }[];
  answer: string | boolean;
}

export interface QuizData {
  title: string;
  order: number;
  questions: QuizQuestion[];
}

export interface SpecCheck {
  type: string;
  path?: string;
  file?: string;
  name?: string;
  command?: string;
  dockerfile?: string;
  url?: string;
  method?: string;
  'expect-status'?: number;
}

export interface SpecData {
  title: string;
  version: string;
  checks: SpecCheck[];
}

export interface ResourceLink {
  title: string;
  url: string;
  type: 'article' | 'video' | 'paper' | 'blog' | 'documentation' | 'tool';
  description?: string;
}

export interface ResourceCategory {
  name: string;
  items: ResourceLink[];
}

export interface SystemResources {
  system: string;
  categories: ResourceCategory[];
}

export interface ProgressEntry {
  status: 'not-started' | 'in-progress' | 'completed';
  startedAt?: string;
  completedAt?: string;
  projectDir?: string;
  language?: string;
  currentLesson?: string;  // slug of the lesson the user is currently working on
}

export interface ProgressData {
  systems: Record<string, ProgressEntry>;
}

export interface SubmissionMetadata {
  system: string;
  systemTitle: string;
  author: string;
  language: string;
  repositoryUrl: string;
  difficulty: string;
  tags: string[];
  submittedAt: string;
  prUrl?: string;
  status: 'pending' | 'in-review' | 'changes-requested' | 'accepted' | 'rejected';
  reviewers?: string[];
}
