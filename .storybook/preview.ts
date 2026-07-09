import type { Preview } from '@storybook/react';
import '../src/pages/globals.css';
import '../src/presentation/_tokens/design-tokens.css';

const preview: Preview = {
  parameters: {
    designToken: {
      defaultTab: 'Colors',
      styleInjection:
        '@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile 375',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet 768',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop 1280',
          styles: { width: '1280px', height: '800px' },
        },
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
        { name: 'gray', value: '#fafafa' },
      ],
    },
  },
};

export default preview;
