import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSystemMeta, getChapterContent, getAllSystemSlugs } from '@/lib/mdx';
import { ChapterPageClient } from './ChapterPageClient';

interface Props {
  params: Promise<{ slug: string; language: string; chapterSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSystemSlugs();
  const params: Array<{ slug: string; language: string; chapterSlug: string }> = [];

  for (const systemSlug of slugs) {
    const system = getSystemMeta(systemSlug);
    if (system) {
      for (const lang of system.languages) {
        for (const ch of lang.chapters) {
          params.push({ slug: systemSlug, language: lang.slug, chapterSlug: ch.slug });
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, language, chapterSlug } = await params;
  const chapter = getChapterContent(slug, language, chapterSlug);
  if (!chapter) return { title: 'Chapter Not Found' };

  return {
    title: `${chapter.meta.title} - ${slug} - Systems`,
    description: chapter.meta.description,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug, language, chapterSlug } = await params;
  const system = getSystemMeta(slug);
  const chapter = getChapterContent(slug, language, chapterSlug);

  if (!system || !chapter) notFound();

  const langObj = system.languages.find((l) => l.slug === language);
  const chapters = langObj?.chapters || [];
  const currentIndex = chapters.findIndex((ch) => ch.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <ChapterPageClient
      slug={slug}
      language={language}
      systemTitle={system.title}
      chapter={chapter}
      chapters={chapters}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      content={chapter.content}
    />
  );
}
