'use client';

import { motion } from 'motion/react';
import { CubeSmall } from './animation.feature';
import sec3Styles from '../_styles/css/sections-home-section3.module.css';

export function HomeSection3() {
  return (
    <section className={`${sec3Styles.brandStorySection} glass-card`}>
      <div className={sec3Styles.brandStoryContent}>
        <motion.div
          className={sec3Styles.brandStoryText}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className={sec3Styles.brandLabel}>Where we are</span>
          <h2 className={sec3Styles.brandTitle}>100XSystems is a brand.</h2>
          <p className={sec3Styles.brandDescription}>
            We are a growing community of engineers who think in systems. 
            We build products. We build platforms. We build the ecosystem that helps engineers 
            become 100x. But we don't spoon-feed. You build yourself.
          </p>
        </motion.div>

        <motion.div
          className={sec3Styles.brandStoryVisual}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        >
          <div className={sec3Styles.cubeWrapper}>
            <CubeSmall />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
