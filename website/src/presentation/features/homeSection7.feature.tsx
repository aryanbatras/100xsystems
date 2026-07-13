'use client';

import Image from 'next/image';
import sec7Styles from '../_styles/css/sections-home-section7.module.css';

export function HomeSection7() {
  return (
    <section className={`${sec7Styles.wallpaperSection} glass-card section-padding`}>
      <div className={sec7Styles.wallpaperContent}>
        <div className={sec7Styles.wallpaperText}>
          <h2 className={sec7Styles.wallpaperTitle}>The Complexity of Modern Systems</h2>
          <p className={sec7Styles.wallpaperDescription}>
            Today&apos;s engineering challenges require more than just coding skills.
            They demand deep understanding of distributed systems, cloud architecture,
            and ability to make critical trade-offs that impact millions of users.
          </p>
        </div>
        <div className={sec7Styles.wallpaperImageWrapper}>
          <Image
            src="/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-cube-shape-systems.jpg"
            alt="Connected Systems"
            width={500}
            height={400}
            className={sec7Styles.wallpaperImage}
          />
        </div>
      </div>
    </section>
  );
}
