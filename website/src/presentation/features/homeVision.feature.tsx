'use client';

import { motion } from 'motion/react';
import visionStyles from '../_styles/css/sections-home-vision.module.css';

export function HomeVision() {
  return (
    <section className={`${visionStyles.section} glass-card section-padding`}>
      <div className={visionStyles.container}>
        <div className={visionStyles.header}>
          <span className={visionStyles.label}>The Vision</span>
          <h2 className={visionStyles.title}>Where this is headed</h2>
          <p className={visionStyles.subtitle}>
            Products, services, infrastructure — all under one brand. Here's the roadmap.
          </p>
        </div>

        <div className={visionStyles.grid}>
          <motion.div
            className={visionStyles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3 className={visionStyles.cardTitle}>Phase 1: MVP</h3>
            <p className={visionStyles.cardText}>
              3-4 products live. The platform works. Community grows. No investors. No noise.
              Just code and execution.
            </p>
          </motion.div>

          <motion.div
            className={visionStyles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className={visionStyles.cardTitle}>Phase 2: Team</h3>
            <p className={visionStyles.cardText}>
              Bring in contributors who believe in the mission. Expand the product line.
              A small, focused team that ships fast and thinks long-term. Still lean.
              Still honest.
            </p>
          </motion.div>

          <motion.div
            className={visionStyles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className={visionStyles.cardTitle}>Phase 3: Products</h3>
            <p className={visionStyles.cardText}>
              A full ecosystem of tools and platforms for engineers who think in systems.
              Build Your X System leads the way. More products follow.
              Each one serves the same mission — make engineers 100xsystems better.
            </p>
          </motion.div>

          <motion.div
            className={visionStyles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className={visionStyles.cardTitle}>Phase 4: Company</h3>
            <p className={visionStyles.cardText}>
              If we earn it — a full-fledged IT company providing services,
              infrastructure, and platforms. That's the destination, not the starting point.
              Today we're building the foundation, one product at a time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
