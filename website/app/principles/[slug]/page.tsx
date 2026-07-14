import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKnowledgeItem, getKnowledgeItems } from '@/lib/mdx';
import { KnowledgeItemDetail } from '../KnowledgeItemDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getKnowledgeItem('principles', slug);
  if (!item) return { title: 'Not Found' };
  return { title: `${item.title} - Principles` };
}

export default async function PrincipleDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getKnowledgeItem('principles', slug);
  if (!item) notFound();

  const sidebarItems = getKnowledgeItems('principles');

  return <KnowledgeItemDetail item={item} domain="principles" sidebarItems={sidebarItems} />;
}
