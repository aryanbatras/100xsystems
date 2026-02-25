import React from 'react';
import styles from "./Footer.module.css";

export default function Footer(): React.ReactElement {
  return (
    <>
      <div className={styles.container}>
        <img src="/100xsystemsfooter.png" className={styles.logo} alt="100xSystems" />
      </div>
    </>
  );
}
