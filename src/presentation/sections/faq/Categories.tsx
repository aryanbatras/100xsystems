import React from 'react';
import styles from '../../_styles/components/sections/faq/Categories.module.css';

export function Categories(): React.ReactElement {
  const categories = [
    "Getting Started",
    "Learning Paths",
    "Technical Support",
    "Account & Billing",
    "Community"
  ];

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.sectionTitle}>Browse by Category</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <div key={index} className={styles.categoryCard}>
            <span className={styles.categoryName}>{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
