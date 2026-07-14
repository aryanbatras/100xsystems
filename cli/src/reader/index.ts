import fs from 'fs';
import path from 'path';

// ─── Paths ──────────────────────────────────────────────────────────

/**
 * Find the repo root by walking up from the current working directory
 * looking for the curriculum/ directory. This works whether the user
 * runs from inside the repo or from a subdirectory of it.
 */
function findRootDir(): string {
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

export const CURRICULUM_DIR = () => path.join(getRootDir(), 'curriculum');
export const SYSTEMS_DIR = () => path.join(CURRICULUM_DIR(), 'systems');
export const KNOWLEDGE_BASE_DIR = () => path.join(CURRICULUM_DIR(), 'knowledge-base');

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

  // First pass: detect structure and group lines
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

    // If we were in an array or object, check if this line ends it
    if (isTopLevel && currentKey && (inArray || inObject)) {
      // Flush accumulated
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

    // Array item
    if (trimmed.startsWith('- ') || trimmed.startsWith('-')) {
      if (!inArray) {
        // Need to determine the key. It was on a previous line without a value.
        // Find it by looking at the previous top-level key
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

      // Check if item is an inline value or the start of an object
      const nextLine = i + 1 < lines.length ? lines[i + 1] : '';
      const nextIndent = nextLine ? nextLine.search(/\S/) : 0;

      if (nextLine && nextIndent > indent + 2) {
        // This is an object start — collect sub-lines
        const subLines: string[] = [];
        let j = i + 1;
        while (j < lines.length) {
          const sl = lines[j];
          if (sl.search(/\S/) <= indent) break;
          // Remove the extra 2-space indent from array nesting
          subLines.push(sl.slice(2));
          j++;
        }
        const obj = parseYamlBlock(subLines.join('\n'));
        currentArray.push(obj);
        i = j - 1;
      } else {
        // Simple array value
        currentArray.push(parseValue(itemStr));
      }
      continue;
    }

    // Key-value pair at current indentation level
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) {
      // Might be part of a multi-line string or we just skip it
      if (inObject && currentKey) {
        objectBuf.push(line);
      }
      continue;
    }

    const key = line.slice(colonIdx).includes(':') ?
      line.slice(0, colonIdx).trim() : trimmed.slice(0, trimmed.indexOf(':')).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Handle inline arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      result[key] = value.slice(1, -1).split(',').map((s) => parseValue(s.trim()));
      continue;
    }

    if (value === '') {
      // This might start an object or array. Store key and continue.
      currentKey = key;
      inObject = true;
      objectBuf = [];
      continue;
    }

    // If we're in an object context, accumulate
    if (inObject && currentKey) {
      objectBuf.push(line);
    } else {
      result[key] = parseValue(value);
    }
  }

  // Flush any remaining context
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
  // Remove surrounding quotes
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
