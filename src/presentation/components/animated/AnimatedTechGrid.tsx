import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../_styles/components/animated/AnimatedTechGrid.module.css';;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechItem {
  text: string;
}

interface AnimatedTechGridProps {
  items: TechItem[];
  className?: string;
}

const AnimatedTechGrid = ({ items, className = '' }: AnimatedTechGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const techItems = grid.querySelectorAll(`.${styles.techItem}`);

    gsap.set(techItems, {
      opacity: 0,
      scale: 0.5
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(techItems, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items]);

  return (
    <div ref={gridRef} className={`${styles.techGrid} ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.techItem}>
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTechGrid;
