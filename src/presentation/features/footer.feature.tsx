'use client';

import footerStyles from '../_styles/css/footer-footer.module.css';
import footerLinksStyles from '../_styles/css/footer-footerlinks.module.css';
import Link from 'next/link';
import React from 'react';
/**
 * ## Footer
 *
 * Footer feature module.
 * Contains all components, types, and logic for the footer domain.
 *
 * @packageDocumentation
 * @module footer
 */

;



// ============================================================
// Source: Footer.tsx
// ============================================================
export function Footer(): React.ReactElement {
  return (
    <>
      {/* <FooterLinks /> */}
      <div className={footerStyles.container}>
        <img src="/100xsystemsfooter.webp" className={footerStyles.logo} alt="100xSystems" />
      </div>
    </>
  );
}


// ============================================================
// Source: FooterLinks.tsx
// ============================================================
export function FooterLinks(): React.ReactElement {
  return (
    <div className={footerLinksStyles.footerLinks}>
      <div className={footerStyles.container}>
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>Platform</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/coming-soon/team" className={footerLinksStyles.link}>Team</Link></li>
            <li><Link href="/coming-soon/blog" className={footerLinksStyles.link}>Blog</Link></li>
            <li><Link href="/coming-soon/success" className={footerLinksStyles.link}>Success Stories</Link></li>
            <li><Link href="/coming-soon/faq" className={footerLinksStyles.link}>FAQ</Link></li>
          </ul>
        </div>
        
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>System Architecture</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/coming-soon/microservices" className={footerLinksStyles.link}>Microservices</Link></li>
            <li><Link href="/coming-soon/distributed-systems" className={footerLinksStyles.link}>Distributed Systems</Link></li>
            <li><Link href="/coming-soon/scalability" className={footerLinksStyles.link}>Scalability Patterns</Link></li>
            <li><Link href="/coming-soon/load-balancing" className={footerLinksStyles.link}>Load Balancing</Link></li>
            <li><Link href="/coming-soon/caching-strategies" className={footerLinksStyles.link}>Caching Strategies</Link></li>
          </ul>
        </div>
        
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>Design Patterns</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/coming-soon/creational-patterns" className={footerLinksStyles.link}>Creational Patterns</Link></li>
            <li><Link href="/coming-soon/structural-patterns" className={footerLinksStyles.link}>Structural Patterns</Link></li>
            <li><Link href="/coming-soon/behavioral-patterns" className={footerLinksStyles.link}>Behavioral Patterns</Link></li>
            <li><Link href="/coming-soon/architectural-patterns" className={footerLinksStyles.link}>Architectural Patterns</Link></li>
            <li><Link href="/coming-soon/concurrency-patterns" className={footerLinksStyles.link}>Concurrency Patterns</Link></li>
          </ul>
        </div>
        
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>Development</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/coming-soon/api-design" className={footerLinksStyles.link}>API Design</Link></li>
            <li><Link href="/coming-soon/database-design" className={footerLinksStyles.link}>Database Design</Link></li>
            <li><Link href="/coming-soon/security-patterns" className={footerLinksStyles.link}>Security Patterns</Link></li>
            <li><Link href="/coming-soon/performance-optimization" className={footerLinksStyles.link}>Performance Optimization</Link></li>
            <li><Link href="/coming-soon/testing-strategies" className={footerLinksStyles.link}>Testing Strategies</Link></li>
          </ul>
        </div>
        
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>DevOps & Tools</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/coming-soon/ci-cd" className={footerLinksStyles.link}>CI/CD Pipelines</Link></li>
            <li><Link href="/coming-soon/containerization" className={footerLinksStyles.link}>Containerization</Link></li>
            <li><Link href="/coming-soon/orchestration" className={footerLinksStyles.link}>Orchestration</Link></li>
            <li><Link href="/coming-soon/monitoring" className={footerLinksStyles.link}>Monitoring & Observability</Link></li>
            <li><Link href="/coming-soon/infrastructure-as-code" className={footerLinksStyles.link}>Infrastructure as Code</Link></li>
          </ul>
        </div>
        
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>Resources</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/coming-soon/tutorials" className={footerLinksStyles.link}>Technical Tutorials</Link></li>
            <li><Link href="/coming-soon/case-studies" className={footerLinksStyles.link}>Case Studies</Link></li>
            <li><Link href="/coming-soon/best-practices" className={footerLinksStyles.link}>Best Practices</Link></li>
            <li><Link href="/coming-soon/code-samples" className={footerLinksStyles.link}>Code Samples</Link></li>
            <li><Link href="/coming-soon/documentation" className={footerLinksStyles.link}>Documentation</Link></li>
          </ul>
        </div>
        
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>Community</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/coming-soon/contribute" className={footerLinksStyles.link}>Contribute</Link></li>
            <li><Link href="/coming-soon/donate" className={footerLinksStyles.link}>Donate</Link></li>
            <li><Link href="/coming-soon/community" className={footerLinksStyles.link}>Community Guidelines</Link></li>
            <li><Link href="/coming-soon/install" className={footerLinksStyles.link}>Installation Guide</Link></li>
          </ul>
        </div>
        
        <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>Connect</h3>
          <ul className={footerLinksStyles.links}>
            <li><a href="https://github.com/100xsystems" target="_blank" rel="noopener noreferrer" className={footerLinksStyles.link}>GitHub</a></li>
            <li><a href="https://www.linkedin.com/company/100xsystems/" target="_blank" rel="noopener noreferrer" className={footerLinksStyles.link}>LinkedIn</a></li>
            <li><a href="mailto:engineering@100xsystems.dev" className={footerLinksStyles.link}>Engineering</a></li>
            <li><a href="/coming-soon/status" className={footerLinksStyles.link}>System Status</a></li>
          </ul>
        </div>

       <div className={footerLinksStyles.section}>
          <h3 className={footerLinksStyles.title}>Legal</h3>
          <ul className={footerLinksStyles.links}>
            <li><Link href="/terms" className={footerLinksStyles.link}>Terms of Service</Link></li>
            <li><Link href="/privacy" className={footerLinksStyles.link}>Privacy Policy</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
