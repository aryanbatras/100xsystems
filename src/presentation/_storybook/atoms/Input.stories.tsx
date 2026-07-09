import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../__components/atoms/Input';


const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text input with label, error state, and icon support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
    helperText: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your name',
    className: 'w-80',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    className: 'w-80',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    value: '123',
    errorMessage: 'Password must be at least 8 characters',
    className: 'w-80',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    successMessage: 'Username is available',
    className: 'w-80',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Website',
    placeholder: 'https://',
    helperText: 'Enter your personal or company website URL',
    className: 'w-80',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Read Only',
    value: 'Cannot edit this',
    disabled: true,
    className: 'w-80',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: '🔍',
    className: 'w-80',
  },
};


