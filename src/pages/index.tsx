import CubeAnimation from '../components/animation/CubeAnimation';
import CubeSmall from '../components/animation/CubeSmall';
import CubeHover from '../components/animation/CubeHover';
import VideoShowcase from '../components/video/VideoShowcase';
import RubikVideoShowcase from '../components/video/RubikVideoShowcase';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <RubikVideoShowcase />
        
        <section className={styles.rubiksSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Systems Thinking in Engineering</h2>
            <p className={styles.description}>
              Like a Rubik's Cube, software systems appear simple but hide immense complexity. 
              Most developers focus on one aspect—building features—without understanding how 
              all components work together to create robust, scalable solutions.
            </p>
            
            <div className={styles.rubiksInsights}>
              <div className={styles.insightItem}>
                <div className={styles.insightNumber}>01</div>
                <div className={styles.insightContent}>
                  <h4 className={styles.insightTitle}>Pattern Recognition</h4>
                  <p className={styles.insightText}>
                    Expert engineers recognize architectural patterns instantly, applying proven solutions 
                    to complex problems rather than reinventing approaches.
                  </p>
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightNumber}>02</div>
                <div className={styles.insightContent}>
                  <h4 className={styles.insightTitle}>System Interconnections</h4>
                  <p className={styles.insightText}>
                    Understanding how changes in one component affect others. Frontend decisions impact 
                    backend design, which influences deployment and monitoring strategies.
                  </p>
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightNumber}>03</div>
                <div className={styles.insightContent}>
                  <h4 className={styles.insightTitle}>Algorithmic Thinking</h4>
                  <p className={styles.insightText}>
                    Every system needs well-defined algorithms for data flow, state management, 
                    and decision logic. Clear processes lead to predictable, maintainable systems.
                  </p>
                </div>
              </div>
              <div className={styles.insightItem}>
                <div className={styles.insightNumber}>04</div>
                <div className={styles.insightContent}>
                  <h4 className={styles.insightTitle}>Practice Over Theory</h4>
                  <p className={styles.insightText}>
                    Systems thinking is developed through hands-on experience. Building, breaking, 
                    and fixing real systems teaches what theory alone cannot.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.rubiksConclusion}>
              <div className={styles.conclusionContent}>
                <div className={styles.conclusionText}>
                  <h3 className={styles.conclusionTitle}>From Complexity to Clarity</h3>
                  <p className={styles.description}>
                    100xEngineers learn to see the complete system—understanding trade-offs, 
                    anticipating consequences, and architecting solutions that scale. 
                    They don't just solve problems; they understand the underlying principles 
                    that make systems work reliably.
                  </p>
                </div>
                <div className={styles.conclusionAnimation}>
                  <CubeSmall />
                </div>
              </div>
            </div>
          </div>
        </section>

        <VideoShowcase />

        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>What You'll Master</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>01</div>
              <h3 className={styles.featureTitle}>Deep Technical Understanding</h3>
              <p className={styles.featureDescription}>
                Go beyond surface-level knowledge to truly understand how systems work from the ground up
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>02</div>
              <h3 className={styles.featureTitle}>Systems Thinking</h3>
              <p className={styles.featureDescription}>
                Learn to architect scalable solutions and understand the trade-offs engineers make every day
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureNumber}>03</div>
              <h3 className={styles.featureTitle}>Real-World Application</h3>
              <p className={styles.featureDescription}>
                Build production-ready systems that demonstrate true engineering capabilities
              </p>
            </div>
          </div>
        </section>


        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Become an Engineer?</h2>
          <p className={styles.ctaText}>
            Join thousands who've transformed their careers through our structured learning pathways
          </p>
          <Link href="/paths" className={styles.ctaButton}>
            Start Your Journey
          </Link>
        </section>

        <section className={styles.illustrationSection}>
          <div className={styles.videoSideBySide}>
            <div className={styles.videoLeft}>
              <video autoPlay muted loop playsInline className={styles.videoCard}>
                <source src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.videoRight}>
              <h2 className={styles.sectionTitle}>Beyond Code, Into Engineering</h2>
              <p className={styles.illustrationText}>
                While others teach you to write code, we teach you to think like engineers. 
                Understand the 'why' behind every architectural decision, master system design principles, 
                and build solutions that scale.
              </p>
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
          </div>
        </section>

        <section className={styles.wallpaperSection}>
          <div className={styles.wallpaperContent}>
            <div className={styles.wallpaperText}>
              <h2 className={styles.wallpaperTitle}>The Complexity of Modern Systems</h2>
              <p className={styles.wallpaperDescription}>
                Today's engineering challenges require more than just coding skills. 
                They demand deep understanding of distributed systems, cloud architecture, 
                and the ability to make critical trade-offs that impact millions of users.
              </p>
            </div>
            <div className={styles.wallpaperImageWrapper}>
              <Image
                src="/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-cube-shape-systems.jpg"
                alt="Connected Systems"
                width={500}
                height={400}
                className={styles.wallpaperImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.processSection}>
          <h2 className={styles.sectionTitle}>Our Engineering Process</h2>
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <div className={styles.processIcon}>
                <Image
                  src="/assets/illustrations/undraw_ideation_r1g5.svg"
                  alt="Ideation"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className={styles.processTitle}>Ideation & Design</h3>
              <p className={styles.processDescription}>
                Learn to architect solutions from first principles, considering scalability, 
                maintainability, and business requirements from day one.
              </p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processIcon}>
                <Image
                  src="/assets/illustrations/undraw_developer-activity_4zqd.svg"
                  alt="Development"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className={styles.processTitle}>Clean Development</h3>
              <p className={styles.processDescription}>
                Master clean code principles, testing strategies, and development workflows 
                that professional engineering teams rely on.
              </p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processIcon}>
                <Image
                  src="/assets/illustrations/undraw_project-completed_ug9i.svg"
                  alt="Deployment"
                  width={80}
                  height={80}
                />
              </div>
              <h3 className={styles.processTitle}>Production Deployment</h3>
              <p className={styles.processDescription}>
                Deploy systems with confidence using DevOps best practices, monitoring, 
                and continuous integration pipelines.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.modernSection}>
          <div className={styles.modernContent}>
            <div className={styles.modernImageWrapper}>
              <div className={styles.videoLeft}>
                <video autoPlay muted loop playsInline className={styles.videoCard}>
                  <source src="/videos/black-glasses-how-does-llm-work-text-thought-video-google-deepmind.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className={styles.modernText}>
              <h2 className={styles.modernTitle}>Modern Engineering Stack</h2>
              <p className={styles.modernDescription}>
                Stay ahead with cutting-edge technologies and practices that define modern software engineering. 
                From microservices to serverless, from containers to orchestration.
              </p>
              <div className={styles.techGrid}>
                <div className={styles.techItem}>Cloud Native</div>
                <div className={styles.techItem}>Microservices</div>
                <div className={styles.techItem}>DevOps</div>
                <div className={styles.techItem}>AI/ML Integration</div>
                <div className={styles.techItem}>Security First</div>
                <div className={styles.techItem}>Performance</div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.finalCtaSection}>
          <div className={styles.finalCtaContent}>
            <Image
              src="/assets/wallpaper/3d-granular-cube-gray-bg-center.jpg"
              alt="Systems Thinking Visualization"
              width={600}
              height={300}
              className={styles.finalCtaImage}
            />
            <div className={styles.finalCtaText}>
              <h2 className={styles.finalCtaTitle}>Your Engineering Journey Starts Here</h2>
              <p className={styles.finalCtaDescription}>
                Move beyond feature development to true systems thinking. 
                Join engineers who understand how components interact, anticipate consequences, 
                and build solutions that scale reliably in production.
              </p>
              <div className={styles.finalCtaButtons}>
                <Link href="/paths" className={styles.primaryButton}>
                  Start Your Journey
                </Link>
                <Link href="/about" className={styles.secondaryButton}>
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <CubeAnimation />
        </div>
      </div>
    </div>
  );
}