import React from 'react';

export default function Terms() {
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
        Terms of Service
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
        Welcome to 100xSystems, a comprehensive platform for structured software engineering education and system optimization. By accessing or using our services, you agree to be bound by these Terms of Service.
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
        1. Acceptance of Terms
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        By accessing and using 100xSystems, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
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
        2. Description of Service
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        100xSystems is an open source educational platform designed to transform developers into 100xEngineers through structured learning paths and system optimization resources. Our services include:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Open source educational content and articles</li>
        <li style={{ marginBottom: '12px' }}>Curated external resources including YouTube videos and tutorials</li>
        <li style={{ marginBottom: '12px' }}>System architecture and design patterns</li>
        <li style={{ marginBottom: '12px' }}>Technical configuration templates and resources</li>
        <li style={{ marginBottom: '12px' }}>AI-optimized technical documentation</li>
        <li style={{ marginBottom: '12px' }}>Community-driven learning resources</li>
        <li style={{ marginBottom: '12px' }}>Professional development guidance</li>
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
        3. User Responsibilities
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        As a user of 100xSystems, you agree to:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>Provide accurate information when required</li>
        <li style={{ marginBottom: '12px' }}>Use the service for legitimate educational purposes</li>
        <li style={{ marginBottom: '12px' }}>Not reproduce, distribute, or create derivative works of our content without explicit permission</li>
        <li style={{ marginBottom: '12px' }}>Not attempt to gain unauthorized access to our systems</li>
        <li style={{ marginBottom: '12px' }}>Respect intellectual property rights and licensing agreements</li>
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
        4. Intellectual Property
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        All content, materials, and resources provided by 100xSystems, including but not limited to text, graphics, code examples, configuration templates, and educational materials, are owned by 100xSystems or our content suppliers and are protected by intellectual property laws.
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
        5. Service Availability
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We strive to maintain high availability of our services but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice.
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
        6. Limitation of Liability
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        100xSystems provides educational content and resources on an "as is" basis. We make no warranties regarding the accuracy, completeness, or suitability of our content for any particular purpose. Your use of our services is at your own risk.
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
        7. Privacy and Data Protection
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        Your privacy is important to us. Please refer to our Privacy Policy for detailed information about how we collect, use, and protect your personal information.
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
        8. Non-Profit and Community Commitment
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        100xSystems is fundamentally a community-driven, non-profit educational initiative:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>All content and resources are provided free of charge for educational purposes</li>
        <li style={{ marginBottom: '12px' }}>Any donations, payments, or revenue generated will be reinvested entirely into improving the 100xSystems platform</li>
        <li style={{ marginBottom: '12px' }}>We are not associated with any commercial profit-making entity</li>
        <li style={{ marginBottom: '12px' }}>The platform exists solely for the welfare and advancement of software engineers</li>
        <li style={{ marginBottom: '12px' }}>Both the founder and community members benefit through collaborative learning</li>
        <li style={{ marginBottom: '12px' }}>Any future certifications or paid features will fund platform development, not personal profit</li>
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
        9. Professional Use Disclaimer
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        While our content is designed for professional development, 100xSystems does not guarantee employment outcomes or career advancement. Success in software engineering requires individual effort, practice, and application of learned concepts.
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
        10. AI Agent Usage
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        Our platform provides machine-readable content optimized for AI agents. Users may integrate our structured data with AI systems, provided such use complies with these terms and applicable laws.
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
        11. Open Source and External Resources
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        As an open source educational community, we provide both original and curated external resources:
      </p>
      <ul style={{ 
        marginLeft: '30px', 
        marginBottom: '25px',
        fontSize: '17px',
        color: '#333333',
        lineHeight: '1.8'
      }}>
        <li style={{ marginBottom: '12px' }}>We create and maintain our own educational articles and resources</li>
        <li style={{ marginBottom: '12px' }}>We reference and link to external resources including YouTube videos, tutorials, and documentation</li>
        <li style={{ marginBottom: '12px' }}>External resources are carefully curated to supplement our educational content</li>
        <li style={{ marginBottom: '12px' }}>All external content is properly attributed and linked to original creators</li>
        <li style={{ marginBottom: '12px' }}>Users are encouraged to contribute to our open source repository</li>
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
        12. Modifications to Terms
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of our services constitutes acceptance of any modifications.
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
        13. Contact Information
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        For questions regarding these Terms of Service, please contact us at:
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
        14. Governing Law
      </h2>
      <p style={{ 
        marginBottom: '25px', 
        fontSize: '17px',
        color: '#333333',
        textAlign: 'justify'
      }}>
        These terms shall be governed by and construed in accordance with the laws applicable in the jurisdiction where 100xSystems operates, without regard to conflict of law provisions.
      </p>

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
          This document constitutes a legally binding agreement between you and 100xSystems. By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms.
        </p>
        <p>
          © 2026 100xSystems. All rights reserved.
        </p>
      </div>
    </div>
  );
}
