import type { Meta, StoryObj } from '@storybook/react';
import { HomeHero } from '../../features/homeHero.feature';

/**
 * HomeHero — the main hero section of the landing page.
 *
 * Features an animated headline with accent text, a tagline,
 * a CTA button linking to products, and a scroll-down indicator
 * with a fade-in animation.
 */
const meta = {
  title: 'Organisms/HomeHero',
  component: HomeHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Primary hero section for the 100xSystems landing page. Displays the brand headline "Build. Ship. Scale. Repeat." with a prominent CTA button and an animated scroll indicator. Uses CSS modules and Framer Motion for entrance animations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HomeHero>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hero section — full-width with headline,
 * tagline, CTA button, and scroll indicator.
 */
export const Default: Story = {};
