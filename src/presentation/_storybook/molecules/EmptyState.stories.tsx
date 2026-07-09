import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '../../__components/molecules/EmptyState';

const meta = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: '📚',
    title: 'No articles yet',
    description: 'Articles will appear here once they are published.',
  },
};

export const WithAction: Story = {
  args: {
    icon: '🔍',
    title: 'No results found',
    description: 'Try adjusting your search terms or filters.',
    action: <button className="rounded-lg bg-[#572EFF] px-4 py-2 text-sm text-white font-medium hover:bg-[#4625CC] transition-colors">Clear Filters</button>,
  },
};

export const Compact: Story = {
  args: {
    icon: '📝',
    title: 'No projects',
    compact: true,
  },
};

export const NoIcon: Story = {
  args: {
    title: 'Nothing here yet',
    description: 'This section is empty. Check back later for updates.',
  },
};
