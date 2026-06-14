'use client';

import { AnimatedCard, AnimatedSection, InteractiveButton, AnimatedTitle, AnimatedDescription, AnimatedTechGrid } from './animated.feature';
import styles from '../_styles/css/sections-paths-pathcards.module.css';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useVideoAutoplay, useContactForm } from '../../application/hooks';
import React, { useState, useRef, useEffect } from 'react';
import cinematicStyles from '../_styles/css/sections-home-cinematic.module.css';
import sharedStyles from '../_styles/css/sections-home-shared.module.css';
import { CubeSmall, CubeHover } from './animation.feature';
import { FaWhatsapp, FaPhone, FaMicrophone, FaAws } from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
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
/**
 * ## Sections
 *
 * Master feature module containing all section components organized by topic.
 * Includes: about, blog, community, contact, contribute, donate, faq,
 * home, install, paths, privacy, success, team, terms.
 *
 * @packageDocumentation
 * @module sections
 */

;

import 'react-quill-new/dist/quill.bubble.css';


// ============================================================
// sections/about/CTA.tsx
// ============================================================
export function AboutCTA() {
  return (
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
  );
}


// ============================================================
// sections/about/CorePrinciples.tsx
// ============================================================
export function CorePrinciples() {
  return (
    <section className={styles.corePrinciplesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Core Principles</h2>
        
        <div className={styles.grid}>
          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_ideas-flow_lwpa.svg"
                alt="Systems Thinking"
                width={64}
                height={64}
                className={styles.iconImage}
              />
            </div>
            <div className={styles.principleContent}>
              <h3 className={styles.principleTitle}>Systems vs Isolated Technologies</h3>
              <p className={styles.principleText}>
                Most engineers learn technologies quickly and start building projects. 
                But systems knowledge expands your perspective and makes you mature as a software engineer. 
                Understanding how any technology works as a system reveals its impact across every domain.
              </p>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_love_9mug.svg"
                alt="Engineering Excellence"
                width={64}
                height={64}
                className={styles.iconImage}
              />
            </div>
            <div className={styles.principleContent}>
              <h3 className={styles.principleTitle}>Love for Engineering</h3>
              <p className={styles.principleText}>
                This isn't just about getting a job. It's about having genuine love for engineering 
                and understanding how things are made at a deep level. This website is my adventure and exploration of systems thinking, 
                documenting insights so other engineers don't have to spend years discovering them.
              </p>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_ai-agent_pdkp.svg"
                alt="Human Engineering"
                width={64}
                height={64}
                className={styles.iconImage}
              />
            </div>
            <div className={styles.principleContent}>
              <h3 className={styles.principleTitle}>Real Engineering vs AI Tools</h3>
              <p className={styles.principleText}>
                AI can help develop things faster, but you must understand the system first 
                to use tools effectively. AI can't build complex systems without deep system understanding. 
                Real engineers build things themselves because they've explored similar domains with such depth.
              </p>
            </div>
          </div>

          <div className={styles.principleCard}>
            <div className={styles.principleIcon}>
              <Image
                src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
                alt="Knowledge Architecture"
                width={64}
                height={64}
                className={styles.iconImage}
              />
            </div>
            <div className={styles.principleContent}>
              <h3 className={styles.principleTitle}>The Learning Gap</h3>
              <p className={styles.principleText}>
                Experienced engineers don't have time for 50-hour courses. They want to 
                skim through notes and major topics quickly. With AI spreading false information, there's need for 
                authentic, factual content that bridges scattered knowledge into coherent systems understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 


// ============================================================
// sections/about/Difference.tsx
// ============================================================
export function Difference() {
  return (
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
  );
}


// ============================================================
// sections/about/Footer.tsx
// ============================================================
export function AboutFooter() {
  return (
    <div className={styles.footer}>
      <p className={styles.footerText}>
        Engineering Excellence. Systematic.
      </p>
      <p className={styles.footerSubtext}>
        Advancing the future of software engineering education
      </p>
    </div>
  );
}


// ============================================================
// sections/about/Founder.tsx
// ============================================================
export function Founder() {
  return (
    <div className={styles.founderSection}>
      <div className={styles.founderContent}>
        <div className={styles.founderLeft}>
          <Image
            src="/aryan.webp"
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
  );
}


// ============================================================
// sections/about/Hero.tsx
// ============================================================
export function AboutHero() {
  const videoRef = useRef<any>(null);
  useVideoAutoplay(videoRef);

  return (
    <>
      <div className={styles.heroSection}>
        <img
          ref={videoRef}
          className={styles.heroVideoBackground}
          
          
          
          
         src="/videos/black-boxes-advanced-abstract-animation-google-deepmind.gif" alt="" />
        
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <div className={styles.heroMain}>
            <div className={styles.heroHeader}>
              <h1 className={styles.title}>
                100x Systems
              </h1>
              
              <p className={styles.subtitle}>
                From Developer to Systems Engineer
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatedSection animationType="fadeInUp" delay={0.4}>
        <div className={cinematicStyles.cinematicSection}>
          <div className={cinematicStyles.cinematicContainer}>
            <div className={cinematicStyles.cinematicHeader}>
              <AnimatedTitle variant="hero" delay={0.1} className={cinematicStyles.cinematicTitle}>
                Engineering Systems That Matter
              </AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.3} className={cinematicStyles.cinematicDescription}>
                In a world of rapid technological change, systems thinking remains timeless. 
                While frameworks come and go, understanding how systems work—how components interact, 
                how failures cascade, how performance scales—separates senior engineers from junior developers.
              </AnimatedDescription>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}


// ============================================================
// sections/about/Innovation.tsx
// ============================================================
export function Innovation() {
  return (
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
  );
}


// ============================================================
// sections/about/Mission.tsx
// ============================================================
export function Mission() {
  const videoRef = useRef<any>(null);
  useVideoAutoplay(videoRef);

  return (
    <>
      <AnimatedSection animationType="fadeInUp" delay={0.2}>
        <div className={styles.missionSection}>
          <div className={styles.videoSideBySide}>
            <div className={styles.videoLeft}>
              <img
                ref={videoRef}
                className={styles.missionVideo}
                
                
                
                
               src="/videos/abstract-light-color-files-tasks-animation-google-deepmind.gif" alt="" />
            </div>
            <div className={styles.videoRight}>
              <AnimatedTitle variant="section" delay={0.1} className={styles.sectionTitle}>
                Our Mission
              </AnimatedTitle>
              <AnimatedDescription variant="default" delay={0.3} className={styles.missionText}>
                We want engineers to learn systems in college itself, not spend 10 years discovering what 
                senior architects already know. With the right resources and structured path, systems knowledge 
                can be gained during education years, accelerating career growth by decades.
              </AnimatedDescription>
              <AnimatedDescription variant="default" delay={0.5} className={styles.missionText}>
                This is not a commercial venture—it's for developer welfare. While many projects exist, 
                nobody talks about systems with such depth. We're building that missing bridge between 
                rapid development skills and deep systems understanding.
              </AnimatedDescription>
              <AnimatedDescription variant="default" delay={0.7} className={styles.missionText}>
                Every article includes practical assignments and assessments with outsourced authentic resources. 
                Learn fundamentals, then see how they connect across domains—because systems thinking 
                is the new baseline for engineering excellence.
              </AnimatedDescription>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* <AnimatedSection animationType="fadeInUp" delay={0.4}>
        <div className={cinematicStyles.cinematicSection}>
          <div className={cinematicStyles.cinematicContainer}>
            <div className={cinematicStyles.cinematicFeatures}>
              <div className={cinematicStyles.cinematicFeature}>
                <div className={cinematicStyles.cinematicFeatureIcon}>🎯</div>
                <h3 className={cinematicStyles.cinematicFeatureTitle}>Early Systems Education</h3>
                <p className={cinematicStyles.cinematicFeatureText}>
                  Learn systems thinking during college, not after 10 years of experience. 
                  Accelerate your career by decades with structured learning paths.
                </p>
              </div>
              <div className={cinematicStyles.cinematicFeature}>
                <div className={cinematicStyles.cinematicFeatureIcon}>🔗</div>
                <h3 className={cinematicStyles.cinematicFeatureTitle}>Connected Knowledge</h3>
                <p className={cinematicStyles.cinematicFeatureText}>
                  Bridge the gap between scattered tutorials and coherent systems understanding. 
                  See how all technologies connect as unified systems.
                </p>
              </div>
              <div className={cinematicStyles.cinematicFeature}>
                <div className={cinematicStyles.cinematicFeatureIcon}>🚀</div>
                <h3 className={cinematicStyles.cinematicFeatureTitle}>Practical Excellence</h3>
                <p className={cinematicStyles.cinematicFeatureText}>
                  Apply systems knowledge through real projects and assessments. 
                  Build engineering judgment that lasts beyond any framework.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection> */}
    </>
  );
}


// ============================================================
// sections/about/Pathway.tsx
// ============================================================
export function Pathway() {
  return (
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
  );
}


// ============================================================
// sections/about/Philosophy.tsx
// ============================================================
export function Philosophy() {
  return (
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
  );
}


// ============================================================
// sections/about/Systems.tsx
// ============================================================
export function Systems() {
  return (
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
  );
}


// ============================================================
// sections/about/Values.tsx
// ============================================================
export function Values() {
  return (
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
  );
}


// ============================================================
// sections/about/Wallpaper.tsx
// ============================================================
export function Wallpaper() {
  return (
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
              {/* <span className={styles.pointIcon}>🔧</span> */}
              <span className={styles.pointLabel}>
                Systematic Thinking
              </span>
            </div>
            <div className={styles.wallpaperPoint}>
              {/* <span className={styles.pointIcon}>⚡</span> */}
              <span className={styles.pointLabel}>Performance First</span>
            </div>
            <div className={styles.wallpaperPoint}>
              {/* <span className={styles.pointIcon}>🛡️</span> */}
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
  );
}


// ============================================================
// sections/blog/BlogPosts.tsx
// ============================================================
export function BlogPosts(): React.ReactElement {
  return (
    <section className={styles.postsSection}>
      <h2 className={styles.sectionTitle}>Latest Posts</h2>
      <div className={styles.comingSoonContainer}>
        <div className={styles.comingSoonMessage}>
          <h3>Coming Soon!</h3>
          <p>
            We're preparing insightful articles on engineering excellence, system architecture, 
            and the journey to becoming a 100xEngineer. Stay tuned for expert content 
            that will transform your approach to software development.
          </p>
          <div className={styles.topicsPreview}>
            <h4>Future Topics Include:</h4>
            <ul>
              <li>Depth-First Learning Methodologies</li>
              <li>System Design Patterns</li>
              <li>Performance Optimization Strategies</li>
              <li>Career Growth for Engineers</li>
              <li>Building Scalable Applications</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/blog/Categories.tsx
// ============================================================
export function Categories(): React.ReactElement {
  const categories = [
    "Engineering Philosophy",
    "System Design", 
    "Career Growth",
    "Frontend",
    "Best Practices",
    "Cloud & DevOps"
  ];

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.sectionTitle}>Categories</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <div key={index} className={styles.categoryCard}>
            <span className={styles.categoryName}>{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// sections/blog/Hero.tsx
// ============================================================
export function BlogHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Engineering Blog</h1>
        <p className={styles.subtitle}>
          Deep dives into system architecture, engineering principles, and journey to becoming a 100xEngineer.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/blog/Newsletter.tsx
// ============================================================
export function Newsletter(): React.ReactElement {
  return (
    <section className={styles.newsletterSection}>
      <h2 className={styles.sectionTitle}>Stay Updated</h2>
      <p className={styles.description}>
        Get the latest insights on engineering excellence and career growth delivered to your inbox.
      </p>
      <div className={styles.newsletterForm}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className={styles.emailInput}
        />
        <button className={styles.subscribeButton}>Subscribe</button>
      </div>
    </section>
  );
}


// ============================================================
// sections/community/CodeOfConduct.tsx
// ============================================================
export function CodeOfConduct(): React.ReactElement {
  return (
    <section className={styles.conductSection}>
      <h2 className={styles.sectionTitle}>Code of Conduct</h2>
      <div className={styles.conduct}>
        <p className={styles.description}>
          Our code of conduct ensures a safe and inclusive environment for all community members.
        </p>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <h3 className={styles.principleTitle}>Inclusivity</h3>
            <p className={styles.principleText}>We welcome people from all backgrounds and experience levels.</p>
          </div>
          <div className={styles.principle}>
            <h3 className={styles.principleTitle}>Collaboration</h3>
            <p className={styles.principleText}>We work together to solve problems and learn from each other.</p>
          </div>
          <div className={styles.principle}>
            <h3 className={styles.principleTitle}>Excellence</h3>
            <p className={styles.principleText}>We strive for technical excellence and continuous improvement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/community/GetInvolved.tsx
// ============================================================
export function GetInvolved(): React.ReactElement {
  return (
    <section className={styles.involvedSection}>
      <h2 className={styles.sectionTitle}>Get Involved</h2>
      <p className={styles.description}>
        Join our community and start making a difference today.
      </p>
      <div className={styles.actions}>
        <Link href="/contribute" className={styles.primaryButton}>Contribute</Link>
        <Link href="/blog" className={styles.secondaryButton}>Read Blog</Link>
        <Link href="/contact" className={styles.secondaryButton}>Contact Us</Link>
      </div>
    </section>
  );
}


// ============================================================
// sections/community/Guidelines.tsx
// ============================================================
export function Guidelines(): React.ReactElement {
  return (
    <section className={styles.guidelinesSection}>
      <h2 className={styles.sectionTitle}>Community Guidelines</h2>
      <div className={styles.guidelines}>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>Be Respectful</h3>
          <p className={styles.guidelineText}>Treat everyone with dignity and respect, regardless of their experience level.</p>
        </div>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>Help Others Learn</h3>
          <p className={styles.guidelineText}>Share knowledge generously and support fellow learners on their journey.</p>
        </div>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>Stay Constructive</h3>
          <p className={styles.guidelineText}>Provide helpful feedback and contribute to positive discussions.</p>
        </div>
        <div className={styles.guideline}>
          <h3 className={styles.guidelineTitle}>No Spam</h3>
          <p className={styles.guidelineText}>Keep discussions relevant and avoid self-promotion.</p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/community/Hero.tsx
// ============================================================
export function CommunityHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Community Guidelines</h1>
        <p className={styles.subtitle}>
          Our community is built on respect, collaboration, and the shared goal of engineering excellence.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/contact/ContactForm.tsx
// ============================================================
export function ContactForm() {
  const { formData, handleChange, handleSubmit, responseMessage, isSuccess } = useContactForm();

  return (
    <div className={styles.formSection}>
      <h2 className={styles.formTitle}>Send us a Message</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company" className={styles.formLabel}>
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formLabel}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.formTextarea}
          />
        </div>

        <button type="submit" className={styles.formButton}>
          Send Message
        </button>

        {responseMessage && (
          <div
            className={`${styles.responseMessage} ${isSuccess ? styles.success : styles.error}`}
          >
            {responseMessage}
          </div>
        )}
      </form>
    </div>
  );
}


// ============================================================
// sections/contact/ContactInfo.tsx
// ============================================================
export function ContactInfo() {
  return (
    <div className={styles.contactInfo}>
      <h2 className={styles.infoTitle}>Contact Information</h2>

      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Email</div>
        <div className={styles.infoValue}>
          <a
            href="mailto:admin@100xSystems.dev"
            className={styles.infoLink}
          >
            admin@100xSystems.dev
          </a>
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Business Hours</div>
        <div className={styles.infoValue}>
          Monday - Friday: 9:00 AM - 6:00 PM EST
          <br />
          Saturday - Sunday: Closed
        </div>
      </div>

      <div className={styles.infoItem}>
        <div className={styles.infoLabel}>Response Time</div>
        <div className={styles.infoValue}>
          We typically respond within 24 hours during business days.
        </div>
      </div>
      <section className={styles.cubeShowcase}>
        <div className={styles.cubeContainer}>
          <CubeHover />
        </div>
      </section>
    </div>
  );
}


// ============================================================
// sections/contact/Hero.tsx
// ============================================================
export function ContactHero() {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.title}>Get in Touch</h1>
      <p className={styles.subtitle}>
        Ready to transform your coding skills into engineering excellence?
        Let's start your journey.
      </p>
    </section>
  );
}


// ============================================================
// sections/contribute/GetStarted.tsx
// ============================================================
export function GetStarted(): React.ReactElement {
  return (
    <section className={styles.startedSection}>
      <h2 className={styles.sectionTitle}>Ready to Contribute?</h2>
      <p className={styles.description}>
        Join our community of passionate engineers and help shape the future of learning.
      </p>
      <div className={styles.actions}>
        <Link href="/contact" className={styles.primaryButton}>Get Started</Link>
        <Link href="/community" className={styles.secondaryButton}>Join Community</Link>
      </div>
    </section>
  );
}


// ============================================================
// sections/contribute/Guidelines.tsx
// ============================================================
export function ContributionGuidelines(): React.ReactElement {
  return (
    <section className={styles.guidelinesSection}>
      <h2 className={styles.sectionTitle}>Contribution Guidelines</h2>
      <div className={styles.content}>
        <p className={styles.description}>
          We welcome contributions from the community. Here's how you can help make 100xSystems better.
        </p>
        <div className={styles.guidelines}>
          <div className={styles.guideline}>
            <h3 className={styles.guidelineTitle}>Code Quality</h3>
            <p className={styles.guidelineText}>Follow clean code practices and maintain high standards.</p>
          </div>
          <div className={styles.guideline}>
            <h3 className={styles.guidelineTitle}>Documentation</h3>
            <p className={styles.guidelineText}>Provide clear documentation for your contributions.</p>
          </div>
          <div className={styles.guideline}>
            <h3 className={styles.guidelineTitle}>Testing</h3>
            <p className={styles.guidelineText}>Include tests for new features and bug fixes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/contribute/Hero.tsx
// ============================================================
export function ContributeHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Contribute to 100xSystems</h1>
        <p className={styles.subtitle}>
          Help us build the best learning platform for engineers. Your contributions make a difference.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/contribute/WaysToContribute.tsx
// ============================================================
export function WaysToContribute(): React.ReactElement {
  return (
    <section className={styles.contributeSection}>
      <h2 className={styles.sectionTitle}>Ways to Contribute</h2>
      <div className={styles.ways}>
        <div className={styles.way}>
          <h3 className={styles.wayTitle}>Content Creation</h3>
          <p className={styles.wayDescription}>Write tutorials, articles, and learning materials.</p>
        </div>
        <div className={styles.way}>
          <h3 className={styles.wayTitle}>Code Contributions</h3>
          <p className={styles.wayDescription}>Fix bugs, add features, and improve the platform.</p>
        </div>
        <div className={styles.way}>
          <h3 className={styles.wayTitle}>Community Support</h3>
          <p className={styles.wayDescription}>Help others learn and answer questions.</p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/donate/Hero.tsx
// ============================================================
export function DonateHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Support 100xSystems</h1>
        <p className={styles.subtitle}>
          Your contribution helps us continue building the best platform for engineering education.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/donate/Impact.tsx
// ============================================================
export function Impact(): React.ReactElement {
  return (
    <section className={styles.impactSection}>
      <h2 className={styles.sectionTitle}>Your Impact</h2>
      <div className={styles.impactGrid}>
        <div className={styles.impactItem}>
          <h3 className={styles.impactNumber}>10,000+</h3>
          <p className={styles.impactText}>Engineers Educated</p>
        </div>
        <div className={styles.impactItem}>
          <h3 className={styles.impactNumber}>50+</h3>
          <p className={styles.impactText}>Learning Paths</p>
        </div>
        <div className={styles.impactItem}>
          <h3 className={styles.impactNumber}>100%</h3>
          <p className={styles.impactText}>Open Source</p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/donate/Options.tsx
// ============================================================
export function DonationOptions(): React.ReactElement {
  return (
    <section className={styles.optionsSection}>
      <h2 className={styles.sectionTitle}>Donation Options</h2>
      <div className={styles.optionsGrid}>
        <div className={styles.optionCard}>
          <h3 className={styles.optionTitle}>One-time Donation</h3>
          <p className={styles.optionDescription}>Support us with a single contribution</p>
          <button className={styles.donateButton}>Donate Now</button>
        </div>
        <div className={styles.optionCard}>
          <h3 className={styles.optionTitle}>Monthly Support</h3>
          <p className={styles.optionDescription}>Become a sustaining supporter</p>
          <button className={styles.donateButton}>Subscribe</button>
        </div>
        <div className={styles.optionCard}>
          <h3 className={styles.optionTitle}>Corporate Sponsorship</h3>
          <p className={styles.optionDescription}>Partner with us as an organization</p>
          <button className={styles.donateButton}>Learn More</button>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/donate/ThankYou.tsx
// ============================================================
export function ThankYou(): React.ReactElement {
  return (
    <section className={styles.thankYouSection}>
      <h2 className={styles.sectionTitle}>Thank You</h2>
      <p className={styles.description}>
        Every contribution, no matter the size, makes a difference in helping engineers achieve their full potential.
      </p>
      <div className={styles.appreciation}>
        <p className={styles.message}>
          Your support enables us to maintain and improve our platform, create new learning materials, and provide free education to aspiring engineers worldwide.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/faq/Categories.tsx
// ============================================================
export function FAQCategories(): React.ReactElement {
  const categories = [
    "Getting Started",
    "Learning Paths",
    "Technical Support",
    "Account & Billing",
    "Community"
  ];

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.sectionTitle}>Browse by Category</h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <div key={index} className={styles.categoryCard}>
            <span className={styles.categoryName}>{category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// sections/faq/ContactSupport.tsx
// ============================================================
export function ContactSupport(): React.ReactElement {
  return (
    <section className={styles.supportSection}>
      <h2 className={styles.sectionTitle}>Still Need Help?</h2>
      <p className={styles.description}>
        Can't find what you're looking for? Our support team is here to help you succeed on your engineering journey.
      </p>
      <div className={styles.contactOptions}>
        <div className={styles.contactOption}>
          <h3 className={styles.optionTitle}>Email Support</h3>
          <p className={styles.optionDescription}>Get detailed help via email</p>
          <a href="mailto:admin@100xsystems.dev" className={styles.contactButton}>Send Email</a>
        </div>
        <div className={styles.contactOption}>
          <h3 className={styles.optionTitle}>Community Forum</h3>
          <p className={styles.optionDescription}>Get help from fellow learners</p>
          <Link href="/community" className={styles.contactButton}>Visit Forum</Link>
        </div>
        <div className={styles.contactOption}>
          <h3 className={styles.optionTitle}>Live Chat</h3>
          <p className={styles.optionDescription}>Chat with our team (coming soon)</p>
          <button className={styles.contactButton} disabled>Coming Soon</button>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/faq/Hero.tsx
// ============================================================
export function FAQHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Frequently Asked Questions</h1>
        <p className={styles.subtitle}>
          Find answers to common questions about 100xSystems and our approach to engineering excellence.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/faq/Items.tsx
// ============================================================
export function Items(): React.ReactElement {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What is 100xSystems?",
      answer: "100xSystems is a comprehensive platform for structured software engineering education, designed to transform developers into 100xEngineers through depth-first learning methodologies. We focus on building strong foundations and systems thinking rather than superficial knowledge of multiple technologies."
    },
    {
      question: "What makes the 100x approach different from other learning platforms?",
      answer: "Unlike platforms that teach breadth over depth, we emphasize mastering one technology completely before expanding. Our approach focuses on understanding trade-offs, system design principles, and the why behind engineering decisions. We believe true excellence comes from deep understanding, not from collecting programming languages."
    },
    {
      question: "How long does it take to become a 100xEngineer?",
      answer: "The journey varies based on your starting point and dedication. Typically, it takes 1-3 years of consistent learning and practice to achieve engineering excellence. However, the timeline depends on your prior experience, time commitment, and how quickly you grasp systems thinking concepts."
    },
    {
      question: "Do I need prior programming experience?",
      answer: "While some programming experience helps, we accept motivated learners at various levels. Our curriculum is designed to take you from your current level to engineering excellence. We provide different learning paths based on your starting point - from beginners to experienced developers."
    },
    {
      question: "What programming languages do you teach?",
      answer: "We focus on deep mastery of one language as a foundation (typically JavaScript/TypeScript or Python), then expand to system design, architecture patterns, and multiple technologies. The specific language matters less than understanding engineering principles that apply across all technologies."
    },
    {
      question: "Is the content free or paid?",
      answer: "We offer both free and premium content. Core learning materials and foundational concepts are freely accessible to everyone. Premium features include personalized mentorship, advanced system design workshops, code reviews, and career guidance. We believe in making quality engineering education accessible while providing value for those who want accelerated growth."
    },
    {
      question: "What is systems thinking and why is it important?",
      answer: "Systems thinking is the ability to see the complete picture - how components interact, how failures cascade, how performance scales, and understanding trade-offs. It's what separates senior engineers from coders. This skill allows you to build robust, scalable systems and make better architectural decisions."
    },
    {
      question: "How does the mentorship program work?",
      answer: "Our mentorship connects you with experienced engineers who provide personalized guidance, code reviews, and career advice. Mentors help you navigate challenges, avoid common pitfalls, and accelerate your learning. Premium members get regular one-on-one sessions and priority support."
    },
    {
      question: "What kind of projects will I build?",
      answer: "You'll work on progressively complex projects that build real engineering skills. From simple applications to distributed systems, from basic APIs to scalable microservices. Each project is designed to teach specific engineering concepts and system design principles."
    },
    {
      question: "How do you assess progress and determine if someone is a 100xEngineer?",
      answer: "Progress is assessed through practical projects, code reviews, system design challenges, and peer feedback. We evaluate your ability to think through trade-offs, design scalable systems, and write maintainable code. The 100xEngineer designation is earned by demonstrating consistent engineering excellence across multiple projects."
    },
    {
      question: "What career support do you provide?",
      answer: "We offer comprehensive career support including resume building, interview preparation, portfolio development, and job placement assistance. Our network of hiring partners actively seeks graduates who have completed our program. We also provide guidance on salary negotiation and career progression."
    },
    {
      question: "Can I learn while working a full-time job?",
      answer: "Yes! Our program is designed for working professionals. We recommend 8-10 hours per week for consistent progress. The curriculum is flexible, allowing you to learn at your own pace. Many of our successful graduates balanced learning with full-time jobs."
    },
    {
      question: "What if I get stuck or need help?",
      answer: "We provide multiple support channels: community forums, weekly Q&A sessions, peer study groups, and expert mentorship (for premium members). No one gets left behind - we have structured help systems to ensure you can overcome any learning obstacles."
    },
    {
      question: "Do you offer certificates or credentials?",
      answer: "Yes, we provide certificates of completion for each module and a final 100xEngineer certification. More importantly, you'll have a portfolio of impressive projects and demonstrated engineering skills that matter more than any certificate to employers."
    },
    {
      question: "How is this different from a computer science degree?",
      answer: "While CS degrees provide theoretical foundations, we focus on practical engineering excellence and systems thinking. We teach what's actually needed in industry - how to build scalable systems, work with teams, and make architectural decisions. Many CS graduates use our program to bridge the gap between academic knowledge and industry requirements."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 30-day money-back guarantee for premium memberships. If you're not satisfied with the program within the first 30 days, we'll provide a full refund. We also offer pro-rated refunds if you need to pause your learning journey."
    },
    {
      question: "How do I get started?",
      answer: "Start with our foundation courses, take the placement assessment to determine your starting level, and choose your learning path. The best way is to begin with our free introductory content to understand our teaching style, then decide if you want to upgrade to premium for accelerated learning."
    }
  ];

  return (
    <section className={styles.faqSection}>
      <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <button 
              className={styles.questionButton}
              onClick={() => toggleItem(index)}
              aria-expanded={openItems.includes(index)}
            >
              <span className={styles.questionText}>{faq.question}</span>
              <span className={`${styles.toggleIcon} ${openItems.includes(index) ? styles.open : ''}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
            </button>
            <div className={`${styles.answer} ${openItems.includes(index) ? styles.open : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// sections/home/AbstractGallery.tsx
// ============================================================
export function AbstractGallery() {

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


// ============================================================
// sections/home/Section0.tsx
// ============================================================
export function Section0() {
  return (
    <div className={styles.section0}>
      {/* Fluid Animation Background - Working version from SectionMain */}
      {/* <FluidAnimation id="section0-fluid-animation" useCustomColors={true} /> */}
      
      {/* Knowledge Graph Particles - on top of fluid animation */}
      {/* <KnowledgeGraphParticles id="section0-particles" /> */}

      {/* Navigation Bar */}
      <nav className={styles.navigationBar}>
        <div className={styles.navLeft}>
          <span className={styles.navLogo}>100XSYSTEMS</span>
        </div>
        <div className={styles.navRight}>
          <a href="#" className={styles.navLink}>API</a>
          <a href="#" className={styles.navLink}>COMPANY</a>
          <a href="#" className={styles.navLink}>COLOSSUS</a>
          <a href="#" className={styles.navLink}>CAREERS</a>
          <a href="#" className={styles.navLink}>NEWS</a>
          <a href="#" className={styles.navLink}>SHOP</a>
          <a href="#" className={styles.navLink}>SPACEX</a>
          <button className={styles.tryButton}>TRY 100XSYSTEMS</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img
            src="/100xsystemsfooter.webp"
            alt="100xSystems"
            className={styles.logo}
          />
        </div>

        {/* Static Input Field Display */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="What do you want to know?"
            className={styles.input}
            readOnly
          />
          <button className={styles.sendButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
          </button>
        </div>

        {/* Announcement Section */}
        <div className={styles.announcement}>
          <p>100xSystems joins the revolution in system design education</p>
          <button className={styles.readButton}>READ ANNOUNCEMENT</button>
        </div>
      </div>

      {/* Bottom Arrow */}
      <div className={styles.bottomArrow}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
    </div>
  );
}


// ============================================================
// sections/home/Section1.tsx
// ============================================================
export function Section1() {
  return (
    <>
      <div className={styles.rubikVideoShowcase}>
        <div className={styles.rubikVideoBackground} />
        
        <div className={styles.rubikVideoOverlay}></div>
        
        <div className={styles.rubikVideoContent}>
          <div className={styles.rubikVideoTitle}>
            <Image
              src="/100xsystemsonlytitle.webp"
              alt="100x Systems"
              width={400}
              height={80}
              className={styles.titleLogo}
              priority
            />
          </div>
          <p className={styles.rubikVideoSubtitle}>
            Master Rubik's Cube of Software Engineering
          </p>
          <div className={styles.ctaButtons}>
            <InteractiveButton 
              href="/articles" 
              variant="cta"
              scrambleText={{
                hover: "BEGIN MASTERY",
                speed: 2,
                chars: "upperCase",
                revealDelay: 0.1
              }}
            >
              Start Learning
            </InteractiveButton>
            <InteractiveButton 
              href="/roadmaps" 
              variant="secondary"
              scrambleText={{
                hover: "EXPLORE PATHS",
                speed: 2,
                chars: "upperCase",
                revealDelay: 0.1
              }}
            >
              Explore Paths
            </InteractiveButton>
          </div>
        </div>
      </div>

      <AnimatedSection animationType="fadeInUp" delay={0.3}>
        <div className={cinematicStyles.cinematicSection}>
          <div className={cinematicStyles.cinematicContainer}>
            <div className={cinematicStyles.cinematicHeader}>
              <AnimatedTitle variant="hero" delay={0.1} className={cinematicStyles.cinematicTitle}>
                Systems Thinking in Engineering
              </AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.2} className={cinematicStyles.cinematicDescription}>
                Like a Rubik's Cube, software systems appear simple but hide immense complexity. 
                Most developers focus on one aspect—building features—without understanding how 
                all components work together to create robust, scalable solutions.
              </AnimatedDescription>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}


// ============================================================
// sections/home/Section10.tsx
// ============================================================
export function Section10() {
  return (
      <section className={styles.ctaSection} data-speed="0.7">
        <div className={styles.ctaContainer}>
          <div className={styles.leftCard} data-speed="0.9">
            <div className={styles.cardImage}>
              <Image
                src="/assets/wallpaper/hand-one-finger-rubik-cube-holded-like-pro.jpg"
                alt="Mastery and Precision"
                width={600}
                height={800}
                className={styles.cardImageElement}
              />
            </div>
            <div className={styles.imageOverlay}></div>
          </div>
          
          <div className={styles.rightCard}>
            <div className={styles.cardContent}>
              <AnimatedTitle variant="hero" delay={0.3} className={styles.cardTitle}>
                The Final 1%
              </AnimatedTitle>
              <AnimatedTitle variant="hero" delay={0.5} className={styles.cardSubtitle}>
                That Separates Good Engineers From 100x Engineers
              </AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.7} className={styles.cardDescription}>
                You've mastered the syntax. You know the frameworks. But can you architect systems that scale?
                Can you debug the impossible? Can you lead teams through complexity?
              </AnimatedDescription>
              <AnimatedDescription variant="subtle" delay={0.9} className={styles.cardSubDescription}>
                Join engineers from Google, Meta, and startups who've made the leap.
                The journey isn't easy—but greatness never is.
              </AnimatedDescription>
              
              <AnimatedSection animationType="scaleIn" delay={1.1}>
                <InteractiveButton 
                  variant="cta" 
                  href="/roadmaps"
                  scrambleText={{
                    hover: "START JOURNEY NOW",
                    speed: 2,
                    chars: "upperCase",
                    revealDelay: 0.1
                  }}
                  className={styles.ctaButton}
                >
                  Start Your Journey
                </InteractiveButton>
              </AnimatedSection>
              
              <AnimatedSection animationType="fadeInUp" delay={1.3}>
                <div className={styles.trustIndicators}>
                  <div className={styles.trustItem}>
                    <span className={styles.trustNumber}>500+</span>
                    <span className={styles.trustLabel}>Engineers Transformed</span>
                  </div>
                  <div className={styles.trustItem}>
                    <span className={styles.trustNumber}>50x</span>
                    <span className={styles.trustLabel}>Impact Multiplier</span>
                  </div>
                  <div className={styles.trustItem}>
                    <span className={styles.trustNumber}>12mo</span>
                    <span className={styles.trustLabel}>Journey Duration</span>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
  );
}


// ============================================================
// sections/home/Section11.tsx
// ============================================================
export function Section11() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef3 = useRef<HTMLDivElement>(null);
  const animationRef = useRef(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;
      targetProgress.current = progress;
    };

    const smoothAnimation = () => {
      setScrollProgress(prev => {
        const diff = targetProgress.current - prev;
        const newProgress = prev + (diff * 0.08);
        return Math.max(0, Math.min(1, newProgress));
      });
      
      animationRef.current = requestAnimationFrame(smoothAnimation);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    animationRef.current = requestAnimationFrame(smoothAnimation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (marqueeRef1.current) {
      const translateX = 25 - (scrollProgress * 300);
      marqueeRef1.current.style.transform = `translateX(${translateX}%)`;
    }
    if (marqueeRef3.current) {
      const translateX = -20 + (scrollProgress * 150);
      marqueeRef3.current.style.transform = `translateX(${translateX}%)`;
    }
  }, [scrollProgress]);

  return (
    <div className={styles.marqueeSection}>
      <div className={styles.marqueeContainer}>
        <div ref={marqueeRef1} className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {[...Array(12)].map((_, index) => (
              <div key={index} className={styles.marqueeItem}>
                <Image
                  src="/100xsystemsonlytitle.webp"
                  alt="100x Systems"
                  width={500}
                  height={100}
                  className={styles.marqueeImage}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        <div ref={marqueeRef3} className={`${styles.marqueeTrack} ${styles.center}`}>
          <div className={styles.marqueeContent}>
            {[...Array(12)].map((_, index) => (
              <div key={index} className={styles.marqueeItem}>
                <Image
                  src="/100xsystemsonlytitle.webp"
                  alt="100x Systems"
                  width={500}
                  height={100}
                  className={styles.marqueeImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// sections/home/Section2.tsx
// ============================================================
export function Section2() {
  return (
    <AnimatedSection animationType="fadeInUp" delay={0.4}>
      <div className={styles.rubiksConclusion}>
        <div className={styles.conclusionContent}>
          <div className={styles.conclusionText}>
            <AnimatedTitle variant="insight" delay={0.1} className={styles.conclusionTitle}>Systems Clarity</AnimatedTitle>
            <AnimatedDescription variant="featured" delay={0.2} className={styles.description}>
              100xEngineers learn to see the complete system—understanding trade-offs, 
              anticipating consequences, and architecting solutions that scale. 
              They don't just solve problems; they understand the underlying principles 
              that make systems work reliably.
            </AnimatedDescription>
            <div className={styles.ctaContainer}>
              <InteractiveButton 
                href="/articles" 
                variant="cta"
                scrambleText={{
                  hover: "BEGIN JOURNEY",
                  speed: 2,
                  chars: "upperCase",
                  revealDelay: 0.1
                }}
              >
                Start Your Journey
              </InteractiveButton>
            </div>
          </div>
          <div className={styles.conclusionAnimation}>
            <CubeSmall />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


// ============================================================
// sections/home/Section3.tsx
// ============================================================
export function Section3() {
  return (
    <div className={styles.videoShowcaseFullWidth}>
      <div className={styles.minimalistContent} />
      <div className={styles.minimalistContent} />
      <div className={styles.minimalistContent} />

      <div className={styles.videoOverlay}></div>

      <div className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>From Developer to Systems Engineer</h2>
        <p className={styles.videoShowcaseDescription}>
          Most developers learn technologies quickly but miss systems perspective. We teach you to understand complete software lifecycle - from frontend architecture to deployment patterns. Transform how you think about code and become engineer who builds scalable, maintainable systems that stand test of time.
        </p>
      </div>

      <div className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Depth Over Breadth Learning</h2>
        <p className={styles.videoShowcaseDescription}>
          Stop collecting certificates and start building real expertise. Our structured learning paths focus on mastering fundamentals that never become obsolete. Learn one language deeply, understand systems architecture, and gain engineering judgment that separates senior engineers from junior developers.
        </p>
      </div>

      <div className={styles.videoShowcaseContent}>
        <h2 className={styles.videoShowcaseTitle}>Build Systems That Matter</h2>
        <p className={styles.videoShowcaseDescription}>
          AI can generate code, but only engineers understand systems. Learn to make architectural decisions, solve complex problems, and lead technical teams. Join 100xEngineer cohort where we build real projects, understand constraints, and develop engineering mindset that creates career opportunities.
        </p>
      </div>
    </div>
  );
}


// ============================================================
// sections/home/Section4.tsx
// ============================================================
export function Section4() {
  return (
    <AnimatedSection animationType="scaleIn" stagger={0.15}>
      <section className={styles.featuresSection} data-speed="0.6">
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
  );
}


// ============================================================
// sections/home/Section5.tsx
// ============================================================
export function Section5() {
  return (
    <AnimatedSection animationType="fadeInUp" stagger={0.1}>
      <section className={styles.ctaSection} data-speed="0.4">
        <AnimatedTitle variant="cta" delay={0.1} className={styles.ctaTitle}>Ready to Become an Engineer?</AnimatedTitle>
        <AnimatedDescription variant="featured" delay={0.3} className={styles.ctaText}>
          Join thousands who've transformed their careers through our structured learning pathways
        </AnimatedDescription>
        <InteractiveButton 
          variant="cta" 
          href="/roadmaps"
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
  );
}


// ============================================================
// sections/home/Section6.tsx
// ============================================================
export function Section6() {
  return (
    <AnimatedSection animationType="fadeInLeft" delay={0.2}>
      <section className={styles.illustrationSection} data-speed="0.7">
        <div className={`${sharedStyles.videoSideBySide} ${styles.illustrationContent}`}>
          <div className={sharedStyles.videoLeft} data-speed="0.9">
            <div 
              className={sharedStyles.videoCard}
            />
          </div>
          <AnimatedSection animationType="fadeInRight" delay={0.4}>
            <div className={sharedStyles.videoRight}>
              <h2 className={sharedStyles.sectionTitle}>Beyond Code, Into Engineering</h2>
              <AnimatedDescription variant="featured" delay={0.3} className={styles.illustrationText}>
                While others teach you to write code, we teach you to think like engineers. 
                Understand the 'why' behind every architectural decision, master system design principles, 
                and build solutions that scale.
              </AnimatedDescription>
              <div className={sharedStyles.illustrationPoints}>
                <div className={sharedStyles.pointItem}>
                  <span className={sharedStyles.pointNumber}>01</span>
                  <span className={sharedStyles.pointText}>System Architecture Mastery</span>
                </div>
                <div className={sharedStyles.pointItem}>
                  <span className={sharedStyles.pointNumber}>02</span>
                  <span className={sharedStyles.pointText}>Performance Engineering</span>
                </div>
                <div className={sharedStyles.pointItem}>
                  <span className={sharedStyles.pointNumber}>03</span>
                  <span className={sharedStyles.pointText}>Production-Ready Development</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </AnimatedSection>
  );
}


// ============================================================
// sections/home/Section7.tsx
// ============================================================
export function Section7() {
  return (
    <AnimatedSection animationType="fadeInLeft" delay={0.2}>
      <section className={styles.wallpaperSection} data-speed="0.5">
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
            <div className={styles.wallpaperImageWrapper} data-speed="0.8">
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
  );
}


// ============================================================
// sections/home/Section8.tsx
// ============================================================
export function Section8() {
  return (
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
  );
}


// ============================================================
// sections/home/Section9.tsx
// ============================================================
export function Section9() {
  return (
    <AnimatedSection animationType="rotateIn" delay={0.2}>
      <section className={styles.modernSection} data-speed="0.8">
        <div className={styles.modernContent}>
          <div className={styles.modernImageWrapper} data-speed="0.85">
            <div className={styles.videoLeft}>
              <div 
                className={styles.videoCard}
              />
            </div>
          </div>
          <AnimatedSection animationType="fadeInRight" delay={0.6}>
            <div className={styles.modernText}>
              <AnimatedTitle variant="modern" delay={0.5} className={styles.modernTitle}>Modern Engineering Stack</AnimatedTitle>
              <AnimatedDescription variant="featured" delay={0.7} className={styles.modernDescription}>
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
  );
}


// ============================================================
// sections/home/SectionBootcamp.tsx
// ============================================================
export function SectionBootcamp() {
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


// ============================================================
// sections/home/SectionMain.tsx
// ============================================================
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className={styles.editorLoading} />,
});

// Import Quill bubble theme CSS (extracted at build time, no SSR issues)

// Hero Input Component - React Quill Bubble Editor with Attachment
function HeroInput() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState<Array<{ id: string; name: string; type: string; file: File }>>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const modules = {
    clipboard: {
      matchVisual: false,
    },
    keyboard: {
      bindings: {
        enter: {
          key: 'Enter',
          shiftKey: false,
          handler: () => {
            // Only send if there's content
            if (value.trim()) {
              handleSendMessage();
            }
            return false;
          }
        }
      }
    }
  };

  // Handle wheel events for smooth scrolling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Let CSS handle scrolling naturally, just ensure proper containment
    e.stopPropagation();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');

    if (isImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setValue((prev) => prev + `<img src="${imageUrl}" />`);
      };
      reader.readAsDataURL(file);
    } else {
      // Add to attachments for AI
      setAttachments((prev) => [...prev, {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: file.type,
        file,
      }]);
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('audio')) return '🎵';
    if (type.includes('video')) return '🎬';
    return '📎';
  };

  const handleSendMessage = () => {
    if (!value.trim()) return;
    
    // Store the complete HTML content with images for AI Dashboard
    localStorage.setItem('pending-message', value);
    router.push('/new-ai-dashboard');
  };

  // Voice recording functionality
  const startRecording = () => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setValue(transcript);
      };
      
      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
      
      setRecognition(recognitionInstance);
      recognitionInstance.start();
      setIsRecording(true);
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className={styles.inputOuter}>
      {/* Scrollable Content Area */}
      <div 
        className={styles.inputWrapper} 
        ref={wrapperRef}
        onWheel={handleWheel}
      >
        {/* Attachment Bubbles */}
        {attachments.length > 0 && (
          <div className={styles.attachmentsRow}>
            {attachments.map((att) => (
              <div key={att.id} className={styles.attachmentBubble}>
                <span className={styles.attachmentIcon}>{getFileIcon(att.type)}</span>
                <div className={styles.attachmentInfo}>
                  <span className={styles.attachmentName}>{att.name}</span>
                  <span className={styles.attachmentType}>{att.type.split('/')[1]?.toUpperCase() || 'FILE'}</span>
                </div>
                <button 
                  className={styles.attachmentRemove}
                  onClick={() => removeAttachment(att.id)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder="Ask anything about system  design..."
          className={styles.quillEditor}
        />
      </div>

      {/* Fixed Button Bar - Outside scrollable area */}
      <div className={styles.inputContainer}>
        {/* Attachment Button - Direct file picker */}
        <button 
          className={styles.attachmentButton}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="16"/>
            <line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </button>

        {/* Voice Recording Button */}
        <button 
          className={`${styles.voiceButton} ${isRecording ? styles.recording : ''}`}
          onClick={toggleRecording}
          title={isRecording ? "Stop recording" : "Start voice recording"}
        >
          <FaMicrophone size={16} />
        </button>

        {/* Hidden File Input - Accepts any file */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <button onClick={handleSendMessage} className={styles.sendButton}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}

export function SectionMain() {
  return (
    <div className={styles.sectionMain}>
      {/* Content */}
      <div className={styles.content}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img
            src="/100xsystemsfooter.webp"
            alt="100xSystems"
            className={styles.logo}
          />
        </div>

        {/* Hero Input */}
        <HeroInput />
      </div>
    </div>
  );
}


// ============================================================
// sections/install/Hero.tsx
// ============================================================
export function InstallHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Installation Guide</h1>
        <p className={styles.subtitle}>
          Get started with 100xSystems by following our step-by-step installation instructions.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/install/Prerequisites.tsx
// ============================================================
export function Prerequisites(): React.ReactElement {
  return (
    <section className={styles.prerequisitesSection}>
      <h2 className={styles.sectionTitle}>Prerequisites</h2>
      <div className={styles.prerequisites}>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Node.js</h3>
          <p className={styles.prereqText}>Version 16.0 or higher</p>
        </div>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Git</h3>
          <p className={styles.prereqText}>For version control</p>
        </div>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Code Editor</h3>
          <p className={styles.prereqText}>VS Code recommended</p>
        </div>
        <div className={styles.prerequisite}>
          <h3 className={styles.prereqTitle}>Terminal</h3>
          <p className={styles.prereqText}>Command line interface</p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/install/Steps.tsx
// ============================================================
export function InstallationSteps(): React.ReactElement {
  return (
    <section className={styles.stepsSection}>
      <h2 className={styles.sectionTitle}>Installation Steps</h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <div className={styles.stepNumber}>1</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Clone Repository</h3>
            <p className={styles.stepText}>git clone https://github.com/100xsystems/platform.git</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>2</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Install Dependencies</h3>
            <p className={styles.stepText}>npm install</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>3</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Start Development Server</h3>
            <p className={styles.stepText}>npm run dev</p>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.stepNumber}>4</div>
          <div className={styles.stepContent}>
            <h3 className={styles.stepTitle}>Open Browser</h3>
            <p className={styles.stepText}>Navigate to http://localhost:3000</p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/install/Troubleshooting.tsx
// ============================================================
export function Troubleshooting(): React.ReactElement {
  return (
    <section className={styles.troubleshootingSection}>
      <h2 className={styles.sectionTitle}>Troubleshooting</h2>
      <div className={styles.issues}>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Port Already in Use</h3>
          <p className={styles.issueText}>Change port: npm run dev -- -p 3001</p>
        </div>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Permission Denied</h3>
          <p className={styles.issueText}>Run with sudo or check file permissions</p>
        </div>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Module Not Found</h3>
          <p className={styles.issueText}>Clear cache: rm -rf node_modules && npm install</p>
        </div>
        <div className={styles.issue}>
          <h3 className={styles.issueTitle}>Build Fails</h3>
          <p className={styles.issueText}>Check Node.js version and update dependencies</p>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/paths/CTA.tsx
// ============================================================
export function CTA() {
  return (
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
  );
}


// ============================================================
// sections/paths/Hero.tsx
// ============================================================
export function PathsHero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground}>
        <div 
          className={styles.heroBackgroundVideo}
        />
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
  );
}


// ============================================================
// sections/paths/Journey.tsx
// ============================================================
export function Journey() {
  return (
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
              <img     className={styles.journeyVideo} src="/videos/abstract-light-color-animation-shapes-laptop-google-deepmind.gif" alt="" />
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}


// ============================================================
// sections/paths/LearningApproach.tsx
// ============================================================
export function LearningApproach() {
  return (
    <AnimatedSection animationType="fadeInRight" delay={0.3}>
      <section className={styles.approachSection} data-speed="0.9">
        <div className={styles.approachContent}>
          <div className={styles.approachHeader} data-speed="0.95">
            <AnimatedTitle variant="section" className={styles.sectionTitle}>
              Learning Approach
            </AnimatedTitle>
          </div>
          
          <div className={styles.approachGrid}>
            <div className={styles.approachBlock} data-speed="0.98">
              <div className={styles.approachIcon}>
                <Image
                  src="/assets/illustrations/undraw_continuous-learning_a1ld.svg"
                  alt="Article-Based Learning"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.approachTitle}>Article-Based Excellence</h3>
              <div className={styles.approachDescription}>
                <p>Unlike video-based platforms where content becomes stale and outdated within months, our article-based approach ensures knowledge remains evergreen and continuously relevant.</p>
                <p>Articles can be <strong>skimmed efficiently</strong>, <strong>updated instantly</strong>, and <strong>open-sourced</strong> for community contributions. No more sitting through 50-hour video courses that nobody actually completes.</p>
                <p>Best for busy software engineers who need to <strong>upskill quickly</strong> without the cognitive load of video consumption.</p>
              </div>
            </div>

            <div className={styles.approachBlock} data-speed="0.99">
              <div className={styles.approachIcon}>
                <Image
                  src="/assets/illustrations/undraw_listening-to-podcasts_j0hm.svg"
                  alt="Podcast Learning"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className={styles.approachTitle}>Podcast-Style Learning</h3>
              <div className={styles.approachDescription}>
                <p>What makes us truly revolutionary is our <strong>podcast-style learning</strong> layered on top of articles. Complex topics broken into <strong>5-10 minute audio segments</strong> you can consume while commuting, working, or relaxing.</p>
                <p>Coming soon: <strong>Multi-language support</strong> with voice narration in English, Hindi, Bengali, Marathi, and even your native language. Learning in your mother tongue - because understanding concepts in your native language accelerates comprehension.</p>
                <p>Production-quality audio with noise reduction for the best learning experience anywhere, anytime.</p>
              </div>
            </div>

            <div className={styles.approachBlock} data-speed="1.0">
              <div className={styles.approachIcon}>
                <Image
                  src="/assets/illustrations/undraw_sharing-knowledge_2jx3.svg"
                  alt="Flexible Learning"
                  width={48}
                  height={48}
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
  );
}


// ============================================================
// sections/paths/Outcomes.tsx
// ============================================================
export function Outcomes() {
  return (
    <AnimatedSection animationType="fadeInUp" delay={0.2}>
      <section className={styles.outcomesSection}>
        <AnimatedTitle variant="section" className={styles.sectionTitle} data-speed="0.95">
          Engineering Outcomes
        </AnimatedTitle>
        
        <div className={styles.outcomesGrid}>
          <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard} data-speed="0.98">
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

          <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard} data-speed="0.99">
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

          <AnimatedCard hoverEffect="tilt" className={styles.outcomeCard} data-speed="1.0">
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
  );
}


// ============================================================

const techIcons = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nodejs: SiNodedotjs,
  python: SiPython,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  aws: FaAws,
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
  onClick?: () => void;
}

const PathCard: React.FC<PathCardProps> = ({ 
  number, 
  title, 
  duration, 
  description, 
  features, 
  technologies,
  delay = 0,
  onClick 
}) => {
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
    <AnimatedCard hoverEffect="lift" className={styles.pathCard} data-delay={delay} onClick={onClick}>
      <div className={styles.pathCardBackground} data-speed="0.96">
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
        variant="primary" 
        href="/contact"
        className={styles.pathButton}
        scrambleText={{
          hover: "START YOUR JOURNEY",
          speed: 2,
          chars: "upperCase",
          revealDelay: 0.1
        }}
      >
        Start Your Journey
      </InteractiveButton>
      </div>
    </AnimatedCard>
  );
};

export function PathCards() {
  const [selectedPath, setSelectedPath] = useState<{
    number: string;
    title: string;
    duration: string;
    description: string;
    features: string[];
    technologies: string[];
  } | null>(null);

  const handleCardClick = (pathData: typeof selectedPath) => {
    setSelectedPath(pathData);
  };

  const handleClosePopup = () => {
    setSelectedPath(null);
  };

  return (
    <>
      <AnimatedSection animationType="fadeInUp" stagger={0.2}>
        <section className={styles.pathsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle} data-speed="0.94">Choose Your Learning Path</h2>
            <p className={styles.sectionSubtitle} data-speed="0.94">
              Three carefully crafted paths to take you from beginner to engineering mastery. 
              Each path builds upon the previous one, creating a complete learning journey.
            </p>
          </div>
          
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
          onClick={() => handleCardClick({
            number: "01",
            title: "Foundation",
            duration: "3-6 Months",
            description: "Master one programming language deeply and understand the complete software lifecycle. Build the engineering mindset that separates developers from systems engineers.",
            features: [
              "Deep Language Mastery (JavaScript/TypeScript)",
              "System Design Fundamentals",
              "Data Structures & Algorithms in Practice",
              "Full-Stack Development (Frontend + Backend)",
              "Version Control & Collaborative Development",
              "Testing & Quality Assurance",
              "Basic DevOps & Deployment"
            ],
            technologies: [
              'javascript', 'typescript', 'react', 'nodejs',
              'python', 'git', 'linux', 'mongodb', 'postgresql',
              'redis', 'nginx', 'express', 'django', 'flask', 'fastapi'
            ]
          })}
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
          onClick={() => handleCardClick({
            number: "02",
            title: "Advanced Systems",
            duration: "6-12 Months",
            description: "Design and build scalable, production-ready systems. Learn advanced patterns, security engineering, and cloud infrastructure that powers modern applications.",
            features: [
              "Advanced System Architecture",
              "Microservices & Distributed Systems",
              "Cloud Native Development",
              "Security Engineering & Best Practices",
              "Performance Optimization",
              "Advanced DevOps & CI/CD",
              "Database Design & Optimization"
            ],
            technologies: [
              'docker', 'kubernetes', 'aws', 'gcp', 'terraform',
              'prometheus', 'grafana', 'jenkins', 'kafka', 'elasticsearch',
              'webpack', 'vite', 'jest', 'cypress', 'graphql'
            ]
          })}
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
          onClick={() => handleCardClick({
            number: "03",
            title: "Engineering Mastery",
            duration: "12+ Months",
            description: "Lead complex system design, mentor engineering teams, and make architectural decisions that impact millions. Become the engineer who can build anything.",
            features: [
              "Enterprise Architecture Design",
              "Team Leadership & Technical Mentoring",
              "Technology Strategy & Decision Making",
              "System Scalability & Reliability",
              "Product Thinking & Business Acumen",
              "Innovation & Research",
              "Career Development & Networking"
            ],
            technologies: [
              'figma', 'jira', 'notion', 'slack', 'eraser'
            ]
          })}
        />
        </section>
        </section>
      </AnimatedSection>
      
      <PathDetailsPopup 
        isOpen={selectedPath !== null}
        onClose={handleClosePopup}
        path={selectedPath}
      />
    </>
  );
}


// ============================================================
// sections/paths/PathDetailsPopup.tsx
// ============================================================
interface PathDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  path: {
    number: string;
    title: string;
    duration: string;
    description: string;
    features: string[];
    technologies: string[];
  } | null;
}

export function PathDetailsPopup({ isOpen, onClose, path }: PathDetailsPopupProps) {
  if (!isOpen || !path) return null;

  const getBackgroundClass = () => {
    switch(path.title) {
      case 'Foundation':
        return 'foundation';
      case 'Advanced Systems':
        return 'advanced';
      case 'Engineering Mastery':
        return 'mastery';
      default:
        return 'foundation';
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={`${styles.popupContent} ${styles[getBackgroundClass()]}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className={styles.popupInnerContent}>
          <div className={styles.popupHeader}>
            <div className={styles.popupNumber}>{path.number}</div>
            <h2 className={styles.popupTitle}>{path.title}</h2>
            <div className={styles.popupDuration}>{path.duration}</div>
          </div>
          
          <div className={styles.popupDescription}>
            <p>{path.description}</p>
          </div>
          
          <div className={styles.popupSection}>
            <h3 className={styles.sectionTitle}>What You'll Learn</h3>
            <div className={styles.featuresList}>
              {path.features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.popupSection}>
            <h3 className={styles.sectionTitle}>Technologies You'll Master</h3>
            <div className={styles.techGrid}>
              {path.technologies.map((tech, index) => (
                <div key={index} className={styles.techItem}>
                  {tech}
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.popupActions}>
            <button className={styles.primaryButton}>
              Start Your Journey
            </button>
            <button className={styles.secondaryButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// sections/paths/VideoShowcase.tsx
// ============================================================
export function PathsVideoShowcase() {
  return (
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
            <img 
               
               
               
               
              className={styles.shiningMirrorVideo}
             src="/videos/shinning-mirror-advanced-abstract-google-deepmind.gif" alt="" />
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}


// ============================================================
// sections/privacy/ContactInfo.tsx
// ============================================================
export function PrivacyContactInfo(): React.ReactElement {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact Us About Privacy</h2>
      <div className={styles.content}>
        <p className={styles.description}>
          If you have any questions about this Privacy Policy or how we handle your personal information, please contact us.
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Email</h3>
            <p className={styles.contactDetail}>admin@100xsystems.dev</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Website</h3>
            <p className={styles.contactDetail}>www.100xsystems.dev</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Response Time</h3>
            <p className={styles.contactDetail}>We typically respond within 24-48 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/privacy/Hero.tsx
// ============================================================
export function PrivacyHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.subtitle}>
          Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/privacy/PrivacyContent.tsx
// ============================================================
export function PrivacyContent(): React.ReactElement {
  return (
    <section className={styles.privacySection}>
      <h2 className={styles.sectionTitle}>Our Privacy Policy</h2>
      <div className={styles.content}>
        <p className={styles.description}>
          At 100xSystems, we are committed to protecting your privacy and ensuring the security of your personal information.
        </p>
        <div className={styles.sections}>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Information We Collect</h3>
            <p className={styles.text}>
              We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>How We Use Your Information</h3>
            <p className={styles.text}>
              We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Information Sharing</h3>
            <p className={styles.text}>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionHeading}>Data Security</h3>
            <p className={styles.text}>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/success/CallToAction.tsx
// ============================================================
export function CallToAction(): React.ReactElement {
  return (
    <section className={styles.ctaSection}>
      <h2 className={styles.sectionTitle}>Start Your Journey</h2>
      <p className={styles.description}>
        Ready to transform your engineering career? Join the 100xSystems community today.
      </p>
      <div className={styles.buttons}>
        <Link href="/contact" className={styles.primaryButton}>Get Started</Link>
        <Link href="/about" className={styles.secondaryButton}>Learn More</Link>
      </div>
    </section>
  );
}


// ============================================================
// sections/success/Hero.tsx
// ============================================================
export function SuccessStoriesHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Success Stories</h1>
        <p className={styles.subtitle}>
          Real transformations from developers to 100xEngineers. See how our approach has changed careers and built exceptional systems.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/success/Stories.tsx
// ============================================================
export function SuccessStories(): React.ReactElement {
  return (
    <section className={styles.storiesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Success Stories</h2>
        <p className={styles.sectionDescription}>
          Coming Soon! We're excited to share the success stories of our future 100xEngineers. 
          As our community grows, we'll feature real transformations and achievements from developers 
          who have completed our program.
        </p>
      </div>
      
      <div className={styles.comingSoonContainer}>
        <div className={styles.comingSoonMessage}>
          <h3>Be the First Success Story</h3>
          <p>
            We're just getting started! Join our program today and you could be one of the first 
            developers to transform into a 100xEngineer. Your journey could inspire thousands of others.
          </p>
          <a href="/contact" className={styles.getStartedButton}>Start Your Journey</a>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/success/Testimonials.tsx
// ============================================================
export function Testimonials(): React.ReactElement {
  return (
    <section className={styles.testimonialsSection}>
      <h2 className={styles.sectionTitle}>What Our Learners Say</h2>
      <p className={styles.description}>
        Coming soon: Testimonials from our community members about their learning experience.
      </p>
    </section>
  );
}


// ============================================================
// sections/team/Hero.tsx
// ============================================================
export function TeamHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Meet Our Team</h1>
        <p className={styles.subtitle}>
          The passionate minds behind 100xSystems, dedicated to transforming developers into 100xEngineers through structured learning and system optimization.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/team/JoinUs.tsx
// ============================================================
export function JoinUs(): React.ReactElement {
  return (
    <section className={styles.joinSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.joinTitle}>Join Our Team</h2>
        <p className={styles.joinSubtitle}>
          Ready to be part of something extraordinary? We're always looking for passionate engineers who want to make a difference.
        </p>
      </div>
      
      <div className={styles.joinGrid}>
        <div className={styles.joinItem}>
          <h3 className={styles.itemTitle}>Build Impactful Systems</h3>
          <p className={styles.itemDescription}>
            Work on projects that matter and help thousands of developers become 100xEngineers.
          </p>
        </div>
        
        <div className={styles.joinItem}>
          <h3 className={styles.itemTitle}>Grow with Excellence</h3>
          <p className={styles.itemDescription}>
            Learn from the best minds in engineering and accelerate your career growth.
          </p>
        </div>
        
        <div className={styles.joinItem}>
          <h3 className={styles.itemTitle}>Shape the Future</h3>
          <p className={styles.itemDescription}>
            Influence the direction of engineering education and system design.
          </p>
        </div>
      </div>
      
      <div className={styles.joinActions}>
        <Link href="/contact" className={styles.primaryButton}>
          Apply Now
        </Link>
        
        <Link href="/contribute" className={styles.secondaryButton}>
          Contribute First
        </Link>
      </div>
    </section>
  );
}


// ============================================================
// sections/team/Mission.tsx
// ============================================================
export function TeamMission(): React.ReactElement {
  return (
    <section className={styles.missionSection}>
      <div className={styles.missionBackground}>
        <div className={styles.backgroundImage}></div>
      </div>
      
      <div className={styles.missionContent}>
        <div className={styles.contentHeader}>
          <h2 className={styles.missionTitle}>Our Mission</h2>
          <p className={styles.missionSubtitle}>
            Transforming developers into 100xEngineers through depth-first learning and systems thinking.
          </p>
        </div>
        
        <div className={styles.missionGrid}>
          <div className={styles.missionItem}>
            <h3 className={styles.itemTitle}>Depth-First Learning</h3>
            <p className={styles.itemDescription}>
              Master one technology deeply before expanding. Build strong foundations that support complex system understanding.
            </p>
          </div>
          
          <div className={styles.missionItem}>
            <h3 className={styles.itemTitle}>Systems Thinking</h3>
            <p className={styles.itemDescription}>
              See complete picture—how components interact, failures cascade, and performance scales across entire system.
            </p>
          </div>
          
          <div className={styles.missionItem}>
            <h3 className={styles.itemTitle}>Engineering Excellence</h3>
            <p className={styles.itemDescription}>
              Go beyond coding to architect solutions. Build systems that are scalable, maintainable, and truly exceptional.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/team/TeamMembers.tsx
// ============================================================
export function TeamMembers(): React.ReactElement {
  return (
    <section className={styles.teamSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Our Team</h2>
        <p className={styles.sectionDescription}>
          Meet the foundation of 100xSystems. We're a small, dedicated team passionate about 
          transforming developers into 100xEngineers.
        </p>
      </div>
      
      <div className={styles.teamGrid}>
        <div className={styles.memberCard}>
          <div className={styles.memberImage}>
            <Image 
              src="/assets/illustrations/undraw_developer-avatar_f6ac.svg" 
              alt="Aryan Batra"
              width={80}
              height={80}
              className={styles.avatarImage}
            />
          </div>
          <h3 className={styles.memberName}>Aryan Batra</h3>
          <p className={styles.memberRole}>Founder & Lead Engineer</p>
          <p className={styles.memberDescription}>
            Visionary behind 100xSystems with expertise in system architecture and engineering education. 
            Passionate about depth-first learning and building exceptional engineers.
          </p>
        </div>
      </div>
      
      <div className={styles.hiringSection}>
        <div className={styles.hiringMessage}>
          <h3>We're Growing!</h3>
          <p>
            We're looking for talented engineers, educators, and community builders to join our mission. 
            If you're passionate about engineering education and want to help shape the future of 
            developer training, we'd love to hear from you.
          </p>
          <div className={styles.openPositions}>
            <h4>Open to Collaboration:</h4>
            <ul>
              <li>Technical Content Creators</li>
              <li>System Architecture Experts</li>
              <li>Community Managers</li>
              <li>Engineering Mentors</li>
            </ul>
          </div>
          <a href="/contact" className={styles.joinButton}>Get in Touch</a>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/team/Values.tsx
// ============================================================
export function TeamValues(): React.ReactElement {
  const values = [
    {
      title: "Excellence",
      description: "We pursue engineering excellence in everything we build, from code quality to system architecture."
    },
    {
      title: "Innovation",
      description: "We challenge conventional thinking and explore new approaches to solve complex problems."
    },
    {
      title: "Collaboration",
      description: "We believe great systems are built together through knowledge sharing and collective wisdom."
    },
    {
      title: "Integrity",
      description: "We maintain transparency and honesty in our teaching, development, and community interactions."
    }
  ];

  return (
    <section className={styles.valuesSection}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Our Values</h2>
        <p className={styles.sectionDescription}>
          The principles that guide our approach to engineering education and system development.
        </p>
      </div>
      
      <div className={styles.valuesGrid}>
        {values.map((value, index) => (
          <div key={index} className={styles.valueCard}>
            <h3 className={styles.valueTitle}>{value.title}</h3>
            <p className={styles.valueDescription}>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


// ============================================================
// sections/terms/ContactInfo.tsx
// ============================================================
export function TermsContactInfo(): React.ReactElement {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.sectionTitle}>Contact Information</h2>
      <div className={styles.content}>
        <p className={styles.description}>
          If you have any questions about these Terms of Service, please contact us.
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Email</h3>
            <p className={styles.contactDetail}>admin@100xsystems.dev</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Website</h3>
            <p className={styles.contactDetail}>www.100xsystems.dev</p>
          </div>
          <div className={styles.contactItem}>
            <h3 className={styles.contactHeading}>Response Time</h3>
            <p className={styles.contactDetail}>We typically respond within 24-48 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ============================================================
// sections/terms/Hero.tsx
// ============================================================
export function TermsHero(): React.ReactElement {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.subtitle}>
          Our terms and conditions govern your use of the 100xSystems platform and services.
        </p>
      </div>
    </section>
  );
}


// ============================================================
// sections/terms/TermsContent.tsx
// ============================================================
export function TermsContent(): React.ReactElement {
  return (
    <section className={styles.termsSection}>
      <h2 className={styles.sectionTitle}>Terms of Service</h2>
      <div className={styles.content}>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>1. Acceptance of Terms</h3>
          <p className={styles.text}>
            By accessing and using 100xSystems, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>2. Use License</h3>
          <p className={styles.text}>
            Permission is granted to temporarily use 100xSystems for personal, non-commercial transitory viewing only.
          </p>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>3. Disclaimer</h3>
          <p className={styles.text}>
            The information on this platform is provided on an as-is basis. To the fullest extent permitted by law, this Company:
          </p>
          <ul className={styles.list}>
            <li>excludes all representations and warranties relating to this website and its contents</li>
            <li>makes no warranty or representation regarding the accuracy or completeness of the information</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionHeading}>4. Limitations of Liability</h3>
          <p className={styles.text}>
            In no event shall 100xSystems or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on 100xSystems.
          </p>
        </div>
      </div>
    </section>
  );
}
