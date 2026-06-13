import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../../_styles/components/sections/home/Section11.module.css';;

export default function Section11() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef3 = useRef<HTMLDivElement>(null);
  const animationRef = useRef(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;
      targetProgress.current = progress;
    };

    const smoothAnimation = () => {
      setScrollProgress(prev => {
        const diff = targetProgress.current - prev;
        const newProgress = prev + (diff * 0.08);
        return Math.max(0, Math.min(1, newProgress));
      });
      
      animationRef.current = requestAnimationFrame(smoothAnimation);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    animationRef.current = requestAnimationFrame(smoothAnimation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (marqueeRef1.current) {
      const translateX = 25 - (scrollProgress * 300);
      marqueeRef1.current.style.transform = `translateX(${translateX}%)`;
    }
    if (marqueeRef3.current) {
      const translateX = -20 + (scrollProgress * 150);
      marqueeRef3.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [scrollProgress]);

  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        <div ref={marqueeRef1} className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {[...Array(12)].map((_, index) => (
              <div key={index} className={styles.marqueeItem}>
                <Image
                  src="/100xsystemsonlytitle.webp"
                  alt="100x Systems"
                  width={500}
                  height={100}
                  className={styles.marqueeImage}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={marqueeRef3} className={`${styles.marqueeTrack} ${styles.center}`}>
          <div className={styles.marqueeContent}>
            {[...Array(12)].map((_, index) => (
              <div key={index} className={styles.marqueeItem}>
                <Image
                  src="/100xsystemsonlytitle.webp"
                  alt="100x Systems"
                  width={500}
                  height={100}
                  className={styles.marqueeImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
