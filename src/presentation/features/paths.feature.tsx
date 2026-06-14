/**
 * ## Paths
 *
 * Paths feature module.
 * Contains all components, types, and logic for the paths domain.
 *
 * @packageDocumentation
 * @module paths
 */

'use client';

import styles from '../_styles/sections-paths-shared.module.css';
import { PathsHero, PathCards, PathsVideoShowcase, LearningApproach, Journey, Outcomes } from './sections.feature';

// ============================================================
// Source: paths.tsx
// ============================================================
export function PathsPage() {
  return (
    <div className={styles.page}>
      <PathsHero />
      <div className={styles.container}>
        <div className={styles.heroSpacer} />
        <PathCards />
        <PathsVideoShowcase />
        <LearningApproach />
        <Journey />
        <Outcomes />
      </div>
    </div>
  );
}
