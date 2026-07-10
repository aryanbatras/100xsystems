import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../**/*.mdx',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
    '@github-ui/storybook-addon-performance-panel',
  ],
  framework: '@storybook/nextjs',
  staticDirs: ['../../../../../public'],
};

export default config;
