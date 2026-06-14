'use client';

import { useRef } from 'react';
import { useVideoAutoplay } from '../../application/hooks';
import missionStyles from '../_styles/css/sections-about-mission.module.css';

export function Mission() {
  const videoRef = useRef<any>(null);
  useVideoAutoplay(videoRef);

  return (
    <div className={`${missionStyles.missionSection} glass-card`}>
      <div className={missionStyles.videoSideBySide}>
        <div className={missionStyles.videoLeft}>
          <img
            ref={videoRef}
            className={missionStyles.missionVideo}
            src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif"
            alt=""
          />
        </div>
        <div className={missionStyles.videoRight}>
          <h2 className={missionStyles.sectionTitle}>Our Mission</h2>
          <p className={missionStyles.missionText}>
            We want engineers to learn systems in college itself, not spend 10 years discovering what{' '}
            senior architects already know. With the right resources and structured path, systems knowledge{' '}
            can be gained during education years, accelerating career growth by decades.
          </p>
          <p className={missionStyles.missionText}>
            This is not a commercial venture—it&apos;s for developer welfare. While many projects exist,{' '}
            nobody talks about systems with such depth. We&apos;re building that missing bridge between{' '}
            rapid development skills and deep systems understanding.
          </p>
          <p className={missionStyles.missionText}>
            Every article includes practical assignments and assessments with outsourced authentic resources.{' '}
            Learn fundamentals, then see how they connect across domains—because systems thinking{' '}
            is the new baseline for engineering excellence.
          </p>
        </div>
      </div>
    </div>
  );
}
