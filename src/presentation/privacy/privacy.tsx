/**
 * ## Presentation: Privacy Policy Page
 *
 * Static privacy policy page displaying data collection,
 * usage, and protection policies for 100xSystems.
 *
 * @packageDocumentation
 */

import styles from '../../presentation/_styles/pages/Privacy.module.css';

export default function Privacy() {
  return (
    <div className={styles.privacyContainer}>
      <h1 className={styles.title}>Privacy Policy</h1>

      <p className={styles.lastUpdated}>
        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
      </p>

      <p className={styles.introParagraph}>
        At 100xSystems, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our open source educational platform and community resources.
      </p>

      <h2 className={styles.sectionTitle}>1. Information We Collect</h2>

      <h3 className={styles.subsectionTitle}>1.1 Personal Information</h3>
      <p className={styles.sectionParagraph}>
        When you interact with our platform, we may collect:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Name and email address for account creation</li>
        <li className={styles.listItem}>Professional information relevant to your learning journey</li>
        <li className={styles.listItem}>Communication preferences</li>
        <li className={styles.listItem}>Payment information for premium services (processed securely by third-party providers)</li>
      </ul>

      <h3 className={styles.subsectionTitle}>1.2 Technical Information</h3>
      <p className={styles.sectionParagraph}>
        We automatically collect certain technical data:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>IP address and browser information</li>
        <li className={styles.listItem}>Device information and operating system</li>
        <li className={styles.listItem}>Pages visited and time spent on our platform</li>
        <li className={styles.listItem}>Learning progress and interaction patterns</li>
        <li className={styles.listItem}>Error logs and performance metrics</li>
      </ul>

      <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
      <p className={styles.sectionParagraph}>
        We use your information to:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Provide and improve our educational services</li>
        <li className={styles.listItem}>Personalize your learning experience</li>
        <li className={styles.listItem}>Track your progress and achievements</li>
        <li className={styles.listItem}>Communicate with you about your account and services</li>
        <li className={styles.listItem}>Analyze platform usage to optimize content delivery</li>
        <li className={styles.listItem}>Ensure platform security and prevent misuse</li>
        <li className={styles.listItem}>Comply with legal obligations</li>
      </ul>

      <h2 className={styles.sectionTitle}>3. Data Sharing and Disclosure</h2>
      <p className={styles.sectionParagraph}>
        We do not sell your personal information. We may share your data only in the following circumstances:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>With service providers who assist in platform operations (payment processors, hosting services)</li>
        <li className={styles.listItem}>When required by law or to protect our rights and safety</li>
        <li className={styles.listItem}>With your explicit consent for specific purposes</li>
        <li className={styles.listItem}>Aggregated, anonymized data for research and analytics</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. Data Security</h2>
      <p className={styles.sectionParagraph}>
        We implement appropriate security measures to protect your information:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Encryption of data in transit and at rest</li>
        <li className={styles.listItem}>Regular security audits and vulnerability assessments</li>
        <li className={styles.listItem}>Access controls and authentication systems</li>
        <li className={styles.listItem}>Secure coding practices and regular updates</li>
        <li className={styles.listItem}>Employee training on data protection</li>
      </ul>

      <h2 className={styles.sectionTitle}>5. Cookies and Tracking Technologies</h2>
      <p className={styles.sectionParagraph}>
        We use cookies and similar technologies to:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Maintain your session and preferences</li>
        <li className={styles.listItem}>Analyze platform usage and performance</li>
        <li className={styles.listItem}>Provide personalized content recommendations</li>
        <li className={styles.listItem}>Remember your login information</li>
      </ul>
      <p className={styles.sectionParagraph}>
        You can control cookies through your browser settings, though this may affect platform functionality.
      </p>

      <h2 className={styles.sectionTitle}>6. Non-Profit Educational Mission</h2>
      <p className={styles.sectionParagraph}>
        100xSystems operates as a non-profit educational community:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>All educational content and resources are provided completely free of charge</li>
        <li className={styles.listItem}>Any donations or payments received are reinvested entirely into platform development and community resources</li>
        <li className={styles.listItem}>We do not engage in commercial activities or profit-making ventures</li>
        <li className={styles.listItem}>Your data is never sold, rented, or used for commercial purposes</li>
        <li className={styles.listItem}>The platform exists solely for educational welfare and community advancement</li>
        <li className={styles.listItem}>Future certification fees (if any) will fund platform improvements, not generate profit</li>
      </ul>

      <h2 className={styles.sectionTitle}>7. Open Source and External Resources</h2>
      <p className={styles.sectionParagraph}>
        As an open source educational platform, we handle both original and external content:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>We create and maintain our own educational articles and technical resources</li>
        <li className={styles.listItem}>We reference external resources including YouTube videos, tutorials, and documentation</li>
        <li className={styles.listItem}>External links may have their own privacy policies and data collection practices</li>
        <li className={styles.listItem}>We are not responsible for privacy practices of external resource providers</li>
        <li className={styles.listItem}>All external content is properly attributed and linked to original creators</li>
      </ul>

      <h2 className={styles.sectionTitle}>8. AI and Machine Learning</h2>
      <p className={styles.sectionParagraph}>
        As part of our AI-optimized educational platform:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Your learning data may be used to improve AI recommendations</li>
        <li className={styles.listItem}>We process anonymized usage patterns to enhance content delivery</li>
        <li className={styles.listItem}>No personal information is shared with external AI systems without consent</li>
        <li className={styles.listItem}>You can opt-out of AI-driven personalization features</li>
      </ul>

      <h2 className={styles.sectionTitle}>9. Your Rights and Choices</h2>
      <p className={styles.sectionParagraph}>
        You have the right to:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Access and review your personal information</li>
        <li className={styles.listItem}>Correct inaccurate or incomplete information</li>
        <li className={styles.listItem}>Delete your account and associated data</li>
        <li className={styles.listItem}>Opt-out of marketing communications</li>
        <li className={styles.listItem}>Request data portability</li>
        <li className={styles.listItem}>Restrict processing of certain information</li>
      </ul>

      <h2 className={styles.sectionTitle}>10. Data Retention</h2>
      <p className={styles.sectionParagraph}>
        We retain your information only as long as necessary to:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Provide our services and maintain your account</li>
        <li className={styles.listItem}>Fulfill legal and regulatory requirements</li>
        <li className={styles.listItem}>Resolve disputes and enforce our agreements</li>
        <li className={styles.listItem}>Maintain security and prevent fraud</li>
      </ul>

      <h2 className={styles.sectionTitle}>11. International Data Transfers</h2>
      <p className={styles.sectionParagraph}>
        Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
      </p>

      <h2 className={styles.sectionTitle}>12. Children&apos;s Privacy</h2>
      <p className={styles.sectionParagraph}>
        Our services are intended for adult professionals. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it promptly.
      </p>

      <h2 className={styles.sectionTitle}>13. Changes to This Privacy Policy</h2>
      <p className={styles.sectionParagraph}>
        We may update this Privacy Policy from time to time. We will notify you of significant changes by email or prominent notice on our platform. Your continued use of our services after such changes constitutes acceptance of the updated policy.
      </p>

      <h2 className={styles.sectionTitle}>14. Contact Information</h2>
      <p className={styles.sectionParagraph}>
        If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
      </p>
      <div className={styles.contactInfo}>
        <p className={styles.sectionParagraph}>
          <strong className={styles.highlightedText}>Email:</strong> <a href="mailto:admin@100xsystems.dev" className={styles.contactEmail}>admin@100xsystems.dev</a><br />
          <strong className={styles.highlightedText}>Website:</strong> <a href="https://www.100xsystems.dev" className={styles.contactEmail}>https://www.100xsystems.dev</a><br />
          <strong className={styles.highlightedText}>LinkedIn:</strong> <a href="https://www.linkedin.com/company/100xsystems/" className={styles.contactEmail}>https://www.linkedin.com/company/100xsystems/</a>
        </p>
      </div>

      <h2 className={styles.sectionTitle}>15. Legal Basis for Processing</h2>
      <p className={styles.sectionParagraph}>
        We process your personal information based on:
      </p>
      <ul className={styles.listContainer}>
        <li className={styles.listItem}>Your consent where explicitly provided</li>
        <li className={styles.listItem}>Contractual necessity for service provision</li>
        <li className={styles.listItem}>Legal obligations and compliance requirements</li>
        <li className={styles.listItem}>Legitimate business interests for platform improvement</li>
      </ul>

      <div className={styles.footerNote}>
        <p>
          This Privacy Policy is designed to be comprehensive and transparent about our data practices. If you have any concerns about how we handle your information, please do not hesitate to contact us. We are committed to protecting your privacy and earning your trust as your educational partner.
        </p>
        <p>
          &copy; 2024 100xSystems. All rights reserved.
        </p>
      </div>
    </div>
  );
}
