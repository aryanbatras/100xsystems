import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiDocker, 
  SiKubernetes, 
  SiAmazon, 
  SiGooglecloud, 
  SiGit,
  SiLinux,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiNginx,
  SiTerraform,
  SiJenkins,
  SiPrometheus,
  SiGrafana,
  SiVuedotjs,
  SiAngular,
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiGraphql,
  SiApachekafka,
  SiElasticsearch,
  SiWebpack,
  SiVite,
  SiJest,
  SiCypress,
  SiFigma,
  SiSlack,
  SiJira,
  SiNotion,
  SiEraser
} from 'react-icons/si';
import AnimatedSection from '../../components/animated/AnimatedSection';
import AnimatedCard from '../../components/animated/AnimatedCard';
import AnimatedTitle from '../../components/animated/AnimatedTitle';
import AnimatedDescription from '../../components/animated/AnimatedDescription';
import InteractiveButton from '../../components/animated/InteractiveButton';
import styles from '../../styles/Paths.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const techIcons = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nodejs: SiNodedotjs,
  python: SiPython,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  aws: SiAmazon,
  gcp: SiGooglecloud,
  git: SiGit,
  linux: SiLinux,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  redis: SiRedis,
  nginx: SiNginx,
  terraform: SiTerraform,
  jenkins: SiJenkins,
  prometheus: SiPrometheus,
  grafana: SiGrafana,
  vue: SiVuedotjs,
  angular: SiAngular,
  nextjs: SiNextdotjs,
  express: SiExpress,
  django: SiDjango,
  flask: SiFlask,
  fastapi: SiFastapi,
  graphql: SiGraphql,
  kafka: SiApachekafka,
  elasticsearch: SiElasticsearch,
  webpack: SiWebpack,
  vite: SiVite,
  jest: SiJest,
  cypress: SiCypress,
  figma: SiFigma,
  slack: SiSlack,
  jira: SiJira,
  notion: SiNotion,
  eraser: SiEraser
};

interface TechStackProps {
  technologies: string[];
  className?: string;
}

const TechStack: React.FC<TechStackProps> = ({ technologies, className = '' }) => {
  return (
    <div className={`${styles.techStack} ${className}`}>
      {technologies.map((tech, index) => {
        const IconComponent = techIcons[tech as keyof typeof techIcons];
        return IconComponent ? (
          <div key={index} className={styles.techItem}>
            <IconComponent className={styles.techIcon} />
            <span className={styles.techName}>{tech}</span>
          </div>
        ) : null;
      })}
    </div>
  );
};

interface PathCardProps {
  number: string;
  title: string;
  duration: string;
  description: string;
  features: string[];
  technologies: string[];
  delay?: number;
}

const PathCard: React.FC<PathCardProps> = ({ 
  number, 
  title, 
  duration, 
  description, 
  features, 
  technologies,
  delay = 0 
}) => {
  const getPathImage = () => {
    switch(title) {
      case 'Foundation':
        return '/assets/wallpaper/3d-granular-cube-gray-bg-center.jpg';
      case 'Advanced Systems':
        return '/assets/carousel/lucid-origin_Wide_cinematic_composition_showing_architectural_evolution_from_left_to_right._O-0.jpg';
      case 'Engineering Mastery':
        return '/assets/wallpaper/hand-one-finger-rubik-cube-holded-like-pro.jpg';
      default:
        return '/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-closer-look-red-color.jpg';
    }
  };

  const getBackgroundImage = () => {
    switch(title) {
      case 'Foundation':
        return '/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-cube-shape-systems.jpg';
      case 'Advanced Systems':
        return '/assets/wallpaper/modern-dotted-sphere-with-red-glowing-ring-within-bg-black.jpg';
      case 'Engineering Mastery':
        return '/assets/wallpaper/rubik-cube-portrait-right-side-getting-broken-in-pieces-on-left-side.jpg';
      default:
        return '/assets/wallpaper/black-web-like-lines-white-bg.jpg';
    }
  };

  return (
    <AnimatedCard hoverEffect="lift" className={styles.pathCard} data-delay={delay}>
      <div className={styles.pathCardBackground}>
        <Image
          src={getBackgroundImage()}
          alt={`${title} Background`}
          fill
          className={styles.pathCardBackgroundImage}
        />
      </div>
      <div className={styles.pathCardContent}>
        <div className={styles.pathNumber}>{number}</div>
        <h3 className={styles.pathTitle}>{title}</h3>
        <div className={styles.pathDuration}>{duration}</div>
        <div className={styles.pathImageWrapper}>
          <Image
            src={getPathImage()}
            alt={title}
            width={300}
            height={150}
            className={styles.pathImage}
          />
        </div>
        <div className={styles.pathDescription}>{description}</div>
      
      <div className={styles.pathFeatures}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            {feature}
          </div>
        ))}
      </div>
      
      <div className={styles.techSection}>
        <h4 className={styles.techTitle}>Tech Stack</h4>
        <TechStack technologies={technologies} />
      </div>
      
      <InteractiveButton 
        variant="secondary" 
        href="/contact"
        className={styles.pathButton}
        scrambleText={{
          hover: "START YOUR JOURNEY",
          speed: 2,
          chars: "upperCase",
          revealDelay: 0.1
        }}
      >
        Start {title}
      </InteractiveButton>
      </div>
    </AnimatedCard>
  );
};

export default function Paths() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const parallax = parallaxRef.current;

    // Add user interaction to enable autoplay
    const handleUserInteraction = () => {
      if (video) {
        video.play().catch(error => {
          console.log('Video play failed:', error);
        });
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      }
    };

    // Set initial states
    if (video) {
      // Try to play, if it fails, wait for user interaction
      video.play().catch(() => {
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);
      });
    }

    // Text parallax effect
    if (title && parallax) {
      gsap.set(title, { 
        opacity: 1, 
        y: 0
      });
    }

    if (subtitle && parallax) {
      gsap.set(subtitle, { 
        opacity: 0.9, 
        y: 0
      });
    }

    // Scroll-based parallax for text
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    if (title && parallax) {
      tl.to(title, {
        y: -50,
        ease: 'none'
      }, 0);
    }

    if (subtitle && parallax) {
      tl.to(subtitle, {
        y: -30,
        ease: 'none'
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([title, subtitle]);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div ref={parallaxRef} className={styles.heroBackground}>
          <video 
            autoPlay
            muted 
            loop 
            playsInline 
            className={styles.heroBackgroundVideo}
          >
            <source src="/videos/shinning-mirror-advanced-abstract-google-deepmind.mp4" type="video/mp4" />
          </video>
        </div>
        
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroTextContent}>
            <h1 className="hero-title">
              <AnimatedTitle variant="hero" className={styles.title}>
                Engineering Excellence Paths
              </AnimatedTitle>
            </h1>
            
            <div className="hero-subtitle">
              <AnimatedDescription variant="featured" className={styles.subtitle}>
                Transform from developer to 100xEngineer through structured, depth-first learning pathways 
                designed for real-world system mastery
              </AnimatedDescription>
            </div>
            
            <div className="hero-description">
              <AnimatedDescription variant="subtle" className={styles.heroDescription}>
                Our paths are built on the philosophy that true engineering excellence comes from 
                understanding systems deeply—not just collecting technologies. Each pathway represents 
                a stage in your evolution from writing code to architecting solutions that scale.
              </AnimatedDescription>
            </div>
          </div>
        </div>
      </section>
      
      <div className={styles.container}>
        <div className={styles.heroSpacer}></div>

        <AnimatedSection animationType="fadeInUp" delay={0.2}>
          <section className={styles.videoShowcaseSection}>
            <div className={styles.videoShowcaseContent}>
              <div className={styles.videoShowcaseText}>
                <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
                  Advanced Systems Thinking
                </AnimatedTitle>
                <AnimatedDescription variant="featured" delay={0.3} className={styles.videoShowcaseDescription}>
                  Master the art of building complex systems that scale. Learn to think like an architect, 
                  make critical design decisions, and understand the trade-offs that separate good engineers from great ones.
                </AnimatedDescription>
              </div>
              <div className={styles.videoShowcaseVideo}>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className={styles.shiningMirrorVideo}
                >
                  <source src="/videos/shinning-mirror-advanced-abstract-google-deepmind.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="fadeInRight" delay={0.3}>
          <section className={styles.approachSection}>
            <div className={styles.approachBackground}>
              <Image
                src="/assets/wallpaper/eye-with-code-reflection.png"
                alt="Code Reflection Background"
                fill
                className={styles.approachBackgroundImage}
              />
            </div>
            <div className={styles.approachContent}>
              <div className={styles.approachHeader}>
                <AnimatedTitle variant="section" className={styles.sectionTitle}>
                  Revolutionary Learning Approach
                </AnimatedTitle>
                <AnimatedDescription variant="subtle" className={styles.sectionSubtitle}>
                  We're not just another learning platform. We're fundamentally changing how engineers acquire knowledge.
                </AnimatedDescription>
              </div>
              
              <div className={styles.approachGrid}>
                <div className={styles.approachBlock}>
                  <div className={styles.approachIcon}>
                    <Image
                      src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
                      alt="Article-Based Learning"
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3 className={styles.approachTitle}>Article-Based Excellence</h3>
                  <div className={styles.approachDescription}>
                    <p>Unlike video-based platforms where content becomes stale and outdated within months, our article-based approach ensures knowledge remains evergreen and continuously relevant.</p>
                    <p>Articles can be <strong>skimmed efficiently</strong>, <strong>updated instantly</strong>, and <strong>open-sourced</strong> for community contributions. No more sitting through 50-hour video courses that nobody actually completes.</p>
                    <p>Best for busy software engineers who need to <strong>upskill quickly</strong> without the cognitive load of video consumption.</p>
                  </div>
                </div>

                <div className={styles.approachBlock}>
                  <div className={styles.approachIcon}>
                    <Image
                      src="/assets/illustrations/undraw_listening-to-podcasts_j0hm.svg"
                      alt="Podcast Learning"
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3 className={styles.approachTitle}>Podcast-Style Learning</h3>
                  <div className={styles.approachDescription}>
                    <p>What makes us truly revolutionary is our <strong>podcast-style learning</strong> layered on top of articles. Complex topics broken into <strong>5-10 minute audio segments</strong> you can consume while commuting, working, or relaxing.</p>
                    <p>Coming soon: <strong>Multi-language support</strong> with voice narration in English, Hindi, Bengali, Marathi, and even your native language. Learning in your mother tongue - because understanding concepts in your native language accelerates comprehension.</p>
                    <p>Production-quality audio with noise reduction for the best learning experience anywhere, anytime.</p>
                  </div>
                </div>

                <div className={styles.approachBlock}>
                  <div className={styles.approachIcon}>
                    <Image
                      src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
                      alt="Flexible Learning"
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3 className={styles.approachTitle}>Enjoyable & Flexible</h3>
                  <div className={styles.approachDescription}>
                    <p>We believe in <strong>enjoyable learning experiences</strong> that <strong>fit into your schedule</strong> seamlessly. No more rigid timetables or overwhelming course structures.</p>
                    <p>Learn at your own pace, in your preferred format - read articles, listen to podcasts, or combine both. Our adaptive learning system adjusts to your style, not the other way around.</p>
                    <p>Perfect for <strong>busy software engineers</strong> who want to upskill themselves without sacrificing their work-life balance.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="scaleIn" stagger={0.2}>
          <section className={styles.pathsGrid}>
            <PathCard
              number="01"
              title="Foundation"
              duration="3-6 Months"
              description="Master one programming language deeply and understand the complete software lifecycle. Build the engineering mindset that separates developers from systems engineers."
              features={[
                "Deep Language Mastery (JavaScript/TypeScript)",
                "System Design Fundamentals",
                "Data Structures & Algorithms in Practice",
                "Full-Stack Development (Frontend + Backend)",
                "Version Control & Collaborative Development",
                "Testing & Quality Assurance",
                "Basic DevOps & Deployment"
              ]}
              technologies={[
                'javascript', 'typescript', 'react', 'nodejs',
                'python', 'git', 'linux', 'mongodb', 'postgresql',
                'redis', 'nginx', 'express', 'django', 'flask', 'fastapi'
              ]}
              delay={0.1}
            />

            <PathCard
              number="02"
              title="Advanced Systems"
              duration="6-12 Months"
              description="Design and build scalable, production-ready systems. Learn advanced patterns, security engineering, and cloud infrastructure that powers modern applications."
              features={[
                "Advanced System Architecture",
                "Microservices & Distributed Systems",
                "Cloud Native Development",
                "Security Engineering & Best Practices",
                "Performance Optimization",
                "Advanced DevOps & CI/CD",
                "Database Design & Optimization"
              ]}
              technologies={[
                'docker', 'kubernetes', 'aws', 'gcp', 'terraform',
                'prometheus', 'grafana', 'jenkins', 'kafka', 'elasticsearch',
                'webpack', 'vite', 'jest', 'cypress', 'graphql'
              ]}
              delay={0.2}
            />

            <PathCard
              number="03"
              title="Engineering Mastery"
              duration="12+ Months"
              description="Lead complex system design, mentor engineering teams, and make architectural decisions that impact millions. Become the engineer who can build anything."
              features={[
                "Enterprise Architecture Design",
                "Team Leadership & Technical Mentoring",
                "Technology Strategy & Decision Making",
                "System Scalability & Reliability",
                "Product Thinking & Business Acumen",
                "Innovation & Research",
                "Career Development & Networking"
              ]}
              technologies={[
                'figma', 'jira', 'notion', 'slack', 'eraser'
              ]}
              delay={0.3}
            />
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="fadeInLeft" delay={0.2}>
          <section className={styles.journeySection}>
            <div className={styles.journeyContent}>
              <div className={styles.journeyLeft}>
                <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
                  Your Engineering Journey
                </AnimatedTitle>
                <AnimatedDescription variant="featured" delay={0.3} className={styles.journeyText}>
                  Each path is carefully structured to build upon previous knowledge, 
                  ensuring you develop the deep understanding required for true engineering excellence. 
                  Progress through hands-on projects, real-world challenges, and mentorship from experienced engineers.
                </AnimatedDescription>
                
                <div className={styles.journeyStages}>
                  <div className={styles.stage}>
                    <div className={styles.stageIcon}>
                      <Image
                        src="/assets/illustrations/undraw_ideation_r1g5.svg"
                        alt="Foundation"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className={styles.stageContent}>
                      <h4 className={styles.stageTitle}>Foundation</h4>
                      <div className={styles.stageDesc}>Build deep technical understanding</div>
                    </div>
                  </div>
                  
                  <div className={styles.stage}>
                    <div className={styles.stageIcon}>
                      <Image
                        src="/assets/illustrations/undraw_developer-activity_4zqd.svg"
                        alt="Development"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className={styles.stageContent}>
                      <h4 className={styles.stageTitle}>Application</h4>
                      <div className={styles.stageDesc}>Apply knowledge to real systems</div>
                    </div>
                  </div>
                  
                  <div className={styles.stage}>
                    <div className={styles.stageIcon}>
                      <Image
                        src="/assets/illustrations/undraw_project-completed_ug9i.svg"
                        alt="Mastery"
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className={styles.stageContent}>
                      <h4 className={styles.stageTitle}>Mastery</h4>
                      <div className={styles.stageDesc}>Lead and architect complex solutions</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.journeyRight}>
                <div className={styles.journeyImageWrapper}>
                  <video autoPlay muted loop playsInline className={styles.journeyVideo}>
                    <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="fadeInUp" delay={0.2}>
          <section className={styles.outcomesSection}>
            <AnimatedTitle variant="section" className={styles.sectionTitle}>
              Engineering Outcomes
            </AnimatedTitle>
            
            <div className={styles.outcomesGrid}>
              <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard}>
                <div className={styles.outcomeIcon}>
                  <Image
                    src="/assets/illustrations/undraw_proud-coder_bivp.svg"
                    alt="Career Growth"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className={styles.outcomeTitle}>Career Acceleration</h3>
                <div className={styles.outcomeDescription}>
                  Move from junior developer to senior engineer 5x faster through 
                  systems thinking and architectural expertise.
                </div>
              </AnimatedCard>

              <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard}>
                <div className={styles.outcomeIcon}>
                  <Image
                    src="/assets/illustrations/undraw_web-development_f0tp.svg"
                    alt="System Architecture"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className={styles.outcomeTitle}>System Architecture</h3>
                <div className={styles.outcomeDescription}>
                  Design and build scalable systems that handle millions of users 
                  with confidence and engineering precision.
                </div>
              </AnimatedCard>

              <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard}>
                <div className={styles.outcomeIcon}>
                  <Image
                    src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
                    alt="Leadership"
                    width={80}
                    height={80}
                  />
                </div>
                <h3 className={styles.outcomeTitle}>Engineering Leadership</h3>
                <div className={styles.outcomeDescription}>
                  Lead technical teams, make architectural decisions, and mentor 
                  next generation of engineers.
                </div>
              </AnimatedCard>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="fadeInLeft" delay={0.2}>
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <AnimatedTitle variant="cta" delay={0.1} className={styles.ctaTitle}>
                Ready to Become a 100xEngineer?
              </AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.3} className={styles.ctaText}>
                Join engineers who've transformed their careers through our structured pathways. 
                Stop collecting certificates and start building real engineering expertise.
              </AnimatedDescription>
              
              <div className={styles.ctaButtons}>
                <InteractiveButton 
                  variant="primary" 
                  href="/contact"
                  scrambleText={{
                    hover: "START YOUR JOURNEY",
                    speed: 2,
                    chars: "upperCase",
                    revealDelay: 0.1
                  }}
                >
                  Start Your Journey
                </InteractiveButton>
                <InteractiveButton 
                  variant="secondary" 
                  href="/about"
                  scrambleText={{
                    hover: "LEARN MORE",
                    speed: 2,
                    chars: "upperCase",
                    revealDelay: 0.1
                  }}
                >
                  Learn More
                </InteractiveButton>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
