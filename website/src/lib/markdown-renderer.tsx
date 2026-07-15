/**
 * ## MarkdownRenderer
 *
 * Beautiful Markdown renderer using react-markdown with remark-gfm and
 * react-syntax-highlighter for code blocks. No borders, clean typography.
 *
 * @packageDocumentation
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';
import type { CodeTheme } from '@/lib/reading-context';
import { KnowledgeCheck } from '@/components/mdx/KnowledgeCheck';
import { MermaidDiagram } from '@/components/mdx/MermaidDiagram';

interface MarkdownRendererProps {
  source: string;
  codeTheme?: CodeTheme;
}

const codeThemeStyles: Record<CodeTheme, any> = {
  oneLight,
  github,
  coy,
};

/** Custom components for beautiful markdown rendering */
function createComponents(theme: CodeTheme): Components {
  const hlTheme = codeThemeStyles[theme] || oneLight;

  return {
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const lang = match ? match[1] : '';

      // Handle mermaid diagram blocks
      if (lang === 'mermaid') {
        const chart = String(children).replace(/\n$/, '');
        return <MermaidDiagram chart={chart} />;
      }

      // Handle knowledgecheck fenced blocks
      if (lang === 'knowledgecheck') {
        try {
          const data = JSON.parse(String(children).replace(/\n$/, ''));
          return (
            <KnowledgeCheck
              question={data.question}
              explanation={data.explanation}
            />
          );
        } catch {
          return <pre className="text-sm text-red-500">Invalid KnowledgeCheck format</pre>;
        }
      }

      // Inline code
      if (!lang && !className) {
        return (
          <code className="px-1.5 py-0.5 text-[0.875em] font-mono rounded text-pink-600 bg-pink-50" {...props}>
            {children}
          </code>
        );
      }

      // Code block with react-syntax-highlighter — no borders, no line numbers, wrap long lines
      return (
        <div className="group relative my-6 overflow-hidden">
          {lang && (
            <div className="flex items-center gap-2 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50/80 border-b border-gray-100">
              <span>{lang}</span>
            </div>
          )}
          <SyntaxHighlighter
            style={hlTheme}
            language={lang || 'text'}
            PreTag="div"
            wrapLongLines
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              padding: '1.25rem 1.5rem',
              fontSize: '0.8125rem',
              lineHeight: '1.7',
              borderRadius: 0,
              border: 'none',
              background: '#f8f9fa',
            }}
            codeTagProps={{
              style: {
                background: 'transparent',
                padding: 0,
                border: 'none',
              },
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      );
    },

    h1: ({ children, ...props }) => (
      <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-12 mb-6 leading-tight" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-[1.625rem] lg:text-[1.875rem] font-bold tracking-tight mt-14 mb-5 leading-tight" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-[1.25rem] lg:text-[1.375rem] font-bold tracking-tight mt-10 mb-3" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="text-base font-bold mt-8 mb-2" {...props}>
        {children}
      </h4>
    ),

    p: ({ children, ...props }) => (
      <p className="mb-6 leading-[1.75]" {...props}>
        {children}
      </p>
    ),

    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="font-semibold text-accent hover:underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),

    ul: ({ children, ...props }) => (
      <ul className="mb-6 pl-6 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-6 pl-6 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-[1.75]" {...props}>
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-[3px] border-l-accent bg-accent/5 py-4 px-6 my-6 not-italic leading-[1.75]" {...props}>
        {children}
      </blockquote>
    ),

    hr: (props) => (
      <hr className="my-12 border-gray-200" {...props} />
    ),

    img: ({ src, alt, ...props }) => (
      <img src={src} alt={alt || ''} className="my-10 mx-auto max-w-full h-auto" loading="lazy" {...props} />
    ),

    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gray-50" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 border-b border-gray-200" {...props}>
        {children}
      </td>
    ),

    strong: ({ children, ...props }) => (
      <strong className="font-bold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
  };
}

/**
 * Renders Markdown content with react-syntax-highlighter code blocks.
 */
export function MarkdownRenderer({ source, codeTheme = 'oneLight' }: MarkdownRendererProps) {
  const components = React.useMemo(() => createComponents(codeTheme), [codeTheme]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      ]}
      components={components}
    >
      {source}
    </ReactMarkdown>
  );
}
