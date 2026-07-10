import type { Preview } from '@storybook/nextjs'
import '../../../../../app/globals.css'
import addonPerformancePanel from '@github-ui/storybook-addon-performance-panel'

const preview: Preview = {
  addons: [addonPerformancePanel()],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;