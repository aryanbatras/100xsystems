import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from '../../__components/molecules/CodeBlock';

const sampleCode = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
function fibMemo(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}`;

const sampleHTML = `<div class="container">
  <header>
    <h1>Hello World</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
</div>`;

const meta = {
  title: 'Molecules/CodeBlock',
  component: CodeBlock,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'text' },
    showLineNumbers: { control: 'boolean' },
    showCopy: { control: 'boolean' },
  },
  decorators: [(Story) => <div className="w-full max-w-2xl"><Story /></div>],
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const JavaScript: Story = {
  args: { code: sampleCode, language: 'TypeScript' },
};

export const HTML: Story = {
  args: { code: sampleHTML, language: 'HTML' },
};

export const WithoutLineNumbers: Story = {
  args: { code: 'console.log("hello world");', language: 'JavaScript', showLineNumbers: false },
};

export const WithHeader: Story = {
  args: { code: sampleCode, language: 'TypeScript', header: 'fibonacci.ts' },
};

export const ShortSnippet: Story = {
  args: { code: 'npm install @storybook/react', language: 'bash', showLineNumbers: false },
};
