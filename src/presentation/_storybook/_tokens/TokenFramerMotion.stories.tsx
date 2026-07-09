import type { Meta, StoryObj } from '@storybook/react';
import { TokenFramerMotion } from '../../__components/_tokens/TokenFramerMotion';

const meta = {
  title: 'Tokens/Framer Motion',
  component: TokenFramerMotion,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem 1.5rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TokenFramerMotion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
