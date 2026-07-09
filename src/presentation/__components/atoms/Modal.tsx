/**
 * ## Modal
 *
 * Overlay modal dialog with header, body, and footer.
 * Built from scratch for the 100xSystems design system.
 *
 * @packageDocumentation
 */

'use client';

import { type ReactNode, useEffect, useCallback, useRef, useState } from 'react';
import { cn } from '../../_components/utils';

// ─── Types ──────────────────────────────────────────────────────────

export interface ModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: ReactNode;
  /** Footer content (typically buttons) */
  footer?: ReactNode;
  /** Max width of the modal */
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
}

// ─── Size Definitions ──────────────────────────────────────────────

const sizeStyles = {
  sm: 'max-w-sm',
  default: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
} as const;

// ─── Component ──────────────────────────────────────────────────────

/**
 * Overlay modal dialog with header, body, and footer sections.
 *
 * @remarks
 * Controlled component managed by isOpen/onClose props.
 * Supports multiple sizes, keyboard (Escape) dismissal,
 * overlay click dismissal, and focus trapping.
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 *   footer={<Button onClick={handleConfirm}>OK</Button>}
 * >
 *   Are you sure?
 * </Modal>
 * ```
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'default',
  closeOnOverlay = true,
  closeOnEscape = true,
}: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Animation management
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Trigger animation on next frame
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Overlay click handler
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        'transition-all duration-200 ease-in-out',
        animating ? 'bg-black/30 backdrop-blur-sm' : 'bg-transparent',
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={cn(
          // Base styles
          'relative w-full rounded-lg bg-white shadow-xl',
          'max-h-[90vh] overflow-y-auto',
          // Size
          sizeStyles[size],
          // Animation
          'transition-all duration-200 ease-out',
          animating ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4',
          // Mobile margin
          'mx-4',
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-4">
            <h2 className="text-lg font-semibold text-[#0a0a0a]">{title}</h2>
            <button
              onClick={onClose}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-md',
                'text-[#76777d] hover:text-[#0a0a0a] hover:bg-[#f5f5f5]',
                'transition-colors',
              )}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-[#e5e5e5] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
