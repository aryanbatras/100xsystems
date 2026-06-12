import React from 'react';
import styles from '../../../styles/components/sections/success/Testimonials.module.css';

export function Testimonials(): React.ReactElement {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.sectionTitle}>What Our Learners Say</h2>
      <p className={styles.description}>
        Coming soon: Testimonials from our community members about their learning experience.
      </p>
    </section>
  );
}
