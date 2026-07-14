import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSystemMeta, getSystemFileAtPath, getAllSystemFiles } from '@/lib/mdx';
import { SystemFileReadingClient } from './SystemFileReadingClient';

interface Props {
  params: Promise<{ slug: string; path: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, path: pathSegments } = await params;
  const system = getSystemMeta(slug);
  const file = getSystemFileAtPath(slug, pathSegments);
  if (!system || !file) return { title: 'Not Found' };
  return { title: `${file.title} - ${system.title}` };
}

export default async function SystemFileReadingPage({ params }: Props) {
  const { slug, path: pathSegments } = await params;
  const system = getSystemMeta(slug);
  if (!system) notFound();

  const file = getSystemFileAtPath(slug, pathSegments);
  if (!file) notFound();

  const allFiles = getAllSystemFiles(slug);

  const currentIndex = allFiles.findIndex((f) => f.slug === file.slug);
  const prevFile = currentIndex > 0 ? allFiles[currentIndex - 1] : null;
  const nextFile = currentIndex < allFiles.length - 1 ? allFiles[currentIndex + 1] : null;

  // Determine the folder_tag from path segments (first segment is the folder_tag)
  const folderTag = pathSegments.length > 0 ? pathSegments[0] : '';

  return (
    <SystemFileReadingClient
      system={system}
      file={file}
      allFiles={allFiles}
      prevFile={prevFile}
      nextFile={nextFile}
      folderTag={folderTag}
    />
  );
}
