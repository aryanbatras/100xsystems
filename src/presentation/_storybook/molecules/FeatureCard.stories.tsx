import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from '../../__components/molecules/FeatureCard';

const meta = {
  title: 'Molecules/FeatureCard',
  component: FeatureCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-72"><Story /></div>],
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { icon: '🚀', title: 'Systems Thinking', description: 'Learn to architect scalable solutions and understand trade-offs engineers make every day.' },
};
export const WithNumber: Story = {
  args: { icon: '⚛️', title: 'React Fundamentals', description: 'Master components, state, and props.', number: 1 },
};
export const Elevated: Story = {
  args: { variant: 'elevated', icon: '📊', title: 'Data Structures', description: 'Arrays, trees, graphs, and hash maps explained.', number: '03' },
};
