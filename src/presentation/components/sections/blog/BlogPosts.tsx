import React from 'react';
import styles from '../../../_styles/components/sections/blog/BlogPosts.module.css';;

export function BlogPosts(): React.ReactElement {
  return (
    <section className={styles.postsSection}>
      <h2 className={styles.sectionTitle}>Latest Posts</h2>
      <div className={styles.comingSoonContainer}>
        <div className={styles.comingSoonMessage}>
          <h3>Coming Soon!</h3>
          <p>
            We're preparing insightful articles on engineering excellence, system architecture, 
            and the journey to becoming a 100xEngineer. Stay tuned for expert content 
            that will transform your approach to software development.
          </p>
          <div className={styles.topicsPreview}>
            <h4>Future Topics Include:</h4>
            <ul>
              <li>Depth-First Learning Methodologies</li>
              <li>System Design Patterns</li>
              <li>Performance Optimization Strategies</li>
              <li>Career Growth for Engineers</li>
              <li>Building Scalable Applications</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
