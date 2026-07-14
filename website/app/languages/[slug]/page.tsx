import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLanguageMeta, getHandcraftedSystems } from '@/lib/mdx';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) return { title: 'Language Not Found' };

  return {
    title: `${lang.title} - Languages`,
  };
}

export default async function LanguageDetailPage({ params }: Props) {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) notFound();

  // Find systems that reference this language in their tags
  const relatedSystems = getHandcraftedSystems().filter(
    (s) => s.tags && s.tags.some(t => t.toLowerCase().includes(slug.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <a href="/languages" className="text-xs font-bold uppercase tracking-wider text-fg-muted hover:text-accent transition-colors">
            ← Languages
          </a>
        </div>

        {/* Language Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 text-fg">
            {lang.title}
          </h1>
          <p className="text-sm text-fg-secondary">
            {lang.chapters.length} chapters
          </p>
        </div>

        {/* Chapters */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-6">Curriculum</p>

          {lang.chapters.length === 0 ? (
            <p className="text-sm text-fg-muted">Chapters coming soon.</p>
          ) : (
            <div className="space-y-px">
              {lang.chapters.map((chapter, idx) => (
                <Link
                  key={chapter.slug}
                  href={`/languages/${slug}/${chapter.slug}`}
                  className="flex items-center gap-4 px-4 py-3 transition-all duration-200 hover:bg-accent/5 group"
                >
                  <span className="flex items-center justify-center w-8 h-8 text-xs font-bold text-accent shrink-0 border border-accent/20">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                    {chapter.title}
                  </h3>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-fg-muted opacity-50 group-hover:text-accent group-hover:opacity-100 transition-all">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Systems */}
        {relatedSystems.length > 0 && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-6">
              Systems You Can Build with {lang.title}
            </p>
            <div className="space-y-px">
              {relatedSystems.map((system) => (
                <Link
                  key={system.slug}
                  href={`/systems/${system.slug}`}
                  className="flex items-center gap-4 px-4 py-3 transition-all duration-200 hover:bg-accent/5 group"
                >
                  <span className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                    {system.title}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 text-fg-muted opacity-0 group-hover:text-accent group-hover:opacity-100 transition-all">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
