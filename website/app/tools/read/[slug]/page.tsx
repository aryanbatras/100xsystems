import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKnowledgeItem, getKnowledgeItems } from '@/lib/mdx';
import { KnowledgeItemDetail } from '../../../principles/KnowledgeItemDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getKnowledgeItem('tools', slug);
  if (!item) return { title: 'Not Found' };
  return { title: `${item.title} - Tools` };
}

export default async function ToolReadPage({ params }: Props) {
  const { slug } = await params;
  const item = getKnowledgeItem('tools', slug);
  if (!item) notFound();

  const sidebarItems = getKnowledgeItems('tools');

  return <KnowledgeItemDetail item={item} domain="tools" sidebarItems={sidebarItems} />;
}
