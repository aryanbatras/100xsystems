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
import AboutHero from "../../components/sections/about/Hero";
import Innovation from "../../components/sections/about/Innovation";
import Founder from "../../components/sections/about/Founder";
import Systems from "../../components/sections/about/Systems";
import Mission from "../../components/sections/about/Mission";
import CorePrinciples from "../../components/sections/about/CorePrinciples";
import Philosophy from "../../components/sections/about/Philosophy";
import Pathway from "../../components/sections/about/Pathway";
import Difference from "../../components/sections/about/Difference";
import AboutCTA from "../../components/sections/about/CTA";
import Wallpaper from "../../components/sections/about/Wallpaper";
import Values from "../../components/sections/about/Values";
import AboutFooter from "../../components/sections/about/Footer";
import styles from "../../styles/components/sections/about/shared.module.css";

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
