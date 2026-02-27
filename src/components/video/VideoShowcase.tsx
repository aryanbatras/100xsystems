import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/Home.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VideoShowcase = () => {
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

    // Set initial states
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

    // Create simple scroll-triggered animations
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

    // Video 1 entrance - circle expands first, then text appears
    tl.to(videos[0], { 
      clipPath: 'circle(100vw at 50% 50%)', 
      duration: 2
    })
    .to(titles[0], { 
      opacity: 1, 
      y: 0, 
      duration: 1
    }, '-=0.5');

    // Hold for a bit
    tl.to({}, { duration: 0.5 });

    // Video 1 to Video 2 transition - circle appears first, then fade happens
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

    // Hold for a bit
    tl.to({}, { duration: 0.5 });

    // Video 2 to Video 3 transition - circle appears first, then fade happens
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

    // Final hold with beautiful ending animation
    tl.to({}, { duration: 1 });
    
    // Beautiful ending animation
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
      {/* Video 1 */}
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
      
      {/* Video 2 */}
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
      
      {/* Video 3 */}
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

      {/* Title 1 */}
      <div ref={title1Ref} className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Visualizing System Architecture</h2>
        <p className={styles.videoShowcaseDescription}>
          Most developers just write code. We teach you to see the complete system - how components connect, 
          interact, and form the living architecture that powers real applications.
        </p>
      </div>

      {/* Title 2 */}
      <div ref={title2Ref} className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Understanding Task Orchestration</h2>
        <p className={styles.videoShowcaseDescription}>
          Beyond individual functions lies the art of workflow design. Learn how systems manage 
          complex processes, coordinate resources, and maintain order in chaos.
        </p>
      </div>

      {/* Title 3 */}
      <div ref={title3Ref} className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Intelligent System Connections</h2>
        <p className={styles.videoShowcaseDescription}>
          Modern engineering isn't about coding features - it's about designing intelligent connections. 
          Master how AI, data flows, and components create systems that think and adapt.
        </p>
      </div>
    </div>
  );
};

export default VideoShowcase;
