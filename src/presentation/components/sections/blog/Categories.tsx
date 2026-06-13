import React from 'react';
import styles from '../../../_styles/components/sections/blog/Categories.module.css';;

export function Categories(): React.ReactElement {
  const categories = [
    "Engineering Philosophy",
    "System Design", 
    "Career Growth",
    "Frontend",
    "Best Practices",
    "Cloud & DevOps"
  ];

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.sectionTitle}>Categories</h2>
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
