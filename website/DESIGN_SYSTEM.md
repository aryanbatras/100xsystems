# 100xSystems Design System

> Token-first, minimal, expressive. Built with Next.js 16, Tailwind CSS v4, and shadcn/ui.

---

## Table of Contents

- [Philosophy & Principles](#1-philosophy--principles)
- [Color System](#2-color-system)
- [Typography](#3-typography)
- [Spacing Scale](#4-spacing-scale)
- [Border Radius](#5-border-radius)
- [Shadows & Elevation](#6-shadows--elevation)
- [Breakpoints & Responsive](#7-breakpoints--responsive)
- [Interactive States](#8-interactive-states)
- [Icon System](#9-icon-system)
- [Component Architecture](#10-component-architecture)
  - [Token Components](#101-token-components)
  - [Atomic Components](#102-atomic-components)
  - [Composite Components](#103-composite-components)
  - [Layout Components](#104-layout-components)
  - [Animation Components](#105-animation-components)
  - [Page Components](#106-page-components)
- [Motion & Animation](#11-motion--animation)
- [Accessibility](#12-accessibility)
- [Code Conventions](#13-code-conventions)
- [Storybook](#14-storybook)
- [External Dependencies](#15-external-dependencies)

---

## 1. Philosophy & Principles

1. **Token-first.** Every visual property flows from a design token. No magic values.
2. **Generous spacing.** Large padding, big text, wide gaps. The system breathes.
3. **Monochromatic with purpose.** Purple (`#572EFF`) is the sole accent. Yellow (`#facc15`) serves as a secondary accent for highlights. Black and white with warm-tinted grays form the neutral palette.
4. **Square corners.** Border radius is `0` everywhere. Sharp edges are a deliberate identity choice.
5. **Subtle surface hierarchy.** Depth is created through `border`, `shadow-sm`, and background tints — never through rounded corners or heavy shadows.
6. **Animated icons.** Icons animate on interaction via `@animateicons/react`. Static Lucide-style SVGs are the fallback.
7. **Client-first.** All interactive components are `'use client'` with explicit state management.

---

## 2. Color System

### 2.1 Base Palette

| Token | Value | Tailwind Theme | CSS Variable |
|-------|-------|----------------|--------------|
| White | `#ffffff` | `--color-white` | `var(--color-white)` |
| Purple | `#7c3aed` | `--color-purple` | `var(--color-purple)` |
| Yellow | `#facc15` | `--color-yellow` | `var(--color-yellow)` |

### 2.2 Semantic Color Tokens (CSS Variables)

| Variable | Value | Role |
|----------|-------|------|
| `--bg-primary` | `#ffffff` | Default page background |
| `--bg-secondary` | `#f5f5f5` | Elevated surfaces, pill containers |
| `--bg-muted` | `#f0f0f0` | Subtle backgrounds, disabled states |
| `--bg-light` | `#fafafa` | Hover/active surface tint |
| `--text-primary` | `#0a0a0a` | Primary body text |
| `--text-secondary` | `#76777d` | Secondary text, metadata |
| `--text-tertiary` | `#45464d` | Tertiary text (between primary and muted) |
| `--text-muted` | `#a3a3a3` | Placeholder, disabled text |
| `--text-inverse` | `#ffffff` | Text on dark backgrounds |
| `--border` | `#e5e5e5` | Default borders |
| `--border-hover` | `#d4d4d4` | Hovered border state |
| `--accent` | `#572EFF` | Primary accent — buttons, links, active states |
| `--accent-hover` | `#4625CC` | Accent hover state |
| `--accent-active` | `#3A1FA8` | Accent active/pressed state |
| `--accent-yellow` | `#facc15` | Warning highlights, ripple variant |
| `--accent-bg` | `#f0f0ff` | Accent tinted background (alerts, badges) |

### 2.3 Tailwind v4 Theme Classes

Defined via `@theme inline` in `globals.css`:

| Tailwind Class | Maps To | Purpose |
|----------------|---------|---------|
| `bg-accent` / `text-accent` / `border-accent` | `--accent` | Primary accent |
| `bg-accent-hover` | `--accent-hover` | Accent hover |
| `bg-accent-active` | `--accent-active` | Accent pressed |
| `bg-accent-yellow` | `--accent-yellow` | Yellow accent surface |
| `bg-accent-bg` | `--accent-bg` | Accent background tint |
| `text-fg` | `--text-primary` | Primary foreground |
| `text-fg-secondary` | `--text-secondary` | Secondary foreground |
| `text-fg-tertiary` | `--text-tertiary` | Tertiary foreground |
| `text-fg-muted` | `--text-muted` | Muted foreground |
| `bg-surface` | `--bg-primary` | Default surface |
| `bg-surface-secondary` | `--bg-secondary` | Elevated surface |
| `bg-surface-muted` | `--bg-muted` | Muted surface |
| `bg-surface-light` | `--bg-light` | Light surface |
| `border-border` | `--border` | Default border |
| `border-border-hover` | `--border-hover` | Hover border |

### 2.4 Color Usage Rules

- **Buttons:** accent background with white text (`bg-accent text-white`). Ghost variant uses transparent background with hover accent-yellow underline.
- **Badges:** Three variants — purple (`bg-accent text-white`), yellow (`bg-accent-yellow text-black`), black (`bg-fg text-white`).
- **Alerts:** accent-tinted backgrounds (`bg-accent-bg` with `border-accent`). Warning variant uses `bg-accent-yellow/10 border-accent-yellow`.
- **Difficulty badges:** accent-bg for Beginner/Intermediate, fg (black) for Advanced/Hard, accent-yellow tint for Theory.
- **Module status:** accent-bg text-accent for in-progress, accent-bg text-white for completed.
- **Trend indicators:** accent color for both up and down trends (no green/red).
- **Text selection:** `::selection` uses accent background with inverse text color.

### 2.5 shadcn/ui Semantic Tokens

These are the standard shadcn/ui tokens also defined in `:root`:

| Variable | Value |
|----------|-------|
| `--background` | `oklch(1 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` |
| `--card` | `oklch(1 0 0)` |
| `--popover` | `oklch(1 0 0)` |
| `--primary` | `#000000` |
| `--primary-foreground` | `#ffffff` |
| `--secondary` | `oklch(0.97 0 0)` |
| `--muted` | `oklch(0.97 0 0)` |
| `--destructive` | `oklch(0.577 0.245 27.325)` |
| `--input` | `oklch(0.922 0 0)` |
| `--ring` | `oklch(0.708 0 0)` |

### 2.6 Scrollbar Styling

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--text-muted); }
::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); }
```

---

## 3. Typography

### 3.1 Font Family

**Plus Jakarta Sans** — the sole typeface. Used for all headings, body text, buttons, and labels.

```css
--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
```

### 3.2 Type Scale

| Tailwind Class | Rem | Pixels | Usage |
|----------------|-----|--------|-------|
| `text-[3.75rem]` / `text-6xl` | `3.75rem` | 60px | Display / hero headings |
| `text-[3rem]` / `text-5xl` | `3rem` | 48px | Page headings |
| `text-[2.25rem]` / `text-4xl` | `2.25rem` | 36px | Section headings (h1) |
| `text-[1.875rem]` / `text-3xl` | `1.875rem` | 30px | Sub-section headings (h2) |
| `text-[1.5rem]` / `text-2xl` | `1.5rem` | 24px | Card headings (h3) |
| `text-[1.25rem]` / `text-xl` | `1.25rem` | 20px | Component headings (h4) |
| `text-[1.125rem]` / `text-lg` | `1.125rem` | 18px | Large body / h5 |
| `text-[1rem]` / `text-base` | `1rem` | 16px | Default body / h6 |
| `text-[0.875rem]` / `text-sm` | `0.875rem` | 14px | Secondary body, buttons |
| `text-[0.75rem]` / `text-xs` | `0.75rem` | 12px | Metadata, captions |
| `text-[10px]` | `10px` | 10px | Labels, badges, overlines |

### 3.3 Font Weights

| Weight | CSS | Usage |
|--------|-----|-------|
| 300 | `font-light` | Light (sparingly, KineticText) |
| 400 | `font-normal` | Default body text |
| 500 | `font-medium` | Medium emphasis |
| 600 | `font-semibold` | Semibold headings |
| 700 | `font-bold` | Bold headings |
| 800 | `font-extrabold` | Extra bold (display, "100X SYSTEMS" logo) |

### 3.4 Heading Component Presets

| Variant | Font Size | Weight | Line Height | Letter Spacing |
|---------|-----------|--------|-------------|----------------|
| `h1` | `text-[2.25rem]` | `font-bold` | `leading-tight` | `tracking-tight` |
| `h2` | `text-[1.875rem]` | `font-semibold` | `leading-tight` | `tracking-tight` |
| `h3` | `text-[1.5rem]` | `font-semibold` | `leading-snug` | — |
| `h4` | `text-[1.25rem]` | `font-semibold` | `leading-snug` | — |
| `h5` | `text-[1.125rem]` | `font-medium` | `leading-snug` | — |
| `h6` | `text-[1rem]` | `font-medium` | `leading-snug` | — |

### 3.5 Text Component Presets

| Variant | Font Size | Color | Notes |
|---------|-----------|-------|-------|
| `body` | `text-sm` | `text-fg-tertiary` | `leading-relaxed` |
| `body-lg` | `text-base` | `text-fg-tertiary` | `leading-relaxed` |
| `body-sm` | `text-xs` | `text-fg-secondary` | `leading-normal` |
| `caption` | `text-[10px]` | `text-fg-secondary` | `font-medium uppercase tracking-wider` |
| `muted` | `text-xs` | `text-fg-secondary` | — |
| `code` | `text-sm` | `text-fg` | `font-mono`, `bg-surface-secondary rounded px-1.5 py-0.5` |

### 3.6 Typography Rules

- `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` are applied globally.
- `tracking-tight` on h1/h2 for display impact.
- `tracking-wider`, `tracking-widest` on uppercase labels and overlines.
- Code snippets use `font-mono` with a `bg-surface-secondary` tinted background.
- All page-level text, buttons, and labels use **UPPERCASE** with `tracking-wider` or `tracking-widest`.

---

## 4. Spacing Scale

Full Tailwind spacing scale is available. The following are the most frequently used in components:

| Class | Pixels | Typical Use |
|-------|--------|-------------|
| `gap-1` / `space-y-1` | 4px | Tight icon-label groups |
| `gap-1.5` | 6px | Breadcrumb separators, tag spacing |
| `gap-2` | 8px | Button icon spacing, compact card gaps |
| `gap-3` | 12px | Section spacing, card groups |
| `gap-4` | 16px | Section padding (compact) |
| `gap-5` | 20px | Grid gaps, default spacing |
| `gap-6` | 24px | Section spacing |
| `p-4` | 16px | Compact containers |
| `p-5` | 20px | Default container padding |
| `p-6` | 24px | Spacious containers |
| `p-8` | 32px | Card padding (pages) |
| `px-5 py-3` | 20x12px | Accordion headers |
| `px-6 py-5` | 24x20px | Accordion panels, FAQ items |
| `px-10 py-4` | 40x16px | Default Button |
| `px-12 py-5` | 48x20px | Large Button |
| `px-6 py-4` | 24x16px | Header height |
| `py-16 px-4` | 64x16px | Page section padding |

### Design Rule

**Padding is not optional.** Every component must have deliberate padding between its text and its edges. The default padding for interactive elements is no less than `px-4 py-1.5` for the smallest variants, scaling up generously for default and large sizes.

### Container Widths

| Width | Usage |
|-------|-------|
| `max-w-[1400px]` | Page containers, Header/Footer |
| `max-w-6xl` | Content areas (courses, blog) |
| `max-w-5xl` | Team, pricing, stats |
| `max-w-4xl` | Settings, search |
| `max-w-3xl` | FAQ, notifications |
| `max-w-2xl` | Checkout, single-column |
| `max-w-md` | Auth forms, donation |

---

## 5. Border Radius

**All border radius is `0`.** This is an intentional design choice for a sharp, modern, no-compromise aesthetic.

```css
--radius: 0;
--radius-sm: 0;
--radius-md: 0;
--radius-lg: 0;
--radius-xl: 0;
--radius-2xl: 0;
--radius-3xl: 0;
--radius-4xl: 0;
```

The sole exceptions are:
- **Count badges** — `rounded-full` for pill-shaped number indicators
- **Tags/Chips** — `rounded-full` for pill-shaped removable tags
- **Pill variant TabBar** — `rounded-full` container
- **Text code variant** — `rounded` for inline code highlights

---

## 6. Shadows & Elevation

### Standard

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Default button elevation, subtle card hover |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Elevated surfaces, hovered buttons |

### Custom

| Name | Value | Usage |
|------|-------|-------|
| **Inset** | `inset 0 2px 8px 0 rgb(0 0 0 / 0.08)` | Inner depth on surfaces |
| **Layered** | `0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)` | Elevated cards |
| **Inset subtle** | `inset 0 1px 3px rgba(0,0,0,0.06)` | Dropdown containers |
| **Inset -1px** | `inset -1px 0 0 rgba(0,0,0,0.04), 2px 0 8px -4px rgba(0,0,0,0.06)` | SidebarNav right edge |
| **Inset bottom** | `inset 0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -6px rgba(0,0,0,0.12)` | MobileNav dock |
| **Purple glow** | `0 4px 20px -8px rgba(87,46,255,0.15)` | Highlighted pricing card |

### Elevation Convention

| State | Style | Usage |
|-------|-------|-------|
| Default (ground) | `bg-white border border-border` | Cards, containers |
| Hover (lifted) | `hover:shadow-sm` | Interactive cards on hover |
| Active (pressed) | `shadow-none` | Button pressed state |
| Surface (background) | `bg-surface-secondary` | Pill containers, code blocks |

---

## 7. Breakpoints & Responsive

| Breakpoint | Min Width | Tailwind | Target |
|------------|-----------|----------|--------|
| Default | 0px | — | Mobile (portrait) |
| `sm` | 640px | `sm:` | Large phones / small tablets |
| `md` | 768px | `md:` | Tablets |
| `lg` | 1024px | `lg:` | Desktop |
| `xl` | 1280px | `xl:` | Wide desktop |
| `2xl` | 1536px | `2xl:` | Ultra-wide |

### Responsive Patterns

| Pattern | Classes | Behavior |
|---------|---------|----------|
| **DataGrid** | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-{n}` | Collapses to single column on mobile |
| **SidebarNav** | `hidden lg:block` | Hidden on mobile, visible on desktop |
| **MobileNav** | Fixed bottom dock | Only shown on mobile/tablet |
| **Header nav** | `hidden lg:flex` / `lg:hidden` | Desktop nav vs hamburger menu |
| **Spacing** | `p-5` on desktop, `p-4` on mobile | Compact on smaller screens |
| **Typography** | Font sizes stay consistent | Container widths adapt |

---

## 8. Interactive States

Every interactive element implements these states:

| State | Visual | Implementation |
|-------|--------|----------------|
| **Default** | Normal appearance | Base styles |
| **Hover** | `hover:bg-surface-secondary` / `hover:text-accent` | CSS transition |
| **Focus-visible** | `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` | Keyboard-only focus ring |
| **Active** | Darker background / `shadow-none` | Active variant |
| **Disabled** | `opacity-50` / `opacity-40` + `cursor-not-allowed` | `:disabled` pseudo-class |
| **Loading** | Spinner replaces icon/children | Internal `loading` prop |

### Focus Ring Convention

All focusable elements use:
```tsx
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
```

This ensures focus is visible only for keyboard navigation, never for mouse clicks.

### Cursor Types

| Cursor | Class | Usage |
|--------|-------|-------|
| Pointer | `cursor-pointer` | Clickable elements |
| Default | `cursor-default` | Normal arrow |
| Text | `cursor-text` | Text selection |
| Not allowed | `cursor-not-allowed` | Disabled elements |

---

## 9. Icon System

### 9.1 Static Icons (Fallback)

The `Icon` component renders 30+ named Lucide-style inline SVGs:

| Category | Icons |
|----------|-------|
| **Navigation** | `chevron-right`, `chevron-down`, `chevron-left`, `arrow-left`, `arrow-right`, `arrow-up`, `arrow-down`, `menu`, `more-vertical` |
| **Actions** | `x`, `check`, `plus`, `minus`, `edit`, `trash`, `copy`, `share`, `download`, `upload` |
| **Media & Content** | `search`, `image`, `file`, `folder`, `star`, `heart`, `bookmark`, `external-link` |
| **Info & Status** | `info`, `alert-circle`, `clock`, `settings`, `mail`, `user`, `globe` |

Usage: `<Icon name="search" size={20} />`

### 9.2 Animated Icons (Default)

The `AnimatedIcon` component wraps `@animateicons/react/lucide` and supports animated hover/state transitions:

```tsx
<AnimatedIcon name="search" size={20} isAnimated={true} />
```

The icon name is kebab-case and auto-resolved to the PascalCase component via `toPascalCase()` with an `Icon` suffix. Icons are cached in a `Map` for performance.

### 9.3 Icon Guidelines

- Default icon size for inline use: `16px` (sm), `20px` (default), `24px` (lg)
- Icons in buttons: `16x16` for sm, inline with text
- Icons in inputs: `20x20` at `pl-12` for the left icon slot
- Icons in headers/sections: `text-2xl` to `text-4xl`
- All icons use `currentColor` and inherit text color by default
- All static icons have `aria-hidden="true"`

---

## 10. Component Architecture

### Directory Structure

```
src/presentation/__components/
  components.token.tsx       → Design token display & AnimatedIcon wrapper
  components.atomic.tsx      → Smallest building blocks (Button, Input, Badge, etc.)
  components.composite.tsx   → Combined molecules & organisms (Accordion, Card, etc.)
  components.layout.tsx      → Full-width layouts (Header, SidebarNav, Footer, Dropdown)
  components.pages.tsx       → Page-level compositions (Auth, Pricing, Blog, etc.)
  components.animations.tsx  → Decorative animation effects (KineticText, CoolMode, etc.)
  index.ts                   → Flat barrel exports (no default exports)
  _storybook/                → Co-located stories
    config/
      main.ts                → Storybook config (Next.js framework)
      preview.tsx            → Global CSS import, controls config
    components.token.stories.tsx
    components.atomic.stories.tsx
    components.composite.stories.tsx
    components.pages.stories.tsx
    components.layout.stories.tsx
    animations.stories.tsx
    _all.stories.tsx          → Dynamic story index (auto-discovers all stories)
```

### 10.1 Token Components

Source: `components.token.tsx` (469 lines)

| Component | Description | Props |
|-----------|-------------|-------|
| `AnimatedIcon` | Animated icon wrapper using `@animateicons/react/lucide`. Auto-resolves kebab-case names to PascalCase components. | `name`, `size?` (20), `color?`, `isAnimated?` (true), `duration?`, `className?` |
| `TokenColors` | Displays palette (White, Purple, Yellow) and semantic color swatches in a grid. | `className?` |
| `TokenTypography` | Shows Plus Jakarta Sans font family, 6 weight samples, 8 font size samples. | `className?` |
| `TokenRadius` | Documents the square corners convention — single purple square example. | `className?` |
| `TokenInteractive` | Shows 3 cursor types and 5 interactive states (Default, Hover, Focus, Active, Disabled). | `className?` |
| `TokenLayout` | Demonstrates grid adaptation across Desktop (4-col), Tablet (2-col), Mobile (1-col). | `className?` |
| `TokenShadows` | Standard shadow-md + 2 custom shadows (Inset, Layered). | `className?` |
| `TokenSpacing` | Full spacing scale from `p-0` (0px) to `p-96` (384px) — 30 values in a 5-column grid. | `className?` |
| `TokenIcon` | Icon inventory grid showing all 30+ static icons in 4 categories, plus animated icon showcase with hover-to-animate. | `className?` |
| `TokenImage` | Image component with 6 aspect ratio variants: auto, 16/9, 4/3, 1/1, 3/2, 2/3. | `className?` |

### 10.2 Atomic Components

Source: `components.atomic.tsx` (924 lines)

| Component | Variants / Sizes | Props |
|-----------|-----------------|-------|
| **`Icon`** | 30+ named icons | `name: IconName`, `size?` (16), `className?`, `strokeWidth?` (2) |
| **`Image`** | aspectRatio: auto, 16/9, 4/3, 1/1, 3/2, 2/3; objectFit: cover, contain, fill | `src`, `alt`, `aspectRatio?`, `objectFit?`, `className?`, `fallback?` |
| **`Button`** | variant: primary, ghost, ripple, purpleGhost, yellowGhost; size: sm, default, lg | `variant?` (primary), `size?` (default), `loading?`, `icon?`, `iconPosition?` (left), `disabled?` |
| **`Input`** | border-bottom style with label, error, helper text, left/right icons | `label?`, `errorMessage?`, `helperText?`, `leftIcon?`, `rightIcon?`, `fullWidth?` (true) |
| **`Textarea`** | Like Input, multiline | `label?`, `errorMessage?`, `helperText?`, `fullWidth?` (true), `rows?` (4) |
| **`Badge`** | variant: purple, yellow, black; size: sm, default, lg; optional dot | `variant?` (purple), `size?` (default), `dot?` |
| **`Tag`** | variant: default, brand, success, outline; size: sm, default, lg; removable, selectable, clickable | `variant?` (default), `size?` (default), `removable?`, `selected?`, `onClick?`, `leadingIcon?` |
| **`Spinner`** | M3E Loading Indicator; sizes: lg (48px), xl (64px); variants: uncontained, contained | `size?` (lg), `variant?` (uncontained), `label?` ("Loading...") |
| **`Heading`** | variant: h1–h6 with matching size/weight presets; `as` for polymorphic rendering | `variant?` (h1), `as?`, `children` |
| **`Text`** | variant: body, body-lg, body-sm, caption, muted, code; `as` for polymorphic rendering | `variant?` (body), `as?`, `children` |
| **`Divider`** | Plain `<hr>` or with centered label | `label?`, `className?` |
| **`Select`** | Custom-styled select with chevron icon and error state | `label?`, `options`, `placeholder?`, `errorMessage?`, `fullWidth?` (true) |
| **`Toggle`** | Switch toggle with sm/default sizes | `checked`, `onChange`, `label?`, `disabled?`, `size?` (default) |
| **`ProgressBar`** | M3E Linear Progress: modes — determinate, indeterminate, buffer, query; variants — flat, wavy; sizes — sm (4px), default (6px), lg (10px) | `value?`, `max?` (100), `size?` (default), `mode?`, `bufferValue?`, `showLabel?`, `variant?` (flat) |
| **`CircularProgress`** | M3E Circular Progress; supports value display, flat/wavy variants | `value?`, `max?` (100), `size?` (48), `indeterminate?`, `variant?` (flat), `label?`, `showValue?` |
| **`Skeleton`** | Animated placeholder; uses `animate-pulse bg-border` | `className?` |
| **`SkeletonBlock`** | Preset for text lines + optional avatar circle | `lines?` (3), `avatar?` |
| **`SkeletonCard`** | Card-shaped skeleton with image area, title, description lines | `image?` (true), `lines?` (3) |
| **`SkeletonTable`** | Table-shaped skeleton with header and rows | `rows?` (5), `columns?` (4) |
| **`SkeletonForm`** | Form-shaped skeleton with multiple field rows | `fields?` (3) |

### Button Variants — Detailed Styles

| Variant | Background | Text | Hover | Active | Border |
|---------|-----------|------|-------|--------|--------|
| `primary` | `bg-accent` | `text-white` | `hover:bg-accent-hover` | `active:bg-accent-active` | none |
| `ghost` | transparent | `text-fg-secondary` | `hover:text-fg` + yellow underline | — | none |
| `ripple` | `bg-accent-yellow` | `text-black` | `hover:bg-yellow-400` | `active:bg-yellow-500` | none |
| `purpleGhost` | transparent | `text-fg-secondary` | `hover:bg-accent hover:text-white` | — | none |
| `yellowGhost` | transparent | `text-fg-secondary` | `hover:bg-accent-yellow hover:text-black` | — | none |

### Button Sizes

| Size | Padding | Font Size | Gap |
|------|---------|-----------|-----|
| `sm` | `px-6 py-3` | `text-sm` | `gap-1.5` |
| `default` | `px-10 py-4` | `text-sm` | `gap-2` |
| `lg` | `px-12 py-5` | `text-base` | `gap-2.5` |

### M3E Component Integration

Material 3 Expressive web components are registered via side-effect imports and wrapped in React functions:

```tsx
import '@m3e/web/loading-indicator';
import '@m3e/web/progress-indicator';

function M3ELoading(props) { return createElement('m3e-loading-indicator', props); }
function M3ELinearProgress(props) { return createElement('m3e-linear-progress-indicator', props); }
function M3ECircularProgress(props) { return createElement('m3e-circular-progress-indicator', props); }
```

CSS custom properties for M3E theming:
```css
--m3e-loading-indicator-active-indicator-color: var(--accent);
--m3e-loading-indicator-track-color: var(--accent-bg);
--m3e-linear-progress-indicator-active-indicator-color: var(--accent);
--m3e-linear-progress-indicator-track-color: var(--bg-muted);
--m3e-circular-progress-indicator-active-indicator-color: var(--accent);
--m3e-circular-progress-indicator-track-color: var(--bg-muted);
```

### 10.3 Composite Components

Source: `components.composite.tsx` (463 lines)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Breadcrumbs` | Navigation trail with custom separator and `aria-current` on last item | `items: BreadcrumbItem[]`, `separator?` ("/") |
| `Accordion` | Expandable panels: single/multi open, default/bordered/separated variants | `items: AccordionItem[]`, `multiple?`, `variant?` ("default") |
| `Alert` | info, success, warning, error variants. Dismissible with icon toggle. | `variant?` ("info"), `title?`, `dismissible?`, `hideIcon?` |
| `SearchInput` | Search field with icon, clear button, enter-to-search | `value`, `onChange`, `placeholder?`, `showClear?` (true), `onSearch?` |
| `TabBar` | underline, pills, buttons variants with active indicator | `tabs: Tab[]`, `activeTab`, `onTabChange`, `variant?` ("underline") |
| `Pagination` | Ghost-style page navigation with compact mode and item count | `currentPage`, `totalPages`, `onPageChange`, `totalItems?`, `compact?` |
| `FilterBar` | Search + filter controls + result count | `searchValue`, `onSearchChange`, `children?`, `resultCount?` |
| `DataGrid` | Stat card grid, 1-4 columns, trend indicators (up/down/neutral) | `stats: StatCardData[]`, `columns?` (4), `compact?` |
| `CodeBlock` | Syntax-highlighted code (react-syntax-highlighter, tomorrow theme) with copy button | `code`, `language?` ("typescript"), `showLineNumbers?`, `showCopy?`, `header?` |
| `Timeline` | default, numbered, compact variants with active/completed states | `steps: TimelineStep[]`, `activeStep?`, `variant?` ("default") |
| `ArticleCard` | Article preview with category, date, read time, hover reveal CTA | `slug`, `title`, `description?`, `date?`, `category?`, `readTime?`, `onClick?` |
| `DifficultyBadge` | Beginner/Intermediate/Advanced/Theory/Easy/Medium/Hard with color coding | `level`, `size?` ("default") |
| `InfoRow` | default / compact / inline variants | `label`, `value`, `variant?` ("default") |
| `FeatureCard` | default / bordered / elevated variants with icon, title, description, number | `icon?`, `title`, `description`, `number?`, `variant?` ("default") |
| `StatCard` | default / compact / hero variants, trend arrows | `value`, `label`, `icon?`, `trend?`, `variant?` ("default") |
| `StreakCard` | Learning streak with emoji milestones, current/longest streak | `currentStreak`, `longestStreak`, `totalDays?`, `showUpdate?` |
| `ComingSoonCard` | Icon + title + description + badge | `icon`, `title`, `description`, `badgeText?` ("Coming Soon") |
| `ModuleCard` | Course module with progress bar, status badge, difficulty, estimated time | `title`, `description`, `progress`, `status: ModuleStatus`, `difficulty` |
| `UserCard` | default / compact / detailed variants, avatar initials from name | `name`, `username?`, `bio?`, `tags?`, `variant?` ("default") |
| `MemberCard` | Team member with role, social links, tags | `name`, `role?`, `bio?`, `socialLinks?`, `tags?` |
| `GroupCard` | Community group with member count, membership actions (join/leave/edit) | `name`, `memberCount`, `membership?`, `onJoin?`, `onLeave?`, `onEdit?` |
| `RoadmapCard` | Learning roadmap with sections, difficulty, CTA | `title`, `description`, `difficulty`, `sectionCount`, `sections: string[]` |
| `SearchResults` | Full search results with filters, tags, pagination, loading/empty states | `results: SearchResultItem[]`, `query`, `availableTags?`, `selectedTags?` |
| `FaqItem` | Expandable question/answer accordion item | `question`, `answer`, `defaultOpen?` |
| `ContactInfoItem` | Label + value with optional icon | `label`, `value`, `icon?` |
| `ProblemCard` | DSA problem with difficulty, expandable details, time/space complexity | `order`, `title`, `difficulty`, `description?`, `examples?`, `timeComplexity?` |

### Difficulty Badge Color Map

| Level | Background | Text | Border |
|-------|-----------|------|--------|
| Beginner | `bg-accent-bg` | `text-accent` | `border-accent` |
| Intermediate | `bg-accent-bg` | `text-accent` | `border-accent` |
| Advanced | `bg-fg` | `text-white` | `border-fg` |
| Theory | `bg-accent-yellow/10` | `text-accent-yellow` | `border-accent-yellow` |
| Easy | `bg-accent-bg` | `text-accent` | `border-accent` |
| Medium | `bg-accent-bg` | `text-accent` | `border-accent` |
| Hard | `bg-fg` | `text-white` | `border-fg` |

### Module Status Styles

| Status | Background | Text |
|--------|-----------|------|
| `not-started` | `bg-surface-secondary` | `text-fg-secondary` |
| `in-progress` | `bg-accent-bg` | `text-accent` |
| `completed` | `bg-accent` | `text-white` |

### Alert Variants

| Variant | Container | Icon Color |
|---------|-----------|------------|
| `info` | `bg-accent-bg border-accent text-accent` | `text-accent` |
| `success` | `bg-accent-bg border-accent text-accent` | `text-accent` |
| `warning` | `bg-accent-yellow/10 border-accent-yellow text-accent-yellow` | `text-accent-yellow` |
| `error` | `bg-accent-bg border-accent text-accent` | `text-accent` |

### TabBar Variants

| Variant | Container | Active Tab | Indicator |
|---------|-----------|------------|-----------|
| `underline` | `border-b border-border` | `text-accent` | `absolute bottom-0 h-0.5 bg-accent` |
| `pills` | `flex gap-1.5 p-1.5 bg-surface-secondary` | `bg-white text-fg shadow-sm` | none |
| `buttons` | `flex gap-3` | `border-accent bg-accent-bg text-accent` | none |

### 10.4 Layout Components

Source: `components.layout.tsx` (532 lines)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Dropdown` | Borderless bento dropdown with inset shadow, UPPERCASE text, motion animations. Opens on hover. | `trigger`, `items: DropdownItem[]`, `align?` ("left") |
| `Header` | Sticky top bar with "100X SYSTEMS" branding, ghost nav links (yellow underline hover), active=yellow button, mobile hamburger menu. | `logo?`, `items: HeaderNavItem[]`, `actions?`, `sticky?` (true), `activeId?` |
| `SidebarNav` | Borderless sidebar with magnification effect (dock-like physics using `motion/react`). Uses `AnimatedIcon` for each nav item. | `items: SidebarNavItem[]`, `activeId?`, `onItemClick?` |
| `MobileNav` | Fixed bottom dock with magnification effect, dividers between sections, badge support. | `items: MobileNavItem[]`, `activeId?`, `onNavigate?` |
| `Footer` | Minimal footer with "100X SYSTEMS" branding, purple ghost navigation links, social icons (GitHub, LinkedIn, Email). | `className?` |

### Header Design Details

- **Height:** `h-24 lg:h-28`
- **Max width:** `max-w-[1400px] mx-auto px-6 lg:px-12`
- **Logo:** `text-2xl lg:text-3xl font-extrabold uppercase`
- **Nav links:** `text-sm font-bold uppercase tracking-wider`
- **Active state:** `bg-accent-yellow text-black`
- **Ghost hover:** Yellow underline grows from left (`after:scale-x-0 → hover:after:scale-x-100`)
- **Mobile menu:** Animated expand/collapse with `motion/react`

### SidebarNav Design Details

- **No gap** between items — magnification on hover
- **Magnification:** 44px default → 62px on hover, with 120px detection distance
- **Physics:** `mass: 0.1, stiffness: 150, damping: 12`
- **Active:** `bg-accent-yellow text-black`
- **Hover:** `bg-accent text-white`
- **Shadow:** `inset -1px 0 0 rgba(0,0,0,0.04), 2px 0 8px -4px rgba(0,0,0,0.06)`

### MobileNav (Dock) Design Details

- **Position:** `fixed bottom-4 left-1/2 -translate-x-1/2 z-50`
- **Same magnification** as SidebarNav (horizontal tracking via `mouseX`)
- **Badge:** `absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-accent text-white text-[10px]`
- **Divider:** `w-px h-6 bg-border mx-1.5` between sections

### Footer Design Details

- **Max width:** `max-w-[1400px] mx-auto px-6 lg:px-12`
- **Height:** `py-16`
- **Logo:** `text-4xl lg:text-5xl font-extrabold uppercase`
- **Nav links:** `Button variant="purpleGhost"` for ABOUT, CONTACT, PRIVACY, TERMS
- **Social icons:** GitHub, LinkedIn, Email — `p-2 text-fg-secondary hover:!text-white hover:bg-accent`
- **Copyright:** `text-xs font-semibold text-fg-muted uppercase tracking-wider`
- **Hover effect:** Entire footer turns white text on group hover (`group-hover:text-white`)

### Dropdown Design Details

- **No border, no padding** on container — flush to trigger corners
- **Shadow:** `inset 0 1px 3px rgba(0,0,0,0.06), 0 10px 30px -10px rgba(0,0,0,0.15)`
- **Container bg:** `bg-accent-bg`
- **Items:** `bg-white hover:bg-accent hover:text-white`
- **Text:** UPPERCASE, `font-bold tracking-wide text-sm`
- **Description:** UPPERCASE, `text-xs tracking-wide font-medium`
- **Animation:** `opacity 0→1, y 4→0, scale 0.97→1` over 150ms

### 10.5 Animation Components

Source: `components.animations.tsx` (1455 lines)

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `KineticText` | Each character animates independently on hover (font-weight + stroke). | `text`, `as?` ("h1"), `className?` |
| `CoolMode` | Particle effect (circles, emojis, images) on click/tap. | `children`, `options?: CoolParticleOptions` |
| `NoiseTexture` | SVG fractal noise overlay for surface texture. | `frequency?` (0.4), `octaves?` (6), `noiseOpacity?` (0.6) |
| `RippleButton` | Button with Material Design ripple effect on click. | `rippleColor?` ("#ffffff"), `duration?` ("600ms") |
| `SpinningText` | Text arranged in a circle, rotating continuously. | `children` (string), `duration?` (10), `reverse?`, `radius?` (5) |
| `ScrollVelocityContainer` | Wrapper that provides scroll velocity context. | `children` |
| `ScrollVelocityRow` | Infinite scrolling marquee that reacts to scroll velocity. | `baseVelocity?` (5), `direction?` (1), `scrollReactivity?` (true) |
| `NumberTicker` | Animated number counter that springs to value on scroll-into-view. | `value`, `startValue?` (0), `direction?` ("up"), `delay?`, `decimalPlaces?` |
| `BlurFade` | Fade-in with blur effect, supports scroll-triggered animation. | `duration?` (0.4), `delay?`, `offset?` (6), `direction?` ("down"), `inView?`, `blur?` ("6px") |
| `AnimatedList` | Items appear one by one with spring animation. | `delay?` (1000) |
| `AnimatedListItem` | Individual item for AnimatedList with spring scale animation. | `children` |
| `SkewButton` | Skewed button with arrow animation on hover (styled-components). | — |
| `GooeyCheckbox` | Gooey/splash checkbox animation (styled-components). | — |
| `ExpandInput` | Circular search icon that expands into input on focus (styled-components). | — |
| `BookLoader` | Animated book page-turning loader (styled-components). | — |
| `IconAnimatedGridPattern` | Grid of tech company/tool icons that fade in and reposition. | `width?` (80), `height?` (80), `numIcons?` (16), `maxOpacity?` (0.2), `iconSize?` (46), `duration?` (4) |

### IconAnimatedGridPattern Details

- Uses 67 tech icons from `@ridemountainpig/svgl-react` (React, Next.js, TypeScript, Python, Docker, etc.)
- Glass color presets: purple (`rgba(98,37,230,...)`) and yellow (`rgba(251,198,56,...)`)
- Icons and dark squares never overlap (shared occupied-cells tracker)
- Slow diagonal drift at ~3px/s
- Trailing fade-out effect when mouse leaves cells
- White vignette overlay fades to white at edges

### 10.6 Page Components

Source: `components.pages.tsx` (1769 lines)

| Component | Description | Key Features |
|-----------|-------------|--------------|
| `SignUpPage` | Full signup form with social auth (Google/GitHub), email form, terms | Centered card, `max-w-md`, `bg-surface-secondary` background |
| `LoginPage` | Login form with remember me toggle, forgot password, social auth | Same card layout as SignUp |
| `ForgotPasswordPage` | Email input with sent confirmation state | Icon in `bg-accent-bg` square |
| `PricingTiers` | 3-tier pricing cards with feature lists, yearly/monthly toggle | Highlighted tier has `shadow-[0_4px_20px_-8px_rgba(87,46,255,0.15)]` |
| `FAQPage` | FAQ with search, category tabs, accordion items | Uses SearchInput + Tag filters + FaqItem |
| `CoursesPage` | Course listing with search, filter tags, course cards | Uses RoadmapCard grid |
| `CourseDetailPage` | Single course with breadcrumbs, modules, sidebar info, instructor card | 3-column grid (2 main + 1 sidebar) |
| `BlogPage` | Article listing with category filters and article cards | Uses ArticleCard grid |
| `TeamPage` | Team members grid with role/bio cards | Uses MemberCard, 4-column grid |
| `ContactPageLayout` | Two-column contact page with form and info | 5-column grid (2 info + 3 form) |
| `NotFoundPage` | 404 error page with navigation options | Large "404" text, `bg-surface-secondary` |
| `ErrorPage` | 500 error page with alert and retry | Alert component for error message |
| `StatsShowcase` | Statistics showcase section | `bg-accent text-white`, 4-column grid |
| `NewsletterSignup` | Newsletter CTA section with email input | Border-top separator |
| `SettingsPage` | Settings with tabs (Profile, Account, Notifications, Privacy) | TabBar + form fields per tab |
| `OnboardingPage` | Multi-step wizard with progress indicator | 4 steps, step indicator with numbered squares |
| `TestimonialsShowcase` | Testimonials carousel/grid | Star ratings, 3-column grid |
| `ComparisonPage` | Feature comparison table | HTML table with alternating row backgrounds |
| `DonationPage` | Donation form with preset amounts + custom input | 6 preset buttons + custom Input |
| `CheckoutPage` | Checkout flow with order summary | Order summary + payment form |
| `EmptyDashboard` | Empty state for dashboard | Large icon in accent-bg square |
| `NotificationsPage` | Notifications list with read/unread states | Unread: `bg-accent-bg border-l-accent border-l-2` |
| `AccountPage` | Account overview with security + connected accounts | Security toggles, connected providers, danger zone |
| `ComingSoonPage` | Coming soon placeholder with countdown | 4-column countdown grid |
| `SearchPage` | Full search results page | SearchInput + Tag filters + result list |
| `HeroPage` | Hero section with IconAnimatedGridPattern background | `min-h-[80vh]`, `text-5xl md:text-7xl` |
| `CtaSection` | Call-to-action section with background | `bg-accent text-white`, ripple button |

---

## 11. Motion & Animation

### Defined Animations (`globals.css`)

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| `rippling` | 600ms | `ease-out` | Button ripple effect (ripple variant). Scale 0→2, opacity 1→0 |
| `morph-purple` | 1.4s | `ease-in-out infinite` | Decorative shape animation (translate + scale) |
| `morph-yellow` | 1.4s | `ease-in-out infinite` | Decorative shape animation (opposite direction) |

### Component Animations

| Component | Animation | Trigger |
|-----------|-----------|---------|
| Button (primary) | `transition-all duration-200 ease-out` | hover, active |
| Button (ghost) | `after:transition-transform after:duration-300 after:ease-out` — underline grows | hover |
| Button (ripple) | Scale + fade radial burst (`rippling` keyframe) | click |
| Accordion | `transition-all duration-200` — max-height + opacity | expand/collapse |
| Image | `transition-opacity duration-300` | load state |
| Skeleton | `animate-pulse` | loading state |
| Chevron icons | `transition-transform duration-150` / `duration-200` | open/close |
| Tag | `transition-all duration-150` | hover, selected |
| Toggle switch | `transition-colors duration-200` (track), `transition-transform duration-200` (thumb) | checked change |
| Card hover | `transition-all duration-200 hover:border-accent hover:shadow-sm` | mouse enter |
| AnimatedIcon | `isAnimated` prop — individual icon hover animation | mouse enter |
| Dropdown | `initial: opacity 0, y 4, scale 0.97` → `animate: opacity 1, y 0, scale 1` over 150ms | open |
| Mobile menu | `initial: height 0, opacity 0` → `animate: height auto, opacity 1` over 200ms | toggle |
| SidebarNav/Dock icons | Spring physics: `mass 0.1, stiffness 150, damping 12` | mouse proximity |

### Motion Principles

- Use `ease-out` for entering/expanding elements
- Use `ease-in-out` for looping decorative animations
- Use `[0.23, 1, 0.32, 1]` (custom cubic bezier) for dropdown/menu animations
- Use `duration-150` for micro-interactions, `duration-200` for standard transitions, `duration-300` for larger state changes
- Never animate CSS layout properties (width, height, position)
- Scale transforms and opacity only
- Spring physics for dock/magnification: `mass: 0.1, stiffness: 150, damping: 12`
- NumberTicker spring: `damping: 60, stiffness: 100`

---

## 12. Accessibility

- All interactive elements use `focus-visible:` for keyboard-only focus rings
- `aria-label` on icon-only buttons and loading spinners
- `role="status"` on Spinner components
- `role="alert"` on error messages and alerts
- `aria-expanded` on accordion/FAQ toggle buttons
- `aria-current="page"` on breadcrumb last item
- `aria-selected` on TabBar tabs
- `aria-checked` on Toggle switch
- `tabIndex={0}` on clickable card wrappers
- Loading states use `aria-label="Loading"` or descriptive text
- Image component has built-in `onError` fallback with icon + text
- `aria-hidden="true"` on decorative icons and skeleton placeholders
- `motion` package for accessible animation reduction (`prefers-reduced-motion`)
- `::selection` styled with accent color for visible text selection
- `sr-only` text on KineticText and SpinningText for screen readers
- `role="switch"` on Toggle buttons
- `role="tablist"` / `role="tab"` on TabBar
- ScrollVelocity respects `prefers-reduced-motion` media query
- ScrollVelocity pauses when container is out of viewport (IntersectionObserver)
- ScrollVelocity pauses when page is hidden (visibilitychange event)

---

## 13. Code Conventions

### File Structure

```
components.*.tsx     — one file per tier (token, atomic, composite, layout, pages, animations)
index.ts            — flat barrel exports (no default exports)
_storybook/         — co-located stories
```

### Naming

- **Components:** PascalCase (`Button`, `SearchInput`, `DifficultyBadge`)
- **Props interfaces:** `{ComponentName}Props`
- **Type exports:** `{ComponentName}Variant`, `{ComponentName}Size`, etc.
- **Files:** `components.{tier}.tsx` (lowercase dot notation)
- **CSS classes:** Tailwind utility classes only (no custom CSS files for design system components)

### Imports

```tsx
// Project utilities
import { cn } from '@/application/lib/utils';

// External packages
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as AnimatedIcons from '@animateicons/react/lucide';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import styled from 'styled-components';

// Same-tier components
import { Tag, Skeleton, ProgressBar } from './components.atomic';
```

### Conventions

1. **`'use client'`** — all interactive components are client components
2. **`forwardRef`** — form inputs and Button use `forwardRef` for ref forwarding
3. **`cn()`** — class merging via `tailwind-merge` (`@/application/lib/utils`)
4. **Inline SVGs** — all static icons are inline SVGs (no external sprite sheets)
5. **`as const`** — variant/type maps are `as const` for type safety
6. **CSS transitions** — prefer `transition-{property} duration-{time}` over JS animation
7. **No `require()`** — all imports use static ES module `import`
8. **Named exports only** — no default exports; everything is a named export from barrel
9. **`createElement` for M3E** — custom elements use React's `createElement` to avoid JSX intrinsic type issues
10. **styled-components** — used only for complex CSS animations (SkewButton, GooeyCheckbox, ExpandInput, BookLoader)

### Variant Pattern

Every multi-variant component follows this pattern:

```tsx
const variants = { primary: '...', ghost: '...' } as const;
type Variant = keyof typeof variants;

interface ComponentProps {
  variant?: Variant;
  // ...
}

function Component({ variant = 'default', ... }: ComponentProps) {
  return <div className={cn(variants[variant], className)}>...</div>;
}
```

### Size Pattern

```tsx
const sizes = {
  sm: 'px-6 py-3 text-sm gap-1.5',
  default: 'px-10 py-4 text-sm gap-2',
  lg: 'px-12 py-5 text-base gap-2.5',
} as const;
```

---

## 14. Storybook

### Configuration

- **Framework:** `@storybook/nextjs` (Storybook 10)
- **Addons:** a11y, docs, links, Chromatic, performance panel
- **Global CSS:** Imported via `preview.tsx` from `app/globals.css`
- **Layout:** `parameters: { layout: 'fullscreen' }` by default

### Story Structure

| Story File | Stories |
|------------|---------|
| `components.token.stories.tsx` | Colors, Typography, Radius, Interactive, Layout, Shadows, Spacing, Icons, Images |
| `components.atomic.stories.tsx` | Button, Input, Textarea, Badge, Spinner, Tag, Select, Toggle, ProgressBar, CircularProgress, Skeleton |
| `components.composite.stories.tsx` | Accordion, Alert, SearchInput, TabBar, Pagination, Breadcrumbs, CodeBlock, Timeline, FilterBar |
| `components.pages.stories.tsx` | SignUp, Login, ForgotPassword, Pricing, FAQ, Courses, CourseDetail, Blog, Team, Contact, 404, 500, Stats, Newsletter, Settings, Onboarding, Testimonials, Comparison, Donation, Checkout, Dashboard, Notifications, Account, ComingSoon, Search, Hero, CTA |
| `components.layout.stories.tsx` | Dropdown, Header, SidebarNav, MobileNav (Dock), Footer, Full Layout Demo |
| `animations.stories.tsx` | KineticText, CoolMode, NoiseTexture, RippleButton, SpinningText, NumberTicker, BlurFade, AnimatedList, ScrollVelocity, SkewButton, GooeyCheckbox, ExpandInput, BookLoader, IconAnimatedGridPattern |
| `_all.stories.tsx` | Dynamic index — auto-discovers and renders ALL stories using Webpack's `require.context` |

### Story Decorators

| File | Decorator |
|------|-----------|
| Token stories | `<div style={{ padding: '3rem 1.5rem' }}>` |
| Atomic stories | `<div style={{ padding: '3rem 1.5rem', maxWidth: '800px' }}>` |
| Composite stories | `<div style={{ padding: '3rem 1.5rem', maxWidth: '960px' }}>` |
| Layout stories | None (fullscreen) |
| Page stories | None (fullscreen) |
| Animation stories | `layout: 'centered'` (most), `layout: 'fullscreen'` (ScrollVelocity, IconGrid) |

---

## 15. External Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `@animateicons/react` | Animated Lucide icons | `^0.3.4` |
| `@m3e/web` | Material 3 Expressive loading/progress indicators | `^2.5.14` |
| `react-syntax-highlighter` | Syntax-highlighted code blocks (tomorrow theme) | `^16.1.1` |
| `tailwind-merge` | Class merge utility (via `cn()`) | `^3.6.0` |
| `tailwindcss` | Utility CSS framework | `^4.3.2` |
| `tw-animate-css` | Animation utilities for Tailwind | `^1.4.0` |
| `class-variance-authority` | Variant management | `^0.7.1` |
| `motion` | Animation library (React) | `^12.40.0` |
| `shadcn` | UI component registry CLI | `^4.13.0` |
| `react-icons` | Icon library for IconAnimatedGridPattern | — |
| `@ridemountainpig/svgl-react` | Tech company SVG logos for grid pattern | — |
| `styled-components` | CSS-in-JS for complex animation components | — |

---

*Generated from source code — July 2026.*
