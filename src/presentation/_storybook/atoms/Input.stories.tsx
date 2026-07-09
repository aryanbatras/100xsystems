import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/presentation/__components/ui/input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Enter your name', className: 'w-80' },
};

export const WithValue: Story = {
  args: { value: 'John Doe', className: 'w-80', onChange: () => {} },
};

export const WithEmail: Story = {
  args: { type: 'email', placeholder: 'you@example.com', className: 'w-80' },
};

export const Disabled: Story = {
  args: { value: 'Cannot edit', disabled: true, className: 'w-80' },
};

export const WithPassword: Story = {
  args: { type: 'password', placeholder: 'Enter password', className: 'w-80' },
};
