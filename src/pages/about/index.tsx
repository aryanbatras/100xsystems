import Image from "next/image";
import { Geist } from "next/font/google";
import styles from "../../styles/About.module.css";

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
            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                <Image
                  src="/assets/illustrations/undraw_programmer_raqr.svg"
                  alt="Systems Engineering"
                  width={400}
                  height={300}
                  priority
                  className={styles.heroImage}
                />
              </div>
              
              <div className={styles.heroRight}>
                <h1 className={styles.title}>
                  100x Systems
                </h1>
                
                <p className={styles.subtitle}>
                  From Developer to Systems Engineer
                </p>

                <div className={styles.heroPoints}>
                  <div className={styles.heroPoint}>
                    <h3 className={styles.pointTitle}>Systems vs Isolated Technologies</h3>
                    <p className={styles.pointText}>
                      Most engineers learn technologies quickly and start building projects. 
                      But systems knowledge expands your perspective and makes you mature as a software engineer. 
                      Understanding how any technology works as a system reveals its impact across every domain.
                    </p>
                  </div>

                  <div className={styles.heroPoint}>
                    <h3 className={styles.pointTitle}>Love for Engineering</h3>
                    <p className={styles.pointText}>
                      This isn't just about getting a job. It's about having genuine love for engineering 
                      and understanding how things are made at a deep level. This website is my adventure and exploration of systems thinking, 
                      documenting insights so other engineers don't have to spend years discovering them.
                    </p>
                  </div>

                  <div className={styles.heroPoint}>
                    <h3 className={styles.pointTitle}>Real Engineering vs AI Tools</h3>
                    <p className={styles.pointText}>
                      AI can help develop things faster, but you must understand the system first 
                      to use tools effectively. AI can't build complex systems without deep system understanding. 
                      Real engineers build things themselves because they've explored similar domains with such depth.
                    </p>
                  </div>

                  <div className={styles.heroPoint}>
                    <h3 className={styles.pointTitle}>The Learning Gap</h3>
                    <p className={styles.pointText}>
                      Experienced engineers don't have time for 50-hour courses. They want to 
                      skim through notes and major topics quickly. With AI spreading false information, there's need for 
                      authentic, factual content that bridges scattered knowledge into coherent systems understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.innovationSection}>
            <h2 className={styles.sectionTitle}>Revolutionary Learning Approach</h2>
            
            <div className={styles.innovationContent}>
              <div className={styles.innovationBlock}>
                <div className={styles.innovationIcon}>
                  <Image
                    src="/assets/illustrations/undraw_listening-to-podcasts_j0hm.svg"
                    alt="Podcast Learning"
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className={styles.blockTitle}>Podcast-Based Learning</h3>
                <p className={styles.blockText}>
                  Instead of 100-hour video courses that nobody watches, we break complex topics into 
                  5-10 minute audio segments. Listen while commuting, working, or relaxing. 
                  Production quality audio with noise reduction for the best learning experience.
                </p>
              </div>

              <div className={styles.innovationBlock}>
                <div className={styles.innovationIcon}>
                  <Image
                    src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
                    alt="Multiple Perspectives"
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className={styles.blockTitle}>Multi-Perspective Learning</h3>
                <p className={styles.blockText}>
                  One topic, multiple expert perspectives. Understand concepts from different 
                  senior engineers' viewpoints. Switch between voices, languages (English, Hindi, Bengali, Marathi) 
                  for native learning experience.
                </p>
              </div>

              <div className={styles.innovationBlock}>
                <div className={styles.innovationIcon}>
                  <Image
                    src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
                    alt="Always Updated"
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className={styles.blockTitle}>Living Content</h3>
                <p className={styles.blockText}>
                  Unlike stale video courses, our articles update instantly with technology changes. 
                  Community contributions keep content fresh. Multiple developers can collaborate on the same topic 
                  creating comprehensive, always-current knowledge base.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.founderSection}>
            <div className={styles.founderContent}>
              <div className={styles.founderLeft}>
                <Image
                  src="/aryan.png"
                  alt="Aryan Batra - Founder of 100xSystems"
                  width={300}
                  height={300}
                  className={styles.founderImage}
                />
                <div className={styles.founderLinks}>
                  <a
                    href="https://aryanbatra.is-a.dev"
                    className={styles.founderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aryanbatra.is-a.dev
                  </a>
                </div>
              </div>
              <div className={styles.founderRight}>
                <h2 className={styles.sectionTitle}>Founded by Aryan Batra</h2>
                <p className={styles.founderText}>
                  100xSystems is founded and led by Aryan Batra, who serves as
                  the Founder & Project Lead. With a team of 5+ contributors,
                  this initiative represents a genuine commitment to elevating
                  software engineering education.
                </p>
                <p className={styles.founderText}>
                  This isn't just another course platform—it's a personal
                  mission to help software engineers become truly exceptional at
                  their craft. In an era where AI can generate code, the real
                  value lies in understanding systems, making architectural
                  decisions, and solving problems that machines cannot.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.systemsSection}>
            <h2 className={styles.sectionTitle}>Core Systems Knowledge</h2>
            
            <div className={styles.systemsContent}>
              <div className={styles.systemsBlock}>
                <div className={styles.systemsIcon}>
                  <Image
                    src="/assets/illustrations/undraw_web-development_f0tp.svg"
                    alt="Networking Systems"
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className={styles.blockTitle}>Universal Fundamentals</h3>
                <p className={styles.blockText}>
                  Systems knowledge isn't domain-specific. Networking, operating systems, and databases 
                  form the foundation of every system. Without understanding these three fundamentals, 
                  no system can be built effectively.
                </p>
              </div>

              <div className={styles.systemsBlock}>
                <div className={styles.systemsIcon}>
                  <Image
                    src="/assets/illustrations/undraw_ideation_r1g5.svg"
                    alt="System Architecture"
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className={styles.blockTitle}>Tools vs Understanding</h3>
                <p className={styles.blockText}>
                  Tools teach you what to use. Systems teach you how things work internally. 
                  This understanding separates junior engineers from senior engineers and enables 
                  architectural decision-making.
                </p>
              </div>

              <div className={styles.systemsBlock}>
                <div className={styles.systemsIcon}>
                  <Image
                    src="/assets/illustrations/undraw_proud-coder_bivp.svg"
                    alt="Career Growth"
                    width={60}
                    height={60}
                  />
                </div>
                <h3 className={styles.blockTitle}>Career Acceleration</h3>
                <p className={styles.blockText}>
                  What separates junior from senior engineers? Only systems understanding. 
                  System architects, principal engineers, and tech leads don't code daily—they make 
                  architectural decisions because they've spent years understanding systems.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.missionSection}>
            <div className={styles.missionContent}>
              <div className={styles.missionLeft}>
                <Image
                  src="/assets/illustrations/undraw_deep-thinker-avatar_6xg6.svg"
                  alt="Deep Thinker"
                  width={300}
                  height={300}
                  className={styles.missionImage}
                />
              </div>
              <div className={styles.missionRight}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.missionText}>
                  We want engineers to learn systems in college itself, not spend 10 years discovering what 
                  senior architects already know. With the right resources and structured path, systems knowledge 
                  can be gained during education years, accelerating career growth by decades.
                </p>
                <p className={styles.missionText}>
                  This is not a commercial venture—it's for developer welfare. While many projects exist, 
                  nobody talks about systems with such depth. We're building that missing bridge between 
                  rapid development skills and deep systems understanding.
                </p>
                <p className={styles.missionText}>
                  Every article includes practical assignments and assessments with outsourced authentic resources. 
                  Learn fundamentals, then see how they connect across domains—because systems thinking 
                  is the new baseline for engineering excellence.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.philosophySection}>
            <div className={styles.philosophyHeader}>
              <h2 className={styles.sectionTitle}>The 100x Philosophy</h2>
              <div className={styles.philosophyIllustration}>
                <Image
                  src="/assets/illustrations/undraw_ideation_r1g5.svg"
                  alt="Ideation Process"
                  width={200}
                  height={150}
                  className={styles.sectionIllustration}
                />
              </div>
            </div>

            <div className={styles.philosophyContent}>
              <div className={styles.philosophyBlock}>
                <h3 className={styles.blockTitle}>Depth Over Breadth</h3>
                <p className={styles.blockText}>
                  Learn deeply instead of broadly. Master fundamentals that
                  never become obsolete.
                </p>
              </div>

              <div className={styles.philosophyBlock}>
                <h3 className={styles.blockTitle}>Systems Thinking</h3>
                <p className={styles.blockText}>
                  Build systems, not just code. Understand how pieces fit
                  together.
                </p>
              </div>

              <div className={styles.philosophyBlock}>
                <h3 className={styles.blockTitle}>Practical Excellence</h3>
                <p className={styles.blockText}>
                  Build real projects. Get feedback from people who've actually
                  shipped software.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.pathwaySection}>
            <div className={styles.pathwayHeader}>
              <h2 className={styles.sectionTitle}>The Engineering Pathway</h2>
              <div className={styles.pathwayIllustration}>
                <Image
                  src="/assets/illustrations/undraw_project-completed_ug9i.svg"
                  alt="Project Completion"
                  width={200}
                  height={150}
                  className={styles.sectionIllustration}
                />
              </div>
            </div>

            <div className={styles.pathwayStages}>
              <div className={styles.stage}>
                <div className={styles.stageNumber}>01</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Foundation</h3>
                  <p className={styles.stageDesc}>
                    Master one language properly. Learn CS basics that actually
                    matter.
                  </p>
                </div>
              </div>

              <div className={styles.stage}>
                <div className={styles.stageNumber}>02</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Systems Architecture</h3>
                  <p className={styles.stageDesc}>
                    Build things that don't break. Learn databases, APIs, and
                    deployment.
                  </p>
                </div>
              </div>

              <div className={styles.stage}>
                <div className={styles.stageNumber}>03</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Engineering Excellence</h3>
                  <p className={styles.stageDesc}>
                    Write professional code. Learn testing, security, and
                    performance.
                  </p>
                </div>
              </div>

              <div className={styles.stage}>
                <div className={styles.stageNumber}>04</div>
                <div className={styles.stageContent}>
                  <h3 className={styles.stageTitle}>Leadership & Innovation</h3>
                  <p className={styles.stageDesc}>
                    Lead projects. Make technical decisions. Stay relevant.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.differenceSection}>
            <div className={styles.differenceHeader}>
              <h2 className={styles.sectionTitle}>What Makes Us Different</h2>
              <div className={styles.differenceIllustration}>
                <Image
                  src="/assets/illustrations/undraw_a-woman-avatar_ifsl.svg"
                  alt="Excellence"
                  width={200}
                  height={150}
                  className={styles.sectionIllustration}
                />
              </div>
            </div>

            <div className={styles.differenceGrid}>
              <div className={styles.differenceItem}>
                <h4 className={styles.differenceTitle}>No Shortcuts</h4>
                <p className={styles.differenceText}>
                  No magic formulas. Just hard work and smart practice.
                </p>
              </div>

              <div className={styles.differenceItem}>
                <h4 className={styles.differenceTitle}>Industry Mentors</h4>
                <p className={styles.differenceText}>
                  Learn from engineers who actually build things, not just talk
                  about them.
                </p>
              </div>

              <div className={styles.differenceItem}>
                <h4 className={styles.differenceTitle}>Real Projects</h4>
                <p className={styles.differenceText}>
                  Build projects you can show to employers. Not tutorial
                  copy-paste.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Join the Engineering Revolution
              </h2>
              <p className={styles.ctaText}>
                Stop collecting certificates. Start building real skills.
              </p>

              <div className={styles.contactLinks}>
                <a
                  href="https://www.100xsystems.dev"
                  className={styles.contactLink}
                >
                  100xsystems.dev
                </a>
                <span className={styles.separator}>•</span>
                <a
                  href="mailto:admin@100xsystems.dev"
                  className={styles.contactLink}
                >
                  admin@100xsystems.dev
                </a>
                <span className={styles.separator}>•</span>
                <a
                  href="https://www.linkedin.com/company/100xsystems/"
                  className={styles.contactLink}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className={styles.wallpaperSection}>
            <div className={styles.wallpaperContent}>
              <div className={styles.wallpaperText}>
                <h2 className={styles.wallpaperTitle}>
                  The Engineering Mindset
                </h2>
                <p className={styles.wallpaperDescription}>
                  Good engineers don't just write code. They understand
                  problems, make trade-offs, and build things that work in the
                  real world.
                </p>
                <div className={styles.wallpaperPoints}>
                  <div className={styles.wallpaperPoint}>
                    <span className={styles.pointIcon}>🔧</span>
                    <span className={styles.pointLabel}>
                      Systematic Thinking
                    </span>
                  </div>
                  <div className={styles.wallpaperPoint}>
                    <span className={styles.pointIcon}>⚡</span>
                    <span className={styles.pointLabel}>Performance First</span>
                  </div>
                  <div className={styles.wallpaperPoint}>
                    <span className={styles.pointIcon}>🛡️</span>
                    <span className={styles.pointLabel}>Security Mindful</span>
                  </div>
                </div>
              </div>
              <div className={styles.wallpaperImageWrapper}>
                <Image
                  src="/assets/wallpaper/portrait-small-cubes-connected-by-lines-3d-closer-look-red-color.jpg"
                  alt="Connected Systems"
                  width={400}
                  height={500}
                  className={styles.wallpaperImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>Core Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Image
                    src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
                    alt="Continuous Learning"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className={styles.valueTitle}>Continuous Learning</h3>
                <p className={styles.valueDescription}>
                  Technology changes constantly. Good engineers keep learning.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Image
                    src="/assets/illustrations/undraw_code-contribution_8k0x.svg"
                    alt="Collaborative Excellence"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className={styles.valueTitle}>Collaborative Excellence</h3>
                <p className={styles.valueDescription}>
                  Great software is built by teams. Learn to work with others.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <Image
                    src="/assets/illustrations/undraw_bright-ideas_z7u9.svg"
                    alt="Innovation & Pragmatism"
                    width={100}
                    height={100}
                  />
                </div>
                <h3 className={styles.valueTitle}>Innovation & Pragmatism</h3>
                <p className={styles.valueDescription}>
                  Use the right tool for the job. Don't over-engineer.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Engineering Excellence. Systematic.
            </p>
            <p className={styles.footerSubtext}>
              Advancing the future of software engineering education
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
