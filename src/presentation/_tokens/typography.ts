/**
 * ## Design Tokens: Typography
 *
 * Central typography scale for the 100xSystems design system.
 *
 * @packageDocumentation
 */

export const typography = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    display: "'Inter', system-ui, -apple-system, sans-serif",
  },

  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: '1.1',
    normal: '1.4',
    relaxed: '1.6',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

export type TypographyFontKey = keyof typeof typography.fontFamily;
export type TypographySizeKey = keyof typeof typography.fontSize;
export type TypographyWeightKey = keyof typeof typography.fontWeight;
