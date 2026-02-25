import Image from "next/image";
import { Geist } from "next/font/google";
import styles from '@/styles/About.module.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function About() {
  return (
    <div className={`${geistSans.className} ${styles.page}`}>
      <main className={styles.container}>
        <div className={styles.content}>
          <div className={styles.heroSection}>
            <Image
              src="/100xsystems.png"
              alt="100xSystems"
              width={120}
              height={120}
              priority
              className={styles.logo}
            />
            
            <h1 className={styles.title}>
              100xSystems
            </h1>
            
            <p className={styles.subtitle}>
              Engineering Excellence Through Structured Learning
            </p>

            <p className={styles.description}>
              A comprehensive learning ecosystem designed to transform passionate developers 
              into exceptional software engineers through systematic progression, deep technical 
              understanding, and real-world system building.
            </p>
          </div>

          <div className={styles.missionSection}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.missionText}>
              We bridge the gap between coding tutorials and engineering excellence. 
              In a world of endless tutorials and quick fixes, we focus on what truly matters: 
              building engineers who understand systems, think critically, and solve complex problems.
            </p>
          </div>

          <div className={styles.philosophySection}>
            <h2 className={styles.sectionTitle}>The 100x Philosophy</h2>
            
            <div className={styles.philosophyContent}>
              <div className={styles.philosophyBlock}>
                <h3 className={styles.blockTitle}>Depth Over Breadth</h3>
                <p className={styles.blockText}>
                  True engineering mastery comes from deep understanding, not superficial knowledge 
                  of multiple technologies. We focus on fundamentals that last a lifetime.
                </p>
              </div>

              <div className={styles.philosophyBlock}>
                <h3 className={styles.blockTitle}>Systems Thinking</h3>
                <p className={styles.blockText}>
                  Engineers don't just write code; they build systems. We teach you to see the bigger picture, 
                  understand trade-offs, and architect solutions that scale.
                </p>
              </div>

              <div className={styles.philosophyBlock}>
                <h3 className={styles.blockTitle}>Practical Excellence</h3>
                <p className={styles.blockText}>
                  Theory meets practice through hands-on projects, real-world challenges, and 
                  mentorship from engineers who've built production systems at scale.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.pathwaySection}>
            <h2 className={styles.sectionTitle}>The Engineering Pathway</h2>
            
            <div className={styles.pathwayStages}>
              <div className={styles.stage}>
                <div className={styles.stageNumber}>01</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Foundation</h3>
                  <p className={styles.stageDesc}>
                    Master one programming language deeply, understand computer science fundamentals, 
                    and build strong problem-solving skills.
                  </p>
                </div>
              </div>

              <div className={styles.stage}>
                <div className={styles.stageNumber}>02</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Systems Architecture</h3>
                  <p className={styles.stageDesc}>
                    Learn to design scalable systems, understand networking, databases, 
                    and the complete software development lifecycle.
                  </p>
                </div>
              </div>

              <div className={styles.stage}>
                <div className={styles.stageNumber}>03</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Engineering Excellence</h3>
                  <p className={styles.stageDesc}>
                    Master design patterns, security, performance optimization, and DevOps practices 
                    to build production-ready systems.
                  </p>
                </div>
              </div>

              <div className={styles.stage}>
                <div className={styles.stageNumber}>04</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Leadership & Innovation</h3>
                  <p className={styles.stageDesc}>
                    Develop technical leadership, product thinking, and the ability to guide teams 
                    while staying at the forefront of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.differenceSection}>
            <h2 className={styles.sectionTitle}>What Makes Us Different</h2>
            
            <div className={styles.differenceGrid}>
              <div className={styles.differenceItem}>
                <h4 className={styles.differenceTitle}>No Shortcuts</h4>
                <p className={styles.differenceText}>
                  We believe in the journey, not just the destination. Real engineering takes time, 
                  practice, and persistence.
                </p>
              </div>

              <div className={styles.differenceItem}>
                <h4 className={styles.differenceTitle}>Industry Mentors</h4>
                <p className={styles.differenceText}>
                  Learn from engineers who've actually built and scaled systems in production environments.
                </p>
              </div>

              <div className={styles.differenceItem}>
                <h4 className={styles.differenceTitle}>Real Projects</h4>
                <p className={styles.differenceText}>
                  Build portfolio-worthy projects that demonstrate real engineering capabilities, 
                  not tutorial-following skills.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Join the Engineering Revolution</h2>
              <p className={styles.ctaText}>
                Join a community that values depth, structure, and real engineering thinking over quick fixes and surface-level knowledge.
              </p>
              
              <div className={styles.contactLinks}>
                <a href="https://www.100xsystems.dev" className={styles.contactLink}>
                  100xsystems.dev
                </a>
                <span className={styles.separator}>•</span>
                <a href="mailto:admin@100xsystems.dev" className={styles.contactLink}>
                  admin@100xsystems.dev
                </a>
                <span className={styles.separator}>•</span>
                <a href="https://www.linkedin.com/company/100xsystems/" className={styles.contactLink}>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Engineering Depth. Structured.
            </p>
            <p className={styles.footerSubtext}>
              Building the future of software engineering education
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
