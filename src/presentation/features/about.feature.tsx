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

import { AboutHero } from './aboutHero.feature';
import { Innovation } from './aboutInnovation.feature';
import { Founder } from './aboutFounder.feature';
import { Systems } from './aboutSystems.feature';
import { Mission } from './aboutMission.feature';
import { CorePrinciples } from './aboutCorePrinciples.feature';
import { Philosophy } from './aboutPhilosophy.feature';
import { Pathway } from './aboutPathway.feature';
import { Difference } from './aboutDifference.feature';
import { AboutCTA } from './aboutCTA.feature';
import { Wallpaper } from './aboutWallpaper.feature';
import { Values } from './aboutValues.feature';
import { AboutFooter } from './aboutFooter.feature';

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
