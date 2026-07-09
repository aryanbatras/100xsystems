import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from '../../__components/molecules/StatCard';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-48"><Story /></div>],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: '10,000', label: 'Total Users' } };
export const WithTrend: Story = { args: { value: '75%', label: 'Completion', trend: 'up', trendText: '+12%' } };
export const DownTrend: Story = { args: { value: '23', label: 'Dropouts', trend: 'down', trendText: '-5%' } };
export const Hero: Story = { args: { value: '7', label: 'Day Streak', variant: 'hero' } };
export const WithIcon: Story = { args: { value: '45h', label: 'Hours Learned', icon: '⏱️' } };
