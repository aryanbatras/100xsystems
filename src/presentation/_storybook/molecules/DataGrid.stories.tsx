import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '../../__components/molecules/DataGrid';

const meta = {
  title: 'Molecules/DataGrid',
  component: DataGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Responsive stats grid for displaying metric cards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    compact: { control: 'boolean' },
  },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {
  args: {
    columns: 4,
    stats: [
      { label: 'Total Users', value: '10,000', trend: 'up', trendText: '+12%' },
      { label: 'Active Now', value: '234', icon: '👤', trend: 'neutral' },
      { label: 'Lessons Completed', value: '45,892', trend: 'up', trendText: '+8%' },
      { label: 'Projects Submitted', value: '1,204', trend: 'up', trendText: '+24%' },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    stats: [
      { label: 'Course Progress', value: '75%', trend: 'up', trendText: '+5%' },
      { label: 'Streak Days', value: '12', trend: 'up' },
    ],
  },
};

export const Compact: Story = {
  args: {
    columns: 4,
    compact: true,
    stats: [
      { label: 'Users', value: '1,234' },
      { label: 'Lessons', value: '56' },
      { label: 'Projects', value: '12' },
      { label: 'Hours', value: '240' },
    ],
  },
};

export const WithTrends: Story = {
  args: {
    columns: 3,
    stats: [
      { label: 'Enrollments', value: '892', trend: 'up', trendText: '+18.5%' },
      { label: 'Dropouts', value: '23', trend: 'down', trendText: '-5.2%' },
      { label: 'Completion Rate', value: '94%', trend: 'neutral' },
    ],
  },
};
