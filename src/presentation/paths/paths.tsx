/**
 * ## Presentation: Learning Paths Page
 *
 * Displays structured learning paths with progress
 * tracking, section navigation, and content discovery.
 *
 * @packageDocumentation
 */

'use client';

import PathsHero from "../../presentation/sections/paths/Hero";
import LearningApproach from "../../presentation/sections/paths/LearningApproach";
import Journey from "../../presentation/sections/paths/Journey";
import PathCards from "../../presentation/sections/paths/PathCards";
import Outcomes from "../../presentation/sections/paths/Outcomes";
import PathsVideoShowcase from "../../presentation/sections/paths/VideoShowcase";
import styles from "../../presentation/_styles/components/sections/paths/shared.module.css";

/**
 * Learning Paths page — structured learning journeys for systems engineering.
 *
 * @remarks
 * Showcases available learning paths, the methodology behind them, video walkthroughs,
 * and expected outcomes. Helps learners choose their starting point.
 *
 * @public
 */
export default function PathsPage() {
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
