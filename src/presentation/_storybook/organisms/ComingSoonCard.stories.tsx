import type { Meta, StoryObj } from '@storybook/react';
import { ComingSoonCard } from '../../__components/organisms/ComingSoonCard';

const meta = {
  title: 'Organisms/ComingSoonCard',
  component: ComingSoonCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-56"><Story /></div>],
} satisfies Meta<typeof ComingSoonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Achievements: Story = {
  args: { icon: '🏆', title: 'Achievements System', description: 'Track your progress and unlock special badges as you master new concepts.' },
};
export const ProgressReports: Story = {
  args: { icon: '📊', title: 'Progress Reports', description: 'Detailed analytics and insights about your learning journey.' },
};
export const Practice: Story = {
  args: { icon: '🎮', title: 'Practice Challenges', description: 'Test your skills with real-world system design challenges.' },
};
export const Community: Story = {
  args: { icon: '👥', title: 'Community Features', description: 'Connect with other learners and share your insights.', badgeText: 'In Development' },
};
