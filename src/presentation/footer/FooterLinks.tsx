import React from 'react';
import Link from 'next/link';
import styles from '../_styles/components/footer/FooterLinks.module.css';;

export function FooterLinks(): React.ReactElement {
  return (
    <div className={styles.footerLinks}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.title}>Platform</h3>
          <ul className={styles.links}>
            <li><Link href="/coming-soon/team" className={styles.link}>Team</Link></li>
            <li><Link href="/coming-soon/blog" className={styles.link}>Blog</Link></li>
            <li><Link href="/coming-soon/success" className={styles.link}>Success Stories</Link></li>
            <li><Link href="/coming-soon/faq" className={styles.link}>FAQ</Link></li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>System Architecture</h3>
          <ul className={styles.links}>
            <li><Link href="/coming-soon/microservices" className={styles.link}>Microservices</Link></li>
            <li><Link href="/coming-soon/distributed-systems" className={styles.link}>Distributed Systems</Link></li>
            <li><Link href="/coming-soon/scalability" className={styles.link}>Scalability Patterns</Link></li>
            <li><Link href="/coming-soon/load-balancing" className={styles.link}>Load Balancing</Link></li>
            <li><Link href="/coming-soon/caching-strategies" className={styles.link}>Caching Strategies</Link></li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Design Patterns</h3>
          <ul className={styles.links}>
            <li><Link href="/coming-soon/creational-patterns" className={styles.link}>Creational Patterns</Link></li>
            <li><Link href="/coming-soon/structural-patterns" className={styles.link}>Structural Patterns</Link></li>
            <li><Link href="/coming-soon/behavioral-patterns" className={styles.link}>Behavioral Patterns</Link></li>
            <li><Link href="/coming-soon/architectural-patterns" className={styles.link}>Architectural Patterns</Link></li>
            <li><Link href="/coming-soon/concurrency-patterns" className={styles.link}>Concurrency Patterns</Link></li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Development</h3>
          <ul className={styles.links}>
            <li><Link href="/coming-soon/api-design" className={styles.link}>API Design</Link></li>
            <li><Link href="/coming-soon/database-design" className={styles.link}>Database Design</Link></li>
            <li><Link href="/coming-soon/security-patterns" className={styles.link}>Security Patterns</Link></li>
            <li><Link href="/coming-soon/performance-optimization" className={styles.link}>Performance Optimization</Link></li>
            <li><Link href="/coming-soon/testing-strategies" className={styles.link}>Testing Strategies</Link></li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>DevOps & Tools</h3>
          <ul className={styles.links}>
            <li><Link href="/coming-soon/ci-cd" className={styles.link}>CI/CD Pipelines</Link></li>
            <li><Link href="/coming-soon/containerization" className={styles.link}>Containerization</Link></li>
            <li><Link href="/coming-soon/orchestration" className={styles.link}>Orchestration</Link></li>
            <li><Link href="/coming-soon/monitoring" className={styles.link}>Monitoring & Observability</Link></li>
            <li><Link href="/coming-soon/infrastructure-as-code" className={styles.link}>Infrastructure as Code</Link></li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Resources</h3>
          <ul className={styles.links}>
            <li><Link href="/coming-soon/tutorials" className={styles.link}>Technical Tutorials</Link></li>
            <li><Link href="/coming-soon/case-studies" className={styles.link}>Case Studies</Link></li>
            <li><Link href="/coming-soon/best-practices" className={styles.link}>Best Practices</Link></li>
            <li><Link href="/coming-soon/code-samples" className={styles.link}>Code Samples</Link></li>
            <li><Link href="/coming-soon/documentation" className={styles.link}>Documentation</Link></li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Community</h3>
          <ul className={styles.links}>
            <li><Link href="/coming-soon/contribute" className={styles.link}>Contribute</Link></li>
            <li><Link href="/coming-soon/donate" className={styles.link}>Donate</Link></li>
            <li><Link href="/coming-soon/community" className={styles.link}>Community Guidelines</Link></li>
            <li><Link href="/coming-soon/install" className={styles.link}>Installation Guide</Link></li>
          </ul>
        </div>
        
        <div className={styles.section}>
          <h3 className={styles.title}>Connect</h3>
          <ul className={styles.links}>
            <li><a href="https://github.com/100xsystems" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a></li>
            <li><a href="https://www.linkedin.com/company/100xsystems/" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a></li>
            <li><a href="mailto:engineering@100xsystems.dev" className={styles.link}>Engineering</a></li>
            <li><a href="/coming-soon/status" className={styles.link}>System Status</a></li>
          </ul>
        </div>

       <div className={styles.section}>
          <h3 className={styles.title}>Legal</h3>
          <ul className={styles.links}>
            <li><Link href="/terms" className={styles.link}>Terms of Service</Link></li>
            <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
