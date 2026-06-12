import React from 'react';
import styles from '../../../styles/components/sections/faq/Hero.module.css';

export function FAQHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Find answers to common questions about 100xSystems and our approach to engineering excellence.
        </p>
      </div>
    </section>
  );
}
