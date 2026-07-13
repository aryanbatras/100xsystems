/**
 * ## Content Image Sync Script
 *
 * Copies images from the `content/` directory to `public/` preserving the
 * directory structure. This allows Markdown/MDX files in `content/` to
 * reference images with absolute paths (e.g., `/systems/cloudy-code/...`)
 * that Next.js serves from `public/`.
 *
 * Run: `node scripts/copy-content-images.mjs`
 * Add to package.json scripts: "prebuild": "node scripts/copy-content-images.mjs"
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CURRICULUM_DIR = path.join(ROOT, '..', 'curriculum');
const PUBLIC_DIR = path.join(ROOT, 'public');

// Image file extensions to copy
const IMAGE_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif', '.ico', '.bmp',
]);

/**
 * Recursively copy image files from source to target, preserving structure.
 */
function copyImagesRecursive(sourceDir, targetDir, relativePath = '') {
  if (!fs.existsSync(sourceDir)) return;

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const relative = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Skip chapters directory MDX files — only recurse for images
      copyImagesRecursive(sourcePath, targetDir, relative);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        const targetPath = path.join(targetDir, relative);
        const targetDirPath = path.dirname(targetPath);

        if (!fs.existsSync(targetDirPath)) {
          fs.mkdirSync(targetDirPath, { recursive: true });
        }

        fs.copyFileSync(sourcePath, targetPath);
        console.log(`  ✓ ${relative}`);
      }
    }
  }
}

// ─── Main ────────────────────────────────────────────────────────────

console.log('\n📸 Syncing content images to public/...\n');

if (!fs.existsSync(CURRICULUM_DIR)) {
  console.log('  No curriculum directory found. Skipping.\n');
  process.exit(0);
}

copyImagesRecursive(CURRICULUM_DIR, PUBLIC_DIR);

console.log('\n✅ Content images synced successfully!\n');
