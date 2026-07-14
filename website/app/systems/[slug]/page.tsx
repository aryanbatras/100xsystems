import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSystemMeta, getSystemFlatFiles } from '@/lib/mdx';
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

  const flatFiles = getSystemFlatFiles(slug);

  return <SystemDetailClient system={system} flatFiles={flatFiles} />;
}
