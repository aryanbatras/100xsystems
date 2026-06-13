import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import styles from '../../../_styles/components/sections/paths/Hero.module.css';

export default function PathsHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div 
          className={styles.heroBackgroundVideo}
        />
      </div>
      
      <div className={styles.heroOverlay}></div>
      
      <div className={styles.heroContent}>
        <div className={styles.heroTextContent}>
          <h1 className="hero-title">
            <AnimatedTitle variant="hero" className={styles.title}>
              Engineering Excellence Paths
            </AnimatedTitle>
          </h1>
          
          <div className="hero-subtitle">
            <AnimatedDescription variant="featured" className={styles.subtitle}>
              Transform from developer to 100xEngineer through structured, depth-first learning pathways 
              designed for real-world system mastery
            </AnimatedDescription>
          </div>
          
          <div className="hero-description">
            <AnimatedDescription variant="subtle" className={styles.heroDescription}>
              Our paths are built on the philosophy that true engineering excellence comes from 
              understanding systems deeply—not just collecting technologies. Each pathway represents 
              a stage in your evolution from writing code to architecting solutions that scale.
            </AnimatedDescription>
          </div>
        </div>
      </div>
    </section>
  );
}
