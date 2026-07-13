/**
 * ## All Components — Dynamic Story Index
 *
 * Automatically discovers all *.stories.tsx files (except itself) using
 * Vite's import.meta.glob and renders every story inline. No manual
 * wiring needed — adding or changing a story file is reflected here
 * immediately.
 *
 * @packageDocumentation
 */

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

// ── Type guard ──────────────────────────────────────────────────────
// A valid story export has a `render` function and an optional `name`.

interface StoryShape {
  name?: string;
  render: () => ReactNode;
}

function isStory(val: unknown): val is StoryShape {
  return (
    typeof val === 'object' &&
    val !== null &&
    typeof (val as Record<string, unknown>).render === 'function'
  );
}

// ── Dynamically discover every story file in this directory ──────────
// Uses Webpack's require.context (bundled by @storybook/nextjs) instead
// of Vite's import.meta.glob. Each module has the shape:
//   { default: { title, ... }, [StoryExport]: { name, render, ... }, ... }

const storyModules: Record<string, Record<string, unknown>> = {};

// @ts-expect-error — require.context is a Webpack-specific feature
const context = require.context('./', false, /\.stories\.tsx$/);
context.keys().forEach((key: string) => {
  if (!key.includes('_all')) {
    storyModules[key] = context(key) as Record<string, unknown>;
  }
});

const meta = {
  title: 'All Components',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

export const AllComponents: StoryObj = {
  name: 'All Components',
  render: () => {
    const sections = Object.entries(storyModules)
      // Exclude this file to avoid infinite recursion
      .filter(([path]) => !path.includes('_all'))
      // Sort by category title for consistent ordering
      .sort(([a], [b]) => {
        const aTitle =
          ((storyModules[a] as Record<string, any>)?.default?.title as string | undefined) ?? '';
        const bTitle =
          ((storyModules[b] as Record<string, any>)?.default?.title as string | undefined) ?? '';
        return aTitle.localeCompare(bTitle);
      });

    return (
      <div className="p-8 space-y-16 max-w-5xl mx-auto">
        {sections.map(([path, module]) => {
          const defaultExport = module.default as Record<string, unknown> | undefined;
          const metaTitle: string =
            (defaultExport?.title as string | undefined) ??
            path.replace('./', '').replace('.stories.tsx', '');

          const stories: Array<[string, StoryShape]> = Object.entries(module).filter(
            ([key, val]) => key !== 'default' && isStory(val),
          ) as Array<[string, StoryShape]>;

          // Skip sections with no stories
          if (stories.length === 0) return null;

          return (
            <section key={path}>
              <h2 className="text-lg font-bold text-fg mb-6 border-b border-border pb-3">
                {metaTitle}
              </h2>
              <div className="space-y-10">
                {stories.map(([key, story]) => {
                  const storyName: string = story.name ?? key.replace(/(Story|Demo)$/, '');

                  return (
                    <div key={key}>
                      <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-4">
                        {storyName}
                      </h3>
                      {story.render()}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    );
  },
};
