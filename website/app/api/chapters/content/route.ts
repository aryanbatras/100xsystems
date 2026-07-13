import { NextRequest, NextResponse } from 'next/server';
import { getChapterContent } from '@/lib/mdx';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const language = searchParams.get('language');
  const chapterSlug = searchParams.get('chapterSlug');

  if (!slug || !language || !chapterSlug) {
    return NextResponse.json(
      { error: 'Missing required params: slug, language, chapterSlug' },
      { status: 400 }
    );
  }

  const chapter = getChapterContent(slug, language, chapterSlug);
  if (!chapter) {
    return NextResponse.json(
      { error: `Chapter "${chapterSlug}" not found for ${slug}/${language}` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    meta: chapter.meta,
    content: chapter.content,
  });
}
