# 100xSystems Design System

> Token-driven, minimal, expressive. Built with Next.js 16, Tailwind CSS v4, and shadcn/ui.

---

## Table of Contents

- [Philosophy & Principles](#philosophy--principles)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing Scale](#spacing-scale)
- [Border Radius](#border-radius)
- [Shadows & Elevation](#shadows--elevation)
- [Breakpoints & Responsive](#breakpoints--responsive)
- [Interactive States](#interactive-states)
- [Icon System](#icon-system)
- [Component Architecture](#component-architecture)
  - [Token Components](#token-components)
  - [Atomic Components](#atomic-components)
  - [Composite Components](#composite-components)
  - [Layout Components](#layout-components)
- [Motion & Animation](#motion--animation)
- [Accessibility](#accessibility)
- [Code Conventions](#code-conventions)

---

## Philosophy & Principles

1. **Token-first.** Every visual property flows from a design token. No magic values.
2. **Generous spacing.** Large padding, big text, wide gaps. The system breathes.
3. **Monochromatic with purpose.** Purple (`#572EFF`) is the sole accent. Yellow (`#facc15`) serves as a secondary accent for highlights. Black and white with warm-tinted grays form the neutral palette.
4. **Square corners.** Border radius is `0` everywhere. Sharp edges are a deliberate identity choice.
5. **Subtle surface hierarchy.** Depth is created through `border`, `shadow-sm`, and background tints — never through rounded corners or heavy shadows.
6. **Animated icons.** Icons animate on interaction via `@animateicons/react`. Static Lucide-style SVGs are the fallback.
7. **Client-first.** All interactive components are `'use client'` with explicit state management.

---

## Color System

### Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-white` | `#ffffff` | Pure white surfaces |
| `--color-purple` | `#7c3aed` | Legacy purple (limited use) |
| `--color-yellow` | `#facc15` | Secondary accent |

### Semantic Tokens

| Token | Value | Role |
|-------|-------|------|
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

### Tailwind v4 Theme Tokens

Defined via `@theme inline` in `globals.css`:

| Class | Maps to | Purpose |
|-------|---------|---------|
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

### Color Usage Rules

- **Buttons:** accent background with white text (`bg-accent text-white`). Ghost variant uses transparent background with hover accent-yellow underline.
- **Badges:** Three variants — purple (`bg-accent text-white`), yellow (`bg-accent-yellow text-black`), black (`bg-fg text-white`).
- **Alerts:** accent-tinted backgrounds (`bg-accent-bg` with `border-accent`). Warning variant uses `bg-accent-yellow/10 border-accent-yellow`.
- **Difficulty badges:** accent-bg for Beginner/Intermediate, fg (black) for Advanced/Hard, accent-yellow tint for Theory.
- **Module status:** accent-bg text-accent for in-progress, accent-bg text-white for completed.
- **Trend indicators:** accent color for both up and down trends (no green/red).

---

## Typography

### Font Family

**Plus Jakarta Sans** — the sole typeface. Used for all headings, body text, buttons, and labels.

```css
--font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
```

### Type Scale

| Size | Rem | Usage |
|------|-----|-------|
| 6xl | 3.75rem | Display / hero headings |
| 5xl | 3rem | Page headings |
| 4xl | 2.25rem | Section headings (h1) |
| 3xl | 1.875rem | Sub-section headings (h2) |
| 2xl | 1.5rem | Card headings (h3) |
| xl | 1.25rem | Component headings (h4) |
| lg | 1.125rem | Large body / h5 |
| base | 1rem | Default body / h6 |
| sm | 0.875rem | Secondary body, buttons |
| xs | 0.75rem | Metadata, captions |
| 10px | 0.625rem | Labels, badges, overlines |

### Font Weights

| Weight | Usage |
|--------|-------|
| 300 | Light (sparingly) |
| 400 | Default body text |
| 500 | Medium emphasis |
| 600 | Semibold headings |
| 700 | Bold headings |
| 800 | Extra bold (display) |

### Text Components

| Component | Variants |
|-----------|----------|
| `Heading` | h1–h6, with corresponding size/weight presets |
| `Text` | body, body-lg, body-sm, caption, muted, code |

### Typography Rules

- `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` are applied globally.
- `tracking-tight` on h1/h2 for display impact.
- `tracking-wider`, `tracking-widest` on uppercase labels and overlines.
- Code snippets use `font-mono` with a `bg-surface-secondary` tinted background.

---

## Spacing Scale

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
| `px-5 py-3` | 20×12px | Accordion headers |
| `px-6 py-5` | 24×20px | Accordion panels, FAQ items |
| `px-10 py-4` | 40×16px | Default Button |
| `px-12 py-5` | 48×20px | Large Button |

### Design Rule

**Padding is not optional.** Every component must have deliberate padding between its text and its edges. The default padding for interactive elements is no less than `px-4 py-1.5` for the smallest variants, scaling up generously for default and large sizes.

---

## Border Radius

**All border radius is `0`.** This is an intentional design choice for a sharp, modern, no-compromise aesthetic.

```css
--radius: 0;
--radius-sm: 0;
--radius-md: 0;
--radius-lg: 0;
--radius-xl: 0;
```

The sole exceptions are:
- **Count badges** — `rounded-full` for pill-shaped number indicators
- **Tags/Chips** — `rounded-full` for pill-shaped removable tags
- **Pill variant TabBar** — `rounded-full` container

---

## Shadows & Elevation

### Standard

- **shadow-sm** — default button elevation, subtle card hover
- **shadow-md** — elevated surfaces, hovered buttons

### Custom

- **Inset shadow** — `inset 0 2px 8px 0 rgb(0 0 0 / 0.08)` for inner depth
- **Layered shadow** — `0 8px 32px -8px rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.02)` for elevated cards

### Elevation Convention

- **Default (ground):** `bg-white border border-border` — cards, containers
- **Hover (lifted):** `hover:shadow-sm` — interactive cards on hover
- **Active (pressed):** `shadow-none` — button pressed state
- **Surface (background):** `bg-surface-secondary` — pill containers, code blocks

---

## Breakpoints & Responsive

| Breakpoint | Min Width | Target |
|------------|-----------|--------|
| `sm` | 640px | Large phones / small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Ultra-wide |

### Responsive Patterns

- **DataGrid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-{n}` — collapses to single column on mobile
- **SidebarNav:** `w-56` default, `w-14` collapsed — collapses to icon-only on narrow viewports
- **Spacing:** `p-5` on desktop, `p-4` on mobile for compact components
- **Typography:** Font sizes stay consistent across breakpoints; container widths adapt

---

## Interactive States

Every interactive component implements these states:

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

---

## Icon System

### Static Icons (Fallback)

The `Icon` component renders 30+ named Lucide-style inline SVGs:

| Category | Icons |
|----------|-------|
| Navigation | chevron-right, chevron-down, chevron-left, arrow-left, arrow-right, arrow-up, arrow-down, menu, more-vertical |
| Actions | x, check, plus, minus, edit, trash, copy, share, download, upload |
| Media & Content | search, image, file, folder, star, heart, bookmark, external-link |
| Info & Status | info, alert-circle, clock, settings, mail, user, globe |

Usage: `<Icon name="search" size={20} />`

### Animated Icons (Default)

The `AnimatedIcon` component wraps `@animateicons/react/lucide` and supports animated hover/state transitions:

```tsx
<AnimatedIcon name="search" size={20} isAnimated={true} />
```

The icon name is kebab-case and auto-resolved to the PascalCase component. Supports all icons from the `@animateicons/react/lucide` package with animation on hover and interaction states.

### Icon Guidelines

- Default icon size for inline use: `16px` (sm), `20px` (default), `24px` (lg)
- Icons in buttons: `16×16` for sm, inline with text
- Icons in inputs: `20×20` at `pl-12` for the left icon slot
- Icons in headers/sections: `text-2xl` to `text-4xl`
- All icons use `currentColor` and inherit text color by default

---

## Component Architecture

The design system follows a four-tier architecture:

```
src/presentation/__components/
  components.token.tsx    → Design token display & AnimatedIcon wrapper
  components.atomic.tsx   → Smallest building blocks (Button, Input, Badge, etc.)
  components.composite.tsx → Combined molecules & organisms (Accordion, Card, etc.)
  components.layout.tsx   → Full-width page layouts (SidebarNav)
  index.ts                → Barrel exports (flat)
  _storybook/             → Storybook stories
```

### Token Components

| Component | Description |
|-----------|-------------|
| `TokenColors` | Displays palette + semantic color swatches |
| `TokenTypography` | Shows type scale, weights, and font family |
| `TokenRadius` | Documents the square corners convention |
| `TokenInteractive` | Shows cursor types and state samples |
| `TokenLayout` | Demonstrates grid adaptation across breakpoints |
| `TokenShadows` | Standard and custom shadow samples |
| `TokenSpacing` | Full spacing scale visual reference |
| `TokenIcon` | Icon inventory grid showing all available icon names |
| `TokenImage` | Image component with aspect ratio demo |
| `AnimatedIcon` | Animated icon wrapper using @animateicons/react |

### Atomic Components

| Component | Props | Variants |
|-----------|-------|----------|
| `Icon` | name, size, className, strokeWidth | 30+ named icons |
| `Image` | src, alt, aspectRatio, objectFit, fallback | 16/9, 4/3, 1/1, 3/2, 2/3, auto |
| `Button` | variant, size, loading, icon, iconPosition | primary / ghost / ripple; sm / default / lg |
| `Input` | label, errorMessage, helperText, leftIcon, rightIcon | inline form input with border-bottom |
| `Textarea` | label, errorMessage, helperText, rows | Like Input, multiline |
| `Badge` | variant, size, dot | purple / yellow / black; sm / default / lg |
| `Tag` | variant, size, removable, selected, leadingIcon | default / brand / success / outline; sm / default / lg |
| `Spinner` | size, variant | lg (48px) / xl (64px); uncontained / contained |
| `Heading` | variant, as | h1–h6 with matching size/weight |
| `Text` | variant, as | body / body-lg / body-sm / caption / muted / code |
| `Divider` | label | Plain or with centered label |
| `Select` | label, options, placeholder, errorMessage | Custom styled select with chevron |
| `Toggle` | checked, onChange, label, size | sm / default |
| `ProgressBar` | value, size, showLabel, variant | sm / default / lg; flat / wavy |
| `Skeleton` | width, height, inline | Single placeholder block |
| `SkeletonBlock` | lines, avatar | Composite skeleton with optional avatar circle |

### Composite Components

| Component | Description |
|-----------|-------------|
| `Breadcrumbs` | Navigation trail with custom separator |
| `Accordion` | Expandable panels, single/multi open, bordered/separated variants |
| `Alert` | Variants: info, success, warning, error. Dismissible, icon toggle |
| `SearchInput` | Search field with icon, clear button, enter-to-search |
| `TabBar` | underline / pills / buttons variants |
| `Pagination` | Ghost-style buttons, compact mode, item count |
| `FilterBar` | Search + filter controls + result count |
| `DataGrid` | Stat card grid, 1-4 columns, trend indicators |
| `CodeBlock` | Syntax-highlighted code (react-syntax-highlighter, tomorrow theme) |
| `Timeline` | default / numbered / compact variants |
| `ArticleCard` | Article with category, date, read time, hover reveal |
| `DifficultyBadge` | Beginner/Intermediate/Advanced/Theory/Easy/Medium/Hard |
| `InfoRow` | default / compact / inline variants |
| `FeatureCard` | default / bordered / elevated variants |
| `StatCard` | default / compact / hero variants, trend arrows |
| `StreakCard` | Learning streak with emoji milestones, current/longest streak |
| `ComingSoonCard` | Icon + title + description + badge |
| `ModuleCard` | Course module with progress bar, status badge, difficulty |
| `UserCard` | default / compact / detailed variants, avatar initials |
| `MemberCard` | Team member with role, social links, tags |
| `GroupCard` | Community group with member count, membership actions |
| `RoadmapCard` | Learning roadmap with sections, difficulty, CTA |
| `SearchResults` | Full search results with filters, tags, pagination, loading/empty states |
| `FaqItem` | Expandable question/answer accordion item |
| `ContactInfoItem` | Label + value with optional icon |
| `ProblemCard` | DSA problem with difficulty, expandable details, complexity |

### Layout Components

| Component | Description |
|-----------|-------------|
| `SidebarNav` | Collapsible sidebar with nested items, count badges, expand/collapse |

---

## Motion & Animation

### Defined Animations (`globals.css`)

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| `rippling` | 600ms | ease-out | Button ripple effect (ripple variant) |
| `morph-purple` | 1.4s | ease-in-out infinite | Decorative shape animation |
| `morph-yellow` | 1.4s | ease-in-out infinite | Decorative shape animation |

### Component Animations

| Component | Animation | Trigger |
|-----------|-----------|---------|
| Button (primary) | `transition-all duration-200 ease-out` | hover, active |
| Button (ghost) | `after:transition-transform after:duration-300 after:ease-out` — underline grows | hover |
| Button (ripple) | Scale + fade radial burst | click |
| Accordion | `transition-all duration-200` — max-height + opacity | expand/collapse |
| Image | `transition-opacity duration-300` | load state |
| Skeleton | `animate-pulse` | loading state |
| Chevron icons | `transition-transform duration-150` / `duration-200` | open/close |
| Tag | `transition-all duration-150` | hover, selected |
| Toggle switch | `transition-colors duration-200` (track), `transition-transform duration-200` (thumb) | checked change |
| Card hover | `transition-all duration-200 hover:border-accent hover:shadow-sm` | mouse enter |
| AnimatedIcon | `isAnimated` prop — individual icon hover animation | mouse enter |

### Motion Principles

- Use `ease-out` for entering/expanding elements
- Use `ease-in-out` for looping decorative animations
- Use `duration-150` for micro-interactions, `duration-200` for standard transitions, `duration-300` for larger state changes
- Never animate CSS layout properties (width, height, position)
- Scale transforms and opacity only

---

## Accessibility

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

---

## Code Conventions

### File Structure

```
components.*.tsx     — one file per tier (token, atomic, composite, layout)
index.ts             — flat barrel exports
_storybook/          — co-located stories
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

### Storybook Structure

Stories co-located at:
```
src/presentation/__components/_storybook/
  components.token.stories.tsx
  components.atomic.stories.tsx
  components.composite.stories.tsx
  config/
    main.ts
    preview.tsx
```

- Uses Storybook 10 with `@storybook/nextjs` framework
- Global CSS imported via `preview.tsx`
- a11y addon enabled for accessibility checks
- Stories use `<div className="flex flex-col gap-4 p-4">` wrappers for layout

---

## External Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `@animateicons/react` | Animated Lucide icons | ^0.3.4 |
| `@m3e/web` | Material 3 Express loading/progress indicators | ^2.5.14 |
| `react-syntax-highlighter` | Syntax-highlighted code blocks | ^16.1.1 |
| `tailwind-merge` | Class merge utility (via `cn()`) | ^3.6.0 |
| `tailwindcss` | Utility CSS framework | ^4.3.2 |
| `tw-animate-css` | Animation utilities for Tailwind | ^1.4.0 |
| `class-variance-authority` | Variant management | ^0.7.1 |
| `motion` | Animation library | ^12.40.0 |
| `shadcn` | UI component registry CLI | ^4.13.0 |

---

*Generated from codebase — July 2026.*
