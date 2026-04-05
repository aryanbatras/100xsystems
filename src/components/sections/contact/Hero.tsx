import styles from '../../../styles/components/sections/contact/Hero.module.css';;

export default function ContactHero() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>Get in Touch</h1>
      <p className={styles.subtitle}>
        Ready to transform your coding skills into engineering excellence?
        Let's start your journey.
      </p>
    </section>
  );
}
