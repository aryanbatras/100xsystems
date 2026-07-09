import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../../__components/molecules/SearchInput';

const meta = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Search input with magnifying glass icon and clear button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    showClear: { control: 'boolean' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search lessons...',
    value: '',
    onChange: () => {},
    className: 'w-80',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search...',
    value: 'React components',
    onChange: () => {},
    className: 'w-80',
  },
};

export const WithoutClear: Story = {
  args: {
    placeholder: 'Search...',
    value: '',
    onChange: () => {},
    showClear: false,
    className: 'w-80',
  },
};
