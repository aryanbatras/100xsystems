import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getKnowledgeItem, getKnowledgeItems } from '@/lib/mdx';
import { KnowledgeItemDetail } from '../../../principles/KnowledgeItemDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getKnowledgeItem('patterns', slug);
  if (!item) return { title: 'Not Found' };
  return { title: `${item.title} - Patterns` };
}

export default async function PatternReadPage({ params }: Props) {
  const { slug } = await params;
  const item = getKnowledgeItem('patterns', slug);
  if (!item) notFound();

  const sidebarItems = getKnowledgeItems('patterns');

  return <KnowledgeItemDetail item={item} domain="patterns" sidebarItems={sidebarItems} />;
}
