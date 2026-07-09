import type { Meta, StoryObj } from '@storybook/react';
import { TokenGallery } from '../../__components/_tokens/TokenGallery';

const meta = {
  title: 'Tokens/Gallery',
  component: TokenGallery,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
