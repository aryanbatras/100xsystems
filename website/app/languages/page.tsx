import type { Metadata } from 'next';
import Link from 'next/link';
import { Heading, Text, Badge, Tag, Icon } from '@/presentation/__components';
import { getAllLanguages } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Languages',
  description: 'Master programming languages through condensed, system-oriented curriculums.',
};

const LANG_ICONS: Record<string, string> = {
  java: '☕',
  python: '🐍',
  typescript: '🟦',
  javascript: '🟨',
  rust: '🦀',
  go: '🔷',
};

export default function LanguagesPage() {
  const languages = getAllLanguages();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge variant="purple" size="sm" className="mb-4">
            PROGRAMMING LANGUAGES
          </Badge>
          <Heading variant="h1" className="uppercase tracking-tight mb-3">
            Master Any Language
          </Heading>
          <Text variant="body-lg" className="max-w-2xl mx-auto">
            Condensed, system-oriented curriculums for every language. Learn the fundamentals fast,
            then build real systems. Not just syntax — engineering mindset.
          </Text>
        </div>

        {languages.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border max-w-md mx-auto">
            <Icon name="globe" size={40} className="text-fg-muted mx-auto mb-4" />
            <Heading variant="h4" className="uppercase tracking-tight mb-2">
              Languages Coming Soon
            </Heading>
            <Text variant="body" className="max-w-sm mx-auto">
              We&apos;re building condensed, system-first language curriculums.
              Check back for Java, Python, TypeScript, and more.
            </Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languages.map((lang) => (
              <Link
                key={lang.slug}
                href={`/languages/${lang.slug}`}
                className="group block border border-border bg-white p-6 transition-all duration-200 hover:border-accent hover:shadow-[0_0_20px_-4px_rgba(98,37,230,0.1)]"
              >
                <div className="text-3xl mb-4">{LANG_ICONS[lang.slug] || '📄'}</div>
                <h3 className="text-base font-bold text-fg group-hover:text-accent transition-colors mb-2">
                  {lang.title}
                </h3>
                <p className="text-xs text-fg-secondary leading-relaxed mb-4 line-clamp-2">
                  {lang.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-fg-muted">
                  <Icon name="file" size={12} />
                  <span>{lang.chapters.length} chapters</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Start Learning
                  <Icon name="arrow-right" size={12} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
