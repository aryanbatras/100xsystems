import Image from 'next/image';
import styles from '../../../_styles/components/sections/home/AbstractGallery.module.css';;

export default function AbstractGallery() {

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

  return (
    <div className={styles.abstractGallery}>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryHeader}>
          <h2 className={styles.galleryTitle}>
            Abstract Systems Visualization
          </h2>
          <p className={styles.galleryDescription}>
            Explore the intricate beauty of software architecture through abstract visualizations. 
            Each image represents a different facet of systems thinking, from data flow patterns 
            to modular design principles.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {abstractImages.map((image, index) => (
            <div
              key={index}
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
              <div className={styles.galleryContent}
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
