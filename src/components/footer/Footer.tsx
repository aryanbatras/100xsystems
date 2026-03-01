import React from 'react';
import { FooterLinks } from './FooterLinks';
import styles from "./Footer.module.css";

export function Footer(): React.ReactElement {
  return (
    <>
      <FooterLinks />
      <div className={styles.container}>
        <img src="/100xsystemsfooter.png" className={styles.logo} alt="100xSystems" />
      </div>
    </>
  );
}
