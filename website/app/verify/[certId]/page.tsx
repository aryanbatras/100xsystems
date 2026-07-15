import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DownloadButton } from './DownloadButton';

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

  const completedDate = new Date(cert.completedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:px-8 lg:px-10">
        {/* Certificate */}
        <div id="certificate-content" className="border-2 border-gray-200 px-10 py-14 sm:px-14 sm:py-16">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <img
              src="/assets/cubix/base/cubix-brand-logo.png"
              alt="Cubix"
              className="h-8 w-auto"
            />
            <span className="text-lg font-bold tracking-[0.15em] text-gray-900 uppercase">
              100X SYSTEMS
            </span>
          </div>

          {/* Title */}
          <h1 className="text-center text-2xl font-light text-gray-800 mb-1 tracking-wide">
            Certificate of Completion
          </h1>

          <div className="w-16 h-px bg-gray-300 mx-auto my-6" />

          {/* Awarded To */}
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.15em] text-gray-500 mb-3">
            Awarded to
          </p>
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">
            {cert.author}
          </h2>

          {/* GitHub Link */}
          {cert.authorUrl && (
            <p className="text-center text-xs text-gray-500 mb-8">
              github.com/{cert.authorUrl.replace('https://github.com/', '')}
            </p>
          )}

          {/* Has Completed */}
          <p className="text-center text-xs text-gray-500 mb-2">
            Has successfully completed
          </p>
          <h3 className="text-center text-xl font-semibold text-gray-900 mb-2">
            {cert.systemTitle}
          </h3>
          <p className="text-center text-sm text-gray-500 mb-8">
            {cert.difficulty} · {cert.language}
          </p>

          <div className="w-16 h-px bg-gray-300 mx-auto my-6" />

          {/* Date and ID */}
          <div className="flex justify-center gap-8 text-xs text-gray-500">
            <p className="tracking-wide">Completed {completedDate}</p>
            <p>Code: <span className="font-mono text-gray-700">{cert.id}</span></p>
          </div>

          {/* Tags */}
          {cert.tags && cert.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {cert.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <DownloadButton />
          <a
            href={cert.authorUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors"
          >
            View GitHub
          </a>
        </div>

        {/* Verification URL */}
        <p className="text-center text-[10px] text-gray-400 mt-6 font-mono">
          100xsystems.dev/verify/{cert.id}
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
  if (process.env.NODE_ENV === 'development') {
    return getMockCertificate(certId);
  }

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
