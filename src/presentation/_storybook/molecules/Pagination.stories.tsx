import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../../__components/molecules/Pagination';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Page navigation with Previous/Next buttons and page info.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    compact: { control: 'boolean' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
    totalItems: 250,
    pageSize: 25,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: () => {},
    totalItems: 250,
    pageSize: 25,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: () => {},
    totalItems: 250,
  },
};

export const Compact: Story = {
  args: {
    currentPage: 3,
    totalPages: 20,
    onPageChange: () => {},
    compact: true,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {},
  },
};
