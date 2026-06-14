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
import AboutHero from "../../presentation/sections/about/Hero";
import Innovation from "../../presentation/sections/about/Innovation";
import Founder from "../../presentation/sections/about/Founder";
import Systems from "../../presentation/sections/about/Systems";
import Mission from "../../presentation/sections/about/Mission";
import CorePrinciples from "../../presentation/sections/about/CorePrinciples";
import Philosophy from "../../presentation/sections/about/Philosophy";
import Pathway from "../../presentation/sections/about/Pathway";
import Difference from "../../presentation/sections/about/Difference";
import AboutCTA from "../../presentation/sections/about/CTA";
import Wallpaper from "../../presentation/sections/about/Wallpaper";
import Values from "../../presentation/sections/about/Values";
import AboutFooter from "../../presentation/sections/about/Footer";
import styles from "../../presentation/_styles/components/sections/about/shared.module.css";

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
