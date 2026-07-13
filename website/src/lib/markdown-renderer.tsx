/**
 * ## MarkdownRenderer
 *
 * Beautiful Markdown renderer using react-markdown with remark-gfm.
 * Renders pure Markdown files with syntax highlighting (IDE-like colors),
 * and custom components for KnowledgeCheck blocks.
 *
 * @packageDocumentation
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import type { Components } from 'react-markdown';
import { KnowledgeCheck } from '@/components/mdx/KnowledgeCheck';

interface MarkdownRendererProps {
  source: string;
}

/** Custom components for beautiful markdown rendering */
const components: Components = {
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const lang = match ? match[1] : '';

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

    // Code block with syntax highlighting — IDE-like white bg + colorful tokens
    return (
      <div className="group relative my-6 border border-gray-200 rounded-none overflow-hidden">
        {lang && (
          <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
            <span>{lang}</span>
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-[1.6] bg-white">
          <code className={`${className || ''} hljs`} {...props}>
            {children}
          </code>
        </pre>
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
    <a href={href} className="font-semibold text-accent hover:underline" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} {...props}>
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

/**
 * Renders Markdown content with syntax highlighting and beautiful components.
 */
export function MarkdownRenderer({ source }: MarkdownRendererProps) {
  return (
    <>
      {/* highlight.js theme — light/IDE-like */}
      <style>{`
        .hljs { color: #1e293b; background: transparent; }
        .hljs-keyword { color: #7c3aed; }        /* purple — keywords */
        .hljs-string { color: #059669; }          /* green — strings */
        .hljs-number { color: #d97706; }          /* amber — numbers */
        .hljs-comment { color: #94a3b8; font-style: italic; } /* slate — comments */
        .hljs-function { color: #2563eb; }        /* blue — functions */
        .hljs-title { color: #2563eb; }           /* blue — titles */
        .hljs-built_in { color: #0891b2; }        /* cyan — built-ins */
        .hljs-type { color: #7c3aed; }            /* purple — types */
        .hljs-literal { color: #d97706; }         /* amber — literals */
        .hljs-attr { color: #ca8a04; }            /* yellow — attributes */
        .hljs-selector-class { color: #2563eb; }  /* blue — class selectors */
        .hljs-selector-tag { color: #7c3aed; }    /* purple — tag selectors */
        .hljs-meta { color: #0891b2; }            /* cyan — meta */
        .hljs-punctuation { color: #64748b; }     /* slate — punctuation */
        .hljs-tag { color: #7c3aed; }             /* purple — HTML tags */
        .hljs-name { color: #7c3aed; }            /* purple — tag names */
        .hljs-attribute { color: #ca8a04; }       /* yellow — HTML attributes */
        .hljs-deletion { color: #dc2626; }        /* red — deletions */
        .hljs-addition { color: #059669; }        /* green — additions */
        .hljs-variable { color: #d97706; }        /* amber — variables */
        .hljs-params { color: #1e293b; }          /* dark — params */
        .hljs-section { color: #2563eb; }         /* blue — markdown headings */
        .hljs-link { color: #059669; }            /* green — links */
        .hljs-regexp { color: #059669; }          /* green — regex */
        .hljs-symbol { color: #d97706; }          /* amber — symbols */
        .hljs-bullet { color: #64748b; }          /* slate — bullets */
        .hljs-code { color: #1e293b; }            /* dark — code */
        .hljs-emphasis { font-style: italic; }
        .hljs-strong { font-weight: bold; }
      `}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypeHighlight,
        ]}
        components={components}
      >
        {source}
      </ReactMarkdown>
    </>
  );
}
