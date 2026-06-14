'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import heroStyles from '../_styles/css/sections-home-sectionmain.module.css';

export function HomeHero() {
  return (
    <div className={heroStyles.sectionMain}>

        <h1 className={heroStyles.headline}>
          Build. Ship. Scale. <span className={heroStyles.headlineAccent}>Repeat.</span>
        </h1>

        <p className={heroStyles.tagline}>
          For engineers who build.
        </p>

        <div className={heroStyles.ctaRow}>
          <a href="#products" className={heroStyles.ctaPrimary}>
            See what we build <ArrowRight size={16} />
          </a>
        </div>

      <motion.div className={heroStyles.scrollIndicator}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
      >
        <span>Scroll</span>
        <div className={heroStyles.scrollDot}></div>
      </motion.div>
    </div>
  );
}
