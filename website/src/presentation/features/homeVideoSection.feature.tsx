'use client';

import { useRef } from 'react';
import { useVideoAutoplay } from '../../application/hooks';
import videoStyles from '../_styles/css/sections-home-video.module.css';

export function HomeVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoAutoplay(videoRef);

  return (
    <div className={videoStyles.section}>
      <video
        ref={videoRef}
        className={videoStyles.video}
        src="/video/man_solving_rubik_cube_1_minute_long_no_face%20(2).mp4"
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className={videoStyles.overlay} />
      <div className={videoStyles.content}>
        <span className={videoStyles.label}>Part 2</span>
        <h2 className={videoStyles.title}>Master Rubik Cube of Software Engineering</h2>
      </div>
    </div>
  );
}
