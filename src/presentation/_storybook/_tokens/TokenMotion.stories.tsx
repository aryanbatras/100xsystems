import type { Meta, StoryObj } from '@storybook/react';
import { TokenMotion } from '../../__components/_tokens/TokenMotion';

const meta = {
  title: 'Tokens/Motion',
  component: TokenMotion,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem 1.5rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TokenMotion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
