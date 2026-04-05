import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../../styles/components/sections/home/Section3.module.css';;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const content1Ref = useRef<HTMLDivElement>(null);
  const content2Ref = useRef<HTMLDivElement>(null);
  const content3Ref = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const title3Ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const contents = [content1Ref.current, content2Ref.current, content3Ref.current];
    const titles = [title1Ref.current, title2Ref.current, title3Ref.current];

    contents.forEach((content, index) => {
      if (content) {
        gsap.set(content, { 
          opacity: index === 0 ? 1 : 0
        });
      }
    });

    titles.forEach((title, index) => {
      if (title) {
        gsap.set(title, { 
          opacity: 0, 
          y: 30
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1.8,
        pinSpacing: true,
      },
    });

    tl.to(contents[0], { 
      opacity: 0.1, 
      duration: 2
    })
    .to(titles[0], { 
      opacity: 1, 
      y: 0, 
      duration: 1
    }, '-=0.5');

    tl.to({}, { duration: 1 });

    tl.to(contents[1], { 
      opacity: 0.1,
      duration: 0.5
    })
    .to(contents[1], { 
      opacity: 0.1, 
      duration: 2
    }, '+=0.2')
    .to(titles[0], { 
      opacity: 0, 
      y: -30, 
      duration: 1 
    }, '-=1.5')
    .to(contents[0], { 
      opacity: 0, 
      duration: 1 
    }, '-=1.5')
    .to(titles[1], { 
      opacity: 1, 
      y: 0, 
      duration: 1
    }, '-=1.8');

    tl.to({}, { duration: 1 });

    tl.to(contents[2], { 
      opacity: 0.1,
      duration: 0.5
    })
    .to(contents[2], { 
      opacity: 0.1, 
      duration: 2
    }, '+=0.2')
    .to(titles[1], { 
      opacity: 0, 
      y: -30, 
      duration: 1 
    }, '-=1.5')
    .to(contents[1], { 
      opacity: 0, 
      duration: 1 
    }, '-=1.5')
    .to(titles[2], { 
      opacity: 1, 
      y: 0, 
      duration: 1
    }, '-=1.8');

    tl.to({}, { duration: 1 });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.videoShowcaseFullWidth} data-speed="0.8">
      <div
        ref={content1Ref}
        className={styles.minimalistContent}
      />
      
      <div
        ref={content2Ref}
        className={styles.minimalistContent}
      />
      
      <div
        ref={content3Ref}
        className={styles.minimalistContent}
      />

      <div className={styles.videoOverlay}></div>

      <div ref={title1Ref} className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>From Developer to Systems Engineer</h2>
        <p className={styles.videoShowcaseDescription}>
          Most developers learn technologies quickly but miss systems perspective. We teach you to understand complete software lifecycle - from frontend architecture to deployment patterns. Transform how you think about code and become engineer who builds scalable, maintainable systems that stand test of time.
        </p>
      </div>

      <div ref={title2Ref} className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Depth Over Breadth Learning</h2>
        <p className={styles.videoShowcaseDescription}>
          Stop collecting certificates and start building real expertise. Our structured learning paths focus on mastering fundamentals that never become obsolete. Learn one language deeply, understand systems architecture, and gain engineering judgment that separates senior engineers from junior developers.
        </p>
      </div>

      <div ref={title3Ref} className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Build Systems That Matter</h2>
        <p className={styles.videoShowcaseDescription}>
          AI can generate code, but only engineers understand systems. Learn to make architectural decisions, solve complex problems, and lead technical teams. Join 100xEngineer cohort where we build real projects, understand constraints, and develop engineering mindset that creates career opportunities.
        </p>
      </div>
    </div>
  );
}
