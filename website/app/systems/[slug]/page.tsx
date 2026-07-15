import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getSystemMeta,
  getSystemFolderTags,
  getSystemTrackTree,
  systemHasTracks,
} from '@/lib/mdx';
import { SystemDetailClient } from './SystemDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystemMeta(slug);
  if (!system) return { title: 'System Not Found' };
  return { title: `${system.title} - Systems` };
}

export default async function SystemDetailPage({ params }: Props) {
  const { slug } = await params;
  const system = getSystemMeta(slug);
  if (!system) notFound();

  const hasTracks = systemHasTracks(slug);
  const folderTags = getSystemFolderTags(slug);
  const trackTree = hasTracks ? getSystemTrackTree(slug) : [];

  return (
    <SystemDetailClient
      system={system}
      folderTags={folderTags}
      hasTracks={hasTracks}
      trackTree={trackTree}
    />
  );
}
