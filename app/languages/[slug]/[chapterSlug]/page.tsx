import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Heading, Text, Badge, Breadcrumbs, Icon, Divider } from '@/presentation/__components';
import { getLanguageMeta, getAllLanguageSlugs } from '@/lib/mdx';
import { MdxRenderer } from '@/lib/mdx-renderer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Props {
  params: Promise<{ slug: string; chapterSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllLanguageSlugs();
  const params: Array<{ slug: string; chapterSlug: string }> = [];

  for (const langSlug of slugs) {
    const lang = getLanguageMeta(langSlug);
    if (lang) {
      lang.chapters.forEach((ch) => {
        params.push({ slug: langSlug, chapterSlug: ch.slug });
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) return { title: 'Not Found' };

  const mdxPath = path.join(process.cwd(), 'content', 'languages', slug, 'chapters', chapterSlug, 'index.mdx');
  let title = chapterSlug;
  try {
    if (fs.existsSync(mdxPath)) {
      const { data } = matter(fs.readFileSync(mdxPath, 'utf-8'));
      title = data.title || title;
    }
  } catch {}

  return {
    title: `${title} - ${lang.title} - Languages`,
  };
}

export default async function LanguageChapterPage({ params }: Props) {
  const { slug, chapterSlug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) notFound();

  // Read the MDX file
  const mdxPath = path.join(process.cwd(), 'content', 'languages', slug, 'chapters', chapterSlug, 'index.mdx');
  if (!fs.existsSync(mdxPath)) notFound();

  const fileContent = fs.readFileSync(mdxPath, 'utf-8');
  const { data, content } = matter(fileContent);

  const chapterIndex = lang.chapters.findIndex((ch) => ch.slug === chapterSlug);
  const prevChapter = chapterIndex > 0 ? lang.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < lang.chapters.length - 1 ? lang.chapters[chapterIndex + 1] : null;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[900px] mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Languages', href: '/languages' },
            { label: lang.title, href: `/languages/${slug}` },
            { label: data.title || chapterSlug },
          ]}
          className="mb-8"
        />

        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="purple" size="sm">
              Chapter {chapterIndex + 1}
            </Badge>
            {data.estimatedTime && (
              <span className="text-xs text-fg-muted flex items-center gap-1">
                <Icon name="clock" size={12} />
                {data.estimatedTime}
              </span>
            )}
          </div>
          <Heading variant="h2" className="uppercase tracking-tight mb-2">
            {data.title || chapterSlug}
          </Heading>
          <Text variant="body-lg" className="text-fg-secondary">
            {data.description || ''}
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
          prose-strong:text-fg
          prose-ul:text-fg-secondary
          prose-ol:text-fg-secondary
          prose-li:leading-relaxed
          prose-blockquote:border-l-accent prose-blockquote:bg-accent-bg/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
          [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm
          [&_code]:before:content-none [&_code]:after:content-none
        ">
          <MdxRenderer source={content} />
        </article>

        {/* Chapter Navigation */}
        <Divider className="my-12" />
        <div className="flex items-center justify-between">
          {prevChapter ? (
            <a
              href={`/languages/${slug}/${prevChapter.slug}`}
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
              href={`/languages/${slug}/${nextChapter.slug}`}
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
              href={`/languages/${slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <Icon name="check" size={14} />
              Complete Language
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
