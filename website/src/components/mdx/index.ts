/**
 * ## MDX Components
 *
 * Custom React components used within MDX content files.
 * These are passed to MDXRemote as the `components` prop.
 *
 * @packageDocumentation
 */

// Explicit imports (needed because re-exports don't create local bindings)
import { LanguageTabs, TabItem, useLanguageContext } from './LanguageTabs';
import { KnowledgeCheck } from './KnowledgeCheck';

// Re-export for convenience
export { LanguageTabs, TabItem, useLanguageContext } from './LanguageTabs';
export { KnowledgeCheck } from './KnowledgeCheck';

/**
 * Default MDX components map — pass this to MDXRemote.
 * Add any custom component you want available in MDX files here.
 */
export const mdxComponents = {
  LanguageTabs,
  TabItem,
  KnowledgeCheck,
};
