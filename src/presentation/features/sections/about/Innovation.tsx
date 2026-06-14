import Image from 'next/image';
import styles from '../../../_styles/components/sections/about/Innovation.module.css';

export default function Innovation() {
  return (
    <div className={styles.innovationSection}>
      <h2 className={styles.sectionTitle}>Revolutionary Learning Approach</h2>
      
      <div className={styles.innovationContent}>
        <div className={styles.innovationBlock}>
          <div className={styles.innovationIcon}>
            <Image
              src="/assets/illustrations/undraw_listening-to-podcasts_j0hm.svg"
              alt="Podcast Learning"
              width={60}
              height={60}
            />
          </div>
          <h3 className={styles.blockTitle}>Podcast-Based Learning</h3>
          <p className={styles.blockText}>
            Instead of 100-hour video courses that nobody watches, we break complex topics into 
            5-10 minute audio segments. Listen while commuting, working, or relaxing. 
            Production quality audio with noise reduction for the best learning experience.
          </p>
        </div>

        <div className={styles.innovationBlock}>
          <div className={styles.innovationIcon}>
            <Image
              src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
              alt="Multiple Perspectives"
              width={60}
              height={60}
            />
          </div>
          <h3 className={styles.blockTitle}>Multi-Perspective Learning</h3>
          <p className={styles.blockText}>
            One topic, multiple expert perspectives. Understand concepts from different 
            senior engineers' viewpoints. Switch between voices, languages (English, Hindi, Bengali, Marathi) 
            for native learning experience.
          </p>
        </div>

        <div className={styles.innovationBlock}>
          <div className={styles.innovationIcon}>
            <Image
              src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
              alt="Always Updated"
              width={60}
              height={60}
            />
          </div>
          <h3 className={styles.blockTitle}>Living Content</h3>
          <p className={styles.blockText}>
            Unlike stale video courses, our articles update instantly with technology changes. 
            Community contributions keep content fresh. Multiple developers can collaborate on the same topic 
            creating comprehensive, always-current knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
}
