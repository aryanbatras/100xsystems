/**
 * ## TokenGallery
 *
 * Composite token display that renders all design tokens (colors, typography,
 * spacing, shadows, border radius) in a single page. Use this for a full
 * visual audit of the design system.
 *
 * @packageDocumentation
 */

import { cn } from '../../_components/utils';
import { TokenColors } from './TokenColors';
import { TokenTypography } from './TokenTypography';
import { TokenSpacing } from './TokenSpacing';
import { TokenShadows } from './TokenShadows';
import { TokenRadius } from './TokenRadius';

export interface TokenGalleryProps {
  className?: string;
}

/**
 * Full design token gallery — all tokens in one view.
 */
export function TokenGallery({ className }: TokenGalleryProps) {
  return (
    <div className={cn('max-w-4xl mx-auto', className)}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#e0e0e0] mb-1">Design Tokens</h1>
        <p className="text-sm text-[#888]">
          All design tokens defined in <code className="text-[#572EFF] text-xs font-mono">globals.css</code>.
          These values drive every component in the system.
        </p>
      </div>
      <div className="space-y-6">
        <TokenColors />
        <TokenTypography />
        <TokenSpacing />
        <TokenShadows />
        <TokenRadius />
      </div>
    </div>
  );
}
