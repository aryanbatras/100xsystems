'use client';

import { useRef } from 'react';
import { useVideoAutoplay } from '../../application/hooks';
import heroStyles from '../_styles/css/sections-about-hero.module.css';
import cinematicStyles from '../_styles/css/sections-about-cinematic.module.css';

export function AboutHero() {
  const videoRef = useRef<any>(null);
  useVideoAutoplay(videoRef);

  return (
    <>
      <div className={heroStyles.heroSection}>
        <img
          ref={videoRef}
          className={heroStyles.heroVideoBackground}
          src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif"
          alt=""
        />
        <div className={heroStyles.heroOverlay}></div>
        <div className={heroStyles.heroContent}>
          <div className={heroStyles.heroMain}>
            <div className={heroStyles.heroHeader}>
              <h1 className={heroStyles.title}>100x Systems</h1>
              <p className={heroStyles.subtitle}>From Developer to Systems Engineer</p>
            </div>
          </div>
        </div>
      </div>

      <div className={cinematicStyles.cinematicSection}>
        <div className={cinematicStyles.cinematicContainer}>
          <div className={cinematicStyles.cinematicHeader}>
            <h2 className={cinematicStyles.cinematicTitle}>Engineering Systems That Matter</h2>
            <p className={cinematicStyles.cinematicDescription}>
              In a world of rapid technological change, systems thinking remains timeless.{' '}
              While frameworks come and go, understanding how systems work—how components interact,{' '}
              how failures cascade, how performance scales—separates senior engineers from junior developers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
