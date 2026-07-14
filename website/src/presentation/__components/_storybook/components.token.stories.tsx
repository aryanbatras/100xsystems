import type { Meta, StoryObj } from '@storybook/react';
import { TokenColors, TokenTypography, TokenRadius, TokenInteractive, TokenLayout, TokenShadows, TokenSpacing, TokenIcon, TokenImage, AnimatedIcon } from '../components.token';

const meta = {
  title: 'Tokens',
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ padding: '3rem 1.5rem' }}><Story /></div>],
} satisfies Meta<typeof TokenColors>;

export default meta;

export const Colors: StoryObj = { render: () => <TokenColors /> };
export const Typography: StoryObj = { render: () => <TokenTypography /> };
export const Radius: StoryObj = { render: () => <TokenRadius /> };
export const Interactive: StoryObj = { render: () => <TokenInteractive /> };
export const Layout: StoryObj = { render: () => <TokenLayout /> };
export const Shadows: StoryObj = { render: () => <TokenShadows /> };
export const Spacing: StoryObj = { render: () => <TokenSpacing /> };
export const Icons: StoryObj = { render: () => <TokenIcon /> };
export const Images: StoryObj = { render: () => <TokenImage /> };
