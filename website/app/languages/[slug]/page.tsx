import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Heading, Text, Badge, Icon, Breadcrumbs, Divider } from '@/presentation/__components';
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
    description: lang.description,
  };
}

export default async function LanguageDetailPage({ params }: Props) {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) notFound();

  // Find systems that support this language
  const relatedSystems = getHandcraftedSystems().filter(
    (s) => s.languages.includes(slug)
  );

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Languages', href: '/languages' },
            { label: lang.title },
          ]}
          className="mb-8"
        />

        {/* Language Header */}
        <div className="mb-10">
          <div className="text-4xl mb-4">{lang.icon || '📄'}</div>
          <Heading variant="h2" className="uppercase tracking-tight mb-2">
            {lang.title}
          </Heading>
          <Text variant="body-lg" className="text-fg-secondary">
            {lang.description}
          </Text>
        </div>

        <Divider className="mb-10" />

        {/* Chapters */}
        <div className="mb-12">
          <Heading variant="h4" className="uppercase tracking-wider mb-6">
            Curriculum ({lang.chapters.length} chapters)
          </Heading>

          {lang.chapters.length === 0 ? (
            <div className="border border-dashed border-border p-8 text-center">
              <Icon name="file" size={24} className="text-fg-muted mx-auto mb-2" />
              <Text variant="muted">Chapters coming soon.</Text>
            </div>
          ) : (
            <div className="space-y-3">
              {lang.chapters.map((chapter, idx) => (
                <Link
                  key={chapter.slug}
                  href={`/languages/${slug}/${chapter.slug}`}
                  className="flex items-center gap-4 p-4 border border-border bg-white hover:border-accent/40 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-accent-bg text-accent text-sm font-bold shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-xs text-fg-secondary mt-0.5 line-clamp-1">
                      {chapter.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {chapter.estimatedTime && (
                      <span className="text-[10px] text-fg-muted whitespace-nowrap">
                        {chapter.estimatedTime}
                      </span>
                    )}
                    <Icon name="arrow-right" size={14} className="text-fg-muted group-hover:text-accent transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Related Systems */}
        {relatedSystems.length > 0 && (
          <>
            <Divider className="mb-10" />
            <div>
              <Heading variant="h4" className="uppercase tracking-wider mb-6">
                Systems You Can Build with {lang.title}
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedSystems.map((system) => (
                  <Link
                    key={system.slug}
                    href={`/systems/${system.slug}`}
                    className="block border border-border bg-white p-4 hover:border-accent transition-all duration-200 group"
                  >
                    <h3 className="text-sm font-semibold text-fg group-hover:text-accent transition-colors mb-1">
                      {system.title}
                    </h3>
                    <p className="text-xs text-fg-secondary line-clamp-2 mb-3">
                      {system.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      Build This System
                      <Icon name="arrow-right" size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
