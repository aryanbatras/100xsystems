import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Heading, Text, Badge, Breadcrumbs, Icon, Divider } from '@/presentation/__components';
import { getSystemMeta, getChapterContent, getAllSystemSlugs } from '@/lib/mdx';
import { MdxRenderer } from '@/lib/mdx-renderer';

interface Props {
  params: Promise<{ slug: string; chapterSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSystemSlugs();
  const params: Array<{ slug: string; chapterSlug: string }> = [];

  for (const systemSlug of slugs) {
    const system = getSystemMeta(systemSlug);
    if (system) {
      system.chapters.forEach((ch) => {
        params.push({ slug: systemSlug, chapterSlug: ch.slug });
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  const chapter = getChapterContent(slug, chapterSlug);
  if (!chapter) return { title: 'Chapter Not Found' };

  return {
    title: `${chapter.meta.title} - ${slug} - Systems`,
    description: chapter.meta.description,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug, chapterSlug } = await params;
  const system = getSystemMeta(slug);
  const chapter = getChapterContent(slug, chapterSlug);

  if (!system || !chapter) notFound();

  const currentIndex = system.chapters.findIndex((ch) => ch.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? system.chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < system.chapters.length - 1 ? system.chapters[currentIndex + 1] : null;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Systems', href: '/systems' },
            { label: system.title, href: `/systems/${slug}` },
            { label: chapter.meta.title },
          ]}
          className="mb-8"
        />

        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="purple" size="sm">
              Chapter {chapter.meta.order}
            </Badge>
            {chapter.meta.estimatedTime && (
              <span className="text-xs text-fg-muted flex items-center gap-1">
                <Icon name="clock" size={12} />
                {chapter.meta.estimatedTime}
              </span>
            )}
          </div>
          <Heading variant="h2" className="uppercase tracking-tight mb-2">
            {chapter.meta.title}
          </Heading>
          <Text variant="body-lg" className="text-fg-secondary">
            {chapter.meta.description}
          </Text>
        </div>

        <Divider className="mb-8" />

        {/* MDX Content */}
        <article className="prose prose-sm max-w-none
          prose-headings:text-fg prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-[1.5rem] prose-h2:mt-10 prose-h2:mb-4 prose-h2:uppercase prose-h2:tracking-wider
          prose-h3:text-[1.125rem] prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-fg-secondary prose-p:leading-relaxed
          prose-a:text-accent prose-a:font-semibold hover:prose-a:underline
          prose-code:text-fg prose-code:bg-surface-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono
          prose-pre:bg-surface-secondary prose-pre:border prose-pre:border-border
          prose-img:border prose-img:border-border
          prose-strong:text-fg
          prose-ul:text-fg-secondary
          prose-ol:text-fg-secondary
          prose-li:leading-relaxed
          prose-blockquote:border-l-accent prose-blockquote:bg-accent-bg/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
          [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm
          [&_code]:before:content-none [&_code]:after:content-none
        ">
          <MdxRenderer source={chapter.content} />
        </article>

        {/* Chapter Navigation */}
        <Divider className="my-12" />
        <div className="flex items-center justify-between">
          {prevChapter ? (
            <a
              href={`/systems/${slug}/chapters/${prevChapter.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline group"
            >
              <Icon name="arrow-left" size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <div className="text-left">
                <div className="text-[10px] text-fg-muted uppercase tracking-wider">Previous</div>
                <div>{prevChapter.title}</div>
              </div>
            </a>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <a
              href={`/systems/${slug}/chapters/${nextChapter.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline group text-right"
            >
              <div>
                <div className="text-[10px] text-fg-muted uppercase tracking-wider">Next</div>
                <div>{nextChapter.title}</div>
              </div>
              <Icon name="arrow-right" size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <a
              href={`/systems/${slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <Icon name="check" size={14} />
              Complete System
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
