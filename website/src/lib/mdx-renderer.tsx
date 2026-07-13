/**
 * ## Shared MDX Renderer
 *
 * Server component that renders MDX content with all remark/rehype plugins
 * configured for syntax highlighting, GFM support, heading anchor links, etc.
 *
 * Used by both systems and language chapter pages.
 *
 * @packageDocumentation
 */

import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { mdxComponents } from '@/components/mdx';

interface MdxRendererProps {
  source: string;
}

/**
 * Renders MDX content with all configured plugins.
 * Use this in any chapter page instead of using MDXRemote directly.
 */
export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMdx],
          rehypePlugins: [
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          ],
        },
      }}
    />
  );
}
