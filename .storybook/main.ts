import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/presentation/_storybook/**/*.mdx',
    '../src/presentation/_storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@chromatic-com/storybook',
  ],
  framework: '@storybook/nextjs',
  staticDirs: ['../public'],
};

export default config;
