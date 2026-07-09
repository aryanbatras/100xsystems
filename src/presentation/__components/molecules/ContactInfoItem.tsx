/**
 * ## ContactInfoItem
 *
 * Contact information display item with label and value.
 * Used in Contact pages for email, hours, social links.
 *
 * @packageDocumentation
 */

import { type ReactNode } from 'react';
import { cn } from '../../_components/utils';

export interface ContactInfoItemProps {
  /** Contact type label */
  label: string;
  /** Contact value/content */
  value: ReactNode;
  /** Optional icon */
  icon?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Contact information display item.
 *
 * @example
 * ```tsx
 * <ContactInfoItem label="Email" value="admin@100xsystems.dev" icon="✉️" />
 * <ContactInfoItem label="Hours" value="Mon-Fri: 9AM-6PM EST" />
 * ```
 */
export function ContactInfoItem({
  label,
  value,
  icon,
  className,
}: ContactInfoItemProps) {
  return (
    <div className={cn('py-4 border-b border-[#e5e5e5] last:border-b-0', className)}>
      <div className="flex items-start gap-3">
        {icon && <span className="text-lg mt-0.5 shrink-0">{icon}</span>}
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a3a3a3] block mb-1">
            {label}
          </span>
          <div className="text-sm text-[#0a0a0a]">{value}</div>
        </div>
      </div>
    </div>
  );
}
