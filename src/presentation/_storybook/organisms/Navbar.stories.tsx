import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '../../features/navbar.feature';

/**
 * Navbar — main site navigation with responsive mobile menu
 * and theme switching based on route context.
 *
 * Uses `next/router` (mocked automatically by `@storybook/nextjs`).
 * The router `pathname` controls which theme variant is shown:
 * - Dark theme: home, about, contact pages
 * - Light/white theme: articles, roadmaps, resources, groups, etc.
 */
const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main site navigation bar. Supports dark/light theme variants, responsive mobile menu with hamburger toggle, and dropdown navigation menus. The theme switches automatically based on the current route.',
      },
    },
    nextjs: {
      appDirectory: false,
      router: {
        pathname: '/',
        asPath: '/',
        query: {},
        push: () => Promise.resolve(true),
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dark theme navbar — shown on the home page,
 * about page, and other landing-style pages.
 */
export const Default: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/',
        asPath: '/',
      },
    },
    backgrounds: { default: 'dark' },
  },
};

/**
 * Light/white theme navbar — shown on content pages
 * like articles, roadmaps, resources, groups.
 */
export const ContentPage: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/roadmaps',
        asPath: '/roadmaps',
      },
    },
    backgrounds: { default: 'light' },
  },
};

/**
 * Hidden state — the navbar renders an empty `<div>`
 * when on a static article detail page (`/articles/[slug]`).
 */
export const HiddenOnArticle: Story = {
  parameters: {
    nextjs: {
      router: {
        pathname: '/articles/[slug]',
        asPath: '/articles/getting-started',
        query: { slug: 'getting-started' },
      },
    },
  },
};
