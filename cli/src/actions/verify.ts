import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import type { SpecCheck } from '../reader/index.js';

// ─── Spec Check Runner (data-only) ──────────────────────────────────

export interface SpecCheckResult {
  result: 'pass' | 'fail' | 'skip';
  hint: string;
}

export function getFailureHint(check: SpecCheck): string {
  switch (check.type) {
    case 'file-exists': return `Create the file at: ${check.path}`;
    case 'doc-section': return `Add section "${check.name}" to ${check.path}`;
    case 'doc-contains': return `Ensure "${check.name}" is mentioned in ${check.path}`;
    case 'file-count-min': return `Expected at least ${check.name} file(s) in ${check.path}`;
    case 'test-passes': return `Run: ${check.command}`;
    case 'custom-command': return `Run: ${check.command}`;
    default: return '';
  }
}

export async function runSpecCheck(check: SpecCheck, projectDir: string): Promise<SpecCheckResult> {
  switch (check.type) {
    case 'file-exists': {
      if (!check.path) return { result: 'skip', hint: '' };
      const exists = fs.existsSync(path.join(projectDir, check.path));
      return exists
        ? { result: 'pass', hint: '' }
        : { result: 'fail', hint: getFailureHint(check) };
    }
    case 'doc-section': {
      if (!check.path || !check.name) return { result: 'skip', hint: '' };
      const fullPath = path.join(projectDir, check.path);
      if (!fs.existsSync(fullPath)) return { result: 'fail', hint: getFailureHint(check) };
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const pattern = new RegExp(`^##+\\s+${escapeRegex(check.name)}`, 'm');
        return pattern.test(content)
          ? { result: 'pass', hint: '' }
          : { result: 'fail', hint: getFailureHint(check) };
      } catch { return { result: 'fail', hint: '' }; }
    }
    case 'doc-contains': {
      if (!check.path || !check.name) return { result: 'skip', hint: '' };
      const fp = path.join(projectDir, check.path);
      if (!fs.existsSync(fp)) return { result: 'fail', hint: getFailureHint(check) };
      try {
        const lower = fs.readFileSync(fp, 'utf-8').toLowerCase();
        return lower.includes(check.name.toLowerCase())
          ? { result: 'pass', hint: '' }
          : { result: 'fail', hint: getFailureHint(check) };
      } catch { return { result: 'fail', hint: '' }; }
    }
    case 'file-count-min': {
      if (!check.path) return { result: 'skip', hint: '' };
      const fp2 = path.join(projectDir, check.path);
      if (!fs.existsSync(fp2)) return { result: 'fail', hint: getFailureHint(check) };
      try {
        const count = fs.readdirSync(fp2).filter((f) => !f.startsWith('.')).length;
        const min = parseInt(check.name || '1', 10) || 1;
        return count >= min
          ? { result: 'pass', hint: '' }
          : { result: 'fail', hint: getFailureHint(check) };
      } catch { return { result: 'fail', hint: '' }; }
    }
    case 'test-passes':
    case 'custom-command': {
      if (!check.command) return { result: 'skip', hint: '' };
      try {
        execSync(check.command, { cwd: projectDir, stdio: 'pipe', timeout: 60000 });
        return { result: 'pass', hint: '' };
      } catch { return { result: 'fail', hint: getFailureHint(check) }; }
    }
    default:
      return { result: 'skip', hint: '' };
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
