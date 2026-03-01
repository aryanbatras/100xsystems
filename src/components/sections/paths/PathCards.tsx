import { useState } from 'react';
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
import AnimatedSection from '../../animated/AnimatedSection';
import AnimatedCard from '../../animated/AnimatedCard';
import InteractiveButton from '../../animated/InteractiveButton';
import Image from 'next/image';
import PathDetailsPopup from './PathDetailsPopup';
import styles from './PathCards.module.css';

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

export default function PathCards() {
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
      <AnimatedSection animationType="scaleIn" stagger={0.2}>
        <section className={styles.pathsSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Choose Your Learning Path</h2>
            <p className={styles.sectionSubtitle}>
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
