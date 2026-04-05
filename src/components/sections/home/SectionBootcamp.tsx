import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedTitle from '../../animated/AnimatedTitle';
import AnimatedDescription from '../../animated/AnimatedDescription';
import InteractiveButton from '../../animated/InteractiveButton';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import styles from '../../../styles/components/sections/home/SectionBootcamp.module.css';;

export default function SectionBootcamp() {
  return (
    <AnimatedSection animationType="fadeInUp" delay={0.5}>
      <div className={styles.bootcampSection}>
        <div className={styles.bootcampContainer}>
          <div className={styles.bootcampHeader}>
            <AnimatedTitle variant="hero" delay={0.1} className={styles.bootcampTitle}>
              100xSystems SDE1 Bootcamp
            </AnimatedTitle>
            <AnimatedTitle variant="insight" delay={0.2} className={styles.bootcampSubtitle}>
              6-Month Software Engineering Program
            </AnimatedTitle>
            <AnimatedDescription variant="featured" delay={0.3} className={styles.bootcampDescription}>
              A developer learns a language to build things fast. But an engineer goes into the depth of that language. 
                  Because strong foundation in one language is a golden key to adapt and use any language in the future.
            </AnimatedDescription>
          </div>

          <div className={styles.bootcampCurriculum}>
            <div className={styles.curriculumHeader}>
              <h3>The Engineering Path</h3>
            </div>
            
            <div className={styles.curriculumContent}>
              <div className={styles.curriculumPhase}>
                <h4>Foundation in JavaScript</h4>
                <p>Strong foundation in one language is a golden key to adapt and use any language in the future</p>
              </div>
              
              <div className={styles.curriculumPhase}>
                <h4>Foundations of Systems</h4>
                <p>Understanding the lifecycle of software. From frontend to backend to deployment. How scalable systems are built and the challenges faced.</p>
              </div>
              
              <div className={styles.curriculumPhase}>
                <h4>Development of Systems</h4>
                <p>Building frontend, then backend. Building desktop & mobile apps. Building libraries. Building systems.</p>
              </div>
              
              <div className={styles.curriculumPhase}>
                <h4>Design Patterns, Optimizations, Security</h4>
                <p>Latest in ecosystem. Best software practices. Security holes. Optimizations and practical usecases of DSA.</p>
              </div>
              
              <div className={styles.curriculumPhase}>
                <h4>SecDevops & Cloud Infrastructure</h4>
                <p>Linux, Docker, Kubernetes, Terraform, Ansible, Nginx. CI/CD pipelines and securing them using SonarQube. AWS, Azure, Google Cloud.</p>
              </div>
              
              <div className={styles.curriculumPhase}>
                <h4>GenAI, Automation & Data Science</h4>
                <p>Latest AI tools like Claude, Cursor. Automation workflows like n8n, active pieces. Automation backend systems like Inngest. Basics of data science.</p>
              </div>
            </div>
          </div>

          <div className={styles.bootcampOffer}>
            <div className={styles.offerContent}>
              <h3 className={styles.offerTitle}>First Batch - 2027</h3>
              <p className={styles.offerDescription}>
                We're looking for serious students who want to become engineers. <br />
                Join the first batch and help shape the future of 100xSystems.
              </p>
              <div className={styles.offerHighlight}>
                {/* <span className={styles.highlightText}>First 10 Students: FREE</span> */}
                <span className={styles.highlightSubtext}>Qualification-based admission</span>
              </div>
            </div>
          </div>

          <div className={styles.bootcampCTA}>
            <div className={styles.ctaPrimary}>
              <InteractiveButton 
                href="https://chat.whatsapp.com/L5DpJhAjRFi805IDntDXQa?mode=gi_t" 
                variant="cta"
                scrambleText={{
                  hover: "JOIN NOW",
                  speed: 2,
                  chars: "upperCase",
                  revealDelay: 0.1
                }}
                className={styles.ctaButton}
              >
                Join WhatsApp Group
              </InteractiveButton>
              <p className={styles.ctaNote}>Direct contact - No forms, no waiting</p>
            </div>

            <div className={styles.ctaSecondary}>
              <div className={styles.contactRow}>
                <a 
                  href="https://wa.me/919149469833" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <FaWhatsapp className={styles.contactIcon} />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
              
              <div className={styles.contactRow}>
                <a 
                  href="tel:+919149469833" 
                  className={styles.contactLink}
                >
                  <FaPhone className={styles.contactIcon} />
                  <span>Call: +91 91494 69833</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.bootcampTrust}>
            <p className={styles.trustText}>
              We're different from YouTube tutorials and traditional edtech. 
              We build engineers who understand systems, not just coders who write syntax.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
