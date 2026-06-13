import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import Image from 'next/image';
import styles from '../../../_styles/components/sections/home/Section7.module.css';;

export default function Section7() {
  return (
    <AnimatedSection animationType="fadeInLeft" delay={0.2}>
      <section className={styles.wallpaperSection} data-speed="0.5">
        <AnimatedSection animationType="fadeInRight" delay={0.4}>
          <div className={styles.wallpaperContent}>
            <div className={styles.wallpaperText}>
              <AnimatedTitle variant="wallpaper" delay={0.1} className={styles.wallpaperTitle}>The Complexity of Modern Systems</AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.3} className={styles.wallpaperDescription}>
                Today's engineering challenges require more than just coding skills. 
                They demand deep understanding of distributed systems, cloud architecture, 
                and ability to make critical trade-offs that impact millions of users.
              </AnimatedDescription>
            </div>
            <div className={styles.wallpaperImageWrapper} data-speed="0.8">
              <Image
                src="/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-cube-shape-systems.jpg"
                alt="Connected Systems"
                width={500}
                height={400}
                className={styles.wallpaperImage}
              />
            </div>
          </div>
        </AnimatedSection>
      </section>
    </AnimatedSection>
  );
}
