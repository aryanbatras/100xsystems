import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Section3.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const video3Ref = useRef<HTMLVideoElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const title3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const videos = [video1Ref.current, video2Ref.current, video3Ref.current];
    const titles = [title1Ref.current, title2Ref.current, title3Ref.current];

    videos.forEach((video, index) => {
      if (video) {
        gsap.set(video, { 
          clipPath: 'circle(30px at 50% 50%)',
          opacity: index === 0 ? 1 : 0
        });
        video.play();
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
        end: '+=400%',
        pin: true,
        scrub: 3,
        pinSpacing: true,
      },
    });

    tl.to(videos[0], { 
      clipPath: 'circle(100vw at 50% 50%)', 
      duration: 2
    })
    .to(titles[0], { 
      opacity: 1, 
      y: 0, 
      duration: 1
    }, '-=0.5');

    tl.to({}, { duration: 0.5 });

    tl.to(videos[1], { 
      opacity: 1,
      clipPath: 'circle(30px at 50% 50%)',
      duration: 0.5
    })
    .to(videos[1], { 
      clipPath: 'circle(100vw at 50% 50%)', 
      duration: 2
    }, '+=0.2')
    .to(titles[0], { 
      opacity: 0, 
      y: -30, 
      duration: 1 
    }, '-=2.5')
    .to(videos[0], { 
      opacity: 0, 
      duration: 1 
    }, '<')
    .to(titles[1], { 
      opacity: 1, 
      y: 0, 
      duration: 1
    }, '-=0.5');

    tl.to({}, { duration: 0.5 });

    tl.to(videos[2], { 
      opacity: 1,
      clipPath: 'circle(30px at 50% 50%)',
      duration: 0.5
    })
    .to(videos[2], { 
      clipPath: 'circle(100vw at 50% 50%)', 
      duration: 2
    }, '+=0.2')
    .to(titles[1], { 
      opacity: 0, 
      y: -30, 
      duration: 1 
    }, '-=2.5')
    .to(videos[1], { 
      opacity: 0, 
      duration: 1 
    }, '<')
    .to(titles[2], { 
      opacity: 1, 
      y: 0, 
      duration: 1
    }, '-=0.5');

    tl.to({}, { duration: 1 });
    
    tl.to(videos[2], { 
      clipPath: 'circle(20px at 50% 50%)', 
      duration: 2,
      ease: 'power2.inOut'
    })
    .to(titles[2], { 
      opacity: 0, 
      y: 30,
      rotationX: 15,
      duration: 1.5,
      ease: 'power2.in'
    }, '-=2.5');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.videoShowcaseFullWidth}>
      <video
        ref={video1Ref}
        className={styles.videoCircularMask}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
      </video>
      
      <video
        ref={video2Ref}
        className={styles.videoCircularMask}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.mp4" type="video/mp4" />
      </video>
      
      <video
        ref={video3Ref}
        className={styles.videoCircularMask}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/ai-search-systems-connecting-light-animation-google-deepmind.mp4" type="video/mp4" />
      </video>

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
