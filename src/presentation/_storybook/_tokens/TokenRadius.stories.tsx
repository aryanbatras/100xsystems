import type { Meta, StoryObj } from '@storybook/react';
import { TokenRadius } from '../../__components/_tokens/TokenRadius';

const meta = {
  title: 'Tokens/Border Radius',
  component: TokenRadius,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenRadius>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
