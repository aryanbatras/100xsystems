import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import Image from 'next/image';
import styles from '../../styles/components/sections/paths/LearningApproach.module.css';

export default function LearningApproach() {
  return (
    <AnimatedSection animationType="fadeInRight" delay={0.3}>
      <section className={styles.approachSection} data-speed="0.9">
        <div className={styles.approachContent}>
          <div className={styles.approachHeader} data-speed="0.95">
            <AnimatedTitle variant="section" className={styles.sectionTitle}>
              Learning Approach
            </AnimatedTitle>
          </div>
          
          <div className={styles.approachGrid}>
            <div className={styles.approachBlock} data-speed="0.98">
              <div className={styles.approachIcon}>
                <Image
                  src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
                  alt="Article-Based Learning"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.approachTitle}>Article-Based Excellence</h3>
              <div className={styles.approachDescription}>
                <p>Unlike video-based platforms where content becomes stale and outdated within months, our article-based approach ensures knowledge remains evergreen and continuously relevant.</p>
                <p>Articles can be <strong>skimmed efficiently</strong>, <strong>updated instantly</strong>, and <strong>open-sourced</strong> for community contributions. No more sitting through 50-hour video courses that nobody actually completes.</p>
                <p>Best for busy software engineers who need to <strong>upskill quickly</strong> without the cognitive load of video consumption.</p>
              </div>
            </div>

            <div className={styles.approachBlock} data-speed="0.99">
              <div className={styles.approachIcon}>
                <Image
                  src="/assets/illustrations/undraw_listening-to-podcasts_j0hm.svg"
                  alt="Podcast Learning"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.approachTitle}>Podcast-Style Learning</h3>
              <div className={styles.approachDescription}>
                <p>What makes us truly revolutionary is our <strong>podcast-style learning</strong> layered on top of articles. Complex topics broken into <strong>5-10 minute audio segments</strong> you can consume while commuting, working, or relaxing.</p>
                <p>Coming soon: <strong>Multi-language support</strong> with voice narration in English, Hindi, Bengali, Marathi, and even your native language. Learning in your mother tongue - because understanding concepts in your native language accelerates comprehension.</p>
                <p>Production-quality audio with noise reduction for the best learning experience anywhere, anytime.</p>
              </div>
            </div>

            <div className={styles.approachBlock} data-speed="1.0">
              <div className={styles.approachIcon}>
                <Image
                  src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
                  alt="Flexible Learning"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.approachTitle}>Enjoyable & Flexible</h3>
              <div className={styles.approachDescription}>
                <p>We believe in <strong>enjoyable learning experiences</strong> that <strong>fit into your schedule</strong> seamlessly. No more rigid timetables or overwhelming course structures.</p>
                <p>Learn at your own pace, in your preferred format - read articles, listen to podcasts, or combine both. Our adaptive learning system adjusts to your style, not the other way around.</p>
                <p>Perfect for <strong>busy software engineers</strong> who want to upskill themselves without sacrificing their work-life balance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
