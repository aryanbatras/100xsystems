import ContactHero from "../../components/sections/contact/Hero";
import ContactInfo from "../../components/sections/contact/ContactInfo";
import ContactForm from "../../components/sections/contact/ContactForm";
import styles from "../../styles/components/sections/contact/shared.module.css";

export default function Contact() {
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
