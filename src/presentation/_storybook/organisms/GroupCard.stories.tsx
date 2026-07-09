import type { Meta, StoryObj } from '@storybook/react';
import { GroupCard } from '../../__components/organisms/GroupCard';

const meta = {
  title: 'Organisms/GroupCard',
  component: GroupCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof GroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Joinable: Story = {
  args: {
    name: 'React Study Group',
    description: 'Learn React together. We cover hooks, state management, and advanced patterns.',
    memberCount: 15,
    maxMembers: 30,
    tags: ['react', 'frontend', 'typescript'],
    membership: 'none',
    roadmapSlug: 'frontend',
    createdAt: '2024-01-15',
  },
};

export const Member: Story = {
  args: {
    name: 'System Design Club',
    description: 'Deep dive into distributed systems architecture and design patterns.',
    memberCount: 28,
    maxMembers: 50,
    tags: ['system-design', 'architecture', 'distributed'],
    membership: 'member',
    welcomeMessage: 'Welcome to the club! Check out our resources section for study materials.',
    roadmapSlug: 'system-design',
    createdAt: '2024-02-01',
  },
};

export const AdminView: Story = {
  args: {
    name: 'DSA Warriors',
    description: 'Daily DSA problem solving and mock interviews.',
    memberCount: 42,
    maxMembers: 100,
    tags: ['dsa', 'algorithms', 'interview-prep'],
    membership: 'admin',
    isPrivate: true,
    createdAt: '2023-11-01',
  },
};

export const Full: Story = {
  args: {
    name: 'Full Capacity Group',
    description: 'This group has reached its maximum capacity.',
    memberCount: 20,
    maxMembers: 20,
    tags: ['full', 'capacity'],
    membership: 'none',
  },
};
