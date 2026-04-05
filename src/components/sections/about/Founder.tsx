import Image from 'next/image';
import styles from '../../styles/components/sections/about/Founder.module.css';

export default function Founder() {
  return (
    <div className={styles.founderSection}>
      <div className={styles.founderContent}>
        <div className={styles.founderLeft}>
          <Image
            src="/aryan.webp"
            alt="Aryan Batra - Founder of 100xSystems"
            width={300}
            height={300}
            className={styles.founderImage}
          />
          <div className={styles.founderLinks}>
            <a
              href="https://aryanbatra.is-a.dev"
              className={styles.founderLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              aryanbatra.is-a.dev
            </a>
          </div>
        </div>
        <div className={styles.founderRight}>
          <h2 className={styles.sectionTitle}>Founded by Aryan Batra</h2>
          <p className={styles.founderText}>
            100xSystems is founded and led by Aryan Batra, who serves as
            the Founder & Project Lead. With a team of 5+ contributors,
            this initiative represents a genuine commitment to elevating
            software engineering education.
          </p>
          <p className={styles.founderText}>
            This isn't just another course platform—it's a personal
            mission to help software engineers become truly exceptional at
            their craft. In an era where AI can generate code, the real
            value lies in understanding systems, making architectural
            decisions, and solving problems that machines cannot.
          </p>
        </div>
      </div>
    </div>
  );
}
