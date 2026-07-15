import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// ─── Metadata ───────────────────────────────────────────────────────

interface Props {
  params: Promise<{ certId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certId } = await params;
  const cert = getCertificateMetadata(certId);

  if (!cert) {
    return { title: 'Certificate Not Found' };
  }

  return {
    title: `Certificate — ${cert.systemTitle} — 100xSystems`,
    description: `Verified certificate for ${cert.author} completing ${cert.systemTitle}.`,
    openGraph: {
      title: `${cert.systemTitle} — 100xSystems Certificate`,
      description: `This certifies that ${cert.author} has completed ${cert.systemTitle}.`,
      images: cert.certificateUrl ? [{ url: cert.certificateUrl }] : [],
    },
  };
}

// ─── Page ───────────────────────────────────────────────────────────

export default async function CertificatePage({ params }: Props) {
  const { certId } = await params;
  const cert = getCertificateMetadata(certId);

  if (!cert) {
    notFound();
  }

  const scoreColor =
    cert.score >= 80 ? 'text-emerald-600' :
    cert.score >= 50 ? 'text-amber-600' :
    'text-red-600';

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Verification Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Verified Certificate
          </span>
        </div>

        {/* Certificate Card */}
        <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          {/* Decorative header */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <div className="px-8 py-10 sm:px-12 sm:py-14">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <span className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                  100XSYSTEMS
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
              Certificate of Completion
            </h1>
            <p className="text-center text-neutral-500 dark:text-neutral-400 mb-10">
              This certifies that the following engineer has successfully completed the system.
            </p>

            {/* Author */}
            <div className="text-center mb-8">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                Awarded to
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white">
                {cert.author}
              </h2>
              {cert.authorUrl && (
                <a
                  href={cert.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  {cert.author}
                </a>
              )}
            </div>

            {/* System */}
            <div className="text-center mb-8">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                Has completed
              </p>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {cert.systemTitle}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                {cert.difficulty} · {cert.language}
              </p>
            </div>

            {/* Score */}
            <div className="flex justify-center mb-8">
              <div className={`text-center px-6 py-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700`}>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Review Score</p>
                <p className={`text-3xl font-bold ${scoreColor}`}>
                  {cert.score}/100
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="text-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                  Completed
                </p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {new Date(cert.completedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                  Certificate ID
                </p>
                <p className="text-sm font-mono text-neutral-900 dark:text-white">
                  {cert.id}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                  Language
                </p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {cert.language}
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                  Difficulty
                </p>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {cert.difficulty}
                </p>
              </div>
            </div>

            {/* Tags */}
            {cert.tags && cert.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {cert.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors font-medium text-sm"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Certificate
                </a>
              )}
              <Link
                href={`/systems/${cert.systemSlug}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-medium text-sm text-neutral-700 dark:text-neutral-300"
              >
                View System
              </Link>
            </div>
          </div>
        </div>

        {/* Verification note */}
        <p className="text-center text-xs text-neutral-400 dark:text-neutral-600 mt-6">
          This certificate was verified on {new Date().toLocaleDateString()}.
          The authenticity can be verified at{' '}
          <span className="font-mono">100xsystems.dev/verify/{cert.id}</span>.
        </p>
      </div>
    </main>
  );
}

// ─── Certificate Data ───────────────────────────────────────────────

interface CertificateData {
  id: string;
  author: string;
  authorUrl?: string;
  systemSlug: string;
  systemTitle: string;
  difficulty: string;
  language: string;
  score: number;
  completedAt: string;
  certificateUrl?: string;
  tags: string[];
  prUrl?: string;
}

function getCertificateMetadata(certId: string): CertificateData | null {
  // In development, return mock data to preview the page
  if (process.env.NODE_ENV === 'development') {
    return getMockCertificate(certId);
  }

  // In production, read from the submissions repo's docs/certificates/ directory
  try {
    const certDir = path.join(process.cwd(), '..', 'submissions', 'docs', 'certificates', certId);
    const metaPath = path.join(certDir, 'metadata.json');
    if (!fs.existsSync(metaPath)) return null;
    return JSON.parse(fs.readFileSync(metaPath, 'utf-8')) as CertificateData;
  } catch {
    return null;
  }
}

function getMockCertificate(certId: string): CertificateData {
  const mockCerts: Record<string, CertificateData> = {
    'demo-001': {
      id: 'demo-001',
      author: 'Aryan Batra',
      authorUrl: 'https://github.com/aryanbatras',
      systemSlug: 'claude-code',
      systemTitle: 'Claude Code — TypeScript',
      difficulty: 'Intermediate',
      language: 'TypeScript',
      score: 92,
      completedAt: '2026-07-01T00:00:00.000Z',
      tags: ['CLI', 'AI', 'Tool Building'],
      prUrl: 'https://github.com/100xsystems/submissions/pull/1',
    },
    'demo-002': {
      id: 'demo-002',
      author: 'Jane Smith',
      authorUrl: 'https://github.com/janesmith',
      systemSlug: 'microservices',
      systemTitle: 'Microservices — Spring Boot',
      difficulty: 'Advanced',
      language: 'Java',
      score: 85,
      completedAt: '2026-06-15T00:00:00.000Z',
      tags: ['Distributed Systems', 'Spring Boot', 'Docker'],
      prUrl: 'https://github.com/100xsystems/submissions/pull/2',
    },
  };

  return mockCerts[certId] || {
    id: certId,
    author: 'Unknown',
    systemSlug: 'unknown',
    systemTitle: 'Unknown System',
    difficulty: 'Intermediate',
    language: 'TypeScript',
    score: 0,
    completedAt: new Date().toISOString(),
    tags: [],
  };
}
