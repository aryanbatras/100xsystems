import type { Meta, StoryObj } from '@storybook/react';
import { MemberCard } from '../../__components/molecules/MemberCard';

const meta = {
  title: 'Molecules/MemberCard',
  component: MemberCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof MemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    username: 'johndoe',
    role: 'Admin',
    bio: 'Full-stack engineer passionate about systems thinking and distributed architectures.',
    tags: ['React', 'TypeScript', 'System Design'],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/johndoe' },
      { label: 'Twitter', url: 'https://twitter.com/johndoe' },
    ],
    joinedDate: '2024-01-15',
  },
};

export const Minimal: Story = {
  args: {
    name: 'Jane Smith',
    username: 'janesmith',
  },
};

export const WithLongBio: Story = {
  args: {
    name: 'Alex Johnson',
    avatarUrl: 'https://i.pravatar.cc/80?u=alex',
    role: 'Member',
    bio: 'Senior software engineer with 10+ years of experience building scalable microservices, distributed systems, and cloud-native applications using Go, Rust, and Kubernetes technologies.',
    tags: ['Go', 'Kubernetes', 'Microservices', 'AWS', 'Docker', 'gRPC'],
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com/alexj' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/alexj' },
      { label: 'Website', url: 'https://alexj.dev' },
    ],
    joinedDate: '2023-06-01',
  },
};
