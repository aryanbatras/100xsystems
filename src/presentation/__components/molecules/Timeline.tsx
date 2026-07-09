/**
 * ## Timeline
 *
 * Vertical timeline/steps for displaying sequential stages or phases.
 * Used in About pathway and process sections.
 *
 * @packageDocumentation
 */

import { cn } from '@/application/lib/utils';

export interface TimelineStep {
  /** Step number/identifier */
  number: string;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Optional icon */
  icon?: string;
}

export interface TimelineProps {
  /** Timeline steps */
  steps: TimelineStep[];
  /** Active step index (0-indexed, -1 for none) */
  activeStep?: number;
  /** Visual variant */
  variant?: 'default' | 'numbered' | 'compact';
  /** Additional class names */
  className?: string;
}

const variantStyles = {
  default: { connector: 'w-px bg-[#e5e5e5]', dot: 'w-3 h-3 bg-[#572EFF] ring-4 ring-white' },
  numbered: { connector: 'w-0.5 bg-[#e5e5e5]', dot: 'w-8 h-8 bg-[#f0f0ff] text-[#572EFF] border-2 border-[#e0e0ff]' },
  compact: { connector: 'w-px bg-[#e5e5e5]', dot: 'w-2 h-2 bg-[#d4d4d4]' },
};

/**
 * Vertical timeline for displaying sequential steps.
 *
 * @example
 * ```tsx
 * <Timeline
 *   variant="numbered"
 *   steps={[
 *     { number: '01', title: 'Foundation', description: 'Master one language.' },
 *     { number: '02', title: 'Architecture', description: 'Build systems.' },
 *   ]}
 * />
 * ```
 */
export function Timeline({
  steps,
  activeStep = -1,
  variant = 'default',
  className,
}: TimelineProps) {
  if (steps.length === 0) return null;

  return (
    <div className={cn('space-y-0', className)}>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = activeStep !== -1 && index < activeStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="flex gap-4">
            {/* Dot + Connector */}
            <div className="flex flex-col items-center">
              {variant === 'numbered' ? (
                <div className={cn(
                  'flex items-center justify-center rounded-full text-sm font-semibold shrink-0',
                  variantStyles.numbered.dot,
                  isActive && 'bg-[#572EFF] text-white border-[#572EFF]',
                  isCompleted && 'bg-[#22c55e] text-white border-[#22c55e]',
                )}>
                  {step.number}
                </div>
              ) : (
                <div className={cn(
                  'rounded-full shrink-0 mt-1.5',
                  variantStyles.default.dot,
                  isActive && 'bg-[#572EFF]',
                  isCompleted && 'bg-[#22c55e]',
                )} />
              )}
              {!isLast && (
                <div className={cn(
                  'flex-1 w-px min-h-[24px]',
                  variantStyles[variant].connector,
                )} />
              )}
            </div>

            {/* Content */}
            <div className={cn('pb-8', isLast && 'pb-0')}>
              <h3 className="text-sm font-semibold text-[#0a0a0a]">{step.title}</h3>
              <p className="mt-1 text-xs text-[#76777d] leading-relaxed">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
