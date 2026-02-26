import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Paths.module.css';

export default function Paths() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.title}>Growth Paths</h1>
          <p className={styles.subtitle}>
            Choose your journey to engineering excellence. Our structured pathways are designed 
            to transform your skills and accelerate your career in system architecture and development.
          </p>
        </section>

        <section className={styles.pathsOverview}>
          <div className={styles.overviewContent}>
            <div className={styles.overviewLeft}>
              <Image
                src="/assets/illustrations/undraw_road-sign_kncb.svg"
                alt="Path Selection"
                width={350}
                height={280}
                className={styles.overviewImage}
              />
            </div>
            <div className={styles.overviewRight}>
              <h2 className={styles.overviewTitle}>Three Paths to Excellence</h2>
              <p className={styles.overviewText}>
                Each path is carefully crafted to build expertise progressively, 
                from foundational concepts to advanced system design. Whether you're starting 
                your journey or looking to specialize, we have a path that fits your ambitions.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.pathsGrid}>
          <div className={styles.pathCard}>
            <div className={styles.pathNumber}>01</div>
            <h3 className={styles.pathTitle}>Foundation</h3>
            <div className={styles.pathDuration}>3 Months</div>
            <p className={styles.pathDescription}>
              Master the fundamentals of system design, programming principles, 
              and architectural thinking. Build a strong foundation for complex systems.
            </p>
            <div className={styles.pathFeatures}>
              <div className={styles.featureItem}>Core programming concepts</div>
              <div className={styles.featureItem}>System design basics</div>
              <div className={styles.featureItem}>Data structures & algorithms</div>
              <div className={styles.featureItem}>Version control & collaboration</div>
              <div className={styles.featureItem}>Testing fundamentals</div>
            </div>
            <Link href="/contact" className={styles.pathButton}>
              Start Foundation
            </Link>
          </div>

          <div className={styles.pathCard}>
            <div className={styles.pathNumber}>02</div>
            <h3 className={styles.pathTitle}>Acceleration</h3>
            <div className={styles.pathDuration}>6 Months</div>
            <p className={styles.pathDescription}>
              Dive deep into advanced architectures, performance optimization, 
              and scalable system design. Learn to build production-ready systems.
            </p>
            <div className={styles.pathFeatures}>
              <div className={styles.featureItem}>Microservices architecture</div>
              <div className={styles.featureItem}>Cloud native development</div>
              <div className={styles.featureItem}>Performance engineering</div>
              <div className={styles.featureItem}>Security best practices</div>
              <div className={styles.featureItem}>DevOps & CI/CD</div>
            </div>
            <Link href="/contact" className={styles.pathButton}>
              Start Acceleration
            </Link>
          </div>

          <div className={styles.pathCard}>
            <div className={styles.pathNumber}>03</div>
            <h3 className={styles.pathTitle}>Mastery</h3>
            <div className={styles.pathDuration}>12 Months</div>
            <p className={styles.pathDescription}>
              Become a system architect. Lead complex projects, mentor teams, 
              and design systems that scale to millions of users.
            </p>
            <div className={styles.pathFeatures}>
              <div className={styles.featureItem}>Enterprise architecture</div>
              <div className={styles.featureItem}>Distributed systems design</div>
              <div className={styles.featureItem}>Team leadership & mentoring</div>
              <div className={styles.featureItem}>Technology strategy</div>
              <div className={styles.featureItem}>Innovation management</div>
            </div>
            <Link href="/contact" className={styles.pathButton}>
              Start Mastery
            </Link>
          </div>
        </section>

        <section className={styles.timelineSection}>
          <h2 className={styles.sectionTitle}>Your Journey Timeline</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Assessment</h3>
                <p className={styles.timelineDescription}>
                  We evaluate your current skills and career goals to recommend the perfect starting path.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Learning Phase</h3>
                <p className={styles.timelineDescription}>
                  Engage in hands-on projects, mentorship sessions, and collaborative learning experiences.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Real Projects</h3>
                <p className={styles.timelineDescription}>
                  Apply your skills to actual client projects and build a portfolio of impressive work.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h3 className={styles.timelineTitle}>Graduation</h3>
                <p className={styles.timelineDescription}>
                  Join our alumni network and access opportunities with leading technology companies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.requirementsSection}>
          <h2 className={styles.sectionTitle}>What You'll Need</h2>
          <div className={styles.requirementsGrid}>
            <div className={styles.requirementBlock}>
              <h3 className={styles.requirementTitle}>Technical Requirements</h3>
              <ul className={styles.requirementList}>
                <li className={styles.requirementItem}>Basic programming knowledge</li>
                <li className={styles.requirementItem}>Computer with internet access</li>
                <li className={styles.requirementItem}>Development environment setup</li>
                <li className={styles.requirementItem}>GitHub account</li>
                <li className={styles.requirementItem}>20+ hours per week commitment</li>
              </ul>
            </div>

            <div className={styles.requirementBlock}>
              <h3 className={styles.requirementTitle}>Mindset Requirements</h3>
              <ul className={styles.requirementList}>
                <li className={styles.requirementItem}>Growth-oriented mindset</li>
                <li className={styles.requirementItem}>Problem-solving attitude</li>
                <li className={styles.requirementItem}>Collaborative spirit</li>
                <li className={styles.requirementItem}>Continuous learning desire</li>
                <li className={styles.requirementItem}>Resilience and persistence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Begin Your Journey?</h2>
          <p className={styles.ctaText}>
            Join hundreds of engineers who have transformed their careers through our structured pathways.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.primaryButton}>
              Apply Now
            </Link>
            <Link href="/about" className={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </section>

        <section className={styles.wallpaperSection}>
          <div className={styles.wallpaperContent}>
            <div className={styles.wallpaperText}>
              <h2 className={styles.wallpaperTitle}>Your Engineering Evolution</h2>
              <p className={styles.wallpaperDescription}>
                Each path represents a stage in your evolution from developer to engineer. 
                Through hands-on projects, mentorship, and real-world challenges, you'll build 
                the skills and mindset needed to excel in today's complex technological landscape.
              </p>
              <div className={styles.evolutionPoints}>
                <div className={styles.evolutionPoint}>
                  <span className={styles.evolutionNumber}>01</span>
                  <span className={styles.evolutionText}>Technical Foundation</span>
                </div>
                <div className={styles.evolutionPoint}>
                  <span className={styles.evolutionNumber}>02</span>
                  <span className={styles.evolutionText}>System Architecture</span>
                </div>
                <div className={styles.evolutionPoint}>
                  <span className={styles.evolutionNumber}>03</span>
                  <span className={styles.evolutionText}>Engineering Leadership</span>
                </div>
              </div>
            </div>
            <div className={styles.wallpaperImageWrapper}>
              <Image
                src="/assets/wallpaper/rubik-cube-portrait-right-side-getting-broken-in-pieces-on-left-side.jpg"
                alt="Engineering Evolution"
                width={400}
                height={600}
                className={styles.wallpaperImage}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
