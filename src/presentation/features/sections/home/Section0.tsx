import React from 'react';
import styles from '../../../_styles/components/sections/home/Section0.module.css';

export default function Section0() {
  return (
    <div className={styles.section0}>
      {/* Fluid Animation Background - Working version from SectionMain */}
      {/* <FluidAnimation id="section0-fluid-animation" useCustomColors={true} /> */}
      
      {/* Knowledge Graph Particles - on top of fluid animation */}
      {/* <KnowledgeGraphParticles id="section0-particles" /> */}

      {/* Navigation Bar */}
      <nav className={styles.navigationBar}>
        <div className={styles.navLeft}>
          <span className={styles.navLogo}>100XSYSTEMS</span>
        </div>
        <div className={styles.navRight}>
          <a href="#" className={styles.navLink}>API</a>
          <a href="#" className={styles.navLink}>COMPANY</a>
          <a href="#" className={styles.navLink}>COLOSSUS</a>
          <a href="#" className={styles.navLink}>CAREERS</a>
          <a href="#" className={styles.navLink}>NEWS</a>
          <a href="#" className={styles.navLink}>SHOP</a>
          <a href="#" className={styles.navLink}>SPACEX</a>
          <button className={styles.tryButton}>TRY 100XSYSTEMS</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img
            src="/100xsystemsfooter.webp"
            alt="100xSystems"
            className={styles.logo}
          />
        </div>

        {/* Static Input Field Display */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="What do you want to know?"
            className={styles.input}
            readOnly
          />
          <button className={styles.sendButton}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
            </svg>
          </button>
        </div>

        {/* Announcement Section */}
        <div className={styles.announcement}>
          <p>100xSystems joins the revolution in system design education</p>
          <button className={styles.readButton}>READ ANNOUNCEMENT</button>
        </div>
      </div>

      {/* Bottom Arrow */}
      <div className={styles.bottomArrow}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
    </div>
  );
}
