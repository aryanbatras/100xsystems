import type { Meta, StoryObj } from '@storybook/react';
import { TokenSpacing } from '../../__components/_tokens/TokenSpacing';

const meta = {
  title: 'Tokens/Spacing',
  component: TokenSpacing,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenSpacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
