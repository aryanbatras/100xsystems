import type { Meta, StoryObj } from '@storybook/react';
import { StreakCard } from '../../__components/molecules/StreakCard';

const meta = {
  title: 'Molecules/StreakCard',
  component: StreakCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof StreakCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveStreak: Story = {
  args: {
    currentStreak: 7,
    longestStreak: 14,
    totalDays: 45,
    lastActivityDate: '2024-03-20',
  },
};

export const LongStreak: Story = {
  args: {
    currentStreak: 52,
    longestStreak: 52,
    totalDays: 180,
    lastActivityDate: '2024-03-20',
    showUpdate: true,
  },
};

export const JustStarting: Story = {
  args: {
    currentStreak: 1,
    longestStreak: 3,
    totalDays: 5,
    lastActivityDate: '2024-03-20',
  },
};

export const NoActivity: Story = {
  args: {
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
  },
};
