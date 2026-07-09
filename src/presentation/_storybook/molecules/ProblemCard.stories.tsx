import type { Meta, StoryObj } from '@storybook/react';
import { ProblemCard } from '../../__components/molecules/ProblemCard';

const meta = {
  title: 'Molecules/ProblemCard',
  component: ProblemCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[500px]"><Story /></div>],
} satisfies Meta<typeof ProblemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    order: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
  },
};

export const Expanded: Story = {
  args: {
    order: 7,
    title: 'Reverse Integer',
    difficulty: 'Medium',
    description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.',
    examples: ['Input: x = 123 → Output: 321', 'Input: x = -123 → Output: -321'],
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
  },
};

export const Theory: Story = {
  args: {
    order: 0,
    title: 'Introduction to Big O Notation',
    difficulty: 'Theory',
    description: 'Understanding time and space complexity analysis for algorithm efficiency measurement.',
  },
};
