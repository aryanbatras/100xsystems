import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.title}>100x Systems</h1>
          <p className={styles.subtitle}>Engineering Excellence Through Structured Learning</p>
          <p className={styles.description}>
            Transform your passion for coding into engineering mastery. Our comprehensive learning ecosystem 
            takes you from developer to engineer through systematic progression and real-world system building.
          </p>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>What You'll Master</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>01</div>
              <h3 className={styles.featureTitle}>Deep Technical Understanding</h3>
              <p className={styles.featureDescription}>
                Go beyond surface-level knowledge to truly understand how systems work from the ground up
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>02</div>
              <h3 className={styles.featureTitle}>Systems Thinking</h3>
              <p className={styles.featureDescription}>
                Learn to architect scalable solutions and understand the trade-offs engineers make every day
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>03</div>
              <h3 className={styles.featureTitle}>Real-World Application</h3>
              <p className={styles.featureDescription}>
                Build production-ready systems that demonstrate true engineering capabilities
              </p>
            </div>
          </div>
        </section>

        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>By The Numbers</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1000+</div>
              <div className={styles.statLabel}>Engineers Trained</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>95%</div>
              <div className={styles.statLabel}>Career Success Rate</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Industry Projects</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Community Support</div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Become an Engineer?</h2>
          <p className={styles.ctaText}>
            Join thousands who've transformed their careers through our structured learning pathways
          </p>
          <Link href="/paths" className={styles.ctaButton}>
            Start Your Journey
          </Link>
        </section>
      </div>
    </div>
  );
}