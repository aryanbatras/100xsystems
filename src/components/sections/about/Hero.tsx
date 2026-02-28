import Image from 'next/image';
import styles from './Hero.module.css';

export default function AboutHero() {
  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <Image
            src="/assets/illustrations/undraw_programmer_raqr.svg"
            alt="Systems Engineering"
            width={400}
            height={300}
            priority
            className={styles.heroImage}
          />
        </div>
        
        <div className={styles.heroRight}>
          <h1 className={styles.title}>
            100x Systems
          </h1>
          
          <p className={styles.subtitle}>
            From Developer to Systems Engineer
          </p>

          <div className={styles.heroPoints}>
            <div className={styles.heroPoint}>
              <h3 className={styles.pointTitle}>Systems vs Isolated Technologies</h3>
              <p className={styles.pointText}>
                Most engineers learn technologies quickly and start building projects. 
                But systems knowledge expands your perspective and makes you mature as a software engineer. 
                Understanding how any technology works as a system reveals its impact across every domain.
              </p>
            </div>

            <div className={styles.heroPoint}>
              <h3 className={styles.pointTitle}>Love for Engineering</h3>
              <p className={styles.pointText}>
                This isn't just about getting a job. It's about having genuine love for engineering 
                and understanding how things are made at a deep level. This website is my adventure and exploration of systems thinking, 
                documenting insights so other engineers don't have to spend years discovering them.
              </p>
            </div>

            <div className={styles.heroPoint}>
              <h3 className={styles.pointTitle}>Real Engineering vs AI Tools</h3>
              <p className={styles.pointText}>
                AI can help develop things faster, but you must understand the system first 
                to use tools effectively. AI can't build complex systems without deep system understanding. 
                Real engineers build things themselves because they've explored similar domains with such depth.
              </p>
            </div>

            <div className={styles.heroPoint}>
              <h3 className={styles.pointTitle}>The Learning Gap</h3>
              <p className={styles.pointText}>
                Experienced engineers don't have time for 50-hour courses. They want to 
                skim through notes and major topics quickly. With AI spreading false information, there's need for 
                authentic, factual content that bridges scattered knowledge into coherent systems understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
