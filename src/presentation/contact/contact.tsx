/**
 * ## Presentation: Contact Page
 *
 * Contact form page for user inquiries,
 * feedback, and support requests.
 *
 * @packageDocumentation
 */

'use client';
import ContactHero from "../../components/sections/contact/Hero";
import ContactInfo from "../../components/sections/contact/ContactInfo";
import ContactForm from "../../components/sections/contact/ContactForm";
import styles from "../../styles/components/sections/contact/shared.module.css";

/**
 * Contact page — user support and inquiry form.
 *
 * @remarks
 * Provides a contact form and business information for users to reach the team.
 */
export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ContactHero />
        <div className={styles.contactContent}>
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
