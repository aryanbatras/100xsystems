/**
 * ## Presentation: Learning Paths Page
 *
 * Displays structured learning paths with progress
 * tracking, section navigation, and content discovery.
 *
 * @packageDocumentation
 */

'use client';

import PathsHero from "../sections/paths/Hero";
import LearningApproach from "../sections/paths/LearningApproach";
import Journey from "../sections/paths/Journey";
import PathCards from "../sections/paths/PathCards";
import Outcomes from "../sections/paths/Outcomes";
import PathsVideoShowcase from "../sections/paths/VideoShowcase";
import styles from "../../_styles/components/sections/paths/shared.module.css";

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
