/**
 * ## Presentation: About Page
 *
 * About page component showcasing the platform's mission,
 * team, and learning philosophy.
 *
 * @packageDocumentation
 */

'use client';
import { Geist } from "next/font/google";
import AboutHero from "../sections/about/Hero";
import Innovation from "../sections/about/Innovation";
import Founder from "../sections/about/Founder";
import Systems from "../sections/about/Systems";
import Mission from "../sections/about/Mission";
import CorePrinciples from "../sections/about/CorePrinciples";
import Philosophy from "../sections/about/Philosophy";
import Pathway from "../sections/about/Pathway";
import Difference from "../sections/about/Difference";
import AboutCTA from "../sections/about/CTA";
import Wallpaper from "../sections/about/Wallpaper";
import Values from "../sections/about/Values";
import AboutFooter from "../sections/about/Footer";
import styles from "../../_styles/components/sections/about/shared.module.css";

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
export default function AboutPage() {
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
