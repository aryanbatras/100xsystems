import React from 'react';
import { FooterLinks } from './FooterLinks';
import styles from '../../styles/components/footer/Footer.module.css';;

export function Footer(): React.ReactElement {
  return (
    <>
      <FooterLinks />
      <div className={styles.container}>
        <img src="/100xsystemsfooter.webp" className={styles.logo} alt="100xSystems" />
      </div>
    </>
  );
}
