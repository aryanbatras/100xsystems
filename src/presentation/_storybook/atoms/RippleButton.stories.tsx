import type { Meta, StoryObj } from '@storybook/react';
import { RippleButton } from '@/presentation/__components/atoms/RippleButton';

const meta = {
  title: 'Atoms/RippleButton',
  component: RippleButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    rippleColor: { control: 'color' },
    duration: { control: 'text' },
  },
} satisfies Meta<typeof RippleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Click Me' },
};

export const CustomColor: Story = {
  args: {
    children: 'Purple Ripple',
    rippleColor: 'rgba(124, 58, 237, 0.3)',
  },
};

export const SlowRipple: Story = {
  args: {
    children: 'Slow Ripple',
    duration: '1200ms',
  },
};

export const FastRipple: Story = {
  args: {
    children: 'Fast Ripple',
    duration: '300ms',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <RippleButton>Default</RippleButton>
      <RippleButton rippleColor="rgba(124, 58, 237, 0.3)">Purple</RippleButton>
      <RippleButton rippleColor="rgba(239, 68, 68, 0.3)">Red</RippleButton>
      <RippleButton rippleColor="rgba(34, 197, 94, 0.3)">Green</RippleButton>
    </div>
  ),
};
