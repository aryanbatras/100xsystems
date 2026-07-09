import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@/presentation/__components/ui/progress';

const meta = {
  title: 'Atoms/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { value: 0 } };
export const Quarter: Story = { args: { value: 25 } };
export const Halfway: Story = { args: { value: 50 } };
export const AlmostDone: Story = { args: { value: 85 } };
export const Complete: Story = { args: { value: 100 } };
