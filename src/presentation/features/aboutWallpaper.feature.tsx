'use client';

import Image from 'next/image';
import wallpaperStyles from '../_styles/css/sections-about-wallpaper.module.css';

export function Wallpaper() {
  return (
    <div className={`${wallpaperStyles.wallpaperSection} glass-card section-padding`}>
      <div className={wallpaperStyles.wallpaperContent}>
        <div className={wallpaperStyles.wallpaperText}>
          <h2 className={wallpaperStyles.wallpaperTitle}>
            The Engineering Mindset
          </h2>
          <p className={wallpaperStyles.wallpaperDescription}>
            Good engineers don&apos;t just write code. They understand
            problems, make trade-offs, and build things that work in the
            real world.
          </p>
          <div className={wallpaperStyles.wallpaperPoints}>
            <div className={wallpaperStyles.wallpaperPoint}>
              <span className={wallpaperStyles.pointLabel}>
                Systematic Thinking
              </span>
            </div>
            <div className={wallpaperStyles.wallpaperPoint}>
              <span className={wallpaperStyles.pointLabel}>Performance First</span>
            </div>
            <div className={wallpaperStyles.wallpaperPoint}>
              <span className={wallpaperStyles.pointLabel}>Security Mindful</span>
            </div>
          </div>
        </div>
        <div className={wallpaperStyles.wallpaperImageWrapper}>
          <Image
            src="/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-closer-look-red-color.jpg"
            alt="Connected Systems"
            width={400}
            height={500}
            className={wallpaperStyles.wallpaperImage}
          />
        </div>
      </div>
    </div>
  );
}
