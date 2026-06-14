'use client';

import styles from '../_styles/sections-contact-shared.module.css';
import { ContactHero, ContactInfo, ContactForm } from './sections.feature';
/**
 * ## Contact
 *
 * Contact feature module.
 * Contains all components, types, and logic for the contact domain.
 *
 * @packageDocumentation
 * @module contact
 */

;



// ============================================================
// Source: contact.tsx
// ============================================================
/**
 */
export function ContactPage() {
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


// ============================================================
// Source: index.ts
// ============================================================
;
