import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import styles from './Section1.module.css';
import cinematicStyles from './cinematic.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Section1() {
  const rubikSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  const cinematicSectionRef = useRef<HTMLDivElement>(null);
  const cinematicTitleRef = useRef<HTMLHeadingElement>(null);
  const cinematicDescriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const carouselImages = [
    {
      src: '/assets/carousel/lucid-origin_Abstract_3D_visualization_of_structured_data_flow_composed_of_matte_black_geomet-0.jpg',
      title: 'Structured Data Flow',
      description: 'Complex systems visualized as interconnected geometric patterns'
    },
    {
      src: '/assets/carousel/lucid-origin_Abstract_visualization_of_interconnected_microservices_represented_as_floating_m-0.jpg',
      title: 'Microservices Architecture',
      description: 'Distributed systems working in perfect harmony'
    },
    {
      src: '/assets/carousel/lucid-origin_Minimal_abstract_architectural_composition_of_modular_matte_black_cubes_arranged-0.jpg',
      title: 'Modular Design',
      description: 'Building blocks that form robust, scalable systems'
    },
    {
      src: "/assets/carousel/lucid-origin_Ultra_high-resolution_cinematic_3D_render_of_a_matte_black_Rubiks_cube_restin-0.jpg",
      title: 'System Complexity',
      description: 'Every piece has its place in larger puzzle'
    },
    {
      src: "/assets/carousel/lucid-origin_Ultra_minimal_3D_render_of_a_matte_black_Rubiks_cube_partially_disassembled_i-0.jpg",
      title: 'Deconstructed Thinking',
      description: 'Understanding systems by breaking them down'
    },
    {
      src: '/assets/carousel/lucid-origin_Wide_cinematic_composition_showing_architectural_evolution_from_left_to_right._O-0.jpg',
      title: 'Architectural Evolution',
      description: 'From simple concepts to complex, elegant solutions'
    }
  ];

  useEffect(() => {
    if (!rubikSectionRef.current) return;

    const section = rubikSectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (video) {
      gsap.set(video, { 
        scale: 1,
        opacity: 1,
      });
      video.play();
    }

    if (title) {
      gsap.set(title, { 
        opacity: 1, 
        y: 0
      });
    }

    if (subtitle) {
      gsap.set(subtitle, { 
        opacity: 0.9, 
        y: 0
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: '10% top',
        end: '75% 75%',
        scrub: 1
      }
    });

    if (video) {
      tl.to(video, {
        scale: 1.25,
        ease: 'easeInOut'
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([video, title, subtitle]);
    };
  }, []);

  useEffect(() => {
    if (!cinematicSectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cinematicTitleRef.current,
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cinematicTitleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(cinematicDescriptionRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cinematicDescriptionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;

        gsap.fromTo(ref,
          {
            opacity: 0,
            scale: 0.8,
            y: 100
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        gsap.to(ref.querySelector('img'), {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: ref,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });

      contentRefs.current.forEach((ref, index) => {
        if (!ref) return;

        gsap.fromTo(ref,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.8 + index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, cinematicSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={rubikSectionRef} className={styles.rubikVideoShowcase}>
        <video
          ref={videoRef}
          className={styles.rubikVideoBackground}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/man_solving_rubik_cube_1_minute_long_no_face.mp4" type="video/mp4" />
        </video>
        
        <div className={styles.rubikVideoOverlay}></div>
        
        <div className={styles.rubikVideoContent}>
          <div ref={titleRef} className={styles.rubikVideoTitle}>
            <img
              src="/100xsystemsonlytitle.png"
              alt="100x Systems"
              width={400}
              height={80}
              className={styles.titleLogo}
              loading="eager" 
            />
          </div>
          <p ref={subtitleRef} className={styles.rubikVideoSubtitle}>
            Master Rubik's Cube of Software Engineering
          </p>
        </div>
      </div>

      <div ref={cinematicSectionRef} className={cinematicStyles.cinematicSection}>
        <div className={cinematicStyles.cinematicContainer}>
          <div className={cinematicStyles.cinematicHeader}>
            <h2 ref={cinematicTitleRef} className={cinematicStyles.cinematicTitle}>
              Systems Thinking in Engineering
            </h2>
            <p ref={cinematicDescriptionRef} className={cinematicStyles.cinematicDescription}>
              Like a Rubik's Cube, software systems appear simple but hide immense complexity. 
              Most developers focus on one aspect—building features—without understanding how 
              all components work together to create robust, scalable solutions.
            </p>
          </div>

          <div className={cinematicStyles.cinematicGrid}>
            {carouselImages.map((image, index) => (
              <div
                key={index}
                ref={el => { imageRefs.current[index] = el; }}
                className={cinematicStyles.cinematicImageCard}
              >
                <div className={cinematicStyles.cinematicImageWrapper}>
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className={cinematicStyles.cinematicImage}
                    quality={100}
                    priority={index < 3}
                  />
                </div>
                <div
                  ref={el => { contentRefs.current[index] = el; }}
                  className={cinematicStyles.cinematicContent}
                >
                  <h3 className={cinematicStyles.cinematicImageTitle}>{image.title}</h3>
                  <p className={cinematicStyles.cinematicImageDescription}>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
