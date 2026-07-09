import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from '../../__components/organisms/PageHeader';

const meta = {
  title: 'Organisms/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { title: 'Learning Dashboard', subtitle: 'Track your progress across all learning paths.' },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: 'System Design Fundamentals',
    subtitle: 'Master the core principles of designing scalable distributed systems.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Roadmaps', href: '/roadmaps' },
      { label: 'System Design' },
    ],
  },
};

export const WithMeta: Story = {
  args: {
    title: 'DSA Problems',
    subtitle: 'Comprehensive collection of data structures and algorithms problems.',
    meta: [
      { label: 'Difficulty', value: 'Mixed', icon: '📊' },
      { label: 'Total Problems', value: 150, icon: '📝' },
      { label: 'Est. Time', value: '40 hours', icon: '⏱️' },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: 'Study Groups',
    subtitle: 'Connect with learners and collaborate on projects.',
    actions: (
      <button className="rounded-lg bg-[#572EFF] px-4 py-2 text-sm text-white font-medium hover:bg-[#4625CC] transition-colors">
        + Create Group
      </button>
    ),
  },
};

export const Complete: Story = {
  args: {
    title: 'JavaScript Fundamentals',
    subtitle: 'Learn the core concepts of JavaScript programming from the ground up.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Paths', href: '/path' },
      { label: 'Web Development' },
      { label: 'JavaScript' },
    ],
    meta: [
      { label: 'Difficulty', value: 'Beginner', icon: '🌟' },
      { label: 'Lessons', value: 24, icon: '📚' },
      { label: 'Duration', value: '8 hours', icon: '⏱️' },
    ],
    actions: (
      <button className="rounded-lg bg-[#572EFF] px-5 py-2.5 text-sm text-white font-medium hover:bg-[#4625CC] transition-colors shadow-sm">
        Start Learning
      </button>
    ),
  },
};
