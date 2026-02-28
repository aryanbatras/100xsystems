import CubeAnimation from '../components/animation/CubeAnimation';
import CubeSmall from '../components/animation/CubeSmall';
import CubeHover from '../components/animation/CubeHover';
import VideoShowcase from '../components/video/VideoShowcase';
import RubikVideoShowcase from '../components/video/RubikVideoShowcase';
import AnimatedSection from '../components/animated/AnimatedSection';
import AnimatedCard from '../components/animated/AnimatedCard';
import AnimatedButton from '../components/animated/AnimatedButton';
import AnimatedTechGrid from '../components/animated/AnimatedTechGrid';
import AnimatedTitle from '../components/animated/AnimatedTitle';
import AnimatedDescription from '../components/animated/AnimatedDescription';
import InteractiveButton from '../components/animated/InteractiveButton';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <RubikVideoShowcase />
        
        <AnimatedSection animationType="fadeInUp" stagger={0.2}>
          <section className={styles.rubiksSection}>
            <div className={styles.container}>
              <AnimatedTitle variant="section" className={styles.sectionTitle}>Systems Thinking in Engineering</AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.2} className={styles.description}>
                Like a Rubik's Cube, software systems appear simple but hide immense complexity. 
                Most developers focus on one aspect—building features—without understanding how 
                all components work together to create robust, scalable solutions.
              </AnimatedDescription>
              
              <div className={styles.rubiksInsights}>
                <AnimatedCard hoverEffect="tilt" className={styles.insightItem}>
                  <div className={styles.insightNumber}>01</div>
                  <div className={styles.insightContent}>
                    <AnimatedTitle variant="insight" delay={0.1} className={styles.insightTitle}>Pattern Recognition</AnimatedTitle>
                    <AnimatedDescription variant="subtle" delay={0.3} className={styles.insightText}>
                      Expert engineers recognize architectural patterns instantly, applying proven solutions 
                      to complex problems rather than reinventing approaches.
                    </AnimatedDescription>
                  </div>
                </AnimatedCard>
                <AnimatedCard hoverEffect="tilt" className={styles.insightItem}>
                  <div className={styles.insightNumber}>02</div>
                  <div className={styles.insightContent}>
                    <AnimatedTitle variant="insight" delay={0.15} className={styles.insightTitle}>System Interconnections</AnimatedTitle>
                    <AnimatedDescription variant="subtle" delay={0.35} className={styles.insightText}>
                      Understanding how changes in one component affect others. Frontend decisions impact 
                      backend design, which influences deployment and monitoring strategies.
                    </AnimatedDescription>
                  </div>
                </AnimatedCard>
                <AnimatedCard hoverEffect="tilt" className={styles.insightItem}>
                  <div className={styles.insightNumber}>03</div>
                  <div className={styles.insightContent}>
                    <AnimatedTitle variant="insight" delay={0.2} className={styles.insightTitle}>Algorithmic Thinking</AnimatedTitle>
                    <AnimatedDescription variant="subtle" delay={0.4} className={styles.insightText}>
                      Every system needs well-defined algorithms for data flow, state management, 
                      and decision logic. Clear processes lead to predictable, maintainable systems.
                    </AnimatedDescription>
                  </div>
                </AnimatedCard>
                <AnimatedCard hoverEffect="tilt" className={styles.insightItem}>
                  <div className={styles.insightNumber}>04</div>
                  <div className={styles.insightContent}>
                    <AnimatedTitle variant="insight" delay={0.25} className={styles.insightTitle}>Practice Over Theory</AnimatedTitle>
                    <AnimatedDescription variant="subtle" delay={0.45} className={styles.insightText}>
                      Systems thinking is developed through hands-on experience. Building, breaking, 
                      and fixing real systems teaches what theory alone cannot.
                    </AnimatedDescription>
                  </div>
                </AnimatedCard>
              </div>

              <AnimatedSection animationType="fadeInUp" delay={0.8}>
                <div className={styles.rubiksConclusion}>
                  <div className={styles.conclusionContent}>
                    <div className={styles.conclusionText}>
                      <AnimatedTitle variant="insight" delay={0.1} className={styles.conclusionTitle}>From Complexity to Clarity</AnimatedTitle>
                      <AnimatedDescription variant="featured" delay={0.3} className={styles.description}>
                        100xEngineers learn to see the complete system—understanding trade-offs, 
                        anticipating consequences, and architecting solutions that scale. 
                        They don't just solve problems; they understand the underlying principles 
                        that make systems work reliably.
                      </AnimatedDescription>
                    </div>
                    <div className={styles.conclusionAnimation}>
                      <CubeSmall />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </AnimatedSection>

        <VideoShowcase />

        <AnimatedSection animationType="scaleIn" stagger={0.15}>
          <section className={styles.featuresSection} data-speed="0.9">
                  <AnimatedTitle variant="section" className={styles.sectionTitle}>What You'll Master</AnimatedTitle>
            <div className={styles.featuresGrid}>
              <AnimatedCard hoverEffect="lift" className={styles.featureCard} data-lag="0.3">
                <div className={styles.featureNumber}>01</div>
                <AnimatedTitle variant="feature" delay={0.1} className={styles.featureTitle}>Deep Technical Understanding</AnimatedTitle>
                <AnimatedDescription variant="subtle" delay={0.3} className={styles.featureDescription}>
                  Go beyond surface-level knowledge to truly understand how systems work from the ground up
                </AnimatedDescription>
              </AnimatedCard>
              <AnimatedCard hoverEffect="lift" className={styles.featureCard} data-lag="0.4">
                <div className={styles.featureNumber}>02</div>
                <AnimatedTitle variant="feature" delay={0.15} className={styles.featureTitle}>Systems Thinking</AnimatedTitle>
                <AnimatedDescription variant="subtle" delay={0.35} className={styles.featureDescription}>
                  Learn to architect scalable solutions and understand the trade-offs engineers make every day
                </AnimatedDescription>
              </AnimatedCard>
              <AnimatedCard hoverEffect="lift" className={styles.featureCard} data-lag="0.5">
                <div className={styles.featureNumber}>03</div>
                <AnimatedTitle variant="feature" delay={0.2} className={styles.featureTitle}>Real-World Application</AnimatedTitle>
                <AnimatedDescription variant="subtle" delay={0.4} className={styles.featureDescription}>
                  Build production-ready systems that demonstrate true engineering capabilities
                </AnimatedDescription>
              </AnimatedCard>
            </div>
          </section>
        </AnimatedSection>


        <AnimatedSection animationType="fadeInUp" stagger={0.1}>
          <section className={styles.ctaSection}>
            <AnimatedTitle variant="cta" delay={0.1} className={styles.ctaTitle}>Ready to Become an Engineer?</AnimatedTitle>
            <AnimatedDescription variant="featured" delay={0.3} className={styles.ctaText}>
              Join thousands who've transformed their careers through our structured learning pathways
            </AnimatedDescription>
            <InteractiveButton 
              variant="cta" 
              href="/paths"
              scrambleText={{
                hover: "START JOURNEY NOW",
                speed: 2,
                chars: "upperCase",
                revealDelay: 0.1
              }}
            >
              Start Your Journey
            </InteractiveButton>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="fadeInLeft" delay={0.2}>
          <section className={styles.illustrationSection} data-speed="1.2">
            <div className={styles.videoSideBySide}>
              <div className={styles.videoLeft} data-speed="0.6">
                <video autoPlay muted loop playsInline className={styles.videoCard}>
                  <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
                </video>
              </div>
              <AnimatedSection animationType="fadeInRight" delay={0.4}>
                <div className={styles.videoRight}>
                  <h2 className={styles.sectionTitle}>Beyond Code, Into Engineering</h2>
                  <AnimatedDescription variant="featured" delay={0.3} className={styles.illustrationText}>
                    While others teach you to write code, we teach you to think like engineers. 
                    Understand the 'why' behind every architectural decision, master system design principles, 
                    and build solutions that scale.
                  </AnimatedDescription>
                  <div className={styles.illustrationPoints}>
                    <div className={styles.pointItem}>
                      <span className={styles.pointNumber}>01</span>
                      <span className={styles.pointText}>System Architecture Mastery</span>
                    </div>
                    <div className={styles.pointItem}>
                      <span className={styles.pointNumber}>02</span>
                      <span className={styles.pointText}>Performance Engineering</span>
                    </div>
                    <div className={styles.pointItem}>
                      <span className={styles.pointNumber}>03</span>
                      <span className={styles.pointText}>Production-Ready Development</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="fadeInLeft" delay={0.2}>
          <section className={styles.wallpaperSection} data-speed="0.8">
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
                <div className={styles.wallpaperImageWrapper} data-speed="0.5">
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

        <AnimatedSection animationType="scaleIn" stagger={0.2}>
          <section className={styles.processSection}>
            <h2 className={styles.sectionTitle}>Our Engineering Process</h2>
            <div className={styles.processGrid}>
              <AnimatedCard hoverEffect="tilt" className={styles.processCard}>
                <div className={styles.processIcon}>
                  <Image
                    src="/assets/illustrations/undraw_ideation_r1g5.svg"
                    alt="Ideation"
                    width={80}
                    height={80}
                  />
                </div>
                <AnimatedTitle variant="process" delay={0.1} className={styles.processTitle}>Ideation & Design</AnimatedTitle>
                <AnimatedDescription variant="subtle" delay={0.3} className={styles.processDescription}>
                  Learn to architect solutions from first principles, considering scalability, 
                  maintainability, and business requirements from day one.
                </AnimatedDescription>
              </AnimatedCard>
              <AnimatedCard hoverEffect="tilt" className={styles.processCard}>
                <div className={styles.processIcon}>
                  <Image
                    src="/assets/illustrations/undraw_developer-activity_4zqd.svg"
                    alt="Development"
                    width={80}
                    height={80}
                  />
                </div>
                <AnimatedTitle variant="process" delay={0.15} className={styles.processTitle}>Clean Development</AnimatedTitle>
                <AnimatedDescription variant="subtle" delay={0.35} className={styles.processDescription}>
                  Master clean code principles, testing strategies, and development workflows 
                  that professional engineering teams rely on.
                </AnimatedDescription>
              </AnimatedCard>
              <AnimatedCard hoverEffect="tilt" className={styles.processCard}>
                <div className={styles.processIcon}>
                  <Image
                    src="/assets/illustrations/undraw_project-completed_ug9i.svg"
                    alt="Deployment"
                    width={80}
                    height={80}
                  />
                </div>
                <AnimatedTitle variant="process" delay={0.2} className={styles.processTitle}>Production Deployment</AnimatedTitle>
                <AnimatedDescription variant="subtle" delay={0.4} className={styles.processDescription}>
                  Deploy systems with confidence using DevOps best practices, monitoring, 
                  and continuous integration pipelines.
                </AnimatedDescription>
              </AnimatedCard>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="rotateIn" delay={0.2}>
          <section className={styles.modernSection} data-speed="1.1">
            <div className={styles.modernContent}>
              <div className={styles.modernImageWrapper} data-speed="0.7">
                <div className={styles.videoLeft}>
                  <video autoPlay muted loop playsInline className={styles.videoCard}>
                    <source src="/videos/black-glasses-how-does-llm-work-text-thought-video-google-deepmind.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <AnimatedSection animationType="fadeInRight" delay={0.6}>
                <div className={styles.modernText}>
                  <AnimatedTitle variant="modern" delay={0.1} className={styles.modernTitle}>Modern Engineering Stack</AnimatedTitle>
                  <AnimatedDescription variant="featured" delay={0.3} className={styles.modernDescription}>
                    Stay ahead with cutting-edge technologies and practices that define modern software engineering. 
                    From microservices to serverless, from containers to orchestration.
                  </AnimatedDescription>
                  <AnimatedTechGrid 
                    items={[
                      { text: 'Cloud Native' },
                      { text: 'Microservices' },
                      { text: 'DevOps' },
                      { text: 'AI/ML Integration' },
                      { text: 'Security First' },
                      { text: 'Performance' }
                    ]} 
                  />
                </div>
              </AnimatedSection>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animationType="fadeInLeft" delay={0.2}>
          <section className={styles.finalCtaSection} data-speed="0.9">
            <div className={styles.videoSideBySide}>
              <div className={styles.videoLeft} data-speed="0.7">
                <Image
                  src="/assets/wallpaper/3d-granular-cube-gray-bg-center.jpg"
                  alt="Systems Thinking Visualization"
                  width={600}
                  height={400}
                  className={styles.finalCtaImage}
                />
              </div>
              <AnimatedSection animationType="fadeInRight" delay={0.4}>
                <div className={styles.videoRight}>
                  <AnimatedTitle variant="cta" delay={0.1} className={styles.finalCtaTitle}>Your Engineering Journey Starts Here</AnimatedTitle>
                  <AnimatedDescription variant="featured" delay={0.3} className={styles.finalCtaDescription}>
                    Move beyond feature development to true systems thinking. 
                    Join engineers who understand how components interact, anticipate consequences, 
                    and build solutions that scale reliably in production.
                  </AnimatedDescription>
                  <div className={styles.illustrationPoints}>
                    <div className={styles.pointItem}>
                      <span className={styles.pointNumber}>01</span>
                      <span className={styles.pointText}>System Architecture Mastery</span>
                    </div>
                    <div className={styles.pointItem}>
                      <span className={styles.pointNumber}>02</span>
                      <span className={styles.pointText}>Performance Engineering</span>
                    </div>
                    <div className={styles.pointItem}>
                      <span className={styles.pointNumber}>03</span>
                      <span className={styles.pointText}>Production-Ready Development</span>
                    </div>
                  </div>
                  <div className={styles.finalCtaButtons}>
                    <AnimatedButton variant="primary" href="/paths">
                      Start Your Journey
                    </AnimatedButton>
                    <AnimatedButton variant="secondary" href="/about">
                      Learn More
                    </AnimatedButton>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </AnimatedSection>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CubeAnimation />
        </div>
      </div>
    </div>
  );
}