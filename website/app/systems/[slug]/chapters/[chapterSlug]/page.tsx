import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Heading, Text, Badge, Breadcrumbs, Icon, Divider } from '@/presentation/__components';
import { getSystemMeta, getChapterContent, getAllSystemSlugs } from '@/lib/mdx';
import { MdxRenderer } from '@/lib/mdx-renderer';
import { ChapterPageClient } from './ChapterPageClient';

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
    <ChapterPageClient
      slug={slug}
      systemTitle={system.title}
      chapter={chapter}
      chapters={system.chapters}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      content={chapter.content}
    />
  );
}
