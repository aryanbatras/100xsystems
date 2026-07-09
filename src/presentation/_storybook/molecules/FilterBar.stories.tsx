import type { Meta, StoryObj } from '@storybook/react';
import { FilterBar } from '../../__components/molecules/FilterBar';

const meta = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Search + filter control bar combining SearchInput with additional controls.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchValue: '',
    onSearchChange: () => {},
    searchPlaceholder: 'Search...',
  },
};

export const WithResults: Story = {
  args: {
    searchValue: 'react',
    onSearchChange: () => {},
    searchPlaceholder: 'Search lessons...',
    resultCount: 24,
  },
};

export const WithFilters: Story = {
  args: {
    searchValue: '',
    onSearchChange: () => {},
    searchPlaceholder: 'Search...',
    children: (
      <select className="rounded-lg border border-[#e5e5e5] px-3 py-2 text-sm bg-white">
        <option value="all">All Categories</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    ),
  },
};
