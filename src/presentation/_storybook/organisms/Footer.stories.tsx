import type { Meta, StoryObj } from '@storybook/react';
import { Footer, FooterLinks } from '../../features/footer.feature';

/**
 * Footer — site-wide footer with logo and optional link sections.
 *
 * Two components are documented here:
 * - `Footer` — simple footer with the 100xSystems logo
 * - `FooterLinks` — expanded footer with navigation link sections
 */
const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Site footer with the 100xSystems branding. The `FooterLinks` sub-component provides expanded navigation with link sections for Platform, Design Patterns, Development, DevOps, Resources, Community, and more.',
      },
    },
  },
  tags: ['autodocs'],
  subcomponents: { FooterLinks },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Simple footer with just the 100xSystems logo and branding.
 * Used on landing pages and as the main site footer.
 */
export const Default: Story = {};

/**
 * Expanded footer with full navigation link sections.
 * Includes links for Platform, System Architecture, Design Patterns,
 * Development, DevOps, Resources, Community, Connect, and Legal.
 */
export const WithLinks: Story = {
  render: () => (
    <div>
      <FooterLinks />
      <Footer />
    </div>
  ),
};
