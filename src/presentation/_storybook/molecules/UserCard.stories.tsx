import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from '../../__components/molecules/UserCard';

const meta = {
  title: 'Molecules/UserCard',
  component: UserCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact', 'detailed'] },
  },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Full-stack engineer passionate about systems design.',
    tags: ['React', 'TypeScript', 'Node.js'],
    meta: 'Joined Jan 2024',
  },
};

export const Compact: Story = {
  args: {
    name: 'Jane Smith',
    username: 'janesmith',
    variant: 'compact',
    tags: ['Design'],
  },
};

export const Detailed: Story = {
  args: {
    name: 'Alex Johnson',
    username: 'alexj',
    bio: 'Senior software engineer with 8+ years of experience building scalable distributed systems. Passionate about mentoring and system architecture.',
    tags: ['System Design', 'Distributed Systems', 'Go', 'Kubernetes'],
    variant: 'detailed',
    meta: 'Joined Mar 2023 · 2,340 contributions',
  },
};

export const WithAvatarImage: Story = {
  args: {
    avatarSrc: 'https://i.pravatar.cc/150?u=avatar',
    name: 'Sarah Connor',
    username: 'sarahc',
    bio: 'Engineering manager at TechCorp.',
    tags: ['Leadership', 'Python', 'AWS'],
  },
};

export const Clickable: Story = {
  args: {
    name: 'Bob Wilson',
    username: 'bobw',
    bio: 'Full-stack developer',
    onClick: () => alert('Card clicked!'),
  },
};
