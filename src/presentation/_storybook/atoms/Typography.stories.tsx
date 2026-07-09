import type { Meta, StoryObj } from '@storybook/react';
import { Heading, Text, Divider } from '../../__components/atoms/Typography';

const meta = {
  title: 'Atoms/Typography',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Typography primitives for consistent text styling.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

// ─── Headings ──────────────────────────────────────────────────────

export const HeadingH1: StoryObj<typeof Heading> = {
  render: () => <Heading variant="h1">This is an H1 Heading</Heading>,
  name: 'Heading/H1',
};

export const HeadingH2: StoryObj<typeof Heading> = {
  render: () => <Heading variant="h2">This is an H2 Heading</Heading>,
  name: 'Heading/H2',
};

export const HeadingH3: StoryObj<typeof Heading> = {
  render: () => <Heading variant="h3">This is an H3 Heading</Heading>,
  name: 'Heading/H3',
};

export const HeadingH4: StoryObj<typeof Heading> = {
  render: () => <Heading variant="h4">This is an H4 Heading</Heading>,
  name: 'Heading/H4',
};

export const HeadingScale: StoryObj = {
  render: () => (
    <div className="space-y-4">
      <Heading variant="h1">H1 — Page Title</Heading>
      <Heading variant="h2">H2 — Section Title</Heading>
      <Heading variant="h3">H3 — Subsection Title</Heading>
      <Heading variant="h4">H4 — Card Title</Heading>
      <Heading variant="h5">H5 — Small Heading</Heading>
      <Heading variant="h6">H6 — Minor Heading</Heading>
    </div>
  ),
  name: 'Heading/Full Scale',
};

// ─── Text ──────────────────────────────────────────────────────────

export const BodyText: StoryObj<typeof Text> = {
  render: () => (
    <div className="w-96 space-y-3">
      <Text variant="body">
        Body text is the standard paragraph style. It is used for most
        content across the platform. It provides comfortable reading
        with relaxed line-height.
      </Text>
      <Text variant="body-lg">
        Large body text for featured content or important paragraphs
        that need more emphasis.
      </Text>
    </div>
  ),
  name: 'Text/Body',
};

export const CaptionText: StoryObj<typeof Text> = {
  render: () => (
    <div className="w-96 space-y-4">
      <Text variant="caption">Section Label</Text>
      <Text variant="muted">
        Muted text for less important information like timestamps.
      </Text>
      <Text variant="body-sm">
        Small body text for secondary content and descriptions.
      </Text>
    </div>
  ),
  name: 'Text/Captions & Muted',
};

export const CodeText: StoryObj<typeof Text> = {
  render: () => (
    <div className="w-96 space-y-2">
      <Text variant="body">
        Use the <Text variant="code" as="span">code</Text> variant for
        inline code references within text.
      </Text>
    </div>
  ),
  name: 'Text/Code',
};

export const DividerDefault: StoryObj<typeof Divider> = {
  render: () => (
    <div className="w-96 space-y-4">
      <Text variant="body">Content above the divider</Text>
      <Divider />
      <Text variant="body">Content below the divider</Text>
    </div>
  ),
  name: 'Divider/Basic',
};

export const DividerWithLabel: StoryObj<typeof Divider> = {
  render: () => (
    <div className="w-96 space-y-4">
      <Text variant="body">Section one</Text>
      <Divider label="OR" />
      <Text variant="body">Section two</Text>
    </div>
  ),
  name: 'Divider/With Label',
};
