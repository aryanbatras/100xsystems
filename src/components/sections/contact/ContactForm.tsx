import { useContactForm } from '../../../hooks/useContactForm';
import styles from '../../../styles/components/sections/contact/ContactForm.module.css';;

export default function ContactForm() {
  const { formData, handleChange, handleSubmit, responseMessage, isSuccess } = useContactForm();

  return (
    <div className={styles.formSection}>
      <h2 className={styles.formTitle}>Send us a Message</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company" className={styles.formLabel}>
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formLabel}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.formTextarea}
          />
        </div>

        <button type="submit" className={styles.formButton}>
          Send Message
        </button>

        {responseMessage && (
          <div
            className={`${styles.responseMessage} ${isSuccess ? styles.success : styles.error}`}
          >
            {responseMessage}
          </div>
        )}
      </form>
    </div>
  );
}
