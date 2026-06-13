import styles from '../../../_styles/components/sections/home/Section3.module.css';;

export default function Section3() {
  return (
    <div className={styles.videoShowcaseFullWidth}>
      <div className={styles.minimalistContent} />
      <div className={styles.minimalistContent} />
      <div className={styles.minimalistContent} />

      <div className={styles.videoOverlay}></div>

      <div className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>From Developer to Systems Engineer</h2>
        <p className={styles.videoShowcaseDescription}>
          Most developers learn technologies quickly but miss systems perspective. We teach you to understand complete software lifecycle - from frontend architecture to deployment patterns. Transform how you think about code and become engineer who builds scalable, maintainable systems that stand test of time.
        </p>
      </div>

      <div className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Depth Over Breadth Learning</h2>
        <p className={styles.videoShowcaseDescription}>
          Stop collecting certificates and start building real expertise. Our structured learning paths focus on mastering fundamentals that never become obsolete. Learn one language deeply, understand systems architecture, and gain engineering judgment that separates senior engineers from junior developers.
        </p>
      </div>

      <div className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Build Systems That Matter</h2>
        <p className={styles.videoShowcaseDescription}>
          AI can generate code, but only engineers understand systems. Learn to make architectural decisions, solve complex problems, and lead technical teams. Join 100xEngineer cohort where we build real projects, understand constraints, and develop engineering mindset that creates career opportunities.
        </p>
      </div>
    </div>
  );
}
