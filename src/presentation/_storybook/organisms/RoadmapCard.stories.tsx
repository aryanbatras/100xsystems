import type { Meta, StoryObj } from '@storybook/react';
import { RoadmapCard } from '../../__components/organisms/RoadmapCard';

const meta = {
  title: 'Organisms/RoadmapCard',
  component: RoadmapCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof RoadmapCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'System Design Fundamentals',
    description: 'Master distributed systems, load balancing, caching, and database scaling patterns.',
    difficulty: 'Intermediate',
    estimatedTime: '8 hours',
    articleCount: 24,
    sectionCount: 6,
    sections: ['Introduction', 'Core Concepts', 'Load Balancing', 'Caching', 'Databases', 'Advanced Topics'],
  },
};

export const Beginner: Story = {
  args: {
    title: 'JavaScript Basics',
    description: 'Learn JavaScript from the ground up. Perfect for absolute beginners.',
    difficulty: 'Beginner',
    estimatedTime: '4 hours',
    articleCount: 12,
    sectionCount: 4,
    sections: ['Variables', 'Functions', 'Objects', 'Arrays'],
  },
};

export const Advanced: Story = {
  args: {
    title: 'Advanced Distributed Systems',
    description: 'Deep dive into consensus algorithms, distributed transactions, and real-time streaming.',
    difficulty: 'Advanced',
    estimatedTime: '16 hours',
    articleCount: 36,
    sectionCount: 8,
    sections: ['Consensus', 'Distributed Transactions', 'Streaming', 'Observability', 'Chaos Engineering', 'Security', 'Performance', 'Case Studies'],
  },
};
