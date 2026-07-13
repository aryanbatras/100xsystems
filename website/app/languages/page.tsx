import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllLanguages } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Languages',
};

export default function LanguagesPage() {
  const languages = getAllLanguages();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            Languages
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Master programming languages through condensed, system-oriented curriculums.
          </p>
        </div>

        {languages.length === 0 ? (
          <p className="text-sm text-fg-muted">Languages coming soon.</p>
        ) : (
          <div className="space-y-px">
            {languages.map((lang) => (
              <Link
                key={lang.slug}
                href={`/languages/${lang.slug}`}
                className="flex items-center gap-4 px-4 py-4 transition-all duration-200 hover:bg-accent/5 group"
              >
                <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors flex-1">
                  {lang.title}
                </h3>
                <span className="text-xs text-fg-muted">
                  {lang.chapters.length} {lang.chapters.length === 1 ? 'chapter' : 'chapters'}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-fg-muted opacity-0 group-hover:text-accent group-hover:opacity-100 transition-all">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
