'use client';

import styles from '../_styles/css/sections-about-shared.module.css';
import { Geist } from 'next/font/google';
/**
 * ## About
 *
 * About feature module.
 * Contains all components, types, and logic for the about domain.
 *
 * @packageDocumentation
 * @module about
 */

;
import {
  AboutHero, Innovation, Founder, Systems, Mission, CorePrinciples,
  Philosophy, Pathway, Difference, AboutCTA, Wallpaper, Values, AboutFooter
} from './sections.feature';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * About page — company mission, philosophy, team, and values.
 *
 * @remarks
 * Composes ~13 section components that together tell the story of the 100x Systems
 * platform. Uses the Geist font for consistent branding.
 */
export function AboutPage() {
  return (
    <div className={`${geistSans.variable} ${styles.page}`}>
      <AboutHero />
      <div className={styles.container}>
        <Innovation />
        <Founder />
        <Systems />
        <Mission />
        <CorePrinciples />
        <Philosophy />
        <Pathway />
        <Difference />
        <AboutCTA />
        <Wallpaper />
        <Values />
        <AboutFooter />
      </div>
    </div>
  );
}


// ============================================================
// Source: index.ts
// ============================================================
