import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCliDoc, getAllCliDocs } from '@/lib/cli-docs';
import { CliDocDetail } from '../CliDocDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getCliDoc(slug);
  if (!doc) return { title: 'Not Found' };
  return { title: `${doc.title} - CLI Docs` };
}

export async function generateStaticParams() {
  const docs = getAllCliDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export default async function CliDocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getCliDoc(slug);
  if (!doc) notFound();

  const allDocs = getAllCliDocs();

  return <CliDocDetail doc={doc} allDocs={allDocs} />;
}
