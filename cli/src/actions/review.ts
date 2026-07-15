/**
 * ## Review Action
 *
 * AI-Powered Review: evaluates a user's implementation against
 * lesson/spec review criteria using an LLM.
 *
 * Collects the review package (design docs, source code, spec),
 * builds a prompt from the lesson's review_criteria frontmatter,
 * and returns structured feedback per category.
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import { readProjectConfig } from '../scaffold/index.js';
import { getAllSystemLessons, getLessonReviewCriteria } from '../reader/lesson-reader.js';
import type { ReviewCriteria } from '../reader/lesson-reader.js';

// ─── Types ──────────────────────────────────────────────────────────

export interface ReviewResult {
  category: string;
  score: number;       // 0–100
  feedback: string;     // Detailed qualitative feedback
  strengths: string[];
  weaknesses: string[];
  questions: string[];  // The original criteria questions answered
}

export interface ReviewSummary {
  overallScore: number;
  totalStrengths: number;
  totalWeaknesses: number;
  results: ReviewResult[];
  reviewedAt: string;
  systemTitle: string;
  projectDir: string;
}

// ─── Public API ─────────────────────────────────────────────────────

/**
 * Run an AI-powered review of the project.
 *
 * @param projectDir  — Absolute path to the project
 * @param systemSlug  — e.g. "claude-code"
 * @param apiKey      — OpenAI (or compatible) API key. Falls back to OPENAI_API_KEY env var.
 * @param apiBaseUrl  — Optional custom API base URL (for local models / proxies).
 * @param model       — Model name (default: gpt-4o-mini for cost-efficiency).
 * @param lessonSlug  — Optional: only run against a specific lesson's criteria.
 */
export async function runReview(
  projectDir: string,
  systemSlug: string,
  apiKey?: string,
  apiBaseUrl?: string,
  model?: string,
  lessonSlug?: string,
): Promise<ReviewSummary> {
  const resolvedKey = apiKey || process.env.OPENAI_API_KEY;
  if (!resolvedKey) {
    throw new Error(
      'No API key found. Set OPENAI_API_KEY in your environment or pass --api-key.\n' +
      '  export OPENAI_API_KEY=sk-...\n' +
      '  # Or use a local model: 100x review --api-base http://localhost:1234/v1 --model local-model'
    );
  }

  // 1. Collect review package (design docs + source)
  const pkg = collectReviewPackage(projectDir);

  // 2. Read criteria from lessons
  let criteria: ReviewCriteria[] = [];
  const lessons = getAllSystemLessons(systemSlug);
  if (lessonSlug) {
    const lesson = lessons.find((l) => l.slug === lessonSlug);
    if (lesson) criteria = getLessonReviewCriteria(lesson);
  } else {
    // Collect criteria from all lessons
    for (const lesson of lessons) {
      criteria.push(...getLessonReviewCriteria(lesson));
    }
  }

  // Deduplicate by category name
  const seen = new Set<string>();
  criteria = criteria.filter((c) => {
    if (seen.has(c.category)) return false;
    seen.add(c.category);
    return true;
  });

  if (criteria.length === 0) {
    // Fallback to sensible defaults
    criteria = [
      { category: 'Architecture', questions: ['Is the architecture well-documented and clearly described?'] },
      { category: 'Design Decisions', questions: ['Are design decisions justified with alternatives considered?'] },
      { category: 'Code Quality', questions: ['Is the implementation clean and well-structured?'] },
      { category: 'Documentation', questions: ['Is the project well-documented for other engineers?'] },
    ];
  }

  // 3. Build the prompt
  const prompt = buildReviewPrompt(pkg, criteria);

  // 4. Call LLM
  const resolvedModel = model || 'gpt-4o-mini';
  const resolvedBase = apiBaseUrl || 'https://api.openai.com/v1';
  const raw = await callLLM(prompt, resolvedKey, resolvedBase, resolvedModel);

  // 5. Parse structured response
  const results = parseLLMResponse(raw, criteria);

  // 6. Compute summary
  const config = readProjectConfig(projectDir);
  const overallScore = Math.round(
    results.reduce((sum, r) => sum + r.score, 0) / Math.max(results.length, 1)
  );

  return {
    overallScore,
    totalStrengths: results.reduce((sum, r) => sum + r.strengths.length, 0),
    totalWeaknesses: results.reduce((sum, r) => sum + r.weaknesses.length, 0),
    results,
    reviewedAt: new Date().toISOString(),
    systemTitle: config?.systemTitle || systemSlug,
    projectDir,
  };
}

// ─── Review Package Collection ──────────────────────────────────────

interface ReviewPackage {
  readme: string;
  decisions: string;
  architecture: string;
  tradeoffs: string;
  checklist: string;
  specification: string;
  sourceFiles: Array<{ path: string; content: string }>;
}

function collectReviewPackage(projectDir: string): ReviewPackage {
  const read = (filePath: string): string => {
    try { return fs.readFileSync(path.join(projectDir, filePath), 'utf-8'); }
    catch { return ''; }
  };

  // Collect source files (up to 10, max 200KB total)
  const sourceFiles: Array<{ path: string; content: string }> = [];
  let totalBytes = 0;
  const maxBytes = 200_000;

  function walkSourceDir(dir: string, relativePrefix: string) {
    if (totalBytes >= maxBytes) return;
    try {
      const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
      for (const entry of entries) {
        if (totalBytes >= maxBytes) break;
        const relPath = relativePrefix ? `${relativePrefix}/${entry.name}` : entry.name;
        const fullPath = path.join(projectDir, dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules' && entry.name !== 'dist') {
          walkSourceDir(path.join(dir, entry.name), relPath);
        } else if (entry.isFile() && /\.(ts|js|tsx|jsx|java|py|rs|go|yaml|yml|json|tf|dockerfile)$/i.test(entry.name)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf-8');
            totalBytes += content.length;
            if (sourceFiles.length < 10) {
              sourceFiles.push({ path: relPath, content: content.slice(0, 10_000) });
            }
          } catch {}
        }
      }
    } catch {}
  }

  const srcDir = path.join(projectDir, 'src');
  if (fs.existsSync(srcDir)) {
    walkSourceDir('src', '');
  }

  return {
    readme: read('README.md'),
    decisions: read('design/decisions.md'),
    architecture: read('design/architecture.md'),
    tradeoffs: read('design/tradeoffs.md'),
    checklist: read('verification/checklist.md'),
    specification: read('specification/SPECIFICATION.md'),
    sourceFiles,
  };
}

// ─── Prompt Building ────────────────────────────────────────────────

function buildReviewPrompt(pkg: ReviewPackage, criteria: ReviewCriteria[]): string {
  const sections: string[] = [];

  sections.push(`You are a senior software engineer conducting a thorough engineering review of a project submission for 100xSystems.\n`);
  sections.push(`Evaluate the project against the following criteria categories. For each category, assign a score from 0-100 and provide specific, actionable feedback.\n`);
  sections.push(`Be constructive but honest. If something is missing or weak, say so. If something is excellent, highlight it.\n`);

  sections.push(`## Review Criteria`);
  for (const c of criteria) {
    sections.push(`\n### ${c.category}`);
    for (const q of c.questions) {
      sections.push(`- ${q}`);
    }
  }

  sections.push(`\n## Project Documentation`);

  if (pkg.readme) {
    sections.push(`\n### README\n\`\`\`\n${pkg.readme.slice(0, 3000)}\n\`\`\``);
  } else {
    sections.push(`\n### README\n[No README.md found]`);
  }

  if (pkg.architecture) {
    sections.push(`\n### Architecture\n\`\`\`\n${pkg.architecture.slice(0, 3000)}\n\`\`\``);
  }

  if (pkg.decisions) {
    sections.push(`\n### Design Decisions\n\`\`\`\n${pkg.decisions.slice(0, 3000)}\n\`\`\``);
  }

  if (pkg.tradeoffs) {
    sections.push(`\n### Trade-offs\n\`\`\`\n${pkg.tradeoffs.slice(0, 3000)}\n\`\`\``);
  }

  if (pkg.specification) {
    sections.push(`\n### Specification\n\`\`\`\n${pkg.specification.slice(0, 3000)}\n\`\`\``);
  }

  if (pkg.checklist) {
    sections.push(`\n### Verification Checklist\n\`\`\`\n${pkg.checklist.slice(0, 2000)}\n\`\`\``);
  }

  if (pkg.sourceFiles.length > 0) {
    sections.push(`\n## Source Code`);
    for (const file of pkg.sourceFiles) {
      sections.push(`\n### ${file.path}\n\`\`\`\n${file.content}\n\`\`\``);
    }
  }

  sections.push(`\n## Response Format`);
  sections.push(`Respond with a JSON object in the following format. Do NOT include any text outside the JSON.`);
  sections.push(`\`\`\`json`);
  sections.push(`{
  "results": [
    {
      "category": "Architecture",
      "score": 85,
      "feedback": "Detailed qualitative analysis...",
      "strengths": ["Clear service boundaries", "Well-documented"],
      "weaknesses": ["No async communication pattern described"]
    }
  ]
}`);
  sections.push(`\`\`\``);

  return sections.join('\n');
}

// ─── LLM Call ───────────────────────────────────────────────────────

async function callLLM(
  prompt: string,
  apiKey: string,
  apiBaseUrl: string,
  model: string
): Promise<string> {
  const url = `${apiBaseUrl.replace(/\/$/, '')}/chat/completions`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are an expert software engineering reviewer. Respond with valid JSON only.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
    signal: AbortSignal.timeout(120_000), // 2 minute timeout
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => 'Unknown error');
    throw new Error(`LLM API error (${response.status}): ${errText}`);
  }

  const data = await response.json() as any;
  return data.choices?.[0]?.message?.content || '';
}

// ─── Response Parsing ───────────────────────────────────────────────

function parseLLMResponse(raw: string, criteria: ReviewCriteria[]): ReviewResult[] {
  // Try to extract JSON from the response (handle markdown fences)
  let jsonStr = raw;
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.results && Array.isArray(parsed.results)) {
      return parsed.results.map((r: any) => ({
        category: r.category || 'General',
        score: typeof r.score === 'number' ? Math.max(0, Math.min(100, r.score)) : 50,
        feedback: r.feedback || 'No feedback provided.',
        strengths: Array.isArray(r.strengths) ? r.strengths : [],
        weaknesses: Array.isArray(r.weaknesses) ? r.weaknesses : [],
        questions: [],
      }));
    }
  } catch {
    // Parsing failed — fall through to default results
  }

  // Fallback: generate default results from criteria
  return criteria.map((c) => ({
    category: c.category,
    score: 0,
    feedback: 'Could not parse AI response. The raw response is shown in the details.',
    strengths: [],
    weaknesses: ['AI response could not be parsed. Check API key and model availability.'],
    questions: c.questions,
  }));
}
