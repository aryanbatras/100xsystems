import PathsHero from "../../components/sections/paths/Hero";
import PathsVideoShowcase from "../../components/sections/paths/VideoShowcase";
import LearningApproach from "../../components/sections/paths/LearningApproach";
import PathCards from "../../components/sections/paths/PathCards";
import Journey from "../../components/sections/paths/Journey";
import Outcomes from "../../components/sections/paths/Outcomes";
import CTA from "../../components/sections/paths/CTA";
import styles from "../../components/sections/paths/shared.module.css";

export default function Paths() {
  return (
    <div className={styles.page}>
      <PathsHero />
      <div className={styles.container}>
        <div className={styles.heroSpacer}></div>
        <PathsVideoShowcase />
        <LearningApproach />
        <PathCards />
        <Journey />
        <Outcomes />
        <CTA />
      </div>
    </div>
  );
}
