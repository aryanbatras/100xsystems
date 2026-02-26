import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.title}>100x Systems</h1>
          <p className={styles.subtitle}>Master Engineering Excellence</p>
        </section>

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

        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>By The Numbers</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1000+</div>
              <div className={styles.statLabel}>Engineers Trained</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>95%</div>
              <div className={styles.statLabel}>Career Success Rate</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Industry Projects</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Community Support</div>
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
          <div className={styles.illustrationContent}>
            <div className={styles.illustrationLeft}>
              <Image
                src="/assets/illustrations/undraw_programming_j1zw.svg"
                alt="Programming Illustration"
                width={400}
                height={300}
                className={styles.illustrationImage}
              />
            </div>
            <div className={styles.illustrationRight}>
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
              <Image
                src="/assets/wallpaper/modern-dotted-sphere-with-red-glowing-ring-within-bg-black.jpg"
                alt="Modern Technology"
                width={450}
                height={350}
                className={styles.modernImage}
              />
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
              alt="3D Cube"
              width={600}
              height={300}
              className={styles.finalCtaImage}
            />
            <div className={styles.finalCtaText}>
              <h2 className={styles.finalCtaTitle}>Your Engineering Journey Starts Here</h2>
              <p className={styles.finalCtaDescription}>
                Join a community of engineers who don't just code—they build systems that matter. 
                Transform your career with structured learning, real projects, and industry mentorship.
              </p>
              <div className={styles.finalCtaButtons}>
                <Link href="/paths" className={styles.primaryButton}>
                  Explore Paths
                </Link>
                <Link href="/about" className={styles.secondaryButton}>
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}