import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSystemMeta, getSystemFlatFiles, getSystemFile } from '@/lib/mdx';
import { SystemFileReadingClient } from './SystemFileReadingClient';

interface Props {
  params: Promise<{ slug: string; fileSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, fileSlug } = await params;
  const system = getSystemMeta(slug);
  const file = getSystemFile(slug, fileSlug);
  if (!system || !file) return { title: 'Not Found' };
  return { title: `${file.title} - ${system.title}` };
}

export default async function SystemFileReadingPage({ params }: Props) {
  const { slug, fileSlug } = await params;
  const system = getSystemMeta(slug);
  if (!system) notFound();

  const file = getSystemFile(slug, fileSlug);
  if (!file) notFound();

  const allFiles = getSystemFlatFiles(slug);

  const currentIndex = allFiles.findIndex((f) => f.slug === fileSlug);
  const prevFile = currentIndex > 0 ? allFiles[currentIndex - 1] : null;
  const nextFile = currentIndex < allFiles.length - 1 ? allFiles[currentIndex + 1] : null;

  return (
    <SystemFileReadingClient
      system={system}
      file={file}
      allFiles={allFiles}
      prevFile={prevFile}
      nextFile={nextFile}
    />
  );
}
