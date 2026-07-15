import fs from 'fs';
import path from 'path';

const TEMPLATE_DIR = new URL('../templates', import.meta.url).pathname;

export interface ScaffoldOptions {
  targetDir: string;
  systemSlug: string;
  systemTitle: string;
  language?: 'typescript' | 'java';
  author?: string;
  specification?: string;
}

/**
 * Scaffold a new implementation project for a system.
 * Creates a complete review package structure:
 *
 *   .100x.json           — Project config
 *   README.md            — Project overview
 *   design/
 *     decisions.md       — Engineering Decision Log
 *     architecture.md    — Architecture explanation
 *     tradeoffs.md       — Trade-offs analysis
 *   specification/
 *     SPECIFICATION.md   — System specification (from curriculum)
 *   verification/
 *     checklist.md       — Self-assessment checklist
 *   src/                 — Code (from language template)
 */
export function scaffoldProject(options: ScaffoldOptions): string[] {
  const { targetDir, systemSlug, systemTitle, language, author } = options;
  const created: string[] = [];

  // Create target directory
  fs.mkdirSync(targetDir, { recursive: true });

  // ─── .100x.json ─────────────────────────────────────────────────

  const config = {
    system: systemSlug,
    systemTitle,
    language: language || 'typescript',
    author: author || '',
    version: '0.1.0',
    createdAt: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(targetDir, '.100x.json'),
    JSON.stringify(config, null, 2) + '\n',
  );
  created.push('.100x.json');

  // ─── Review Package Templates ───────────────────────────────────

  const reviewTemplates = [
    { src: 'review-package/README.md', dest: 'README.md' },
    { src: 'review-package/design/decisions.md', dest: 'design/decisions.md' },
    { src: 'review-package/design/architecture.md', dest: 'design/architecture.md' },
    { src: 'review-package/design/tradeoffs.md', dest: 'design/tradeoffs.md' },
    { src: 'review-package/verification/checklist.md', dest: 'verification/checklist.md' },
  ];

  for (const tpl of reviewTemplates) {
    const tplPath = path.join(TEMPLATE_DIR, tpl.src);
    if (!fs.existsSync(tplPath)) continue;

    const destPath = path.join(targetDir, tpl.dest);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    let content = fs.readFileSync(tplPath, 'utf-8');
    // Replace template variables
    content = content
      .replace(/\{\{systemTitle\}\}/g, systemTitle)
      .replace(/\{\{systemSlug\}\}/g, systemSlug)
      .replace(/\{\{language\}\}/g, language || 'typescript')
      .replace(/\{\{author\}\}/g, author || 'your-github-username')
      .replace(/\{\{repositoryUrl\}\}/g, '');

    fs.writeFileSync(destPath, content);
    created.push(tpl.dest);
  }

  // ─── Specification ──────────────────────────────────────────────

  if (options.specification) {
    const specDir = path.join(targetDir, 'specification');
    fs.mkdirSync(specDir, { recursive: true });
    fs.writeFileSync(path.join(specDir, 'SPECIFICATION.md'), options.specification);
    created.push('specification/SPECIFICATION.md');
  }

  // ─── Language Templates ─────────────────────────────────────────

  const lang = language || 'typescript';
  copyLanguageTemplate(lang, targetDir, created);

  return created;
}

function copyLanguageTemplate(language: string, targetDir: string, created: string[]) {
  const langTemplateDir = path.join(TEMPLATE_DIR, language);
  if (!fs.existsSync(langTemplateDir)) return;

  function walk(dir: string, relativePath: string) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relPath = relativePath ? `${relativePath}/${item}` : item;
      const targetPath = path.join(targetDir, relPath);

      if (fs.statSync(fullPath).isDirectory()) {
        fs.mkdirSync(targetPath, { recursive: true });
        created.push(relPath + '/');
        walk(fullPath, relPath);
      } else {
        const content = fs.readFileSync(fullPath, 'utf-8');
        fs.writeFileSync(targetPath, content);
        created.push(relPath);
      }
    }
  }

  walk(langTemplateDir, '');
}

/**
 * Read the .100x.json config from a project directory.
 */
export function readProjectConfig(projectDir: string): Record<string, any> | null {
  try {
    const configPath = path.join(projectDir, '.100x.json');
    if (!fs.existsSync(configPath)) return null;
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch { return null; }
}
