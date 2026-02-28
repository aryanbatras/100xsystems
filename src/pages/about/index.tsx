import { Geist } from "next/font/google";
import AboutHero from "../../components/sections/about/Hero";
import Innovation from "../../components/sections/about/Innovation";
import Founder from "../../components/sections/about/Founder";
import Systems from "../../components/sections/about/Systems";
import Mission from "../../components/sections/about/Mission";
import Philosophy from "../../components/sections/about/Philosophy";
import Pathway from "../../components/sections/about/Pathway";
import Difference from "../../components/sections/about/Difference";
import AboutCTA from "../../components/sections/about/CTA";
import Wallpaper from "../../components/sections/about/Wallpaper";
import Values from "../../components/sections/about/Values";
import AboutFooter from "../../components/sections/about/Footer";
import styles from "../../components/sections/about/shared.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function About() {
  return (
    <div className={`${geistSans.variable} ${styles.page}`}>
      <main className={styles.container}>
        <div className={styles.content}>
          <AboutHero />
          <Innovation />
          <Founder />
          <Systems />
          <Mission />
          <Philosophy />
          <Pathway />
          <Difference />
          <AboutCTA />
          <Wallpaper />
          <Values />
          <AboutFooter />
        </div>
      </main>
    </div>
  );
}
