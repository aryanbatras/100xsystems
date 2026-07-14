import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Heading, Text, Badge, Breadcrumbs, Icon, Button, Divider } from '@/presentation/__components';
import { getSystemMeta } from '@/lib/mdx';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystemMeta(slug);
  if (!system) return { title: 'Not Found' };

  return {
    title: `${system.title} - Templates`,
    description: `Get started with ${system.title} using our pre-built templates.`,
  };
}

export default async function TemplatesPage({ params }: Props) {
  const { slug } = await params;
  const system = getSystemMeta(slug);
  if (!system || !system.hasTemplate) notFound();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[800px] mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Systems', href: '/systems' },
            { label: system.title, href: `/systems/${slug}` },
            { label: 'Templates' },
          ]}
          className="mb-8"
        />

        <div className="mb-8">
          <Badge variant="purple" size="sm" className="mb-3">TEMPLATE</Badge>
          <Heading variant="h2" className="uppercase tracking-tight mb-3">
            {system.title} — Template
          </Heading>
          <Text variant="body-lg" className="text-fg-secondary">
            Get started instantly with our pre-built template. Install it with a single command and
            start building right away.
          </Text>
        </div>

        <Divider className="mb-8" />

        {/* Install Instructions */}
        <div className="border border-border p-6 bg-white mb-8">
          <Heading variant="h4" className="uppercase tracking-wider mb-4">
            Quick Install
          </Heading>
          <div className="bg-surface-secondary p-4 font-mono text-sm text-fg mb-4 break-all border border-border">
            {system.templateInstallCmd || `npx create-${slug}`}
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => navigator.clipboard?.writeText(system.templateInstallCmd || `npx create-${slug}`)}
            >
              <Icon name="copy" size={14} />
              Copy Command
            </Button>
          </div>
        </div>

        {/* What's Included */}
        <div className="border border-border p-6 bg-white mb-8">
          <Heading variant="h4" className="uppercase tracking-wider mb-4">
            What&apos;s Included
          </Heading>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-fg-secondary">
              <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
              <span>Ready-to-run project structure following best practices</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-fg-secondary">
              <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
              <span>Pre-configured development environment with Docker Compose</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-fg-secondary">
              <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
              <span>CI/CD pipeline setup (GitHub Actions)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-fg-secondary">
              <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
              <span>Self-documenting code with README and inline comments</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-fg-secondary">
              <Icon name="check" size={14} className="text-accent mt-0.5 shrink-0" />
              <span>AI-ready: includes prompts and rules for AI-assisted development</span>
            </li>
          </ul>
        </div>

        <Divider className="mb-8" />

        <div className="text-center">
          <Text variant="muted" className="mb-4">
            Already have the template? Learn how to build {system.title} step by step.
          </Text>
          <Button variant="primary" onClick={() => window.location.href = `/systems/${slug}`}>
            View Full System Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
