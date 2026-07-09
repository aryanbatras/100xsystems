import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../../__components/atoms/Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Animated loading spinner with multiple sizes and color variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['brand', 'neutral', 'white'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Brand: Story = {
  args: {
    variant: 'brand',
    size: 'default',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    size: 'default',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
    size: 'default',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Fetching data...',
    size: 'lg',
  },
};
