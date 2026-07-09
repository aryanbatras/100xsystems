/**
 * ## Design Tokens: Colors
 *
 * Central color palette for the 100xSystems design system.
 * All components should reference these tokens rather than hardcoding colors.
 *
 * @packageDocumentation
 */

export const colors = {
  /** Brand primary — deep purple */
  brand: {
    50: '#f0f0ff',
    100: '#e0e0ff',
    200: '#c4b5ff',
    300: '#a78bfa',
    400: '#8b5cf6',
    500: '#572EFF',
    600: '#4625CC',
    700: '#3A1FA8',
    800: '#2D1985',
    900: '#201361',
  },

  /** Neutral grays */
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    150: '#efefef',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#76777d',
    600: '#5c5d63',
    700: '#45464d',
    800: '#2d2e33',
    900: '#0a0a0a',
  },

  /** Semantic colors for status indicators */
  semantic: {
    success: '#22c55e',
    successBg: '#f0fdf4',
    warning: '#f59e0b',
    warningBg: '#fffbeb',
    error: '#ef4444',
    errorBg: '#fef2f2',
    info: '#3b82f6',
    infoBg: '#eff6ff',
  },

  /** Text colors */
  text: {
    primary: '#0a0a0a',
    secondary: '#76777d',
    tertiary: '#a3a3a3',
    inverse: '#ffffff',
    link: '#572EFF',
    linkHover: '#4625CC',
  },

  /** Background colors */
  bg: {
    page: '#ffffff',
    section: '#fafafa',
    card: '#ffffff',
    elevated: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.3)',
  },

  /** Border colors */
  border: {
    light: '#e5e5e5',
    medium: '#d4d4d4',
    focus: '#572EFF',
  },
} as const;

export type ColorKey = keyof typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type NeutralColor = keyof typeof colors.neutral;
export type SemanticColor = keyof typeof colors.semantic;
