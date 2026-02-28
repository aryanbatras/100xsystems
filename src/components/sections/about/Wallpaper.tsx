import Image from 'next/image';
import styles from './Wallpaper.module.css';

export default function Wallpaper() {
  return (
    <div className={styles.wallpaperSection}>
      <div className={styles.wallpaperContent}>
        <div className={styles.wallpaperText}>
          <h2 className={styles.wallpaperTitle}>
            The Engineering Mindset
          </h2>
          <p className={styles.wallpaperDescription}>
            Good engineers don't just write code. They understand
            problems, make trade-offs, and build things that work in the
            real world.
          </p>
          <div className={styles.wallpaperPoints}>
            <div className={styles.wallpaperPoint}>
              <span className={styles.pointIcon}>🔧</span>
              <span className={styles.pointLabel}>
                Systematic Thinking
              </span>
            </div>
            <div className={styles.wallpaperPoint}>
              <span className={styles.pointIcon}>⚡</span>
              <span className={styles.pointLabel}>Performance First</span>
            </div>
            <div className={styles.wallpaperPoint}>
              <span className={styles.pointIcon}>🛡️</span>
              <span className={styles.pointLabel}>Security Mindful</span>
            </div>
          </div>
        </div>
        <div className={styles.wallpaperImageWrapper}>
          <Image
            src="/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-closer-look-red-color.jpg"
            alt="Connected Systems"
            width={400}
            height={500}
            className={styles.wallpaperImage}
          />
        </div>
      </div>
    </div>
  );
}
