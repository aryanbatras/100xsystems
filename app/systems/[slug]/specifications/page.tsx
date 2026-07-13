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
    title: `${system.title} - Specifications`,
    description: `Spec-driven development specifications for ${system.title}.`,
  };
}

export default async function SpecificationsPage({ params }: Props) {
  const { slug } = await params;
  const system = getSystemMeta(slug);
  if (!system || !system.hasSpecification) notFound();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-[800px] mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Systems', href: '/systems' },
            { label: system.title, href: `/systems/${slug}` },
            { label: 'Specifications' },
          ]}
          className="mb-8"
        />

        <div className="mb-8">
          <Badge variant="purple" size="sm" className="mb-3">SPECIFICATION</Badge>
          <Heading variant="h2" className="uppercase tracking-tight mb-3">
            {system.title} — Specification
          </Heading>
          <Text variant="body-lg" className="text-fg-secondary">
            Spec-driven development (SDD) is the future. Instead of storing code, store specifications.
            These formal specs define exactly what the system should do, how it should behave, and
            what constraints it must satisfy.
          </Text>
        </div>

        <Divider className="mb-8" />

        {/* Install Instructions */}
        <div className="border border-border p-6 bg-white mb-8">
          <Heading variant="h4" className="uppercase tracking-wider mb-4">
            Install Specification
          </Heading>
          <div className="bg-surface-secondary p-4 font-mono text-sm text-fg mb-4 break-all border border-border">
            {system.specificationInstallCmd || `npx create-${slug} --spec-only`}
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => navigator.clipboard?.writeText(system.specificationInstallCmd || `npx create-${slug} --spec-only`)}
            >
              <Icon name="copy" size={14} />
              Copy Command
            </Button>
          </div>
        </div>

        {/* Specification Sections */}
        <div className="space-y-6 mb-8">
          <div className="border border-border p-6 bg-white">
            <Heading variant="h5" className="uppercase tracking-wider mb-3">
              Functional Requirements
            </Heading>
            <Text variant="body-sm" className="text-fg-secondary">
              Complete specification of what the system must do, including all user-facing features,
              API contracts, and expected behaviors.
            </Text>
          </div>
          <div className="border border-border p-6 bg-white">
            <Heading variant="h5" className="uppercase tracking-wider mb-3">
              Non-Functional Requirements
            </Heading>
            <Text variant="body-sm" className="text-fg-secondary">
              Performance targets (latency, throughput), scalability constraints, security requirements,
              and operational characteristics.
            </Text>
          </div>
          <div className="border border-border p-6 bg-white">
            <Heading variant="h5" className="uppercase tracking-wider mb-3">
              Architecture Decision Records
            </Heading>
            <Text variant="body-sm" className="text-fg-secondary">
              Key architectural decisions with context, alternatives considered, and rationale.
              Every decision is documented for future contributors.
            </Text>
          </div>
          <div className="border border-border p-6 bg-white">
            <Heading variant="h5" className="uppercase tracking-wider mb-3">
              Validation Tests
            </Heading>
            <Text variant="body-sm" className="text-fg-secondary">
              Formal test specifications that define how to verify the implementation matches
              the specification. Can be used for automated validation.
            </Text>
          </div>
        </div>

        <Divider className="mb-8" />

        <div className="text-center">
          <Text variant="muted" className="mb-4">
            Specifications can be used with AI-powered development tools to generate implementations
            that match the spec exactly.
          </Text>
          <Button variant="primary" onClick={() => window.location.href = `/systems/${slug}`}>
            View Full System Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
