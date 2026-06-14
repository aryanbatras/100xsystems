/**
 * ## Terms
 *
 * Terms feature module.
 * Contains all components, types, and logic for the terms domain.
 *
 * @packageDocumentation
 * @module terms
 */

'use client';

import styles from '../_styles/css/terms.module.css';

// ============================================================
// Source: index.ts
// ============================================================
;


// ============================================================
// Source: terms.tsx
// ============================================================
/**
 */
export function Terms() {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.title}>Terms of Service</h1>

      <p className={styles.lastUpdated}>
        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
      </p>

      <p className={styles.introParagraph}>
        Welcome to 100xSystems, a comprehensive platform for structured software engineering education and system optimization. By accessing or using our services, you agree to be bound by these Terms of Service.
      </p>

      <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
      <p className={styles.sectionParagraph}>
        By accessing and using 100xSystems, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
      </p>

      <h2 className={styles.sectionTitle}>2. Description of Service</h2>
      <p className={styles.sectionParagraph}>
        100xSystems is an open source educational platform designed to transform developers into 100xEngineers through structured learning paths and system optimization resources. Our services include:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Open source educational content and articles</li>
        <li className={styles.listItem}>Curated external resources including YouTube videos and tutorials</li>
        <li className={styles.listItem}>System architecture and design patterns</li>
        <li className={styles.listItem}>Technical configuration templates and resources</li>
        <li className={styles.listItem}>AI-optimized technical documentation</li>
        <li className={styles.listItem}>Community-driven learning resources</li>
        <li className={styles.listItem}>Professional development guidance</li>
      </ul>

      <h2 className={styles.sectionTitle}>3. User Responsibilities</h2>
      <p className={styles.sectionParagraph}>
        As a user of 100xSystems, you agree to:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Provide accurate information when required</li>
        <li className={styles.listItem}>Use the service for legitimate educational purposes</li>
        <li className={styles.listItem}>Not reproduce, distribute, or create derivative works of our content without explicit permission</li>
        <li className={styles.listItem}>Not attempt to gain unauthorized access to our systems</li>
        <li className={styles.listItem}>Respect intellectual property rights and licensing agreements</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. Intellectual Property</h2>
      <p className={styles.sectionParagraph}>
        All content, materials, and resources provided by 100xSystems, including but not limited to text, graphics, code examples, configuration templates, and educational materials, are owned by 100xSystems or our content suppliers and are protected by intellectual property laws.
      </p>

      <h2 className={styles.sectionTitle}>5. Service Availability</h2>
      <p className={styles.sectionParagraph}>
        We strive to maintain high availability of our services but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
      </p>

      <h2 className={styles.sectionTitle}>6. Limitation of Liability</h2>
      <p className={styles.sectionParagraph}>
        100xSystems provides educational content and resources on an &quot;as is&quot; basis. We make no warranties regarding the accuracy, completeness, or suitability of our content for any particular purpose. Your use of our services is at your own risk.
      </p>

      <h2 className={styles.sectionTitle}>7. Privacy and Data Protection</h2>
      <p className={styles.sectionParagraph}>
        Your privacy is important to us. Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your personal information.
      </p>

      <h2 className={styles.sectionTitle}>8. Non-Profit and Community Commitment</h2>
      <p className={styles.sectionParagraph}>
        100xSystems is fundamentally a community-driven, non-profit educational initiative:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>All content and resources are provided free of charge for educational purposes</li>
        <li className={styles.listItem}>Any donations, payments, or revenue generated will be reinvested entirely into improving the 100xSystems platform</li>
        <li className={styles.listItem}>We are not associated with any commercial profit-making entity</li>
        <li className={styles.listItem}>The platform exists solely for the welfare and advancement of software engineers</li>
        <li className={styles.listItem}>Both the founder and community members benefit through collaborative learning</li>
        <li className={styles.listItem}>Any future certifications or paid features will fund platform development, not personal profit</li>
      </ul>

      <h2 className={styles.sectionTitle}>9. Professional Use Disclaimer</h2>
      <p className={styles.sectionParagraph}>
        While our content is designed for professional development, 100xSystems does not guarantee employment outcomes or career advancement. Success in software engineering requires individual effort, practice, and application of learned concepts.
      </p>

      <h2 className={styles.sectionTitle}>10. AI Agent Usage</h2>
      <p className={styles.sectionParagraph}>
        Our platform provides machine-readable content optimized for AI agents. Users may integrate our structured data with AI systems, provided such use complies with these terms and applicable laws.
      </p>

      <h2 className={styles.sectionTitle}>11. Open Source and External Resources</h2>
      <p className={styles.sectionParagraph}>
        As an open source educational community, we provide both original and curated external resources:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>We create and maintain our own educational articles and resources</li>
        <li className={styles.listItem}>We reference and link to external resources including YouTube videos, tutorials, and documentation</li>
        <li className={styles.listItem}>External resources are carefully curated to supplement our educational content</li>
        <li className={styles.listItem}>All external content is properly attributed and linked to original creators</li>
        <li className={styles.listItem}>Users are encouraged to contribute to our open source repository</li>
      </ul>

      <h2 className={styles.sectionTitle}>12. Modifications to Terms</h2>
      <p className={styles.sectionParagraph}>
        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of any modifications.
      </p>

      <h2 className={styles.sectionTitle}>13. Contact Information</h2>
      <p className={styles.sectionParagraph}>
        For questions regarding these Terms of Service, please contact us at:
      </p>
      <div className={styles.contactInfo}>
        <p className={styles.sectionParagraph}>
          <strong className={styles.highlightedText}>Email:</strong> <a href="mailto:admin@100xsystems.dev" className={styles.contactEmail}>admin@100xsystems.dev</a><br />
          <strong className={styles.highlightedText}>Website:</strong> <a href="https://www.100xsystems.dev" className={styles.contactEmail}>https://www.100xsystems.dev</a><br />
          <strong className={styles.highlightedText}>LinkedIn:</strong> <a href="https://www.linkedin.com/company/100xsystems/" className={styles.contactEmail}>https://www.linkedin.com/company/100xsystems/</a>
        </p>
      </div>

      <h2 className={styles.sectionTitle}>14. Governing Law</h2>
      <p className={styles.sectionParagraph}>
        These terms shall be governed by and construed in accordance with the laws applicable in the jurisdiction where 100xSystems operates, without regard to conflict of law provisions.
      </p>

      <div className={styles.footerNote}>
        <p>
          This document constitutes a legally binding agreement between you and 100xSystems. By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
        </p>
        <p>
          &copy; 2026 100xSystems. All rights reserved.
        </p>
      </div>
    </div>
  );
}
