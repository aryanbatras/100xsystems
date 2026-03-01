import React from 'react';

export default function Privacy() {
  return (
    <div style={{ 
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      fontFamily: 'Georgia, "Times New Roman", serif',
      lineHeight: '1.7',
      maxWidth: '900px',
      margin: '3rem auto',
      padding: '60px 40px',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <h1 style={{ 
        fontSize: '36px', 
        fontWeight: '700', 
        marginBottom: '40px',
        textAlign: 'center',
        color: '#000000',
        letterSpacing: '-0.5px'
      }}>
        Privacy Policy
      </h1>
      
      <p style={{ 
        marginBottom: '30px', 
        fontSize: '16px',
        color: '#666666',
        fontStyle: 'italic'
      }}>
        <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
      </p>
      
      <p style={{ 
        marginBottom: '30px', 
        fontSize: '18px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        At 100xSystems, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our open source educational platform and community resources.
      </p>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        1. Information We Collect
      </h2>
      
      <h3 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        marginTop: '30px', 
        marginBottom: '15px',
        color: '#000000'
      }}>
        1.1 Personal Information
      </h3>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        When you interact with our platform, we may collect:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Name and email address for account creation</li>
        <li style={{ marginBottom: '12px' }}>Professional information relevant to your learning journey</li>
        <li style={{ marginBottom: '12px' }}>Communication preferences</li>
        <li style={{ marginBottom: '12px' }}>Payment information for premium services (processed securely by third-party providers)</li>
      </ul>

      <h3 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        marginTop: '30px', 
        marginBottom: '15px',
        color: '#000000'
      }}>
        1.2 Technical Information
      </h3>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We automatically collect certain technical data:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>IP address and browser information</li>
        <li style={{ marginBottom: '12px' }}>Device information and operating system</li>
        <li style={{ marginBottom: '12px' }}>Pages visited and time spent on our platform</li>
        <li style={{ marginBottom: '12px' }}>Learning progress and interaction patterns</li>
        <li style={{ marginBottom: '12px' }}>Error logs and performance metrics</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        2. How We Use Your Information
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We use your information to:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Provide and improve our educational services</li>
        <li style={{ marginBottom: '12px' }}>Personalize your learning experience</li>
        <li style={{ marginBottom: '12px' }}>Track your progress and achievements</li>
        <li style={{ marginBottom: '12px' }}>Communicate with you about your account and services</li>
        <li style={{ marginBottom: '12px' }}>Analyze platform usage to optimize content delivery</li>
        <li style={{ marginBottom: '12px' }}>Ensure platform security and prevent misuse</li>
        <li style={{ marginBottom: '12px' }}>Comply with legal obligations</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        3. Data Sharing and Disclosure
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We do not sell your personal information. We may share your data only in the following circumstances:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>With service providers who assist in platform operations (payment processors, hosting services)</li>
        <li style={{ marginBottom: '12px' }}>When required by law or to protect our rights and safety</li>
        <li style={{ marginBottom: '12px' }}>With your explicit consent for specific purposes</li>
        <li style={{ marginBottom: '12px' }}>Aggregated, anonymized data for research and analytics</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        4. Data Security
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We implement appropriate security measures to protect your information:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Encryption of data in transit and at rest</li>
        <li style={{ marginBottom: '12px' }}>Regular security audits and vulnerability assessments</li>
        <li style={{ marginBottom: '12px' }}>Access controls and authentication systems</li>
        <li style={{ marginBottom: '12px' }}>Secure coding practices and regular updates</li>
        <li style={{ marginBottom: '12px' }}>Employee training on data protection</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        5. Cookies and Tracking Technologies
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We use cookies and similar technologies to:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Maintain your session and preferences</li>
        <li style={{ marginBottom: '12px' }}>Analyze platform usage and performance</li>
        <li style={{ marginBottom: '12px' }}>Provide personalized content recommendations</li>
        <li style={{ marginBottom: '12px' }}>Remember your login information</li>
      </ul>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        You can control cookies through your browser settings, though this may affect platform functionality.
      </p>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        6. Non-Profit Educational Mission
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        100xSystems operates as a non-profit educational community:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>All educational content and resources are provided completely free of charge</li>
        <li style={{ marginBottom: '12px' }}>Any donations or payments received are reinvested entirely into platform development and community resources</li>
        <li style={{ marginBottom: '12px' }}>We do not engage in commercial activities or profit-making ventures</li>
        <li style={{ marginBottom: '12px' }}>Your data is never sold, rented, or used for commercial purposes</li>
        <li style={{ marginBottom: '12px' }}>The platform exists solely for educational welfare and community advancement</li>
        <li style={{ marginBottom: '12px' }}>Future certification fees (if any) will fund platform improvements, not generate profit</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        7. Open Source and External Resources
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        As an open source educational platform, we handle both original and external content:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>We create and maintain our own educational articles and technical resources</li>
        <li style={{ marginBottom: '12px' }}>We reference external resources including YouTube videos, tutorials, and documentation</li>
        <li style={{ marginBottom: '12px' }}>External links may have their own privacy policies and data collection practices</li>
        <li style={{ marginBottom: '12px' }}>We are not responsible for privacy practices of external resource providers</li>
        <li style={{ marginBottom: '12px' }}>All external content is properly attributed and linked to original creators</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        8. AI and Machine Learning
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        As part of our AI-optimized educational platform:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Your learning data may be used to improve AI recommendations</li>
        <li style={{ marginBottom: '12px' }}>We process anonymized usage patterns to enhance content delivery</li>
        <li style={{ marginBottom: '12px' }}>No personal information is shared with external AI systems without consent</li>
        <li style={{ marginBottom: '12px' }}>You can opt-out of AI-driven personalization features</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        9. Your Rights and Choices
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        You have the right to:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Access and review your personal information</li>
        <li style={{ marginBottom: '12px' }}>Correct inaccurate or incomplete information</li>
        <li style={{ marginBottom: '12px' }}>Delete your account and associated data</li>
        <li style={{ marginBottom: '12px' }}>Opt-out of marketing communications</li>
        <li style={{ marginBottom: '12px' }}>Request data portability</li>
        <li style={{ marginBottom: '12px' }}>Restrict processing of certain information</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        10. Data Retention
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We retain your information only as long as necessary to:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Provide our services and maintain your account</li>
        <li style={{ marginBottom: '12px' }}>Fulfill legal and regulatory requirements</li>
        <li style={{ marginBottom: '12px' }}>Resolve disputes and enforce our agreements</li>
        <li style={{ marginBottom: '12px' }}>Maintain security and prevent fraud</li>
      </ul>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        11. International Data Transfers
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
      </p>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        12. Children's Privacy
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        Our services are intended for adult professionals. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it promptly.
      </p>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        13. Changes to This Privacy Policy
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We may update this Privacy Policy from time to time. We will notify you of significant changes by email or prominent notice on our platform. Your continued use of our services after such changes constitutes acceptance of the updated policy.
      </p>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        14. Contact Information
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
      </p>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <strong>Email:</strong> admin@100xsystems.dev<br />
        <strong>Website:</strong> https://www.100xsystems.dev<br />
        <strong>LinkedIn:</strong> https://www.linkedin.com/company/100xsystems/
      </p>

      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '50px', 
        marginBottom: '20px',
        color: '#000000',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '10px'
      }}>
        15. Legal Basis for Processing
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We process your personal information based on:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Your consent where explicitly provided</li>
        <li style={{ marginBottom: '12px' }}>Contractual necessity for service provision</li>
        <li style={{ marginBottom: '12px' }}>Legal obligations and compliance requirements</li>
        <li style={{ marginBottom: '12px' }}>Legitimate business interests for platform improvement</li>
      </ul>

      <div style={{ 
        marginTop: '60px', 
        paddingTop: '30px', 
        borderTop: '3px solid #000000',
        fontSize: '14px',
        color: '#666666',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        <p style={{ marginBottom: '15px' }}>
          This Privacy Policy is designed to be comprehensive and transparent about our data practices. If you have any concerns about how we handle your information, please do not hesitate to contact us. We are committed to protecting your privacy and earning your trust as your educational partner.
        </p>
        <p>
          © 2024 100xSystems. All rights reserved.
        </p>
      </div>
    </div>
  );
}
