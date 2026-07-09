import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../../__components/atoms/ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['brand', 'success', 'warning', 'error', 'neutral'] },
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
  decorators: [(Story) => <div className="w-80"><Story /></div>],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = { args: { value: 0 } };
export const Quarter: Story = { args: { value: 25 } };
export const Halfway: Story = { args: { value: 50 } };
export const AlmostDone: Story = { args: { value: 85 } };
export const Complete: Story = { args: { value: 100, variant: 'success' } };
export const WithLabel: Story = { args: { value: 67, showLabel: true } };
export const Indeterminate: Story = { args: {} };
export const Warning: Story = { args: { value: 45, variant: 'warning', showLabel: true } };
