import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/presentation/__components/ui/button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'outline', 'ghost'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'default', children: 'Get Started' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Learn More' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
};

export const Small: Story = {
  args: { size: 'sm', children: 'Small Button' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large Action' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Get Started</Button>
      <Button variant="outline">Learn More</Button>
      <Button variant="ghost">Cancel</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};
