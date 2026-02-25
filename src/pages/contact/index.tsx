import { useState } from 'react';
import styles from '../../styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setResponseMessage('Thank you for your message. We will get back to you within 24 hours.');
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      
      setTimeout(() => {
        setResponseMessage('');
      }, 5000);
    }, 1000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Ready to transform your coding skills into engineering excellence? Let's start your journey.
          </p>
        </section>

        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h2 className={styles.infoTitle}>Contact Information</h2>
            
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Email</div>
              <div className={styles.infoValue}>
                <a href="mailto:admin@100xSystems.dev" className={styles.infoLink}>
                  admin@100xSystems.dev
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Business Hours</div>
              <div className={styles.infoValue}>
                Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                Saturday - Sunday: Closed
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Response Time</div>
              <div className={styles.infoValue}>
                We typically respond within 24 hours during business days.
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Name</label>
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
                <label htmlFor="email" className={styles.formLabel}>Email</label>
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
                <label htmlFor="company" className={styles.formLabel}>Company</label>
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
                <label htmlFor="message" className={styles.formLabel}>Message</label>
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
                <div className={`${styles.responseMessage} ${isSuccess ? styles.success : styles.error}`}>
                  {responseMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        <section className={styles.officesSection}>
          <h2 className={styles.sectionTitle}>Our Offices</h2>
          <div className={styles.officesGrid}>
            <div className={styles.officeCard}>
              <h3 className={styles.officeName}>San Francisco</h3>
              <p className={styles.officeAddress}>
                123 Market Street<br />
                San Francisco, CA 94105
              </p>
              <p className={styles.officeContact}>West Coast Headquarters</p>
            </div>

            <div className={styles.officeCard}>
              <h3 className={styles.officeName}>New York</h3>
              <p className={styles.officeAddress}>
                456 Park Avenue<br />
                New York, NY 10022
              </p>
              <p className={styles.officeContact}>East Coast Office</p>
            </div>

            <div className={styles.officeCard}>
              <h3 className={styles.officeName}>London</h3>
              <p className={styles.officeAddress}>
                789 Oxford Street<br />
                London W1C 1DX
              </p>
              <p className={styles.officeContact}>European Office</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
