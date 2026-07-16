import type { Metadata } from 'next';
import { getAllCliDocs, getCliDocsIndexContent } from '@/lib/cli-docs';
import { CliDocsListing } from './CliDocsListing';
import { MarkdownRenderer } from '@/lib/markdown-renderer';

export const metadata: Metadata = {
  title: 'CLI Docs',
  description: 'Complete documentation for the 100xSystems CLI — every command explained with usage, examples, and options.',
};

export default function CliDocsIndexPage() {
  const docs = getAllCliDocs();
  const indexContent = getCliDocsIndexContent();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-fg">
            CLI Documentation
          </h1>
          <p className="text-base text-fg-secondary leading-relaxed max-w-xl">
            Complete documentation for the <strong className="text-fg">100xSystems CLI</strong> — every command explained with usage, examples, and options.
          </p>
        </div>

        {indexContent && (
          <div className="prose max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-[1.5rem] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[1.25rem] prose-h3:mt-8 prose-h3:mb-3 prose-p:mb-4 prose-a:text-accent prose-a:font-semibold prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.875em] prose-code:rounded prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:rounded-none prose-pre:bg-gray-50 prose-strong:text-fg prose-li:mb-1 prose-table:border prose-table:border-gray-200 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-100 mb-12 text-fg-secondary [&_code]:before:content-none [&_code]:after:content-none">
            <MarkdownRenderer source={indexContent} />
          </div>
        )}

        <CliDocsListing docs={docs} />
      </div>
    </div>
  );
}
