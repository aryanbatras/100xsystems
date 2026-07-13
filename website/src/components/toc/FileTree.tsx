/**
 * ## FileTree
 *
 * A minimal file-tree component for the table of contents outline.
 * — Single root folder with icon, sub-headings as plain indented text.
 * No file icons, no borders, purple accent for active items.
 *
 * Uses @radix-ui/react-accordion for the root folder expand/collapse.
 *
 * @packageDocumentation
 */

'use client';

import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Folder, FolderOpen } from 'lucide-react';
import { cn } from '@/application/lib/utils';

/** A heading node in the table of contents tree */
export type ToCNode = {
  id: string;
  text: string;
  level: number;
  children: ToCNode[];
};

/** Props for the FileTree component */
interface FileTreeProps {
  /** Tree-structured heading nodes (all children of the root folder) */
  nodes: ToCNode[];
  /** Currently active heading ID */
  activeId: string;
  /** Called when a heading is clicked */
  onSelect: (id: string) => void;
  /** Label for the root folder (defaults to "On this page") */
  rootLabel?: string;
  /** Additional classes */
  className?: string;
}

/**
 * Build a tree from a flat heading list.
 * h2 → root folder, h3 → nested under h2, h4 → nested under h3.
 */
export function buildHeadingTree(
  headings: { id: string; text: string; level: number }[]
): ToCNode[] {
  const root: ToCNode[] = [];
  const stack: ToCNode[] = [];

  for (const h of headings) {
    const node: ToCNode = { id: h.id, text: h.text, level: h.level, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= h.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    if (h.level <= 3) {
      stack.push(node);
    }
  }

  return root;
}

/**
 * FileTree — accordion-based outline with a single root folder icon.
 * Children are plain indented text with no icons.
 */
export function FileTree({ nodes, activeId, onSelect, rootLabel = 'On this page', className }: FileTreeProps) {
  const [controlledExpanded, setControlledExpanded] = useState<string[]>(['__root__']);

  if (nodes.length === 0) return null;

  return (
    <Accordion.Root
      type="multiple"
      value={controlledExpanded}
      onValueChange={setControlledExpanded}
      className={cn('flex flex-col', className)}
    >
      <Accordion.Item value="__root__" className="border-0">
        <Accordion.Header className="m-0">
          <Accordion.Trigger
            className={cn(
              'group flex items-center gap-2 w-full text-left text-sm leading-snug transition-all duration-200 border-0 cursor-pointer',
              'text-fg-secondary hover:text-fg',
            )}
          >
            {/* Folder icon — closed when collapsed, open when expanded */}
            <span className="shrink-0 w-4 h-4 flex items-center justify-center group-data-[state=closed]:flex group-data-[state=open]:hidden">
              <Folder className="w-3.5 h-3.5 text-fg-muted" />
            </span>
            <span className="shrink-0 w-4 h-4 flex items-center justify-center group-data-[state=closed]:hidden group-data-[state=open]:flex">
              <FolderOpen className="w-3.5 h-3.5 text-accent" />
            </span>

            <span className="flex-1 min-w-0 truncate text-xs font-bold uppercase tracking-wider text-fg-secondary">
              {rootLabel}
            </span>
          </Accordion.Trigger>
        </Accordion.Header>

        <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
          <div className="ml-2 pl-3 border-l border-gray-100 space-y-px py-2">
            {nodes.map((node) => (
              <ToCItem
                key={node.id}
                node={node}
                activeId={activeId}
                onSelect={onSelect}
                depth={1}
              />
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
}

/** Recursive ToC item — no icons, just indented text */
function ToCItem({
  node,
  activeId,
  onSelect,
  depth,
}: {
  node: ToCNode;
  activeId: string;
  onSelect: (id: string) => void;
  depth: number;
}) {
  const isActive = node.id === activeId;
  const hasChildren = node.children.length > 0;

  const indentClass = depth === 1 ? 'pl-0' : depth === 2 ? 'pl-4' : 'pl-8';

  return (
    <div>
      <button
        onClick={() => onSelect(node.id)}
        className={cn(
          'flex items-center w-full text-left text-sm leading-relaxed transition-all duration-150 py-1.5 border-0',
          indentClass,
          isActive
            ? 'text-accent font-bold'
            : 'text-fg-secondary hover:text-fg',
        )}
      >
        <span className="flex-1 min-w-0">{node.text}</span>
      </button>

      {hasChildren && (
        <div className="space-y-px">
          {node.children.map((child) => (
            <ToCItem
              key={child.id}
              node={child}
              activeId={activeId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
