import type { Meta, StoryObj } from '@storybook/react';
import { ArticleCard } from '../../__components/molecules/ArticleCard';

const meta = {
  title: 'Molecules/ArticleCard',
  component: ArticleCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof ArticleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    slug: 'getting-started',
    title: 'Getting Started with Systems Thinking',
    description: 'Learn the fundamentals of systems thinking and how to apply them to software engineering.',
    date: '2024-01-15',
    category: 'Engineering',
    readTime: 8,
  },
};

export const WithoutDescription: Story = {
  args: {
    slug: 'quick-tip',
    title: 'Quick Tip: State Management in React',
    category: 'React',
    readTime: 3,
  },
};

export const LongTitle: Story = {
  args: {
    slug: 'deep-dive',
    title: 'A Comprehensive Guide to Distributed Systems Architecture and Design Patterns for Modern Applications',
    description: 'An in-depth exploration of distributed systems covering everything from CAP theorem to event sourcing.',
    date: '2024-03-20',
    category: 'Architecture',
    readTime: 25,
  },
};
