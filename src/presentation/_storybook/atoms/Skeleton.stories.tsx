import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonBlock } from '../../__components/atoms/Skeleton';

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLine: Story = {
  args: { className: 'h-4 w-64' },
};

export const AvatarCircle: Story = {
  args: { width: '48px', height: '48px', rounded: 'full' },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border border-[#e5e5e5] p-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  ),
};

export const SkeletonBlockStory: Story = {
  name: 'SkeletonBlock',
  render: () => (
    <div className="w-80">
      <SkeletonBlock lines={3} avatar />
    </div>
  ),
};
