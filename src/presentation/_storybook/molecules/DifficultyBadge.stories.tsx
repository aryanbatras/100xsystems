import type { Meta, StoryObj } from '@storybook/react';
import { DifficultyBadge } from '../../__components/molecules/DifficultyBadge';

const meta = {
  title: 'Molecules/DifficultyBadge',
  component: DifficultyBadge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DifficultyBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Beginner: Story = { args: { level: 'Beginner' } };
export const Intermediate: Story = { args: { level: 'Intermediate' } };
export const Advanced: Story = { args: { level: 'Advanced' } };
export const Small: Story = { args: { level: 'Easy', size: 'sm' } };
export const AllLevels: Story = {
  args: { level: 'Beginner' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <DifficultyBadge level="Beginner" />
      <DifficultyBadge level="Intermediate" />
      <DifficultyBadge level="Advanced" />
      <DifficultyBadge level="Easy" size="sm" />
      <DifficultyBadge level="Medium" size="sm" />
      <DifficultyBadge level="Hard" size="sm" />
    </div>
  ),
};
