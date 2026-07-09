import type { Meta, StoryObj } from '@storybook/react';
import { ModuleCard } from '../../__components/organisms/ModuleCard';

const meta = {
  title: 'Organisms/ModuleCard',
  component: ModuleCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof ModuleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    title: 'System Fundamentals',
    description: 'Master the core principles of systems thinking and software architecture.',
    progress: 75,
    completedLessons: 9,
    totalLessons: 12,
    difficulty: 'Intermediate',
    estimatedTime: '8 hours',
    status: 'in-progress',
  },
};

export const NotStarted: Story = {
  args: {
    title: 'Performance Optimization',
    description: 'Techniques for optimizing system performance and resource utilization.',
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    difficulty: 'Advanced',
    estimatedTime: '10 hours',
    status: 'not-started',
  },
};

export const Completed: Story = {
  args: {
    title: 'Database Design',
    description: 'Master database design patterns and optimization techniques.',
    progress: 100,
    completedLessons: 8,
    totalLessons: 8,
    difficulty: 'Intermediate',
    estimatedTime: '6 hours',
    status: 'completed',
  },
};
