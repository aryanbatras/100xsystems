import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from '@/styles/Home.module.css';
import Card from '@/components/Card';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const paths = [
    { title: 'Language Foundations', description: 'Master one programming language deeply to build a strong foundation for any technology stack.' },
    { title: 'Systems Foundations', description: 'Understand software lifecycles, scalable architecture, networking, databases, and operating systems.' },
    { title: 'Development', description: 'Build frontend, backend, desktop, mobile apps, and reusable libraries.' },
    { title: 'Security & Optimization', description: 'Learn design patterns, security best practices, and performance optimization.' },
    { title: 'DevOps & Cloud', description: 'Master Linux, containers, CI/CD, and cloud platforms like AWS, Azure, GCP.' },
    { title: 'AI & Automation', description: 'Explore generative AI, automation workflows, and data science fundamentals.' },
    { title: 'Scalable Systems', description: 'Build and maintain production-ready systems with real-world constraints.' },
    { title: 'Leadership', description: 'Develop engineering judgment, technical leadership, and communication skills.' },
    { title: 'Product Thinking', description: 'Understand product development, constraints, and debugging in production.' },
  ];

  return (
    <div className={`${geistSans.className} ${geistMono.className} ${styles.page}`}>
      <main className={styles.container}>
        <div className={styles.content}>
          <Image
            src="/100xsystems.png"
            alt="100xSystems"
            width={200}
            height={200}
            priority
            className={styles.logo}
          />
          
          <h1 className={styles.title}>
            100xSystems
          </h1>
          
          <p className={styles.subtitle}>
            Structured Paths for Serious Engineers
          </p>

          <div>
            <p className={styles.description}>
              A comprehensive learning system designed around structured career paths, 
              systematic progression, and deep technical understanding.
            </p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Structured Learning</h3>
              <p className={styles.featureDesc}>
                Career-oriented tracks with beginner to expert progression
              </p>
            </div>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Systems Thinking</h3>
              <p className={styles.featureDesc}>
                Deep understanding over surface-level tutorials
              </p>
            </div>
            <div className={styles.feature}>
              <h3 className={styles.featureTitle}>Long-term Vision</h3>
              <p className={styles.featureDesc}>
                Built for sustainable engineering careers
              </p>
            </div>
          </div>

          <h2 className={styles.pathsTitle}>Choose Your Learning Path</h2>
          <div className={styles.pathsGrid}>
            {paths.map((path, index) => (
              <Card key={index} title={path.title} description={path.description} onClick={() => console.log(`Selected path: ${path.title}`)} />
            ))}
          </div>

          <div className={styles.sectionBorder}>
            <p className={styles.sectionText}>
              Something exceptional is being built. Join a community that values depth, structure, and real engineering thinking.
            </p>
            
            <div className={styles.contactLinks}>
              <a href="https://www.100xsystems.dev" className={styles.contactLink}>
                100xsystems.dev
              </a>
              <span className={styles.separator}>|</span>
              <a href="mailto:admin@100xsystems.dev" className={styles.contactLink}>
                admin@100xsystems.dev
              </a>
              <span className={styles.separator}>|</span>
              <a href="https://www.linkedin.com/company/100xsystems/" className={styles.contactLink}>
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <p className={styles.footerText}>
              Engineering Depth. Structured.
            </p>
            <p className={styles.footerSubtext}>
              Building the future of software engineering education
            </p>
          </div>

          <div className={styles.philosophySection}>
            <div className="text-left max-w-4xl mx-auto">
              <h2 className={styles.philosophyTitle}>The 100xEngineer Philosophy</h2>
              
              <div>
                <p className={styles.philosophyText}>
                  An 100xEngineer knows its goal, reached through a path. Under the guidance of those who have already crossed that path.
                </p>
              </div>

              <div className={styles.goalsGrid}>
                <div className={styles.goalSection}>
                  <h3>Our Goal</h3>
                  <p>
                    Our goal is to become a good software engineer. A learning mindset. We thrive for excellence and then the opportunity comes itself because we deserve it.
                  </p>
                </div>
                <div className={styles.goalSection}>
                  <h3>Understanding the Role</h3>
                  <p>
                    We understand the clear difference between a developer and an engineer. We understand why developers become engineers at senior software level. We understand the hierarchy of software roles and what is expected from us. We understand the clear usecases of AI and why engineers are still needed.
                  </p>
                </div>
              </div>

              <h2 className={styles.learningPathTitle}>The Learning Path</h2>
              
              <div className={styles.learningSteps}>
                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>Foundation in one language</h3>
                  <p className={styles.stepDesc}>
                    A developer learns a language to build things fast. But an engineer goes into the depth of that language. Because strong foundation in one language is a golden key to adapt and use any language in the future.
                  </p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>Foundations of systems</h3>
                  <p className={styles.stepDesc}>
                    You have to understand the lifecycle of a software. From frontend to backend to deployment. You have to understand how scalable systems are built and the challenges that are faced. You have to understand the basics of the core system design. Understanding basic networking, database & OS.
                  </p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>Development of systems</h3>
                  <p className={styles.stepDesc}>
                    You learn to build a frontend, then its backend. You learn to build desktop & mobile apps. You learn to build libraries. You build systems.
                  </p>
                </div>

                <div className={styles.levelSeparator}>
                  <p className={styles.levelText}>-------- Beginner Level Completed ----------</p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>Design Patterns, Optimizations, Security</h3>
                  <p className={styles.stepDesc}>
                    You learn the latest in ecosystem. You learn best software practices. You learn different security loopholes. You learn optimizations and practical usecases of DSA.
                  </p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>SecDevops & Cloud Infrastructure</h3>
                  <p className={styles.stepDesc}>
                    You learn Linux, Docker, Kubernetes, Terraform, Ansible, Nginx. You learn CI/CD pipelines and how to secure them using SonarQube. You learn different cloud services and why they exist. You learn AWS, Azure, Google Cloud.
                  </p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>GenAI, Automation & Data Science</h3>
                  <p className={styles.stepDesc}>
                    You learn to use latest AI tools like Claude, Cursor etc. You learn automation workflows like n8n, active pieces etc. You learn automation backend systems like Inngest etc. You learn basics of data science like cleaning & processing data. You learn finetuning and basics of an AI model and how it behaves.
                  </p>
                </div>

                <div className={styles.levelSeparator}>
                  <p className={styles.levelText}>--------- Advanced Level Completed ------------</p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>Building Scalable & Secure systems</h3>
                  <p className={styles.stepDesc}>
                    Picking up a dream project and working on it day and night. Explaining your system to others how it is built and how it is useful. Explaining the challenges faced while building and the learnings gained. Understanding all the limitations and the loopholes of the system you built yourself. Thinking how you can overcome those in your next project and learning it as well.
                  </p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>Engineering Judgment & Leadership</h3>
                  <p className={styles.stepDesc}>
                    You understand the ecosystem & systems well enough to guide others. You can confidently become Team Lead & reason your Tech Decisions. You can make a non-tech person understand your system in simple way. You can bring Judgment to new technologies & explain them to others.
                  </p>
                </div>

                <div className={styles.learningStep}>
                  <h3 className={styles.stepTitle}>Understanding Constraints & Product Thinking</h3>
                  <p className={styles.stepDesc}>
                    You read books & large codebases to understand patterns. You understand constraints even though anything can be built. You read articles & documentation from senior developers to appreciate depth. You have excellent debugging skills and you can understand errors & reason production failures.
                  </p>
                </div>

                <div className={styles.levelSeparator}>
                  <p className={styles.levelText}>--------- Expert Level Completed ------------</p>
                </div>
              </div>

              <div className={styles.selfEvalSection}>
                <h3 className={styles.selfEvalTitle}>Self-Evaluation</h3>
                <p className={styles.selfEvalText}>
                  There is only one question to know where we stand:
                </p>
                <p className={styles.selfEvalQuote}>
                  "Show me your best work you have built that you are extremely proud of?"
                </p>
                <p className={styles.selfEvalText}>
                  Can you explain about your work like a systems engineer? Why did you choose to build it? What were the challenges, constraints? What was the system behind it? Why that tech stack was chosen? How would you scale it? And what did you learned from building it that eventually made you a better software engineer?
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
