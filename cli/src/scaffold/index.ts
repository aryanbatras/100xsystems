import fs from 'fs';
import path from 'path';

const TEMPLATE_DIR = new URL('../templates', import.meta.url).pathname;

export interface ScaffoldOptions {
  targetDir: string;
  systemSlug: string;
  systemTitle: string;
  language?: 'typescript' | 'java';
  specification?: string;
}

/**
 * Scaffold a new implementation project for a system.
 */
export function scaffoldProject(options: ScaffoldOptions): string[] {
  const { targetDir, systemSlug, systemTitle, language } = options;
  const created: string[] = [];

  // Create target directory
  fs.mkdirSync(targetDir, { recursive: true });

  // Create .100x.json config file
  const config = {
    system: systemSlug,
    systemTitle,
    language: language || 'typescript',
    version: '0.1.0',
    createdAt: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(targetDir, '.100x.json'),
    JSON.stringify(config, null, 2) + '\n',
  );
  created.push('.100x.json');

  // Copy language-specific template files
  if (language && language !== 'typescript') {
    copyTemplateFiles(language, targetDir, created);
  } else {
    // Default to TypeScript
    copyTemplateFiles('typescript', targetDir, created);
  }

  // Copy specification if provided
  if (options.specification) {
    fs.writeFileSync(path.join(targetDir, 'SPECIFICATION.md'), options.specification);
    created.push('SPECIFICATION.md');
  }

  return created;
}

function copyTemplateFiles(language: string, targetDir: string, created: string[]) {
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
        // Skip package.json — we'll generate our own
        if (item === 'package.json' || item === 'pom.xml') {
          fs.writeFileSync(targetPath, content);
          created.push(relPath);
          return;
        }
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
