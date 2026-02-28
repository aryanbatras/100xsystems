import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import styles from './AbstractGallery.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AbstractGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const abstractImages = [
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
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
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
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(descriptionRef.current,
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
            trigger: descriptionRef.current,
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={styles.abstractGallery}>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryHeader}>
          <h2 ref={titleRef} className={styles.galleryTitle}>
            Abstract Systems Visualization
          </h2>
          <p ref={descriptionRef} className={styles.galleryDescription}>
            Explore the intricate beauty of software architecture through abstract visualizations. 
            Each image represents a different facet of systems thinking, from data flow patterns 
            to modular design principles.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {abstractImages.map((image, index) => (
            <div
              key={index}
              ref={el => { imageRefs.current[index] = el; }}
              className={styles.galleryImageCard}
            >
              <div className={styles.galleryImageWrapper}>
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className={styles.galleryImage}
                  quality={100}
                  priority={index < 3}
                />
              </div>
              <div
                ref={el => { contentRefs.current[index] = el; }}
                className={styles.galleryContent}
              >
                <h3 className={styles.galleryImageTitle}>{image.title}</h3>
                <p className={styles.galleryImageDescription}>{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
