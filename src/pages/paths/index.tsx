import PathsHero from "../../components/sections/paths/Hero";
import LearningApproach from "../../components/sections/paths/LearningApproach";
import Journey from "../../components/sections/paths/Journey";
import PathCards from "../../components/sections/paths/PathCards";
import Outcomes from "../../components/sections/paths/Outcomes";
import CTA from "../../components/sections/paths/CTA";
import styles from "../../styles/components/sections/paths/shared.module.css";
import PathsVideoShowcase from "../../components/sections/paths/VideoShowcase";

export default function Paths() {
  return (
    <div className={styles.page}>
      <PathsHero />
      <div className={styles.container}>
        <div className={styles.heroSpacer}></div>
        <PathCards />
        <PathsVideoShowcase />
        <LearningApproach />
        <Journey />
        <Outcomes />
        {/* <CTA /> */}
      </div>
    </div>
  );
}
