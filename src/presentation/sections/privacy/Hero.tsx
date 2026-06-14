import React from 'react';
import styles from '../../_styles/components/sections/privacy/Hero.module.css';;

export function PrivacyHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>
          Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
        </p>
      </div>
    </section>
  );
}
