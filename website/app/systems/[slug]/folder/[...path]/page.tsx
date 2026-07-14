import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSystemMeta, getSystemDirectoryContents, systemHasDirectory } from '@/lib/mdx';
import { FolderBrowserClient } from './FolderBrowserClient';

interface Props {
  params: Promise<{ slug: string; path: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, path: pathSegments } = await params;
  const system = getSystemMeta(slug);
  if (!system) return { title: 'Not Found' };
  const folderTitle = pathSegments[pathSegments.length - 1]
    .split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return { title: `${folderTitle} - ${system.title}` };
}

export default async function FolderBrowsingPage({ params }: Props) {
  const { slug, path: pathSegments } = await params;
  const system = getSystemMeta(slug);
  if (!system) notFound();

  const hasDir = systemHasDirectory(slug, pathSegments);
  if (!hasDir) notFound();

  const contents = getSystemDirectoryContents(slug, pathSegments);

  return <FolderBrowserClient system={system} pathSegments={pathSegments} contents={contents} />;
}
