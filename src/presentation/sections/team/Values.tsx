import React from 'react';
import styles from '../../_styles/components/sections/team/Values.module.css';;

export function Values(): React.ReactElement {
  const values = [
    {
      title: "Excellence",
      description: "We pursue engineering excellence in everything we build, from code quality to system architecture."
    },
    {
      title: "Innovation",
      description: "We challenge conventional thinking and explore new approaches to solve complex problems."
    },
    {
      title: "Collaboration",
      description: "We believe great systems are built together through knowledge sharing and collective wisdom."
    },
    {
      title: "Integrity",
      description: "We maintain transparency and honesty in our teaching, development, and community interactions."
    }
  ];

  return (
    <section className={styles.valuesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Our Values</h2>
        <p className={styles.sectionDescription}>
          The principles that guide our approach to engineering education and system development.
        </p>
      </div>
      
      <div className={styles.valuesGrid}>
        {values.map((value, index) => (
          <div key={index} className={styles.valueCard}>
            <h3 className={styles.valueTitle}>{value.title}</h3>
            <p className={styles.valueDescription}>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
