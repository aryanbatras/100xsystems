import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../__components/atoms/Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Status indicator badge for labels, tags, and counts. Supports multiple semantic variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'brand'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
    dot: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Completed',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'In Progress',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Failed',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'New',
  },
};

export const Brand: Story = {
  args: {
    variant: 'brand',
    children: 'Pro',
  },
};

export const WithDot: Story = {
  args: {
    variant: 'success',
    dot: true,
    children: 'Online',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Tiny',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    variant: 'brand',
    children: 'Enterprise',
  },
};
